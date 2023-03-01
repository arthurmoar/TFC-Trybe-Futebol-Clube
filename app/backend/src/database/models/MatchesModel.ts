import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      key: 'id',
      model: 'Team',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    references: {
      key: 'id',
      model: 'teams',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  tableName: 'matches',
  modelName: 'MatchesModel',
});

TeamsModel.hasMany(MatchesModel, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

TeamsModel.hasMany(MatchesModel, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default MatchesModel;
