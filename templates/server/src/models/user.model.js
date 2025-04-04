import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	}
});

export const User = mongoose.model("User", userSchema);