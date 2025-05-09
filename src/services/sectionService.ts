import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
const prisma = new PrismaClient();

interface SectionInterfaces{
	title:string
	description?:string
	distribution:string
	isPublished:boolean
	order: number
	animationClass?:string
	slug?:string
	isActive:boolean
	userId:number
}
export const getAllSections = async()=>{
	try {
		return await prisma.section.findMany();
	} catch (error:any) {
		console.error("Error al obtener las secciones:", error.message);
		throw new Error(
			error.message || "No se pudo obtener las secciones"
		);
	}
}

export const createSection = async (data:SectionInterfaces)=>{
	const slug = slugify(data.title, {lower:true});

	try {
		return await prisma.section.create({
			data:{
				...data,
				slug
			}
		});
	} catch (error:any) {
		console.error("Error al crear secciones:", error.message);
		throw new Error(
			error.message || "No se pudo crear la sección"
		);
	}
}
export const getSectionById = async(id:number)=>{
	try {
		return await prisma.section.findMany({
			where:{
				id:id
			}
		});
	} catch (error:any) {
		console.error("Error al obtener la seccion:", error.message);
		throw new Error(
			error.message || "No se pudo obtener la seccion"
		);
	}
}
export const deleteSection = async(id:number)=>{
	try {
		const section = await prisma.section.findUnique({
			where: { id },
		});

		if (!section) {
			throw new Error("La sección que intenta eliminar no existe.");
		}
		return await prisma.section.update({
			where:{
				id:id
			},
			data:{
				isActive:false,
				isPublished:false
			}
		});
	} catch (error:any) {
		console.error("Error al eliminar la seccion:", error.message);
		throw new Error(
			error.message || "No se pudo eliminar la seccion"
		);
	}
}