import { useEffect, useState } from "react";
import componentStyles from './../styles/RippleButton.module.scss';
import PropTypes from 'prop-types'


const RippleButton = ({ children, onClick, sx }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      className={componentStyles.rippleButton}
      style={sx}
      onClick={e => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className={componentStyles.ripple}
          style={{
            left: coords.x,
            top: coords.y
          }}
        />
      ) : (
        ''
      )}
      <span>{children}</span>
    </button>
  );
};

RippleButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
  sx: PropTypes.object
}

export default RippleButton;