import { Router } from "express";
import stateRoutes from './stateRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use("/users", userRoutes);
router.use("/states", stateRoutes);

export default router;