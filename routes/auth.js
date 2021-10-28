const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const { threadId } = require("worker_threads");

// setup the express server router
const router = express.Router();

// on post
router.post("/", async (req, res) => {
    const users = [{ email: "jjnorris31@gmail.com", password: "$2b$15$CRGGUar893SkR8N4VDJd/ujJz35ndD2/UkSkxuFlRyDrkauNENJ52", roles: ["admin", "editor", "viewer"]}];

    let user = users.find(u => u.email === req.body.email);
    if (!user) throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) throw new Error("Invalid email or password");

    const token = jwt.sign({
        id: user._id,
        roles: user.roles,
    }, "jwtPrivateKey", {expiresIn: "15m"});

    res.send({
        ok: true,
        token: token
    });
});

module.exports = router;