import type { PageProps } from 'gatsby';
import type { FC } from 'react';
import { graphql } from 'gatsby';

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
    allMicrocmsPosts(sort: { publishedAt: DESC }) {
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
    allMicrocmsSetting(sort: { publishedAt: DESC }) {
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
