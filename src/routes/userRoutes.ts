import { Router } from "express";
import { addUser, getUser,getUsers, removeUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/createUser",addUser);
router.get("/byId/:id", getUser); // Obtener un usuario por ID
router.delete("/deleteUser/:id",removeUser); // Eliminar (desactivar) un usuario

export default router