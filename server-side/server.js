import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postsRoutes from './routes/posts.js';

const app = express()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postsRoutes);

const port = process.env.port || 5000;
const DB_URL = `mongodb+srv://muhammed_magdy:m16f16ak47@mern-stack-learning.kzvc5.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('DB Connected')
    app.listen(port, () => {
      console.log(`Running in port : ${port}`)
    })
}).catch(err => {
    console.log(err.message)
});

// mongoose.set('useFindAndModify', false);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

