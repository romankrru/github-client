import fp from 'lodash/fp';

export default (params) => {
    const {search, filters} = params;

    const transformedFilters = fp.flow(
        fp.keys,
        fp.filter(key => filters[key]),
        fp.map(key => `${key}:${filters[key]}`),
        fp.join(' '),
    )(filters);

    return `${search} ${transformedFilters}`
};