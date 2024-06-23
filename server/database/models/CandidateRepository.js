// Import de la classe AbstractRepository
const AbstractRepository = require("./AbstractRepository");

// Repository pour la table "candidate"
class CandidateRepository extends AbstractRepository {
  constructor() {
    // Appelle le constructeur de la classe parente (AbstractRepository)
    // et passe le nom de la table "candidate" comme configuration
    super({ table: "candidate" });
  }

  // Méthode pour créer un nouveau candidat
  async create(candidate) {
    const [result] = await this.database.query(
      `
      INSERT INTO ${this.table} (lastname, firstname, birthday)
      VALUES (?, ?, ?)
    `,
      [candidate.lastname, candidate.firstname, candidate.birthday]
    );

    const newCandidateId = result.insertId;
    const [newCandidate] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [newCandidateId]
    );

    return newCandidate[0];
  }

  // Méthode pour lire la liste des candidats
  async readAll() {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table}`
    );
    return rows;
  }

  // Méthode pour lire un candidat par ID
  async readById(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  // Méthode pour mettre à jour un candidat par ID
  async update(id, candidate) {
    const [result] = await this.database.query(
      `
      UPDATE ${this.table}
      SET lastname = ?, firstname = ?, birthday = ?
      WHERE id = ?
    `,
      [candidate.lastname, candidate.firstname, candidate.birthday, id]
    );

    return result.affectedRows > 0;
  }

  // Méthode pour supprimer un candidat par ID
  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }
}

// Exporte la classe CandidateRepository
module.exports = CandidateRepository;
