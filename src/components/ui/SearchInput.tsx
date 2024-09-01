import { leaders } from "@/lib/data";
import { ActionIcon, Autocomplete, rem } from "@mantine/core";
const data = leaders;
const leaderSearchList = data.map((leader) => leader.nameSearch);

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
  return (
    <>
      <Autocomplete
        w={{ base: "95%", lg: "70%" }}
        size="lg"
        data={leaderSearchList}
        error={errorMessage}
        rightSection={
          <>
            <ActionIcon
              onClick={handleGuess}
              disabled={gameOver}
              w={rem(300)}
              h={"100%"}
            >
              Search
            </ActionIcon>
          </>
        }
        placeholder="Type here ..."
        value={currentGuess}
        onChange={setCurrentGuess}
        disabled={gameOver}
        styles={{
          section: {
            width: rem(100),
            height: "100%",
            padding: 0,
            margin: 0,
          },
        }}
      />
    </>
  );
}
