"use client";
import NextImage from "next/image";
// import styles from "./page.module.css";
import styles from "@/app/free-play/page.module.css";
import { scroller } from "react-scroll";
import { Flex, rem, UnstyledButton, Center, Loader } from "@mantine/core";
import { useEffect, useReducer, useRef, useState } from "react";
import { checkCentury, Leader } from "@/lib/utils";
import { leaders } from "@/lib/data";
import SearchInput from "@/components/ui/SearchInput";
import LeaderFrame from "@/components/ui/LeaderFrame";
import GuessRow from "@/components/ui/GuessRow";

const data = leaders;

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
  const [gameOver, setGameOver] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [gameState, gameDispatch] = useReducer(gameReducer, initGameState);
  const [isLoading, setIsLoading] = useState(true);
  const scrollID = useRef("0");

  useEffect(() => {
    const newAnswerIndex = Math.floor(Math.random() * data.length);
    const newActiveList = [...data];
    const newAnswer = newActiveList.splice(newAnswerIndex, 1)[0];
    const newGameState: GameState = {
      activeList: newActiveList,
      inactiveList: [newAnswer],
      answer: newAnswer,
      guessesRemaining: 5,
    };
    gameDispatch({ type: "updateGameState", payload: newGameState });

    setIsLoading(false);
    // console.log(activeList);
    // console.log(inactiveList);
  }, []);

  const handleGuess = () => {
    if (!leaderSearchList.includes(currentGuess)) {
      // console.log("error in the name");
      setErrorMessage("Error in the name!");
      setCurrentGuess("");
      return;
    }

    if (
      prevGuesses.filter((guess) => guess.nameSearch == currentGuess).length > 0
    ) {
      //leader already guessed
      // console.log("leader already guessed");
      setErrorMessage("Leader already guessed!");
      setCurrentGuess("");
      return;
    }

    if (gameState.answer.name == currentGuess) {
      //display all greens and end game
      // console.log("correct");
      const guesses = prevGuesses.concat([LEADERS.get(currentGuess)!]);

      setPrevGuesses(guesses);
      setGameOver(true);
      scroller.scrollTo("endGame", {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50,
      });

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
    setTimeout(() => {
      scroller.scrollTo(scrollID.current, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -50,
      });
    }, 10);
  };

  const displayGuessResultsRow = () => {
    return prevGuesses?.map((leader, index) => {
      //const [color, text] = checkCentury(leader.century);
      scrollID.current = `leader-${index.toString()}`;
      // console.log(scrollID.current);
      return (
        <GuessRow
          id={`leader-${index.toString()}`}
          key={index}
          leader={leader}
          answer={gameState.answer}
          centuries={checkCentury(leader.century, gameState.answer.century)}
        />
      );
    });
  };

  const handlePlayAgain = () => {
    setIsLoading(true);
    // reset game
    setPrevGuesses([]);

    setGameOver(false);

    setCurrentGuess("");
    //let newActiveList = activeList;
    const newAnswerIndex = Math.floor(
      Math.random() * gameState.activeList.length
    );
    // console.log("Active list");
    // console.log(gameState.activeList);
    const newAnswer = gameState.activeList[newAnswerIndex];
    //console.log(newAnswer.name);
    //setAnswer(newAnswer);
    let newGameState: GameState;
    if (gameState.activeList.length <= 5) {
      const dataIndex = data.findIndex(
        (element) => (element.name = newAnswer.name)
      );
      const newActiveList = [...data];
      //   console.log("data reset");
      //   console.log(data);
      newActiveList.splice(dataIndex, 1);
      newGameState = {
        activeList: newActiveList,
        inactiveList: [newAnswer],
        guessesRemaining: 5,
        answer: newAnswer,
      };
    } else {
      const newActiveList = gameState.activeList;
      newActiveList.splice(newAnswerIndex, 1);
      newGameState = {
        activeList: newActiveList,
        inactiveList: gameState.inactiveList.concat([newAnswer]),
        guessesRemaining: 5,
        answer: newAnswer,
      };
    }
    gameDispatch({ type: "updateGameState", payload: newGameState });
    setIsLoading(false);
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
            name={gameState.answer.name}
            title={gameState.answer.title}
            country={gameState.answer.nationality}
            image={gameState.answer.image}
            link={gameState.answer.wikiLink}
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
              handleGuess={handleGuess}
              errorMessage={errorMessage}
              gameOver={gameOver}
            />

            {displayGuessResultsRow()}

            <UnstyledButton
              hidden={!gameOver}
              onClick={handlePlayAgain}
              // classNames={{ root: styles.button }}
              className={styles.button}
            >
              Play Again
            </UnstyledButton>
          </Flex>
        </Flex>
      )}
    </>
  );
}
