'use client';
import styles from './Loading.module.css';

const LoadingPage = () => {
  const loadingText = 'Loading...';

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingIcon}>
        <div className={`${styles.petal} ${styles.petal1}`}></div>
        <div className={`${styles.petal} ${styles.petal2}`}></div>
        <div className={`${styles.petal} ${styles.petal3}`}></div>
        <div className={`${styles.petal} ${styles.petal4}`}></div>
      </div>
      <div className={styles.loadingText}>
        {loadingText.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${0.1 * index}s` }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
