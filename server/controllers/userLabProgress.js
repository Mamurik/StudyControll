const {UserLabProgress} = require("../models/models")
const ApiError = require('../error/ApiError');
const { response } = require("express");
class UserLabProgressController {
    async create(req,res){
      const {status,userId,labId} = req.body
      const userLabProgress = await UserLabProgress.create({status,userId,labId})
      return res.json(userLabProgress)
    }
    async getAll(req,res){
      const userLabProgress = await UserLabProgress.findAll()
      return res.json(userLabProgress)
    }
    async delete(req,res){
      const {id} = req.params
      const userLabProgress = await UserLabProgress.findByPk(id)
      await userLabProgress.destroy()
      return res.json({message:"Прогресс по лабе успешно удален"})
    }
    async update(req, res) {
      const { id } = req.params; 
      const { status, userId, labId } = req.body; 
      const userLabProgress = await UserLabProgress.findByPk(id); 
      if (status !== undefined) userLabProgress.status = status;
      if (userId !== undefined) userLabProgress.userId = userId;
      if (labId !== undefined) userLabProgress.labId = labId;

      await userLabProgress.save(); 
      return res.json(userLabProgress); 
  }
  }
  module.exports = new UserLabProgressController()