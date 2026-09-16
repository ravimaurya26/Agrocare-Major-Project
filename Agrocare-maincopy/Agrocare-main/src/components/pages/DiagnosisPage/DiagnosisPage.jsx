import React, { useState, useRef } from 'react';
import PageWrapper from '../../layout/PageWrapper';
import DiagnosisResultCard from './DiagnosisResultCard';

// Base URL of your backend (server.js). Change this when you deploy
// (e.g. to your production API URL) instead of localhost.
const BACKEND_URL = "http://localhost:5000";
const DIAGNOSIS_ENDPOINT = `${BACKEND_URL}/api/diagnosis`;
const MAX_RETRIES = 3;

// Convert uploaded file to base64
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Only the data part
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

const DiagnosisPage = ({ isDarkMode }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [diagnosisResult, setDiagnosisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const resetDiagnosis = (fullReset = true) => {
        setSelectedImage(null);
        setDiagnosisResult(null);
        setError(null);
        if (fullReset && fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload a valid image file (JPEG or PNG).');
                resetDiagnosis(false);
                return;
            }
            setError(null);
            setDiagnosisResult(null);
            try {
                const base64 = await fileToBase64(file);
                setSelectedImage({
                    base64: base64,
                    mimeType: file.type,
                    name: file.name
                });
            } catch (e) {
                setError('Error reading file.');
                setSelectedImage(null);
            }
        }
    };

    const callDiagnosisApi = async () => {
        if (!selectedImage) {
            setError('Please select an image first.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setDiagnosisResult(null);

        try {
            // Backend (diagnosisController.js) expects: { image: "data:<mime>;base64,<data>" }
            // and forwards it as an image_url to the vision model, and already
            // applies the diagnosis system prompt + JSON schema itself.
            const imageDataUrl = `data:${selectedImage.mimeType};base64,${selectedImage.base64}`;
            const payload = { image: imageDataUrl };

            let parsedResult = null;
            let lastError = new Error("Initial API call failed.");

            for (let i = 0; i < MAX_RETRIES; i++) {
                try {
                    const response = await fetch(DIAGNOSIS_ENDPOINT, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`API returned status ${response.status}. Message: ${errorText.substring(0, 200)}`);
                    }

                    const data = await response.json();

                    if (data.success && data.result) {
                        parsedResult = data.result;
                        break;
                    } else {
                        throw new Error(data.message || "API returned no diagnosis result.");
                    }

                } catch (e) {
                    lastError = e;
                    if (i < MAX_RETRIES - 1) await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
                }
            }

            if (parsedResult) {
                setDiagnosisResult(parsedResult);
            } else {
                setError(`Failed after ${MAX_RETRIES} attempts. Last error: ${lastError.message}`);
            }

        } catch (e) {
            setError(`Unexpected error: ${e.message}`);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTriggerUpload = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        fileInputRef.current.click();
    };

    const imagePreviewUrl = selectedImage ? `data:${selectedImage.mimeType};base64,${selectedImage.base64}` : null;
    const buttonClass = "w-full py-3 font-semibold rounded-lg transition duration-300 shadow-md";

    return (
        <PageWrapper title="AI Leaf Diagnosis" isDarkMode={isDarkMode}>
            {/* Image Upload */}
            <div className="mb-8">
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    className="hidden"
                    disabled={isLoading}
                />
                {imagePreviewUrl ? (
                    <div className="relative border-4 border-emerald-500 rounded-xl overflow-hidden shadow-lg">
                        <img src={imagePreviewUrl} alt="Selected Leaf" className="w-full h-80 object-contain p-2 bg-gray-100 dark:bg-gray-700" />
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button onClick={() => resetDiagnosis(true)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition" disabled={isLoading}>❌</button>
                            <button onClick={handleTriggerUpload} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition" disabled={isLoading}>🔄</button>
                        </div>
                    </div>
                ) : (
                    <div onClick={handleTriggerUpload} className="p-6 rounded-xl border-2 border-dashed border-emerald-500 bg-emerald-500/10 h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-500/20 transition">
                        <span className="text-6xl mb-2">📸</span>
                        <span className="text-xl font-semibold text-emerald-400">Click to Upload Image</span>
                        <span className="text-sm mt-1 text-gray-500">Supported: JPEG, PNG</span>
                    </div>
                )}
            </div>

            {/* Action Button */}
            <div className="flex space-x-4 mb-8">
                <button
                    onClick={callDiagnosisApi}
                    disabled={!selectedImage || isLoading}
                    className={`${buttonClass} ${selectedImage && !isLoading ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                >
                    {isLoading ? 'Analyzing Crop...' : 'Get Diagnosis & Treatment'}
                </button>
            </div>

            {/* Result */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
                {error && <div className="p-4 bg-red-600/10 text-red-400 rounded-lg border border-red-500">{error}</div>}
                {diagnosisResult && <DiagnosisResultCard diagnosis={diagnosisResult} isDarkMode={isDarkMode} />}
                {!selectedImage && !diagnosisResult && !error && (
                    <p className="text-gray-500 italic">Upload a leaf image to get instant AI diagnosis.</p>
                )}
            </div>
        </PageWrapper>
    );
};

export default DiagnosisPage;