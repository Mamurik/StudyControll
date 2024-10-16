const Router = require('express')
const router =  new Router()
const userRouter = require('./userRouter')
const labRouter = require('./labRouter')
const subjectRouter = require('./subjectRouter')
const userLabProgress = require('./userLabProgressRouter')

router.use('/user',userRouter)
router.use("/lab",labRouter)
router.use("/subject",subjectRouter)
router.use("/userLabProgress",userLabProgress)

module.exports = router