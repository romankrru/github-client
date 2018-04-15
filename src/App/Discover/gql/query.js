import gql from 'graphql-tag';

export default gql`
query getRepositories($queryString: String!) {
  search (query: $queryString, type: REPOSITORY, first: 30) {
      repositoryCount
      edges {
          node {
            ... on Repository {
              id
              name
              description
              languages(first: 1) {
                edges {
                  node {
                    name
                  }
                }
              }
              stargazers {
                totalCount
              }
              forks {
                totalCount
              }
              updatedAt
            }
          }
      }
  }
}`;