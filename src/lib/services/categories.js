import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export async function getCategories() {
  const { data } = await client.query({
    query: GET_CATEGORIES,
    fetchPolicy: "no-cache",
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });
  return data?.categories?.nodes;
}

const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
      count
    }
  }
`;

export async function getCategoryBySlug(slug) {
  const { data } = await client.query({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug },
    fetchPolicy: "no-cache",
    context: { fetchOptions: { cache: "no-store" } },
  });
  return data?.category;
}