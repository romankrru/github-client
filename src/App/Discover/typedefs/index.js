export type TRepo = {
	name: string,
	description: string,
	forks: { totalCount: number },
	stargazers: { totalCount: number },
	updatedAt: string,
	languages: { edges: Array<{ node: { name: string } }> }
};
