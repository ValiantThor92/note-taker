// import necessary dependencies
const express = require('express');
const fs = require("fs");
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// create port and initialize express
const app = express();
const PORT = process.env.PORT || 3001;

// middleware and api routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// invalid request 404 response and end app
app.use((req, res) => {
  res.status(404).end();
});

// start server and listen on desired port
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});