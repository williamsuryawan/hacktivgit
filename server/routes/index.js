const express = require('express')
const router = express.Router()
const GitController = require('../controllers/gitController.js')

router.get('/repositories/starred', GitController.findStar);
router.post('/repositories', GitController.createRepo)
router.get('/repositories', GitController.findRepo)
// router.get('/repositories/search', GitController.searchRepo)
router.delete('/repositories/unstar', GitController.unstarRepo)

module.exports = router;