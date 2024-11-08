import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import {
  UNAUTHORIZED_ERROR_SNACK_MESSAGE,
  UNKNOWN_ERROR_SNACK_MESSAGE,
} from "../../constants/error";
import { usePath } from "../../hooks/usePath";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      if (error?.networkError) {
        snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      }
    }
    const gqlError = error?.graphQLErrors[0]?.extensions as any;
    if (
      gqlError &&
      gqlError.originalError &&
      gqlError.originalError.statusCode
    ) {
      snackVar(UNAUTHORIZED_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return <>{excludedRoutes.includes(path) ? children : user && children}</>;
};

export default Guard;
