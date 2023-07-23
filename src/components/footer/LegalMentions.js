import React, { useEffect } from "react";

const MentionsLegales = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="mentions-legales">
      <div className="title">
        <h2>MENTIONS LÉGALES</h2>
      </div>
      <div className="description">
        <p>
          Le site Internet https://www.everest-sportclub.fr est édité par la
          SARL SH INVEST au capital social de 9 000 € immatriculée au Registre
          du Commerce et des Sociétés de BESANÇON sous le numéro SIREN 810 664
          862.
        </p>
        <p>
          Siège social : Cellule K 226 C Route de Dole Espace Commercial de la
          Chaufferie Bois 25000 BESANÇON
        </p>
        <p>Numéro de téléphone : 03 81 39 38 92</p>
        <p>Directrice de publication : Madame Sandra MILLER</p>
        <p>SIRET : 81066486200028</p>
        <p>TVA intracommunautaire : FR25810664862</p>
        <p>Contact : besancon@everestsportclub.com</p>
        <h3>Hébergement</h3>
        <p>
          Ce site est hébergé en France par la société OVH, SAS au capital de 10
          069 020 € (RCS Lille – 424 761 419 00045 – Code APE 2620Z – N° TVA :
          FR 22-424-761-419) dont le siège social est établi 2 rue Kellermann
          59100 Roubaix – France.
        </p>
        <p>Création Site BWA : Agence Web Dijon</p>
        <h3>PROTECTION DES DONNEES PERSONNELLES</h3>
        <p>
          Les informations recueillies font l’objet d’un traitement informatique
          destiné à la gestion des Clients. Pour toutes questions relatives à
          vos données personnelles, veuillez consulter notre Politique de
          Confidentialité ou nous contacter par mail à l’adresse suivante :
          besancon@everestsportclub.com
        </p>
        <h3>LOI APPLICABLE</h3>
        <p>
          Le Site est soumis à la loi française. Toute utilisation du Site doit
          être conforme à la loi française et aux traités nationaux et
          internationaux applicables en la matière et sera réputée être
          intervenue sur le territoire français. Tout accès et/ou utilisation du
          Site vaut acceptation expresse et sans réserve des présentes
          Conditions Générales.
        </p>
        <p>
          Les présentes Conditions Générales régissent l’accès et la vente des
          services du Site et ont pour objet de définir les modalités et les
          conditions d’utilisation du Site.
        </p>
      </div>
    </section>
  );
};

export default MentionsLegales;
