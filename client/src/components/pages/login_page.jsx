import React, {useState} from 'react';
import {styles} from './common_style.model.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginPage = (props) => {



    let navigate = useNavigate();

    const Verification = (login, password_string) => {
        axios.post('http://localhost:3001/verification', {
            login: login,
            password_string: password_string
        }).then((response) => {
            switch (response.data) {
                case 0:
                    console.log(`successful ${login} login`)
                    props.setUser(login)
                    localStorage.setItem('login',login)
                    navigate('/my_page')
                    break
                case 1:
                    console.log(`${login} login failed (wrong password)`)
                    break
                case 2:
                    console.log(`${login} login failed (login wasn't found)`)
                    break
            }

        })
    }

    const [login, setLogin] = useState('')
    const [password_string, setPassword_string] = useState('')


    return (
        <form>
            <div className="page_name">Вход</div>
            <label htmlFor="text">Логин</label>
            <input id='text' type='text' value={login} onChange={(e) => setLogin(e.target.value)}/>
            <label htmlFor="pass1">Пароль</label>
            <input id='pass1' type='password' value={password_string}
                   onChange={(e) => setPassword_string(e.target.value)}/>
            <input type='button' value='Далее' id='btn' onClick={() => Verification(login, password_string)}/>

        </form>
    );
};


export default LoginPage;