---
title: Code
---

@## We don't know the country and number format

The input has a preset value: `+`.

@example basic

@## The country is known but the number format is not known

The input has a preset value: + country code. However, if it is possible to enter phone numbers from several countries, a country select option shall be available instead of static flag.

> 💡 In some countries, there may be several valid formats for phone numbers. Therefore, it is sometimes safer to remove the format mask so as not to restrict user input.

@example medium

@## We know the country and number format

The input contains the country code as a preset value: + country code. And the required format mask.

This option is suitable when you collect phones from users from one or a limited number of countries.

> 💡 Don't forget to check how many valid phone number formats are available in the country you need.

@example mask
