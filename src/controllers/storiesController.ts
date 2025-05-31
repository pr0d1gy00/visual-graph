import { NextFunction, Request, Response } from "express";
import {
	getAllStories,
	createStory,
	deleteStory,
} from "../services/storiesService";

export const getStories = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const stories = await getAllStories();
		res.status(201).json(stories);
	} catch (error) {
		next(error);
	}
};

export const addStory = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { title, userId } = req.body.data;
		if (!title || !userId) {
			res.status(400).json({
				message: "Todos los campos son obligatorios.",
			});
		}
		const newStory = await createStory({
			title,
			userId: Number(userId),
		});
		res.status(200).json({
			message:
				"Felicitaciones. Haz creado una historia correctamente.",
			story: newStory,
		});
	} catch (error) {
		next(error);
	}
};
export const removeStory = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const id = req.params.id;
		if (!id) {
			res.status(400).json({
				message: "El id es obligatorio.",
			});
		}
		const deletedStory = await deleteStory(Number(id));
		res.status(200).json({
			message: "Historia eliminada correctamente.",
			story: deletedStory,
		});
	} catch (error) {
		next(error);
	}
};
