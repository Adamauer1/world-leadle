import Image from "next/image";
const LeftBody = () => {
  let img: string =
    "https://upload.wikimedia.org/wikipedia/commons/1/1a/Vaclav2_trun.jpg";
  let img1: string =
    "https://upload.wikimedia.org/wikipedia/commons/9/95/Kyriakos_Mitsotakis_%282021-12-08%29_03_%28cropped%29.jpg";
  return (
    <div
      className="LeftBody h-full flex flex-col justify-center
     items-center"
    >
      <Image
        src={img1}
        width={300}
        height={250}
        alt=""
        style={{ width: "auto", height: "auto" }}
      />
      <div className="InfoBox w-3/5 flex flex-row justify-between">
        <span>Name</span>
        <a href="https://en.wikipedia.org/wiki/George_V" target="_blank">
          Wikipedia
        </a>
      </div>
    </div>
  );
};

export default LeftBody;
