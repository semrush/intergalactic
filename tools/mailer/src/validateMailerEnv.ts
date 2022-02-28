export const validateMailerEnv = () => {
  const mailerEnvVars = [
    'MAILCHIMPKEY2',
    'MAILCHIMPSERVER',
    'MAILCHIMPTEMPLATE',
    'LISTID',
    'MAILCHIMPTEMPLATE',
    'MAILCHIMPKEY1',
    'MAILCHIMPSERVER',
  ];

  if (mailerEnvVars.some((varName) => !process.env[varName])) {
    throw new Error(
      `@semcore/mailer package needs following env variables: ${mailerEnvVars
        .filter((varName) => !process.env[varName])
        .join(', ')}`,
    );
  }
};
