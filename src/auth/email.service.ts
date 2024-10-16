import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}


export class EmailService {

  private transporter: Transporter;
  mailerService: string;
  mailerEmail: string;
  senderEmailPassword: string;
  private readonly postToProvider: boolean;

  constructor() {
    this.mailerService = process.env.MAILER_SERVICE;
    this.mailerEmail = process.env.MAILER_EMAIL;
    this.senderEmailPassword = process.env.MAILER_SECRET_KEY;
    this.postToProvider = true;

    this.transporter = nodemailer.createTransport( {
        service: this.mailerService,
        auth: {
          user: this.mailerEmail,
          pass: this.senderEmailPassword,
        }
      });
  }


  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const { to, subject, htmlBody, attachements = [] } = options;


    try {

      if(!this.postToProvider) return true;

      const sentInformation = await this.transporter.sendMail( {
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      return true;
    } catch ( error ) {
      return false;
    }

  }

}