import { gql } from "@apollo/client";

export const LOAD_ARTICLES = gql`
  query {
    getAllArticles {
      id
      title
      type
    }
  }
`;

export const LOAD_ARTICLES_BY_TYPE = gql`
  query($type: String) {
    getArticleByType(type: $type) {
      id
      type
      title
      cover
    }
  }
`;

export const LOAD_ARTICLES_BY_IS_TREND = gql`
  query($isTrend: Boolean) {
    getArticleByIsTrend(isTrend: $isTrend) {
      id
      type
      title
      cover
    }
  }
`;

export const LOAD_ARTICLES_BY_SEARCH_TITLE = gql`
  query($title: String) {
    articlesSearch(title: $title) {
      title
      cover
      type
      id
      state
      createdAt
      createdBy
      isTrend
    }
  }
`;

export const LOAD_EVENTS_FILTER = gql`
  query($filter: EventFilter) {
    getfiltredEvents(filter: $filter) {
      id
      attendingLimit
      queueLimit
      activity
      studio
      club
      coach
      startedAt
      endedAt
      activityObject {
        name
      }
      studioObject {
        name
      }
      clubObject {
        name
      }
      coachObject {
        _id
        givenName
        image {
          _url
        }
        familyName
        alternateName
        description
        id_resamania_prod
        id_resamania
      }
      bookedAttendees {
        contactId
        state
      }
      queuedAttendees {
        bookedItem
      }
    }
  }
`;

export const LOAD_EVENT_PLANNING = gql`
  query {
    events {
      id
      attendingLimit
      queueLimit
      activity
      studio
      club
      coach
      startedAt
      endedAt
      activityObject {
        name
      }
      studioObject {
        name
      }
      clubObject {
        name
      }
      coachObject {
        givenName
        image {
          _url
        }
        familyName
        alternateName
        description
        id_resamania_prod
        id_resamania
      }
      bookedAttendees {
        contactId
        state
      }
      queuedAttendees {
        bookedItem
      }
    }
  }
`;

export const LOAD_ACTIVITIES = gql`
  query {
    activities {
      id
      name
    }
  }
`;

export const LOAD_CLUBS = gql`
  query {
    clubs {
      id
      name
    }
  }
`;

export const LOAD_STUDIOS = gql`
  query {
    studios {
      id
      name
    }
  }
`;
export const LOAD_COACHES = gql`
  query {
    coaches {
      _id
      id_resamania_prod
      id_resamania
      givenName
      familyName
      alternateName
      description
      image {
        _url
      }
      activities {
        label
        value
      }
      email
      phone
      socialmedia {
        facebook
        instagram
        youtube
      }
    }
  }
`;

export const LOAD_SUBSCRIPTIONS = gql`
  query {
    subscriptions {
      id
      name
      validFrom
      inclusiveValidThrough
      articleId
      articleObject {
        id
        productName
        offerName
        priceTE
        priceTI
        tax
        taxRate
      }
      initialInfo {
        offerName
      }
    }
  }
`;

export const LOAD_COACHES_WITH_FILTER = gql`
  query($filter: CoachFilter) {
    getfiltredCoaches(filter: $filter) {
      _id
      id_resamania_prod
      id_resamania
      givenName
      familyName
      alternateName
      description
      image {
        _url
      }
      activities {
        label
        value
      }
    }
  }
`;

export const LOAD_MEMBER_OWN_EVENTS = gql`
  query($memberOwnEventsArgs: MemberOwnEventsArgs) {
    memberOwnEvents(memberOwnEventsArgs: $memberOwnEventsArgs) {
      totalItems
      memberOwnEventsList {
        id
        activityName
        contactId
        classEvent {
          club
          studio
          activity
          coach
          attendingLimit
          queueLimit
          startedAt
          endedAt
        }
        state
        activityObject {
          name
        }
        studioObject {
          name
        }
        clubObject {
          name
        }
        coachObject {
          _id
          givenName
          image {
            _url
          }
          familyName
          alternateName
          description
          id_resamania_prod
          id_resamania
        }
      }
    }
  }
`;

export const LOAD_CLASS_EVENT_BY_ID = gql`
  query($eventId: EventId) {
    classEventById(eventId: $eventId) {
      id
      attendingLimit
      queueLimit
      activity
      studio
      club
      coach
      startedAt
      endedAt
      activityObject {
        name
      }
      studioObject {
        name
      }
      clubObject {
        name
      }
      coachObject {
        _id
        givenName
        image {
          _url
        }
        familyName
        alternateName
        description
        id_resamania_prod
        id_resamania
      }
      bookedAttendees {
        contactId
        state
      }
      queuedAttendees {
        bookedItem
      }
    }
  }
`;

export const LOAD_BACK_OFFICE_COACHES = gql`
  query($filter: BackOfficeFilter) {
    getBackOfficeCoaches(filter: $filter) {
      _id
      id_resamania_prod
      id_resamania
      givenName
      familyName
      alternateName
      description
      image {
        _url
      }
      activities {
        label
        value
      }
      email
      phone
      socialmedia {
        facebook
        instagram
        youtube
      }
    }
  }
`;

export const LOAD_BACK_OFFICE_ACTIVITIES = gql`
  query($filter: BackOfficeFilter) {
    getBackOfficeActivities(filter: $filter) {
      id
      name
      createdAt
      durations
    }
  }
`;

export const LOAD_BACK_OFFICE_STUDIOS = gql`
  query($filter: BackOfficeFilter) {
    getBackOfficeStudios(filter: $filter) {
      id
      name
      createdAt
      streetAddress
      postalCode
      addressLocality
      addressCountry
      club
      clubObject {
        name
      }
    }
  }
`;

export const LOAD_CONTACT_EVEREST_FILTER = gql`
  query($filter: ContactEverestFilter) {
    getContactEverest(filter: $filter) {
      id
      familyName
      givenName
      email
      mobile
      subscribe
      sourceId
      state
      createdAt
    }
  }
`;

export const LOAD_MESSAGE_EVEREST = gql`
  query($filter: BackOfficeFilter) {
    getMessagesEverest(filter: $filter) {
      id
      email
      date
      message
      contactEverest {
        familyName
        givenName
        mobile
      }
    }
  }
`;

export const LOAD_CONTACT_EVEREST_BY_STATE = gql`
  query {
    getStatContactEverestByState {
      groupedBy
      count
    }
  }
`;

export const LOAD_CONTACT_EVEREST_BY_SOURCEID = gql`
  query($filter: StateFilter) {
    getStatContactEverestBySourceId(filter: $filter) {
      groupedBy
      count
    }
  }
`;

export const LOAD_CONTACT_EVEREST_BY_DATE = gql`
  query($filter: StateFilter) {
    getStatContactEverestByDate(filter: $filter) {
      groupedBy
      count
    }
  }
`;
