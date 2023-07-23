import React from "react";
import ModalImage from "react-modal-image";
import everest_planning_file from "../../assets/files/planning_everest_2023.pdf";
import GetAppIcon from "@material-ui/icons/GetApp";

const Planning1 = [
  {
    url: "https://i.ibb.co/Bz6nJmn/planning-sur-les-ecrans.jpg",
    bigUrl: "https://i.ibb.co/Bz6nJmn/planning-sur-les-ecrans.jpg",
  },
];

// const Planning20 = [
//   {
//     url: "https://i.ibb.co/Pm2LFBR/euphoria.jpg",
//     bigUrl: "https://i.ibb.co/Pm2LFBR/euphoria.jpg",
//   },
// ];

// const Planning21 = [
//   {
//     url: "https://i.ibb.co/wrm7Yyg/athletique-a1.jpg",
//     bigUrl: "https://i.ibb.co/wrm7Yyg/athletique-a1.jpg",
//   },
// ];

// const Planning30 = [
//   {
//     url: "https://i.ibb.co/56cFmqD/le-k2-cyclinga1.jpg",
//     bigUrl: "https://i.ibb.co/56cFmqD/le-k2-cyclinga1.jpg",
//   },
// ];

// const Planning31 = [
//   {
//     url: "https://i.ibb.co/PrRrKgb/aqua-a1.jpg",
//     bigUrl: "https://i.ibb.co/PrRrKgb/aqua-a1.jpg",
//   },
// ];

export const PlanningGallery = () => (
  <div className="planning-gallery-container">
    <h1 className="cattitle">EVEREST</h1>
    <div className="gallery">
      <h2 className="dividerText title-planning-collectif-catalog">
        Téléchargez votre planning pour découvrir les séances de cours
        collectifs
      </h2>

      <div className="downlad-planning-container">
        <div className="download-planning-div">
          <a
            href={everest_planning_file}
            className="download-planning-a"
            download="Planning_Everest.pdf"
          >
            <span className="download-planning-span">
              Télécharger votre planning
              <GetAppIcon className="icon-download-planning" />
            </span>
          </a>
        </div>
      </div>
      <br />
      <div className="rowIm">
        <div className="columnIm">
          {Planning1 &&
            Planning1.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}{" "}
        </div>
      </div>

      <div className="rowIm">
        {/* <div className="columnIm">
          {Planning20 &&
            Planning20.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}{" "}
        </div> */}

        {/* <div className="columnIm">
          {Planning21 &&
            Planning21.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}{" "}
        </div> */}
      </div>

      <div className="rowIm">
        {/* <div className="columnIm">
          {Planning30 &&
            Planning30.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}{" "}
        </div> */}
        {/* <div className="columnIm">
          {Planning31 &&
            Planning31.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}
        </div> */}
      </div>
    </div>
  </div>
);