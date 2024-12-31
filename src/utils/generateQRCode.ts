import QRCode from 'qrcode';

/**
 * Generates a QR code image data URL from the provided input string.
 * 
 * @param input The string to encode into a QR code (e.g., patient ID, URL, etc.)
 * @returns A promise that resolves to the data URL of the QR code image
 */
export const generateQRCode = async (input: string): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(input, {
      errorCorrectionLevel: 'H', // High error correction (more robust QR code)
      type: 'image/png', // Output image format
    });
    return qrCodeDataURL;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Ensure error is of type 'Error' so that we can access message
      throw new Error('Error generating QR code: ' + error.message);
    } else {
      // Handle any unknown error types
      throw new Error('An unknown error occurred while generating QR code');
    }
  }
};


