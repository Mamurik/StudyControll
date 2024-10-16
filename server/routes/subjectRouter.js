const Router = require('express')
const router =  new Router()
const subjectController = require('../controllers/subjectController')


router.post('/',subjectController.create)
router.get('/',subjectController.getAll)
router.delete('/:id',subjectController.delete)
router.get('/:id',subjectController.getById)

module.exports = router