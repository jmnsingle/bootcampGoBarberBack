import mongoose from 'mongoose';
import Sequelize from 'sequelize';

import User from '../app/models/Users';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseconfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();

    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseconfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
