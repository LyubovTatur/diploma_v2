import React from 'react';

const MultPresentationElem = (props) => {


    return (

        <div>
            <div className="multPresentation">
                <div className="mult_part">

                    <img id='multPresImg' className='multPresImg' onClick={(e) => {
                        //setIsPlaying('play')
                        //playAnimation(e.target)
                        // props.setCurrentMultForPresentation(props.multInfo)
                        props.navigate('/animation')
                    }} src={() => props.getSRC()} alt="мульт"/>
                    <input type="range" min='0' value={parseInt(props.curFrame)} max={props.multframes.length - 1}
                           onChange={e => {
                               if (props.isPlaying === 'stop') {
                                   props.setIsPlaying('play')
                                   clearTimeout(props.asyncOperation)
                               }
                               props.setCurFrame(e.target.value)
                               console.log('ща поставлю кадр номер', props.curFrame);
                               document.getElementById('multPresImg').setAttribute('src', 'data:image/png;base64,' + props.multframes[Number.parseInt(e.target.value)].src)
                           }}/>
                    <button onClick={() => props.playAnimation(document.getElementById('multPresImg'))}>{props.isPlaying}</button>
                </div>
                <div className="creator_part">
                    login: {props.multInfo.login}
                    <img id='avatarimage' src='' alt=""/>
                    <button className='' id='likebtn' onClick={() => props.LikeThePost()}>нравится</button>

                </div>
                {/*<Multv2   setCurrentMultForPresentation={props.setCurrentMultForPresentation}  multInfo={props.currentMultForPresentation} multframes = {props.currentMultForPresentation.frames}  className='multPresentationImg' />*/}
            </div>
            <div className="comm_part">
                <form className="comment_form">
                    <textarea value={props.comment_text} onChange={(e) => props.setComment_text(e.target.value)} cols="8" rows="10"
                              className='comment'>

                </textarea>
                    <input type="button" className='comment' onClick={()=>props.PostComment()} value='отправить'/>
                </form>


                {
                    props.CommentsToShow().map((comment) => {
                        setTimeout(() => {
                        }, 200)
                        return (
                            <div>

                                <div className='comment_mult'>
                                    <div className=' commentator'>
                                        {comment.from_login}
                                    </div>
                                    <div className=' comment_text'>
                                        {comment.comment_body}
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        )
                    })}

            </div>
        </div>
    );
};

export default MultPresentationElem;