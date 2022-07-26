import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react';
import axios from 'axios';
import UsersList from './components/UsersList';
import UsersForm from './components/UsersForm';

function App() {
  // Empty users array to initialize, send it to usersList through props
  const [ usersDefault, setUsersDefault ] = useState([]);
  // State for selected user in order to take it our from the fucntion scope
  const [ userSelected, setUserSelected ] = useState(null);

  // useEffect for API accessing purposes
  useEffect(() => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsersDefault(res.data));
  }, [])

  // GET function
  const getUsers = () => {
    axios.get("https://users-crud1.herokuapp.com/users/")
     .then(res => setUsersDefault(res.data));
  }

  // Select user function
  const selectUser = user => {
    setUserSelected( user );
  }

  // Deselect user after updating
  const deselectUser = () => setUserSelected( null );

  // Delete user function
  const deleteUser = id =>{
    axios.delete( `https://users-crud1.herokuapp.com/users/${ id }/`)
      .then(() => getUsers());
  }

  console.log( usersDefault )

  return (
    <div className="App">
      <UsersForm getUsers={ getUsers } userSelected={ userSelected } deselectUser={ deselectUser } /> 
      <UsersList usersDefault={ usersDefault } selectUser={ selectUser } deleteUser={ deleteUser }/>
    </div>
  )
}

export default App
