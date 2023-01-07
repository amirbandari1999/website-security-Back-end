import express from "express";
import {registerUser,authUser,updateUserProfile} from "../controllers/userControllers.js";
import {protect} from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route('/profile').post(protect, updateUserProfile);

export default router;

