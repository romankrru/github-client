import React from 'react';
import _ from 'lodash'
import { Card, Icon } from 'semantic-ui-react'

import styles from './assets/index.css';

const Result = props => {
    console.log(props);

    return (
        <Card.Group itemsPerRow={3}>
            {
                props.data.map(edge => {
                    return (
                        <Card key={edge.node.id}>
                            <Card.Content header={edge.node.name} />

                            <Card.Content
                                className={styles.CardDescription}
                                description={_.truncate(edge.node.description, {
                                    length: 90,
                                })}
                            />
                            
                            <Card.Content extra>
                                <Icon name='star' /> {edge.node.stargazers.totalCount}
                            </Card.Content>
                        </Card>
                    )
                })
            }
        </Card.Group>
    );
}

export default Result;