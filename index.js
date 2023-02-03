const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const blogRouter = require("./routers/blogRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config("./.env");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/blogs", blogRouter);

app.get("/", (request, response) => {
	response.status(200).send("Ok from server");
});

const PORT = process.env.PORT;
dbConnect();

app.listen(PORT, () => {
	console.log("process listening on port " + PORT);
});
