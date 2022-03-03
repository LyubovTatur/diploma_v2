import React, {useEffect, useState} from 'react';
import {style} from './pages/common_style.model.css'
import {useNavigate} from "react-router-dom";

const Multv2 = (props) => {
    const navigate = useNavigate()
    const [isPlaying, setIsPlaying] = useState('play')
    let animIndex;
    const [asyncOperation, setAsyncOperation] = useState('')
    useEffect(() => {
        console.log('multv2 props:', props.multframes)
    }, [])

    function playAnimation(imgComponent) {
        if (isPlaying === 'play') {
            setIsPlaying('stop')
            console.log('начал играть')
            animIndex = 0
            setAsyncOperation(setTimeout(function changeImagesOnCanvas(IsPlaying) {

                //console.log(animIndex)
                //console.log(asyncOperation, 'асинк операйшон')
                //console.log('играю')

                //console.log(document.getElementById('savedCopyContainer').childNodes.item(i));
                imgComponent.setAttribute('src', 'data:image/png;base64,' + props.multframes[animIndex].src)
                animIndex++
                if (animIndex === props.multframes.length) animIndex = 0
                if (isPlaying === 'play') setAsyncOperation(setTimeout(changeImagesOnCanvas, 100, isPlaying))
            }, 100))
        } else {
            setIsPlaying('play')
            console.log('закончил играть')
            imgComponent.setAttribute('src', 'data:image/png;base64,' + props.multframes[0].src)

            clearTimeout(asyncOperation)
            console.log(asyncOperation)
        }
    }

    function getSRC() {
        return props.multframes === undefined ? null : 'data:image/png;base64,' + props.multframes[0].src;
    }

    // document.getElementById('playableImg').setAttribute('src',getSRC())}}
    return (
        <div className='mult'>


            <img id='playableImg' onClick={(e) => {
                setIsPlaying('play')
                playAnimation(e.target)
                props.setCurrentMultForPresentation(props.multInfo)
                navigate('/animation')
            }} src={getSRC()} onMouseEnter={(e) => {
                setIsPlaying('stop');
                playAnimation(e.target)
            }} onMouseLeave={(e) => {
                setIsPlaying('play');
                playAnimation(e.target)
            }} alt="мульт"/>
            <div className="mult2_title">
                {props.multInfo.title}
            </div>
        </div>
    );
};

export default Multv2;