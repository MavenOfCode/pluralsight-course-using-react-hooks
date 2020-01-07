import React, {useRef, useState, useEffect} from "react";

export default function ImageToggleOnScroll({ primaryImg, secondaryImg}) {
    const imageRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
        setInView(isInView());
        setIsLoading(false);
        return (() => {
            window.removeEventListener("scroll", scrollHandler)
        });
    },[isLoading]);
    
    const [inView, setInView] = useState(false);

    function isInView() {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            return (
                rect.top >= 0 && rect.bottom <= window.innerHeight
            );
        } else {
            return false;
        }
    }

    function scrollHandler() {
        setInView(() => {
            return isInView();
        })
    }

    return isLoading ? null : (
        <img
            className="toggleImage"
            src={inView ? secondaryImg : primaryImg}
            width={250} height={250}
            alt=""
            ref={imageRef}
            />
  )  
};