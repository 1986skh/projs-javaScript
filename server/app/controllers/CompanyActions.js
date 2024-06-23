// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all companies from the database
    const companies = await tables.company.readAll();

    // Respond with the companies in JSON format
    res.json(companies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read by Name operation
const browseByName = async (req, res, next) => {
  try {
    const { name } = req.query; // assuming the name is passed as a query parameter

    // Fetch companies by name from the database
    const companies = await tables.company.readByName(name);

    // Respond with the companies in JSON format
    res.json(companies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The C of BREAD - Create operation
const add = async (req, res, next) => {
  try {
    // Get the company data from the request body
    const companyData = req.body;

    // Create a new company in the database
    const newCompany = await tables.company.create(companyData);

    // Respond with the new company in JSON format
    res.status(201).json(newCompany);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  browseByName,
  add,
};
