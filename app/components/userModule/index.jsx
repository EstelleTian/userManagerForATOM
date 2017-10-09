import React from 'react';
import FilterContainer from '../../container/filterContainer'
import UserListContainer from '../../container/userListContainer'

const UserModel = () => {

    return(
        <div className="us_cantainer"
             style={{
                 padding: '10px 15px',
                 background: '#cccccc'
              }}
        >
            <FilterContainer></FilterContainer>
            <UserListContainer></UserListContainer>
        </div>
    )
}

export default UserModel;
