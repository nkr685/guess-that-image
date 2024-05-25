import React, { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

const copySvgToClipboard = async () => {
  const svgElement = document.querySelector('.popup-content svg');
  const dataUrl = await htmlToImage.toPng(svgElement);
  console.log(dataUrl); // Log the data URL to inspect it
  // navigator.clipboard.writeText(dataUrl);
  alert('Image copied to clipboard!');
};

  return (
    <div>
      <button onClick={togglePopup}>Share!</button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <svg width={400} height={600} style={{border: "3px dashed white"}}>
              <circle cx={200} cy={300} r={20} fill="red" />
            </svg>
            <button onClick={togglePopup}>Close Popup</button>
            <button onClick={copySvgToClipboard}>Copy Image</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
