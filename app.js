const keyPublishable = 'pk_test_MFfbY7MJNdAfiej6EQMreG8w';
const keySecret = 'sk_test_p6zoVCYMwWJ1youg50TCHesk';

const express = require("express");
const stripe = require("stripe")(keySecret);
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/charge", (req, res) => {
  let amount = 1199;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "One 10ml bottle - Shipped!",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"));
});

app.listen(4567);


