import { NextFunction, Request, Response } from "express";
import { createSection,deleteSection, getAllSections, getSectionById} from '../services/sectionService';


export const addSection = async (req:Request, res:Response, next:NextFunction)=>{
	try {
		const {title,description,distribution,isPublished,order,animationClass,slug,isActive,userId} = req.body;
		if(!title || !distribution || !order){
			res.status(400).json({ message: "Los campos titulo, distribucion y orden son obligatorios"});
		}
		const newSection = await createSection({title,description,distribution,isPublished,order,animationClass,slug,isActive,userId});

		res.status(201).json(newSection);
	} catch (error:any) {
		next(error.message)

	}
}
export const removeSection = async (req:Request, res:Response, next:NextFunction)=>{
	try {
		const {id}=req.params;
		if(!id){
			res.status(400).json({message:'El id es requerido'});
		}
		const deletedSection = await deleteSection(Number(id));
		res.status(201).json({message:"Seccion eliminada correctamente",section: deletedSection});
	} catch (error:any) {
		next(error.message)
;
	}
}

export const getSection = async (req:Request, res:Response, next:NextFunction)=>{
	try {
		const {id}=req.params;
		if(!id){
			res.status(400).json({message:'El id es requerido'});
		}
		const section = await getSectionById(Number(id));
		res.status(201).json(section);
	} catch (error:any) {
		next(error.message)
;
	}

}
export const getSections = async (req:Request, res:Response, next:NextFunction)=>{
	try {
		const sections = await getAllSections()
		res.status(201).json(sections)
	} catch (error:any) {
		next(error.message)

	}
}