import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export interface MediaWithContent {
	storyId: number;
	type: string;
	order: number;
}
export interface StoriesMediaInterface {
	id: number;
	storyId: number;
	url: string;
	type: string; // "image" | "video" | "gif"
	duration?: number | null; // solo para videos, puede ser null
	order: number;
	story: {
		id: number;
		title: string | null;
		isActive: boolean;
		createdAt: Date;
		expiresAt: Date;
		userId: number;
	};
}
export const uploadStories = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log(req.body);
		const file = req.file;

		const data = JSON.parse(req.body.data);
		const { storyId, type } = data;
		if (!storyId) {
			res.status(400).json({ message: "El id es requerido" });
		}
		if (!type || !storyId) {
			res.status(400).json({
				message: "todos los campos son obligatorios",
			});
		}
		if (!file) {
			res.status(400).json({
				message: "No se ha subido ningun archivo",
			});
		}

		const media = await prisma.storyMedia.create({
			data:{
				...data,
				url:`/uploads/${file?.filename}`,
				order:1
			}
		});
		res.status(201).json({
			message: "Felicidades! Has subido un nuevo archivo",
			media,
		});
	} catch (error: any) {
		next(error);
	}
};
export const getAllStories = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const media = await prisma.storyMedia.findMany({
			include: {
				story: true,
			},
		});
		const response = media.map((item: StoriesMediaInterface) => ({
			...item,
			story: item.story ?? [],
		}));
		res.status(200).json(response);
	} catch (error: any) {
		next(error);
	}
};
export const deleteStoriesMedia = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const id = req.params.id;
		if (!id) {
			res.status(400).json({ message: "El id es requerido" });
		}
		const media = await prisma.storyMedia.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(200).json({
			message: "Archivo eliminado correctamente",
			media,
		});
	} catch (error: any) {
		next(error);
	}
};
