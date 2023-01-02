import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/userContext";

function Profil() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(CurrentUserContext);

  const handleDisconnection = () => {
    // gestion de la deconnexion
    localStorage.clear();
    setUser({});
    navigate("/");
  };
  return (
    <div>
      <button onClick={handleDisconnection}>Se déconnecter</button>
    </div>
  );
}

export default Profil;
