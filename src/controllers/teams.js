const team = require('../models/team')

const teams_index = (req,res) => {
    team = await team.find().sort({createdAt: -1})
    try{
        res.render('teams/index', {title: 'All teams'})
    }
    catch(err){
        const { statusCode = 500, message = 'something went Wrong!'} = err
        res.status()
    }
}

const teams_create_team = (req,res) => {
     
}

const teams_getById = (req,res) => {
    
}