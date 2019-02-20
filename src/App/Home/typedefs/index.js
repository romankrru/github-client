// @flow

export type TRepo = {
	id: string,
	isFork: boolean,
	name: string,
	createdAt: string,
};

export type TViewer = {
	avatarUrl: string,
	login: string,
	createdAt: string,
	bio: ?string,

	repositories: {
		totalCount: number,
		nodes: Array<TRepo>,
	},
};
