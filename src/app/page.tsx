import NextImage from "next/image";
import styles from "./page.module.css";
import {
  Flex,
  Image,
  Title,
  Text,
  Container,
  rem,
  Autocomplete,
  UnstyledButton,
  ActionIcon,
  Anchor,
} from "@mantine/core";

export default function Home() {
  return (
    <>
      <Flex direction={"row"}>
        <Flex direction={"column"} flex={0.4} align={"center"} pt={rem(80)}>
          <Container w={"60%"} p={0}>
            <Image
              alt=""
              src={
                "https://upload.wikimedia.org/wikipedia/commons/2/2e/Anonymous_Stephen_B%C3%A1thory_%28detail%29_01.jpg"
              }
            />
          </Container>
          <Flex direction={"column"} w={"60%"}>
            <Title order={2}>Name</Title>
            <Text c={"black"}>Title</Text>
            <Anchor>wiki url</Anchor>
          </Flex>
        </Flex>
        <Flex direction={"column"} flex={0.6} pt={rem(80)} align={"center"}>
          {/* Set up a filtering button to help filter out leaders */}

          <Autocomplete
            w={"70%"}
            data={["Test", "Test2"]}
            rightSection={
              <>
                <ActionIcon></ActionIcon>
                <ActionIcon></ActionIcon>
              </>
            }
          />
          <Flex direction={"row"} gap={rem(30)}>
            <Container bg={"red"} bd={"1px solid black"}>
              <Text>Abdel Fattah el-Sisi</Text>
            </Container>
            <Container bg={"red"} bd={"1px solid black"}>
              <Text>President</Text>
            </Container>
            <Container bg={"red"} bd={"1px solid black"}>
              <Text>Egypt</Text>
            </Container>
            <Container bg={"green"} bd={"1px solid black"}>
              <Text>Africa</Text>
            </Container>
            <Container bg={"red"} bd={"1px solid black"}>
              <Text>21th</Text>
            </Container>
            <Container bg={"yellow"} bd={"1px solid black"}>
              <Text>↓</Text>
            </Container>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
