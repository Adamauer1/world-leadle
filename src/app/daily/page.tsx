"use client";
import NextImage from "next/image";
import styles from "./page.module.css";
import { scroller } from "react-scroll";
import { Flex, rem, Center, Loader } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import {
  getCurrentAnswerIndex,
  loadLocalData,
  Leader,
  saveUserData,
  checkCentury,
} from "@/lib/utils";
import { leaders } from "@/lib/data";
import { IconSearch } from "@tabler/icons-react";
import SearchInput from "@/components/ui/SearchInput";
import LeaderFrame from "@/components/ui/LeaderFrame";
import GuessRow from "@/components/ui/GuessRow";
// const data: PrevGuesses[] = [
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
//   {
//     name: "James II",
//     title: "King",
//     nationality: "England",
//     continent: "Europe",
//     century: ["17th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/9/99/James_II_by_Peter_Lely.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/James_II_of_England",
//     nameSearch: "James II",
//   },
//   {
//     name: "Charles II",
//     title: "King",
//     nationality: "England",
//     continent: "Europe",
//     century: ["17th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/5/51/King_Charles_II_by_John_Michael_Wright_or_studio.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/Charles_II_of_England",
//     nameSearch: "Charles II",
//   },
//   {
//     name: "Charles I",
//     title: "King",
//     nationality: "England",
//     continent: "Europe",
//     century: ["17th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d5/King_Charles_I_after_original_by_van_Dyck.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/Charles_I_of_England",
//     nameSearch: "Charles I",
//   },
//   {
//     name: "James I",
//     title: "King",
//     nationality: "England",
//     continent: "Europe",
//     century: ["17th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/63/JamesIEngland.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/James_VI_and_I",
//     nameSearch: "James I",
//   },
//   {
//     name: "Elizabeth I",
//     title: "Queen",
//     nationality: "England",
//     continent: "Europe",
//     century: ["16th", "17th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/a/af/Darnley_stage_3.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/Elizabeth_I",
//     nameSearch: "Elizabeth I",
//   },
//   {
//     name: "Mary I",
//     title: "Queen",
//     nationality: "England",
//     continent: "Europe",
//     century: ["16th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/f/fe/Anthonis_Mor_001.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/Mary_I_of_England",
//     nameSearch: "Mary I",
//   },
//   {
//     name: "Jane Grey",
//     title: "Queen",
//     nationality: "England",
//     continent: "Europe",
//     century: ["16th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/8/87/Streathamladyjayne.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/Lady_Jane_Grey",
//     nameSearch: "Jane Grey",
//   },
//   {
//     name: "Edward VI",
//     title: "King",
//     nationality: "England",
//     continent: "Europe",
//     century: ["16th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/e/e5/Circle_of_William_Scrots_Edward_VI_of_England.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/Edward_VI",
//     nameSearch: "Edward VI",
//   },
//   {
//     name: "Henry VIII",
//     title: "King",
//     nationality: "England",
//     continent: "Europe",
//     century: ["16th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/f/f9/After_Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/Henry_VIII",
//     nameSearch: "Henry VIII",
//   },
//   {
//     name: "Henry VII",
//     title: "King",
//     nationality: "England",
//     continent: "Europe",
//     century: ["15th", "16th"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/0/0d/Enrique_VII_de_Inglaterra%2C_por_un_artista_an%C3%B3nimo.jpg",
//     wikiLink: "https://en.wikipedia.org/wiki/Henry_VII_of_England",
//     nameSearch: "Henry VII",
//   },
// ];

const data = leaders;

const LEADERS = new Map<string, Leader>(
  data.map((leader) => [leader.nameSearch, leader])
);

const leaderSearchList = data.map((leader) => leader.nameSearch);

// const loadUserData = () => {
//   const { date, guesses, gameOver } = JSON.parse(
//     window.localStorage.getItem("daily") ?? "{}"
//   );
//   return { date: date, guesses: guesses, gameOver: gameOver };
// };

