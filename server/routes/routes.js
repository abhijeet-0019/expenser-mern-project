const express = require("express");
const router = express.Router();

const {postTransaction, getTransaction} = require("../controllers/transactions");

router.get("/", (req, res)=>{
    res.send(`<h1>hello there from trans</h1>`)
    console.log("root node");
});

router.post("/p_transaction", postTransaction);
router.get("/g_transaction", getTransaction);

module.exports = router;