import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface RelationContentInterface {
	parentContentId: number;
	childContentId: number;
}

export const getRelationsContents = async () => {
	try {
		return await prisma.contentRelation.findMany({
			include: {
				parentContent: true,
				childContent: true,
			},
		});
	}
	catch (error: any) {
		console.error("Error al obtener las relaciones:", error.message);
		throw error
	}
}
export const createRelationContent = async (data:RelationContentInterface) => {
	try {
		return await prisma.contentRelation.create({
			data: {
				parentContentId: data.parentContentId,
				childContentId: data.childContentId,
				relationType: "CHILD", // Asumiendo que la relación es de tipo CHILD
				order: 1, // Puedes ajustar el orden según tus necesidades
			}
		})

	} catch (error:any) {
		console.error("Error al crear las relaciones:", error.message);
		throw error
	}
}
export const deleteRelationContent = async (id: number) => {
	try {
		return await prisma.contentRelation.update({
			where: {
				id: id
			},
			data:{
				isActive: false
			}
		})
	}
	catch (error:any) {
		console.error("Error al eliminar la relación:", error.message);
		throw error
	}
}
export const getRelationById = async (id: number) => {
	try {
		return await prisma.contentRelation.findUnique({
			where: {
				id: id
			},
			include:{
				parentContent: true,
				childContent: true
			}
		})
	}
	catch (error:any) {
		console.error("Error al obtener la relación por ID:", error.message);
		throw error
	}
}
