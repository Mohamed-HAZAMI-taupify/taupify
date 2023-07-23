import * as React from "react";
import ModalImage from "react-modal-image";
import {
  Bike1,
  Bike2,
  Bike3,
  Piscine1,
  Piscine2,
  Piscine3,
  Planning1,
  Planning20,
  Planning21,
  Planning30,
  Planning31,
  Vestiares1,
  Vestiares2,
  Yoga21,
  Yoga3,
  Yoga40,
  Yoga41,
  Yoga5,
  Yoga60,
  Yoga61,
  Yoga7,
} from "../../data/catalogData";

export const Gallery = () => (
  <div>
    <h1 className="catalogue-title">EVEREST</h1>
    <div className="gallery">
      <br />
      {/* ////////////////// Planning de cours collectifs //////////// */}
      <h2 className="dividerText" style={{ paddingTop: "40px" }}>
        PLANNING DE COURS COLLECTIFS
      </h2>
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
        <div className="columnIm">
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
        </div>
        <div className="columnIm">
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
        </div>
      </div>

      <div className="rowIm">
        <div className="columnIm">
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
        </div>
        <div className="columnIm">
          {Planning31 &&
            Planning31.map((photo) => (
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
      {/* ////////////////// yoga //////////// */}
      <h2 className="dividerText" style={{ paddingTop: "40px" }}>
        {" "}
        SALLE DE COURS COLLECTIFS EUPHORIA{" "}
      </h2>
      <br />
      <br />

      <div className="rowIm">
        <div className="columnIm">
          {Yoga3 &&
            Yoga3.map((photo) => (
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
        <div className="columnIm">
          {Yoga40 &&
            Yoga40.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}{" "}
        </div>

        <div className="columnIm">
          {Yoga41 &&
            Yoga41.map((photo) => (
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
        <div className="columnIm">
          {Yoga5 &&
            Yoga5.map((photo) => (
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
        <div className="columnIm">
          {Yoga60 &&
            Yoga60.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}{" "}
        </div>

        <div className="columnIm">
          {Yoga61 &&
            Yoga61.map((photo) => (
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
        <div className="columnIm">
          {Yoga7 &&
            Yoga7.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}{" "}
        </div>
        <div className="columnIm">
          {Yoga21 &&
            Yoga21.map((photo) => (
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

      {/* /////Bike ///////////////////// */}
      <br />
      <br />
      <h2 className="dividerText" style={{ paddingTop: "40px" }}>
        {" "}
        BIKE{" "}
      </h2>
      <br />
      <br />

      <div className="rowIm">
        <div className="columnIm">
          {Bike1 &&
            Bike1.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}
        </div>

        <div className="columnIm">
          {Bike2 &&
            Bike2.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}
        </div>

        <div className="columnIm">
          {Bike3 &&
            Bike3.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}
        </div>
      </div>
      {/* /////Piscine ///////////////////// */}
      <br />
      <br />
      <h2 className="dividerText"> PISCINE </h2>
      <br />
      <br />

      <div className="rowIm">
        <div className="columnIm">
          {Piscine1 &&
            Piscine1.map((photo) => (
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
        <div className="columnIm">
          {Piscine2 &&
            Piscine2.map((photo) => (
              <ModalImage
                style={{ width: "100%" }}
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}
        </div>

        <div className="columnIm">
          {Piscine3 &&
            Piscine3.map((photo) => (
              <ModalImage
                style={{ width: "100%" }}
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}
        </div>
      </div>

      {/* /////// vestiares ///////////////// */}

      <br />
      <br />
      <h2 className="dividerText"> VESTIAIRES </h2>
      <br />
      <br />

      <div className="rowIm">
        <div className="columnIm">
          {Vestiares1 &&
            Vestiares1.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}
        </div>

        <div className="columnIm">
          {Vestiares2 &&
            Vestiares2.map((photo) => (
              <ModalImage
                small={photo.url}
                large={photo.bigUrl}
                hideDownload={true}
                hideZoom={false}
                className="modal-image"
              />
            ))}
        </div>
      </div>
    </div>
  </div>
);
