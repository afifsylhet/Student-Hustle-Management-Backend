const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { addInocme, getSingleIncomeDetails, getAllIncomes, updateIncome, deleteIncome } = require("../controllers/incomeController");

const router = express.Router();


router.route("/income/new").post(isAuthenticatedUser, addInocme);
router.route("/income/:id").get(isAuthenticatedUser, getSingleIncomeDetails);
router.route("/admin/incomes").get(isAuthenticatedUser, authorizeRoles("admin"), getAllIncomes)
router.route("/admin/income/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateIncome).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteIncome)


module.exports = router