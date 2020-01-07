import React from "react";
import ImageToggleOnScroll from "../src/ImageToggleOnScroll";

export default function ImageChangeOnScroll() {
  return (
    <div>
      {[1530, 8590, 10808, 8367, 187, 1269, 823].map(speakerId => {
        return (
          <div className="speaker" key={speakerId}>
            <ImageToggleOnScroll
              primaryImg={`/public/speakers/bw/Speaker-${speakerId}.jpg`}
              secondaryImg={`/public/speakers/Speaker-${speakerId}.jpg`}
              alt="speaker"
            />
          </div>
        );
      })}
    </div>
  );
}
