---
title: InputPhone
tabs: Design('input-phone'), A11y('input-phone-a11y'), Example('input-phone-code'), Changelog('input-phone-changelog')
---

For API documentation, refer to the components used in the InputPhone pattern:

- [Input API](/components/input/input-api)
- [Select API](/components/select/select-api)
- [Flags API](/components/flags/flags-api)

## Unknown country and number format

The input is pre-filled with the value: `+`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/input-phone/docs/examples/unknown_country_and_number_format.tsx';
</script>

:::

## Known country and unknown number format

The input has a preset value: "{country code}". However, if it's possible to enter phone numbers from multiple countries, a country select option should be provided instead of a static flag.

::: tip
Some countries may have multiple formats for phone numbers. Therefore, it's sometimes safer to remove the format mask to avoid restricting user input.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/input-phone/docs/examples/known_country_but_the_number_format_is_unknown.tsx';
</script>

:::

## Known country and number format

::: warning
`InputMask` is deprecated and will be removed in the next major release.
:::

The input includes the country code as a preset value: "+ {country code}". Additionally, it has the required format mask.

This option is suitable when collecting phone numbers from users in one or a limited number of countries.

::: tip
Make sure to verify the available valid phone number formats for the specific country you are targeting.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/input-phone/docs/examples/known_country_and_number_format.tsx';
</script>

:::
