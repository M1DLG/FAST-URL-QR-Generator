document.addEventListener('DOMContentLoaded', async function () {
  // Automatically trigger the click event when the page loads
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTabUrl = encodeURIComponent(tab.url);
  const qrCodeUrl = `https://quickchart.io/qr?ecLevel=H&size=999&format=png&text=${currentTabUrl}`;

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