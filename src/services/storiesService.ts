import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateStoryInterface {
	title: string;
	userId: number;
}

export const getAllStories = async () => {
	try {
		return await prisma.story.findMany({
			where: {

				isActive: true
			},
			include: {
				media: true
			},
			orderBy: {
				createdAt:"asc",
			},
		});
	}

	catch (error: any) {

		console.error("Error al obtener las historias:", error.message);
		throw error;

	}
}
export const createStory = async (data: CreateStoryInterface) => {
		const existUser = await prisma.user.findUnique({
		where:{
			isActive:true,
			id:data.userId
		}
	})
	console.log(data)
	if (!existUser) {
		throw new Error("El usuario no existe.");
	}
	try {
		return await prisma.story.create({
			data: {
				...data,
				isActive: true,
				createdAt: new Date(),
				expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
	}})
		}catch (error: any) {
		console.error("Error al crear la historia:", error.message);
		throw error;
	}
}
export const deleteStory = async (id: number) => {
	try {
		return await prisma.story.update({
			where: {
				id: id,
			},
			data: {
				isActive: false,
			},
		});
	}
	catch (error: any) {
		console.error("Error al eliminar la historia:", error.message);
		throw error;
	}
}