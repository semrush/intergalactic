import mailchimp from '@mailchimp/mailchimp_marketing';
import dotenv from 'dotenv';
import { validateMailerEnv } from './validateMailerEnv';

dotenv.config();

export const sendMail = async (options: {
  body: string;
  title: string;
  subject: string;
  from: string;
  replyTo: string;
}) => {
  validateMailerEnv();
  let campaignId;

  {
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMPKEY2,
      server: process.env.MAILCHIMPSERVER,
    });
    await mailchimp.templates.updateTemplate(process.env.MAILCHIMPTEMPLATE, {
      name: 'Updates here',
      html: options.body,
    });
    const response = await mailchimp.campaigns.create({
      type: 'regular',
      recipients: {
        list_id: process.env.LISTID,
      },
      settings: {
        template_id: +process.env.MAILCHIMPTEMPLATE,
        subject_line: options.subject,
        from_name: options.from,
        reply_to: options.replyTo,
        title: options.title,
      },
    });
    campaignId = response.id;
  }

  {
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMPKEY1,
      server: process.env.MAILCHIMPSERVER,
    });

    const response = await mailchimp.campaigns.send(campaignId);

    // eslint-disable-next-line no-console
    console.log(response, 'Sent successfully');
  }
};
