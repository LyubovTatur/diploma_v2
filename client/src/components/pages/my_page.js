import React, {useEffect, useState} from 'react';
import Mult from "../mult";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Multv2 from "../multv2";


const MyPage = (props) => {


    const isLoaded = (animation) => {

        if (animation !== undefined) {

            console.log(animation)

            return( <Multv2 multframes={animation.frames}/>)


        } else {
            console.log('привепт')
            return (<Mult/>)
        }
    }

    return (
        <div>
            <div className="profile">
                <img className='login_img' src='' alt=""/>
                <div className="login">{props.user}</div>
                <input type="button" value='сменить фото' align='left'/>
                {/*<input type="button" value='получить инфу' onClick={() => {*/}
                {/*    GetUserInfo()*/}
                {/*}} align='left'/>*/}
                <NavLink to='/main/new' onClick={() => {
                    props.setUser('blank');
                    localStorage.setItem('login', 'blank')
                }} align='left'>Выйти</NavLink>
            </div>
            <div className="my_animations">
                <div className="grid_content">
                    <div id={'row_cont'} className="row_content">

                        {JSON.parse(localStorage.getItem('userInfo')).animations.map(animation => {
                            console.log('начинаю фурычить')
                            return isLoaded(animation)


                        })}


                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyPage;