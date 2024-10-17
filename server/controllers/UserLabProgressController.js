const { UserLabProgress } = require("../models/models");
const ApiError = require('../error/ApiError');
const { body, validationResult } = require('express-validator');

class UserLabProgressController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { status, userId, labId } = req.body;
      const userLabProgress = await UserLabProgress.create({ status, userId, labId });
      return res.json(userLabProgress);
    } catch (error) {
      next(ApiError.internal('Ошибка при создании прогресса по лабораторной работе'));
    }
  }

  async getAll(req, res) {
    const userLabProgress = await UserLabProgress.findAll();
    return res.json(userLabProgress);
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userLabProgress = await UserLabProgress.findByPk(id);
      if (!userLabProgress) {
        return next(ApiError.notFound('Прогресс не найден'));
      }
      await userLabProgress.destroy();
      return res.json({ message: "Прогресс по лабе успешно удален" });
    } catch (error) {
      next(ApiError.internal('Ошибка при удалении прогресса'));
    }
  }

  async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { status, userId, labId } = req.body;
      const userLabProgress = await UserLabProgress.findByPk(id);
      if (!userLabProgress) {
        return next(ApiError.notFound('Прогресс не найден'));
      }

      if (status !== undefined) userLabProgress.status = status;
      if (userId !== undefined) userLabProgress.userId = userId;
      if (labId !== undefined) userLabProgress.labId = labId;

      await userLabProgress.save();
      return res.json(userLabProgress);
    } catch (error) {
      next(ApiError.internal('Ошибка при обновлении прогресса по лабораторной работе'));
    }
  }
}

module.exports = new UserLabProgressController();
