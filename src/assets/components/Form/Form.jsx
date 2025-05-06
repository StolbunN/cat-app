import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import styles from "./Form.module.css";

function Form({setUrl}) {

  const [autoRefresh, setAutoRefresh] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const abortControllerRef = useRef(null);

  const getImg = async () => {
    if(abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController()

    try{
      const response = await fetch("https://api.thecatapi.com/v1/images/search", {
        signal: abortControllerRef.current.signal,
        method: "GET"
      });
      const data = await response.json();
      setUrl(data[0].url);
      
    } catch(error) {
      if(error.name !== "AbortError"){
        console.error(`Loading error: ${error}`)
      }
    }
  }

  const sendRequest = async (e) => {
    e.preventDefault();
    if(abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    getImg();
  }

  useEffect(() => {
    if(!autoRefresh || (autoRefresh && !enabled)){
      if(abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return;
    };
    getImg()
    const timerId = setInterval(() => getImg(), 5000);
    return () => {
      if(abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      clearInterval(timerId);
    }
  }, [autoRefresh, enabled])

  return (
    <form className={styles.form} onSubmit={sendRequest}>
      <div className={styles["input-wrapper"]}>
        <input type="checkbox" id="enabled" className={styles.input} checked={enabled} onChange={(e) => setEnabled(e.target.checked)}/>
        <label htmlFor="enabled" className={styles.label}>Enabled</label>
      </div>

      <div className={styles["input-wrapper"]}>
        <input type="checkbox" id="autoRefresh" className={styles.input} disabled={!enabled} checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)}/>
        <label htmlFor="autoRefresh" className={styles.label}>Auto-refrash every 5 seconds</label>
      </div>
      <Button disabled={!enabled}>Get Cat</Button>
    </form>
  )
}

export default Form;