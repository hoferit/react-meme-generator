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
// function that corrects /?# and uses regular expressions to replace the characters
function autoCorrect(text, correction) {
  const reg = new RegExp(
    Object.keys(correction)
      .map((c) => '\\' + c)
      .join('|'),
    'g',
  );
  return text.replace(reg, (matched) => correction[matched]);
}

const correction = {
  '#': '~h',
  '/': '~s',
  '?': '~q',
};

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
    const correctedTopText = autoCorrect(topText, correction);
    const correctedBottomText = autoCorrect(bottomText, correction);
    setTemplate(selectedTemplate);
    if (!topText && !bottomText) {
      setImageUrl(`https://api.memegen.link/images/${selectedTemplate.id}.png`);
    } else {
      setImageUrl(
        `https://api.memegen.link/images/${selectedTemplate.id}/${correctedTopText}/${correctedBottomText}.png`,
      );
    }
  };

  // handling the submit text button to update the imageUrl and same if else block as handleTemplate function
  const handleSubmit = (event) => {
    event.preventDefault();
    const correctedTopText = autoCorrect(topText, correction);
    const correctedBottomText = autoCorrect(bottomText, correction);
    if (!correctedTopText && !correctedBottomText) {
      setImageUrl(`https://api.memegen.link/images/${template}.png`);
    } else {
      setImageUrl(
        `https://api.memegen.link/images/${template}/${correctedTopText}/${correctedBottomText}.png`,
      );
    }
  };

  // download click handler that creates an 'a' element,
  const handleDownload = () => {
    downloadImage(imageUrl);
  };

  return (
    <div className={styles.appbody}>
      <main>
        <section>
          <form className={styles.textinputs} onSubmit={handleSubmit}>
            <img
              className={styles.memepreview}
              alt="meme preview"
              src={imageUrl}
              data-test-id="meme-image"
            />
            <div className={styles.textinput}>
              <label>
                Meme template
                <input value={template} onChange={handleTemplate} />
              </label>
            </div>
            <div className={styles.descriptiontext}>
              <p>
                Type in the meme template of your choice!
                <br />
                Type in Top and Bottom Text and press generate
                <br /> to create your own Meme. You can download the <br />{' '}
                created image with the download button.
              </p>
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
            <div className={styles.downloadbutton}>
              <button onClick={handleDownload}>Download</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
