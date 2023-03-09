import jwt from "jsonwebtoken"
import {secret} from "../config/env.js"

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }
    try {
        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' })
    }
}

export { authMiddleware }