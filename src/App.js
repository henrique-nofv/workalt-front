import React from 'react';
import './App.css';
import Routes from './routes/index.js';
import UsersProvider from './context/Users'
import UserProvider from './context/User'
import TokenProvider from './context/Token'

function App() {
  return (
    <div className="App">
      <UsersProvider>
        <UserProvider>
          <TokenProvider>
            <Routes />
          </TokenProvider>
        </UserProvider>
      </UsersProvider>
    </div>
  );
}

export default App;
