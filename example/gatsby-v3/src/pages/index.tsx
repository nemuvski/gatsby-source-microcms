import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
// biome-ignore lint/correctness/noUnusedImports: import React が必要なため無視
import React from 'react';
import type { FC } from 'react';

const HomePage: FC<PageProps> = ({ data }) => {
  return (
    <main>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </main>
  );
};

export const query = graphql`
  query HomePageQuery {
    allMicrocmsPosts(sort: { fields: publishedAt, order: DESC }) {
      nodes {
        id
        createdAt
        updatedAt
        publishedAt
        revisedAt

        sortIndex
        postsId

        internal {
          content
        }
      }
    }
    allMicrocmsSetting(sort: { fields: publishedAt, order: DESC }) {
      nodes {
        id
        createdAt
        updatedAt
        publishedAt
        revisedAt

        internal {
          content
        }
      }
    }
  }
`;

export default HomePage;
