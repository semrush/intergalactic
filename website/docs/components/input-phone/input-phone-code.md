---
title: InputPhone
tabs: Design('input-phone'), A11y('input-phone-a11y'), Example('input-phone-code')
---

## Unknown country and number format

The input is pre-filled with the value: `+`.

::: sandbox

<script lang="tsx">
  export Demo from './examples/unknown_country_and_number_format.tsx';
</script>

:::

## Known country, but the number format is unknown

The input has a preset value: "+ {country code}". However, if it is possible to enter phone numbers from multiple countries, a country select option should be provided instead of a static flag.

::: tip
In certain countries, there may be multiple valid formats for phone numbers. Therefore, it is sometimes safer to remove the format mask to avoid restricting user input.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/known_country_but_the_number_format_is_unknown.tsx';
</script>

:::

## Known country and number format

The input includes the country code as a preset value: "+ {country code}". Additionally, it has the required format mask.

This option is suitable when collecting phone numbers from users in one or a limited number of countries.

::: tip
Make sure to verify the available valid phone number formats for the specific country you are targeting.
:::

::: sandbox

<script lang="tsx">
  export Demo from './examples/known_country_and_number_format.tsx';
</script>

:::
