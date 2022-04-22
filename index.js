const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');

mongoose.connect('mongodb://127.0.0.1:27017/customer_manager_db');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Customer Manager')
})

// GET /customers
app.get('/customers', async (req, res) => {
    const Customers = await Customer.find()
    res.json(Customers)
})

// GET /customers/:id
app.get('/customers/:id', async (req, res) => {
    const _id = req.params.id;
    const Customers = await Customer.findById(_id);

    res.json(Customers)
})

// GET /customers by name
app.get('/customersbyname', async (req, res) => {
    const name = req.query.name;
    const Customers = await Customer.find({ name: name});

    res.json(Customers)
})

// POST /customer
app.post('/customers', async (req, res) => {

    const customer = new Customer(req.body);

    await customer.save();

    res.json(customer);
})

// PATCH /customer
app.patch('/customers/:id', async (req, res) => {
    const _id = req.params.id;

    const Customer = await Customer.findByIdAndUpdate(_id. req.body);

    res.json(Customer);
})

// DELETE /customer/:id
app.delete('/customers/:id', async (req, res) => {
    const _id = req.params.id;

    const Customer = await Customer.findByIdAndRemove(_id);

    res.json(Customer)
})

app.listen(3002, () => console.log('Server running on port 3002'))