// IMPORT legacy_createStore => MEMBUAT STORE REDUX , IMPORT applyMiddleware => AGAR DAPAT MENGGUNAKAN MIDDLEWARE DI REDUX
import { legacy_createStore as createStore, applyMiddleware } from "redux";

// IMPORT ROOT REDUCER UTK DIPEMBUATAN STORE MENGGUNAKAN REDUX
import rootReducers from "./reducers/reducer";

// IMPORT THUNK AGAR DAPAT MENGGUNAKAN MIDDLEWARE DI REACT
import thunk from "redux-thunk";

// BUAT STORE MENGGUNAKAN createStore
const store = createStore(rootReducers, applyMiddleware(thunk));

// EXPORT STORE UTK DIPANGGIL Di App.jsx
export default store;
