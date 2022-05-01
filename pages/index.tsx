/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<Pokemon[]>(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  );
  return {
    props: {
      pokemonList: data,
    },
  };
};

interface Props {
  pokemonList: Pokemon[];
}

const Home: NextPage<Props> = ({ pokemonList }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemonList.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
