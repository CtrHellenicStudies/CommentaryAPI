import cors from 'cors';
import DataLoader from 'dataloader';
import _s from 'underscore.string';

// model
import Project from './models/project';


export default function corsSetup(app, redisClient) {

	const allowedOrigins = ['chs.harvard.edu', 'orphe.us', 'chs.local', 'chs.local:3000', 'chs.local:5000'];

	// Check if project is white listed or in a database
	// Set the req.project value
	const corsOptions = {
		origin: (origin, callback) => {
			let isAllowed = false;

			allowedOrigins.forEach((allowedOrigin) => {
				if (_s(allowedOrigin).endsWith(allowedOrigin)) {
					isAllowed = true;
				}
			});

			if (isAllowed) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	};

	// CORS:
	app.use(cors(corsOptions));
}
