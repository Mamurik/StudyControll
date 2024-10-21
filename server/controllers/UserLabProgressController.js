const { UserLabProgress, Lab, Subject } = require("../models/models");
const ApiError = require('../error/ApiError');
const { body, validationResult } = require('express-validator');

class UserLabProgressController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { status, userId, labId,subjectId } = req.body;
      const userLabProgress = await UserLabProgress.create({ status, userId, labId,subjectId});
      return res.json(userLabProgress);
    } catch (error) {
      next(ApiError.internal('Ошибка при создании прогресса по лабораторной работе'));
    }
  }

  async getAll(req, res) {
    const userLabProgress = await UserLabProgress.findAll({
        include: [{
            model: Lab,
            include: [{
                model: Subject,
                attributes: ['name', 'total_labs'] 
            }]
        }]
    });
    return res.json(userLabProgress);
}



async getByUserId(req, res, next) {
  try {
      const { id } = req.params;
      const userLabProgress = await UserLabProgress.findAll({
          where: { userId: id },
          include: [{
              model: Lab,
              include: [{
                  model: Subject,
                  attributes: ['name', 'total_labs'] 
              }]
          }]
      });

      if (!userLabProgress.length) {
          return next(ApiError.notFound('Прогресс по лабораторным работам не найден для этого пользователя'));
      }

      return res.json(userLabProgress);
  } catch (error) {
      next(ApiError.internal('Ошибка при получении прогресса по лабораторным работам'));
  }
}


  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userLabProgress = await UserLabProgress.findByPk(id);
      if (!userLabProgress) {
        return next(ApiError.notFound('Прогресс не найден'));
      }
      await userLabProgress.destroy();
      return res.json({ message: "Прогресс по лабораторной работе успешно удален" });
    } catch (error) {
      next(ApiError.internal('Ошибка при удалении прогресса по лабораторной работе'));
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
