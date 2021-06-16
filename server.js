const cors = require('cors');  
const express = require('express');  
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
require('dotenv').config()

const port = process.env.PORT || 4001;  
const app = express();  
app.use(cors(), express.json()); 

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once('open', () => {
    console.log('conneted to MongoDB database');
});

app.use('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true,
 }));
app.listen(  
   port, () => console.info(  
      `Server started on port ${port}`  
   )  
);  