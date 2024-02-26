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
    const currentDate = new Date(); //Get current date and time
    const sql = 'INSERT INTO note (text, category, date) VALUES (?, ?, ?)';
    const [results, fields] = await dbConnection.query(sql, [req.body.text, req.body.category, currentDate]); // Pass both text and category to the query
    res.json({ message: "note added to database" });
  }

  async destroy(req, res) {
    const dbConnection = await this.createDBConnection();
    console.log('connexion db réussie');
    const [results, fields] = await dbConnection.query('DELETE FROM note WHERE id = ?', [req.params.id]);
    res.json({ message: "note deleted", results: results });
  }

  async update(req, res) {
    console.log("Update function");
    console.log(req);
    const dbConnection = await this.createDBConnection();
    const sql = 'UPDATE note SET text = ?, category = ? WHERE id = ?';
    const [results, fields] = await dbConnection.query(sql, [req.body.text, req.body.category, req.params.id]);
    console.log(results);
    console.log(fields);
    // Check if any rows were affected by the update
    if (results.affectedRows === 1) {
      // Fetch the updated note from the database
      const [updatedNote] = await dbConnection.query('SELECT * FROM note WHERE id = ?', [req.params.id]);
      // Send back the updated note in the response
      res.json({ message: "note updated", note: updatedNote });
    } else {
      res.status(404).json({ message: "note not found" });
    }
  }

  async createDBConnection() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'note'
    });
  }
}
