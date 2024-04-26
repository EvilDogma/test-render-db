const { Team } = require('./Team')
const { Player } = require('./Player')

Team.belongsToMany(Player, { through: 'team_player' })
Player.belongsToMany(Team, { through: 'team_player' })

module.exports = { Team, Player }