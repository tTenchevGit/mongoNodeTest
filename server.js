const express = require('express');
// const mongodb = require('mongodb');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars'); // Correct way to import
const app = express();
const port = 3000;

// const MongoClient = mongodb.MongoClient;
// const url = 'mongodb://localhost:27017'; 
// const dbName = 'test'; 
const url = 'mongodb://localhost:27017/test';

async function connectToDatabase() {
    try{
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB with Mongoose');
    }catch(err){
        console.error(err); 
    }
};
connectToDatabase();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    
});

const Person = mongoose.model('Person', personSchema);


app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main', layoutsDir: './views/layouts' }));
app.set('view engine', 'hbs');
app.set('views', './views'); 

// app.get('/', async (req, res) => {
//     let client;

//     try {
//         client = await MongoClient.connect(url); 
//         const db = client.db(dbName);
//         const collection = db.collection('people');
//         console.log('Connected to MongoDB');
//         const people = await collection.find({}).toArray();
//         res.render('index', { title: 'People List', people });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error connecting to the database');
//     } finally {
//         if (client) {
//             client.close();
//         }
//     }
// });


app.get('/', async (req, res) => {

    try {
        const people = await Person.find({});
        res.render('index', { title: 'People List', people });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to the database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
