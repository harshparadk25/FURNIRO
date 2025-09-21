import { Router } from "express";
import { body } from "express-validator";
import { createProduct, updateProduct, deleteProduct ,getAllProducts } from "../controller/product.controller.js";
import { validate } from "../middleware/middleware.js";

const router = Router();

router.post("/create",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("brand").notEmpty().withMessage("Brand is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be a number greater than 0"),
  ],
    validate,
  createProduct
);

router.put("/update/:id",
  [
    body("title").notEmpty().withMessage("Title is required"),  
    body("brand").notEmpty().withMessage("Brand is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be a number greater than 0"),
  ],
    validate,
  updateProduct
);

router.delete("/delete/:id", deleteProduct);
router.get("/all", getAllProducts);

export default router;

