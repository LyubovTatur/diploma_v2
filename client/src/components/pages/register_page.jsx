import React, {useState} from 'react';
import {styles} from './common_style.model.css'
import axios from "axios";

const RegisterPage = () => {

    const Registration = (login, password_string) => {
        axios.post('http://localhost:3001/addUser', {
            login: login,
            password_string: password_string

        }).then(() => {

            console.log(`user ${login} has been added (client)`)
        })
    }

    const [login, setLogin] = useState('')
    const [password_string, setPassword_string] = useState('')


    return (
        <form>
            <div className="page_name">Регистрация</div>
            <label htmlFor="text">Логин</label>
            <input id='text' value={login} onChange={(e) => setLogin(e.target.value)} type='text'/>
            <label htmlFor="pass1">Пароль</label>
            <input id='pass1' value={password_string} onChange={(e)=> setPassword_string(e.target.value)} type='password'/>
            <label htmlFor="pass2">Подтвердите пароль</label>
w            <input id='btn' onClick={() => Registration(login,password_string)} type="button" value='Далее'/>
        </form>
    );
};

export default RegisterPage;