import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load and parse .env before importing any local modules that may read process.env
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  let raw = fs.readFileSync(envPath, "utf8");
  // strip BOM if present
  if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);
  try {
    const parsed = dotenv.parse(raw);
    Object.keys(parsed).forEach((k) => {
      if (process.env[k] === undefined) process.env[k] = parsed[k];
    });
    // keep one informational log
    console.log("Loaded env keys:", Object.keys(parsed));
  } catch (err) {
    console.warn("Failed to parse .env manually:", err);
  }
} else {
  console.warn(".env not found at", envPath);
}
// also call config as a fallback
dotenv.config({ path: envPath });

// Defer importing app modules until after env is loaded
const expressMod = await import("express");
const corsMod = await import("cors");
const pathMod = await import("path");
const notesRoutesMod = await import("./routes/notesRoutes.js");
const dbMod = await import("./config/db.js");

const express = expressMod.default ?? expressMod;
const cors = corsMod.default ?? corsMod;
const pathLib = pathMod.default ?? pathMod;
const notesRoutes = notesRoutesMod.default ?? notesRoutesMod;
const { connectDB } = dbMod;

console.log("Starting server.js...");

const app = express();
const PORT = process.env.PORT || 5001; // Read PORT from .env
const __dirname = pathLib.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.use("/api/notes", notesRoutes);

// Add a test route
app.get("/test", (req, res) => {
  res.send("Backend is working!");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(pathLib.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(pathLib.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

console.log("Connecting to MongoDB...");
connectDB().then(() => {
  console.log("Connected to MongoDB, starting server...");
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
