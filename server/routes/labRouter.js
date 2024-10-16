const Router = require('express')
const router =  new Router()
const labController = require('../controllers/labController')


router.post('/',labController.create)
router.get('/',labController.getAll)
router.delete('/',labController.delete)

module.exports = router