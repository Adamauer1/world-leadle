import { leaders } from "./data";
var seedrandom = require("seedrandom");

export interface Leader {
  name: string;
  title: string;
  nationality: string;
  continent: string;
  century: string[];
  image: string;
  wikiLink: string;
  nameSearch: string;
}

export const getCurrentAnswerIndex = () => {
  const currentDate = new Date();
  const currentDateString =
    currentDate.getFullYear().toString() +
    "-" +
    (currentDate.getMonth() + 1).toString() +
    "-" +
    currentDate.getDate().toString();

  const { date } = JSON.parse(
    localStorage.getItem("daily") ?? currentDateString
  );
  const generator = seedrandom(date);

  return Math.floor(generator() * leaders.length);
};

export const loadLocalData = () => {
  //const date = new Date();
  const { date, guesses, gameOver } = JSON.parse(
    localStorage.getItem("daily") ?? "{}"
    //JSON.stringify({ date: "", guesses: [], gameOver: false })
  );
  return {
    date: date,
    guesses: guesses,
    gameOver: gameOver,
    // [
    //   {
    //     name: "Wenceslaus II",
    //     title: "King",
    //     nationality: "Bohemia",
    //     continent: "Europe",
    //     century: ["13th", "14th"],
    //     image:
    //       "https://upload.wikimedia.org/wikipedia/commons/1/1a/Vaclav2_trun.jpg",
    //     wikiLink: "https://en.wikipedia.org/wiki/Wenceslaus_II_of_Bohemia",
    //     nameSearch: "Wenceslaus II",
    //   },
    //   {
    //     name: "William III",
    //     title: "King",
    //     nationality: "England",
    //     continent: "Europe",
    //     century: ["17th", "18th"],
    //     image:
    //       "https://upload.wikimedia.org/wikipedia/commons/2/25/King_William_III_of_England.jpg",
    //     wikiLink: "https://en.wikipedia.org/wiki/William_III_of_England",
    //     nameSearch: "William III",
    //   },
    // ],
  };
};
export const saveUserData = (
  date: string,
  guesses: Leader[],
  gameOver: boolean
) => {
  localStorage.setItem(
    "daily",
    JSON.stringify({ date: date, guesses: guesses, gameOver })
  );
};
