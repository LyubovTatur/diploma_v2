import React from 'react';
import CanvasComponent from "../canvas/canvas_component";
import CanvasComponent2 from "../canvas_2/canvas_component_2";

const AnimationCreationPage = (props) => {
    return (
        <div className='animation_creation'>
            {/*<div className="title_animation">Title</div>*/}
            <div className="creation_zone">
                <div className="canvas_zone"><CanvasComponent2 user={props.user} setUser={props.setUser}/></div>

            </div>


        </div>
    )
        ;
};

export default AnimationCreationPage;