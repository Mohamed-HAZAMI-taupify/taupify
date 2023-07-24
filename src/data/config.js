export const api_var1 = "http://localhost:4000" 
export const api_var = "https://everest-backend.onrender.com"
  // window.location.hostname === "localhost" ||
  // window.location.hostname === "127.0.0.1" ||
  // window.location.hostname === "0.0.0.0" ||
  // window.location.hostname === ""
  //   ? "/api"
  //   : "";
export const _base_url_coach = api_var + "/trainers";
export const _coach_filtered = _base_url_coach + "/coach-activity";
export const _get_coach_image = _base_url_coach + "/get-image?searching=";
export const _base_url_rdv = api_var + "/rdv";
export const _active_rdv = _base_url_rdv + "/active-rdv";
export const _canceled_rdv = _base_url_rdv + "/canceled-rdv";
export const _filtered_rdvs = _base_url_rdv + "/filtered";

export const _base_url_email = api_var + "/email";
export const _send_email = _base_url_email + "/send";
export const _send_email_everfit =
  _base_url_email + "/send-confirmation-everfit";
export const _send_email_everest_become_coach =
  _base_url_email + "/send-confirmation-k2-become-coach";

  export const _send_email_k2_become_coach =
  _base_url_email + "/send-confirmation-everest-become-coach";
  

export const _send_reply_contact_us =
  _base_url_email + "/send-response-contact-us";
export const _cancelation_rdv_mail = _base_url_email + "/cancelation-rdv-mail";
export const _confirmation_rdv_mail =
  _base_url_email + "/confirmation-rdv-mail";
export const _pre_registration_confirmation_mail =
  _base_url_email + "/send-pre-registration-confirmation";

export const _base_url_event_calender = api_var + "/event-calendar";
export const _base_url_member_own_events = api_var + "/member-own-events";
export const _base_url_subscriptions = api_var + "/subscriptions";

export const _base_url_contact = api_var + "/contact-everest";
export const _base_url_contact_resamania = api_var + "/contact";
export const _base_url_activity = api_var + "/activity";

export const _base_url_auth = api_var + "/oauth";
export const _member_auth = _base_url_auth + "/member";
export const _admin_auth = _base_url_auth + "/everest-user";
export const _superAdmin_auth = _base_url_auth + "/login-superAdmin";
export const delete_cache = api_var + "/delete-cache";

export const _base_url_resamania = "https://api.resamania.com";
export const _base_url_studio = api_var + "/studio";
export const _base_url_club = api_var + "/club";
export const _base_url_reset_password = api_var + "/reset-password";
export const _base_url_acticle = api_var + "/articles";
export const _base_url_event = api_var + "/event";
export const _base_url_member = api_var + "/member-contact";

////not yet optimized/////////////////////////////////////

export const afficheMemberNoFilter = _base_url_member + "/getNoFilter";
export const affiche_all_members = _base_url_member + "/affiche-all-members";

export const contact_us_prospect = api_var + "/contact-us-prospect/";
export const show_popup = api_var + "/pop-up";

//web-services
export const everfit_contact = api_var + "/everfit-contact";
export const everfit_training = api_var + "/training";

export const lemon_one_contact = api_var + "/lemon-one-contact";
export const send_confirmation_everest_become_coach =
  "/email/send-confirmation-everest-become-coach";
export const _base_url_taupify_contact = api_var + "/taupify-contact/";

//article-journal
export const _base_url_article_journal = api_var + "/article-journal";

export const _create_payment_intent = api_var + "/create-payment-intent";

export const escale_spa_contact = api_var + "/escale-spa/contact/";

export const _base_url_popup = api_var + "/popup";

export const _base_url_k2_contact = api_var + "/contact-k2/";

export const _base_url_feedback_question = api_var + "/question";
export const _base_url_feedback_form = api_var + "/feedback-form";
export const _base_url_feedback_answer = api_var + "/answer";

export const _base_url_contact_game = api_var + "/contact-game";

export const _base_url_contact_formulaire = api_var + "/contact-formulaire-everest";
export const _base_url_contact_formulaire_everfit = api_var + "/contact-formulaire-everfit";

export const _base_url_contact_open_day = api_var + "/contcat-open-day";




