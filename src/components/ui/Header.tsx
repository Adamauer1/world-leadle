"use client";
import {
  ActionIcon,
  Flex,
  Modal,
  Title,
  Text,
  rem,
  Button,
  useMantineColorScheme,
  Switch,
} from "@mantine/core";
import { useColorScheme, useDisclosure } from "@mantine/hooks";
import styles from "@/components/styles/Header.module.css";
import Link from "next/link";
import {
  IconHelpOctagon,
  IconSettings,
  IconSettings2,
  IconTool,
} from "@tabler/icons-react";
import { useHardMode } from "@/contexts/HardModeContext";

export default function Header() {
  const [tutorialOpened, handleTutorialModal] = useDisclosure(false);
  const [settingsOpened, handleSettingsModal] = useDisclosure(false);
  const { isHardMode, toggleHardMode } = useHardMode();
  // const colorScheme = useColorScheme();
  const { toggleColorScheme, setColorScheme, clearColorScheme, colorScheme } =
    useMantineColorScheme();

  const handleToggleColorScheme = () => {
    toggleColorScheme();
    // console.log(colorScheme);
  };

  const handleToggleHardMode = () => {
    toggleHardMode();
    // console.log(isHardMode);
  };

  const handleEraseData = () => {
    localStorage.clear();
  };
  return (
    <>
      <Flex direction={"row"} justify={"center"} align={"center"} gap={rem(10)}>
        <ActionIcon
          variant="transparent"
          // color="black"
          size={"lg"}
          onClick={handleTutorialModal.open}
        >
          <IconHelpOctagon size={"lg"} />
        </ActionIcon>
        <Link href={"/"} className={styles.title}>
          WORLD LEADLE
        </Link>

        <ActionIcon
          variant="transparent"
          // color="black"
          size={"lg"}
          // onClick={open}
          onClick={handleSettingsModal.open}
        >
          <IconSettings size={"lg"} />
        </ActionIcon>
      </Flex>
      <Modal opened={settingsOpened} onClose={handleSettingsModal.close}>
        <Flex direction={"column"} gap={rem(30)}>
          <Flex direction={"row"} justify={"space-evenly"}>
            <Text>Toggle Theme: </Text>
            <Button color="teal" onClick={handleToggleColorScheme}>
              {colorScheme === "dark" ? "light" : "dark"}
            </Button>
          </Flex>
          <Flex direction={"row"} justify={"space-evenly"}>
            <Text>Toggle Hard Mode: </Text>
            <Switch
              onClick={handleToggleHardMode}
              defaultChecked={isHardMode}
            ></Switch>
          </Flex>
          <Flex direction={"row"} justify={"space-evenly"}>
            <Text>Erase Local Storage: </Text>
            <Button color="red" onClick={handleEraseData}>
              Erase Data
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <Modal opened={tutorialOpened} onClose={handleTutorialModal.close}>
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
