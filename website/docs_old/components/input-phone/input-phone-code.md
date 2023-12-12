---
title: Example
---

@## Unknown country and number format

The input field is pre-filled with the value: `+`.

@example basic

@## Known country, but the number format is unknown

The input field has a preset value: "+ {country code}". However, if it is possible to enter phone numbers from multiple countries, a country select option should be provided instead of a static flag.

> In certain countries, there may be multiple valid formats for phone numbers. Therefore, it is sometimes safer to remove the format mask to avoid restricting user input.

@example medium

@## Known country and number format

The input field includes the country code as a preset value: "+ {country code}". Additionally, it has the required format mask.

This option is suitable when collecting phone numbers from users in one or a limited number of countries.

> Make sure to verify the available valid phone number formats for the specific country you are targeting.

@example mask
