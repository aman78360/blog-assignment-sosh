const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("bloguser", userSchema);
