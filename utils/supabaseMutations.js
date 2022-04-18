import { gql } from '@apollo/client'

export const InsertNft = gql`
mutation InsertIntoNftCollection($objects: [NftInsertInput!]!) {
  insertIntoNftCollection(objects: $objects) {
    records {
      mintbase_thing_id
      store_id
      network
      minter_id
    }
  }
}
`

export const InsertComment = gql`
mutation Mutation($objects: [CommentInsertInput!]!) {
  insertIntoCommentCollection(objects: $objects) {
    records {
      id
      created_at
      text
      user_id
      nft_id
    }
  }
}
`

export const InsertLike = gql`
mutation InsertIntoCommentCollection($objects: [LikeInsertInput!]!) {
  insertIntoLikeCollection(objects: $objects) {
    records {
      id
      created_at
      user_id
      nft_id
      value
    }
  }
}`

export const DeleteLike = gql`
mutation Mutation($filter: LikeFilter) {
  deleteFromLikeCollection(filter: $filter) {
    records {
      id
      value
      nft_id
      user_id
      created_at
    }
  }
}
`

export const DeleteComment = gql`
mutation Mutation($filter: LikeFilter) {
  deleteFromCommentCollection(filter: $filter) {
    records {
      id
      text
      nft_id
      user_id
      created_at
    }
  }
}
`

export const InsertFavo = gql`
mutation Mutation($objects: [FavoriteInsertInput!]!) {
  insertIntoFavoriteCollection(objects: $objects) {
    affectedCount
    records {
      id
      created_at
      user_id
      mainnet
      nft {
        mintbase_thing_id
      }
    }
  }
}
`

export const DeleteFavo = gql`
mutation DeleteFromFavoriteCollection($filter: FavoriteFilter) {
  deleteFromFavoriteCollection(filter: $filter) {
    records {
      id
    }
  }
}
`
