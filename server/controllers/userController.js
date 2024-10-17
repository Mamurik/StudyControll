const ApiError = require('../error/ApiError')
const bcrypt  =  require("bcrypt")
const {User} = require('../models/models')
const jwt = require("jsonwebtoken")

const createJwt = (id,username,role)=>{
  return jwt.sign(
    {id,username,role},
    process.env.SECRET_KEY,
    {expiresIn:'24h'}
  )
}

class UserController {
  async registration(req,res,next){
    const {username,password,role} = req.body
    if(!username || !password){
      return next(ApiError.badRequest('Имя студента или пароль некорректны'))
    }
    const candidate = await User.findOne({where:{username}})
    if(candidate){
      return next(ApiError.badRequest("Студент с таким именем уже существует"))
    }
    const hashPassword = await bcrypt.hash(password,5)
    const user =  await User.create({username,role,password:hashPassword})
    const token = createJwt(user.id,user.username,user.role)
    return res.json({token})
  }
  async login(req,res,next){
   const {username,password} = req.body;
   const user = await User.findOne({where:{username}})
  if(!user){
    return next(ApiError.badRequest("Студент с таким именем не найден"))
  }
  let comparePassword = bcrypt.compareSync(password,user.password)
  if(!comparePassword){
    return next(ApiError.badRequest("Неверный пароль"))
  }
  const token = createJwt(user.id,user.username,user.role)
  return res.json({token})
  }
  async check(req,res,next){
   const token = createJwt(req.user.id,req.user.username,req.user.role)
   return res.json({token})
  }
}
module.exports = new UserController()