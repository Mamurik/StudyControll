const {Subject} = require('../models/models')
const ApiError = require('../error/ApiError')
class SubjectController {
    async create(req,res){
      const {name,total_labs} = req.body
      const subject = await Subject.create({name,total_labs})
      return res.json(subject)
    }
    async getAll(req,res){
      const types = await Subject.findAll()
      return res.json(types)
    }
    async delete(req, res) {
      const { id } = req.params; 
          const subject = await Subject.findByPk(id); 
          await subject.destroy(); 
          return res.json({ message: "Предмет был успешно удален" }); 
  }
    async getById(req, res) {
      const { id } = req.params; 
      const subjectById = await Subject.findOne({ where: { id } }); 
      res.json(subjectById); 
  }
  
  }
  module.exports = new SubjectController()