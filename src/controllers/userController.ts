import { Request,Response, NextFunction} from "express";
import { getAllUsers, createUser, getUserById, deleteUser } from '../services/userService';

export const getUsers = async(req:Request, res:Response,next: NextFunction):Promise<void>=>{
	try {
		const users = await getAllUsers();
		res.status(200).json(users);
	} catch (error:any) {
		next(error)
	}
}

export const addUser = async(req:Request, res:Response,next: NextFunction):Promise<void>=>{
	try {

		const {name,email,passwordHash,role} = req.body;
		if (!name || !email || !passwordHash || !role) {
			res.status(400).json({ message: "Todos los campos son obligatorios." });
		}
		const newUser = await createUser({name,email,passwordHash,role})
		res.status(201).json(newUser);
	} catch (error:any) {
		next(error)

	}
}

export const getUser = async (req:Request,res:Response,next: NextFunction):Promise<void>=>{
	try {
		const {id} = req.params;
		if(!id){
			res.status(400).json({ message: "El id es obligatorio." });
		}
		const user = await getUserById(Number(id));
		if(!user){
			res.status(404).json({ message: "Usuario no encontrado." });
		}
		res.status(200).json(user);
	}  catch (error: any) {
		next(error)
	}
}

export const removeUser = async(req:Request,res:Response,next: NextFunction):Promise<void>=>{
	try {
		const {id} = req.params;
		if(!id){
			res.status(400).json({ message: "El id es obligatorio." });
		}
		const deletedUser = await deleteUser(Number(id));
		res.status(200).json({ message: "Usuario eliminado correctamente.", user: deletedUser });
	} catch (error:any) {
		next(error)

	}
}