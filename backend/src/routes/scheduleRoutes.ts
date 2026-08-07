import { Router } from "express";
import {
  scheduleEmails,
  getCampaigns,
  getEmails,
  deleteEmail,
} from "../controllers/scheduleController";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/schedule", upload.single("file"), scheduleEmails);
router.get("/campaigns", getCampaigns);
router.get("/emails", getEmails);
router.delete("/emails/:id", deleteEmail);

export default router;