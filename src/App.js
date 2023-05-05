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
  const [template, setTemplate] = useState(templates[51].id);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://api.memegen.link/images/doge.png',
  );
  // Enter Key handling function for the template input field
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // first i also set the image url, so it is independent of the 'submit text' button.
      setImageUrl(
        `https://api.memegen.link/images/${template}/${topText}/${bottomText}.png`,
      );
      // then i run a .find array method(and transform spelling to lowercase) to find the template name.
      const selectedTemplate = templates.find(
        (templateName) => templateName.id === template.toLowerCase(),
      );
      // if the template-name exists i set the useState variable to the found template id.
      if (selectedTemplate) {
        setTemplate(selectedTemplate.id);
        // if not i display an error
      } else {
        alert(`Template '${template}' not found!`);
      }
    }
  };
  // handling the submit text button to update the imageUrl
  const handleSubmit = (event) => {
    event.preventDefault();
    setImageUrl(
      `https://api.memegen.link/images/${template}/${topText}/${bottomText}.png`,
    );
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
          <div className={styles.textinput}>
            <label>
              Top Text
              <input
                value={topText}
                onChange={(event) => setTopText(event.target.value)}
                minLength={3}
              />
            </label>
          </div>
          <div className={styles.textinput}>
            <label>
              Bottom Text{' '}
              <input
                value={bottomText}
                onChange={(event) => setBottomText(event.target.value)}
                minLength={3}
              />
            </label>
          </div>
          <button data-test-id="generate-meme">Generate Meme</button>
        </form>
        <div className={styles.memeselector}>
          <label>
            Meme template
            <input value={template} onKeyDown={handleKeyDown} />
          </label>
        </div>
        <div className={styles.downloadbutton}>
          <button onClick={handleDownload}>Download</button>
        </div>
      </section>
    </main>
  );
}
