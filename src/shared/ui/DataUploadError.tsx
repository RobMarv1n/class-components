function DataUploadError({ message }: DataUploadErrorProps) {
  return (
    <div style={{ color: 'red', padding: '12px' }}>
      <h2>Data upload error</h2>
      <p>{message}</p>
    </div>
  );
}

type DataUploadErrorProps = {
  message: string;
};

export default DataUploadError;
