const express = require('express');

const app = express();

const PORT = 3080;

const path = require('path');

const db = require('./server/database/db');

// const testRoutes = require('./server/routes/testRoutes');
const vocabRoutes = require('./server/routes/vocabRoutes');

const phraseRoutes = require('./server/routes/phraseRoutes')

const randomRoutes = require('./server/routes/randomRoutes');

app.use(express.static(path.join(__dirname, 'public')));

//Use express to parse JSON
app.use(express.json());

//Connect to vocabulary backend for database, user accounts, persistent data, SQLlite, authentication
app.use('/api/vocab', vocabRoutes);

app.use('/api/phrases', phraseRoutes);

app.use('/api/random', randomRoutes);





app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});