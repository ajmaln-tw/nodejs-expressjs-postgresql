import { Router } from "express";

import * as controller from "../controllers/Service";

const router = Router();

router.get("/customers", controller.customers);
router.get("/customer/:id", controller.customerById);

router.get("/users", controller.users);


export default router;
