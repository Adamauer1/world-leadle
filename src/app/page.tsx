"use client";
import NextImage from "next/image";
import styles from "./page.module.css";
import {
  BackgroundImage,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  rem,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { frontPageLeaders } from "@/lib/data";

// const data = leaders.map((leader) => leader.image);
const data = frontPageLeaders;

const testData = [
  "https://upload.wikimedia.org/wikipedia/commons/e/e5/Circle_of_William_Scrots_Edward_VI_of_England.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/87/Streathamladyjayne.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fe/Anthonis_Mor_001.jpg",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * data.length)
  );
  const [currentStaticImageIndex, setCurrentStaticImageIndex] =
    useState(currentImageIndex);
  const animatedElementRef = useRef(null);
  const [key, SetKey] = useState(Math.random());

  useEffect(() => {
    // Function to handle the animation end event
    const handleAnimationEnd = () => {
      console.log("Animation ended");
      setCurrentImageIndex(() => {
        const newIndex = Math.floor(Math.random() * data.length);
        setTimeout(() => {
          setCurrentStaticImageIndex(newIndex);
        }, 1000);
        return newIndex;
      });
      SetKey(Math.random() * 1000);
      //alert("Animation completed!");
    };

    // Adding the event listener when the component mounts
    const animatedElement = animatedElementRef.current;
    animatedElement.addEventListener("animationend", handleAnimationEnd);
    animatedElement;

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      animatedElement.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [key]); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      <Center h={"90dvh"} styles={{ root: { zIndex: 10 } }}>
        <Flex gap={rem(100)}>
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
      </Center>
      <div className={styles.backgroundStaticImageContainer}>
        {/* <BackgroundImage src="/stockOne.jpg" /> */}
        {/* <NextImage
          className={styles.backgroundImage}
          src="/stockOne.jpg"
          alt="Logo"
          fill
          // style={{ zIndex: -10 }}
        /> */}
        <Image
          src={data[currentImageIndex]}
          alt="background"
          //
          // w={{ base: 200, sm: 400, lg: 500 }}
          //w={"auto"}
          //h={533}
          //visibleFrom="md"
          classNames={{ root: styles.backgroundImage }}
        />
      </div>
      <div
        key={key}
        className={styles.backgroundImageContainer}
        ref={animatedElementRef}
      >
        {/* <BackgroundImage src="/stockOne.jpg" /> */}
        {/* <NextImage
          className={styles.backgroundImage}
          src="/stockOne.jpg"
          alt="Logo"
          fill
          // style={{ zIndex: -10 }}
        /> */}
        <Image
          src={data[currentImageIndex]}
          alt="background"
          //
          // w={{ base: 200, sm: 400, lg: 500 }}
          //w={"auto"}
          //h={533}
          //visibleFrom="md"
          classNames={{ root: styles.backgroundImage }}
        />
      </div>
      {/* <Container
        pos={"fixed"}
        top={0}
        w={"100vw"}
        className={styles.backgroundImageContainer}
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Circle_of_William_Scrots_Edward_VI_of_England.jpg"
          alt=""
          className={styles.backgroundImage}
        />
      </Container> */}
      {/* <Center styles={{ root: { height: "90vh" } }}>
        <Button component={Link} href={"/daily"}>
          Daily
        </Button>
        <Button component={Link} href={"/free-play"}>
          Free Play
        </Button>
      </Center> */}
    </>
  );
}
