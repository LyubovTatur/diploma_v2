import React from 'react';
import {styles} from "./header.model.css";
import {NavLink} from "react-router-dom";
import { useHistory } from 'react-router-dom';


const Header = (props) => {
        const isGuest = (user) => {
            console.log('проверка на вход', user)
            if (user === 'blank') {
                return (
                    <header>
                        <NavLink className="site_name" to={'/main/new'}>Аниматор</NavLink>
                        <NavLink to={'/reg'}>регистрация</NavLink>
                        <NavLink to={'/log'}>вход</NavLink>
                        <NavLink to={'/animation_creation'}>нарисовать мульт</NavLink>

                    </header>
                )
            } else {
                return (<header>
                    <NavLink className="site_name" to={'/main/new'}>Аниматор</NavLink>

                    <NavLink to={'/my_page'}> </NavLink>
                    <NavLink to={'/my_page'}>моя страница</NavLink>
                    <NavLink to={'/animation_creation'}>нарисовать мульт</NavLink>

                </header>)

            }
        }


        return (
            <div>
                {isGuest(props.user)}
            </div>
        );
    }
;

export default Header;