/**
 * 🧼 Clean Gemini JSON output
 */
export const cleanJSON = (text) => {
    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
};

/**
 * 📊 Average calculator
 */
export const calculateAverage = (arr) => {
    if (!arr.length) return 0;

    const sum = arr.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / arr.length);
};

/**
 * 🔤 Normalize strings (for skill matching)
 */
export const normalize = (str) => {
    return str.toLowerCase().trim();
};