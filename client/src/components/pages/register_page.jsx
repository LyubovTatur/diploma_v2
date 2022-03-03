import React, {useState} from 'react';
import {styles} from './common_style.model.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate()
    const Registration = (login, password_string) => {
        if (password_string === password_string2) {
            axios.post('http://localhost:3001/addUser', {
                login: login,
                password_string: password_string

            }).then(() => {

                console.log(`user ${login} has been added (client)`)
                alert("вы успешно зарегестрированны.")
                navigate('/log')
            })
        } else {
            alert('пароли не совпадают')
            setPassword_string2('')
        }

    }

    const [login, setLogin] = useState('')
    const [password_string, setPassword_string] = useState('')
    const [password_string2, setPassword_string2] = useState('')


    return (
        <form className='entering'>
            <div className="page_name">Регистрация</div>
            <label htmlFor="text">Логин</label>
            <input id='text' value={login} onChange={(e) => setLogin(e.target.value)} type='text'/>
            <label htmlFor="pass1">Пароль</label>
            <input id='pass1' value={password_string} onChange={(e) => setPassword_string(e.target.value)}
                   type='password'/>
            <label htmlFor="pass2">Подтвердите пароль</label>
            <input id='pass2' type='password' value={password_string2}
                   onChange={(e) => setPassword_string2(e.target.value)}/>

            <input id='btn' onClick={() => Registration(login, password_string, password_string2)} type="button"
                   value='Далее'/>
        </form>
    );
};

export default RegisterPage;