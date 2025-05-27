import multer from "multer";

export const uploadFile = async (file:Express.Multer.File)=>{
	try {
		const storageFile = multer.diskStorage({
			destination: (req,file,cb)=>{
				cb(null, "uploads/");
			},
			filename: (req,file,cb)=>{
				cb(null, `${Date.now()}-${file.originalname}`);
			}

		})
		const upload = multer({storage:storageFile}).single("file");
		
	} catch (error:any) {
		console.error("Error al subir el archivo:", error.message);
		throw error
	}
}