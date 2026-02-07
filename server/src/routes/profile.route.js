import { getProfile, updateProfile, syncUserDataController } from "../controllers/profile.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js'
import { Router } from 'express';
import { validate } from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../validators/profile.schema.js";
const router = new Router();


router.get("/", authMiddleware, getProfile)
router.put("/", authMiddleware,  validate(updateProfileSchema), updateProfile)
router.post("/sync", authMiddleware, syncUserDataController);

export default router;