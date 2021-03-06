// @flow
import _ from 'lodash';
import { compose, withStateHandlers, lifecycle } from 'recompose';

import type { DocumentNode } from 'graphql';

let onDocumentScroll;

const getScrollPosition = (): number => {
    const documentHeight = _.get(document.body, 'scrollHeight', 0);
    const screenHeight = _.get(document.body, 'clientHeight', 0);
    const scrolledHeight = window.pageYOffset;

    return documentHeight - screenHeight - scrolledHeight;
};

const withInfiniteScroll = (config: Object => {
    query: DocumentNode,
    fetchMore: Function,
    isAllItemsLoaded: boolean,
    variables: Object,
    update: (prevResult: Object, newResult: Object) => Object,
}) => compose(
    withStateHandlers(
        { isFetchMoreLoading: false },
        { setIsFetchMoreLoading: () => value => ({ isFetchMoreLoading: value }) },
    ),

    lifecycle({
        componentDidMount() {
            onDocumentScroll = _.throttle(() => {
                if (!this.props.isFetchMoreLoading && getScrollPosition() < 50) {
                    const resolvedConfig = config(this.props);

                    if (resolvedConfig.isAllItemsLoaded) { return; }

                    this.props.setIsFetchMoreLoading(true);

                    window.scrollBy({
                        behavior: 'smooth',
                        left: 0,
                        top: 100,
                    });

                    resolvedConfig.fetchMore({
                        query: resolvedConfig.query,
                        variables: resolvedConfig.variables,

                        updateQuery: (prevResult, newResult) => (
                            _.isEmpty(newResult.fetchMoreResult)
                                ? prevResult
                                : resolvedConfig.update(prevResult, newResult)
                        ),
                    }).then(() => this.props.setIsFetchMoreLoading(false));
                }
            }, 100);

            document.addEventListener('scroll', onDocumentScroll);
        },

        componentWillUnmount() {
            document.removeEventListener('scroll', onDocumentScroll);
        },
    }),
);

export default withInfiniteScroll;
