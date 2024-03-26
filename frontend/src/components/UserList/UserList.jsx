import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import { deleteUser, getAllUsers } from '../../services/UserServices';

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers(page);
      setUsers(response.data.users);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

 
  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
  };


  const handleInputChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    const { firstname, lastname, age, gender, city } = user || {};
    const filter = filterCriteria.toLowerCase();
    return (
      (firstname && firstname.toLowerCase().includes(filter)) ||
      (lastname && lastname.toLowerCase().includes(filter)) ||
      (age && age.toString().includes(filter)) ||
      (gender && gender.toLowerCase().includes(filter)) ||
      (city && city.toLowerCase().includes(filter))
    );
  });
  


  const handleDelete = id => {
    const confirmDelete = window.confirm(`Are you sure you want to delete user with ID ${id}?`);
    if (confirmDelete) {
      deleteUser(id).then(response => {
        fetchUsers()
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
      window.alert(`User with ID ${id} has been deleted.`);
    } else {
      window.alert("Deletion canceled.");
    }
  };

  const navigateToAddUserScreen = () => {
    navigate("/addUser", { state: { addOrUpdateUser: true } });
  }

  const navigateToUpdateUserScreen = (user) => {
    navigate(`/updateUser/${user.id}`, { state: { addOrUpdateUser: false, user: user } });
  }

  return (
    <div className="user-list-container">
      <h2>Liste des utilisateurs</h2>
      <input
        type="text"
        value={filterCriteria}
        onChange={handleInputChange}
        placeholder="Filtrer les utilisateurs..."
      />
      <ul className="user-list">
        {filteredUsers.map((user, index) => (
          <li key={user.id} className="user-item">
            <div>
              <span className="user-name">{user.firstname} {user.lastname}</span>
              <button className="delete-button" onClick={() => handleDelete(user.id)}>Supprimer</button>
              <button onClick={() => navigateToUpdateUserScreen(user)} className="edit-button">Modifier</button>
            </div>
            <div className="user-details">
              <span>Age: {user.age}</span>
              <span>Gender: {user.gender}</span>
              <span>City: {user.city}</span>
            </div>
            {index === filteredUsers.length - 1 && <div className="user-list-end-marker" />}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <span>{page} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
      <button onClick={navigateToAddUserScreen} className="fab">+</button>
    </div>
  );
}


export default UserList;
