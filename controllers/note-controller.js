import mysql from 'mysql2/promise';

import 'dotenv/config'
//console.log(process.env);

const dbConnection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}); 

export class NoteController {
  async listAll(req, res) {
    console.log('noteController should list them all');
    //const dbConnection = await this.createDBConnection();
    const [results, fields] = await dbConnection.query('SELECT * FROM note');
    res.send(results);
  }

  async create(req, res) {
    console.log('noteController create');
    //const dbConnection = await this.createDBConnection();
    const currentDate = new Date(); //Get current date and time
    const sql = 'INSERT INTO note (text, category, date) VALUES (?, ?, ?)';
    const [results, fields] = await dbConnection.query(sql, [req.body.text, req.body.category, currentDate]); // Pass both text and category to the query
    res.json({ message: "note added to database" });
  }

  async destroy(req, res) {
    //const dbConnection = await this.createDBConnection();
    console.log('connexion db réussie');
    const [results, fields] = await dbConnection.query('DELETE FROM note WHERE id = ?', [req.params.id]);
    res.json({ message: "note deleted", results: results });
  }

  async update(req, res) {
    //const dbConnection = await this.createDBConnection();
    console.log("NoteController update function:");
    //console.log(req);
    const sql = 'UPDATE note SET text = ? WHERE id = ?';
    const [results, fields] = await dbConnection.query(sql, [req.body.text, req.params.id]);
  }
}
