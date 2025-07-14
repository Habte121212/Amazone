const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
// setGlobalOptions({ maxInstances: 10 });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

// initialize express
const app = express();

//middleware
app.use(cors({ origin:true }))
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).json({ message: 'success'})
})

//port
exports.server = onRequest(app);

// stripe payment
app.post('/payment/create', async (req, res) => {
  const total = req.query.total;
  if(total > 0){
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd'
    })
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  }else{
    res.status(400).json({ error: 'Total amount must be greater than zero'})
  }
})
