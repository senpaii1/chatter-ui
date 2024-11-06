import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const getMeDocument = graphql(`
  query Me {
    me {
      ...UserFragment
    }
  }
`);

const useGetMe = () => {
  const { data, error } = useQuery(getMeDocument, {
    errorPolicy: "all",
  });
  return { data, error };
};

export { useGetMe };
