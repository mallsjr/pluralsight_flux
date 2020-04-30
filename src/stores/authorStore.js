import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'authorChange';
let _authors = [];

class AuthorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAuthors() {
    return _authors;
  }

  getAuthorById(id) {
    return _authors.find(author => author.id === id);
  }
}

const store = new AuthorStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      store.emitChange();
      break;
    default:
    //nothing to do
  }
});

export default store;
