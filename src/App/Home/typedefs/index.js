// @flow

export type TViewer = {
    avatarUrl: string,
    login: string,
    createdAt: string,
    bio: ?string,
    repositories: {
        totalCount: number,
        nodes: [],
    },
};
