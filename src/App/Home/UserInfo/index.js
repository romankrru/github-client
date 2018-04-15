import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';

import { DATE_FORMAT_M_D_Y } from '../../../settings';

const UserInfo = props => (
    <Card>
        <Image src={props.data.avatarUrl} />

        <Card.Content>
            <Card.Header>
                {props.data.login}
            </Card.Header>

            <Card.Meta>
                <span className='date'>
                    Joined in {moment(props.data.createdAt).format(DATE_FORMAT_M_D_Y)}
                </span>
            </Card.Meta>

            <Card.Description>
                {props.data.bio}
            </Card.Description>
        </Card.Content>

        <Card.Content extra>
            <a>
                <Icon name='folder' />
                {props.data.repositories.totalCount} Repositories
            </a>
        </Card.Content>
    </Card>
);

export default UserInfo;