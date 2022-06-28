import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '.';
import LoginForm from './components/LoginForm';
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';
import { IUser } from './models/response/IUser';

function App() {
  const { store } = useContext(StoreContext);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }

  if (!store.isAuth) {
    return (
      <LoginForm />
    );
  }

  return (
    <>
      {store.isAuth
        ? <h1>Пользователь авторизован {store.user?.email}</h1>
        : <h1>Авторизуйтесь</h1>
      }
      <button onClick={() => store.logout()}>Выйти</button>
      
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
        <div>
          {users.map(user => (
            <div key={user.email}>
              {user.email}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default observer(App);
