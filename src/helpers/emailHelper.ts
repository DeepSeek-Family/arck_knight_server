import nodemailer from 'nodemailer';
import { errorLogger, logger } from '../shared/logger';
import { ISendEmail } from '../types/email';
import { config } from '../config';

const transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: Number(config.mail.port),
    secure: false,
    auth: {
        user: config.mail.user,
        pass: config.mail.password
    },
});

const sendEmail = async (values: ISendEmail) => {
    try {
        const info = await transporter.sendMail({
            from: `"arck_knight" ${config.mail.from}`,
            to: values.to,
            subject: values.subject,
            html: values.html,
        });

        logger.info('Mail send successfully', info.accepted);
    } catch (error) {
        errorLogger.error('Email', error);
    }
};

export const emailHelper = {
    sendEmail
};