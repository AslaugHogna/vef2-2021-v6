import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import s from './Characters.module.scss';
import { Button } from '../button/Button';
import { ICharacter, IPaging } from '../../types';


type Props = { 
  people: ICharacter[],
  pages: IPaging,
  endCursor: string
};

/**
 * Hjálpar týpa ef við erum að filtera burt hugsanleg null gildi:
 *
 * const items: T = itemsWithPossiblyNull
 *  .map((item) => {
 *    if (!item) {
 *      return null;
 *    }
 *    return item;
 *  })
 *  .filter((Boolean as unknown) as ExcludesFalse);
 * items verður Array<T> en ekki Array<T | null>
 */
type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

export function Characters({ people, pages }: Props): JSX.Element {
  // TODO meðhöndla loading state, ekki þarf sérstaklega að villu state
  const [loading, setLoading] = useState<boolean>(false);

  // TODO setja grunngögn sem koma frá server
  const [characters, setCharacters] = useState<Array<ICharacter>>([]);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
    setCharacters(people);
  });

  useEffect(() => {
    setNextPage(pages.endCursor);
  }, []);
  
  const fetchMore = async (): Promise<void> => {
    let json;
    const url = '/api/characters';
    
   if(pages.hasNextPage) {
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

      <Button disabled={loading} onClick={fetchMore}>Fetch more</Button>
    </section>
  );
}
