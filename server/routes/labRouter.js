const Router = require('express');
const router = new Router();
const labController = require('../controllers/labController');
const { body } = require('express-validator');
const checkRole = require("../middleware/checkRoleMiddleware")
router.post(
  '/',
  [
    checkRole("admin"),
    body('subjectId').isInt().withMessage('subjectId должен быть числом'),
    body('lab_number').isInt().withMessage('lab_number должен быть числом'),
    body('max_points').isFloat({ gt: 0 }).withMessage('max_points должен быть положительным числом'),
  ],
  labController.create
);

router.get('/', labController.getAll);
router.get('/:id', labController.getById);
router.delete('/:id',checkRole("admin"), labController.delete);

module.exports = router;
