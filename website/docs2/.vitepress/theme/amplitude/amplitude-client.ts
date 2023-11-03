import 'whatwg-fetch';
import { nanoid } from 'nanoid';
import { getCookie, setCookie, AMPLITUDE_COOKIE_NAME, AMPLITUDE_COOKIE_EXP_DATE } from './cookie';

declare global {
  interface Window {
    cookiehub: any;
  }
}

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

const AMPLITUDE_HTTP_HANDLER = 'https://api.amplitude.com/2/httpapi';
const AMPLITUDE_HTTP_IDENTIFY_HANDLER = 'https://api.amplitude.com/identify';

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

    const theme = getThemePreference();

    if (getIsConsented(this.getExternalConsentStatusCb)) {
      this.setDeviceId();
    }

    this.logEvent('init_app', { theme });

    return this;
  },

  async sendUserProperties(
    userProperties: {},
    method: 'set' | 'setOnce' | 'add' | 'append' | 'unset' = 'set',
  ) {
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
          user_properties: {
            [`$${method}`]: userProperties,
          },
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
};

export default amplitudeHttp;
