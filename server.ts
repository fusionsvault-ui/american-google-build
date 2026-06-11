import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000; // Strict requirement by infrastructure

// In-Memory Database logs (for demonstration/logs - completely mock-free backend tracking!)
const leads: any[] = [];
const chatMessages: any[] = [];

// API leads tracking route
app.post("/api/leads", (req, res) => {
  const { name, email, phone, message, source } = req.body;
  const newLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name,
    email,
    phone,
    message,
    source: source || "unknown",
    timestamp: new Date().toISOString(),
  };
  leads.push(newLead);
  console.log(`[LEAD RECEIVED]:`, JSON.stringify(newLead, null, 2));
  return res.status(201).json({ success: true, leadId: newLead.id });
});

// Chat session messages tracking
app.post("/api/chat-messages", (req, res) => {
  const { sessionId, from, text } = req.body;
  const newMsg = {
    sessionId,
    from,
    text,
    timestamp: new Date().toISOString(),
  };
  chatMessages.push(newMsg);
  console.log(`[CHAT MESSAGE]:`, JSON.stringify(newMsg, null, 2));
  return res.status(200).json({ success: true });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(path.join(process.cwd(), "dist"));

  if (!isProduction) {
    console.log("Starting server in DEVELOPMENT mode (coupling with Vite server)...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode (serving compiled /dist assets)...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files from compiled dist folder
    app.use(express.static(distPath));
    
    // Fallback all SPA pages to dist/index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=================================================`);
    console.log(`  Express Server running at http://0.0.0.0:${PORT}`);
    console.log(`=================================================`);
  });
}

startServer().catch((err) => {
  console.error("Critical error starting fullstack server:", err);
});
