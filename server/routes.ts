import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";

interface WebSocketClient extends WebSocket {
  profileId?: number;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // WebSocket server for real-time communication
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  const clients = new Map<number, WebSocketClient>();

  wss.on('connection', (ws: WebSocketClient) => {
    console.log('New WebSocket connection');

    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        
        switch (message.type) {
          case 'join':
            ws.profileId = message.profileId;
            clients.set(message.profileId, ws);
            
            // Update profile status to online
            await storage.updateProfileStatus(message.profileId, 'online', true);
            
            // Broadcast online status update
            broadcast({ 
              type: 'status_update', 
              profileId: message.profileId, 
              status: 'online',
              isOnline: true 
            });
            break;

          case 'send_message':
            const newMessage = await storage.createMessage({
              senderId: message.senderId,
              receiverId: message.receiverId,
              content: message.content,
              isRead: false
            });

            // Send to receiver if online
            const receiverWs = clients.get(message.receiverId);
            if (receiverWs && receiverWs.readyState === WebSocket.OPEN) {
              receiverWs.send(JSON.stringify({
                type: 'new_message',
                message: newMessage
              }));
            }

            // Confirm to sender
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: 'message_sent',
                message: newMessage
              }));
            }
            break;

          case 'start_video_call':
            const targetWs = clients.get(message.targetProfileId);
            if (targetWs && targetWs.readyState === WebSocket.OPEN) {
              targetWs.send(JSON.stringify({
                type: 'incoming_video_call',
                callerProfileId: message.callerProfileId,
                callerName: message.callerName
              }));
            }
            break;

          case 'video_call_response':
            const callerWs = clients.get(message.callerProfileId);
            if (callerWs && callerWs.readyState === WebSocket.OPEN) {
              callerWs.send(JSON.stringify({
                type: 'video_call_response',
                accepted: message.accepted,
                targetProfileId: message.targetProfileId
              }));
            }
            break;
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', async () => {
      if (ws.profileId) {
        clients.delete(ws.profileId);
        
        // Update profile status to offline
        await storage.updateProfileStatus(ws.profileId, 'offline', false);
        
        // Broadcast offline status update
        broadcast({ 
          type: 'status_update', 
          profileId: ws.profileId, 
          status: 'offline',
          isOnline: false 
        });
      }
    });
  });

  function broadcast(message: any) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  // REST API routes
  app.get('/api/profiles', async (req, res) => {
    try {
      const profiles = await storage.getAllProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profiles' });
    }
  });

  app.get('/api/profiles/:id', async (req, res) => {
    try {
      const profileId = parseInt(req.params.id);
      const profile = await storage.getProfile(profileId);
      
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

  app.get('/api/messages/:senderId/:receiverId', async (req, res) => {
    try {
      const senderId = parseInt(req.params.senderId);
      const receiverId = parseInt(req.params.receiverId);
      
      const messages = await storage.getMessages(senderId, receiverId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  app.post('/api/messages', async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid message data' });
      }
      res.status(500).json({ error: 'Failed to create message' });
    }
  });

  app.get('/api/stats', async (req, res) => {
    try {
      const profiles = await storage.getAllProfiles();
      const onlineCount = profiles.filter(p => p.isOnline).length;
      const totalCount = profiles.length;
      
      res.json({
        onlineCount,
        totalCount,
        location: 'London' // Mock location for now
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  return httpServer;
}
