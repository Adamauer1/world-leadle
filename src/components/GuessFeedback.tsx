import "@/styles/GuessFeedback.css";

const GuessFeedback = () => {
  return (
    <div className="GuessFeedback flex flex-row justify-center">
      <div className="Result-box w-56">Kyriakos Mitsotakis</div>
      <div className="Result-box w-40">Prime Minister</div>
      <div className="Result-box w-60">Greece</div>
      <div className="Result-box w-40">Europe</div>
      <div className="Result-box w-28">21th</div>
      <div className="Result-box w-8 !text-4xl">✓</div>
    </div>
  );
};

export default GuessFeedback;
