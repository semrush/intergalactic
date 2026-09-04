export interface CodeConnectDoc {
  /** The Figma node URL the doc links to e.g. https://www.figma.com/design/123/MyFile?node-id=1-1 */
  figmaNode: string;
  /**
   * Optional component name. This is only used for display purposes
   * so can be omitted if it's not relevant to the language/framework
   * */
  component?: string;
  /** Variant restrictions keyed by Figma property name e.g. `{ 'With icon': true }` */
  variant?: Record<string, string>;
  /** Source path - a relative path to the file containing the component definition */
  source: string;
  /** Optional source location containing line number information. */
  sourceLocation?: {
    /**
     * Optional line number to link to.
     * This is only used if type === 'PATH', to generate a link to the correct line.
     * */
    line: number;
  };
  /** The JS template function to use for this doc */
  template: string;
  templateData: {
    /**
     * Map of information describing the props used by the template.
     * This is used by the CLI to validate props before publishing.
     * */
    props: PropMapping;

    /**
     * Optional array of imports for this component.
     * These are prepended to the example code.
     */
    imports?: string[];

    /** Whether the example should be rendered inline if it's a nested instance */
    nestable?: boolean;
  };
  /** The language to use for syntax highlighting */
  language: SyntaxHighlightLanguage;
  /** Label to be used for the example in the UI */
  label: string;
}

export interface ParseResponsePayload {
  /** Array of Code Connect docs parsed from the input files */
  docs: CodeConnectDoc[];
  /** Any info, warning or error messages generated during parsing. */
  messages: ParserExecutableMessage[];
};

export interface ParserExecutableMessage {
  /**
   * DEBUG and INFO messages should be output to console by the CLI for the user to read,
   * according to the current log level setting.
   * If any WARNING or ERROR messages are returned, the CLI can determine whether it should proceed with publishing
   * or not based on configuration and the return code should be zero or non-zero as appropriate.
   * */
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  /** Optional type of message which can be displayed highlighted in the output */
  type?: string;
  message: string;
  /** Optional source location which can be displayed in a standardised form */
  sourceLocation?: {
    file: string;
    line?: number;
  };
};

type PropMapping = Record<string, string>; // Intrinsic>; ?!

type SyntaxHighlightLanguage =
  | 'typescript'
  | 'cpp'
  | 'ruby'
  | 'css'
  | 'javascript'
  | 'html'
  | 'json'
  | 'graphql'
  | 'python'
  | 'go'
  | 'sql'
  | 'swift'
  | 'kotlin'
  | 'rust'
  | 'bash'
  | 'xml'
  | 'plaintext'
  | 'jsx'
  | 'tsx'
  | 'dart';
