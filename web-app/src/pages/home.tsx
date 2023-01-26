import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Fuse from "fuse.js";
import { IconSearch } from "@tabler/icons";

import { Annonce, annonceApi } from "../api/annonce.api";
import { RoutesRegistery } from "../routes/routes.registery";
import { getAnnonceTitle } from "../utils/get-annonce-title";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export function HomePage() {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const history = useHistory();
  const { classes } = useStyles();
  const handleOnClickToSeeMoreDetails = (id: number) => () =>
    history.push(RoutesRegistery.annonce(String(id)));
  const [searchResult, setSearchResult] = useState<Annonce[]>([]);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchEngine = new Fuse(annonces, {
      keys: ["location", "surface", "roomNumbers"],
    });
    const result = searchEngine
      .search(event.target.value)
      .map(({ item }) => item);
    setSearchResult(result);
  };
  useEffect(() => {
    (async () => {
      const response = await annonceApi.fetchAll();
      const cleanAnnonces = response.data.filter((item: Annonce) =>
        Boolean(item.available)
      );
      setAnnonces(cleanAnnonces);
    })();
  }, []);

  return (
    <Container py="xl">
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        onChange={handleOnChange}
      />
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {(searchResult.length !== 0 ? searchResult : annonces)?.map(
          (annonce) => (
            <Card
              key={annonce.id}
              p="md"
              radius="md"
              className={classes.card}
              onClick={handleOnClickToSeeMoreDetails(annonce.id)}
            >
              <AspectRatio ratio={1920 / 1080}>
                <Image src={annonce.photoUrl} />
              </AspectRatio>
              <Text
                color="dimmed"
                size="xs"
                transform="uppercase"
                weight={700}
                mt="md"
              >
                {annonce.available}
              </Text>
              <Text className={classes.title} mt={5}>
                {getAnnonceTitle(annonce)} {annonce.price}dt
              </Text>
              <Text mt={5}>{annonce.description}</Text>
            </Card>
          )
        )}
      </SimpleGrid>
    </Container>
  );
}
