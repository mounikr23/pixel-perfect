import React from 'react';
import Modal from 'react-modal';
import './App.css';

function App() {
  return (
    <div className="App">
      <Modal
        className="Modal"
        overlayClassName="overlay"
        isOpen={true}>
        <div className="ModalHeadingWrapper">
          <h2 className="Heading">Setting up categories and attributes for project</h2>
          <p className="Description">This includes setting up categories, file attributes and label attributes with custom keyboard shortcuts for each label.</p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
