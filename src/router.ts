import { Router } from "express";
import { BookstoreController } from "./controller";

const router = Router();
router.get("/api/get-books", BookstoreController.getBooksController);
router.get("/metrics", BookstoreController.metricsController);

router.post("/api/register-book", BookstoreController.registerBookController);
router.put("/api/change-books/:id", BookstoreController.updateBookController);
router.delete("/api/delete-book/:id", BookstoreController.deleteBookController);

export default router;
