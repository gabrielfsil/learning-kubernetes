import {MailProvider} from '../../containers/MailProvider';
import {QueueProvider} from '../../containers/QueueProvider';

QueueProvider.consume({
  queue: 'email',
  process: async msg => {
    const content = JSON.parse(msg.content.toString());

    const {to, from, subject, body} = content;

    MailProvider.send({
      to: {
        name: to.name,
        email: to.email,
      },
      from: {
        name: from.name,
        email: from.email,
      },
      subject,
      body,
    }).catch(err => console.error(err));
  },
});
