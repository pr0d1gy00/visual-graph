import express from "express";
import UserRoutes from "../src/routes/userRoutes";
import SectionRoutes from "../src/routes/sectionRoutes";
import ContentRoutes from "../src/routes/contentRoutes";
import cors from "cors"; // Importar cors
import { errorHandler } from "./middlewares/errorHandler";
const app = express()

app.use(cors())
app.use(express.json()); // Middleware para analizar JSON

app.use("/api/visualgraph/content",ContentRoutes)
app.use("/api/visualgraph/users",UserRoutes)
app.use("/api/visualgraph/section",SectionRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server listen to: ${PORT}`);
});