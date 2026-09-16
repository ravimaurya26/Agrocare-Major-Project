// src/utils/fileUtils.js

/**
 * Converts a File object to a Base64 string (data part only).
 * @param {File} file - The File object to convert.
 * @returns {Promise<string>} A Promise that resolves with the Base64 data string.
 */
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Only data part
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};