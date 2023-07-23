import React, { useState } from "react";
import "react-vertical-timeline-component/style.min.css";
import { Tooltip } from "@material-ui/core";
import EmailFormModal from "./modal/index";
import sendmail from "../../../../styles/send-mail.png";
import { makeStyles } from "@material-ui/core/styles";
import FadeIn from "react-fade-in";

const useStyles = makeStyles((theme) => ({
  customWidth: {
    fontSize: "12px",
  },
}));

const EnvoyerEmail = () => {
   const [emailFormModal, setEmailFormModal] = useState(false);
   const toggleEmailFormModal = () => setEmailFormModal(!emailFormModal);

   const classes = useStyles();

  return (
    <FadeIn>
      <div className="card-email">
        <div className="card-email-elt">
          <h3 className="card-email-elt-title">
            Les étapes pour envoyer un email
          </h3>
        </div>
        <div className="card-email-elt">
          <div className="card-email-number">
            <strong> 1</strong>
          </div>
          <h3 className="card-email-elt-p">Choisir l'objet du mail</h3>
        </div>
        <div className="card-email-elt">
          <div className="card-email-number">
            <strong> 2</strong>{" "}
          </div>
          <h3 className="card-email-elt-p">Choisir le thème à envoyer</h3>
        </div>
        <div className="card-email-elt">
          <div className="card-email-number">
            <strong> 3</strong>
          </div>
          <h3 className="card-email-elt-p">
            Choisir le (ou les) destinataire(s)
          </h3>
        </div>
        <div className="card-email-elt">
          <div className="card-email-number">
            <strong> 4</strong>{" "}
          </div>
          <h3 className="card-email-elt-p">Envoyer un test</h3>
        </div>

        <div className="card-email-elt">
          <div className="card-email-number">
            {" "}
            <strong> 5</strong>{" "}
          </div>
          <h3 className="card-email-elt-p">Envoyer le mail</h3>
          <Tooltip
            classes={{ tooltip: classes.customWidth }}
            title="Commencer !!"
          >
            <img
              className="pointer-img"
              onClick={() => {
                toggleEmailFormModal();
              }}
              src={sendmail}
            />
          </Tooltip>
        </div>
        <EmailFormModal
          emailFormModal={emailFormModal}
          toggleEmailFormModal={toggleEmailFormModal}
        />
      </div>
    </FadeIn>
  );
};

export default EnvoyerEmail;
