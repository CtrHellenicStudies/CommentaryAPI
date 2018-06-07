import nodemailer from 'nodemailer';
import path from 'path';
import winston from 'winston';
import { EmailTemplate } from 'email-templates';

// import hbs from 'nodemailer-express-handlebars';
import { generatePasswordResetLink } from '../authentication';

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
				console.log('Failed to connect to SMTP server!!!');
				console.log(error);
			} else {
				console.log('Connection to SMTP server SUCCESSFUL.');
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
			if (error) { winston.error(e); }
			winston.info('Email Info: ', info);
			if (process.env.EMAIL_SMTP_HOST === 'smtp.ethereal.email') {
				winston.info('Email Preview URL: %s', nodemailer.getTestMessageUrl(info));
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

	sendPasswordResetEmail(username, passwordResetToken) {
		const templateDir = path.resolve(__dirname, 'templates', 'passwordReset');
		const template = new EmailTemplate(templateDir);

		template.render({
			passwordResetLink: generatePasswordResetLink(passwordResetToken),
		}).then((results) => {
			const email = {
				from: this.from,
				to: username,
				subject: results.subject,
				html: results.html,
				text: results.text,
			};
			this.sendMail(email);
		});
	}
}

const OrpheusEmail = new OrpheusEmailClass();

export default OrpheusEmail;
