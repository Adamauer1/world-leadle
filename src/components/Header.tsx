const Header = () => {
  return (
    <div>
      <div
        className="flex flex-row justify-between items-center w-screen h-auto
     bg-blue-500 m-0 p-0"
      >
        <div className="flex flex-row w-1/4">
          <div>
            <label>Free Play</label>
            <input></input>
          </div>
          <div className="flex-row">
            <span>Streak: 0</span>
            <span>Best: 0</span>
          </div>
        </div>
        <div>
          <h1 className="flex-grow text-center text-5xl">WORLD LEADLE</h1>
        </div>
        <div className="w-1/4"></div>
      </div>
      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          height: 2,
          margin: 0,
          padding: 0,
          border: 0,
        }}
      />
    </div>
  );
};

export default Header;
