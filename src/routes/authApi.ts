import { Router } from "express";

import * as controller from "../controllers/Auth";

const router = Router();

router.post("/sign-in", controller.signIn);
router.post("/sign-up", controller.signUp);


export default router;
