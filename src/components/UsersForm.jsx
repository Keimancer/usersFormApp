import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {
    // States for every input on Form
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthday, setBirthday ] = useState("");
    const [ password, setPassword ] = useState("");
    // State for Password visible
    const [ isVisible, setIsVisible ] = useState(false);

    // useEffect to detect change in the selected user and set states
    useEffect(() => {
        if( userSelected !== null ){
            setFirstName( userSelected.first_name );
            setLastName( userSelected.last_name );
            setEmail( userSelected.email );
            setBirthday( userSelected.birthday );
            setPassword( userSelected.password );
        }
    }, [ userSelected ])

    // Submit function
    const submit = e => {
        e.preventDefault();

        // User template to send
        const user = {
            first_name: firstName,
            last_name: lastName,
            email,
            birthday,
            password
        }

        // Condition to know if we're updating or creating
        if( userSelected !== null ){
            axios.put( `https://users-crud1.herokuapp.com/users/${ userSelected.id }/`, user)
                .then( () => {
                    getUsers();
                    reset();
                    deselectUser();
                } );
        }else{
            // POST
            axios.post( "https://users-crud1.herokuapp.com/users/", user )
                .then(() => getUsers())
                .catch( error => console.log( error.response ) );
            reset();
        }
    }

    // Reset spaces function after update or create
    const reset = () => {
        setFirstName( "" );
        setLastName( "" );
        setEmail( "" );
        setBirthday( "" );
        setPassword( "" );
    }

    const clear = () => {
        reset();
        deselectUser();
    }

    return (
        <div className="form-father">
            <h1>New User</h1>
            <form onSubmit={ submit }>
                <div className="form-objects">
                    <div className="names">
                        <div>
                            <label htmlFor="firstName"><i className='bx bxs-user bx-md'></i></label>
                            <input type="text" id="firstName" onChange={ e => setFirstName( e.target.value ) } value={ firstName } placeholder="First Name" />
                        </div>
                        <div>
                        <label htmlFor="lastName"></label>
                            <input type="text" id="lastName" onChange={ e => setLastName( e.target.value ) } value={ lastName } placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="email">
                        <label htmlFor="email"><i className='bx bxs-envelope bx-md'></i></label>
                        <input type="email" id="email" onChange={ e => setEmail( e.target.value ) } value={ email } placeholder="Email" />
                    </div>
                    <div className="birthday">
                        <label htmlFor="birthday"><i className='bx bxs-cake bx-md' ></i></label>
                        <input type="date" id="birthday" onChange={ e => setBirthday( e.target.value ) } value={ birthday } />
                    </div>
                    <div className="password">
                        <label htmlFor="password"><i className='bx bxs-lock-alt bx-md' ></i></label>
                        <div className="password-input">
                            <input type={ isVisible ? "text" : "password"} id="password" onChange={ e => setPassword( e.target.value ) } value={ password } placeholder="Password"/>
                            <button type="button" onClick={() => setIsVisible( !isVisible ) }><i className='bx bx-low-vision bx-sm'></i></button>
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="submit" className="submit">{ userSelected ? "Update" : "Create"}</button>
                        <button onClick={ clear } type="button" className="clear">Clear</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UsersForm;