//let userData: { date: string; guesses: any; gameOver: boolean };
export default function Daily() {
  const [prevGuesses, setPrevGuesses] = useState<Leader[]>([]);
  const [guessesRemaining, setGuessesRemaining] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [answer, setAnswer] = useState<Leader>(data[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{
    date: string;
    guesses: any;
    gameOver: boolean;
  }>({ date: "", guesses: [], gameOver: false });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const scrollID = useRef("0");
  useEffect(() => {
    const localData = loadLocalData();
    if (!localData.date) {
      const currentDate = "2024-8-7";
      setUserData({ date: currentDate, guesses: [], gameOver: false });
      setPrevGuesses([]);
      setGuessesRemaining(5);
      setGameOver(false);
      setAnswer(data[getCurrentAnswerIndex()]);
      setIsLoading(false);
      return;
    }
    console.log(localData);
    setUserData(localData);
    setPrevGuesses(localData.guesses);
    setGuessesRemaining(5 - localData.guesses.length);
    setGameOver(localData.gameOver);
    setAnswer(data[getCurrentAnswerIndex()]);
    const checkDate = "2024-8-7";
    if (localData.date != checkDate) {
      console.log("test");
      saveUserData(checkDate, [], false);
      setPrevGuesses([]);
      setGameOver(false);
      setGuessesRemaining(5);
      setAnswer(data[getCurrentAnswerIndex()]);
    }
    setIsLoading(false);
  }, []);
  // let answer: PrevGuesses;

  // const date = new Date();
  // const checkDate = "2024-8-7";
  // date.getFullYear().toString() +
  // "-" +
  // (date.getMonth() + 1).toString() +
  // "-" +
  // date.getDate().toString();
  // console.log(checkDate);
  // console.log(userData.date);
  // if (userData.date != checkDate) {
  //   console.log("test");
  //   saveUserData(checkDate, [], false);
  //   setPrevGuesses([]);
  //   setGameOver(false);
  //   setGuessesRemaining(5);
  //   //setAnswer(data[getCurrentAnswerIndex()]);
  // }
  //answer = data[getCurrentAnswerIndex()];
  // const answer = {
  //   name: "Henry VII",
  //   title: "King",
  //   nationality: "England",
  //   continent: "Europe",
  //   century: ["15th", "16th"],
  //   image:
  //     "https://upload.wikimedia.org/wikipedia/commons/0/0d/Enrique_VII_de_Inglaterra%2C_por_un_artista_an%C3%B3nimo.jpg",
  //   wikiLink: "https://en.wikipedia.org/wiki/Henry_VII_of_England",
  //   nameSearch: "Henry VII",
  // };
  //const answer = data[getCurrentAnswerIndex()];
  //console.log(LEADERS.get("Henry VII"));

  const handleGuess = () => {
    if (!leaderSearchList.includes(currentGuess)) {
      console.log("error in the name");
      setErrorMessage("Error in the name!");
      setCurrentGuess("");
      return;
    }

    if (
      prevGuesses.filter((guess) => guess.nameSearch == currentGuess).length > 0
    ) {
      //leader already guessed
      console.log("leader already guessed");

      setErrorMessage("Leader already guessed!");
      setCurrentGuess("");
      return;
    }

    if (answer.name == currentGuess) {
      //display all greens and end game
      console.log("correct");
      const guesses = prevGuesses.concat([LEADERS.get(currentGuess)!]);
      saveUserData(userData.date, guesses, true);
      setPrevGuesses(guesses);
      setGameOver(true);
      scroller.scrollTo("endGame", {
        duration: 500, // Duration of the scroll animation in milliseconds
        delay: 0, // Delay before the scroll starts
        smooth: "easeInOutQuart", // Smooth scrolling effect
        offset: -50, // Optional offset to adjust the final scroll position
      });
      setGuessesRemaining((guessesRemaining) => guessesRemaining - 1);
      // setGuessesRemaining(0);
      setCurrentGuess("");
      return;
    }

    const guesses = prevGuesses.concat([LEADERS.get(currentGuess)!]);
    const isGameOver = guessesRemaining - 1 <= 0;
    if (isGameOver) {
      scroller.scrollTo("endGame", {
        duration: 500, // Duration of the scroll animation in milliseconds
        delay: 0, // Delay before the scroll starts
        smooth: "easeInOutQuart", // Smooth scrolling effect
        offset: -50, // Optional offset to adjust the final scroll position
      });
    }
    saveUserData(userData.date, guesses, isGameOver);
    setPrevGuesses(guesses);
    // setGuessesRemaining((guessesRemaining) => {
    //   if (isGameOver) {
    //     setGameOver(true);
    //   }
    //   return guessesRemaining - 1;
    // });
    setGuessesRemaining(guessesRemaining - 1);
    setGameOver(isGameOver);
    setCurrentGuess("");
  };

  // const checkCentury = (centuries: string[]) => {
  //   let color = "red";
  //   let check = false;
  //   for (let time of centuries) {
  //     if (answer.century.includes(time)) {
  //       color = "yellow";
  //     } else {
  //       check = true;
  //     }
  //   }
  //   if (centuries.length != answer.century.length) {
  //     check = true;
  //   }
  //   if (color === "yellow" && !check) {
  //     color = "green";
  //   }
  //   let text = "";
  //   switch (color) {
  //     case "green":
  //       text = "\u{02713}";
  //       break;
  //     case "yellow":
  //       text = "\u{2248}";
  //       break;
  //     case "red":
  //       if (centuries[0] > answer.century[0]) {
  //         text = "\u{02193}";
  //       } else {
  //         text = "\u{02191}";
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   return [color, text];
  // };

  const displayGuessResultsRow = () => {
    return prevGuesses?.map((leader, index) => {
      // const [color, text] = checkCentury(leader.century);
      scrollID.current = `leader-${index.toString()}`;
      return (
        <GuessRow
          id={`leader-${index.toString()}`}
          key={index}
          leader={leader}
          answer={answer}
          centuries={checkCentury(leader.century, answer.century)}
        />
      );
      // return (
      //   <Flex key={index} gap={rem(10)}>
      //     <Center
      //       bg={leader.nameSearch === answer.nameSearch ? "green" : "red"}
      //       bd={"1px solid black"}
      //       w={rem(300)}
      //       h={rem(60)}
      //     >
      //       <Text>{leader.name}</Text>
      //     </Center>
      //     <Center
      //       bg={leader.title === answer.title ? "green" : "red"}
      //       bd={"1px solid black"}
      //       w={rem(150)}
      //       h={rem(60)}
      //     >
      //       <Text>{leader.title}</Text>
      //     </Center>
      //     <Center
      //       bg={leader.nationality === answer.nationality ? "green" : "red"}
      //       bd={"1px solid black"}
      //       w={rem(300)}
      //       h={rem(60)}
      //     >
      //       <Text>{leader.nationality}</Text>
      //     </Center>
      //     <Center
      //       bg={leader.continent === answer.continent ? "green" : "red"}
      //       bd={"1px solid black"}
      //       w={rem(150)}
      //       h={rem(60)}
      //     >
      //       <Text>{leader.continent}</Text>
      //     </Center>
      //     <Center bg={color} bd={"1px solid black"} w={rem(100)} h={rem(60)}>
      //       <Text>{leader.century}</Text>
      //     </Center>
      //     <Center bg={color} bd={"1px solid black"} w={rem(50)} h={rem(60)}>
      //       <Text>{text}</Text>
      //     </Center>
      //   </Flex>
      // );
    });

    // <Flex direction={"row"} gap={rem(30)}>
    //   <Container bg={"red"} bd={"1px solid black"}>
    //     <Text>Abdel Fattah el-Sisi</Text>
    //   </Container>
    //   <Container bg={"red"} bd={"1px solid black"}>
    //     <Text>President</Text>
    //   </Container>
    //   <Container bg={"red"} bd={"1px solid black"}>
    //     <Text>Egypt</Text>
    //   </Container>
    //   <Container bg={"green"} bd={"1px solid black"}>
    //     <Text>Africa</Text>
    //   </Container>
    //   <Container bg={"red"} bd={"1px solid black"}>
    //     <Text>21th</Text>
    //   </Container>
    //   <Container bg={"yellow"} bd={"1px solid black"}>
    //     <Text>↓</Text>
    //   </Container>
    // </Flex>
  };

  const handleInputChange = (value: string) => {
    setCurrentGuess(value);
    setErrorMessage("");
  };

  return (
    <>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Flex direction={{ base: "column", lg: "row" }} pt={{ lg: rem(60) }}>
          <LeaderFrame
            name={answer.name}
            title={answer.title}
            image={answer.image}
            link={answer.wikiLink}
            gameOver={gameOver}
          />

          <Flex
            direction={"column"}
            flex={{ lg: 0.6 }}
            pt={{ lg: rem(80) }}
            p={{ base: rem(15) }}
            align={"center"}
            gap={{ lg: rem(30) }}
          >
            <SearchInput
              currentGuess={currentGuess}
              setCurrentGuess={handleInputChange}
              errorMessage={errorMessage}
              handleGuess={handleGuess}
              gameOver={gameOver}
            />

            {displayGuessResultsRow()}
          </Flex>
        </Flex>
      )}
    </>
  );
}
