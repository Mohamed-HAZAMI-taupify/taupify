import Studio from "../../components/studio";
import ClubBesancon from "../../components/club-besancon/index";
import MentionsLegales from "../../components/footer/LegalMentions";
import PolitiqueConf from "../../components/footer/confidentialityPolicy";
import ConditionsGenerVente from "../../components/footer/GeneralConditions";
import Profile from "../../components/member/Profile";
import RejoignezNous from "../../components/join-us";
import AdminLogin from "../../components/admin-login";
import SuperAdminLogin from "../../components/superAdmin-login";
import Logout from "../../components/admin-login/Logout";
import Rdv from "../../components/rendez-vous/rendez-vous-calendly/RendezVousCalendly";
import Unsubscribe from "../../components/unsubscribe/index";
import Catalogue from "../../components/catalog";
import TakeRendezVous from "../../components/rendez-vous/our-rendez-vous/TakeRendezVous";
import AnnulerRDV from "../../components/rendez-vous/our-rendez-vous/AnnulerRDV";
import MemberSignUp from "../../components/member-sign-up";
import Planning from "../../components/planning";
import Contactus from "../../components/contact-us";
import Reservation from "../../components/reservation";
import Experience from "../../components/experience";
import FeedbackForm from "../../components/feedback-form";
import RdvFB from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFB";
import RdvPopUp from "../../components/rendez-vous/rendez-vous-calendly/CalendlyPopUp";
import RdvInsta from "../../components/rendez-vous/rendez-vous-calendly/CalendlyInsta";
import RdvLinkedin from "../../components/rendez-vous/rendez-vous-calendly/CalendlyLinkedin";
import RdvEverestKids from "../../components/rendez-vous/rendez-vous-calendly/CalendlyLinkedin";
import NewCoachGallery from "../../components/coach/gallery";
import NewCoachSingleImage from "../../components/coach/single-image";
import RdvFBG from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFBG";
import RdvMail from "../../components/rendez-vous/rendez-vous-calendly/CalendlyMail";
import DemoApp from "../../components/calendar";
import ChangePassword from "../../components/forget-password";
import Member from "../../components/member";
import ResetPassword from "../../components/reset-password";
import RdvSMS from "../../components/rendez-vous/rendez-vous-calendly/CalendlySMS";
import RdvEscaleSpa from "../../components/rendez-vous/rendez-vous-calendly/CalendlyEscaleSpa";
import { PlanningGallery } from "../../components/catalog-planning";
import RdvNathalie from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyNathalie";
import RdvEleonore from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyEleonore";
import RdvMathieu from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyMathieu";
import RdvBruno from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyBruno";
import RdvYacine from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyYacine";
import RdvSara from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlySara";
import RdvOnder from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyÖnder";
import RdvWalid from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyWalid";
// import Maquette from "../../components/common-components/scss-components/maquette";
import RdvFTPChallenge from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFTPChalenge";
import RdvOffreRentree from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffrerentree";
import RdvOffreRentreePopUp from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreRentreePopUp";
import RdvTommyLee from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyTommyLee";
import RdvAntoine from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyAntoine";
import RdvOffreRentreeVideoSV from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreRentreeVideoSV";
import RdvOffreRentreeCoach from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreRentreeCoach";
import Coupon from "../../components/coupon";
import RdvMailV from "../../components/rendez-vous/rendez-vous-calendly/CalendlyMailV";
import Journal from "../../components/journal";
import Article from "../../components/journal/article";
import becomeCoach from "../../components/become-coach";
import RdvCelia from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyCelia";
import RdvChloe from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyChloe";
import RdvVincentOpen from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyNewVincent";
import RdvPaul from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyPaul";
import RdvMontassar from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyMontassar";
import RdvJoséphine from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyJoséphine";
import RdvMathias from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyMathias";
import RdvEvenementConcertEverest from "../../components/rendez-vous/rendez-vous-calendly/CalendlyEvenementConcert";
import ConnectedCouponCoursCollectifs from "../../components/coupon-planning-collectifs";
import RdvChalengeTransformation from "../../components/rendez-vous/rendez-vous-calendly/CalendlyChallengeTransformation";
import ConnectedContestGame from "../../components/contest-game";
import BuyTshirtEverest from "../../components/contest-game/buy-t-shirt";
import LocationOurClub from "../../components/location-our-club";
import RdvVenteFlashMail from "../../components/rendez-vous/rendez-vous-calendly/CalendlyVenteFlashMail";
import RdvVenteFlashSMS from "../../components/rendez-vous/rendez-vous-calendly/CalendlyVenteFlashSms";
import { data } from "./routesData";
import RdvJuilletAoutOfferts from "../../components/rendez-vous/rendez-vous-calendly/CalendlyJuilletAoutOfferts";
import RdvJuilletAoutOffertsMail from "../../components/rendez-vous/rendez-vous-calendly/CalendlyJuilletAoutOffertsMail";
import RdvJuilletAoutOffertsFb from "../../components/rendez-vous/rendez-vous-calendly/CalendlyJuilletAoutOffertsFb";
import RdvOffreAoutJuilletOffertsPopUp from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreAoutJuilletOffertsPopUp";
import RdvCalendlyLesMillesCoreEverest from "../../components/rendez-vous/rendez-vous-calendly/CalendlyLesMillesCoreEverest";
import RdvSmsSeptembreOffert from "../../components/rendez-vous/rendez-vous-calendly/CalendlySmsSeptembreOffert";
import RdvSmsParrainageEverest from "../../components/rendez-vous/rendez-vous-calendly/CalendlySmsParrainageEverest";
import RdvFraisInscriptionFb from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFraisInscriptionFb";
import RdvFraisInscriptionPopUp from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFraisInscriptionPopUp";
import RdvFraisInscriptionNavbar from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFraisInscriptionNavbar";
import RdvFraisInscriptionLinkedin from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFraisInscriptionLinkedin";
import RdvVenteFlashSmsEverest from "../../components/rendez-vous/rendez-vous-calendly/CalendlyVenteFlashSmsEverest";
import RdvVenteFlashMailEverest from "../../components/rendez-vous/rendez-vous-calendly/CalendlyVenteFlashMailEverest";
import RdvFraisInscriptionSms from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFraisInscriptionSms";
import RdvKidsEverestSms from "../../components/rendez-vous/rendez-vous-calendly/CalendlyEverestKidsSms";
import RdvEverestKidsFb from "../../components/rendez-vous/rendez-vous-calendly/CalendlyEverestKidsFb";
import RdvEverestKidsBoxFB from "../../components/rendez-vous/rendez-vous-calendly/CalendlyEverestKidsBoxeFb";
import RdvFraisInscriptionFbExterieur from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFraisInscriFbExterieur";
import RdvVentePrivellegeSms from "../../components/rendez-vous/rendez-vous-calendly/CalendlyVentePrivellegeSms";
import RdvVentePrivellegeEmail from "../../components/rendez-vous/rendez-vous-calendly/CalendlyVentePrivellegeMail";
import RdvOffreBienvenue from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreBienvenue";
import RdvOffreBienvenuePopUp from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreBienvenuePopup";
import RdvOffreOctobreRose from "../../components/rendez-vous/rendez-vous-calendly/Calendly-offre-octobre-rose";
import RdvHappyOctobre from "../../components/rendez-vous/rendez-vous-calendly/CalendlyHappyOctobre";
import RdvHappyOctobreNavbar from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreOctobreNavbar";
import RdvHappyOctobrePopup from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreOctobrePopup";
import RdvHappyOctobreEmail from "../../components/rendez-vous/rendez-vous-calendly/CalendlyHappyOctobreMail";
import RdvHappyOctobreFacebook from "../../components/rendez-vous/rendez-vous-calendly/CalendlyHappyOctobreFacebook";
import RdvPopUpctobre from "../../components/rendez-vous/rendez-vous-calendly/CalendlyPopupOctobre";
import RdvOffreBienvenueNavbar from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreDeBienvenueNavbar";
import RdvOffreDeBienvenuePopup from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreDeBienvenuePopup";
import RdvOffreFinAnnee from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreFinAnnee";
import RdvOffreParrainageDecembre from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffrePrrainageDecembre";
import ContestForm from "../../components/contest-form/index";
import FormulaireEverest from "../../components/formulaire-everest/index";
import RdvOffreNouvelAn from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreNouvelAn";
import RdvSmsOffreNouvelleAnnee from "../../components/rendez-vous/rendez-vous-calendly/CalendlySmsOffreNouvelleAnnee";
import RdvFbOffreNouvelleAnnee from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFbOffreNouvelleAnnee"
import RdvVenteFlashFb from "../../components/rendez-vous/rendez-vous-calendly/CalendlyFacebookVenteFlash";
import RdvVenteFlashEmail from "../../components/rendez-vous/rendez-vous-calendly/CalendlyEmailVenteFlash";
import RdvSmsVenteFlash from "../../components/rendez-vous/rendez-vous-calendly/CalendlySmsVenteFlash";
import RdvVenteFlashNavbar from "../../components/rendez-vous/rendez-vous-calendly/CalendlyNavbarVenteFlash";
import RdvVenteFlashPopUp from "../../components/rendez-vous/rendez-vous-calendly/CalendlyPopUpVenteFlash";
import RdvPiscine from "../../components/rendez-vous/rendez-vous-calendly/CalendlyPiscine"
import RdvYoga from "../../components/rendez-vous/rendez-vous-calendly/CalendlyYoga"
import RdvBodyJam from "../../components/rendez-vous/rendez-vous-calendly/CalendlyBodyJam"
import RdvAmie from "../../components/rendez-vous/rendez-vous-calendly/CalendlyEssaiAmie"
import RdvVenteFlashInsta from "../../components/rendez-vous/rendez-vous-calendly/CalendlyRdvIntagram"
import RdvMailVenteFlash from "../../components/rendez-vous/rendez-vous-calendly/CalendlyRdvIntagram"
import RdvJosephineFb from "../../components/rendez-vous/rendez-vous-calendly/CalendlyRdvJosephineFb"
import RdvVenteFlashSms from "../../components/rendez-vous/rendez-vous-calendly/CalendlyRdvVenteFlashSms"
import RdvMathiasDeux from "../../components/rendez-vous/rendez-vous-calendly/CalendlyRdvMathiasDeux"
import RdvShBam from "../../components/rendez-vous/rendez-vous-calendly/CalendlyShBam"
import RdvVBoxing from "../../components/rendez-vous/rendez-vous-calendly/CalendlyBoxing"
import Rdvcaf from "../../components/rendez-vous/rendez-vous-calendly/CalendlyCaf"
import RdvSwissBall from "../../components/rendez-vous/rendez-vous-calendly/CalendlySwissBall"
import RdvMec from "../../components/rendez-vous/rendez-vous-calendly/CalendlyMec"
import RdvOxygeneRide from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOxygeneRide"
import RdvSeanceDecouverteMontassar from "../../components/rendez-vous/rendez-vous-calendly/CalendlySeanceDecouverteMontassar"
import RdvJamel from "../../components/rendez-vous/rendez-vous-calendly/rendez-vous-coach/CalendlyJamel";
import RdvOffreParrainage from "../../components/rendez-vous/rendez-vous-calendly/CalendlyOffreParrainageAvril";
import RdvSeanceDecouverteJo from "../../components/rendez-vous/rendez-vous-calendly/CalendlySeanceDecouverteJo";
import RdvSeanceDecouverteLp from "../../components/rendez-vous/rendez-vous-calendly/CalendlySeanceDecouverteLp";
import ReservationCalendly from "../../components/rendez-vous/rendez-vous-calendly/reservationCalendly";


