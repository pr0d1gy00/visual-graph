import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ContentInterfaces {

	sectionId: number;
	title?: string;
	body?: string;
	type: string;
	order: number;
	isActive: boolean;
}

export const getAllContents= async()=>{
	try {
		return await prisma.content.findMany({
			where:{
				isActive: true
			},include:{
				media: true,
			}
		});

	} catch (error:any) {
		console.error("Error al obtener todos los contenidos:", error.message);
		throw new Error(
			error.message || "No se pudo obtener las contenidos"
		);
	}
}

export const createContent = async (data:ContentInterfaces)=>{
		try {
			return await prisma.content.create({
				data
			})
		} catch (error:any) {
			console.error("Error al crear contenido:", error.message);
					return error

		}

}

export const getContentById = async(id:number)=>{
	try {
		return await prisma.content.findUnique({
			where:{
				id:id
			}
		})
		} catch (error:any) {
		console.error("Error al obtener el contenido:", error.message);
throw error;
	}

}
export const deleteContent = async(id:number)=>{
	try {
		const content = await prisma.content.findUnique({
			where:{
				id:id
			}
		})

		if(!content){
			throw new Error("Contenido no encontrado");
		}

		return await prisma.content.update({
			where:{
				id:id
			},
			data:{
				isActive:false,
			}
		})
	} catch (error:any) {
		console.error("Error al eliminar el contenido:", error.message);
throw error;	}
}