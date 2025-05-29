import { Request,Response, NextFunction} from "express";
import { createRelationContent, deleteRelationContent, getRelationsContents, getRelationById } from '../services/relationsContentsService';

export const getRelationsContentsController = async (req:Request, res:Response,next: NextFunction):Promise<void> => {
	try {
		const response = await getRelationsContents();
		res.status(200).json(response );

	}
	catch (error:any) {
		next(error);
	}
}
export const addRelationContentController = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
	try {
		const {parentContentId, childContentId} = req.body;
		console.log(req.body)
		if(!parentContentId || !childContentId){
			res.status(400).json({ message: "Todos los campos son obligatorios." });
		}
		const newRelation = await createRelationContent({
			parentContentId,
			childContentId
		});
		res.status(200).json({ message: "Felicitaciones. Haz creado una relación de contenidos correctamente.", relation: newRelation });
	}
	catch (error:any) {
		next(error);
	}
}
export const removeRelationContentController = async(req:Request,res:Response,next: NextFunction):Promise<void> => {
	try {
		const id = req.params.id;
		if(!id){
			res.status(400).json({ message: "El id es obligatorio." });
		}
		const response = await deleteRelationContent(Number(id));
		res.status(200).json({ message: "Relación eliminada correctamente.", relation: response });
	} catch (error:any) {
		next(error);
	}
}
export const getRelationByIdController = async (req:Request, res:Response,next: NextFunction):Promise<void> => {
	try {
		const id = req.params.id;
		if(!id){
			res.status(400).json({ message: "El id es obligatorio." });
		}
		const response = await getRelationById(Number(id));
		res.status(200).json({ message: "Relación obtenida correctamente.", relation: response });
	}
	catch (error:any) {
		next(error);
	}
}
