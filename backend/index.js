import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const PORT = 3000;

app.use(cors())

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'TabletDb'  // Replace with your database name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.use(express.json());

// Get all tablets
app.get('/tablets', (req, res) => {
  db.query('SELECT * FROM Tablets', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get tablet by ID
app.get('/tablets/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Tablets WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Add a new tablet
app.post('/tablets', (req, res) => {
  const { manufacturer, model, processor, ram, storage, screen_resolution, screen_type, operating_system } = req.body;
  const query = 'INSERT INTO Tablets (manufacturer, model, processor, ram, storage, screen_resolution, screen_type, operating_system) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [manufacturer, model, processor, ram, storage, screen_resolution, screen_type, operating_system], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...req.body });
  });
});

// Update a tablet by ID
app.put('/tablets/:id', (req, res) => {
  const { id } = req.params;
  const { manufacturer, model, processor, ram, storage, screen_resolution, screen_type, operating_system } = req.body;
  const query = 'UPDATE Tablets SET manufacturer = ?, model = ?, processor = ?, ram = ?, storage = ?, screen_resolution = ?, screen_type = ?, operating_system = ? WHERE id = ?';
  db.query(query, [manufacturer, model, processor, ram, storage, screen_resolution, screen_type, operating_system, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Tablet updated');
  });
});

// Delete a tablet by ID
app.delete('/tablets/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Tablets WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Tablet deleted');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
