import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("Error: ", error);

	let statusCode = 500;
	let message =
    error.message || "Ha ocurrido un error inesperado. Por favor, intentalo de nuevo";
	let errors: any[] = [];

	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		// Errores conocidos de Prisma
		switch (error.code) {
			case "P2000":
				message = `El valor proporcionado es demasiado largo para el campo '${error.meta?.column}'.`;
				statusCode = 400; // Bad Request
				break;
			case "P2002":
				const target =
					(error.meta?.target as string[])?.join(", ") ||
					"un campo";
				message = `Ya existe un registro con ${target} similar. Por favor, elige un valor diferente.`;
				statusCode = 409; // Conflict
				break;
			case "P2003":
				message = `No se puede realizar la operación porque depende de un registro que no existe o ha sido eliminado.`;
				statusCode = 400; // Bad Request
				break;
			case "P2004":
				message = `Error en la base de datos: ${
					error.meta?.cause ||
					"violación de una restricción."
				}`;
				statusCode = 400; // Bad Request
				break;
			case "P2011":
				const nullTarget =
					(error.meta?.target as string[])?.join(", ") ||
					"un campo obligatorio";
				message = `El campo '${nullTarget}' es obligatorio y no puede estar vacío.`;
				statusCode = 400; // Bad Request
				break;
			case "P2025":
				message = `El registro que intentas ${
					req.method === "DELETE"
						? "eliminar"
						: "actualizar"
				} no fue encontrado.`;
				statusCode = 404; // Not Found
				break;
			default:
				message =
					"Ha ocurrido un error en la base de datos. Por favor, inténtalo de nuevo.";
				statusCode = 500;
		}
	} else if (error instanceof Prisma.PrismaClientValidationError) {
		// Errores de validación de Prisma (argumentos inválidos pasados al cliente)
		message =
			"Datos de entrada inválidos. Por favor, revisa la información proporcionada.";
		statusCode = 400;
	}

	res.status(statusCode).json({
		success:false,
		message,
	})
};
