import { Container, Flex, Image, rem, Text, Title } from "@mantine/core";

export default function LeaderFrame({
  name,
  title,
  country,
  image,
  link,
  gameOver,
}: {
  name: string;
  title: string;
  image: string;
  link: string;
  country: string;
  gameOver: boolean;
}) {
  return (
    <>
      <Flex
        direction={"column"}
        flex={{ lg: 0.4 }}
        align={"center"}
        pt={{ lg: rem(80) }}
        p={{ base: rem(15) }}
      >
        <Container
          // pos={{ base: "relative" }}
          // w={{ base: "100%", lg: "60%" }}
          w={{ lg: "60%" }}
          // h={{ base: 350 }}
          p={0}
        >
          <Image alt="" src={image} />
          {/* <NextImage
      src={gameState.answer.image}
      alt=""
      // width={250}
      // height={350}
      fill
    /> */}
        </Container>
        <Flex
          direction={"column"}
          w={{ lg: "60%" }}
          align={{ base: "center" }}
          id="endGame"
        >
          <Title order={2} hidden={!gameOver}>
            {`${title} ${name}`}
          </Title>
          <Text hidden={!gameOver}>{`of ${country}`}</Text>
          <Text
            component="a"
            href={link}
            target="_blank"
            hidden={!gameOver}
            c={"white"}
          >
            Wikipedia
          </Text>
          {/* <Anchor hidden={!gameOver}>wiki url</Anchor> */}
        </Flex>
      </Flex>
    </>
  );
}
