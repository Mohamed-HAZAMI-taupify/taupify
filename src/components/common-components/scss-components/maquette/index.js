// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import SectionActivities from "../../carroussel-home";
// import { activtiesInfo } from "../../../../data/besanconData";
// import { toggle } from "../../../../redux/actions/AdminActions";
// import { connect } from "react-redux";
// import ConnexionModal from "../../pop-up/pop-up-container/connexion-modal";
// import HomeModal from "../../pop-up/pop-up-container/home-modal";
// import InscriptionPopUp from "../../pop-up/pop-up-container/pop-up-inscription";
// import "react-pro-sidebar/dist/css/styles.css";
// import AddAdminComponentButton from "../../add-admin-component-button";
// import ModalInput from "../../modals/inputs";
// import TooltipEv from "../../Tooltip/tooltipWithImage";
// import TooltipSimple from "../../Tooltip/tooltipSimple";
// import TextField from "@material-ui/core/TextField";

// import {
//   deleteArticleJournal,
//   editArticleJournal,
//   createArticleJournal,
//   getArticleJournalById,
// } from "../../../../redux/actions/ArticleJournalActions";

// import React, { useEffect, useState } from "react";

// const Maquette = (props) => {
//   let maquette_input_modal = props.adminReducer.modal.maquetteInputModal;
//   const { articleJournalList } = props.journalArticleReducer;
//   const { articleJournalById } = props.journalArticleReducer;
//   const [formData, setFormData] = useState({
//     cover: "coverssss",
//     title: "titlesssss",
//     type: "typesssss",
//     date: "datesss",
//     state: "archivessssss",
//     content: [
//       { indexContent: 3, type: "imagess", field: "tessst" },
//       { indexContent: 7, type: "image2ss", field: "test2ss" },
//       { indexContent: 9, type: "image3ss", field: "test3ss" },
//     ],
//   });

//   const { ArticleJournal, content } = formData;

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     props.createArticleJournal(formData);
//     setFormData({
//       ArticleJournal: {},
//       content: [],
//     });
//   };

//   return (
//     <div className="maquette">
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />

//       <br />
//       <br />
//       <br />
//       <br />
//       <br />

//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />

//       <div
//         style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
//       >
//         {/* ////////////////////////////////// */}
//         {/* <h1>BUTTONS {articleJournalList.map((e)=> e) }</h1> */}

//         <table>
//           <tr>
//             <td>titre</td>
//             <td>type</td>
//             <td>date</td>
//             <td>cover</td>
//             <td>indexContent</td>
//             <td>type</td>
//             <td>field</td>
//           </tr>

//           {articleJournalList &&
//             articleJournalList.map((t, index) => (
//               <tr key={index}>
//                 <td>{t.title}</td>
//                 <td>{t.type}</td>

//                 <td>{t.date}</td>
//                 <td>{t.cover}</td>

//                 <td>{t.content.map((k) => k.indexContent)}</td>
//                 <td>{t.content.map((k) => k.type)}</td>
//                 <td>{t.content.map((k) => k.field)}</td>
//                 <td>
//                   <button
//                     onClick={() => {
//                       props.getArticleJournalById(t._id);
//                     }}
//                   >
//                     edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </table>

//         <br />
//         <button className=" btn-ev btn-s">btn-s</button>
//         <br />

//         <button className=" btn-ev btn-m">btn-m</button>
//         <br />

//         <button className=" btn-ev btn-l">btn-l</button>
//         <br />

//         <button className=" btn-ev btn-m uppercase">uppercase</button>

//         <br />
//         <button className=" btn-ev btn-m hvr-warning">hvr-warning</button>

//         <br />

//         <button className=" btn-ev btn-m hvr-info">hvr-info</button>

//         <br />
//         <button className=" btn-ev btn-m hvr-transparent">
//           hvr-transparent
//         </button>

//         <br />
//         <button className=" btn-ev btn-m btn-transparent">
//           btn-transparent
//         </button>

//         <br />
//         <button className="btn-ev btn-m hvr-line">btn-hvr-line</button>
//         <br />

