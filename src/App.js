import { useState } from 'react';
import styles from './styles.module.scss';
import templates from './templates.json';

// download function using fetch, once img is downloaded create blob object from response and create url for the blob. then create link, trigger and remove from dom
function downloadImage(imageUrl) {
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'image.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error('There was an error downloading the image:', error);
    });
}

export default function App() {
  // set up state variables
  const [template, setTemplate] = useState(templates[0].id);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://api.memegen.link/images/aag.png',
  );
  // handling the template input field, with if else block that prevents faulty url being loaded.
  const handleTemplate = (event) => {
    const selectedTemplate = event.target.value;
    setTemplate(selectedTemplate);
    if (!topText && !bottomText) {
      setImageUrl(`https://api.memegen.link/images/${selectedTemplate.id}.png`);
    } else {
      setImageUrl(
        `https://api.memegen.link/images/${selectedTemplate.id}/${topText}/${bottomText}.png`,
      );
    }
  };

  // handling the submit text button to update the imageUrl and same if else block as handleTemplate function
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!topText && !bottomText) {
      setImageUrl(`https://api.memegen.link/images/${template}.png`);
    } else {
      setImageUrl(
        `https://api.memegen.link/images/${template}/${topText}/${bottomText}.png`,
      );
    }
  };

  // download click handler that creates an 'a' element,
  const handleDownload = () => {
    downloadImage(imageUrl);
  };

  return (
    <main>
      <section>
        <img
          className={styles.memepreview}
          alt="meme preview"
          src={imageUrl}
          data-test-id="meme-image"
        />
        <form className={styles.textinputs} onSubmit={handleSubmit}>
          <div className={styles.memeselector}>
            <label>
              Meme template
              <input value={template} onChange={handleTemplate} />
            </label>
          </div>
          <div className={styles.textinput}>
            <label>
              Top text
              <input
                value={topText}
                onChange={(event) => setTopText(event.target.value)}
                minLength={3}
              />
            </label>
          </div>
          <div className={styles.textinput}>
            <label>
              Bottom text
              <input
                value={bottomText}
                onChange={(event) => setBottomText(event.target.value)}
                minLength={3}
              />
            </label>
          </div>
          <button data-test-id="generate-meme">Generate Meme</button>
        </form>
        <div className={styles.downloadbutton}>
          <button onClick={handleDownload}>Download</button>
        </div>
      </section>
    </main>
  );
}
