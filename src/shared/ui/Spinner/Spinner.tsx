import { Component } from 'react';
import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }
}

export default Spinner;
