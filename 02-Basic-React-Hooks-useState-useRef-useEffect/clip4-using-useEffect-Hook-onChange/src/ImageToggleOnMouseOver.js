import React, {useRef} from "react";

export default function ImageToggleOnMouseOver({ primaryImg, secondaryImg, alt}) {
    const imageRef = useRef(null);
    
    return (
        <img
            className="toggleImage"
            src={primaryImg}
            onMouseOver={() => { 
                imageRef.current.src = secondaryImg;
            }}
            onMouseOut={() => {
                imageRef.current.src = primaryImg;
            }}
            alt={alt}
            ref={imageRef}
            />
  )  
};