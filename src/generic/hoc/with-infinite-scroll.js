import _ from 'lodash';
import { compose, withStateHandlers, lifecycle } from 'recompact';

let onDocumentScroll;

const withInfiniteScroll = config => compose(
    withStateHandlers(
        { isFetchMoreLoading: false },
        { setIsFetchMoreLoading: () => value => ({ isFetchMoreLoading: value }) },
    ),

    lifecycle({
        componentDidMount() {
            onDocumentScroll = _.throttle(() => {
                const documentHeight = document.body.scrollHeight;
                const screenHeight = document.body.clientHeight;
                const scrolledHeight = window.pageYOffset;

                if (documentHeight - screenHeight - scrolledHeight < 50) {
                    const resolvedConfig = config(this.props);

                    if (this.props.isFetchMoreLoading) { return; }

                    this.props.setIsFetchMoreLoading(true);

                    window.scrollBy({
                        behavior: 'smooth',
                        left: 0,
                        top: 100,
                    });

                    resolvedConfig.fetchMore({
                        query: resolvedConfig.query,
                        variables: resolvedConfig.variables,

                        updateQuery: (prevResult, newResult) => {
                            if (_.isEmpty(newResult.fetchMoreResult)) { return prevResult; }

                            return resolvedConfig.update(prevResult, newResult);
                        },
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
