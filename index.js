const express = require("express");
const mongoose = require("mongoose");
const Customer = require('./models/customer');
const cors = require('cors');
mongoose.connect("mongodb://127.0.0.1:27017/customer_manager_db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/customers", async (req, res) => {
  // const _id = req.params.id;
  const customers = await Customer.find();

  res.json(customers);
});

//GET /customers/id
app.get("/customers/:id", async (req, res) => {
  const _id = req.params.id;
  const customer = await Customer.findById(_id);
  res.json(customer);
});


//GET /customers/byname
app.get("/customersbyname", async (req, res) => {
  const name = req.query.name;
  const customer = await Customer.find(name);
  res.json(customer);
});

//POST /customers/id
app.post("/customers", async (req, res) => {

  console.log('/customers', req.body);

  const customer = new Customer(req.body);
  // const customer = req.body;
  await customer.save();
  res.json(customer);
});

//PATCH or UPDATE /customers/id
app.patch("/customers/:id", async (req, res) => {
  const _id = req.params.id;
  // const customer = req.body;

  const customer = await Customer.findByIdAndUpdate(_id, req.body);

  res.json(customer);
});

//DELETE /customers/id
app.delete("/customers/:id", async (req, res) => {
  const _id = req.params.id;

   const customer = await Customer.findByIdAndRemove(_id, req.body);

  res.json(customer);
});

app.listen(5000, () => console.log("Server is up and running at port 5000!!!"));