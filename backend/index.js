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
  database: 'tabletdb'  // Replace with your database name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.use(express.json());

// GET all tablets
app.get('/tablets', (req, res) => {
  const query = 'SELECT * FROM Tablets';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tablets:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// GET a tablet by ID
app.get('/tablets/:id', (req, res) => {
  const query = 'SELECT * FROM Tablets WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error fetching tablet:', err);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) {
      return res.status(404).send('Tablet not found');
    }
    res.json(results[0]);
  });
});

// POST a new tablet
app.post('/tablets', (req, res) => {
  const { manufacturer, model, processor, processorClockSpeed, processorCores, storage, screenSize, screenResolution, price } = req.body;
  const query = `
    INSERT INTO Tablets (manufacturer, model, processor, processor_clock_speed, processor_cores, storage, screen_size, screen_resolution, price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [manufacturer, model, processor, processorClockSpeed, processorCores, storage, screenSize, screenResolution, price];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting tablet:', err);
      return res.status(500).send('Database error');
    }
    res.status(201).send(`Tablet added with ID: ${result.insertId}`);
  });
});

// PUT to update a tablet by ID
app.put('/tablets/:id', (req, res) => {
  const { manufacturer, model, processor, processorClockSpeed, processorCores, storage, screenSize, screenResolution, price } = req.body;
  const query = `
    UPDATE Tablets SET manufacturer = ?, model = ?, processor = ?, processor_clock_speed = ?, processor_cores = ?, storage = ?, screen_size = ?, screen_resolution = ?, price = ?
    WHERE id = ?
  `;
  const values = [manufacturer, model, processor, processorClockSpeed, processorCores, storage, screenSize, screenResolution, price, req.params.id];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating tablet:', err);
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Tablet not found');
    }
    res.send(`Tablet with ID: ${req.params.id} updated successfully`);
  });
});

// DELETE a tablet by ID
app.delete('/tablets/:id', (req, res) => {
  const query = 'DELETE FROM Tablets WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting tablet:', err);
      return res.status(500).send('Database error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Tablet not found');
    }
    res.send(`Tablet with ID: ${req.params.id} deleted successfully`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
