const express = require("express");
const router =express.Router();
const Delivery = require("../Model/DeliveryModel");
const DeliveryController = require("../Controllers/DeliveryControllers");

router.get("/",DeliveryController.getAllDelivery);
router.post("/",DeliveryController.addDeliverys);
router.get("/:id",DeliveryController.getById);
router.put("/:id",DeliveryController.updateDelivery);
router.delete("/:id",DeliveryController.deleteDelivery );

module.exports = router;