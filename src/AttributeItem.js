import React from 'react';
import PropTypes from 'prop-types';
import './AttributeItem.css'

function AttributeItem({ attribute, onRemoveTagClick }) {
 function handleCrossClick(attribute) {
  onRemoveTagClick && onRemoveTagClick(attribute)
 }

 return (
  <div className="Attribute">
   <p className="AttibuteName">{attribute}</p>
   <p className="Cross" onClick={handleCrossClick}>+</p>
  </div>
 );
}

AttributeItem.propTypes = {
 attribute: PropTypes.string,
 onRemoveTagClick: PropTypes.func,
}

export default AttributeItem;