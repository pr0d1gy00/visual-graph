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

const app = express()

app.use(cors({
  origin: [
    "https://visual-graph-front.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));app.use(express.json()); // Middleware para analizar JSON

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

app.listen(PORT, () => {
	console.log(`Server listen to: ${PORT}`);
});