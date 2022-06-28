import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { StoreContext } from '..';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { store } = useContext(StoreContext);

    return (
        <div>
            <input type='text' 
                placeholder='Email' 
                value={email} 
                onChange={(ev) => setEmail(ev.target.value)} />

            <input type='text' 
                placeholder='Password' 
                value={password} 
                onChange={(ev) => setPassword(ev.target.value)} />

            <button onClick={() => store.login(email, password)}>
                Логин
            </button>

            <button onClick={() => store.registration(email, password)}>
                Регистрация
            </button>
        </div>
    );
};

export default observer(LoginForm);