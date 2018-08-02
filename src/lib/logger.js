// a winston logger
import { createLogger, format, transports } from 'winston';

const { combine, printf, colorize, align } = format;

const logger = createLogger({
	format: combine(
		colorize(),
		timestamp(),
		align(),
		printf((info) => {
			const {
        timestamp, level, message, ...args
      } = info;

			const ts = timestamp.slice(0, 19).replace('T', ' ');
			return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
		}),
  ),
	transports: [
		new transports.Console({}),
	],
});

export default logger;
