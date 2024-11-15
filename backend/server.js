const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/authRouter');
const ProductRouter = require('./Routes/productrouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 5173;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(express.json()); // Parse JSON request bodies

app.post('/auth/signup', (req, res) => {
  try {
    const signupInfo = req.body;
    // ... Your signup logic here ... (e.g., validate data, save to database)

    // If successful:
    res.json({ success: true, message: 'Signup successful!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
});

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  }));

// Or, more specifically:
app.use('/auth', cors({
    origin: 'http://localhost:5173' 
}));
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})