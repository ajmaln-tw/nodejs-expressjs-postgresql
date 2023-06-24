import { Router } from "express";

import * as controller from "../controllers/Service";
import * as profileController from "../controllers/Profile";
import { getByIdValidator, paginationValidator, validateUserDetails } from "../utils/validators/UserValidator";
import { validateCustomerDetails } from "../utils/validators/CustomerValidator";


const router = Router();

router.get("/profile", controller.getProfile);

router.put("/update-customerDetails", controller.createCustomer);
router.patch("/update-customerDetails/:customerId", controller.updateCustomer);
router.get("/customers", paginationValidator, controller.customers);
router.get("/customers/:id", controller.customerById);
router.put("/customers/:id", validateCustomerDetails, controller.updateCustomer);

router.get("/users", paginationValidator, controller.users);
router.get("/users/:id", getByIdValidator, controller.userById);
router.put("/users/:id", getByIdValidator, validateUserDetails, controller.updateUser);
router.delete("/users/:id", controller.deleteUserById);

router.get("/profile/:id", profileController.profileById)

export default router;
