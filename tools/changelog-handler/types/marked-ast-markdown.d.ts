declare module 'marked-ast-markdown' {
  type Space = {
    type: 'space';
  };

  type Code = {
    type: 'code';
    codeBlockStyle?: 'indented' | undefined;
    lang?: string | undefined;
    text: string[];
  };

  type Heading = {
    type: 'heading';
    level: number;
    text: string[];
    tokens?: Token[];
    raw?: string;
  };

  type Table = {
    type: 'table';
    align: Array<'center' | 'left' | 'right' | null>;
    header: TableCell[];
    rows: TableCell[][];
  };

  type TableCell = {
    text: string[];
    tokens: Token[];
  };

  type Hr = {
    type: 'hr';
  };

  type Blockquote = {
    type: 'blockquote';
    text: string[];
    tokens: Token[];
  };

  type List = {
    type: 'list';
    ordered: boolean;
    body: ListItem[];
  };

  type ListItem = {
    type: 'listitem';
    checked?: boolean | undefined;
    text: (Token | string)[];
  };

  type Paragraph = {
    type: 'paragraph';
    pre?: boolean | undefined;
    text: (string | Token)[];
    tokens?: Token[];
  };

  type HTML = {
    type: 'html';
    pre: boolean;
    text: string[];
  };

  type Text = {
    type: 'text';
    text: string[];
    tokens?: Token[] | undefined;
  };

  type Def = {
    type: 'def';
    tag: string;
    href: string;
    title: string;
  };

  type Escape = {
    type: 'escape';
    text: string[];
  };

  type Tag = {
    type: 'text' | 'html';
    inLink: boolean;
    text: string[];
  };

  type Link = {
    type: 'link';
    href: string;
    title: string | null;
    text: string[];
    tokens?: Token[];
  };

  type Image = {
    type: 'image';
    href: string;
    title: string;
    text: string[];
  };

  type Strong = {
    type: 'strong';
    text: string[];
    tokens: Token[];
  };

  type Em = {
    type: 'em';
    text: string[];
    tokens: Token[];
  };

  type Codespan = {
    type: 'codespan';
    text: string[];
  };

  type Br = {
    type: 'br';
  };

  type Del = {
    type: 'del';
    text: string[];
    tokens: Token[];
  };

  type Generic = {
    [index: string]: any;
    type: string;
    tokens?: Token[] | undefined;
  };

  export type Token =
    | Space
    | Code
    | Heading
    | Table
    | Hr
    | Blockquote
    | List
    | ListItem
    | Paragraph
    | HTML
    | Text
    | Def
    | Escape
    | Tag
    | Image
    | Link
    | Strong
    | Em
    | Codespan
    | Br
    | Del;

  export const toMarkdown: (tokens: Token[]) => string;
}
