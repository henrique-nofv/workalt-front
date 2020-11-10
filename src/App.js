import React from 'react';
import './App.css';
import Routes from './routes/index.js';
import UsersProvider from './context/Users'
import UserProvider from './context/User'
import TokenProvider from './context/Token'

function App() {
  return (
    <div className="App">
    <TokenProvider>
      <UsersProvider>
        <UserProvider>
            <Routes />
        </UserProvider>
      </UsersProvider>
    </TokenProvider>
    </div>
  );
}

export default App;
