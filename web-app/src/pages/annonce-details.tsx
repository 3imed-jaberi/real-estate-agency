import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  Container,
  createStyles,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Annonce, annonceApi } from "../api/annonce.api";
import { RoutesRegistery } from "../routes/routes.registery";
import { getAnnonceTitle } from "../utils/get-annonce-title";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export function AnnonceDetailsPage() {
  const [annonce, setAnnonce] = useState<Annonce>({} as Annonce);
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const { classes, theme } = useStyles();
  const annonceFeaturesKeys = ["location", "price", "roomsNumber", "surface"];
  const getFeatures = (annonce: any) => {
    return Object.keys(annonce)
      .filter((key) => annonceFeaturesKeys.includes(key))
      .map((badgeKey) => (
        <Badge
          color={theme.colorScheme === "dark" ? "dark" : "gray"}
          key={badgeKey}
          leftSection={badgeKey}
        >
          {annonce[badgeKey as keyof typeof annonce]}{" "}
          {badgeKey === "surface" ? "m²" : badgeKey === "price" ? "DT" : ""}
        </Badge>
      ));
  };
  const handleOperation = async () => {
    if (!annonce) return;
    const requestBody: Annonce = { ...annonce, available: !annonce.available };
    await annonceApi.update(String(annonce.id))(requestBody);
    history.push(RoutesRegistery.home);
  };

  useEffect(() => {
    (async () => {
      const response = await annonceApi.fetchSingle(params.id);
      setAnnonce(response.data);
    })();
  }, [params.id]);

  return (
    <Container px="xs" size="xs">
      <Box sx={() => ({ marginTop: "8rem" })} />
      <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image
            src={annonce.photoUrl}
            alt={annonce.description}
            height={180}
          />
        </Card.Section>

        <Card.Section mt="md" className={classes.section}>
          <Group position="apart">
            <Text size="lg" weight={500}>
              {getAnnonceTitle(annonce)}
            </Text>
          </Group>
          <Text size="sm" mt="xs">
            {annonce.description}
          </Text>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text mt="md" className={classes.label} color="dimmed">
            Perfect for you, if you search
          </Text>
          <Group spacing={7} mt={5}>
            {getFeatures(annonce)}
          </Group>
        </Card.Section>

        <Group mt="xs">
          <div style={{ flex: 1 }} />

          <Button radius="md" style={{ flex: 3 }} onClick={handleOperation}>
            {annonce.operation?.toUpperCase()}
          </Button>
          <div style={{ flex: 1 }} />
        </Group>
      </Card>
    </Container>
  );
}
