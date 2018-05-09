import _ from 'lodash';
import { compose, withStateHandlers, lifecycle } from 'recompact';

const withInfiniteScroll = params => compose(
    withStateHandlers(
        { isFetchMoreLoading: false },
        { setIsFetchMoreLoading: () => value => ({ isFetchMoreLoading: value }) },
    ),

    lifecycle({
        componentDidMount() {
            const onDocumentScroll = _.throttle(() => {
                const documentHeight = document.body.scrollHeight;
                const screenHeight = document.body.clientHeight;
                const scrolledHeight = window.pageYOffset;

                if (documentHeight - screenHeight - scrolledHeight < 50) {
                    if (this.props.isFetchMoreLoading) { return; }

                    this.props.setIsFetchMoreLoading(true);

                    window.scrollBy({
                        behavior: 'smooth',
                        left: 0,
                        top: 100,
                    });

                    this.props.data.fetchMore({
                        query: params.query,
                        variables: params.variables(this.props),

                        updateQuery: (prevResult, newResult) => {
                            if (_.isEmpty(newResult.fetchMoreResult)) { return prevResult; }

                            return params.update(prevResult, newResult);
                        },
                    }).then(() => this.props.setIsFetchMoreLoading(false));
                }
            }, 100);

            document.addEventListener('scroll', onDocumentScroll);
        },
    }),
);

export default withInfiniteScroll;
