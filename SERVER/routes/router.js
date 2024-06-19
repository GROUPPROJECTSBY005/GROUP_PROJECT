const express = require('express')
const app = express()
const port = 3000
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router