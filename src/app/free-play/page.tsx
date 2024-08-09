"use client";
import NextImage from "next/image";
import styles from "./page.module.css";
import {
  Flex,
  Image,
  Title,
  Text,
  Container,
  rem,
  Autocomplete,
  UnstyledButton,
  ActionIcon,
  Anchor,
  Center,
  LoadingOverlay,
  Loader,
  Button,
} from "@mantine/core";
import { useEffect, useReducer, useState } from "react";
import { Leader } from "@/lib/utils";
import { leaders } from "@/lib/data";

//const data = leaders;

const data = [
  {
    name: "Wenceslaus II",
    title: "King",
    nationality: "Bohemia",
    continent: "Europe",
    century: ["13th", "14th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1a/Vaclav2_trun.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/Wenceslaus_II_of_Bohemia",
    nameSearch: "Wenceslaus II",
  },
  {
    name: "William III",
    title: "King",
    nationality: "England",
    continent: "Europe",
    century: ["17th", "18th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/25/King_William_III_of_England.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/William_III_of_England",
    nameSearch: "William III",
  },
  {
    name: "James II",
    title: "King",
    nationality: "England",
    continent: "Europe",
    century: ["17th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/James_II_by_Peter_Lely.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/James_II_of_England",
    nameSearch: "James II",
  },
  {
    name: "Charles II",
    title: "King",
    nationality: "England",
    continent: "Europe",
    century: ["17th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/51/King_Charles_II_by_John_Michael_Wright_or_studio.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/Charles_II_of_England",
    nameSearch: "Charles II",
  },
  {
    name: "Charles I",
    title: "King",
    nationality: "England",
    continent: "Europe",
    century: ["17th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/King_Charles_I_after_original_by_van_Dyck.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/Charles_I_of_England",
    nameSearch: "Charles I",
  },
  {
    name: "James I",
    title: "King",
    nationality: "England",
    continent: "Europe",
    century: ["17th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/63/JamesIEngland.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/James_VI_and_I",
    nameSearch: "James I",
  },
  {
    name: "Elizabeth I",
    title: "Queen",
    nationality: "England",
    continent: "Europe",
    century: ["16th", "17th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Darnley_stage_3.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/Elizabeth_I",
    nameSearch: "Elizabeth I",
  },
  {
    name: "Mary I",
    title: "Queen",
    nationality: "England",
    continent: "Europe",
    century: ["16th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Anthonis_Mor_001.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/Mary_I_of_England",
    nameSearch: "Mary I",
  },
  {
    name: "Jane Grey",
    title: "Queen",
    nationality: "England",
    continent: "Europe",
    century: ["16th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/87/Streathamladyjayne.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/Lady_Jane_Grey",
    nameSearch: "Jane Grey",
  },
  {
    name: "Edward VI",
    title: "King",
    nationality: "England",
    continent: "Europe",
    century: ["16th"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Circle_of_William_Scrots_Edward_VI_of_England.jpg",
    wikiLink: "https://en.wikipedia.org/wiki/Edward_VI",
    nameSearch: "Edward VI",
  },
];

const LEADERS = new Map<string, Leader>(
  data.map((leader) => [leader.nameSearch, leader])
);

// console.log(LEADERS);

const leaderSearchList = data.map((leader) => leader.nameSearch);

interface GameState {
  //   prevGuesses: Leader[];
  activeList: Leader[];
  inactiveList: Leader[];
  answer: Leader;
  guessesRemaining: number;
}

// type PrevGuesses = { type: "prevGuessChange"; payload: Leader[] };
type IncrementGuesses = { type: "incrementGuesses"; payload: number };
type ChangeActiveList = { type: "changeActiveList"; payload: Leader[] };
type ChangeInactiveList = { type: "changeInactiveList"; payload: Leader[] };
type ChangeAnswer = { type: "changeAnswer"; payload: Leader };
type UpdateGameState = { type: "updateGameState"; payload: GameState };
type GameAction =
  //PrevGuesses |
  | ChangeActiveList
  | ChangeInactiveList
  | ChangeAnswer
  | IncrementGuesses
  | UpdateGameState;

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    // case "prevGuessChange":
    //   return { ...state, prevGuesses: action.payload };
    case "changeActiveList":
      return { ...state, activeList: action.payload };
    case "changeInactiveList":
      return { ...state, inactiveList: action.payload };
    case "changeAnswer":
      return { ...state, answer: action.payload };
    case "incrementGuesses":
      return { ...state, guessesRemaining: action.payload };
    case "updateGameState":
      return action.payload;
    default:
      return state;
  }
};

const initGameState: GameState = {
  //   prevGuesses: [],
  activeList: [],
  inactiveList: [],
  answer: {
    name: "",
    title: "",
    nationality: "",
    continent: "",
    century: [],
    image: "",
    wikiLink: "",
    nameSearch: "",
  },
  guessesRemaining: 5,
};

export default function FreePlay() {
  const [prevGuesses, setPrevGuesses] = useState<Leader[]>([]);
  //   const [guessesRemaining, setGuessesRemaining] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  //   const [answer, setAnswer] = useState<PrevGuesses>(
  //     data[Math.floor(Math.random() * data.length)]
  //   );
  //   const [activeList, setActiveList] = useState<PrevGuesses[]>(data);
  //   const [inactiveList, setInactiveList] = useState<PrevGuesses[]>([]);
  const [gameState, gameDispatch] = useReducer(gameReducer, initGameState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newAnswerIndex = Math.floor(Math.random() * data.length);
    const newAnswer = data[newAnswerIndex];

    const newGameState: GameState = {
      activeList: data.slice(newAnswerIndex),
      inactiveList: [newAnswer],
      answer: newAnswer,
      guessesRemaining: 5,
    };
    gameDispatch({ type: "updateGameState", payload: newGameState });
    // const newAnswerIndex = Math.floor(Math.random() * activeList.length);
    // let newActiveList = activeList;
    // const newAnswer = newActiveList[newAnswerIndex];
    // setActiveList(activeList.slice(newAnswerIndex));
    // setInactiveList((list) => {
    //   list.push(newAnswer);
    //   //   console.log(list);
    //   return list;
    // });
    // setAnswer(newAnswer);

    // setActiveList((list) => {
    //   setAnswer(list[newAnswerIndex]);
    //   console.log(list[newAnswerIndex]);
    //   //   if (list.length <= 5) {
    //   //     setInactiveList([]);
    //   //     return data;
    //   //   }
    //   setInactiveList((inactiveList) => {
    //     inactiveList.push(list[newAnswerIndex]);
    //     console.log(inactiveList);
    //     return inactiveList;
    //   });
    //   return list.slice(newAnswerIndex);
    // });
    setIsLoading(false);
    // console.log(activeList);
    // console.log(inactiveList);
  }, []);

  const handleGuess = () => {
    if (!leaderSearchList.includes(currentGuess)) {
      console.log("error in the name");
      setCurrentGuess("");
      return;
    }

    if (
      prevGuesses.filter((guess) => guess.nameSearch == currentGuess).length > 0
    ) {
      //leader already guessed
      console.log("leader already guessed");
      setCurrentGuess("");
      return;
    }

    if (gameState.answer.name == currentGuess) {
      //display all greens and end game
      console.log("correct");
      const guesses = prevGuesses.concat([LEADERS.get(currentGuess)!]);

      setPrevGuesses(guesses);
      setGameOver(true);
      //   setGuessesRemaining((guessesRemaining) => guessesRemaining - 1);
      gameDispatch({
        type: "incrementGuesses",
        payload: gameState.guessesRemaining - 1,
      });

      setCurrentGuess("");
      return;
    }

    const guesses = prevGuesses.concat([LEADERS.get(currentGuess)!]);
    const isGameOver = gameState.guessesRemaining - 1 <= 0;

    setPrevGuesses(guesses);

    //setGuessesRemaining(guessesRemaining - 1);
    gameDispatch({
      type: "incrementGuesses",
      payload: gameState.guessesRemaining - 1,
    });
    setGameOver(isGameOver);
    setCurrentGuess("");
  };

  const checkCentury = (centuries: string[]) => {
    let color = "red";
    let check = false;
    for (let time of centuries) {
      if (gameState.answer.century.includes(time)) {
        color = "yellow";
      } else {
        check = true;
      }
    }
    if (centuries.length != gameState.answer.century.length) {
      check = true;
    }
    if (color === "yellow" && !check) {
      color = "green";
    }
    let text = "";
    switch (color) {
      case "green":
        text = "\u{02713}";
        break;
      case "yellow":
        text = "\u{2248}";
        break;
      case "red":
        if (centuries[0] > gameState.answer.century[0]) {
          text = "\u{02193}";
        } else {
          text = "\u{02191}";
        }
        break;
      default:
        break;
    }
    return [color, text];
  };

  const displayGuessResultsRow = () => {
    return prevGuesses?.map((leader, index) => {
      const [color, text] = checkCentury(leader.century);
      return (
        <Flex key={index} gap={rem(10)}>
          <Center
            bg={
              leader.nameSearch === gameState.answer.nameSearch
                ? "green"
                : "red"
            }
            bd={"1px solid black"}
            w={rem(300)}
            h={rem(60)}
          >
            <Text>{leader.name}</Text>
          </Center>
          <Center
            bg={leader.title === gameState.answer.title ? "green" : "red"}
            bd={"1px solid black"}
            w={rem(150)}
            h={rem(60)}
          >
            <Text>{leader.title}</Text>
          </Center>
          <Center
            bg={
              leader.nationality === gameState.answer.nationality
                ? "green"
                : "red"
            }
            bd={"1px solid black"}
            w={rem(300)}
            h={rem(60)}
          >
            <Text>{leader.nationality}</Text>
          </Center>
          <Center
            bg={
              leader.continent === gameState.answer.continent ? "green" : "red"
            }
            bd={"1px solid black"}
            w={rem(150)}
            h={rem(60)}
          >
            <Text>{leader.continent}</Text>
          </Center>
          <Center bg={color} bd={"1px solid black"} w={rem(100)} h={rem(60)}>
            <Text>{leader.century}</Text>
          </Center>
          <Center bg={color} bd={"1px solid black"} w={rem(50)} h={rem(60)}>
            <Text>{text}</Text>
          </Center>
        </Flex>
      );
    });
  };

  const handlePlayAgain = () => {
    // reset game
    setPrevGuesses([]);
    //setGuessesRemaining(5);
    setGameOver(false);
    // setAnswer((answer) => {
    //   let newAnswer = answer;
    //   while (answer != newAnswer) {
    //     newAnswer = data[Math.floor(Math.random() * data.length)];
    //   }
    //   return newAnswer;
    // });

    setCurrentGuess("");
    //let newActiveList = activeList;
    const newAnswerIndex = Math.floor(
      Math.random() * gameState.activeList.length
    );
    console.log("Active list");
    console.log(gameState.activeList);
    const newAnswer = gameState.activeList[newAnswerIndex];
    //console.log(newAnswer.name);
    //setAnswer(newAnswer);
    let newGameState: GameState;
    if (gameState.activeList.length <= 5) {
      const dataIndex = data.findIndex(
        (element) => (element.name = newAnswer.name)
      );
      newGameState = {
        activeList: data.slice(dataIndex),
        inactiveList: [newAnswer],
        guessesRemaining: 5,
        answer: newAnswer,
      };
    } else {
      newGameState = {
        activeList: gameState.activeList.slice(newAnswerIndex),
        inactiveList: gameState.inactiveList.concat([newAnswer]),
        guessesRemaining: 5,
        answer: newAnswer,
      };
    }
    gameDispatch({ type: "updateGameState", payload: newGameState });
    // if (newActiveList.length <= 5) {
    //   console.log("reset data");
    //   setActiveList(data.slice(newAnswerIndex));
    //   setInactiveList([newAnswer]);
    // } else {
    //   setActiveList(newActiveList.slice(newAnswerIndex));
    //   setInactiveList((list) => {
    //     list.push(newAnswer);
    //     console.log("inactive list");
    //     console.log(list);
    //     return list;
    //   });
    // }
  };

  return (
    <>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Flex direction={"row"}>
          <Text>{gameState.guessesRemaining}</Text>
          {/* <Flex gap={rem(30)}>
          <Text>{getCurrentAnswerIndex()}</Text>
          <Text>{guessesRemaining}</Text>
        </Flex> */}
          <Flex direction={"column"} flex={0.4} align={"center"} pt={rem(80)}>
            <Container w={"60%"} p={0}>
              <Image alt="" src={gameState.answer.image} />
            </Container>
            <Flex direction={"column"} w={"60%"}>
              <Title order={2} hidden={!gameOver}>
                {gameState.answer.name}
              </Title>
              <Text c={"black"} hidden={!gameOver}>
                {gameState.answer.title}
              </Text>
              <Text
                component="a"
                href={gameState.answer.wikiLink}
                target="_blank"
                hidden={!gameOver}
              >
                Wikipedia
              </Text>
              {/* <Anchor hidden={!gameOver}>wiki url</Anchor> */}
            </Flex>
          </Flex>
          <Flex
            direction={"column"}
            flex={0.6}
            pt={rem(80)}
            align={"center"}
            gap={rem(30)}
          >
            <Autocomplete
              w={"70%"}
              data={leaderSearchList}
              rightSection={
                <>
                  <ActionIcon onClick={handleGuess} disabled={gameOver}>
                    S
                  </ActionIcon>
                </>
              }
              placeholder="Type here ..."
              value={currentGuess}
              onChange={setCurrentGuess}
              disabled={gameOver}
            />
            {displayGuessResultsRow()}
            {/* <Button hidden>Next</Button> */}
            <UnstyledButton hidden={!gameOver} onClick={handlePlayAgain}>
              Play Again
            </UnstyledButton>
          </Flex>
        </Flex>
      )}
    </>
  );
}