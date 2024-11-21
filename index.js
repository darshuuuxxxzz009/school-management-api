const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Add School API
app.post('/addSchool', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully!', schoolId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
});

app.get('/listSchools', async (req, res) => {
    const { latitude, longitude } = req.query;
  
  
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }
  
    try {
    
      const [schools] = await pool.query('SELECT * FROM schools');
  
      const userLat = parseFloat(latitude);
      const userLng = parseFloat(longitude);
  
      const schoolsWithDistance = schools.map((school) => {
        const distance = calculateDistance(userLat, userLng, school.latitude, school.longitude);
        return { ...school, distance };
      });
  
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  
      res.status(200).json(schoolsWithDistance);
    } catch (err) {
      console.error('Error fetching schools:', err);
      res.status(500).json({ error: 'Server error.' });
    }
  });
  

function calculateDistance(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
