import { Center, Flex, rem, Text } from "@mantine/core";

export default function GuessRow({
  key,
  leader,
  answer,
  centuries,
}: {
  key: number;
  leader: any;
  answer: any;
  centuries: any;
}) {
  const [color, text] = centuries;
  return (
    <Flex
      key={key}
      direction={{ base: "column", lg: "row" }}
      gap={{ lg: rem(10) }}
      w={{ base: "100%" }}
      justify={"center"}
      pt={{ base: rem(30), lg: 0 }}
    >
      <Center
        bg={leader.nameSearch === answer.nameSearch ? "green" : "red"}
        bd={"1px solid black"}
        w={{ lg: rem(300) }}
        h={{ base: rem(50), lg: rem(60) }}
      >
        <Text>{leader.name}</Text>
      </Center>
      <Center
        bg={leader.title === answer.title ? "green" : "red"}
        bd={"1px solid black"}
        w={{ lg: rem(150) }}
        h={{ base: rem(50), lg: rem(60) }}
      >
        <Text>{leader.title}</Text>
      </Center>
      <Center
        bg={leader.nationality === answer.nationality ? "green" : "red"}
        bd={"1px solid black"}
        w={{ lg: rem(300) }}
        h={{ base: rem(50), lg: rem(60) }}
      >
        <Text>{leader.nationality}</Text>
      </Center>
      <Center
        bg={leader.continent === answer.continent ? "green" : "red"}
        bd={"1px solid black"}
        w={{ lg: rem(150) }}
        h={{ base: rem(50), lg: rem(60) }}
      >
        <Text>{leader.continent}</Text>
      </Center>
      <Flex
        direction={"row"}
        //   w={{ base: "100%" }}
      >
        <Center
          bg={color}
          bd={"1px solid black"}
          w={{ base: "80%", lg: rem(100) }}
          h={{ base: rem(50), lg: rem(60) }}
        >
          <Text>{leader.century}</Text>
        </Center>
        <Center
          bg={color}
          bd={"1px solid black"}
          w={{ base: "20%", lg: rem(50) }}
          h={{ base: rem(50), lg: rem(60) }}
        >
          <Text>{text}</Text>
        </Center>
      </Flex>
    </Flex>
  );
}
