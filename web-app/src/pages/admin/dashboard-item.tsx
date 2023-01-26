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
  Paper,
  TextInput,
  Title,
  Center,
  Select,
  Radio,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Annonce, annonceApi } from "../../api/annonce.api";
import { getAnnonceTitle } from "../../utils/get-annonce-title";

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
  wrapper: {
    minHeight: 900,
  },
  form: {
    width: "40rem",
    minHeight: 900,
    maxWidth: 600,
    paddingTop: 80,
  },
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export function AdminDashboardItemPage() {
  const [edit, setEdit] = useState(false);
  const [annonce, setAnnonce] = useState<Annonce>({} as Annonce);
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const { classes, theme } = useStyles();
  const [form, setForm] = useState({
    available: false,
    description: "",
    location: "",
    operation: "",
    phoneNumber: "",
    photoUrl: "",
    price: "",
    roomsNumber: "",
    surface: "",
  });
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleOnSubmit = async () => {
    const handlerPromise =
      params.id === "add"
        ? annonceApi.create(form)
        : annonceApi.update(params.id)(form);
    await handlerPromise;
    history.goBack();
  };
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

  useEffect(() => {
    if (params.id === "add") setEdit(true);
    (async () => {
      const response = await annonceApi.fetchSingle(params.id);
      setAnnonce(response.data);
      setForm(response.data);
    })();
  }, [params.id]);

  const handleRemoveAnnonce = async () => {
    if (!annonce) return;
    await annonceApi.delete(params.id);
    history.goBack();
  };
  const handleEditView = () => setEdit(true);

  if (!edit)
    return (
      <Container size="xs" px="xs">
        <Box sx={() => ({ marginTop: "8rem" })} />
        <Card withBorder radius="md" p="md" className={classes.card}>
          <Card.Section>
            <Image
              src={annonce.photoUrl}
              alt={annonce.description}
              height={180}
            />
          </Card.Section>

          <Card.Section className={classes.section} mt="md">
            <Group position="apart">
              <Text size="lg" weight={500}>
                {getAnnonceTitle(annonce)}
              </Text>
              <Badge
                style={{
                  color: "white",
                  backgroundColor: annonce.available ? "green" : "red",
                }}
              >
                {annonce.operation?.toUpperCase()}
              </Badge>
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
            <Button
              style={{ flex: 2, backgroundColor: "yellowgreen" }}
              onClick={handleEditView}
            >
              Edit
            </Button>
            <Button
              radius="md"
              style={{ flex: 2, backgroundColor: "red" }}
              onClick={handleRemoveAnnonce}
            >
              Remove
            </Button>
          </Group>
        </Card>
      </Container>
    );

  return (
    <Center>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome to [DarDarkomApp]!
        </Title>

        <TextInput
          defaultValue={form.description}
          name="description"
          label="Description"
          placeholder="..."
          size="md"
          onChange={handleOnChange}
        />
        <Select
          defaultValue={form.operation}
          name="operation"
          label="Select the operation"
          placeholder="Pick one"
          onChange={(val) => setForm({ ...form, operation: val || "" })}
          data={[
            { value: "buy", label: "Buy" },
            { value: "allocate", label: "Allocate" },
          ]}
        />
        <TextInput
          defaultValue={form.location}
          name="location"
          label="Location"
          placeholder="..."
          size="md"
          onChange={handleOnChange}
        />
        <TextInput
          defaultValue={form.roomsNumber}
          type="number"
          name="roomsNumber"
          label="Rooms Number"
          placeholder="..."
          size="md"
          onChange={handleOnChange}
        />
        <TextInput
          defaultValue={form.phoneNumber}
          name="phoneNumber"
          label="Phone Number"
          placeholder="..."
          size="md"
          onChange={handleOnChange}
        />
        <TextInput
          defaultValue={form.photoUrl}
          name="photoUrl"
          label="Photo URL"
          placeholder="..."
          mt="md"
          size="md"
          onChange={handleOnChange}
        />
        <TextInput
          defaultValue={form.price}
          type="number"
          name="price"
          label="Price"
          placeholder="..."
          mt="md"
          size="md"
          onChange={handleOnChange}
        />
        <TextInput
          defaultValue={form.surface}
          type="number"
          name="surface"
          label="Surface"
          placeholder="..."
          mt="md"
          size="md"
          onChange={handleOnChange}
        />
        <br />
        <Text>Available</Text>
        <Radio
          label="Yes"
          size="md"
          checked={form.available}
          onChange={() => setForm({ ...form, available: true })}
        />
        <br />
        <Radio
          label="No"
          size="md"
          checked={!form.available}
          onChange={() => setForm({ ...form, available: false })}
        />

        <Button fullWidth mt="xl" size="md" onClick={handleOnSubmit}>
          Submit
        </Button>
      </Paper>
    </Center>
  );
}
