"use client";
import NextImage from "next/image";
import styles from "./page.module.css";
import {
  Accordion,
  Center,
  Flex,
  Image,
  rem,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { leaders, frontPageLeaders } from "@/lib/data";

//const data = leaders.map((leader) => leader.image);
const data = frontPageLeaders;
//const data = ["/home-page-leaders/Zachary_Taylor_restored_and_cropped.jpg"];

export default function Home() {
  const theme = useMantineTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * data.length)
  );

  const [currentStaticImageIndex, setCurrentStaticImageIndex] =
    useState(currentImageIndex);
  const [isLoading, setIsLoading] = useState(false);

  const animatedElementRef = useRef(null);
  const [key, SetKey] = useState(Math.random());

  useEffect(() => {
    setCurrentStaticImageIndex(currentImageIndex);
    const handleAnimationEnd = () => {
      console.log("Animation ended");
      setIsLoading(true);
      setCurrentImageIndex(() => {
        const newIndex = Math.floor(Math.random() * data.length);
        setTimeout(() => {
          setCurrentStaticImageIndex(newIndex);
        }, 1000);

        return newIndex;
      });
      setIsLoading(false);

      SetKey(Math.random() * 1000);
    };

    const animatedElement: any = animatedElementRef.current;

    animatedElement.addEventListener("animationend", handleAnimationEnd);

    return () => {
      animatedElement.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [key, currentImageIndex]);
  return (
    <>
      <Center
        pt={{ base: rem(100), xl: rem(300) }}
        styles={{ root: { zIndex: 10 } }}
      >
        <Flex
          direction={"column"}
          gap={{ base: rem(10), lg: rem(20) }}
          align={{ base: "center" }}
          w={{ base: rem(250), sm: rem(600), lg: rem(800) }}
        >
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: rem(20), sm: 0 }}
            w={"100%"}
            justify={{ base: "space-between", sm: "space-evenly" }}
            align={{ base: "center" }}
          >
            <UnstyledButton
              component={Link}
              href={"/daily"}
              className={styles.button}
            >
              Daily
            </UnstyledButton>
            <UnstyledButton
              component={Link}
              href={"/free-play"}
              className={styles.button}
            >
              FreePlay
            </UnstyledButton>
          </Flex>
          <Accordion classNames={{ root: styles.accordionRoot }} w={"100%"}>
            <Accordion.Item value="How to Play!">
              <Accordion.Control>{"How to Play!"}</Accordion.Control>
              <Accordion.Panel w={"100%"}>
                <Flex direction={"column"}>
                  <Text>
                    The goal of this game is to guess the leader based on the
                    image in 5 guesses. A guess will only count if the person is
                    in the list of possible answers. (See suggested people when
                    typing) After giving a valid guess a feedback will be given
                    like the example below. This feedback is split into 6
                    different sections. <br />
                    Name - Name of the leader <br />
                    Title - Highest Title of the leader <br />
                    Country - The country the leader represents <br />
                    Continent - The main continent the country is in <br />
                    Century - The century or centuries the leader where apart of{" "}
                    <br />
                    Arrow - An arrow pointing towards the correct century <br />
                    {/* Show image of an example or render one */}
                    The color of each section also gives a clue to the answer.{" "}
                    <br />
                    Red - Wrong <br />
                    Green - Correct <br />
                    Yellow - Almost Correct (For when your guess the correct
                    century but the real answer is only one of the two or part
                    of two) <br />
                  </Text>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Flex>
      </Center>
      <div className={styles.backgroundStaticImageContainer}>
        <Image
          src={data[currentStaticImageIndex]}
          alt="background"
          classNames={{ root: styles.backgroundImage }}
        />
      </div>

      <div
        key={key}
        className={styles.activeBackgroundImageContainer}
        ref={animatedElementRef}
      >
        <Image
          src={data[currentImageIndex]}
          alt="background"
          classNames={{ root: styles.backgroundImage }}
          opacity={isLoading ? 0 : 1}
        />
      </div>
    </>
  );
}
