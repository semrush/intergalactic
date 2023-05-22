import { parse } from 'bowser';
import amplitudeHttp from './amplitude-client';

export const initAmplitude = () => {
  const apiKey = '1e1d36fa96573d0839c6c3ccaffb7f62';
  const systemInfo = parse(window.navigator.userAgent);
  const language = window.navigator.language;

  amplitudeHttp.init(apiKey).sendUserProperties({
    OS: `${systemInfo.os.name} ${systemInfo.os.versionName} v${systemInfo.os.version}`,
    platform: `${systemInfo.platform.vendor} ${systemInfo.platform.type}`,
    language,
  });
};

export const logEvent = (eventType: string, eventProperties: Record<string, any> = {}) => {
  if (process.env.NODE_ENV !== 'production') return;

  amplitudeHttp.logEvent(eventType, { event_properties: eventProperties });
};
