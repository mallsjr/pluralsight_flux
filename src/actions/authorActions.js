import dispatcher from '../appDispatcher';
import actionTypes from './actionTypes';
import * as authorApi from '../api/authorApi';

export function loadAuthors() {
  return authorApi.getAuthors().then(authors => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors,
    });
  });
}
