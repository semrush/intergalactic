declare module '@mailchimp/mailchimp_marketing' {
  type Config = {
    apiKey?: string;
    accessToken?: string;
    server?: string;
  };

  type AddListMemberOptions = {
    skipMergeValidation: boolean;
  };

  export type AddListMemberBody = {
    email_address: string;
    status_if_new?: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional';
    merge_fields?: { [key: string]: any };
  };

  const conf: {
    setConfig: (config: Config) => {};
    lists: {
      addListMember: (listId: string, body: AddListMemberBody, opts?: AddListMemberOptions) => {};
    };
  };

  export default conf;
}
