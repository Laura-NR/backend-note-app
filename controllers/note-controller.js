import mysql from 'mysql2/promise';

export class NoteController {
  async listAll(req, res) {
    console.log('noteController should list them all');
    const dbConnection = await this.createDBConnection();
    const [results, fields] = await dbConnection.query('SELECT * FROM note');
    res.send(results);
  }

  async create(req, res) {
    console.log('noteController create');
    const dbConnection = await this.createDBConnection();
    const sql = 'INSERT INTO note (text, category) VALUES (?, ?)';
    const [results, fields] = await dbConnection.query(sql, [req.body.text, req.body.category]); // Pass both text and category to the query
    res.json({ message: "note added to database" });
  }

  async destroy(req, res) {
    const dbConnection = await this.createDBConnection();
    console.log('connexion db réussie');
    const [results, fields] = await dbConnection.query('DELETE FROM note WHERE id = ?', [req.params.id]);
    res.json({message: "note deleted", results: results});
  }

  async createDBConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'note'
    });
  }
}
