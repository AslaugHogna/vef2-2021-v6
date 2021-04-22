// fetch er sjálfgefið hér; next sér um að importa

import { characterFragment } from '../graphql/characterFragment';
import { IPeopleResponse } from '../types';

const baseUrl = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

/**
 * Run a GraphQL query against the SWAPI GraphQL API
 * @param query GraphQL query to run against SWAPI GraphQL
 * @param variables Variables for query
 * @returns Result as given generic type T
 */
export async function fetchSwapi<T>(
  query: string,
  variables: Record<string, string> = {},
): Promise<T> {
  const serializedVariables = encodeURIComponent(JSON.stringify(variables));
  let result = null;

  try {
    result = await fetch(
      `${baseUrl}?query=${query}&variables=${serializedVariables}`,
      { method: 'POST' },
    );
  } catch (e) {
    console.error('Error fetching from SWAPI', e);
    throw e;
  }

  if (!result.ok) {
    console.info(await result.text());
    throw new Error(`Error fetching from SWAPI, non 200 status: ${result.status}`);
  }

  const json = await result.json();
  return json.data as T;
}

// Gott að hafa sameiginlegt fall hér til að sækja fyrstu síðu á /pages/character/index.tsx og
// næstu á /pages/api/character.ts
export async function fetchCharacters(after = ''): Promise<IPeopleResponse> {
  const query = `
    query($after: String = "${after}") {
      
      allPeople(first: 10 after: $after) {
          people {
            ...character
          }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    ${characterFragment}
  `;

  return fetchSwapi<IPeopleResponse>(query, { after });
}
