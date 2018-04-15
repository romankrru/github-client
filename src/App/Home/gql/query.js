import gql from 'graphql-tag';

export default gql`
query {
    viewer {
        login
        avatarUrl
        bio
        createdAt
        repositories(first: 30) {
            totalCount
            nodes {
                id
                name
                isFork
                createdAt
            }
        }
    }
}
`;