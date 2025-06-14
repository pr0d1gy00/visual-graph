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
		return await prisma.section.findMany({
			where:{
				isActive:true
			},
		});
	} catch (error:any) {
		console.error("Error al obtener las secciones:", error.message);
throw error;
	}
}

export const createSection = async (data:SectionInterfaces)=>{
	const slug = slugify(data.title, {lower:true});
	const existUser = await prisma.user.findUnique({
		where:{
			isActive:true,
			id:data.userId
		}
	})
	console.log(existUser)
	if (!existUser) {
		throw new Error("El usuario no existe.");
	}
	try {
		return await prisma.section.create({
			data:{
				...data,
				slug
			}
		});
	} catch (error:any) {
		console.error("Error al crear secciones:", error.message);
throw error;	}
}
export const getSectionById = async(id:number)=>{
	try {
		return await prisma.section.findMany({
			where:{
				id:id,
			}
		});
	} catch (error:any) {
		console.error("Error al obtener la seccion:", error.message);
throw error;
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
throw error;
	}
}

export const getAllSectionsWithContents = async () => {
	try {
		const sections = await prisma.section.findMany({
			where:{
				isActive:true,
			},
			include:{
				contents: {
					where: {
						isActive: true,
					},
					orderBy:{
						order:"asc"
					},
					include:{
						media:{
							where:{
								isActive:true
							},
						}
					}

			}

	}})

		 const sectionFiltered = sections.filter(section => {
            if (section.distribution === "grid images") {
                return section.contents.length >= 10;
            }
            return true; // Incluye las demás secciones normalmente
        });

        return sectionFiltered;
	} catch (error:any) {
		console.error("Error al eliminar la seccion:", error.message);
		throw error;
	}
}