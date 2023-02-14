import amplitudeHttp from './amplitude-client';

export const initAmplitude = () => {
  const apiKey = process.env.AMPLITUDE_API_KEY;

  if (!apiKey) {
    return;
  }

  amplitudeHttp.init(apiKey);
};

export const logEvent = (eventType: string, eventProperties: Record<string, any> = {}) => {
  if (process.env.NODE_ENV === 'development') return;

  amplitudeHttp.logEvent(eventType, { event_properties: eventProperties });
};
