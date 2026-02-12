const { GoogleGenerativeAI } = require("@google/generative-ai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/*
async function main() {
    const result = await model.generateContent("Explain how AI works in a few words");
    console.log(result.response.text());
}
// main();
*/

async function generateCaption(base64ImageFile) {
    const prompt = "Caption this image. Your caption should be short and concise. You use hashtags and emojis in the caption.";
    const imagePart = {
        inlineData: {
            data: base64ImageFile,
            mimeType: "image/jpeg",
        },
    };

    const result = await model.generateContent([prompt, imagePart]);
    return result.response.text();
}

module.exports = generateCaption;
