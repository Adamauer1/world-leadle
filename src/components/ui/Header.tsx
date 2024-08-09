"use client";
import { ActionIcon, Flex, Modal, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./page.module.css";
import Link from "next/link";

export default function Header() {
  const handleTutorialModal = () => {};
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Flex direction={"row"} justify={"center"}>
        <Link href={"/"}>
          <Title order={1} c={"black"}>
            WORLD LEADLE
          </Title>
        </Link>
        <ActionIcon onClick={open}></ActionIcon>
      </Flex>
      <Modal opened={opened} onClose={close}>
        <Flex direction={"column"}>
          <Title order={1}>How to Play!</Title>
          <Text>
            The goal of this game is to guess the leader based on the image in 5
            guesses. A guess will only count if the person is in the list of
            possible answers. (See suggested people when typing) After giving a
            valid guess a feedback will be given like the example below. This
            feedback is split into 6 different sections. <br />
            Name - Name of the leader <br />
            Title - Highest Title of the leader <br />
            Country - The country the leader represents <br />
            Continent - The main continent the country is in <br />
            Century - The century or centuries the leader where apart of <br />
            Arrow - An arrow pointing towards the correct century <br />
            {/* Show image of an example or render one */}
            The color of each section also gives a clue to the answer. <br />
            Red - Wrong <br />
            Green - Correct <br />
            Yellow - Almost Correct (For when your guess the correct century but
            the real answer is only one of the two or part of two) <br />
          </Text>
        </Flex>
      </Modal>
    </>
  );
}