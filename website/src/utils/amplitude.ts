import amplitudeHttp from './amplitude-client';

export const initAmplitude = () => {
  const apiKey = '1e1d36fa96573d0839c6c3ccaffb7f62';

  amplitudeHttp.init(apiKey);
};

export const logEvent = (eventType: string, eventProperties: Record<string, any> = {}) => {
  if (process.env.NODE_ENV !== 'production') return;

  amplitudeHttp.logEvent(eventType, { event_properties: eventProperties });
};
