import React from 'react';
import Mult from "./mult";


const NewMults = (props) => {


    function openNextTwelve() {
        return undefined;
    }

    function createTab() {
        return(
            <button className="tablinks row_content" onClick={()=>openNextTwelve()}>London</button>
        )
    }

    return (

        <div className="grid_content">
            <div className="tab">
                {createTab()}
            </div>
        </div>
    );
};

export default NewMults;