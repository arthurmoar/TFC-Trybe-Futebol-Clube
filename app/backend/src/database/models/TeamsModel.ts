import { Model, INTEGER, STRING } from 'sequelize';

import db from '.';

class TeamsModel extends Model {
  declare readonly id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  tableName: 'teams',
  modelName: 'TeamsModel',
});

export default TeamsModel;
