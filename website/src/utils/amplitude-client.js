import 'whatwg-fetch';
import { nanoid } from 'nanoid';

/**
 *
 * @param {string} name
 * @returns {string}
 */
const getCookie = (name) => {
  const cookie = {};

  document.cookie.split(';').forEach((el) => {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });

  return cookie[name] || '';
};

/**
 *
 * @param {string} cname
 * @param {string} cvalue
 * @param {number} exdays
 */
const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;

  document.cookie = `${cname}=${cvalue};${expires};path=/;SameSite=None;Secure`;
};

/**
 *
 * @param {function} getExternalProviderConsentStatus
 * @returns {boolean}
 */
const getIsConsented = (getExternalProviderConsentStatus) => {
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
const AMPLITUDE_COOKIE_NAME = '_ampl';
const AMPLITUDE_COOKIE_EXP_DATE = 30;

const amplitudeHttp = {
  /**
   *
   * @returns {string}
   */
  setDeviceId() {
    if (!this.deviceId) {
      this.deviceId = nanoid();
      setCookie(AMPLITUDE_COOKIE_NAME, this.deviceId, AMPLITUDE_COOKIE_EXP_DATE);
    }

    return this.deviceId;
  },

  /**
   *
   * @param {string} apiKey
   * @param {object} options
   * @param {function|undefined} options.getExternalConsentStatusCb
   * @param {function|undefined} options.amplitudeFetchCb
   * @returns {amplitudeHttp}
   */
  init(apiKey, options = {}) {
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
    }

    return this;
  },

  /**
   *
   * @param {Object} userProperties
   * @param {"set" | "setOnce" | "add" | "append" | "unset"} method
   * @returns {Promise<amplitudeHttp>}
   */
  async sendUserProperties(userProperties, method = 'set') {
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

  /**
   *
   * @param {string} eventType
   * @param {Object} [eventArguments]
   * @returns {Promise<amplitudeHttp>}
   */
  async logEvent(eventType, eventArguments = {}) {
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

  /**
   * Check all params that were set during the initialization
   * @param deviceId
   * @param sessionId
   * @param apiKey
   * @returns {boolean}
   */
  areParamsCorrect(deviceId, sessionId, apiKey) {
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
