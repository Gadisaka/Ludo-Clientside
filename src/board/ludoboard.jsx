import "./style.css";

const LudoBoard = () => {
  return (
    <>
      <div className="ludoContainer">
        <div id="ludoBoard">
          <div id="red-Board" className="board">
            <div>
              <span>
                <i className="fa-solid fa-location-pin piece red-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece red-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece red-piece"></i>
              </span>
              <span>
                <i className="fa-solid fa-location-pin piece red-piece"></i>
              </span>
            </div>
          </div>
          <div id="green-Path" className="verticalPath">
            <div className="ludoBox" id="r11"></div>
            <div className="ludoBox" id="r12"></div>
            <div className="ludoBox" id="r13"></div>
            <div className="ludoBox" id="r10"></div>
            <div className="ludoBox greenLudoBox" id="gh1"></div>
            <div className="ludoBox greenLudoBox" id="g1"></div>
            <div className="ludoBox" id="r9"></div>
            <div className="ludoBox greenLudoBox" id="gh2"></div>
            <div className="ludoBox" id="g2"></div>
            <div className="ludoBox" id="r8"></div>
            <div className="ludoBox greenLudoBox" id="gh3"></div>
            <div className="ludoBox" id="g3"></div>
            <div className="ludoBox" id="r7"></div>
            <div className="ludoBox greenLudoBox" id="gh4"></div>
            <div className="ludoBox" id="g4"></div>
            <div className="ludoBox" id="r6"></div>
            <div className="ludoBox greenLudoBox" id="gh5"></div>
            <div className="ludoBox" id="g5"></div>
          </div>
          <div id="green-Board" className="board">
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="red-Path" className="horizontalPath">
            <div className="ludoBox" id="b13"></div>
            <div className="ludoBox redLudoBox" id="r1"></div>
            <div className="ludoBox" id="r2"></div>
            <div className="ludoBox" id="r3"></div>
            <div className="ludoBox" id="r4"></div>
            <div className="ludoBox" id="r5"></div>
            <div className="ludoBox" id="b12"></div>
            <div className="ludoBox redLudoBox" id="rh1"></div>
            <div className="ludoBox redLudoBox" id="rh2"></div>
            <div className="ludoBox redLudoBox" id="rh3"></div>
            <div className="ludoBox redLudoBox" id="rh4"></div>
            <div className="ludoBox redLudoBox" id="rh5"></div>
            <div className="ludoBox" id="b11"></div>
            <div className="ludoBox" id="b10"></div>
            <div className="ludoBox" id="b9"></div>
            <div className="ludoBox" id="b8"></div>
            <div className="ludoBox" id="b7"></div>
            <div className="ludoBox" id="b6"></div>
          </div>
          <div id="win-Zone"></div>
          <div id="yellow-Path" className="horizontalPath">
            <div className="ludoBox" id="g6"></div>
            <div className="ludoBox" id="g7"></div>
            <div className="ludoBox" id="g8"></div>
            <div className="ludoBox" id="g9"></div>
            <div className="ludoBox" id="g10"></div>
            <div className="ludoBox" id="g11"></div>
            <div className="ludoBox yellowLudoBox" id="yh5"></div>
            <div className="ludoBox yellowLudoBox" id="yh4"></div>
            <div className="ludoBox yellowLudoBox" id="yh3"></div>
            <div className="ludoBox yellowLudoBox" id="yh2"></div>
            <div className="ludoBox yellowLudoBox" id="yh1"></div>
            <div className="ludoBox" id="g12"></div>
            <div className="ludoBox" id="y5"></div>
            <div className="ludoBox" id="y4"></div>
            <div className="ludoBox" id="y3"></div>
            <div className="ludoBox" id="y2"></div>
            <div className="ludoBox yellowLudoBox " id="y1"></div>
            <div className="ludoBox" id="g13"></div>
          </div>
          <div id="blue-Board" className="board">
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="blue-Path" className="verticalPath">
            <div className="ludoBox" id="b5"></div>
            <div className="ludoBox blueLudoBox" id="bh5"></div>
            <div className="ludoBox" id="y6"></div>
            <div className="ludoBox" id="b4"></div>
            <div className="ludoBox blueLudoBox" id="bh4"></div>
            <div className="ludoBox" id="y7"></div>
            <div className="ludoBox" id="b3"></div>
            <div className="ludoBox blueLudoBox" id="bh3"></div>
            <div className="ludoBox" id="y8"></div>
            <div className="ludoBox" id="b2"></div>
            <div className="ludoBox blueLudoBox" id="bh2"></div>
            <div className="ludoBox" id="y9"></div>
            <div className="ludoBox blueLudoBox" id="b1"></div>
            <div className="ludoBox blueLudoBox" id="bh1"></div>
            <div className="ludoBox" id="y10"></div>
            <div className="ludoBox" id="y13"></div>
            <div className="ludoBox" id="y12"></div>
            <div className="ludoBox" id="y11"></div>
          </div>
          <div id="yellow-Board" className="board">
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LudoBoard;
