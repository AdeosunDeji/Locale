import { Router } from 'express';
import UserController from '../controller/users';
import Authentication from '../middlewares/auth';

const router = Router();
const { createUser, loginUser } = UserController;
const { authorizeApiKey } = Authentication;

router.post("/register",  createUser);
router.post("/login", authorizeApiKey, loginUser);

export default router;
