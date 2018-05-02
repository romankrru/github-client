// @flow

export type TRepo = {
    id: string,
    url: string,
    name: string,
    description: string,
    forks: { totalCount: number },
    stargazers: { totalCount: number },
    updatedAt: string,
    languages: { edges: Array<{ node: { name: string } }> }
};

export type TFilters = {
    language: string,
    stars: string,
    user: string,
    forks: string,
    size: string,
};
