const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { addRoom, getSingleRoomDetails, getAllRooms, updateRoom, deleteroom,  } = require("../controllers/roomController");

const router = express.Router();


router.route("/room/new").post(isAuthenticatedUser, addRoom);
router.route("/room/:id").get(isAuthenticatedUser, getSingleRoomDetails);
router.route("/admin/rooms").get(isAuthenticatedUser, authorizeRoles("admin"), getAllRooms)
router.route("/admin/room/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateRoom).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteroom)


module.exports = router