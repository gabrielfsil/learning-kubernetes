import {EtherealProvider} from './implementations/EtherealProvider';

const MailProvider = new EtherealProvider();

MailProvider.init().catch(err => console.error(err));

export {MailProvider};
