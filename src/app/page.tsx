import NextImage from "next/image";
import styles from "./page.module.css";
import { Button, Center } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Center>
        <Button component={Link} href={"/daily"}>
          Daily
        </Button>
        <Button component={Link} href={"/free-play"}>
          Free Play
        </Button>
      </Center>
    </>
  );
}
