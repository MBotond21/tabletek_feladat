import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json());

// Set up MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'tabletdb'  // Replace with your database name
}).promise();

app.get('/tablets', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const offset = (page - 1) * limit;
  try {        
      const countResult = await db.query('SELECT COUNT(*) as total FROM tablets');
      const total = countResult[0][0].total;
      const temp = await db.query('SELECT * FROM tablets LIMIT ? OFFSET ?', [limit, offset]);
      const rows = temp[0];
      res.status(200).json({
          data: rows,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
      });
  } catch (error) {
      console.error(`Error retrieving tablets ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// // GET all tablets
// app.get('/tablets', (req, res) => {
//   const query = 'SELECT * FROM Tablets';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching tablets:', err);
//       return res.status(500).send('Database error');
//     }
//     res.json(results);
//   });
// });

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
// app.post('/tablets', (req, res) => {
//   const { manufacturer, model, processor, processorClockSpeed, processorCores, storage, screenSize, screenResolution, price } = req.body;
//   const query = `
//     INSERT INTO Tablets (manufacturer, model, processor, processor_clock_speed, processor_cores, storage, screen_size, screen_resolution, price)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   const values = [manufacturer, model, processor, processorClockSpeed, processorCores, storage, screenSize, screenResolution, price];
//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error('Error inserting tablet:', err);
//       return res.status(500).send('Database error');
//     }
//     res.status(201).send(`Tablet added with ID: ${result.insertId}`);
//   });
// });

// POST /tablets
app.post('/tablets', async (req, res) => {
  const {
    manufacturer,
    model,
    processor,
    processorClockSpeed,
    processorCores,
    storage,
    screenSize,
    screenResolution,
    price,
  } = req.body;

  const query = `
    INSERT INTO Tablets (manufacturer, model, processor, processor_clock_speed, processor_cores, storage, screen_size, screen_resolution, price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    manufacturer,
    model,
    processor,
    processorClockSpeed,
    processorCores,
    storage,
    screenSize,
    screenResolution,
    price,
  ];

  try {
    const [result] = await db.query(query, values);
    res.status(201).send(`Tablet added with ID: ${result.insertId}`);
  } catch (err) {
    console.error('Error inserting tablet:', err);
    res.status(500).send('Database error');
  }
});

// DELETE /tablets/:id
app.delete('/tablets/:id', async (req, res) => {
  const query = 'DELETE FROM Tablets WHERE id = ?';

  try {
    const [result] = await db.query(query, [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).send('Tablet not found');
    }

    res.send(`Tablet with ID: ${req.params.id} deleted successfully`);
  } catch (err) {
    console.error('Error deleting tablet:', err);
    res.status(500).send('Database error');
  }
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
// app.delete('/tablets/:id', (req, res) => {
//   const query = 'DELETE FROM Tablets WHERE id = ?';
//   db.query(query, [req.params.id], (err, result) => {
//     if (err) {
//       console.error('Error deleting tablet:', err);
//       return res.status(500).send('Database error');
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).send('Tablet not found');
//     }
//     res.send(`Tablet with ID: ${req.params.id} deleted successfully`);
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
