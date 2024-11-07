import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useNavigate } from "react-router-dom";
import {
  UNKNOWN_ERROR_SNACK_MESSAGE,
  UNAUTHORIZED_ERROR_SNACK_MESSAGE,
} from "../../constants/error";
import { snackVar } from "../../constants/snack";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  extraFields?: React.ReactNode[];
  error?: string;
}

const Auth = ({
  submitLabel,
  onSubmit,
  children,
  error,
  extraFields,
}: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, error: gqlError } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (gqlError) {
      if (gqlError?.networkError) {
        snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      }
    }
    const gqlErrors = gqlError?.graphQLErrors[0]?.extensions as any;
    if (
      gqlErrors &&
      gqlErrors.originalError &&
      gqlErrors.originalError.statusCode
    ) {
      snackVar(UNAUTHORIZED_ERROR_SNACK_MESSAGE);
    }
    if (data) {
      navigate("/");
    }
  }, [data, navigate, gqlError]);

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: "360px",
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={!!error}
        helperText={error}
      />
      {extraFields}
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={() => onSubmit({ email, password })}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
