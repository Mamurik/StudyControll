const Router = require('express');
const router = new Router();
const labController = require('../controllers/labController');
const { body } = require('express-validator');

router.post(
  '/',
  [
    body('subjectId').isInt().withMessage('subjectId должен быть числом'),
    body('lab_number').isInt().withMessage('lab_number должен быть числом'),
    body('max_points').isFloat({ gt: 0 }).withMessage('max_points должен быть положительным числом'),
  ],
  labController.create
);

router.get('/', labController.getAll);
router.delete('/:id', labController.delete);

module.exports = router;
