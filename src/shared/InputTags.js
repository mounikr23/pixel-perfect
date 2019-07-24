import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './InputTags.css';
import AttributeItem from '../AttributeItem';

class InputTags extends Component {

 constructor(props) {
  super(props);
  this.input = React.createRef();
  this.state = {
   tags: []
  }
 }

 handleValueChange = (e) => {
  const { onUpdateValue } = this.props;
  const val = e.target.value;

  if (e.key === 'Enter' && val) {
   this.input.current.value = '';
   onUpdateValue && onUpdateValue(val);
  }
 }
 render() {
  const { tags, onRemoveTagClick } = this.props;
  return (
   <div className="TagsContainer">
    {
     tags.length ? (
      <Fragment>
       {
        tags.map(tag => (
         <AttributeItem attribute={tag} onRemoveTagClick={onRemoveTagClick} />
        ))
       }
      </Fragment>
     ) : null
    }
    <input
     ref={this.input}
     className="TagsInputClass"
     placeholder="Start typing attribute value.."
     onChange={this.handleValueChan}
     onKeyDown={this.handleValueChange}
    />
   </div>
  )
 }
}

InputTags.propTypes = {
 tags: PropTypes.array,
 onUpdateValue: PropTypes.func,
 onRemoveTagClick: PropTypes.func,
}

export default InputTags;