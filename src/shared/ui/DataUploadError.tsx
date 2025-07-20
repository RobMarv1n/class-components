import { Component } from 'react';

class DataUploadError extends Component<DataUploadErrorProps> {
  render() {
    const { message } = this.props;

    return (
      <div style={{ color: 'red', padding: '12px' }}>
        <h2>Data upload error</h2>
        <p>{message}</p>
      </div>
    );
  }
}

interface DataUploadErrorProps {
  message: string;
}

export default DataUploadError;
