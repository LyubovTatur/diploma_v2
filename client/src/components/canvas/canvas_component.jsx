import React, {useEffect} from 'react';
// import {styles} from './canvas_component.module.css'
import {styles} from './canvas_component.module.css'

// window.location = canvas.toDataURL();

// import GIFEncoder from "gif-encoder-2";

import {createCanvas} from "canvas";

// import {writeFile} from "fs";

// import path from "path";

const CanvasComponent = () => {
    let canvas;
    let context;
    let isDrawing = false


    // var rabbit = document.getElementById("rabbit");
    //
    // // Получить соответствующую позицию каждого кадра на картинке
    // var positions = ['0 -854', '-174 -852', '-349 -852', '-524 -852', '-698 -852', '-873 -848'];
    //
    // // Устанавливаем фоновое изображение кролика
    // rabbit.style.backgroundImage = 'url(rabbit.png)';
    // rabbit.style.backgroundRepeat = 'no-repeat';
    //
    // // Меняем положение фонового изображения время от времени
    // var index = 0;
    //
    // function run() {
    //     var position = positions[index].split(' ');
    //     rabbit.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
    //     index++;
    //     if (index >= positions.length) {
    //         index = 0;
    //     }
    //     setTimeout(run, 80);
    // }





    function heheAfterLoad() {
        canvas = document.getElementById("drawingCanvas");
        context = canvas.getContext("2d");


        // Подключаем требуемые для рисования события
        canvas.onmousedown = startDrawing;
        canvas.onmouseup = stopDrawing;
        // canvas.onmouseout = stopDrawing;
        canvas.onmousemove = draw;
        console.log('mlem');
    }


    function changeColor(color, imgElement) {
        // 	Меняем текущий цвет рисования
        context.strokeStyle = color;

        // Меняем стиль элемента <img>, по которому щелкнули
        imgElement.className = "Selected";

        // Возвращаем ранее выбранный элемент <img> в нормальное состояние
        if (previousColorElement != null)
            previousColorElement.className = "";

        previousColorElement = imgElement;
    }

    var previousColorElement;

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    var previousThicknessElement;

    function changeThickness(thickness, imgElement) {
        // Изменяем текущую толщину линии
        context.lineWidth = thickness;

        // Меняем стиль элемента <img>, по которому щелкнули
        imgElement.className = "Selected";

        // Возвращаем ранее выбранный элемент <img> в нормальное состояние
        if (previousThicknessElement != null)
            previousThicknessElement.className = "";

        previousThicknessElement = imgElement;
    }

    function startDrawing(e) {
        // Начинаем рисовать
        isDrawing = true;

        // Создаем новый путь (с текущим цветом и толщиной линии)
        context.beginPath();
        console.log('start drawing')
        // Нажатием левой кнопки мыши помещаем "кисть" на холст
        context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    }

    function draw(e) {
        if (isDrawing === true) {
            // Определяем текущие координаты указателя мыши
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;

            // Рисуем линию до новой координаты
            context.lineTo(x, y);
            context.stroke();
        }
    }

    function saveCanvas() {
        // Находим элемент <img>
        var imagelist = document.getElementById("savedCopyContainer");
        let imageCopy = document.createElement('img')
        imageCopy.src = canvas.toDataURL()
        imageCopy.style.display = "inline"
        imageCopy.onclick = () => {
            context.drawImage(imageCopy, 0,0)

        }

        imagelist.appendChild(imageCopy)

        // Отображаем данные холста в элементе <img>
        // imageCopy.src = canvas.toDataURL();

        // Показываем элемент <div>, делая изображение видимым
        // делая изображение видимым
        // var imageContainer = document.getElementById("savedCopyContainer");
        // imageContainer.style.display = "block";
    }

    function stopDrawing() {
        isDrawing = false;
        console.log('stop drawing')

    }
    useEffect(()=>heheAfterLoad())

    return (
        <div>

            <div className="Toolbar">
                {/*<button onClick={() => heheAfterLoad()}>startttttt</button>*/}
                {/*<img id="redPen" src="https://professorweb.ru/downloads/pen_red.gif" alt="Красная кисть"*/}
                {/*     onClick={()=>changeColor('rgb(212,21,29)', this)}/>*/}
                {/*<img id="greenPen" src="https://professorweb.ru/downloads/pen_green.gif" alt="Зеленая кисть"*/}
                {/*     onClick={()=>changeColor('rgb(131,190,61)', this)}/>*/}
                {/*<img id="bluePen" src="https://professorweb.ru/downloads/pen_blue.gif" alt="Синяя кисть"*/}
                {/*     onClick={()=>changeColor('rgb(0,86,166)', this)}/>*/}
            </div>
            <div className="Toolbar">
                <input type="range" max='40' min='1' onChange={(e) => changeThickness(e.target.value, this)}/>

                {/*<img src="https://professorweb.ru/downloads/pen_thin.gif" alt="Тонкая кисть"*/}
                {/*     onClick={()=>changeThickness(1, this)}/>*/}
                {/*<img src="https://professorweb.ru/downloads/pen_medium.gif" alt="Нормальная кисть"*/}
                {/*     onClick={()=>changeThickness(5, this)}/>*/}
                {/*<img src="https://professorweb.ru/downloads/pen_thick.gif" alt="Толстая кисть"*/}
                {/*     onClick={()=>changeThickness(10, this)}/>*/}
            </div>
            <div className="CanvasContainer">
                <canvas id="drawingCanvas" width="600px" height="400px"/>
                <div id="savedCopyContainer">
                    {/*<img id="savedImageCopy"/><br/>*/}
                </div>
            </div>
            <div className="Toolbar">
                - Операции-<br/>
                <button onClick={() => saveCanvas()}>Сохранить содержимое Canvas</button>
                <button onClick={() => clearCanvas()}>Очистить Canvas</button>

            </div>
        </div>

    );
};

export default CanvasComponent;