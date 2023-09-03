const express = require("express");
const router = express.Router();
const passport = require('passport');

const {postTransaction, getTransaction, deleteTransaction, updateTransaction} = require("../controllers/transactions");
const {registerUser, loginUser} = require("../controllers/auth");

router.get("/", (req, res)=>{
    res.send(`<h1>hello there from trans</h1>`)
    console.log("root node");
});

// transactions routes
router.post("/transaction", postTransaction);
router.get("/transaction", passport.authenticate('jwt', { session: false }), getTransaction);
router.delete('/transaction/:id', deleteTransaction);
router.patch('/transaction/:id', updateTransaction);

// auth routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// getting user routes
router.post("/user", passport.authenticate('jwt', { session: false }), (req, res)=>{
    console.log(req.user);
    res.json({user: req.user});
})

// router.get("/", passport.authenticate("jwt", {session: false}),
//     (req, res) => {
//   res.json({ user: req.user });
// )
module.exports = router;