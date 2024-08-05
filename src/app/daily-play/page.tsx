import { Flex, Image, Stack, Text, Title } from "@mantine/core";
import styles from "./page.module.css";

export default function DailyPlay() {
  return (
    <>
      <Flex>
        <Flex>
          <Image alt="" />
          <Flex>
            <Title order={2}>Name</Title>
            <Text>Title</Text>
            <Text component="a">wiki url</Text>
          </Flex>
        </Flex>
        <Flex></Flex>
      </Flex>
    </>
  );
}
