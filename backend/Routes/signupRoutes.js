const express = require('express')
const router = express.Router()
const UserData = require("../Models/UserData")
const bcrypt = require("bcryptjs")

router.post('/', async (req, res) => {
    try {
        const { username, password, phone, first_name, last_name, user_status} = req.body;
        console.log(req.body)
        const user = await UserData.findOne({username});
        console.log("user data",user)
        if (!user) {
            const hashedPwd = bcrypt.hashSync(password, 8)
            const user = await UserData.create({username, password:hashedPwd, first_name, last_name, phone, user_status})
            res.status(200).json({success: true, message: "Successfully created the user"})
        } else {
            res.status(400).json({message: "Email id already taken"})
        }
    }catch (err) {
        console.error('Error:', err);
        res.status(400).json({message: "Fail to connect"})
        // res.json({ success: false });
        // return;
    }
})
module.exports = router;