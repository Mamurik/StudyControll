const {Lab} = require('../models/models')
const ApiError = require('../error/ApiError');
class LabController {
  async create(req,res){
    const { subjectId, lab_number, max_points } = req.body; 
      const lab = await Lab.create({ subjectId, lab_number, max_points });
      return res.json(lab);
  }
    async getAll(req,res){
      const labs = await Lab.findAll()
      return res.json(labs)
    }
    async delete(req,res){
      const {id} = req.params;
      const lab = await Lab.findByPk(id); 
      await lab.destroy()
      return res.json({message:"Лаба успешно удалена"})
    }
  }
  module.exports = new LabController()