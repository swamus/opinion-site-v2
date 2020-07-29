var basicController ={};

basicController.get = (req,res)=>{
    res.json({
        message: 'Welcome to our API!'
    });
};

module.exports = basicController;