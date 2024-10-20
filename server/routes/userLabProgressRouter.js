const Router = require('express')
const router =  new Router()
const userLabProgressController = require('../controllers/UserLabProgressController')
const { body } = require('express-validator');


router.post(
  '/',
  [
    body('status').isInt().withMessage('Статус  должен быть целым числом'),
    body('userId').isInt().withMessage('userId должен быть целым числом'),
    body('labId').isInt().withMessage('labId должен быть целым числом'),
  ],
  userLabProgressController.create
);

router.get('/', userLabProgressController.getAll);
router.get('/:id', userLabProgressController.getByUserId);
router.delete('/:id', userLabProgressController.delete);

router.put(
  '/:id',
  [
    body('status').optional().isInt().withMessage('Статус должен быть целым числом'),
    body('userId').optional().isInt().withMessage('userId должен быть целым числом'),
    body('labId').optional().isInt().withMessage('labId должен быть целым числом'),
  ],
  userLabProgressController.update
);

module.exports = router;