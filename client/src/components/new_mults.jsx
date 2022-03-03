import React, {useEffect, useState} from 'react';
import Mult from "./mult";
import Multv2 from "./multv2";
import new_mults from "./new_mults";


const NewMults = (props) => {

    const [pageNum, setPageNum] = useState('1')

    useEffect(() => {
        // openTwelve()
    },[])

    function openTwelve() {
        // console.log('открываю 12 мультиков')
        console.log(JSON.parse(localStorage.getItem('newMults')),'это новые мульты')
        document.getElementById('row_content').innerHTML=''
        for (let i = 0; i < JSON.parse(localStorage.getItem('newMults')).length ; i++) {

            document.getElementById('row_content').appendChild(Multv2({multframes: JSON.parse(localStorage.getItem("newMults"))[i].frames}))

        }
    }


    return (

        <div className="grid_content">
            {/*<input type='button' value='назад'/>*/}
            {/*<div className='pageNum'>{pageNum}</div>*/}
            {/*<input type='button' value='вперед'/>*/}
            <div id='row_content'  className="row_content">
                {JSON.parse(localStorage.getItem("newMults")).map(elem=>{
                    return(
                       <Multv2 setCurrentMultForPresentation={props.setCurrentMultForPresentation}  multInfo={elem} multframes={elem.frames}/>

                    )
                })}
            </div>
        </div>
    );
}

export default NewMults;