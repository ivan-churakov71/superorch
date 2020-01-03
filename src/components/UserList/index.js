import React from 'react';
import styled from 'styled-components';
import User from './User';
import useUsersData from '../../hooks/useUsersData';

const StyledError = styled.span`
    color: red;
`;

function UserList(props) {

    const { users, loading, errors } = useUsersData();

    return (
        <>
        {loading && (
            <span>Loading ...</span>
        )}
        {errors && (
            Object.keys(errors).map(
                (key, i) => (
                    <StyledError key={i}>
                        {errors[key].message}
                    </StyledError>
                )
            )
        )}
        {users && (
            <ul>
                {users.map(
                    (user, i) => <User key={i} user={user} />
                )}
            </ul>
        )}
        </>
    )
}

export default UserList;