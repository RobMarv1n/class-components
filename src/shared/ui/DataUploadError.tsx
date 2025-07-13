import { Component } from 'react';

interface DataUploadErrorProps {
  message: string;
}

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

export default DataUploadError;
