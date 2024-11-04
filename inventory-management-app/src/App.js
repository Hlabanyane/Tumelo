import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import NavBar from './components/NavBar';

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);
  const [inventory, setInventory] = useState(() => JSON.parse(localStorage.getItem('inventory')) || []);
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);
  const [selectedView, setSelectedView] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('users', JSON.stringify(users));
  }, [currentUser, inventory, users]);

  return (
    <div>
      <NavBar setSelectedView={setSelectedView} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {currentUser ? (
        <>
          {selectedView === 'dashboard' && <Dashboard inventory={inventory} />}
          {selectedView === 'product-management' && (
            <ProductManagement inventory={inventory} setInventory={setInventory} />
          )}
          {selectedView === 'user-management' && (
            <UserManagement users={users} setUsers={setUsers} />
          )}
        </>
      ) : (
        <Auth setCurrentUser={setCurrentUser} users={users} setUsers={setUsers} />
      )}
    </div>
  );
};

export default App;