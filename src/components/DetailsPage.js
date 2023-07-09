import React from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = ({ data }) => {
  const { id } = useParams();

  if (!data || data.length === 0) {
    return <div>Korisnik nije pronađen.</div>;
  }

  const user = data.find((item) => item.id.toString() === id);

  if (!user) {
    return <div>Korisnik nije pronađen.</div>;
  }

  return (
    <div>
      <h2>Detalji korisnika ID: {id}</h2>
      <p>Ime: {user.first_name}</p>
      <p>Prezime: {user.last_name}</p>
      <p>Email: {user.email}</p>
      <p>Grad: {user.city}</p>
      <p>Država: {user.country}</p>
      <p>Telefon: {user.phone}</p>
      <p>Website: {user.website}</p>
    </div>
  );
};

export default DetailsPage;
