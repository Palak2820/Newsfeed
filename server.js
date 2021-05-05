const express = require('express');
const dotenv = require("dotenv");


const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

const methodOverride = require('method-override')
const app = express()
dotenv.config();
var url = process.env.MONGODB_URI  || "mongodb://localhost:27017/blog"; 
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connection Successful"))
    .catch(err => console.log(err))
/*mongoose.connect(process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/blog',
{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})*/


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)
const port = process.env.PORT || '5000';

app.listen(port,() => console.log('server started on port 5000'))