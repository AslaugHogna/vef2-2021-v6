import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Characters } from '../../components/characters/Characters';

import { Layout } from '../../components/layout/Layout';
import { fetchCharacters } from '../../lib/swapi';
import { ICharacter, IPaging } from '../../types';

export type PageProps = {
  peopleResponse: Array<ICharacter> | null; 
  endCursor: string;
  pages: IPaging;
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { peopleResponse, endCursor, pages } = data;
  if (!peopleResponse) {
    return (<p>error</p>);
  }

  return (
    <Layout>
      <Head>
        <title>Star Wars characters</title>
      </Head>
      <h1>Star Wars characters</h1>
      <Characters people={peopleResponse} pages={pages} endCursor={endCursor} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const peopleResponse = await fetchCharacters();
  return {
    props: {
      peopleResponse: peopleResponse?.allPeople?.people  ?? null,
      endCursor: peopleResponse?.allPeople?.pageInfo?.endCursor ?? null,
      pages: peopleResponse?.allPeople?.pageInfo ?? null,
    },
  };
};
