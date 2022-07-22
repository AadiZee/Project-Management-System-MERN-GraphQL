const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 3001;

const app = express();

// Connect to db
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development" ? true : false, //to use graphiql tool in development
  })
);

app.listen(port, console.log(`Server listening on ${port}`));
