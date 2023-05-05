import { useState } from 'react';
import styles from './styles.module.scss';

export default function App() {
  const template = 'doge';
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setImageUrl(
      `https://api.memegen.link/images/${template}/${topText}/${bottomText}.png`,
    );
  };
  return (
    <main>
      <section>
        <img className={styles.memepreview} alt="meme preview" src={imageUrl} />
        <form className={styles.textinputs} onSubmit={handleSubmit}>
          <div className={styles.textinput}>
            <label>
              Top Text:
              <input
                value={topText}
                onChange={(event) => setTopText(event.target.value)}
                minLength={3}
              />
            </label>
          </div>
          <div className={styles.textinput}>
            <label>
              Bottom Text:{' '}
              <input
                value={bottomText}
                onChange={(event) => setBottomText(event.target.value)}
                minLength={3}
              />
            </label>
          </div>
          <button>Submit Text</button>
        </form>

        <div className={styles.memeselector}></div>
        <div className={styles.downloadbutton}></div>
      </section>
    </main>
  );
}
