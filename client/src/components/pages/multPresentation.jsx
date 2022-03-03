import React, {useEffect, useState} from 'react';
import Multv2 from "../multv2";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import MultPresentationElem from "../multPresentationElem";


const MultPresentation = (props) => {

    // const [multInfo, setMultInfo] = useState('')
    // const [multframes, setMultframes] = useState('')
    // const [comments, setComments] = useState('')

    function GetAvatar() {
        axios.get(`http://localhost:3001/get_avatar/${props.multInfo.login}`, {}).then((response) => {
            return response.data
        }).then((res) => {
                console.log('аватар', res)
                setTimeout(() => {
                }, 100)

                document.getElementById('avatarimage').setAttribute('src', res)
                return res

            }
        )
    }

    const navigate = useNavigate()
    const [isPlaying, setIsPlaying] = useState('play')
    let animIndex = 0;
    const [asyncOperation, setAsyncOperation] = useState('')

    function LoadLike() {
        axios.get(`http://localhost:3001/likes/${props.multInfo.id}/${localStorage.getItem('login')}`, {}).then((response) => {
            setIsThePostLiked(response.data)
            response.data ?
                document.getElementById('likebtn').setAttribute('class', 'liked')
                :
                document.getElementById('likebtn').setAttribute('class', 'notliked')

            return response.data
        }).then((res) => {
                console.log('post was liked: ', (res))
                LoadLikes()

            }
        )
    }


    function LoadLikes() {
        axios.get(`http://localhost:3001/likes_count/${props.multInfo.id}`, {}).then((response) => {
            setLikes(response.data)

            return response.data
        }).then((res) => {
                // console.log('post likes: ', (res))


            }
        )
    }

    useEffect(() => {
        // if (props !== undefined && props !== null) {
        //     console.log('пропсы найдены', props)
        //     localStorage.setItem('currentMultPres', JSON.stringify(props.multInfo))
        //     localStorage.setItem('currentMultFrames', JSON.stringify(props.frames))
        //     localStorage.setItem('currentComments', JSON.stringify(props.comments))
        // } else {
        //     console.log('пропсы не найдены', props)
        // }
        // setMultInfo(JSON.parse(localStorage.getItem('currentMultPres')))
        // setMultframes(JSON.parse(localStorage.getItem('currentMultFrames')))
        // setComments(JSON.parse(localStorage.getItem('currentComments')))
        console.log('multv2 props:', props.multframes)
        LoadLike()
        GetAvatar()
        LoadLikes()
    }, [])

    function playAnimation(imgComponent) {
        if (isPlaying === 'play') {
            setIsPlaying('stop')
            console.log('начал играть')
            // animIndex = 0
            setAsyncOperation(setTimeout(function changeImagesOnCanvas(IsPlaying) {

                //console.log(animIndex)
                console.log(asyncOperation, 'асинк операйшон')
                console.log('играю')

                //console.log(document.getElementById('savedCopyContainer').childNodes.item(i));
                console.log(' props.multframes[animIndex].src', props.multframes[animIndex].src)
                imgComponent.setAttribute('src', 'data:image/jpg;base64,' + props.multframes[animIndex].src)
                setCurFrame(animIndex)
                animIndex++
                if (animIndex === props.multframes.length) animIndex = 0
                if (isPlaying === 'play') setAsyncOperation(setTimeout(changeImagesOnCanvas, 100, isPlaying))
            }, 100))
        } else {
            setIsPlaying('play')
            console.log('закончил играть')
            // imgComponent.setAttribute('src', 'data:image/png;base64,' + props.multframes[0].src)
            clearTimeout(asyncOperation)
            console.log(asyncOperation)
        }
    }

    function getSRC() {
        const frms = props.multframes
        console.log('frms:',frms);
        return props.multframes === undefined ? null : 'data:image/png;base64,' + frms[0].src;
    }

    // document.getElementById('playableImg').setAttribute('src',getSRC())}}
    const [curFrame, setCurFrame] = useState(0)
    const [isThePostLiked, setIsThePostLiked] = useState('')

    function LikeThePost() {
        if (isThePostLiked) {
            setIsThePostLiked(false)
            axios.delete(`http://localhost:3001/del_like/${props.multInfo.id}/${localStorage.getItem('login')}`)
            console.log('you do not like this post anymore..( ')
            document.getElementById('likebtn').setAttribute('class', 'notliked')
        } else {
            axios.post(`http://localhost:3001/add_like`, {
                id_animation: props.multInfo.id,
                from_login: localStorage.getItem('login')
            })
                .then((res) => {
                        console.log('you like this post! ')
                        document.getElementById('likebtn').setAttribute('class', 'liked')
                        setIsThePostLiked(true)
                    LoadLikes()


                    }
                )
        }
        LoadLikes()

    }

    const CommentsToShow = () => {
            return props.comments.filter(comment => comment.id_animation === props.multInfo.id)


    }

    const PostComment = () => {
        axios.post('http://localhost:3001/add_comment', {
            from_login: localStorage.getItem('login'),
            comment_body: comment_text,
            id_animation: props.multInfo.id

        }).then(() => {
            // props.setComments([...comments, {
            //     id: Date.now(),
            //     from_login: localStorage.getItem('login'),
            //     comment_body: comment_text,
            //     id_animation: props.multInfo.id,
            //     post_date:Date.now()
            //
            // }])
            props.getComments()
            setComment_text('')
            console.log('successful комментирование')
        })
        setComment_text('')

        alert('комментарий отправлен.')


    }
    const [likes,setLikes] = useState('0')

    const [comment_text, setComment_text] = useState('')

    return (
        <div>
            {/*{()=>{*/}
            {/*    setTimeout(()=>{},3000)*/}
            {/*    return(*/}
            {/*        <MultPresentationElem*/}
            {/*            multInfo={JSON.parse(localStorage.getItem('currentMultPres'))}*/}
            {/*            multframes ={JSON.parse(localStorage.getItem('currentMultFrames'))}*/}
            {/*            comments={JSON.parse(localStorage.getItem('currentComments'))}*/}
            {/*            navigate={navigate}*/}
            {/*            asyncOperation={asyncOperation}*/}
            {/*            getSRC={getSRC}*/}
            {/*            curFrame={curFrame}*/}
            {/*            setCurFrame={setCurFrame}*/}
            {/*            isPlaying={isPlaying}*/}
            {/*            setIsPlaying={setIsPlaying}*/}
            {/*            playAnimation={playAnimation}*/}
            {/*            LikeThePost={LikeThePost}*/}
            {/*            comment_text={comment_text}*/}
            {/*            setComment_text={setComment_text}*/}
            {/*            PostComment={PostComment}*/}
            {/*            CommentsToShow={CommentsToShow}*/}
            {/*            // setCurrentMultForPresentation={setCurrentMultForPresentation}*/}

            {/*        />*/}
            {/*    )*/}
            {/*}}*/}

            <div className="multPresentation">
                <div className="mult_part">

                    <img id='multPresImg' className='multPresImg' onClick={(e) => {
                        //setIsPlaying('play')
                        //playAnimation(e.target)
                        props.setCurrentMultForPresentation(props.multInfo)
                        navigate('/animation')
                    }} src={getSRC()} alt="мульт"/>
                    <div className="multpres_framecontrols"> <input className='input_range' type="range" min='0' value={parseInt(curFrame)} max={props.multframes.length - 1}
                           onChange={e => {
                               if (isPlaying === 'stop') {
                                   setIsPlaying('play')
                                   clearTimeout(asyncOperation)
                               }
                               setCurFrame(e.target.value)
                               console.log('ща поставлю кадр номер', curFrame);
                               document.getElementById('multPresImg').setAttribute('src', 'data:image/png;base64,' + props.multframes[Number.parseInt(e.target.value)].src)
                           }}/>
                    <button className='btn_multpres_play' onClick={() => playAnimation(document.getElementById('multPresImg'))}>{isPlaying}</button>
                    </div>
                </div>
                <div className="creator_part">
                    <img id='avatarimage' src='' alt=""/>
                    <div className="mult_login">
                         {props.multInfo.login}
                    </div>
                    <div className="mult_title">
                        {props.multInfo.title}
                    </div>
                    <div className="mult_post_date">
                        {props.multInfo.postDate.toString().substr(0,10)}
                    </div>
                    <div className="mult_description">
                        {props.multInfo.description}
                    </div>
                    <button className='' id='likebtn' onClick={() => LikeThePost()}>{likes}♡</button>

                </div>
                {/*<Multv2   setCurrentMultForPresentation={props.setCurrentMultForPresentation}  multInfo={props.currentMultForPresentation} multframes = {props.currentMultForPresentation.frames}  className='multPresentationImg' />*/}
            </div>
            <div className="comm_part">
                <form className="comment_form">
                    <textarea value={comment_text} onChange={(e) => setComment_text(e.target.value)} cols="8" rows="10"
                              className='comment'/>

                    <input type="button" className='comment' onClick={() => PostComment()} value='отправить'/>
                </form>


                {
                    CommentsToShow().map((comment) => {
                        setTimeout(() => {
                        }, 200)
                        return (
                            <div>

                                <div className='comment_mult'>
                                    <div className=' commentator'>
                                      комментарий от  "{comment.from_login}":
                                    </div>
                                    <div className=' comment_text'>
                                        {comment.comment_body}
                                    </div>
                                    <div className="comment_date">
                                        {comment.post_date.toString().substr(0,10)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

            </div>
        </div>
    );
};

export default MultPresentation;