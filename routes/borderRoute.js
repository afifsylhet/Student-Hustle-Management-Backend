const express = require("express");


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { getAllBorders, addBorder, updateBorder, deleteBorder, getBorderDetails } = require("../controllers/borderControllers");

const router = express.Router();

router.route("/borders").get(getAllBorders);

router
  .route("/border/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addBorder);

router
  .route("/borderer/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBorder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBorder)
  .get(getBorderDetails);


module.exports = router;
