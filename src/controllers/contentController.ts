import { Request,Response, NextFunction} from "express";
import { createContent, deleteContent, getAllContents,getContentById } from '../services/contentService';

export const getContents = async (req:Request, res:Response,next: NextFunction):Promise<void> => {
	try {
		const contents = await getAllContents();
		const response = contents.map(item=>({
			...item,
			content: item.media ? [item.media] : [],
		}))
		res.status(200).json(response );
	} catch (error:any) {
		next(error.message)
	}
}

export const addContent = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
	try {
		const {sectionId,
	title,
	body,
	type,
	order,
	isActive} = req.body;

	if(!sectionId || !type || !order || !isActive){
		res.status(400).json({ message: "Todos los campos son obligatorios." });
	}
	const newContent = await createContent({
		sectionId,
		title,
		body,
		type,
		order,
		isActive
	})

		res.status(200).json({ message: "Felicitaciones. Haz creado un Contenido correctamente.", content: newContent });
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