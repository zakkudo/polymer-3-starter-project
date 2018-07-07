import createStore from 'lib/createStore';
import reducer from './reducer';

/**
 * The application store. The store is a singleton! Everything uses this!
 * @module Application/store
 */
export default createStore(reducer);
