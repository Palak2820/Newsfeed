const express = require('express');
const dotenv = require("dotenv");


const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

const methodOverride = require('method-override')
const app = express()
dotenv.config();
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/blog',
{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})


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