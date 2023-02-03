const jwt = require("jsonwebtoken");
const BlogUser = require("../models/BlogUser");
module.exports = async (request, response, next) => {
	if (
		!request.headers ||
		!request.headers.authorization ||
		!request.headers.authorization.startsWith("Bearer")
	) {
		return response.status(401).send("Authorization header is required");
	}

	const accessToken = request.headers.authorization.split(" ")[1];

	try {
		const decoded = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_PRIVATE_KEY
		);

		request._id = decoded._id;

		const user = await BlogUser.findById(request._id);

		if (!user) {
			return response.status(404).send("User not found");
		}

		next();
	} catch (e) {
		console.log(e);
		return response.status(401).send("Invalid access key");
	}
};
