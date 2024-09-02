import { useHardMode } from "@/contexts/HardModeContext";
import styles from "@/components/styles/SearchInput.module.css";
import { leaders } from "@/lib/data";
import {
  ActionIcon,
  Autocomplete,
  rem,
  stylesToString,
  UnstyledButton,
} from "@mantine/core";
const data = leaders;
const leaderSearchList = data.map((leader) => leader.nameSearch).sort();

export default function SearchInput({
  currentGuess,
  setCurrentGuess,
  handleGuess,
  errorMessage,
  gameOver,
}: {
  currentGuess: string;
  setCurrentGuess: any;
  handleGuess: any;
  errorMessage: string;
  gameOver: boolean;
}) {
  const { isHardMode } = useHardMode();

  return (
    <>
      <Autocomplete
        w={{ base: "95%", lg: "70%" }}
        size="lg"
        data={isHardMode ? [] : leaderSearchList}
        error={errorMessage}
        rightSection={
          <>
            <UnstyledButton
              className={styles.button}
              onClick={handleGuess}
              disabled={gameOver}
              w={rem(320)}
              h={"100%"}
            >
              Search
            </UnstyledButton>
          </>
        }
        placeholder="Type here ..."
        value={currentGuess}
        onChange={setCurrentGuess}
        disabled={gameOver}
        styles={{
          section: {
            width: rem(150),
            height: "100%",
            padding: 0,
            margin: 0,
            top: 0,
          },
        }}
      />
    </>
  );
}
