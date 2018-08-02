import nodemailer from 'nodemailer';
import path from 'path';
import { EmailTemplate } from 'email-templates';

// import hbs from 'nodemailer-express-handlebars';
import { generatePasswordResetLink } from '../authentication';

import logger from '../lib/logger';

class OrpheusEmailClass {

	constructor() {
		this.transporter = null;
	}

	setupTransport() {
		this.from = process.env.EMAIL_FROM;

		const smtpConfig = {
			host: process.env.EMAIL_SMTP_HOST,
			port: process.env.EMAIL_SMTP_PORT,
			secure: (process.env.EMAIL_SMTP_PORT === 465), // only use secure mode when using secure port
			auth: {
				user: process.env.EMAIL_SMTP_USER,
				pass: process.env.EMAIL_SMTP_PASSWORD
			},
			logger: false,
			debug: false // include SMTP traffic in the logs
		};

		// Create a SMTP transporter object
		const transporter = nodemailer.createTransport(smtpConfig);

		// User handlebars for generating templates
		// transporter.use('compile', hbs({
		// 	viewPath: 'server/email/templates',
		// }));

		// verify connection configuration
		transporter.verify((error, success) => {
			if (error) {
				logger.error('Failed to connect to SMTP server');
				logger.error(error);
			} else {
				logger.info('Connection to SMTP server successful.');
			}
		});

		this.transporter = transporter;

		const email = {
			from: this.from,
			to: process.env.EMAIL_TO_TEST,
			subject: 'Test',
			html: '<b>Hello</b>',
			text: 'results.text',
		};

		this.sendMail(email);
	}

	sendMail(email) {
		if (process.env.NODE_ENV !== 'production') {
			email.to = process.env.EMAIL_TO_TEST || 'test@archimedes.digital';
		}
		this.transporter.sendMail(email, (error, info) => {
			if (error) { logger.error(error); }
			logger.info(`Email Info: ${info}`);
			if (process.env.EMAIL_SMTP_HOST === 'smtp.ethereal.email') {
				logger.info(`Email Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
			}
		});
	}

	sendVerificationEmail(username) {
		const templateDir = path.resolve(__dirname, 'templates', 'emailVerification');
		const template = new EmailTemplate(templateDir);

		template.render({})
			.then((results) => {
				const email = {
					from: this.from,
					to: username,
					subject: results.subject,
					// html: results.html,
					text: results.text,
				};
				this.sendMail(email);
			});
	}

	async sendPasswordResetEmail(username, passwordResetToken) {
		const templateDir = path.resolve(__dirname, 'templates', 'passwordReset');
		const template = new EmailTemplate(templateDir);

		const results = await template.render({
			passwordResetLink: generatePasswordResetLink(passwordResetToken),
		});

		const email = {
			from: this.from,
			to: username,
			subject: results.subject,
			html: results.html,
			text: results.text,
		};
		await this.sendMail(email);
	}
}

const OrpheusEmail = new OrpheusEmailClass();

export default OrpheusEmail;
