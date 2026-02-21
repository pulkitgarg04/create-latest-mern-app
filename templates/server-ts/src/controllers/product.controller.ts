import { Request, Response } from "express";
import { Product } from "../models/Product";
import mongoose from "mongoose";

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, products });
	} catch (error: any) {
		console.log("Error in getProducts controller", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createProduct = async (req: Request, res: Response): Promise<any> => {
	const product = req.body;

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error: any) {
		console.error("Error in create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
	const id = req.params.id as string;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error: any) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
	const id = req.params.id as string;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error: any) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const getProduct = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const product = await Product.findById(id);
        res.status(200).json({ success: true, data: product });
    } catch (error: any) {
        console.log("error in fetching product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