export const routes = [

  { path: "/rendez-vous", component: ReservationCalendly },
  { path: data.accueil, component: ClubBesancon },
  { path: data.studios, component: Studio },
  { path: data.journal, component: Journal },
  {
    path: data.journal + "/article/:idArticle/display", //backtoarticle
    component: Article,
  },
  { path: data.journal + "/article/:idArticle/edit", component: Article },
  // { path:data.journal+ "/article/:idUser/:idArticle/edit", component: Article }, //this will be implemented when we will retrieve admin data from the token
  { path: data.login_admin, component: AdminLogin },
  { path: data.login_superAdmin, component: SuperAdminLogin },
  { path: data.logout, component: Logout },
  { path: data.rejoignez_nous, component: RejoignezNous },
  { path: data.contact_us, component: Contactus },
  { path: data.mentions_Legales, component: MentionsLegales },
  { path: data.se_desinscrire, component: Unsubscribe },
  { path: data.planning, component: Planning },
  { path: data.reservation + "/:id/:coach", component: Reservation },
  { path: data.politique_de_confidentialite, component: PolitiqueConf },
  { path: data.conditions_generales_de_vente, component: ConditionsGenerVente },
  { path: data.profile, component: Profile },
  { path: data.rdv, component: Rdv },
  { path: data.catalogue, component: Catalogue },
  { path: data.rendez_vous_annuler, component: AnnulerRDV },
  { path: data.rendez_vous, component: TakeRendezVous },
  { path: data.member_sign_up, component: MemberSignUp },
  { path: data.experience, component: Experience },
  { path: data.feedback_form, component: FeedbackForm },

  { path: data.rdv_fb, component: RdvFB },
  { path: data.rdv_pop_up, component: RdvPopUp },
  { path: data.rdv_insta, component: RdvInsta },
  { path: data.rdv_linkedin, component: RdvLinkedin },
  { path: data.rdv_fbg, component: RdvFBG },
  { path: data.rdv_mail, component: RdvMail },
  { path: data.rdv_sms, component: RdvSMS },
  { path: data.rdv_escale_spa, component: RdvEscaleSpa },
  { path: data.change_password, component: ChangePassword },
  { path: data.coaches, component: NewCoachGallery },
  {
    path: data.coach_image + "/:k/:id/:idResamania",
    component: NewCoachSingleImage,
  },
  { path: data.calendar, component: DemoApp },
  { path: data.member, component: Member },
  { path: data.reset_password, component: ResetPassword },
  { path: data.planning_catalog, component: PlanningGallery },
  { path: data.rdv_nathalie, component: RdvNathalie },
  { path: data.rdv_jamel, component: RdvJamel },
  { path: data.rdv_bruno, component: RdvBruno },
  { path: data.rdv_grisier_mathieu, component: RdvMathieu },
  { path: data.rdv_bruno, component: RdvBruno },
  { path: data.rdv_yacine, component: RdvYacine },
  { path: data.rdv_vincent, component: RdvVincentOpen },
  { path: data.rdv_sara, component: RdvSara },
  { path: data.rdv_walid, component: RdvWalid },
  // { path: data.maquette, component: Maquette },
  { path: data.rdv_ftp_challenge, component: RdvFTPChallenge },
  { path: data.rdv_offre_entree, component: RdvOffreRentree },
  { path: data.rdv_offre_entree_pop_up, component: RdvOffreRentreePopUp },
  { path: data.rdv_offre_entree_video_sv, component: RdvOffreRentreeVideoSV },
  { path: data.rdv_offre_entree_coach, component: RdvOffreRentreeCoach },
  { path: data.coupon, component: Coupon },
  { path: data.contest_form, component: ContestForm },
  { path: data.formulaire_everest, component: FormulaireEverest },
  { path: data.rdv_offre_nouvelle_annee, component: RdvOffreNouvelAn },
  { path: data.rdv_sms_offre_nouvelle_annee, component: RdvSmsOffreNouvelleAnnee },
  { path: data.rdv_fb_offre_nouvelle_annee, component: RdvFbOffreNouvelleAnnee },
  { path: data.rdv_mail_v10, component: RdvMailV },
  { path: data.devenir_coach, component: becomeCoach },
  { path: data.rdv_tommy_lee, component: RdvTommyLee },
  { path: data.rdv_antoine, component: RdvAntoine },
  { path: data.rdv_celia, component: RdvCelia },
  { path: data.rdv_chloe, component: RdvChloe },
  { path: data.rdv_önder, component: RdvOnder },
  { path: data.rdv_montassar, component: RdvMontassar },
  { path: data.rdv_mathias, component: RdvMathias },
  { path: data.rdv_joséphine, component: RdvJoséphine },
  { path: data.rdv_paul, component: RdvPaul },
  {
    path: data.coupon_planning_collectifs,
    component: ConnectedCouponCoursCollectifs,
  },
  { path: data.rdv_everest_kids, component: RdvEverestKids },

  {
    path: data.rdv_evenement_concert_everest,
    component: RdvEvenementConcertEverest,
  },
  {
    path: data.rdv_challenge_transformation,
    component: RdvChalengeTransformation,
  },
  { path: data.contest_game, component: ConnectedContestGame },
  { path: data.buy_tshirt_everest, component: BuyTshirtEverest },
  { path: data.location_our_club, component: LocationOurClub },
  { path: data.rdv_vente_flash_sms, component: RdvVenteFlashSMS },
  { path: data.rdv_vente_flash_mail, component: RdvVenteFlashMail },
  { path: data.rdv_juillet_aout_offerts, component: RdvJuilletAoutOfferts },
  {
    path: data.rdv_juillet_aout_offerts_mail,
    component: RdvJuilletAoutOffertsMail,
  },
  {
    path: data.rdv_juillet_aout_offerts_fb,
    component: RdvJuilletAoutOffertsFb,
  },
  {
    path: data.rdv_juillet_aout_offerts_pop_up,
    component: RdvOffreAoutJuilletOffertsPopUp,
  },
  { path: data.rdv_vente_privellege_sms, component: RdvVentePrivellegeSms },
  { path: data.rdv_vente_privellege_email, component: RdvVentePrivellegeEmail },
  {
    path: data.rdv_les_milles_core_everest,
    component: RdvCalendlyLesMillesCoreEverest,
  },
  { path: data.rdv_sms_septembre_offert, component: RdvSmsSeptembreOffert },
  { path: data.rdv_sms_parrainage, component: RdvSmsParrainageEverest },
  { path: data.rdv_frais_inscri_fb, component: RdvFraisInscriptionFb },
  { path: data.rdv_frais_inscri_pop_up, component: RdvFraisInscriptionPopUp },
  { path: data.rdv_frais_inscri_navbar, component: RdvFraisInscriptionNavbar },
  { path: data.rdv_offre_bienvenue, component: RdvOffreBienvenue },
  { path: data.rdv_offre_bienvenue_popup, component: RdvOffreBienvenuePopUp },
  { path: data.rdv_offre_octobre_rose, component: RdvOffreOctobreRose },
  { path: data.rdv_happy_octobre_sms, component: RdvHappyOctobre },
  { path: data.rdv_happy_octobre_nav, component: RdvHappyOctobreNavbar },
  { path: data.rdv_happy_octobre_popup, component: RdvHappyOctobrePopup },
  { path: data.rdv_happy_octobre_email, component: RdvHappyOctobreEmail },
  { path: data.rdv_happy_octobre_facebook, component: RdvHappyOctobreFacebook },
  { path: data.rdv_popup_octobre, component: RdvPopUpctobre },
  { path: data.rdv_offre_fin_annee, component: RdvOffreFinAnnee },
  {
    path: data.rdv_offre_parrainage_decembre,
    component: RdvOffreParrainageDecembre,
  },

  {
    path: data.rdv_frais_inscri_linkedin,
    component: RdvFraisInscriptionLinkedin,
  },
  { path: data.rdv_frais_inscri_sms, component: RdvFraisInscriptionSms },
  {
    path: data.rdv_vente_flash_sms_everest,
    component: RdvVenteFlashSmsEverest,
  },
  { path: data.rdv_offre_bienvenue_nav, component: RdvOffreBienvenueNavbar },
  { path: data.rdv_vente_flash_fb, component: RdvVenteFlashFb },
  { path: data.rdv_email_vente_flash, component: RdvVenteFlashEmail },
  { path: data.rdv_sms_vente_flash, component: RdvSmsVenteFlash },
  { path: data.rdv_navbar_vente_flash, component: RdvVenteFlashNavbar },
  { path: data.rdv_popup_vente_flash, component: RdvVenteFlashPopUp },
  { path: data.piscine, component: RdvPiscine },
  { path: data.rdv_yoga, component: RdvYoga },
  { path: data.rdv_body_jam, component: RdvBodyJam },
  { path: data.rdv_amie, component: RdvAmie},
  { path: data.rdv_vente_flash_insta, component: RdvVenteFlashInsta},
  { path: data.rdv_vente_flash_email, component: RdvMailVenteFlash},
  { path: data.rdv_josephine_fb, component: RdvJosephineFb},
  { path: data.rdv_sms_vente_flash_ma, component: RdvVenteFlashSms},
  { path: data. rdv_mathias_deux, component: RdvMathiasDeux},
  { path: data. rdv_sh_bam, component: RdvShBam},
  { path: data. rdv_boxing, component: RdvVBoxing},
  { path: data. rdv_caf, component: Rdvcaf},
  { path: data. rdv_swiss_ball, component: RdvSwissBall},
  { path: data. rdv_mec, component: RdvMec},
  { path: data. rdv_oxygene_ride, component: RdvOxygeneRide},
  { path: data. rdv_seance_decouverte_montassar, component: RdvSeanceDecouverteMontassar},
  { path: data. rdv_seance_decouverte_jo, component: RdvSeanceDecouverteJo},
  { path: data. rdv_seance_decouverte_lp, component: RdvSeanceDecouverteLp},
  {
    path: data.rdv_offre_parrainage,component: RdvOffreParrainage},

  {
    path: data.rdv_offre_de_bienvenue_popup,
    component: RdvOffreDeBienvenuePopup,
  },
  {
    path: data.rdv_vente_flash_mail_everest,
    component: RdvVenteFlashMailEverest,
  },
  { path: data.rdv_everest_kids_sms, component: RdvKidsEverestSms },
  {
    path: data.rdv_frais_inscri_fb_extérieur,
    component: RdvFraisInscriptionFbExterieur,
  },
  { path: data.rdv_everest_kids_fb, component: RdvEverestKidsFb },
  { path: data.rdv_everest_kids_boxe_fb, component: RdvEverestKidsBoxFB },
];