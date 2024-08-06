import { Router } from "express";
import { getDashboardMatrics } from "../controllers/dashoardControllers";

const router = Router();

router.get("/", getDashboardMatrics);

export default router;
