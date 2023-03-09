import express from "express"
import {userController} from "../controllers/userController.js"
import { authMiddleware } from "./authMiddleware.js";

const router = express.Router()

router.post("/register", userController.registration)
router.post("/login", userController.login)
router.get("/", authMiddleware, userController.getAllUsers)
router.get("/:id", authMiddleware, userController.getById)
router.put("/:id", authMiddleware, userController.update)
router.delete("/:id", authMiddleware, userController.delete)


export {router}