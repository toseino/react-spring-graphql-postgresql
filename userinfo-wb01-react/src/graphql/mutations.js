import { gql } from "graphql-request";

export const ADD_USER = gql`
    mutation($name: String!, $address: String!) {
        addUser(name: $name, address: $address) {
            id
            name
            address
        }
    }
`;

export const DELETE_USER = gql`
    mutation($id: ID!) {
        deleteUser(id: $id)
    }
`;