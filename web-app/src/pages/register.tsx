import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { authApi } from "../api/auth.api";
import { RoutesRegistery } from "../routes/routes.registery";
import { useNavigationOnAuthEffect } from "./hooks/use-navigation-on-auth-effect";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },
  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
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

export function RegisterPage() {
  const { classes } = useStyles();
  const history = useHistory();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    cin: "",
    email: "",
    password: "",
  });
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleOnSubmit = async () => {
    await authApi.register(form);
    return history.push(RoutesRegistery.home);
  };
  useNavigationOnAuthEffect();

  return (
    <div className={classes.wrapper}>
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
          name="firstName"
          label="First Name"
          placeholder="john"
          size="md"
          onChange={handleOnChange}
        />
        <TextInput
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          size="md"
          onChange={handleOnChange}
        />
        <TextInput
          name="email"
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          onChange={handleOnChange}
        />
        <TextInput
          name="cin"
          label="CIN"
          placeholder="07124321"
          size="md"
          onChange={handleOnChange}
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          onChange={handleOnChange}
        />
        <Button fullWidth mt="xl" size="md" onClick={handleOnSubmit}>
          Register
        </Button>
        <Text align="center" mt="md">
          Do you have an account?{" "}
          <Anchor component={Link} to="/login">
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
