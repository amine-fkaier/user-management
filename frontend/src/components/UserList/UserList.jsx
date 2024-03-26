import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserList.css';
import { deleteUser, getAllUsers } from '../../services/UserServices';
import { GENDRE } from '../../utils/Constants';

function UserList() {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);
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
      alert("Erreur lors de la récupération des utilisateurs: " + error.message);
    }
  };

  useEffect(() => {
    if(location){
      fetchUsers();
    }
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
  


  const handleDelete = user => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.firstname} ${user.lastname} ?`);
    if (confirmDelete) {
      deleteUser(user.id).then(() => {
        fetchUsers()
      })
      .catch(error => {
        alert("Erreur lors de la suppression d'un utilisateur : " + error.message);
      });
      window.alert(`L'utilisateur ${user.firstname} ${user.lastname} a été supprimé.`);
    } else {
      window.alert("Suppression annulée.");
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
              <button className="delete-button" onClick={() => handleDelete(user)}>Supprimer</button>
              <button onClick={() => navigateToUpdateUserScreen(user)} className="edit-button">Modifier</button>
            </div>
            <div className="user-details">
              <span>Âge: {user.age}</span>
              <span>Genre: {GENDRE[user.gender]}</span>
              <span>Ville: {user.city}</span>
            </div>
            {index === filteredUsers.length - 1 && <div className="user-list-end-marker" />}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>Précédent</button>
        <span>{page} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Suivant</button>
      </div>
      <button onClick={navigateToAddUserScreen} className="fab">+</button>
    </div>
  );
}


export default UserList;
