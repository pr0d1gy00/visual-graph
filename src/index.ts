import express from "express";
import UserRoutes from "./routes/userRoutes";
import SectionRoutes from "./routes/sectionRoutes";
import ContentRoutes from "./routes/contentRoutes";
import RelationsContents from "./routes/realtionsContentsRoutes";
import StoriesRoutes from "./routes/storiesRoutes";
import StoriesMediaRoutes from "./routes/storiesMediaRoutes";
import cors from "cors"; // Importar cors
import { errorHandler } from "./middlewares/errorHandler";
import MediaRoutes from "./routes/mediaRoutes";
import path from "path";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express()

app.use(cors());app.use(express.json()); // Middleware para analizar JSON

app.use("/api/visualgraph/content",ContentRoutes)
app.use("/api/visualgraph/users",UserRoutes)
app.use("/api/visualgraph/section",SectionRoutes);
app.use("/api/visualgraph/media", MediaRoutes);
app.use("/api/visualgraph/relation", RelationsContents);
app.use("/api/visualgraph/stories",StoriesRoutes)
app.use("/api/visualgraph/storiesMedia",StoriesMediaRoutes)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(errorHandler);
const PORT = process.env.PORT || 3001;

cron.schedule("0 * * * *", async () => {
  try {
    const result = await prisma.story.updateMany({
      where: {
        isActive: true,
        expiresAt: {
          lt: new Date(), // Historias ya expiradas
        },
      },
      data: {
        isActive: false,
      },
    });
    if (result.count > 0) {
      console.log(`Historias expiradas actualizadas: ${result.count}`);
    }
    else{
      console.log("No hay historias expiradas para actualizar.");
    }
  } catch (error) {
    console.error("Error en el cron job de historias:", error);
  }
});

app.listen(PORT, () => {
	console.log(`Server listen to: ${PORT}`);
});