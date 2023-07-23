import TextField from "@material-ui/core/TextField";
import React from "react";

const ChangePassword = () => {
  return (
    <div className="large-container">
      <div className="centered-small-form">
        <form>
          <div className="">
            <h2>Réinitialisation de mot de passe</h2>
            <div className="">
              <h3>Nouveau mot de passe</h3>
              <TextField className="" name="password" />
              <label className="alert"></label>
            </div>
            <div className="">
              <h3>Confirmer mot de passe</h3>
              <TextField className="" name="password" />
              <label className="alert"></label>
            </div>
            <button className="btn-add btn-ev" type="submit">
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div> 
  );
};
export default ChangePassword;
