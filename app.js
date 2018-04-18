const keyPublishable = 'pk_test_MFfbY7MJNdAfiej6EQMreG8w';
// const keySecret = 'sk_test_p6zoVCYMwWJ1youg50TCHesk';

const express = require("express");
const stripe = require("stripe")(keySecret);
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var stripe = require("stripe")(
  "sk_test_p6zoVCYMwWJ1youg50TCHesk"
);

var customer = await stripe.customers.create(
  { email: 'customer@example.com' }
);

app.post("https://api.stripe.com/charge/", (req, res) => {
  let amount = 1199;

  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "One 10ml bottle - Shipped!",
      currency: "usd",
      customer: customer.id
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.log("Error:", err);
    res.status(1199).send({error: "Purchase Failed"});
  });
});

app.listen(8000);


