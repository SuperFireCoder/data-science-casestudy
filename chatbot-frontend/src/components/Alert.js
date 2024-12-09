const Alert = () => (
  <div
    style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      backgroundColor: '#ffcccb',
      color: 'red',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      lineHeight: '1.5',
    }}
  >
    <strong>Message Submission Help:</strong>
    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
      <li>
        <strong>Press Enter:</strong> To submit your message, simply press Enter (or Ctrl + Enter) on your keyboard.
      </li>
      <li>
        <strong>Click Submit Button:</strong> Alternatively, click the <strong>Submit</strong> button to send your message.
      </li>
      <li>
        <strong>Need Help?</strong> If you have any questions, feel free to ask!
      </li>
    </ul>
    <p style={{ marginTop: '10px', fontSize: '12px', fontStyle: 'italic' }}>
      This message will disappear in a few seconds.
    </p>
  </div>
);

export default Alert;