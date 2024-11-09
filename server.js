const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required');
    }

    const query = 'INSERT INTO users_reg (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err) => {
      if (err) {
        console.error('Registration error:', err);
        return res.status(500).send('Server error');
      }
      res.status(200).send('User registered successfully');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const query = 'SELECT * FROM users_reg WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).send('Server error');
      }

      if (results.length === 0) {
        console.log('No user found with that email');
        return res.status(401).send('Incorrect email or password');
      }

      const user = results[0];

      if (password === user.password) {
        console.log('Login successful');
        return res.status(200).send('Login successful');
      } else {
        console.log('Incorrect password');
        return res.status(401).send('Incorrect email or password');
      }
    });
});

app.get('/profile', (req, res) => {
    const email = req.query.email;

    const query = 'SELECT name, email, phone, dob FROM users_reg WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error retrieving profile:', err);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(results[0]);
    });
});

app.post('/updateProfile', (req, res) => {
    const { email, phone, dob } = req.body;
  
    const query = 'UPDATE users_reg SET phone = ?, dob = ? WHERE email = ?';
    db.query(query, [phone, dob, email], (err) => {
      if (err) {
        console.error('Error updating profile:', err);
        return res.status(500).send('Server error');
      }
  
      res.status(200).send('Profile updated successfully');
    });
});

const loadProfileData = async () => {
    try {
      const email = localStorage.getItem('profileEmail');
      const response = await fetch(`http://127.0.0.1:3000/profile?email=${email}`);
      
      if (!response.ok) throw new Error('Failed to fetch profile');
  
      const profileData = await response.json();
      document.getElementById('name').value = profileData.name;
      document.getElementById('email').value = profileData.email;
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };
  

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});