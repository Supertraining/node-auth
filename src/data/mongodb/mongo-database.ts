import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}
export class MongoDatabase {
  static async connect(options: Options) {
    try {
      const { dbName, mongoUrl } = options;

      await mongoose.connect(mongoUrl, {
        dbName: dbName,
      });

      console.log('Mongo connected');
      return true;
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }
  }
}
