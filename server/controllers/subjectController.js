const { Subject } = require('../models/models');
const ApiError = require('../error/ApiError');
const { body, validationResult } = require('express-validator');

class SubjectController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, total_labs } = req.body;
      const subject = await Subject.create({ name, total_labs });
      return res.json(subject);
    } catch (error) {
      next(ApiError.internal('Ошибка при создании предмета'));
    }
  }

  async getAll(req, res) {
    const subjects = await Subject.findAll();
    return res.json(subjects);
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const subject = await Subject.findByPk(id);
      if (!subject) {
        return next(ApiError.notFound('Предмет не найден'));
      }
      await subject.destroy();
      return res.json({ message: "Предмет был успешно удален" });
    } catch (error) {
      next(ApiError.internal('Ошибка при удалении предмета'));
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const subjectById = await Subject.findOne({ where: { id } });
      if (!subjectById) {
        return next(ApiError.notFound('Предмет не найден'));
      }
      res.json(subjectById);
    } catch (error) {
      next(ApiError.internal('Ошибка при получении предмета'));
    }
  }
}

module.exports = new SubjectController();
