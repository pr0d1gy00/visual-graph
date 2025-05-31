import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";


const  prisma = new PrismaClient();

export interface Content {
id: number;
    type: string;
    isActive: boolean;
    createdAt: Date;
    sectionId: number;
    title: string | null;
    body: string | null;
    order: number;
    animationClass: string | null;
styleConfig: string | number | object | boolean | null;
    updatedAt: Date;
}

export interface MediaWithContent {
  id: number;
  contentId: number;
  url: string;
  type: string;
  altText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  fileSize: number | null;
  thumbnailUrl: string | null;
  isActive: boolean;
  createdAt: Date; // o Date si tu backend lo maneja así
  content: Content;
}

export const uploadMedia = async (req: Request, res: Response, next:NextFunction) => {
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
		next(error)

	}
}
export const getAllMedia = async (req: Request, res: Response, next:NextFunction) => {
	try {
		const media = await prisma.media.findMany({
			where:{
				isActive:true
			},
			include:{
				content: true
			}
		});
		const response = media.map((item:MediaWithContent)=>({
			...item,
			content: item.content ?? [],
		}))
		return res.status(200).json(
			response
		)
	}
	catch (error:any) {
				next(error)

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
		next(error)
	}
}