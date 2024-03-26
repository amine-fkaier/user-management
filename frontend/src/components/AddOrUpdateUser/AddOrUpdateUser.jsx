import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './AddOrUpdateUser.css';
import { createUser, updateUser } from '../../services/UserServices';

function AddOrUpdateUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFormState = { firstname: '', lastname: '', age: 0, gender: '', city: '' };
  const [user, setUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if(location && location.state && location.state.user){
      setEditing(!location.state.addOrUpdateUser)
      setUser(location.state.user)
    }
  }, [])
  


  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: name!="age" ? value : parseInt(value) })
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!user.firstname.trim()) {
      alert('Veuillez saisir le prénom.');
      return;
    }
    if (!user.lastname.trim()) {
      alert('Veuillez saisir le nom.');
      return;
    }
    if (!user.age || user.age === 0) {
      alert("Veuillez saisir l'age.");
      return;
    }

    if (!user.gender.trim()) {
      alert('Veuillez saisir le genre.');
      return;
    }
    if (!user.city.trim()) {
      alert('Veuillez saisir la ville.');
      return;
    }
  
    if (!editing) {
      createUser(user).catch(error => {
        console.error("Erreur lors de la création d'un nouveau utilisateur:", error);
      });
    } else {
      updateUser(user.id, user).catch(error => {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      });
    }


    setUser({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      city: ''
    });

    setUser(initialFormState);
    setEditing(false);
    navigate("/");
  };


  return (
    <div className="user-form-container">
      <h2>{editing ? 'Modifier l\'utilisateur' : 'Ajouter un nouvel utilisateur'}</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="firstname" className="form-label">Prénom:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={user.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname" className="form-label">Nom:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={user.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age" className="form-label">Âge:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={user.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
            <label htmlFor="gender" className="form-label">Genre:</label>
            <select
              id="gender"
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Choisissez...</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="city" className="form-label">Ville:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={user.city}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit-button">{editing ? 'Modifier' : 'Ajouter'}</button>
      </form>
      <Link to={`/`} className="home-button">Accueil</Link>
    </div>
  );
}

export default AddOrUpdateUser;
