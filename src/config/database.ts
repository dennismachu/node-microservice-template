import mongoose from 'mongoose';
import AppLogger from '../core/eventLogger';

const databaseUrl:string = `${process.env.DB_URL}`;

export const connectDatabase = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let logger = new AppLogger()
  let scope = 'database.ts'

  mongoose.set("strictQuery", false);
 mongoose.connect(databaseUrl!,{
    // poolSize: 5, // Maintain up to 10 socket connections - Default = 5
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  
});
 

  mongoose.connection.on('connected', function () {
    logger.logInfo(scope,'Mongoose default connection is open');
  });

  mongoose.connection.on('disconnected', function () {
    logger.logError(scope,'mongoose disconnected');
  });

  mongoose.connection.on('error', function (err) {
    logger.logError(scope,'mongoose connection error ' + err);
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      logger.logError(scope,'mongoose disconnected through app termination!');
      process.exit(0);
    });
  });

  process.on('SIGTERM', function () {
    mongoose.connection.close(function () {
      logger.logError(scope,"mongoose disconnected through app termination!")
      process.exit(0);
    });
  });

  process.once('SIGUSR2', function () {
    mongoose.connection.close(function () {
      logger.logError(scope,"mongoose disconnected through app termination!")
      process.kill(process.pid, 'SIGUSR2');
    });
  });
};
