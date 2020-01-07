import React from "react";
import ImageToggleOnMouseOver from "../src/ImageToggleOnMouseOver";


export default function ImageChangeOnMouseOver() {
    return (
        <div>
            <ImageToggleOnMouseOver 
            primaryImg="/public/speakers/bw/Speaker-187.jpg" alt="Kent"
            secondaryImg="/public/speakers/Speaker-187.jpg" />
             &nbsp;&nbsp;   &nbsp;
            <ImageToggleOnMouseOver 
            primaryImg="/public/speakers/bw/Speaker-1124.jpg" alt="Sandy"
            secondaryImg="/public/speakers/Speaker-1124.jpg"
            />
        </div>
    );
};

