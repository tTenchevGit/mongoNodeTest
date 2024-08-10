const express = require('express');
const mongodb = require('mongodb');
const { engine } = require('express-handlebars'); // Correct way to import
const app = express();
const port = 3000;

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017'; // MongoDB server URL
const dbName = 'test'; // Your database name

// Set up Handlebars as the template engine
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main', layoutsDir: './views/layouts' }));
app.set('view engine', 'hbs');
app.set('views', './views'); // Set the views directory

app.get('/', async (req, res) => {
    let client;

    try {
        client = await MongoClient.connect(url); 
        const db = client.db(dbName);
        const collection = db.collection('people');
        console.log('Connected to MongoDB');
        const people = await collection.find({}).toArray();
        res.render('index', { title: 'People List', people });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    } finally {
        if (client) {
            client.close();
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
