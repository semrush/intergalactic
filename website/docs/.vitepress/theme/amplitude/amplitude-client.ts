import 'whatwg-fetch';
import { nanoid } from 'nanoid';
import { getCookie, setCookie, AMPLITUDE_COOKIE_NAME, AMPLITUDE_COOKIE_EXP_DATE } from './cookie';
import Bowser from 'bowser';

declare global {
  interface Window {
    cookiehub: any;
  }
}

type IdentificationParameter = {
  platform: string;
  os_name: string;
  os_version: string;
  device_brand: string;
  device_manufacturer: string;
  device_model: string;
  country: string;
  language: string;
  user_properties: any;
};

const getThemePreference = () => {
  return document.body.classList.contains('dark') ? 'dark' : 'light';
};

const getIsConsented = (getExternalProviderConsentStatus: () => boolean): boolean => {
  const hasCookieHubConsented = Boolean(
    window.cookiehub !== undefined &&
      window.cookiehub.hasConsented !== undefined &&
      window.cookiehub.hasConsented('analytics') === true,
  );
  const hasExternalProviderConsented =
    typeof getExternalProviderConsentStatus === 'function' &&
    getExternalProviderConsentStatus() === true;

  return hasCookieHubConsented || hasExternalProviderConsented;
};

const AMPLITUDE_HTTP_HANDLER = 'https://api2.amplitude.com/2/httpapi';
const AMPLITUDE_HTTP_IDENTIFY_HANDLER = 'https://api2.amplitude.com/identify';

const amplitudeHttp = {
  setDeviceId(): string {
    if (!this.deviceId) {
      this.deviceId = nanoid();
      setCookie(AMPLITUDE_COOKIE_NAME, this.deviceId, AMPLITUDE_COOKIE_EXP_DATE);
    }

    return this.deviceId;
  },

  init(
    apiKey: string,
    options: { getExternalConsentStatusCb?: () => void; amplitudeFetchCb?: () => void } = {},
  ) {
    this.apiKey = apiKey;
    this.options = options;
    this.getExternalConsentStatusCb =
      options && typeof options.getExternalConsentStatusCb === 'function'
        ? options.getExternalConsentStatusCb
        : undefined;
    this.amplitudeFetchCb =
      options && typeof options.amplitudeFetchCb === 'function'
        ? options.amplitudeFetchCb
        : undefined;
    this.deviceId = getCookie(AMPLITUDE_COOKIE_NAME);
    this.sessionId = Date.now();

    if (getIsConsented(this.getExternalConsentStatusCb)) {
      this.setDeviceId();
      this.sendUserProperties();
    }

    const theme = getThemePreference();
    const pathname = window.location.pathname;

    this.logEvent('init_app', { event_properties: { theme, pathname } });

    return this;
  },

  async sendUserProperties() {
    const { apiKey, deviceId, sessionId, getExternalConsentStatusCb } = this;
    let identification = '';
    const isConsentGotten = getIsConsented(getExternalConsentStatusCb);

    if (!this.areParamsCorrect(deviceId, sessionId, apiKey)) {
      return this;
    }

    const preparedDeviceId = isConsentGotten ? deviceId : nanoid();

    try {
      identification = JSON.stringify([
        {
          device_id: preparedDeviceId,
          ...this.getIdentificationParameter(),
        },
      ]);
    } catch (error) {
      console.error("amplitude-client: can't prepare user properties for sending", error);
      return this;
    }

    return new Promise((resolve) => {
      fetch(AMPLITUDE_HTTP_IDENTIFY_HANDLER, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: `api_key=${apiKey}&identification=${encodeURIComponent(identification)}`,
      })
        .then(() => {
          resolve(this);
        })
        .catch((error) => {
          this.handleErrorAmplitudeRequest(error);
          resolve(this);
        });
    });
  },

  async logEvent(eventType: string, eventArguments = {}) {
    const { apiKey, deviceId, sessionId, getExternalConsentStatusCb } = this;
    const isConsentGotten = getIsConsented(getExternalConsentStatusCb);
    let body = '';

    if (isConsentGotten) {
      this.setDeviceId();
    }

    if (!this.areParamsCorrect(deviceId, sessionId, apiKey)) {
      return this;
    }

    const preparedDeviceId = isConsentGotten ? deviceId : nanoid();
    const preparedSessionId = isConsentGotten ? sessionId : Date.now();
    const events = [
      {
        device_id: preparedDeviceId,
        session_id: preparedSessionId,
        event_type: eventType,
        ...eventArguments,
        ...this.getIdentificationParameter(),
      },
    ];

    try {
      body = JSON.stringify({
        api_key: apiKey,
        events,
        options: {
          min_id_length: 1,
        },
      });
    } catch (error) {
      console.error("amplitude-client: can't prepare event for sending", error);
      return this;
    }

    fetch(AMPLITUDE_HTTP_HANDLER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
    }).catch((error) => {
      this.handleErrorAmplitudeRequest(error);
    });

    return this;
  },

  handleErrorAmplitudeRequest(error) {
    console.error('amplitude-client: ', error);

    if (this.amplitudeFetchCb) {
      this.amplitudeFetchCb(error);
    }
  },

  areParamsCorrect(deviceId: string, sessionId: string, apiKey: string) {
    if (!deviceId && !sessionId) {
      console.error('amplitude-client: please call init function before');
      return false;
    }

    if (!apiKey) {
      console.error('amplitude-client: define apiKey property');
      return false;
    }

    return true;
  },

  getIdentificationParameter(): IdentificationParameter {
    const systemInfo = Bowser.parse(window.navigator.userAgent);
    const language = window.navigator.language;
    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      platform: `${systemInfo.platform.vendor} ${systemInfo.platform.type}`,
      os_name: systemInfo.browser.name,
      os_version: systemInfo.browser.version,
      device_brand: systemInfo.os.name,
      device_manufacturer: systemInfo.os.versionName,
      device_model: '',
      country: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language,
      user_properties: {
        ['$set']: {
          OS: `${systemInfo.os.name} ${systemInfo.os.versionName} v${systemInfo.os.version}`,
          platform: `${systemInfo.platform.vendor} ${systemInfo.platform.type}`,
          language,
          referer: document.referrer,
          screen: `${width} x ${height}`,
        },
      },
    };
  },
};

export default amplitudeHttp;
