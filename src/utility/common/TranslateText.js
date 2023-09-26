import axios from 'axios';

async function translateText(text, targetLang) {
  try {
    const response = await axios.post(
      'https://translation.googleapis.com/language/translate/v2',
      {},
      {
        params: {
          q: text,
          target: targetLang,
          key: import.meta.env.VITE_APP_GOOGLE_CLOUD_API_KEY,
        },
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return '';
  }
}

export default translateText;
