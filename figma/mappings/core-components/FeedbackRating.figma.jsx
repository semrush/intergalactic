import figma from '@figma/code-connect';
import { FeedbackRating } from '@semcore/ui/feedback-form';
import Link from '@semcore/ui/link';

// The base components are commented out because currently we are not rendering them separately from the FeedbackRating component

// figma.connect(
//     SliderRating.Star,
//     'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-298578&t=7CEXrbu9XEfMUFlr-11', {
//     example: () => (
//         <SliderRating.Star />
//     )
// });

// figma.connect(
//     SliderRating,
//     'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-298578&t=7CEXrbu9XEfMUFlr-11', {
//     variant: { 'value': '1,2,3,4,5' },
//     props: {
//         value: figma.number('value'),
//     },
//     example: ({ value }) => (
//         <SliderRating value={value} />
//     )
// });

// figma.connect(
//     FeedbackRatingForm.Checkbox,
//     'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-298578&t=7CEXrbu9XEfMUFlr-11', {
//     props: {
//         label: figma.textContent('↳ text'),
//     },
//     example: ({ label }) => (
//         <FeedbackRatingForm.Checkbox label={label} />
//     )
// });

figma.connect(
  FeedbackRating,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-298638&t=7CEXrbu9XEfMUFlr-11', {
    variant: { state: 'Notice' },
    props: {
      // notificationTitle: figma.boolean('notification title', {
      //     true: figma.textContent('↳ title'),
      //     false: undefined,
      // }),
      // notificationText: figma.textContent('↳ text'),
      learnMoreLink: figma.boolean('Learn more link', {
        true: figma.children('Link'),
        false: undefined,
      }),
    },
    example: ({ notificationTitle, notificationText, learnMoreLink }) => (
      <FeedbackRating
        notificationTitle={/* notificationTitle */}
        notificationText={/* notificationText */}
        learnMoreLink={/* Set URL */}
        header={/* Add Modal title */}
        submitText={/* Add Modal submit button text */}
        formConfig={/* Add form config */}
        description={(
          <>
            We will only use this email to respond to you on your feedback.
            {' '}
            {learnMoreLink}
          </>
        )}
      />
    ),
  });

figma.connect(
  FeedbackRating,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=56115-298638&t=7CEXrbu9XEfMUFlr-11', {
    variant: { state: 'Form' },
    props: {
      header: figma.textContent('↳ title'),
    },
    example: ({ header }) => (
      <FeedbackRating
        notificationTitle={/* notificationTitle */}
        notificationText={/* notificationText */}
        learnMoreLink={/* Set URL */}
        header={header}
        submitText={/* Add Modal submit button text */}
        formConfig={/* Add form config */}
        description={(
          <>
            We will only use this email to respond to you on your feedback.
            {' '}
            <Link href='https://www.semrush.com/company/legal/privacy-policy/'>
              Privacy Policy
            </Link>
          </>
        )}
      />
    ),
  });
