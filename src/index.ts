import express from "express";
import UserRoutes from "../src/routes/userRoutes";
import SectionRoutes from "../src/routes/sectionRoutes";
import cors from "cors"; // Importar cors
const app = express()

app.use(cors())
app.use(express.json()); // Middleware para analizar JSON

app.use("/api/visualgraph/users",UserRoutes)
app.use("/api/visualgraph/section",SectionRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server listen to: ${PORT}`);
});