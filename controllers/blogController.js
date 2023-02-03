const BlogPost = require("../models/BlogPost");
// const BlogUser = require("../models/BlogUser");

const createBlogController = async (request, response) => {
	try {
		const { title, description } = request.body;
		const createdBy = request._id;

		if (!title || !description) {
			response.status(400).send("Title and Description is required");
		}

		const blog = await BlogPost.create({
			title,
			description,
			createdBy,
		});

		return response.status(200).send({ blog });
	} catch (e) {
		console.log(e);
		return response.status(500).send(e.message);
	}
};

const getBlogsController = async (request, response) => {
	try {
		const blogs = await BlogPost.find();

		if (!blogs) {
			return response.status(404).send("No blogs available");
		}

		return response.status(200).send({ blogs });
	} catch (e) {
		console.log(e);
		return response.status(500).send(e.message);
	}
};

const updateBlogController = async (request, response) => {
	try {
		const { blogId, title, description } = request.body;
		const curUserId = request._id;

		const blog = await BlogPost.findById(blogId);

		if (!blog) {
			return response.status(404).send("Blog not found");
		}

		if (blog.createdBy.toString() !== curUserId) {
			return response
				.status(403)
				.send("Only owners can update their post");
		}

		if (title) {
			blog.title = title;
		}
		if (description) {
			blog.description = description;
		}

		await blog.save();
		return response.status(200).send({ blog });
	} catch (e) {
		return response.status(500).send(e.message);
	}
};

const deleteBlogController = async (request, response) => {
	try {
		const { blogId } = request.body;
		const curUserId = request._id;
		const blog = await BlogPost.findById(blogId);

		if (!blog) {
			return response.status(404).send("Blog not found");
		}

		if (blog.createdBy.toString() !== curUserId) {
			return response
				.status(403)
				.send("Only owners can delete their blogs");
		}

		//removing post from everywhere
		await blog.remove();

		return response.status(200).send("Blog deleted successfully");
	} catch (e) {
		return response.status(500).send(e.message);
	}
};

module.exports = {
	createBlogController,
	getBlogsController,
	updateBlogController,
	deleteBlogController,
};
