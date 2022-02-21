// DEPENDENCIES IMPORTATIONS
import nextConnect from 'next-connect';
import multer from 'multer';
import path from "path";
import fs from "fs";
// MODELS IMPORTATIONS
import Product from "../../../model/Product";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, _file, cb) => {
            const id = req.headers.id;
            const path = `public/uploads/${id}`;
            fs.mkdirSync(path, { recursive: true });
            return cb(null, path);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            cb(null, `${req.headers.id}${ext}`)
        },
    }),
});

const handler = nextConnect({
    onError(error, _req, res) {
        console.log(error.message)
        res.status(501).json({
            status: "Fail",
            error: `Sorry something Happened! ${error.message}`,
        });
    },
    onNoMatch(req, res) {
        res.status(405).json({
            status: "Fail",
            error: `Method '${req.method}' Not Allowed`,
        });
    },
});

const uploadMiddleware = upload.single('toto');
handler.use(uploadMiddleware);

handler.post(async (req, res) => {
    const id = req.headers.id;
    try {
        const result = await Product.findById({ _id: id });
        let ext = path.extname(req.file.originalname);
        result.image = `uploads/${id}/${id}${ext}`;
        try {
            const finalResult = await Product.findByIdAndUpdate({ _id: id }, result, {
                upsert: true,
                new: true,
            });

            if (!finalResult) {
                res.status(400).json({
                    status: "Fail",
                    message: "An error happened",
                });
            };

            res.status(201).json({
                status: "Success",
                message: "Image saved in databse",
            });

        } catch (err) {
            res.status(500).json({
                status: "Fail",
                message: "Internal Server Error",
            });
        };
    } catch (err) {
        res.status(500).json({
            status: "Fail",
            message: "Internal Server Error",
        });
    };
});

export default handler;

export const config = {
    api: {
        bodyParser: false,
    },
};