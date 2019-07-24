import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Button.css';

function Button({ title, isSecondaryButton, className }) {
 return (
  <button className={cx("DefaultButton", className, { "SecondaryButton": isSecondaryButton })}>{title}</button>
 )
}

Button.propTypes = {
 title: PropTypes.string,
 className: PropTypes.string,
 isSecondaryButton: PropTypes.bool,
}
export default Button;