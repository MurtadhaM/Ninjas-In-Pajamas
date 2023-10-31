/**
 * @description: This file contains all the routes for the API
 * 
 */
// Validate
const {
  validateScope,
  validateFromTo,
  validateText
} = require("../middlewares/validator");
// Is Authenticated
const isAuthenticated = require("../middlewares/auth");
// Require express
const express = require("express");
// Create a new router
const router = express.Router();
// Require the controllers
const apiController = require("../controllers/apiController");
// Define routes
router.get(
  "/languages",
  isAuthenticated,
  validateScope,
  apiController.languages
);
router.post("/translate", validateText, apiController.translate);
router.post(
  "/dictionary",
  validateFromTo,
  validateText,
  apiController.dictionaryLookup
);
router.post("/detect", validateText, apiController.Detect);
router.post(
  "/transliterate",
  isAuthenticated,
  validateText,
  apiController.transliterateText
);

module.exports = router;
exports.router = router;
