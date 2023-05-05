import styles from './styles.module.scss';

function InputForm() {
  const [values, setValues] = useState({ topText: '', bottomText: '' });

  return (
    <form className={styles.textinputs}>
      <div className={styles.textinput}>
        <label>
          Top Text:
          <input
            value={values.topText}
            onChange={set('topText')}
            minLength={3}
          />
        </label>
      </div>
      <div className={styles.textinput}>
        <label>
          Bottom Text:{' '}
          <input
            value={values.topText}
            onChange={set('bottomText')}
            minLength={3}
          />
        </label>
      </div>
      <button>Submit Text</button>
    </form>
  );
}

export default InputForm;
