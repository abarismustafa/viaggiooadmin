export function convertToIST(date) {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    
    return new Date(date).toLocaleString('en-IN', options);
  }