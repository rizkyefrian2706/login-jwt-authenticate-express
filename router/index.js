const router = require('express').Router()
const user = require('../controller/user')
const auth = require('../controller/auth')
const { authenticate } = require('../middlewares/authenticate')  

router.post('/login', auth.login)
router.use(authenticate) 
router.get('/logout', auth.logout)
router.get('/user', user.index)  
router.get('/user/:id', user.show)  
router.post('/user', user.create)  
router.put('/user/:id', user.update)  
router.delete('/user/:id', user.destroy)  

module.exports = router
