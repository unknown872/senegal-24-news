import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    slug
    date
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    author {
      node {
        name
      }
    }
  }
`;

const GET_POSTS = gql`
  ${POST_FIELDS}
  query GetPosts {
    posts(first: 20) {
      nodes {
        ...PostFields
      }
    }
  }
`;

const GET_POSTS_BY_CATEGORY = gql`
  ${POST_FIELDS}
  query GetPostsByCategory($slug: String!, $first: Int!) {
    posts(where: { categoryName: $slug }, first: $first) {
      nodes {
        ...PostFields
      }
    }
  }
`;

export async function getPosts() {
  const { data } = await client.query({
    query: GET_POSTS,
    fetchPolicy: "no-cache",
    context: { fetchOptions: { cache: "no-store" } },
  });
  return data?.posts?.nodes;
}

export async function getPostsByCategory(slug, first = 5) {
  const { data } = await client.query({
    query: GET_POSTS_BY_CATEGORY,
    variables: { slug, first },
    fetchPolicy: "no-cache",
    context: { fetchOptions: { cache: "no-store" } },
  });
  return data?.posts?.nodes;
}

const GET_POST_BY_SLUG = gql`
  ${POST_FIELDS}
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      ...PostFields
      content
    }
  }
`;

export async function getPostBySlug(slug) {
  const { data } = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
    fetchPolicy: "no-cache",
    context: { fetchOptions: { cache: "no-store" } },
  });
  return data?.postBy;
}