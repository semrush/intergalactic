---
title: General requirements
---

@## Language attribute

The language attribute declaration in HTML allows screen readers to read the text on the page with the correct pronunciation.

Specify the language using the `lang` attribute inside the element `html lang="en"`.

@## Document structure

Use semantic headings and structure the page logically.

@## Elements roles on the page

Each area on the page needs a `role` attribute, so screen readers can tell the user which part of the interface they are in.

- The area of ​​the page that contains information about the site must have `header role="banner"`
- Areas with links to different pages of the site, application screens or sections of the same document must have `nav role="navigation"`
- The main meaningful content of the document should be wrapped in `main role="main"`. Note that it can only be used once per page
- Independent content items. A page can have multiple elements with the `article` tag. The tag itself is not considered a landmark, but screen readers can follow these tags when navigating through sections or landmarks `article role="article"`
- Blocks associated with the main content, but visually separated from it, should have `aside role="complementary"`
- The area that contains information about the document (copyright, meta information, company information, etc.) must contain `footer role="contentinfo"`
- The [main search block](https://adrianroselli.com/2015/08/where-to-put-your-search-role.html) must have `form role="search"`
- Abbreviations should be expanded with `abbr title`. This allows screen readers to read the title value instead of the tag content

> If there are multiple zones with `role` equal to `navigation` or `complementary` on the same page, use the `aria-label` attribute to describe their purpose in a text caption.
>
> 💡 Note that there's no point adding `aria-label` attributes to non-semantic elements (for example, `&ltspan&gt`).

@## Controls and inputs

Controls and inputs should support navigation using a keyboard, touch devices and voice assistants.

- Make sure that controls and inputs have a recognizable `:focus` state, while links have a `:visited` state
- Make sure that clickable elements are easy to recognize
- Use [skip to main content](https://www.a11yproject.com/posts/2013-05-11-skip-nav-links/) links

> It's recommended to create elements that are hidden for the sighted users, but available for the visually impaired. This can be achieved by moving an element far off the left edge of the screen with the use of the `sr_only` class.

@## Forms

Make sure that your markup and order of form tabs are consistent and logical.

- Bind `label` to all form controls (input, select and others). For example, `<label for=''name''>Name:</label><input id=''name'' type=''text''>`
- Make sure that the `placeholder` attribute is not used in place of the `label` tag. There is an exception to this rule – small forms with one or two fields (search or login forms). Go to [WHATWG](https://html.spec.whatwg.org/multipage/input.html#attr-input-placeholder) to learn more
- Groups of form elements (for example, checkboxes and radio buttons) must be combined by `fieldset` and described in `legend`. It's important for `input type="radio"` and `input type="checkbox"`

@## Interactive area

Interactive areas include:

- Chats
- Progress bars and timers
- News and weather widgets
- Various errors and notifications: new messages, likes, subscriptions
- Tickers (stock market information, exchange rates)
- Sports stats
- Other similar elements

To mark an area on the page as interactive, add the ARIA attribute `aria-live=""` or a special ARIA role to any parent element:

- `alert`
- `status`
- `log`
- `timer`
- `marquee`

### ARIA roles

Roles are needed to make changes to all children elements within the interactive areas available to screen readers. This way screen readers will know how to handle updates to the content of these elements.

| ARIA role   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Alert**   | A type of interactive area that contains information that is important at a particular point in time. It can be an error message or a warning that appears on the screen after some user action or without the user's involvement (a server error, for example). For maximum compatibility, use `role="alert"` in conjunction with the `aria-live="assertive"` attribute. This will prompt the screen reader to announce the change immediately.     |
| **Status**  | Areas with this role contain additional information that is not particularly important and describes the status of changes (for example, a status bar). It can be information about a successful or unsuccessful user action, an error, or that the user needs to wait for a process to complete. `Role="status"` has built-in behavior for the `aria-live="polite"` attribute, and it's recommended to use them together for maximum compatibility. |
| **Log**     | A type of interactive area that contains logs. For example, chat history, a list of errors, or similar information. Note that for logs, the order in which the information is presented is very important. It's recommended to use the `role="log"` role in combination with the `aria-live="polite"` attribute.                                                                                                                                     |
| **Marquee** | This type of area contains information that changes rapidly. This role is similar to `log`, but in this case, the order in which the information is updated does not matter. Good examples of where you can use `role="marquee"` are tickers and currency rates. It's recommended to use the `role="marquee"` role in combination with the `aria-live="off"` attribute.                                                                              |
| **Timer**   | This role is needed for areas with counters that count down time in a normal and reverse order. The `role="timer"` element should have the `aria-live="off"` attribute for full compatibility with all devices and browsers.                                                                                                                                                                                                                         |

> If you need the screen reader to announce changes after a certain period of time, you can implement it with JavaScript. To do that, switch `aria-live="off"` to `aria-live="polite"` after the necessary period of time (for example, 60 minutes).

@## JavaScript

- Use unobtrusive JavaScript
- Don't call functions in markup
- Use JS alternatives for users who have it disabled or in environments where it's not available

@## Non-text content (images, media)

Images should be described in text in such a way that the voice assistant can adequately describe the content of the picture.

Provide a text alternative to the audio information to make it accessible to the deaf and hard of hearing. This also applies to search engines, which have no “sense of hearing”.

- Use appropriate `alt` text 😏 . Don't use more than 125 characters, since most screen readers can't read text longer than that
- Transcribe the audio content
- Add names to all elements of controls and information entry (such as `Search` or `Submit`)
- Synchronize subtitles with audio in videos content
- If you use tests, be sure to provide a short description
- Don't autoplay audio 🙏
- Avoid [pictures and icons in pseudo-elements](http://simplyaccessible.com/article/three-pitfalls-text-alternatives/)

**Exceptions**:

- Icons
- Decorative elements (backgrounds, dividers, etc.)
- Tests and captcha

> To exclude specific images, leave their `alt` attribute blank and screen readers will ignore them instead of trying to read the filename.
