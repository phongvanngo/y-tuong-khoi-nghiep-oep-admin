import React from 'react';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useSelector } from 'react-redux';
import Loading from './Container/LoadingPage/LoadingPage';
import Routes from './router';



function App() {
  const isLoading = useSelector(state => state.loading.isLoading);


  return (
    <>
      <ReactNotification />
      {isLoading ? <Loading /> : ""}
      <Routes />
    </>
  );
}

export default App;
