const express = require("express");
const adminController = require('../controllers/adminController');

const router = express();
router.use(express.Router());
router.use(express.json());

// Main dashboard page
router.get("/", adminController.index);

// view detail user
router.get("/:id", adminController.details);

// Create new user
router.post("/", adminController.add);

// Edit page
router.get("/:id/edit", adminController.editView);

// Edit detail User
router.put("/:id", adminController.edit);

// Delete User
router.delete("/:id", adminController.delete);

module.exports = router;
