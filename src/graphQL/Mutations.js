import { gql } from "@apollo/client";

export const UPDATE_ARTCILE = gql`
  mutation Mutation($id: ID, $articleInput: ArticleInput) {
    updateArticle(id: $id, articleInput: $articleInput) {
      id
      type
      title
      cover
      isTrend
      state
      createdAt
      createdBy
    }
  }
`;

export const DELETE_ARTCILE = gql`
mutation Mutation($id: ID) {
  deleteArticle(id: $id) {
    id
  }
}
`;

