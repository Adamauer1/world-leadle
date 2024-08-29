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
import { leaders, frontPageLeaders } from "@/lib/data";

const data = leaders.map((leader) => leader.image);
//const data = frontPageLeaders;

const testData = [
  "https://upload.wikimedia.org/wikipedia/commons/e/e5/Circle_of_William_Scrots_Edward_VI_of_England.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/8/87/Streathamladyjayne.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fe/Anthonis_Mor_001.jpg",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * data.length)
  );
  // const [imageIndex2, setImageIndex2] = useState(
  //   Math.floor(Math.random() * data.length)
  // );
  const [currentStaticImageIndex, setCurrentStaticImageIndex] =
    useState(currentImageIndex);
  const [isLoading, setIsLoading] = useState(false);

  // const [isActive, setIsActive] = useState(false);
  const animatedElementRef = useRef(null);
  const [key, SetKey] = useState(Math.random());

  useEffect(() => {
    // Function to handle the animation end event
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
      // setIsActive((isActive) => {
      //   setTimeout(() => {
      //     console.log(isActive);
      //     if (isActive) {
      //       setImageIndex1(Math.floor(Math.random() * data.length));
      //     } else {
      //       setImageIndex2(Math.floor(Math.random() * data.length));
      //     }
      //   });
      //   return !isActive;
      // });
      SetKey(Math.random() * 1000);
      // setIsLoading(false);
      //alert("Animation completed!");
    };

    // Adding the event listener when the component mounts
    const animatedElement: any = animatedElementRef.current;
    // if (animatedElement){

    // }
    animatedElement.addEventListener("animationend", handleAnimationEnd);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      animatedElement.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [key, currentImageIndex]); // Empty dependency array ensures this effect runs only once when the component mounts

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
        <Image
          src={data[currentStaticImageIndex]}
          alt="background"
          //
          // w={{ base: 200, sm: 400, lg: 500 }}
          //w={"auto"}
          //h={533}
          //visibleFrom="md"
          classNames={{ root: styles.backgroundImage }}
        />
      </div>
      {/* <div
        // key={key}
        className={
          isActive
            ? styles.activeBackgroundImageContainer
            : styles.backgroundImageContainer
        }
        ref={animatedElementRef}
      >
        <Image
          src={data[imageIndex1]}
          alt="background"
          //
          // w={{ base: 200, sm: 400, lg: 500 }}
          //w={"auto"}
          //h={533}
          //visibleFrom="md"
          classNames={{ root: styles.backgroundImage }}
          hidden={isActive}
        />
      </div> */}
      <div
        key={key}
        className={styles.activeBackgroundImageContainer}
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
          opacity={isLoading ? 0 : 1}
          // hidden={isLoading}
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
