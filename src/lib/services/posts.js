import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

const POST_FIELDS = gql`
  fragment PostFields on Article {
    id
    title
    slug
    date
    excerpt
    featuredImage {
      url
      altText: fileName
    }
    categories {
      name
      slug
    }
    author {
      name
    }
  }
`;

const GET_POSTS = gql`
  ${POST_FIELDS}
  query GetPosts {
    articles(first: 20, orderBy: date_DESC) {
      ...PostFields
    }
  }
`;

const GET_POSTS_BY_CATEGORY = gql`
  ${POST_FIELDS}
  query GetPostsByCategory($slug: String!, $first: Int!) {
    articles(
      first: $first
      orderBy: date_DESC
      where: { categories_some: { slug: $slug } }
    ) {
      ...PostFields
    }
  }
`;

const GET_POST_BY_SLUG = gql`
  ${POST_FIELDS}
  query GetPostBySlug($slug: String!) {
    article(where: { slug: $slug }) {
      ...PostFields
      content {
        html
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
  return data?.articles;
}

export async function getPostsByCategory(slug, first = 5) {
  const { data } = await client.query({
    query: GET_POSTS_BY_CATEGORY,
    variables: { slug, first },
    fetchPolicy: "no-cache",
    context: { fetchOptions: { cache: "no-store" } },
  });
  return data?.articles;
}

export async function getPostBySlug(slug) {
  const { data } = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
    fetchPolicy: "no-cache",
    context: { fetchOptions: { cache: "no-store" } },
  });
  return data?.article;
}