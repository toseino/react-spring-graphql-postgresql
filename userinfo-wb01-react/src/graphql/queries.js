import { gql } from "graphql-request";

export const GET_USERS = gql`
    query {
        users {
            id
            name
            address
        }
    }
`;