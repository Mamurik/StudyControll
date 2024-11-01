const { Lab, Subject } = require('../models/models');
const ApiError = require('../error/ApiError');
const { body, validationResult } = require('express-validator');

class LabController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { subjectId, lab_number, max_points } = req.body;
      const lab = await Lab.create({ subjectId, lab_number, max_points });
      return res.json(lab);
    } catch (error) {
      next(ApiError.internal('Ошибка при создании лабораторной работы'));
    }
  }

  async getAll(req, res) {
    try {
      const labs = await Lab.findAll({
        include: [{
          model: Subject,
          attributes: ['name', 'total_labs'] 
        }]
      });
      return res.json(labs);
    } catch (error) {
      next(ApiError.internal('Ошибка при получении лабораторных'));
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const labById = await Lab.findOne({
        where: { id },
        include: [{
          model: Subject,
          attributes: ['name', 'total_labs'] 
        }]
      });
      if (!labById) {
        return next(ApiError.notFound('Лабораторная работа не найдена'));
      }
      res.json(labById);
    } catch (error) {
      next(ApiError.internal('Ошибка при получении лабораторной работы'));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const lab = await Lab.findByPk(id);
      if (!lab) {
        return next(ApiError.notFound('Лабораторная работа не найдена'));
      }
      await lab.destroy();
      return res.json({ message: "Лабораторная работа успешно удалена" });
    } catch (error) {
      next(ApiError.internal('Ошибка при удалении лабораторной работы'));
    }
  }
}

module.exports = new LabController();
