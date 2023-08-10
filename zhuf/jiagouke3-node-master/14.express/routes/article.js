const express = require('../express');
const router =  express.Router()

router.get('/add', function(req, res) {
    res.end('add -article')
})
router.get('/remove', function(req, res) {
    res.end('remove -article')
})

module.exports = router