import s from './Button.module.css';

const Button = ({ onLoad }) => {
  return (
    <div className={s.box}>
      <button className={s.Button} type="button" onClick={onLoad}>
        Load more
      </button>
    </div>
  );
};

export default Button;
