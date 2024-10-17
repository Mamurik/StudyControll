const Router = require('express');
const router = new Router();
const subjectController = require('../controllers/subjectController');
const { body } = require('express-validator');

router.post(
  '/',
  [
    body('name').isString().withMessage('Имя предмета должно быть строкой'),
    body('total_labs').isInt({ gt: 0 }).withMessage('Количество лабораторных должно быть положительным целым числом'),
  ],
  subjectController.create
);

router.get('/', subjectController.getAll);
router.delete('/:id', subjectController.delete);
router.get('/:id', subjectController.getById);

module.exports = router;
