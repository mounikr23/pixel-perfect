import React, { useState } from 'react';
import Modal from 'react-modal';
import _ from 'lodash';
import cx from 'classnames';
import AttributeItem from './AttributeItem';
import Button from './Button';
import InputTags from './shared/InputTags';
import './App.css';

function App() {
  const defaultAttributes = [
    {
      id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      name: 'direction',
      shortcut: 's',
      values: ['same', 'opposite', 'diagonal']
    }
  ];
  const [attributes, setAttributes] = useState(defaultAttributes);
  const [tempData, setTempData] = useState({});
  const [tags, setTags] = useState([]);
  const leftTabs = [
    {
      id: 'tab1',
      title: 'Box',
      isActive: true
    },
    {
      id: 'tab2',
      title: 'Lane',
      isActive: false
    },
    {
      id: 'tab3',
      title: 'Point',
      isActive: false
    },
    {
      id: 'tab4',
      title: 'Polygon',
      isActive: false
    }
  ];
  const contentTabs = [
    {
      id: 'content1',
      title: 'Categories',
      isActive: false
    },
    {
      id: 'content2',
      title: 'File Attributes',
      isActive: true
    },
    {
      id: 'content3',
      title: 'Label Attributes',
      isActive: false
    }
  ];
  function handleValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const newValue = {
      ...tempData,
      [name]: value
    };
    setTempData(newValue)
  }

  function handleAddClick() {
    if (!checkValidity()) {
      let newAttributes = attributes.length ? [...attributes] : [];
      tempData.id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
      tempData.values = tags;
      newAttributes.push(tempData);
      setTempData({ id: '', name: '', values: [], shortcut: '' });
      setTags([]);
      setAttributes(newAttributes);
    }
  }

  function checkValidity() {
    const { name, shortcut } = tempData;;
    if (!name || !tags.length || !shortcut) {
      return true
    } else {
      return false;
    }
  }

  function handleTagsAddition(val) {
    const newTags = [...tags, val]
    setTags(newTags)
  }

  function handleDeleteItem(val) {
    const itemIndex = _.findIndex(attributes, { id: val });
    let tempAttr = [...attributes];
    tempAttr.splice(itemIndex, 1)
    setAttributes(tempAttr);
  }

  function handleRemoveTag(val, id) {
    const item = _.find(attributes, { id: id });
    let tempValue = [...item.values];
    tempValue.splice(tempValue.indexOf(val), 1);
    item.values = tempValue
    let newAttributes = [...attributes];
    newAttributes.splice(_.findIndex(attributes, { id: val }), 1);
    newAttributes = [...newAttributes, item];
    setAttributes(newAttributes);
  }

  function handleNameClick(attribute) {
    setTempData(attribute);
    setTags(attribute.values);
  }

  return (
    <div className="App">
      <Modal
        className="Modal"
        overlayClassName="overlay"
        isOpen={true}>
        <div className="ProgressContainer">
          <div className="Circle FirstCheck"><p className="FirstText">&#x2713;</p></div>
          <div className="FirstLine"></div>
          <div className="Circle SecondCheck"><p className="SecondText">2</p></div>
          <div className="SecondLine"></div>
          <div className="ThirdCheck"><p className="ThirdText">3</p></div>
        </div>
        <div className="ModalHeadingWrapper">
          <h2 className="Heading">Setting up categories and attributes for project</h2>
          <p className="Description">This includes setting up categories, file attributes and label attributes with custom keyboard shortcuts for each label.</p>
        </div>
        <div className="Content">
          <div className="LhsContent">
            {
              leftTabs.map(tab => (
                <div className={cx("LhsItem", { "active": tab.isActive })} key={tab.id}>
                  <p className="LhsItemText">{tab.title}</p>
                </div>
              ))
            }
          </div>
          <div className="RhsContent">
            <div className="RhsTabs">
              {
                contentTabs.map(contentTab => (
                  <div key={contentTab.id} className={cx("RhsTab", { "activeTab": contentTab.isActive })}>
                    <p className="RhsItemText">{contentTab.title}</p>
                  </div>
                ))
              }
            </div>
            <div className="RhsContentWrapper">
              {
                attributes.length && attributes.map(attribute => (
                  <div className="Card" key={attribute.id} onClick={() => handleNameClick(attribute)}>
                    <div className="CardHeader">
                      <p className="CardTitle"><span>{attribute.name}</span> &nbsp;<i className="CardInstruction">{`(Ctrl+Shift+${attribute.shortcut})`}</i></p>
                      <div className="CrossIcon" onClick={() => handleDeleteItem(attribute.id)}>+</div>
                    </div>
                    <div className="AttributeWrapper">
                      {
                        attribute.values.map(value => (
                          <AttributeItem
                            key={value}
                            attribute={value}
                            onRemoveTagClick={() => handleRemoveTag(value, attribute.id)}
                          />
                        ))
                      }
                    </div>
                  </div>
                ))
              }
              <div className="Card Attributes">
                <div>
                  <div className="AttributeWrapper">
                    <input
                      name="name"
                      value={tempData.name}
                      onChange={handleValueChange}
                      className="Dashed AttributeInput"
                      placeholder="Enter Attribute Name"
                    />
                    <input
                      name="shortcut"
                      value={tempData.shortcut}
                      onChange={handleValueChange}
                      className="Dashed ShortCutInput"
                      placeholder="(ADD KEYBOARD SHORTCUT)"
                    />
                  </div>
                  <InputTags onUpdateValue={handleTagsAddition} tags={tags} />
                </div>
                <div className="ButtonWrapper">
                  <button className="AddButton" disabled={checkValidity()} onClick={handleAddClick}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Footer">
          <Button title='Close' isSecondaryButton />
          <div>
            <Button className="chevronLeft" title='Previous step' isSecondaryButton />
            <Button className="chevronRight" title='Next step' />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
