import { Request,Response, NextFunction} from "express";
import { createContent, deleteContent, getAllContents,getContentById } from '../services/contentService';

export const getContents = async (req:Request, res:Response,next: NextFunction):Promise<void> => {
	try {
		const contents = await getAllContents();
		res.status(200).json({ message: "Contenidos obtenidos correctamente.", content: contents });
	} catch (error:any) {
		next(error.message)
	}
}

export const addContent = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
	try {
		const {sectionId,
	title,
	description,
	type,
	order,
	isActive} = req.body;

	if(!sectionId || !type || !order || !isActive){
		res.status(400).json({ message: "Todos los campos son obligatorios." });
	}
	const newContent = await createContent({
		sectionId,
		title,
		description,
		type,
		order,
		isActive
	})

		res.status(200).json({ message: "Contenido creado correctamente.", content: newContent });
	} catch (error:any) {
		next(error.message)
	}
}

export const getContent = async(req:Request,res:Response,next: NextFunction):Promise<void> => {
	try {
		const id = req.params.id;
		if(!id){
			res.status(400).json({ message: "El id es obligatorio." });
		}
		const content= await getContentById(Number(id));
		res.status(200).json({ message: "Contenido obtenido correctamente.", content: content });

	} catch (error:any) {
		next(error.message)
	}

}
export const removeContent = async(req:Request,res:Response,next: NextFunction):Promise<void> => {
	try {
		const id = req.params.id;
		if(!id){
			res.status(400).json({ message: "El id es obligatorio." });
		}
		const deletedContent = await deleteContent(Number(id));
		res.status(200).json({ message: "Contenido eliminado correctamente.", content: deletedContent });
	} catch (error:any) {
		next(error.message)
	}
}