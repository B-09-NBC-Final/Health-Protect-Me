'use client'
import styles from './Loading.module.css'

const LoadingPage = () => {
  const loadingText = "Loading...";
  const additionalText = "잠시만 기다려주세요. 곧 결과가 나옵니다";

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
      <div className={styles.additionalText}>
        {additionalText.split('').map((char, index) => (
          <span key={index} style={{ 
            animationDelay: `${0.05 * index}s`,
            animation: `${styles.fadeIn} 0.5s ease-in-out forwards`
          }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;