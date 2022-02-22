import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState( { text:'' });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
      setIsLoading(true);
      const res = await fetch(`/api/openai`, {
        body: JSON.stringify({
          name: search
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const data = await res.json();
      setData(data);
      setIsLoading(false);
    }};

    fetchData();
  }, [search]);

  return (
    <div className={styles.container}>
      <Head>
        <title>GPT-3 App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>
          AI Lyrics Generator
        </h1>

        <p className={styles.description}>A GPT-3 powered lyrics generator.</p>
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className={styles.input}
          placeholder='Enter artist name'
        />
        <button
          type="button"
          onClick={() => setSearch(query)}
          className={styles.button}
        >
          Generate
        </button>

        {!data.text ? (
          null
        ) : (
          <div className={styles.lyricsContainer}>
            <p className={styles.lyricsTitle}>Lyrics</p>
            <p className={styles.lyrics}>{data.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}