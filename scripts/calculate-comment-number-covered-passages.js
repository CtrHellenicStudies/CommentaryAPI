import logger from '../src/lib/logger';
import dotenvSetup from '../src/dotenv';
import setupDB, { closeDB } from '../src/mongoose';

import Comment from '../src/models/comment'; 
import { calculateNumberOfCoveredPassages } from '../src/graphql/logic/comments/helper'; 

dotenvSetup();

const db = setupDB();

// get list of comments with null nCoveredPassages or nCoveredPassagesEstimated
const processComments = async () => {
	const res = await Comment.find({
		$or: [
			{nCoveredPassagesEstimated: true},
			{nCoveredPassages: { $exists: false }},
		]
	});
	
	// calculate nCoveredPassages for each of them and update
	const r = res.map(async (comment) => {
		const updatedComment = await calculateNumberOfCoveredPassages(comment);
		await updatedComment.save();
	});

	await Promise.all(r);
};

db.on('error', logger.error)
	.on('disconnected', setupDB)
	.once('open', async () => {
		logger.info(`Connected to mongodb ( host: ${db.host}, port: ${db.port}, name: ${db.name} )`);

		await processComments();

		db.close(() => {
			logger.info('Connection closed');
			process.exit(0);
		});
	});


