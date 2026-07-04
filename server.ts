import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser with high limit because we are sending base64 photos and PDFs
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Create persistent storage folder for files
  const dataDir = path.join(process.cwd(), ".data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const photoPath = path.join(dataDir, "photo.json");
  const pdfPath = path.join(dataDir, "pdf.json");

  // API Endpoint to get synchronized state
  app.get("/api/app-state", (req, res) => {
    try {
      let photoData = null;
      let pdfData = null;

      if (fs.existsSync(photoPath)) {
        photoData = JSON.parse(fs.readFileSync(photoPath, "utf8"));
      }
      if (fs.existsSync(pdfPath)) {
        pdfData = JSON.parse(fs.readFileSync(pdfPath, "utf8"));
      }

      res.json({
        has_photo: !!photoData,
        photo_data: photoData ? photoData.data : null,
        photo_name: photoData ? photoData.name : null,
        has_pdf: !!pdfData,
        pdf_data: pdfData ? pdfData.data : null,
        pdf_name: pdfData ? pdfData.name : null,
        pdf_size: pdfData ? pdfData.size : null,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Endpoint to save photo
  app.post("/api/upload-photo", (req, res) => {
    try {
      const { data, name } = req.body;
      if (!data) {
        return res.status(400).json({ error: "Missing photo data" });
      }
      fs.writeFileSync(photoPath, JSON.stringify({ data, name }));
      res.json({ status: "ok" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Endpoint to delete photo
  app.delete("/api/photo", (req, res) => {
    try {
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
      res.json({ status: "ok" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Endpoint to save custom letter PDF
  app.post("/api/upload-letter", (req, res) => {
    try {
      const { data, name, size } = req.body;
      if (!data) {
        return res.status(400).json({ error: "Missing PDF data" });
      }
      fs.writeFileSync(pdfPath, JSON.stringify({ data, name, size }));
      res.json({ status: "ok" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Endpoint to delete custom letter PDF
  app.delete("/api/letter", (req, res) => {
    try {
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
      res.json({ status: "ok" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
