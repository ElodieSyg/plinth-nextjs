import dbConnect from "../../../lib/dbConnect";
// MODELS IMPORTATIONS
import Product from "../../../model/Product";
// DEPENDENCIES IMPORTATIONS
import nextConnect from "next-connect";
import multer from "multer";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};


/* const upload = multer({
    storage: multer.diskStorage({
        destination: (req, _file, cb) => {
            console.log("inside upload");
            const id = req.body;
            console.log("id in upload variable", id)
            const path = `public/images/${id}`;
            fs.mkdirSync(path, { recursive: true });
            return cb(null, path);
        },
        filename: (req, file, cb) => {
            const id = req.body;
            console.log("id in upload variable", id)
            let ext = path.extname(file.originalname);
            console.log("ext", ext);
            if (ext === ".png" || ext === ".jpg" || ext === '.jpeg') {
                if (fs.existsSync(path)) {
                    console.log("Already exist");
                } else {
                    cb(null, `${id}${ext}`);
                };
            };
        },
    })
});
 */

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        cb(null, new Date())
    }
});

let upload = multer({
    storage: storage,
});

const handler = nextConnect()
    .use(upload.single("file"))
    .patch(async (req, res) => {
        console.log("req file", req.file);
        console.log("body", req.body);

        return res.status(201).json({
            message: "OK"
        })
/*     console.log("req file", req.file);
    const { id } = req.body;
    console.log(id);
    try {
        const product = await Product.findById({ _id: id });
        console.log("product", product);

        if (!product) throw new Error("Product not found");

        console.log(req.file)
        let ext = path.extname(req.file.originalname);
        console.log("ext")
        product.image = `images/${id}/${id}${ext}`;
        console.log("product", product.image)

        try {
            const updatedProduct = await Product.findByIdAndUpdate({ _id: id }, product, {
                upsert: true,
                new: true,
            });
            console.log("updated product", updatedProduct);

            if (!updatedProduct) throw new Error("An error happened, product not updated");

            res.status(200).json({
                status: "Success",
                message: "Image succefully upload",
            });
        } catch (error) {
            if (error === "Product not found") {
                console.log("error 404")
                return res.status(404).json({
                    status: "Fail",
                    message: error,
                });
            };

            if (error === "An error happened, product not updated") {
                return res.status(500).json({
                    status: "Fail",
                    message: error,
                });
            };

            return res.status(500).json({
                status: "Fail",
                message: error,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: error,
        });
    };

    return res.status(200).json({
        message: "Posted"
    });
 */});

export default handler;