//         <button className="btn-ev btn-m btn-gradient">btn-gradient</button>
//         <br />
//         <button className="btn-ev btn-m btn-hvr-content btn-black">
//           <span className="hvr-content">btn-hvr-content</span>
//         </button>

//         {/* ////////////////////////////////// */}
//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <div
//         style={{
//           marginLeft: "100px",
//           display: "flex",
//           justifyContent: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         <div className="tooltip-wrapper tooltip-wrapper-planning">
//           <div className="con-tooltip right">
//             <TooltipEv
//               image={"https://i.ibb.co/GHCw38g/unnamed22.png"}
//               name={"ChloÃ©"}
//               description={
//                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis, nisi sed semper vehicula, lorem odio luctus magna, et suscipit massa ante et erat. Aenean in aliquet turpis. Phasellus tincidunt hendrerit orci, vitae molestie enim. Praesent laoreet non libero vitae finibus. Phasellus pharetra interdum leo et sollicitudin. Aenean vitae sapien in urna malesuada ultrices a ac augue. Proin tempus tempor convallis. Praesent in porttitor eros. Pellentesque auctor risus ac convallis scelerisque. Morbi quis urna luctus, iaculis augue auctor, maximus orci. Vivamus ultrices a sapien porta laore"
//               }
//             />
//             <h4>TOOLTIP WITH IMAGE</h4>
//           </div>
//         </div>

//         <br />
//         <br />
//         <br />
//         <br />

//         <div className="tooltip-wrapper tooltip-wrapper-xs">
//           <div className="con-tooltip right">
//             <TooltipSimple text={"YES !"} />
//             <h4>SIMPLE XS</h4>
//           </div>
//         </div>

//         <br />
//         <br />
//         <br />
//         <div className="tooltip-wrapper tooltip-wrapper-m">
//           <div className="con-tooltip right">
//             <TooltipSimple text={"Medium"} />
//             <h4>SIMPLE m</h4>
//           </div>
//         </div>
//         <br />
//         <br />
//         <br />
//         <div className="tooltip-wrapper tooltip-wrapper-l">
//           <div className="con-tooltip right">
//             <TooltipSimple text={"here we can put some longer paragraphs"} />
//             <h4>TOOLTIP L</h4>
//           </div>
//         </div>
//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />

//       <br />
//       <div
//         style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
//       >
//         <h1>POP UP</h1>
//         <br />
//         <button className=" btn-ev btn-m">btn-m</button>
//         <br />

//         <button className=" btn-ev btn-l">btn-l</button>
//         <br />

//         <button className=" btn-ev btn-m uppercase">uppercase</button>

//         <br />
//         <button className=" btn-ev btn-m hvr-warning">hvr-warning</button>

//         <br />

//         <button className=" btn-ev btn-m hvr-info">hvr-info</button>

//         <br />
//         <button className=" btn-ev btn-m hvr-transparent">
//           hvr-transparent
//         </button>

//         <br />
//         <button className=" btn-ev btn-m btn-transparent">
//           btn-transparent
//         </button>

//         <br />
//         <button className="btn-ev btn-m hvr-line">btn-hvr-line</button>
//         <br />

//         <button className="btn-ev btn-m btn-gradient">btn-gradient</button>
//         <br />
//         <button className="btn-ev btn-m btn-hvr-content btn-black">
//           <span className="hvr-content">btn-hvr-content</span>
//         </button>

//         {/* ////////////////////////////////// */}
//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <div
//         style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
//       >
//         <h1>MODALS ADMIN</h1>
//         <br />
//         <AddAdminComponentButton toggleName="maquetteInputModal" />
//         <ModalInput
//           modalToggle={"maquetteInputModal"}
//           modalIsOpen={maquette_input_modal}
//           withImage={true}
//         />

//         <br />
//         <button className=" btn-ev btn-m"> modal detail</button>
//         <br />

