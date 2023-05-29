const Router = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const router = new Router



router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', "password must be longer than 3 and shorter then 12").isLength({min:3, max:12})
    ],
    async (req,res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return  res.status(400).json({message: "wrong data", errors})
        }

        const {email, password} = req.body
        const canditate = await User.findOne({email})

        if (canditate){
            return res.status(400).json({message:`User with email ${email} already exist `})
        }
        const hashPassword = await bcrypt.hash(password, 7)
        const user = new User({email, password:hashPassword})
        await user.save()
        return res.json({message: "User was created"})

    }catch (error){
        console.log(error)
    }

})

module.exports = router