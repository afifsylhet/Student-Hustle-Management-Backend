const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { addExpence, getSingleExpenceDetails, getAllExpences, updateExpence, deleteExpence } = require("../controllers/expenceController");

const router = express.Router();


router.route("/expence/new").post(isAuthenticatedUser, addExpence);
router.route("/expence/:id").get(isAuthenticatedUser, getSingleExpenceDetails);
router.route("/admin/expences").get(isAuthenticatedUser, authorizeRoles("admin"), getAllExpences)
router.route("/admin/expence/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateExpence).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteExpence)


module.exports = router