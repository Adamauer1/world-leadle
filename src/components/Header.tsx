import { Flex, Title } from "@mantine/core";
import styles from "./page.module.css";

export default function Header() {
  return (
    <>
      <Flex direction={"row"} justify={"center"}>
        <Title order={1} c={"black"}>
          WORLD LEADLE
        </Title>
      </Flex>
    </>
  );
}
