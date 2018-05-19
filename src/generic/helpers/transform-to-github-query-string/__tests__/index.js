import transformToGithubQueryString from '../';

describe('transformToGithubQueryString', () => {
    it('should properly transform to query string', () => {
        const qs = transformToGithubQueryString({
            search: 'search term',

            filters: {
                language: 'JavaScript',
                stars: '>100',
            },
        });

        expect(qs).toBe('search term language:JavaScript stars:>100');
    });
});
