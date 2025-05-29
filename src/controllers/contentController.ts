import { Request,Response, NextFunction} from "express";
import { createContent, deleteContent, getAllContents,getContentById } from '../services/contentService';
import { ContentRelation } from "@prisma/client";

export interface Media {
  id: number;
    type: string;
    isActive: boolean;
    createdAt: Date;
    contentId: number;
    url: string;
    altText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    duration: number | null;
    fileSize: number | null;
    thumbnailUrl: string | null;
}[]

export interface ContentWithMedia {
  id: number;
  sectionId: number;
  title: string | null;
  body: string | null;
  type: string;
  order: number;
  animationClass: string | null;
styleConfig: string | number | object | boolean | null;
  isActive: boolean;
  createdAt: Date; // Si usas Date en tu backend, cámbialo a Date
  updatedAt: Date; // Si usas Date en tu backend, cámbialo a Date
  media: Media[];
}
export interface Section {
  id: number;
  title: string;
  description?: string | null;
  distribution: string;
  isPublished: boolean;
  order: number;
  animationClass?: string | null;
  slug?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: {
	id: number;
	name: string;
	email: string;
	passwordHash: string;
	role:string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
  };
  contents: ContentWithMedia[];
  metadata: {
	[key: string]: string;
  };
}
export const getContents = async (req:Request, res:Response,next: NextFunction):Promise<void> => {
	try {
		const contents = await getAllContents();
const response = contents.map((item:ContentWithMedia) => ({
    ...item,
    content: item.media ?? [],
}));
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