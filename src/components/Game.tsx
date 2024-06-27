import LeftBody from "./LeftBody";
import RightBody from "./RightBody";

const Game = () => {
  return (
    <div className="">
      {/* <div className="Left-container w-1/3 h-full">{<LeftBody />}</div> */}
      {/* <div className="Right-container w-2/3">{<RightBody />}</div> */}

      <div className="Right-container">{<RightBody />}</div>
    </div>
  );
};

export default Game;
