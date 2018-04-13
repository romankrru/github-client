import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const GetRepositoryInfoQuery = gql`
   query GetRepositoryIssues($name: String!, $login: String!) {
    repositoryOwner(login: $login) {
      repository(name: $name) {
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
      }
    }
  }
`;

const App = props => {
  console.log(props)

  return (
    <h1>
      app
    </h1>
  )
}

export default graphql(
  GetRepositoryInfoQuery, {
    options: {
      variables: {
        login: 'facebook',
        name: 'react'
      }
    }
  }
)(App);