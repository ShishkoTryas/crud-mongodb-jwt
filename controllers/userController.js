import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import {secret} from "../config/env.js"

const userController = {}

userController.registration = async (req, res) => {
    try {
        const {email, password} = req.body
        if (email.empty) {
            res.status(402).json({ "error": "email empty" })
            return
        }
        const user = new User({ email, password })
        user.hashPass()
        await user.save()
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ "error": err.message })
        console.log(err)
    }
}

userController.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email.empty && password.empty) {
            return
        }
        const user = await User.findOne({email})
        if (!user || !user.check(password)) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ username: user.email }, secret);
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message })
        console.log(err)
    }
}

userController.getAllUsers = async (req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({error: err.message})
        console.log(err)
    }
}

userController.getById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

userController.update = async (req, res) => {
    const { id } = req.params
    const { username, password } = req.body
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }
        user.username = username || user.username
        user.password = password || user.password
        user.hashPass()
        await user.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

userController.delete = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return;
        }
        await user.remove()
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export { userController }