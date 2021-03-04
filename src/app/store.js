import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import signInReducer from '../features/signIn/signInSlice';
import ideasManagementReducer from './../features/postManagement/ideaManagementSlice';
import loadingReducer from './loadingSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    signIn: signInReducer,
    ideasManagement: ideasManagementReducer,
    loading: loadingReducer,
  },
});
