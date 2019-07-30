import EventEmitter from 'events';

import user from './user';

const events = new EventEmitter();

user(events);

export default events;
