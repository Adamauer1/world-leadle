const GuessForm = () => {
  return (
    <div className="GuessForm w-full mt-28">
      <form className="w-full flex flex-row justify-center items-center">
        <input className="a w-3/6 border" placeholder="type here ..."></input>
        <button className="border">Guess</button>
      </form>
    </div>
  );
};

export default GuessForm;
