import { Center, Flex, rem, Text, useMantineColorScheme } from "@mantine/core";
import styles from "@/components/styles/GuessRow.module.css";
export default function GuessRow({
  id,
  key,
  leader,
  answer,
  centuries,
}: {
  id: string;
  key: number;
  leader: any;
  answer: any;
  centuries: any;
}) {
  const { colorScheme } = useMantineColorScheme();

  let [color, text] = centuries;
  const red = colorScheme === "light" ? "#fa5252" : "#c92a2a";
  const green = colorScheme === "light" ? "#40c057" : "#2b8a3e";
  const yellow = colorScheme === "light" ? "#fab005" : "#e67700";
  switch (color) {
    case "green":
      color = green;
      break;
    case "yellow":
      color = yellow;
      break;
    case "red":
      color = red;
      break;
  }
  return (
    <Flex
      id={id}
      key={key}
      direction={{ base: "column", lg: "row" }}
      gap={{ lg: rem(10) }}
      w={{ base: "100%" }}
      justify={"center"}
      pt={{ base: rem(30), lg: 0 }}
      // c={"white"}
    >
      <Center
        bg={leader.nameSearch === answer.nameSearch ? green : red}
        // bd={"1px solid black"}
        w={{ lg: rem(300) }}
        h={{ base: rem(50), lg: rem(60) }}
        classNames={{ root: styles.centerRoot }}
      >
        <Text>{leader.name}</Text>
      </Center>
      <Center
        bg={leader.title === answer.title ? green : red} //green then red
        // bd={"1px solid black"}
        w={{ lg: rem(150) }}
        h={{ base: rem(50), lg: rem(60) }}
        classNames={{ root: styles.centerRoot }}
      >
        <Text>{leader.title}</Text>
      </Center>
      <Center
        bg={leader.nationality === answer.nationality ? green : red} //green then red
        // bd={"1px solid black"}
        w={{ lg: rem(300) }}
        h={{ base: rem(50), lg: rem(60) }}
        classNames={{ root: styles.centerRoot }}
      >
        <Text>{leader.nationality}</Text>
      </Center>
      <Center
        bg={leader.continent === answer.continent ? green : red} //green then red
        // bd={"1px solid black"}
        w={{ lg: rem(150) }}
        h={{ base: rem(50), lg: rem(60) }}
        classNames={{ root: styles.centerRoot }}
      >
        <Text>{leader.continent}</Text>
      </Center>
      <Flex
        direction={"row"}
        //   w={{ base: "100%" }}
      >
        <Center
          bg={color}
          // bd={"1px solid black"}
          w={{ base: "80%", lg: rem(100) }}
          h={{ base: rem(50), lg: rem(60) }}
          classNames={{ root: styles.centerRoot }}
        >
          <Text>{leader.century}</Text>
        </Center>
        <Center
          bg={color}
          // bd={"1px solid black"}
          w={{ base: "20%", lg: rem(50) }}
          h={{ base: rem(50), lg: rem(60) }}
          classNames={{ root: styles.centerRoot }}
        >
          <Text>{text}</Text>
        </Center>
      </Flex>
    </Flex>
  );
}
