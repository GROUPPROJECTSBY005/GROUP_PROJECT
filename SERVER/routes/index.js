const express = require('express')
const { Controller } = require('../controllers/controller')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/login', Controller.login)
router.post('/register', Controller.register)

module.exports = router