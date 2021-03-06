import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import s from './Characters.module.scss';
import { Button } from '../button/Button';
import { ICharacter, IPaging } from '../../types';

let hasNP = true;
type Props = {
  people: ICharacter[],
  pages: IPaging,
  endCursor: string
};

export function Characters({ people, pages }: Props): JSX.Element {
  // TODO meðhöndla loading state, ekki þarf sérstaklega að villu state
  const [loading, setLoading] = useState<boolean>(false);

  // TODO setja grunngögn sem koma frá server
  const [characters, setCharacters] = useState<Array<ICharacter>>([]);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
    setCharacters(people);
  }, [people]);

  useEffect(() => {
    setNextPage(pages.endCursor);
  }, [pages.endCursor]);

  const fetchMore = async (): Promise<void> => {
    let json;
    const url = '/api/characters';

    if (hasNP) {
      setLoading(true);

      try {
        const result = await fetch(`${url}?after=${nextPage}`);
        if (!result.ok) {
          throw new Error('result not ok');
        }
        json = await result.json();
        json.allPeople.people.map((person: ICharacter) => (
          characters.push(person)
        ));
        setNextPage(json.allPeople.pageInfo.endCursor);
        hasNP = json.allPeople.pageInfo.hasNextPage;
      } catch (e) {
        setError(error);
        return;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>

      <p>{loading ? 'Sæki gögn...' : ''}</p>

      <Button disabled={loading || !hasNP} onClick={fetchMore}>Fetch more</Button>
    </section>
  );
}
