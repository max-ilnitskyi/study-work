import store from '../store';

const user = events => {
  const storePreviousState = store.getState();

  let previousUser = storePreviousState.user.user;
  store.subscribe(() => {
    const state = store.getState();
    console.log('uuuuuser equal? :', state.user.user === previousUser);
    if (state.user.user === previousUser) return;

    console.log('************User change!!!********************');

    // events.emit('userChange');
    previousUser = state.user.user;
  });
};

export default user;
