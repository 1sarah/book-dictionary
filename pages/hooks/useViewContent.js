import { gql, GraphQLClient } from "graphql-request";
import { useQuery } from "react-query";


const BASE_URL = "https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app";
function useViewContent() {
  const config = {};
  const endpoint = `${BASE_URL}`;
  const client = new GraphQLClient(`${endpoint}/graphql`);
  const variables = {};

  const commentsQuery = gql`
    query Query {
      book {
        author
        pages {
          content
          pageIndex
          tokens {
            position
            value
          }
        }
        title
      }
    }
  `;

  return useQuery(
    "comments",
    async () => client.request(commentsQuery, variables),
    config
  );
}


export default useViewContent;
