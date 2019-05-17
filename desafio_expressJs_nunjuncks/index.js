const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const checkAgeQueryParam = (req, res, next) => {
  const { name } = req.query

  if (!name) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('start')
})

app.get('/major', checkAgeQueryParam, (req, res) => {
  const { name } = req.query

  return res.render('major', { name })
})

app.get('/minor', checkAgeQueryParam, (req, res) => {
  const { name } = req.query

  return res.render('minor', { name })
})

app.post('/check', (req, res) => {
  const { name } = req.body
  if (name.length > 3) {
    return res.redirect(`/major?name=${name}`)
  } else {
    return res.redirect(`/minor?name=${name}`)
  }
})

app.listen(3000)
