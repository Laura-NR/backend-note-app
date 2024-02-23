import mysql from 'mysql2/promise';

export class NoteController {
  async listAll(req, res) {
    console.log('noteController should list them all');
    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'note'
    });
    console.log('connexion db réussie');
    const [results, fields] = await dbConnection.query('SELECT * FROM note');
    res.send(results);
  }

  //Create new note
  async create(req, res) {
    console.log('noteController create');
    const newNote = req.body;
    
    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'note'
    });

    const sql = 'INSERT INTO note (text) VALUE (?)';
    const [results, fields] = await dbConnection.query(sql, [req.body.text]);

    res.json({message: "note added to database"});
  }

  //Delete note
  async destroy(req, res) {
    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'note'
    });
    console.log('connexion db réussie');
    const [results, fields] = await dbConnection.query('DELETE FROM note WHERE id = ?', [req.params.id])
    res.json({message: "note deleted", results: results})
  }
}
