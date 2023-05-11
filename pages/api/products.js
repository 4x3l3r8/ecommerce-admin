import { Product } from "@/lib/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect()

    if (method === "GET") {

        if (req.query?.id) {
            const product = await Product.findOne({ _id: req.query.id })
            if (product) {
                return res.status(200).json(product)
            } else {
                return res.status(404).json({ message: "Product not found" })
            }
        } else {
            return res.status(200).json(await Product.find())
        }
    }

    if (method === "POST") {
        const { title, description, price } = req.body
        const productDoc = await Product.create({
            title, description, price
        })
        return res.status(200).json({ productDoc })
    }

    if (method === "PUT") {
        const { _id } = req.body;
        const productDoc = await Product.findOne({ _id: _id })
        if (productDoc) {
            const { title, description, price } = req.body
            const updatedProduct = await Product.updateOne({ _id: _id }, {
                title, description, price
            })
            return res.status(200).json({ message: "Product Updated Successfully", updatedProduct })
        } else {
            return res.status(404).json({ message: "Product not found" })
        }
    }

    if (method === "DELETE") {
        const { id } = req.query;
        if (id) {
            await Product.deleteOne({ _id: id })
            res.status(200).json({ message: "Product deleted Successfully" })
        }
    }
}