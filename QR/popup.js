document.addEventListener('DOMContentLoaded', async function () {
  // Automatically trigger the click event when the page loads
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTabUrl = encodeURIComponent(tab.url);
  
  // Main method (Quickchart.io open API) - Use one or other.
  const qrCodeUrl = `https://quickchart.io/qr?ecLevel=H&size=1000&format=png&text=${currentTabUrl}`;

  // Alternative method (Google Charts API)- Use one or other.
  // const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=500&chl=${currentTabUrl}`;

  console.log('Generated QR Code URL:', qrCodeUrl);

  // Create a unique filename for the downloaded PNG
  const filename = `QR_code_${Date.now()}.png`;

  // Use the chrome.downloads API to download the PNG
  chrome.downloads.download({ url: qrCodeUrl, filename: filename }, (downloadId) => {
    if (downloadId !== undefined) {
      console.log('QR code PNG downloaded.');
    } else {
      console.error('Failed to download QR code PNG.');
    }
  });
});