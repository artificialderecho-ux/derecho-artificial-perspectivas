import { google } from 'googleapis';

const INDEXING_API_SCOPES = ['https://www.googleapis.com/auth/indexing'];

async function notifyGoogle(url) {
  try {
    const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

    const jwtClient = new google.auth.JWT(
      serviceAccountKey.client_email,
      null,
      serviceAccountKey.private_key,
      INDEXING_API_SCOPES,
      null
    );

    await jwtClient.authorize();

    const indexing = google.indexing({ version: 'v3', auth: jwtClient });

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    return response;
  } catch (error) {
    console.error('Error notifying Google:', error.message);
    throw error;
  }
}

export { notifyGoogle };
