import React, {useEffect, useState} from 'react';
import Mult from "../mult";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Multv2 from "../multv2";


const MyPage = (props) => {


    const isLoaded = (animation) => {

        if (animation !== undefined) {

            console.log(animation)

            return( <Multv2 setCurrentMultForPresentation={props.setCurrentMultForPresentation}  multInfo={animation} multframes={animation.frames}/>)


        } else {
            console.log('привепт')
            return (<Mult/>)
        }
    }

    function ChangeAvatar() {
        const imageURL = prompt('Введи URL картинки');
        try{
            document.getElementById('login_img').setAttribute('src',imageURL)
            axios.post(`http://localhost:3001/change_avatar`, {
                login: localStorage.getItem('login'),
                avatar: imageURL
            }).then(() => {

            })
        }
        catch (e){
            console.log(e)
            alert('URL некорректен')
        }

    }
    useEffect(()=>{
        document.getElementById('login_img').setAttribute('src',props.userInfo.avatar);
    },[])
    return (
        <div>
            <div className="profile">
                <img className='login_img' id='login_img' src='' alt=""/>
                <div className="login">{props.user}</div>
                <input type="button" onClick={()=>{ChangeAvatar()}} value='сменить фото' align='left'/>
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
                    <div id={'row_cont'}  className="row_content">

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