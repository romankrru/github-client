import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import Login from './Login'


import App from './App';
const base64 = require('base-64')

const config = {
  GITHUB_CLIENT_ID: '184d4bed26c230918c43',
  GITHUB_CLIENT_SECRET: '9d0d33a27761b0196c6fe502b760e3f43dc826a9'
}

const AUTH_URL_PATH = 'https://api.github.com/authorizations';

function login(name, pwd) {
  console.log('login')

  const bytes = name.trim() + ':' + pwd.trim()
  const encoded = base64.encode(bytes)

  return fetch(AUTH_URL_PATH, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + encoded,
      'User-Agent': 'GitHub Issue Browser',
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/vnd.github.inertia-preview+json'
    },
    body: JSON.stringify({
      client_id: config.GITHUB_CLIENT_ID,
      client_secret: config.GITHUB_CLIENT_SECRET,
      scopes: ['user', 'repo'],
      note: 'not abuse'
    })
  }).then(response => {

    console.log(response)

    response.json().then(json => {
        console.log(json)

        if (response.status < 400) {
          return json.token
        } else {
          throw new Error(json.message)
        }
      })
    }
  )
}

class GithubLogin extends React.Component {
  onClick = () => {
    console.log('click')
    login('', '')
  }

  render() {
    return (
      <button onClick={() => this.onClick()}>
        clickme
      </button>
    )
  }
}

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
});

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <GithubLogin />
//     {/* <App /> */}
//   </ApolloProvider>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Login />,
  document.getElementById('root')
);
