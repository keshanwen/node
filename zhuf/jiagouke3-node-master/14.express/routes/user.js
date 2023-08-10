const express = require('../express');
const router = express.Router()


router.get('/add', function(req, res) {
    res.end('add -user')
})
router.get('/remove', function(req, res) {
    res.end('remove -user')
})

module.exports = router