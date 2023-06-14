import { Router } from "express";

import * as controller from "../controllers/Service";
import { getByIdValidator, paginationValidator, validateUserDetails } from "../utils/validators/UserValidator";


const router = Router();

router.get("/customers", controller.customers);
router.get("/customer/:id", controller.customerById);
router.get("/profile", controller.getProfile);
router.get("/users", paginationValidator, controller.users);
router.get("/users/:id", getByIdValidator, controller.userById);

router.put("/users/:id", validateUserDetails, controller.updateUser);


export default router;
