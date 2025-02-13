const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import offer-related actions
const { browse, add, getById, update, remove } = require("../../../controllers/CandidateActions");

// Route to get a list of offers
router.get("/", browse);

router.post("/", add);

router.get('/:id', getById);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;
