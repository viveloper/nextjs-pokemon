/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Details.module.css';

enum PokemonType {
  Grass = 'Grass',
  Poison = 'Poison',
  SuperAwesome = 'Super awesome',
  CrazyAwesome = 'Crazy awesome',
  MuchoCrazyAwesome = 'Mucho crazy awesome',
}

interface PokemonDetails {
  name: string;
  type: PokemonType[];
  stats: { name: string; value: number }[];
  image: string;
}

const Details: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  const [pokemon, setPokemon] = useState<PokemonDetails>();

  useEffect(() => {
    const getPokemon = async () => {
      const { data } = await axios.get<PokemonDetails>(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      setPokemon(data);
    };
    if (id) {
      getPokemon();
    }
  }, [id]);

  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
