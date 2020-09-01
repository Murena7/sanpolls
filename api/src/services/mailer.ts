import { Service, Inject } from 'typedi';
import { User } from '../entity/user';
import config from '../config';
import { Mailgun } from 'mailgun-js';
import { welcomeEmail } from '../email-templates/welcome-email';
import { passwordRecoveryEmail } from '../email-templates/password-recovery';

@Service()
export default class MailerService {
  constructor(@Inject('emailClient') private emailClient: Mailgun) {}

  public async SendWelcomeEmail(email: string, verificationLink: string) {
    const data = {
      from: `SanSan <me@samples.mailgun.org>`,
      to: email, //your email address
      subject: 'Подтверждение регистрации SanSan',
      text: welcomeEmail(verificationLink),
    };

    this.emailClient.messages().send(data);
    return { delivered: 1, status: 'ok' };
  }

  public async SendPasswordRecoveryEmail(email: string, password: string) {
    const data = {
      from: `SanSan <me@samples.mailgun.org>`,
      to: email, //your email address
      subject: 'Восстановление пароля SanSan',
      text: passwordRecoveryEmail(password),
    };

    this.emailClient.messages().send(data);
    return { delivered: 1, status: 'ok' };
  }

  public StartEmailSequence(sequence: string, user: Partial<User>) {
    if (!user.email) {
      throw new Error('No email provided');
    }
    // @TODO Add example of an email sequence implementation
    // Something like
    // 1 - Send first email of the sequence
    // 2 - Save the step of the sequence in database
    // 3 - Schedule job for second email in 1-3 days or whatever
    // Every sequence can have its own behavior so maybe
    // the pattern Chain of Responsibility can help here.
    return { delivered: 1, status: 'ok' };
  }
}
