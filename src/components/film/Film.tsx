import Link from 'next/link';
import { IFilm } from '../../types';

import s from './Film.module.scss';

type Props = {
  film: IFilm;
};

export function Film({ film }: Props): JSX.Element {
  return (
    <section className={s.film}>
      <h2 className={s.film__title}>
        {`Episode ${film.episodeID}: ${film.title}`}
      </h2>
      <div className={s.filmbody}>
        <p className={s.crawl}>{film.openingCrawl}</p>
        <div className={s.characterinfo}>
          <p className={s.charactersheading}>Characters</p>
          <ul className={s.characters}>
            {film.characterConnection.characters.map(({ id, name }) =>
              <Link key={id} href={`/characters/${id}`}>{name}</Link>,
              )}
          </ul>
        </div>
      </div>
      <hr></hr>
    </section>
  );
}
