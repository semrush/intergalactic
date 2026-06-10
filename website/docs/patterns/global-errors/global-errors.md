---
title: Error message
fileSource: errors
tabs: Design('global-errors'), A11y('global-errors-a11y'), API('global-errors-api'), Examples('global-errors-code'), Changelog('global-errors-changelog')
---

## Description

**Error message** is a component for showing global error messages on a page. Use it when the user is blocked from interacting with the website and needs to know why. This pattern covers server errors, system limitations, and other issues preventing content from loading.

::: tip
The state description should be brief. Two or three short sentences are usually enough.
:::

![](static/ge-example.png)

## Appearance

### Positioning on page

Center the message on the page horizontally and vertically.

![](static/ge_page-not-found.png)

### Appearance on small screens

For viewports less than 648px in width:

- message layout changes to vertical
- illustration's size changes to 200px * 200px
- message paddings are reduced

![](static/mobile.png)

## Page not found

![](static/ge_not-found.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

::: info We got lost
It looks like this page doesn't exist.<br>
Try going back or click the button below and we'll take you home.<br><br>

**Controls:**
- Go to homepage (when logged out, leads to the main Semrush; when logged in, leads to the Dashboard)
:::

## Project not found

![](static/ge_project-not-found.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

<!-- vale off -->
::: info Project not found

We cannot find the project you’re trying to access. Check one of the following issues:

- The project may have been deleted or there is an error in the URL entered.
- You may not have permission to view the project. Please request access from the project owner.

You can find all your projects on the Projects page.

If you have any other problems with access to the project, please contact our [Support Team](https://www.semrush.com/company/contacts/).
<br><br>

**Controls:**

- Go to Projects (leads to the projects page)
- [Contact us](https://www.semrush.com/company/contacts/)
:::
<!-- vale on -->

## Something went wrong

### Unexpected problem

![](static/ge_smthng.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

<!-- vale off -->
::: info Something went wrong

Don't worry though, we are aware of the issue and are working to fix it.<br>
Please try again later.
<br><br>

**Controls:**

- Try again (reloads the page)
:::
<!-- vale on -->

### Known problem

![](static/ge_smthng-we-know.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

<!-- vale off -->
::: info Something went wrong

We are aware of the issue and are working to fix it.<br>
Please try again later or contact the [Support Team](https://www.semrush.com/company/contacts/).
<br><br>

**Controls:**

- Reload page
- [Contact us](https://www.semrush.com/company/contacts/)
:::
<!-- vale on -->

## Under maintenance

![](static/ge_under-maintenance-2.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

<!-- vale off -->
::: info {product name} is under maintenance

We are doing our best to fix it as soon as possible.<br>
Please come back later.
<br><br>

**Controls:**

- Go to homepage (when logged out, leads to the main Semrush; when logged in, leads to the Dashboard)
:::
<!-- vale on -->

## Log in to access

![](static/ge_access-login.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

<!-- vale off -->
::: info Log in to view the page

It seems that you were lost in space.<br>
Please log in or sign up to view the page.
<br><br>

**Controls:**

- Log in (leads to the log-in page)
- Sign up (leads to the sign-up page)
:::
<!-- vale on -->

## Access denied

![](static/ge_access-denied.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

::: info You’ve found the secret page

You’re missing the permissions to access this page.<br>
Go back to the previous page or visit our homepage.
<br><br>

**Controls:**

* Go to homepage (when logged out, leads to the main Semrush; when logged in, leads to the Dashboard)
:::

## Connection was lost

![](static/ge_connection-was-lost.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

::: info Connection was lost

There seems to be a problem with your internet connection.<br>
Reconnect and reload the page.
<br><br>

**Controls:**

- Reload page
- or wait **{XX}s** (counts down to 0 and reloads the page automatically)
:::

## Connection timed out

![](static/ge_connection-timed-out.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

<!-- vale off -->
::: info Connection timed out

The initial connection between Cloudflare’s network and the origin web server timed out. As a result, the webpage cannot be displayed.

- Ray ID: \{000000000000000\}
- Your IP address: \{84.52.114.132\}
- Error reference number: 522
- Cloudflare Location POP: \{undef\}
:::
<!-- vale on -->

## Blocked (Bad) request

![](static/ge_blocked-request.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

::: info The request feels... off

This is the 400 error page. Try one of the following:

1. Make sure the URL is correct.
2. Clear cookies or turn off your browser extensions.
<br><br>

**Controls:**

- Go to homepage (when logged out, leads to the main Semrush; when logged in, leads to the Dashboard)
- [Contact support](https://www.semrush.com/company/contacts/)
:::

## Confirmation

![](static/ge_confirmation-submit.png)

![](static/ge_confirmation-captcha.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

<!-- vale off -->
::: info Confirm you are a real person

We need to make sure you’re not a robot.<br>
Please complete the security check, and we’ll be out of your way.
<br><br>

**Controls:**

- Submit (confirms the action, then we take the user to the page where they were going)

or
- Captcha (confirms the action, then we take the user to the page where they were going)
:::
<!-- vale on -->

<!-- vale off -->
## Payment cannot be accepted

![](static/ge_no-payment.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

::: info Your payment cannot be accepted

Unfortunately, we don’t accept payments from {country}.
<br><br>

**Controls:**

- Go to homepage
:::
<!-- vale on -->

## DNS Resolution Error

![](static/ge_dns-resolution.png)

Illustration can be found in the [internal Figma library](https://www.figma.com/design/EWdX1ly5KsoNu8sywYJdKk/%F0%9F%92%A0-UX-Patterns?node-id=12537-41788).

<!-- vale off -->
::: info DNS resolution error

You've requested a page on a website (cloudflarepreview.com) that is on the Cloudflare network. Cloudflare is currently unable to resolve your requested domain (cloudflarepreview.com). There are two potential causes of this:

- Most likely: if the owner just signed up for Cloudflare it can take a few minutes for the website's information to be distributed to our global network.

- Less likely: something is wrong with this site's configuration. Usually this happens when accounts have been signed up with a partner organization (for example, a hosting provider) and the provider's DNS fails.
<br><br>

- Ray ID: \{000000000000000\}

- Timestamp: \{Thu, 01-Jan-70 00:00:00 GMT\}

- Your IP address: \{84.52.114.132\}

- Requested URL: \{example.URL/foo\}

- Error reference number: 1001

- Server ID: \{FL_FOO\}

- User-Agent: \{Example\}
:::
<!-- vale on -->

## Global errors usage

**When do we use it?**

In case of an error defined by the HTTP state code.

- DNS resolution error (1xx)
- Access denied – Access request (403)
- Page not found, Project not found (404)
- Connection lost (408)
- Something went wrong (500, 520)
- Connection timed out (522)

In case of a state caused by security reasons:

- Blocked request
- Confirmation

Additional situations where the state blocks all content and restricts access to it:

<!-- vale DevDocs.Contractions = NO -->
- Your account has been deleted
- Under maintenance
- Your payment cannot be accepted
<!-- vale DevDocs.Contractions = YES -->

### Use cases

There are two possible cases of the pattern's use:

- As a full-page for the whole website.
- As a state of the product.

::: tip
The position is the same in both cases: the message is centered both vertically and horizontally on the page.
:::

| For the whole website                                | In the product                                             |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| ![](static/ge_page-smthng.png) | ![](static/ge_under-maintenance.png) |


### Controls

1. If the error is processed by Cloudflare, don't add buttons.
2. In other cases, it's recommended to add controls allowing the user:
    - to leave the page, such as **Go to homepage**
    - to handle the problem and reload the page, such as **Reload page**, **Try again**, or **Submit**
3. The **Contact us** button is only used for unexpected errors, so that the user can contact support and report the problem.
