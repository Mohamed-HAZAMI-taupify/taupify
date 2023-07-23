// import React, { useState } from "react";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// // import "./styles/style.scss";

// export default function PopUpPermanent(props) {
//   const { buttonLabel, className } = props;

//   const [modal, setModal] = useState(true);
//   const toggle = () => {
//     setModal(true);
//   };

//   return (
//     <Modal
//       isOpen={modal}
//       modalTransition={{ timeout: 800 }}
//       transitionentertimeout={{ timeout: 10000 }}
//       backdropTransition={{ timeout: 1000 }}
//       toggle={toggle}
//       className={className}
//     >
//       {console.log("classname", className)}
//       <ModalHeader className="popup-permanent">
//         <img src="" alt="Logo" width="70px"></img>

//         {/* <div className="reminder-div">
//           En attendant, prenez soin de vous, de vos proches et de vos
//           collaborateurs.
//         </div> */}
//       </ModalHeader>
//       <ModalBody className="home-page-modal-body rendez-vous-modal-body">
//         <p>
//           LES RENDEZ-VOUS À<span> EVEREST SPORT CLUB </span> SONT REPORTÉS À UNE
//           DATE ULTÉRIEURE À L'ISSUE DU CONFINEMENT.
//         </p>
//       </ModalBody>
//       <ModalFooter>
//         <p>
//           En attendant, prenez soin de vous, de vos proches et de vos
//           collaborateurs.
//         </p>
//       </ModalFooter>
//     </Modal>
//   );
// }
