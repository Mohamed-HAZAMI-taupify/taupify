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
  query ($type: String) {
    getArticleByType(type: $type) {
      id
      type
      title
      cover
    }
  }
`;

export const LOAD_ARTICLES_BY_IS_TREND = gql`
  query ($isTrend: Boolean) {
    getArticleByIsTrend(isTrend: $isTrend) {
      id
      type
      title
      cover
    }
  }
`;

export const LOAD_ARTICLES_BY_SEARCH_TITLE = gql`
  query ($title: String) {
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

export const LOAD_ARTICLES_TREND = gql`
  query {
    getAllArticles {
      id
      isTrend
    }
  }
`;

