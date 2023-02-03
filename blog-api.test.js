const request = require("supertest");
const expect = require("expect.js");
const app = "http://localhost:6000";

describe("Blog APIs", () => {
	let blogId;
	let accessToken;
	console.log("blog test starting");

	it("logging in first", async () => {
		const res = await request(app).post("/auth/login").send({
			email: "aman1@gmail.com",
			password: "hehehe",
		});
		expect(res.statusCode).to.be(200);
		accessToken = res.body.accessToken;
		console.log("user logged in", accessToken);
	});

	it("creates a blog", async () => {
		const res = await request(app)
			.post("/blogs")
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				title: "Test Blog",
				description: "This is a test blog",
			});
		expect(res.statusCode).to.be(200);
		// console.log("this is blog", res);
		blogId = res._body.blog._id;
		console.log("blog created");
	});

	it("edits a blog", async () => {
		console.log("blog id is this", blogId);
		const res = await request(app)
			.put(`/blogs`)
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				blogId,
				title: "Updated Test Blog Title",
				description: "Updated Test Blog Description",
			});
		expect(res.statusCode).to.be(200);
	});

	it("deletes a blog", async () => {
		const res = await request(app)
			.delete(`/blogs`)
			.set("Authorization", `Bearer ${accessToken}`)
			.send({
				blogId,
			});
		expect(res.statusCode).to.be(200);
	});
});
