const AbstractRepository = require("./AbstractRepository");

class CompanyRepository extends AbstractRepository {
  constructor() {
    // Appelle le constructeur de la classe parente (AbstractRepository)
    // et passe le nom de la table "company" comme configuration
    super({ table: "company" });
  }

  // Opérations de lecture

  async readAll() {
    // Exécute la requête SQL SELECT pour récupérer toutes les entreprises de la table "company"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    // Retourne le tableau des entreprises
    return rows;
  }

  async readByName(name) {
    // Exécute la requête SQL SELECT pour récupérer les entreprises par nom
    const [rows] = await this.database.query(`SELECT * FROM ${this.table} WHERE name = ?`, [name]);
    // Retourne le tableau des entreprises trouvées
    return rows;
  }

  async create(company) {
    // Exécute la requête SQL INSERT pour ajouter une nouvelle entreprise
    const [result] = await this.database.query(
      `
      INSERT INTO ${this.table} (name, email)
      VALUES (?, ?)
    `,
      [company.name, company.email]
    );
  
    // Récupère l'identifiant de la nouvelle entreprise créée
    const newCompanyId = result.insertId; 
  
    // Exécute une requête SQL SELECT pour récupérer les détails de la nouvelle entreprise
    const [newCompany] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [newCompanyId]
    );
  
    // Retourne la nouvelle entreprise
    return newCompany[0];
  }
}

module.exports = CompanyRepository;
