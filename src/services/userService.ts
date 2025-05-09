import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

interface userDataInterfaces {
	name: string;
	email: string;
	passwordHash: string;
	role: string;
}

export const getAllUsers = async () => {
	try {
		return await prisma.user.findMany();
	} catch (error: any) {
		console.error("Error al obtener usuarios:", error.message);
		throw new Error(
			error.message || "No se pudieron obtener los usuarios."
		);
	}
};

export const createUser = async (data: userDataInterfaces) => {
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(data.passwordHash,saltRounds)
		return await prisma.user.create({
			data:{
				...data,
				passwordHash:hashedPassword
			}

		});
	} catch (error: any) {
		if (error.code === "P2002" && error.meta?.target?.includes("email")) {
			throw new Error("El correo electrónico ya está registrado.");
		}
		console.error("Error al crear usuario:", error);
		throw new Error("No se pudo crear el usuario.");
	}
};

export const getUserById = async (id: number) => {
	try {
		return await prisma.user.findUnique({
			where: {
				id,
			},
		});
	} catch (error: any) {
		console.error(
			"Error al obtener usuario por ID:",
			error.message
		);
		throw new Error(
			error.message || "No se pudo obtener el usuario."
		);
	}
};

export const deleteUser = async (id: number) => {
	try {
		const section = await prisma.user.findUnique({
			where: { id },
		});

		if (!section) {
			throw new Error("El usuario que intenta eliminar no existe.");
		}
		return await prisma.user.update({
			where: {
				id,
			},
			data: {
				isActive: false,
			},
		});
	} catch (error: any) {
		console.error("Error al eliminar usuario:", error.message);
		throw new Error(
			error.message || "No se pudo eliminar el usuario."
		);
	}
};
