import { db, listen } from './app';
import dbSetup from './mongoose';


db.on('error', console.error)
  .on('disconnected', dbSetup)
  .once('open', () => {
	console.info(`Connected to mongodb ( host: ${db.host}, port: ${db.port}, name: ${db.name} )`);

	// START application:
	listen();
});
