const Router = require('express')
const router =  new Router()
const userLabProgressController = require('../controllers/userLabProgress')


router.post('/',userLabProgressController.create)
router.get('/',userLabProgressController.getAll)
router.delete('/:id',userLabProgressController.delete)
router.put('/:id', userLabProgressController.update);

module.exports = router