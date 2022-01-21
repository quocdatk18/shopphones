import { UserModel } from '../models/UserModel.js'
import { generateToken } from '../untils/until.js'
import expressAsyncHandler from 'express-async-handler'

export const getAllUser = (req, res) => {
    UserModel.find({})
        .then(user => res.json(user))
        .catch(err => console.log(err))
}

export const registerUser = expressAsyncHandler(async (req, res) => {
    const user = new UserModel({
        // _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: '',
        phone: '',
        isAdmin: false,

    })
    const emailExist = await UserModel.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email đã tồn tại")
    user.save();
    res.json({
        success: true,
        token: generateToken(user),
        message: "Register successfully !",
        user
    });
})

export const login = expressAsyncHandler(async (req, res) => {

    try {
        const user = await UserModel.findOne({ email: req.body.email, password: req.body.password })
        console.log(user)
        if (user) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                address: user.address,
                phone: user.phone,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
        } else {
            res.status(401).json({ message: "invalid email or password" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error !" })
    }
})

export const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById({ _id: req.params.id })

    if (user) {
        await user.remove()
        res.send({ message: 'user deleted' })
    } else {
        res.send({ message: 'user not exists' })
    }
})

export const checkUser = async (req, res) => {
    const user = await UserModel.findById(req.user._id).select("-password");
    if (!user) return res.status(403).json({ success: false, message: "Unauthrazition !" })
    const token = generateToken(user);

    return res.status(200).json({ success: true, user: { ...user._doc, token }, message: "Authen success" })

}