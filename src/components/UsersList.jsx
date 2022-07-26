import React from 'react';

const UsersList = ({ usersDefault, selectUser, deleteUser }) => {
    return (
        <div className="users-father">
            <h1>Users List</h1>
            <ul>
                {
                    usersDefault.map( user => (
                        <li key={ user.id }>
                            <div className="card">
                                <div className="user-info">
                                    <h3>{ user.first_name } { user.last_name }</h3>
                                    <div><h5> { user.email } </h5></div>
                                    <div className="birthday-box">
                                        <i className='bx bxs-cake' ></i>
                                        <h4> { user.birthday } </h4>
                                    </div>
                                </div>
                                <div className="list-buttons">
                                    <button onClick={() => selectUser( user )}><i className='bx bxs-pencil bx-sm'></i></button>
                                    <button onClick={() => deleteUser( user.id )}><i className='bx bxs-trash bx-sm'></i></button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default UsersList;