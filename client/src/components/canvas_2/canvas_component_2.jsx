import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const CanvasComponent2 = (props) => {
    const navigate = useNavigate()
    var canvas, context,
        dragging = false,
        dragStartLocation,
        selectedImage,
        snapshot;
    let drawingStyle
    const [asyncOperation, setAsyncOperation] = useState('')
    let animIndex
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    // const [snapshot,setSnapshot] = useState('')

    function getCanvasCoordinates(event) {
        var x = event.clientX - canvas.getBoundingClientRect().left,
            y = event.clientY - canvas.getBoundingClientRect().top;

        return {x: x, y: y};
    }

    function takeSnapshot() {
        updateCanvasContext()
        snapshot = context.getImageData(0, 0, canvas.width, canvas.height)
    }

    function restoreSnapshot() {
        updateCanvasContext()
        context.putImageData(snapshot, 0, 0);
    }


    function drawLine(position) {
        context.beginPath();
        console.log('line!')
        context.moveTo(dragStartLocation.x, dragStartLocation.y);
        context.lineTo(position.x, position.y);
        context.stroke();
    }

    function drawCircle(position) {
        var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
        console.log('circle!')
        context.beginPath();
        context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI, false);
        context.fill();
    }


    function dragStart(event) {
        dragging = true;
        dragStartLocation = getCanvasCoordinates(event);
        if (drawingStyle !== 'draw') takeSnapshot();
        else {

            context.beginPath();
            context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);

        }


        console.log('start drawing')
    }

    const [textPos, setTextPos] = useState({x: 0, y: 0})

    function choosingTextPlace(position) {
        context.beginPath();
        // console.log('text!')
        // context.setLineDash([10, 20]);
        context.fillRect(dragStartLocation.x, dragStartLocation.y, position.x - dragStartLocation.x, position.y - dragStartLocation.y);
        // context.setLineDash([0, 0]);
        // setTextPos({x: position.x - dragStartLocation.x, y: Math.max(position.y - dragStartLocation.y, position.y)})
        //context.moveTo(dragStartLocation.x, dragStartLocation.y);
        //context.lineTo(position.x, position.y);
        //context.stroke();
    }

    // const [dragStartLocation,setDragStartLocation]=useState('')
    function drag(event) {
        var position;
        //console.log('драг старт позишон', dragStartLocation)
        if (dragging === true) {
            //console.log('drawing')
            position = getCanvasCoordinates(event);
            // console.log(`i see ${drawingStyle} in drawingStyle`)
            switch (drawingStyle) {
                case 'draw':
                    var x = event.pageX - canvas.offsetLeft;
                    var y = event.pageY - canvas.offsetTop;
                    // Рисуем линию до новой координаты
                    context.lineTo(x, y);
                    context.stroke();
                    break
                case 'line':
                    restoreSnapshot();
                    drawLine(position);
                    break
                case 'circle':
                    restoreSnapshot();
                    drawCircle(position);
                    break
                case 'rect':
                    restoreSnapshot()
                    choosingTextPlace(position)
                    break


            }

        }
    }

    function DrawUnderCanvas(imageCopy) {
        document.getElementById('canvasunder').getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('canvasunder').getContext('2d').drawImage(imageCopy, 0, 0)

    }

    function saveCanvas() {
        canvas = document.getElementById("canvas");
        context = canvas.getContext('2d');
        // Находим элемент <img>
        var imagelist = document.getElementById("savedCopyContainer");
        let imageCopy = document.createElement('img')
        imageCopy.src = canvas.toDataURL()
        imageCopy.style.display = "inline"
        imageCopy.className = 'savedImage'
        clearCanvas()
        setTimeout(DrawUnderCanvas, 100, (imageCopy))
        imageCopy.onclick = () => {
            // clearCanvas()
            setTimeout(DrawUnderCanvas, 100, (imageCopy))

            // context.drawImage(imageCopy, 0, 0)
            selectedImage = imageCopy
            //console.log('попытка засунуть имадж в селектед', selectedImage)
        }

        imagelist.appendChild(imageCopy)

        // Отображаем данные холста в элементе <img>
        // imageCopy.src = canvas.toDataURL();

        // Показываем элемент <div>, делая изображение видимым
        // делая изображение видимым
        // var imageContainer = document.getElementById("savedCopyContainer");
        // imageContainer.style.display = "block";
    }

    const [drawingText, setDrawingText] = useState('')

    // const [textFontSize, setTextFontSize] = useState('')
    function TextIsReadyToBePrinted(ctxFontSize, x, y) {
        restoreSnapshot()
        console.log('ща нарисую')

        context.font = `${ctxFontSize}px Verdana`;
        context.fillText(drawingText, x, y);
    }

    function typingText() {
        const position = textPos
        setDrawingText('')
        // setTextFontSize(Math.abs( position.y - dragStartLocation.y-4))
        // if (textFontSize<1) setTextFontSize(1)
        console.log('drawingtext:', drawingText)
        console.log('position:', position)
        console.log('starppos:', dragStartLocation)
        let ctxFontSize = Math.abs(position.y - dragStartLocation.y - 4)
        if (ctxFontSize < 1)
            ctxFontSize = 1
        TextIsReadyToBePrinted(ctxFontSize, position.x, Math.max(position.y, dragStartLocation.y))

    }

    function dragStop(event) {
        dragging = false;
        var position = getCanvasCoordinates(event);
        switch (drawingStyle) {
            case 'draw':
                break
            case 'line':
                restoreSnapshot();
                drawLine(position);
                break
            case 'circle':
                restoreSnapshot();
                drawCircle(position);
                break
            case 'rect':
                choosingTextPlace(position)
                // document.getElementById('textDrawingInput').setAttribute('display','default')
                //restoreSnapshot()
                break
        }
        console.log('селектед имадж', selectedImage)
        if (selectedImage !== '') {
            console.log('селектед имадж:', selectedImage)
            console.log('пересохраняем..')
            const cvs = document.getElementById('canvas')
            //const img = JSON.parse(localStorage.getItem('selectedImage'))
            selectedImage.src = canvas.toDataURL();
        }
        console.log('drawing was ended')
    }

    useEffect(() => {
        if (document.getElementById('savedCopyContainer').childElementCount === 0) localStorage.setItem('selectedImage', '')
        canvas = document.getElementById("canvas");
        context = canvas.getContext('2d');
        context.strokeStyle = 'black';
        context.fillStyle = 'black';
        context.lineWidth = 4;
        context.lineCap = 'round';
        drawingStyle = 'draw'
        selectedImage = ''

        // document.getElementById('textDrawingInput').setAttribute('display','none')

        canvas.addEventListener('mousedown', dragStart, false);
        canvas.addEventListener('mousemove', drag, false);
        canvas.addEventListener('mouseup', dragStop, false);
        console.log('можно начинать рисовать!')
    }, [])

    function clearCanvas() {
        canvas = document.getElementById("canvas");

        context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log('контекст очищен');
    }

    const setDrawingStyle = (style) => {
        canvas.removeEventListener('mousedown', dragStart, false)
        canvas.removeEventListener('mousemove', drag, false)
        canvas.removeEventListener('mouseup', dragStop, false)
        drawingStyle = style
        canvas.addEventListener('mousedown', dragStart, false);
        canvas.addEventListener('mousemove', drag, false);
        canvas.addEventListener('mouseup', dragStop, false);
    }

    // window.addEventListener('load', init, false);


    function timer(ms) {
        return new Promise(res => setTimeout(res, ms));
    }


    function playAnimation() {
        if (isPlaying === 'play') {
            setIsPlaying('stop')
            animIndex = 0
            setAsyncOperation(setTimeout(function changeImagesOnCanvas(IsPlaying) {

                //console.log(animIndex)
                console.log(asyncOperation, 'асинк операйшон')

                //console.log(document.getElementById('savedCopyContainer').childNodes.item(i));
                clearCanvas();
                context.drawImage(document.getElementById('savedCopyContainer').childNodes.item(animIndex), 0, 0)
                animIndex++
                if (animIndex === document.getElementById('savedCopyContainer').childElementCount) animIndex = 0
                if (isPlaying === 'play') setAsyncOperation(setTimeout(changeImagesOnCanvas, 100, isPlaying))
            }, 100))
        } else {
            setIsPlaying('play')
            clearTimeout(asyncOperation)
            console.log(asyncOperation)
        }
    }

    const [isPlaying, setIsPlaying] = useState('play')

    function saveAnimation() {
        if (props.user !== '') {
            console.log('попытка сохранения мульта..')

            //
            // let animationFrames=[];
            // let HTMLColl = document.getElementById('savedCopyContainer').children
            // for (let i = 0;i<HTMLColl.length;i++){
            //     var imageData = HTMLColl[i].getAttribute('src');
            //     var image = new Image();
            //     image.src = imageData;
            //     animationFrames.push(image)
            // }
            // console.log(animationFrames)

            // let xhr = new XMLHttpRequest();
            // xhr.open("POST", "index.php");
            // xhr.send(formData);
            //
            //
            let temp = document.getElementById('savedCopyContainer').children

            const animationFrames = Array.from(temp).map((frameElem) => frameElem.getAttribute('src').split(',')[1]);
            // console.log(Array.from(animationFrames).map(elem => ));
            // for (let i = 0;i<animationFrames.length;i++){
            //     const image = new Image()
            //     image.src=animationFrames[i]
            //     console.log(image)
            //     const canvasForUpload = createCanvas(1920,1080)
            //     const contextForUpload = canvasForUpload.getContext('2d')
            //     contextForUpload.drawImage(image, 0, 0)
            //     const buffer = canvasForUpload.toBuffer('image/png')
            //     fs.writeFileSync('./test.png', buffer)
            // }
            axios.post('http://localhost:3001/saveAnimation', {
                login: props.user,
                title: title,
                description: description,
                //myFormData: myFormData
                animationFrames: animationFrames,
            }).then((response) => {
                console.log('ответ сервера:', response.data)
                if (response.data == '0') {
                    console.log('успех!')
                    alert('мультик опубликован!')
                    navigate('/main/top')
                    // for (let dataURL in Array.from(animationFrames)){
                    //
                    //     var link = document.createElement("a");
                    //     document.body.appendChild(link); // Firefox requires the link to be in the body :(
                    //     link.href = dataURL;
                    //     link.download = "my-image-name.jpg";
                    //     link.click();
                    //     document.body.removeChild(link);
                    //
                    //
                    // }
                } else console.log('провал!')
            })

        } else {


            console.log('Гость не может сохранять мультки.');
        }

    }


    function testirovka() {
        let HTMLColl = document.getElementById('savedCopyContainer').children
        let imageData = HTMLColl[0].getAttribute('src');
        let image = new Image();
        image.src = imageData;
        window.location.href = image;


        // let myFormData = new FormData();
        // for (let i = 0; i < document.getElementById('savedCopyContainer').childElementCount; i++) {
        //
        //     myFormData.append("myFile"+{i}, document.getElementById("savedCopyContainer").children[i]);
        //     console.log(myFormData)
        // }
        // let animationFrames=[];
        // let HTMLColl = document.getElementById('savedCopyContainer').children
        // for (let i = 0;i<HTMLColl.length;i++){
        //     var imageData = HTMLColl[i].getAttribute('src');
        //     var image = new Image();
        //     image.src = imageData;
        //     animationFrames.push(image)
        // }
        // console.log(animationFrames)

    }

    function updateCanvasContext() {
        canvas = document.getElementById("canvas");

        context = canvas.getContext('2d');
    }

    return (
        <div className='canv2'>
            <div className="canvas_part">
                <div className='canvases'>
                    <canvas id="canvasunder" width="600" height="400"/>
                    <canvas id="canvas" width="600" height="400"/>
                </div>
                <div id='drawingstyles'>

                    <button onClick={() => {
                        updateCanvasContext();
                        setDrawingStyle('draw')
                    }}>кисть
                    </button>
                    <button onClick={() => {
                        updateCanvasContext();
                        setDrawingStyle('circle')
                    }}>круг
                    </button>
                    <button onClick={() => {
                        updateCanvasContext();
                        setDrawingStyle('line')
                    }}>линия
                    </button>
                    <button onClick={() => {
                        updateCanvasContext();
                        setDrawingStyle('rect')
                    }}>прямоугольник
                    </button>
                    кисть<input type='color'
                           onChange={(e) => context.strokeStyle = e.target.value}/> {/*<button onClick={() => clearCanvas()}>очистить</button>*/}
                    заливка<input type='color'
                           onChange={(e) => context.fillStyle = e.target.value}/> {/*<button onClick={() => clearCanvas()}>очистить</button>*/}
                    {/*<input id='textDrawingInput' value={drawingText} type="text" onChange={(e)=>{*/}
                    {/*    console.log('печатаешь.')*/}
                    {/*    setDrawingText(e.target.value); typingText()}} onClick={(e)=> {*/}
                    {/*    typingText()*/}
                    {/*    // e.target.setAttribute('display','none');*/}
                    {/*}}/>*/}
                    {/*<button onClick={() => clearCanvas()}>очистить</button>*/}
                </div>
                <div id="savedCopyContainer">
                    {/*<img id="savedImageCopy"/><br/>*/}
                </div>
                <div className="Toolbar">
                    <button onClick={() => saveCanvas()}>Сохранить содержимое Canvas</button>
                    <button onClick={() => clearCanvas()}>Очистить Canvas</button>
                    <button onClick={() => playAnimation()}>{isPlaying}</button>
                    {/*<button onClick={() => testirovka()}>что я насохраняла</button>*/}
                </div>
            </div>
            <div className="mult_title_desc">
                Введите название мультика <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                Описание:
                <br/>

                <textarea id='mult_desc_creation' value={description} onChange={(e) => setDescription(e.target.value)}/>
                <button className='saveMult' onClick={() => saveAnimation()}>Сохранить мультик</button>

            </div>
        </div>
    );
}


export default CanvasComponent2;