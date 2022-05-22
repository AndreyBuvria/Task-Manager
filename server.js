const express = require('express');
const app = express(); 
const PORT = 3000; 
const tasks = require('./routes/users');
const connectDB = require('./db/connect');
require('dotenv').config();

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.get('/', (res, req) => {
    req.send('it works');
});

app.use('/api/v1/tasks', tasks);

(async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
    } catch (error) {
        console.log(error);        
    }
})();
