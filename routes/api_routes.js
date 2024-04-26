const { Team, Player } = require('../models')
const router = require('express').Router()

function handleError(res, err){
    console.log(err)

    const errors = err.errors.map(eObj => {
        return {
            message: eObj.message
        }
    })
    res.status(403).json({
        message: 'Bad Request',
        error: errors
    })
}
router.get('/teams', async (req, res) => {
    try{

        const teams = await Team.findAll({
            include: Player.scope('withoutPassword')
            
            // include: {
                //     model: Player,
                //     attributes:{
                    //         exclude:['password']
                    //     }
                    // }
                })
                return res.json(teams)
            }
    catch (err){
        handleError(res,err)
    }
})

router.get('/teams/:team_id', async (req, res) => {
    try{
        let id = req.params.team_id
        const teams = await Team.findByPk(id, {
            include: Player.scope('withoutPassword')
        })
        return res.json(teams || { message: `no team with ID: ${id}` })

    }
    catch (err){
        handleError(res,err)
    }
})

router.put('/teams/:team_id', async (req, res) => {
    try{
        let id = req.params.team_id
        let newInfo = req.body
        const team = await Team.findByPk(id, {
            include: Player.scope('withoutPassword')
        })
    
        await team.update(newInfo);
    
        return res.json({ message: `team with ID: ${id} updated` })

    }
    catch (err){
        handleError(res,err)
    }
})

router.delete('/teams/:team_id', async (req, res) => {
    try{
        let id = req.params.team_id
        const team = await Team.findByPk(id)
        await team.destroy()
        return res.json({ message: `removed team with ID: ${id}` })

    }
    catch (err){
        handleError(res,err)
    }
})

router.get('/players', async (req, res) => {
    try{
        const players = await Player.scope('withoutPassword').findAll({
            include: Team
        })
        return res.json(players)

    }
    catch (err){
        handleError(res,err)
    }
})

router.get('/players/:player_id', async (req, res) => {
    try{
        let id = req.params.player_id
        const player = await Player.scope('withoutPassword').findByPk(id, {
            include: Team
        })
        console.log(Object.keys(player))
        return res.json(player || { message: `no player with ID: ${id}` })

    }
    catch (err){
        handleError(res,err)
    }
})

router.delete('/players/:player_id', async (req, res) => {
    try{
        let id = req.params.player_id
        const player = await Player.findByPk(id)
        await player.destroy()
        return res.json({ message: `removed player with ID: ${id}` })

    }
    catch (err){
        handleError(res,err)
    }
})

router.put('/players/:player_id', async (req, res) => {
    try{
        let id = req.params.player_id
        let newInfo = req.body
        const player = await Player.findByPk(id, {
            include: Team
        })
    
        await player.update(newInfo);
    
    
        return res.json({ message: `player with ID: ${id} updated` })

    }
    catch (err){
        handleError(res,err)
    }
})

router.post('/teams', async (req, res) => {
    try{
        let teamInfo = req.body
    
        const team = await Team.create(teamInfo)
        return res.json(teamInfo)

    }
    catch (err){
        handleError(res,err)
    }
})


router.post('/players', async (req, res) => {
    try{
        let playerInfo = req.body
    
        const player = await Player.create(playerInfo)
        return res.json(player)

    }
    catch (err){
        handleError(res,err)
    }
})

router.post('/addplayer', async (req, res) => {
    try{
        let relObj = req.body
        const player = await Player.findByPk(relObj.player_id,)
        const team = await Team.findByPk(relObj.team_id)
    
        await team.addPlayer(player, { through: 'team_player' })
    
        return res.json("player added")

    }
    catch (err){
        handleError(res,err)
    }
})


module.exports = router
