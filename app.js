const express = require("express");

// setup the express server
const app = express();
const port = 3000;

// import middleware
app.use(express.json({limit: "100mb"}));

// import routes
const authRouter = require("./routes/auth");
const messagesRouter = require("./routes/messages");

// setup the routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});