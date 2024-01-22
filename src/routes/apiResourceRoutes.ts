import { Router } from "express";

import * as controller from "../controllers/Service";
import * as profileController from "../controllers/Profile";
import { getByIdValidator, paginationValidator, validateUserDetails } from "../utils/validators/UserValidator";
import { validateCustomerDetails } from "../utils/validators/CustomerValidator";
import { upload } from "../utils/handler/imageHandler";


const router = Router();

router.get("/profile", controller.getProfile);
router.put("/profile-update/:id", controller.updateProfile);
router.get("/profile-image", controller.getProfileImage);
router.post("/upload-image", upload.single('file'), controller.uploadImage);

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
