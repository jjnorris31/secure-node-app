const express = require("express");

const auth = require("../middleware/auth");
const {admin, editor, viewer} = require("../middleware/roles");

let messages = [{id: 1, name: "Lorem ipsum dolor", content: "Lep ipsum dolor sit amet"}];

const router = express.Router();

router.get("/", [auth, viewer], (req, res) => {
    res.send({
        ok: true,
        result: messages
    })
});

router.post("/", [admin, auth, editor], async (req, res) => {
    messages.push({id: messages.length + 1, name: req.body.name, content: req.body.content});
    res.status(200).send({
        ok: true,
        result: messages
    })
});

module.exports = router;