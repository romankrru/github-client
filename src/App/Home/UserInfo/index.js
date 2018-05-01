// @flow
import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';

import { DATE_FORMAT_M_D_Y } from '../../../settings';

const UserInfo = (props: {
    data: {
        avatarUrl: string,
        login: string,
        createdAt: string,
        bio: ?string,
        repositories: {totalCount: number}
    }
}) => (
    <Card>
        <Image src={props.data.avatarUrl} />

        <Card.Content>
            <Card.Header>
                {props.data.login}
            </Card.Header>

            <Card.Meta>
                <span className="date">
                    Joined in {moment(props.data.createdAt).format(DATE_FORMAT_M_D_Y)}
                </span>
            </Card.Meta>

            <Card.Description>
                {props.data.bio}
            </Card.Description>
        </Card.Content>

        <Card.Content extra>
            <Icon name="folder" />
            {props.data.repositories.totalCount} Repositories
        </Card.Content>
    </Card>
);

export default UserInfo;
