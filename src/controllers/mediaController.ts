import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";


const  prisma = new PrismaClient();

export const uploadMedia = async (req: Request, res: Response) => {
	try {
		console.log(req.file);
		const file = req.file;
		const data = JSON.parse(req.body.data);
		const {contentId,altText,type} = data;
		if (!contentId) {
			return res.status(400).json({message:"El id es requerido"})
		}
		if(!file){
			return res.status(400).json({message:"No se ha subido ningun archivo"})
		}

		const media = await prisma.media.create({
			data:{
				contentId:Number(contentId),
				url:`/uploads/${file.filename}`,
				type,
				altText,

			}
		})
		return res.status(201).json({
			message:"Felicidades! Has subido un nuevo archivo",
			media
		})
	} catch (error:any) {
		console.error("Error al subir el archivo:", error);
		return res.status(500).json({
			message:"Ha ocurrido un error inesperado. Por favor, intentalo de nuevo",
			error:error.message
		})
	}
}
export const getAllMedia = async (req: Request, res: Response) => {
	try {
		const media = await prisma.media.findMany({
			include:{
				content: true
			}
		});
		const response = media.map(item=>({
			...item,
			content: item.content ? [item.content] : [],
		}))
		return res.status(200).json(
			response
		)
	}
	catch (error:any) {
		console.error("Error al obtener el archivo:", error);
		return res.status(500).json({
			message:"Ha ocurrido un error inesperado. Por favor, intentalo de nuevo",
			error:error.message
		})
	}
}
export const getMediaByContent = async (req: Request, res: Response,next:NextFunction) => {
	try {
		const {contentId} = req.params;
		if (!contentId) {
			return res.status(400).json({message:"El id es requerido"})
		}
		const media = await prisma.media.findMany({
			where:{
				contentId:Number(contentId)
			}
		})
		return res.status(200).json(
			media
		)
	}catch (error:any) {
		console.error("Error al subir el archivo:", error);
		return res.status(500).json({
			message:"Ha ocurrido un error inesperado. Por favor, intentalo de nuevo",
			error:error.message
		})
	}
}