// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all candidates from the database
    const candidates = await tables.candidate.readAll();

    // Respond with the candidates in JSON format
    res.json(candidates);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const candidate = req.body;
    console.info(candidate);
    
    // Créer un nouvel utilisateur
    const newCandidate = await tables.candidate.create(candidate);

    res.status(201).json(newCandidate); // Répondre avec le candidat créé
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Lire un candidat par ID
    const candidate = await tables.candidate.readById(id);

    if (!candidate) {
      res.status(404).json({ message: "Candidat non trouvé" });
      return;
    }

    res.json(candidate); // Répondre avec le candidat trouvé
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidate = req.body;
    
    // Mettre à jour un candidat par ID
    const success = await tables.candidate.update(id, candidate);

    if (!success) {
      res.status(404).json({ message: "Impossible de mettre à jour le candidat" });
      return;
    }

    res.json({ message: "Candidat mis à jour avec succès" }); // Répondre avec confirmation
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Supprimer un candidat par ID
    const success = await tables.candidate.delete(id);

    if (!success) {
      res.status(404).json({ message: "Impossible de supprimer le candidat" });
      return;
    }

    res.json({ message: "Candidat supprimé avec succès" }); // Répondre avec confirmation
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  add,
  getById,
  update,
  remove,
};
