import { Model, INTEGER, STRING } from 'sequelize';

import db from '.';

class UserModel extends Model {
  declare readonly id: number;
  declare teamName: string;
}

UserModel.init({
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
  modelName: 'users',
});

export default UserModel;
