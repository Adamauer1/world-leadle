const GuessForm = () => {
  return (
    <form className="w-11/12">
      <input
        className="w-2/3 border bg-slate-700"
        placeholder="type here ..."
      ></input>
      <button className="border w-1/3">Guess</button>
    </form>
  );
};

// <div className="GuessForm w-11/12 flex justify-center">
//   <form className="">
//     <input className="a w-2/3 border" placeholder="type here ..."></input>
//     <button className="border w-1/3">Guess</button>
//   </form>
// </div>;

export default GuessForm;