//         {/* ////////////////////////////////// */}
//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <div
//         style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
//       >
//         <h1 style={{ backgroundColor: "khaki" }}>POP UP</h1>
//         <br />
//         <button
//           className=" btn-ev btn-m"
//           onClick={() => props.toggle("connexionModal", true)}
//         >
//           connexion pop-up
//         </button>
//         <ConnexionModal />
//         <button
//           className=" btn-ev btn-m"
//           onClick={() => props.toggle("homePageModal", true)}
//         >
//           Home page pop-up
//         </button>
//         <HomeModal />
//         <button
//           className=" btn-ev btn-m"
//           onClick={() => {
//             props.toggle("inscriptionhomePageModal", true);
//           }}
//         >
//           Inscription pop-up
//         </button>
//         <InscriptionPopUp />
//       </div>

//       {/* <br />
//       <h1 style={{ backgroundColor: "khaki" }}>FONTS</h1>
//       <br />
//       <table className="maquette-fonts">
//         <tr>
//           <th>Font Family</th>
//           <th className="thin">Thin 100</th>
//           <th className="extra-light">Extra-light 200</th>
//           <th className="light">Light 300</th>
//           <th className="regular">Regular 400</th>
//           <th className="medium">Medium 500</th>
//           <th className="semi-bold">Semi-bold 600</th>
//           <th className="bold">Bold 700</th>
//           <th className="extra-bold">Extra-bold 800</th>
//           <th className="black">Black 900</th>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="a">Test TEST $font-monospace </h5>{" "}
//           </td>
//           <td>
//             <h5 className="a weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="a weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="a weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="a weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="a weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="a weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="a weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="a weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="a weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="b">Test TEST $font-sans-serif </h5>{" "}
//           </td>
//           <td>
//             <h5 className="b weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="b weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="b weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="b weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="b weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="b weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="b weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="b weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="b weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="c">Test TEST $font-comic-sans-ms </h5>{" "}
//           </td>
//           <td>
//             <h5 className="c weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="c weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="c weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="c weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="c weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="c weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="c weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="c weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="c weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="d">Test TEST $font-cairo </h5>{" "}
//           </td>
//           <td>
//             <h5 className="d weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="d weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="d weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="d weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="d weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="d weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="d weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="d weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="d weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="e">Test TEST $font-cursive </h5>{" "}
//           </td>
//           <td>
//             <h5 className="e weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="e weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="e weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="e weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="e weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="e weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="e weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="e weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="e weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="f">Test TEST $font-circular </h5>{" "}
//           </td>
//           <td>
//             <h5 className="f weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="f weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="f weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="f weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="f weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="f weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="f weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="f weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="f weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="g">Test TEST $font-sectra-fine </h5>{" "}
//           </td>
//           <td>
//             <h5 className="g weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="g weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="g weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="g weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="g weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="g weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="g weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="g weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="g weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr style={{ backgroundColor: "gray" }}>
//           <td>
//             <h5 className="h">Test TEST $font-arial </h5>{" "}
//           </td>
//           <td>
//             <h5 className="h weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="h weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="h weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="h weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="h weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="h weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="h weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="h weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="h weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="i">Test TEST $font-roboto </h5>{" "}
//           </td>
//           <td>
//             <h5 className="i weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="i weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="i weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="i weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="i weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="i weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="i weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="i weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="i weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="j">Test TEST $font-montserrat </h5>{" "}
//           </td>
//           <td>
//             <h5 className="j weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="j weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="j weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="j weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="j weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="j weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="j weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="j weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="j weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="k">Test TEST $font-courier </h5>{" "}
//           </td>
//           <td>
//             <h5 className="k weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="k weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="k weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="k weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="k weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="k weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="k weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="k weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="k weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="l">Test TEST $font-poppins </h5>{" "}
//           </td>
//           <td>
//             <h5 className="l weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="l weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="l weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="l weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="l weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="l weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="l weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="l weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="l weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="m">Test TEST $font-serif </h5>{" "}
//           </td>
//           <td>
//             <h5 className="m weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="m weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="m weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="m weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="m weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="m weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="m weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="m weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="m weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="n">Test TEST $font-bookman-old-style </h5>{" "}
//           </td>
//           <td>
//             <h5 className="n weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="n weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="n weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="n weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="n weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="n weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="n weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="n weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="n weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="o">Test TEST $font-cambria </h5>{" "}
//           </td>
//           <td>
//             <h5 className="o weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="o weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="o weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="o weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="o weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="o weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="o weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="o weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="o weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="p">Test TEST $font-gt-sectra-fine </h5>{" "}
//           </td>
//           <td>
//             <h5 className="p weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="p weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="p weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="p weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="p weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="p weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="p weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="p weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="p weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="q">Test TEST $font-raleway </h5>{" "}
//           </td>
//           <td>
//             <h5 className="q weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="q weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="q weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="q weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="q weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="q weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="q weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="q weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="q weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr style={{ backgroundColor: "gray" }}>
//           <td>
//             <h5 className="r">Test TEST $font-anton </h5>{" "}
//           </td>
//           <td>
//             <h5 className="r weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="r weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="r weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="r weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="r weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="r weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="r weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="r weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="r weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr style={{ backgroundColor: "gray" }}>
//           <td>
//             <h5 className="s">Test TEST $font-gill-sans </h5>{" "}
//           </td>
//           <td>
//             <h5 className="s weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="s weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="s weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="s weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="s weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="s weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="s weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="s weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="s weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="t">Test TEST $font-oswald </h5>{" "}
//           </td>
//           <td>
//             <h5 className="t weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="t weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="t weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="t weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="t weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="t weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="t weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="t weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="t weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <h5 className="u">Test TEST $font-system-ui </h5>{" "}
//           </td>
//           <td>
//             <h5 className="u weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="u weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="u weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="u weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="u weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="u weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="u weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="u weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="u weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//         <tr style={{ backgroundColor: "gray" }}>
//           <td>
//             <h5 className="v">Test TEST $font-proxima-nova </h5>{" "}
//           </td>
//           <td>
//             <h5 className="v weight-thin">Test TEST 100</h5>
//           </td>
//           <td>
//             <h5 className="v weight-extra-light">Test TEST 200</h5>
//           </td>
//           <td>
//             <h5 className="v weight-light">Test TEST 300</h5>
//           </td>
//           <td>
//             <h5 className="v weight-regular">Test TEST 400</h5>
//           </td>
//           <td>
//             <h5 className="v weight-medium">Test TEST 500</h5>
//           </td>
//           <td>
//             <h5 className="v weight-semi-bold">Test TEST 600</h5>
//           </td>
//           <td>
//             <h5 className="v weight-bold">Test TEST 700</h5>
//           </td>
//           <td>
//             <h5 className="v weight-extra-bold">Test TEST 800</h5>
//           </td>
//           <td>
//             <h5 className="v weight-black">Test TEST 900</h5>
//           </td>
//         </tr>
//       </table> */}

//       <br />
//       <h1 style={{ backgroundColor: "khaki" }}>CARROUSSEL ET ACCODION</h1>
//       <br />

//       <section className="caroussel-home-section">
//         <Carousel>
//           {activtiesInfo.map((act) => (
//             <SectionActivities
//               withButton={true}
//               image={act.image}
//               title={act.name}
//               description={act.description}
//             />
//           ))}
//         </Carousel>
//       </section>
//     </div>
//   );
// };

// const mapDispatchToProps = (dispatch) => ({
//   toggle: (toggleName, etat) => {
//     dispatch(toggle(toggleName, etat));
//   },

//   deleteArticleJournal: (id) => {
//     dispatch(deleteArticleJournal(id));
//   },

//   createArticleJournal: (article) => {
//     dispatch(createArticleJournal(article));
//   },

//   editArticleJournal: (id, ArticleJournal) => {
//     dispatch(editArticleJournal(id, ArticleJournal));
//   },

//   getArticleJournalById: (id) => {
//     dispatch(getArticleJournalById(id));
//   },
// });
// const mapStateToProps = (state) => {
//   return {
//     adminReducer: state.AdminReducer,
//     journalArticleReducer: state.JournalReducer,
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Maquette);
