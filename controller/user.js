const {user} = require("../models"); 

const index = async (req, res) => {
    user.findAll()
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      res.json({ error: error });
    }); 
}

const show = async (req, res) => {
    let id = req.params.id 
    user.findOne({ where: { id: id }})
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      res.json({ error: error });
    });  

}

const create = async (req, res) => {
    let data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        level: req.body.level
    }
    await user.create(data)
    .then( data => {
        res.status(200).send(data)
    })
    .catch( err => {
        res.status(500).json({
            message: 'internal server error',
            dataError: err
        })
    }) 
}
 
const update = async (req, res) => {
    
    let id = req.params.id
   
    await user.update(req.body, { where: { id: id }})
    .then( data => { 
        res.status(200).json(id)
    })
    .catch( err => {
        res.status(500).json({
            message: 'internal server error',
            dataError: err
        })
    })  
}
 
const destroy = async (req, res) => {
    
    let id = req.params.id
   
    await user.destroy({ where: { id: id }})
    .then( data => {
        res.status(200).json({msg: "success"});
    })
    .catch( err => {
        res.status(500).json({
            message: 'internal server error',
            dataError: err
        })
    })  

} 

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}