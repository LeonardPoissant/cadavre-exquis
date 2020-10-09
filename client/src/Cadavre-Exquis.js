import React, { useState } from "react";

import styled from "styled-components";

const CadavreExquis = () => {
  const canvasRef = React.useRef(null);
  const [locations, setLocations] = useState([]);
  const [imageURL, setImageURL] = useState("");
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  // console.log("LOCATIONS", locations);

  // console.log("dataURL", dataUrl);

  function draw(ctx, location, rect) {
    if (!isDrawing) return;

    ctx.strokeStyle = "#FF0000";

    const saveState = ctx.save();

    // console.log("LOCATION-X", location);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(location.x, location.y);
    ctx.stroke();
    [lastX, lastY] = [location.x, location.y];
    ctx.save();
  }

  function restore(ctx) {
    ctx.restore();
    console.log(ctx);
  }

  function clearCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /*const canvas = document.getElementById("canvas");
  var rect = e.target.getBoundingClientRect();
  // const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");*/

  const saveImage = (e) => {
    let canvas = document.getElementById("canvas");
    let dataUrl = canvas.toDataURL();
    //const newUrl = JSON.parse(dataUrl);
    //setImageURL(newUrl)
    /*let dataUrl = canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      setImageURL(url);
      console.log("URL", typeof url);
      console.log("URL", url);
      // console.log("setBLOB", imageURL);
    });*/

    //  console.log("dataURKL", dataUrl);
    setImageURL(dataUrl);
    console.log("IMGURL", imageURL);
  };

  return (
    <Wrapper>
      <DrawingBoard
        id="canvas"
        ref={canvasRef}
        width="900"
        onMouseMove={(e) => {
          const canvas = document.getElementById("canvas");
          var rect = e.target.getBoundingClientRect();
          // const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          draw(
            ctx,
            {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            },
            rect
          );
        }}
        onMouseDown={(e) => {
          isDrawing = true;
          [lastX, lastY] = [e.clientX, e.clientY];
        }}
        onMouseUp={(e) => {
          isDrawing = false;
        }}
        onMouseOut={(e) => {
          isDrawing = false;
        }}
      ></DrawingBoard>
      <img src={imageURL}></img>
      <ButtonWrapper>
        <button onClick={() => clearCanvas()}>CLEAR</button>

        <button onClick={(e) => saveImage(e)}>SAVE IMAGE</button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;

const DrawingBoard = styled.canvas`
  border-style: solid;
`;

export default CadavreExquis;
