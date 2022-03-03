import React, {useState} from 'react';
import Mult from "./mult";
import Multv2 from "./multv2";

const TopMults = (props) => {
    const [pageNum, setPageNum] = useState('1')

    return (
        <div className="grid_content">
            {/*<input type='button' value='назад'/>*/}
            {/*<div className='pageNum'>{pageNum}</div>*/}
            {/*<input type='button' value='вперед'/>*/}
            <div id='row_content' className="row_content">
                {JSON.parse(localStorage.getItem("topMults")).map(elem => {
                    return (
                        <Multv2 setCurrentMultForPresentation={props.setCurrentMultForPresentation} multInfo={elem}
                                multframes={elem.frames}/>

                    )
                })}
            </div>
        </div>

    );
};

export default TopMults;