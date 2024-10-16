const Router = require('express')
const router =  new Router()
const userLabProgressController = require('../controllers/userLabProgress')


router.post('/',userLabProgressController.create)
router.get('/',userLabProgressController.getAll)
router.delete('/',userLabProgressController.delete)

module.exports = router