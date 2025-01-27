import type { ThemeRegistrationAny } from 'shiki/core';

const lightTheme: ThemeRegistrationAny = {
  colors: {
    'activityBar.activeBorder': '#f9826c',
    'activityBar.background': '#fff',
    'activityBar.border': '#e1e4e8',
    'activityBar.foreground': '#2f363d',
    'activityBar.inactiveForeground': '#959da5',
    'activityBarBadge.background': '#2188ff',
    'activityBarBadge.foreground': '#fff',
    'badge.background': '#dbedff',
    'badge.foreground': '#005cc5',
    'breadcrumb.activeSelectionForeground': '#586069',
    'breadcrumb.focusForeground': '#2f363d',
    'breadcrumb.foreground': '#6a737d',
    'breadcrumbPicker.background': '#fafbfc',
    'button.background': '#159739',
    'button.foreground': '#fff',
    'button.hoverBackground': '#138934',
    'button.secondaryBackground': '#e1e4e8',
    'button.secondaryForeground': '#1b1f23',
    'button.secondaryHoverBackground': '#d1d5da',
    'checkbox.background': '#fafbfc',
    'checkbox.border': '#d1d5da',
    'debugToolBar.background': '#fff',
    descriptionForeground: '#6a737d',
    'diffEditor.insertedTextBackground': '#34d05822',
    'diffEditor.removedTextBackground': '#c2004622',
    'dropdown.background': '#fafbfc',
    'dropdown.border': '#e1e4e8',
    'dropdown.foreground': '#2f363d',
    'dropdown.listBackground': '#fff',
    'editor.background': '#fff',
    'editor.findMatchBackground': '#ffdf5d',
    'editor.findMatchHighlightBackground': '#ffdf5d66',
    'editor.focusedStackFrameHighlightBackground': '#28a74525',
    'editor.foldBackground': '#d1d5da11',
    'editor.foreground': '#24292e',
    'editor.inactiveSelectionBackground': '#0366d611',
    'editor.lineHighlightBackground': '#f6f8fa',
    'editor.linkedEditingBackground': '#0366d611',
    'editor.selectionBackground': '#0366d625',
    'editor.selectionHighlightBackground': '#34d05840',
    'editor.selectionHighlightBorder': '#34d05800',
    'editor.stackFrameHighlightBackground': '#ffd33d33',
    'editor.wordHighlightBackground': '#34d05800',
    'editor.wordHighlightBorder': '#24943e99',
    'editor.wordHighlightStrongBackground': '#34d05800',
    'editor.wordHighlightStrongBorder': '#24943e50',
    'editorBracketHighlight.foreground1': '#005cc5',
    'editorBracketHighlight.foreground2': '#d85d00',
    'editorBracketHighlight.foreground3': '#5a32a3',
    'editorBracketHighlight.foreground4': '#005cc5',
    'editorBracketHighlight.foreground5': '#d85d00',
    'editorBracketHighlight.foreground6': '#5a32a3',
    'editorBracketMatch.background': '#34d05840',
    'editorBracketMatch.border': '#34d05800',
    'editorCursor.foreground': '#044289',
    'editorError.foreground': '#c20046',
    'editorGroup.border': '#e1e4e8',
    'editorGroupHeader.tabsBackground': '#f6f8fa',
    'editorGroupHeader.tabsBorder': '#e1e4e8',
    'editorGutter.addedBackground': '#28a745',
    'editorGutter.deletedBackground': '#c20046',
    'editorGutter.modifiedBackground': '#2188ff',
    'editorIndentGuide.activeBackground': '#d7dbe0',
    'editorIndentGuide.background': '#eff2f6',
    'editorLineNumber.activeForeground': '#24292e',
    'editorLineNumber.foreground': '#1b1f234d',
    'editorOverviewRuler.border': '#fff',
    'editorWarning.foreground': '#f9c513',
    'editorWhitespace.foreground': '#d1d5da',
    'editorWidget.background': '#f6f8fa',
    errorForeground: '#c20046',
    focusBorder: '#2188ff',
    foreground: '#444d56',
    'gitDecoration.addedResourceForeground': '#28a745',
    'gitDecoration.conflictingResourceForeground': '#d85d00',
    'gitDecoration.deletedResourceForeground': '#c20046',
    'gitDecoration.ignoredResourceForeground': '#959da5',
    'gitDecoration.modifiedResourceForeground': '#005cc5',
    'gitDecoration.submoduleResourceForeground': '#959da5',
    'gitDecoration.untrackedResourceForeground': '#28a745',
    'input.background': '#fafbfc',
    'input.border': '#e1e4e8',
    'input.foreground': '#2f363d',
    'input.placeholderForeground': '#959da5',
    'list.activeSelectionBackground': '#e2e5e9',
    'list.activeSelectionForeground': '#2f363d',
    'list.focusBackground': '#cce5ff',
    'list.hoverBackground': '#ebf0f4',
    'list.hoverForeground': '#2f363d',
    'list.inactiveFocusBackground': '#dbedff',
    'list.inactiveSelectionBackground': '#e8eaed',
    'list.inactiveSelectionForeground': '#2f363d',
    'notificationCenterHeader.background': '#e1e4e8',
    'notificationCenterHeader.foreground': '#6a737d',
    'notifications.background': '#fafbfc',
    'notifications.border': '#e1e4e8',
    'notifications.foreground': '#2f363d',
    'notificationsErrorIcon.foreground': '#c20046',
    'notificationsInfoIcon.foreground': '#005cc5',
    'notificationsWarningIcon.foreground': '#d85d00',
    'panel.background': '#f6f8fa',
    'panel.border': '#e1e4e8',
    'panelInput.border': '#e1e4e8',
    'panelTitle.activeBorder': '#f9826c',
    'panelTitle.activeForeground': '#2f363d',
    'panelTitle.inactiveForeground': '#6a737d',
    'pickerGroup.border': '#e1e4e8',
    'pickerGroup.foreground': '#2f363d',
    'progressBar.background': '#2188ff',
    'quickInput.background': '#fafbfc',
    'quickInput.foreground': '#2f363d',
    'scrollbar.shadow': '#6a737d33',
    'scrollbarSlider.activeBackground': '#959da588',
    'scrollbarSlider.background': '#959da533',
    'scrollbarSlider.hoverBackground': '#959da544',
    'settings.headerForeground': '#2f363d',
    'settings.modifiedItemIndicator': '#2188ff',
    'sideBar.background': '#f6f8fa',
    'sideBar.border': '#e1e4e8',
    'sideBar.foreground': '#586069',
    'sideBarSectionHeader.background': '#f6f8fa',
    'sideBarSectionHeader.border': '#e1e4e8',
    'sideBarSectionHeader.foreground': '#2f363d',
    'sideBarTitle.foreground': '#2f363d',
    'statusBar.background': '#fff',
    'statusBar.border': '#e1e4e8',
    'statusBar.debuggingBackground': '#f9826c',
    'statusBar.debuggingForeground': '#fff',
    'statusBar.foreground': '#586069',
    'statusBar.noFolderBackground': '#fff',
    'statusBarItem.prominentBackground': '#e8eaed',
    'statusBarItem.remoteBackground': '#fff',
    'statusBarItem.remoteForeground': '#586069',
    'tab.activeBackground': '#fff',
    'tab.activeBorder': '#fff',
    'tab.activeBorderTop': '#f9826c',
    'tab.activeForeground': '#2f363d',
    'tab.border': '#e1e4e8',
    'tab.hoverBackground': '#fff',
    'tab.inactiveBackground': '#f6f8fa',
    'tab.inactiveForeground': '#6a737d',
    'tab.unfocusedActiveBorder': '#fff',
    'tab.unfocusedActiveBorderTop': '#e1e4e8',
    'tab.unfocusedHoverBackground': '#fff',
    'terminal.ansiBlack': '#24292e',
    'terminal.ansiBlue': '#0366d6',
    'terminal.ansiBrightBlack': '#959da5',
    'terminal.ansiBrightBlue': '#005cc5',
    'terminal.ansiBrightCyan': '#3192aa',
    'terminal.ansiBrightGreen': '#028623',
    'terminal.ansiBrightMagenta': '#5a32a3',
    'terminal.ansiBrightRed': '#c20046',
    'terminal.ansiBrightWhite': '#d1d5da',
    'terminal.ansiBrightYellow': '#b08800',
    'terminal.ansiCyan': '#1b7c83',
    'terminal.ansiGreen': '#28a745',
    'terminal.ansiMagenta': '#5a32a3',
    'terminal.ansiRed': '#c20046',
    'terminal.ansiWhite': '#6a737d',
    'terminal.ansiYellow': '#dbab09',
    'terminal.foreground': '#586069',
    'terminal.tab.activeBorder': '#f9826c',
    'terminalCursor.background': '#d1d5da',
    'terminalCursor.foreground': '#005cc5',
    'textBlockQuote.background': '#fafbfc',
    'textBlockQuote.border': '#e1e4e8',
    'textCodeBlock.background': '#f6f8fa',
    'textLink.activeForeground': '#005cc5',
    'textLink.foreground': '#0366d6',
    'textPreformat.foreground': '#586069',
    'textSeparator.foreground': '#d1d5da',
    'titleBar.activeBackground': '#fff',
    'titleBar.activeForeground': '#2f363d',
    'titleBar.border': '#e1e4e8',
    'titleBar.inactiveBackground': '#f6f8fa',
    'titleBar.inactiveForeground': '#6a737d',
    'tree.indentGuidesStroke': '#e1e4e8',
    'welcomePage.buttonBackground': '#f6f8fa',
    'welcomePage.buttonHoverBackground': '#e1e4e8',
  },
  displayName: 'GitHub Light',
  name: 'github-light',
  semanticHighlighting: true,
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: {
        foreground: '#6a737d',
      },
    },
    {
      scope: [
        'constant',
        'entity.name.constant',
        'variable.other.constant',
        'variable.other.enummember',
        'variable.language',
      ],
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: ['entity', 'entity.name'],
      settings: {
        foreground: '#6f42c1',
      },
    },
    {
      scope: 'variable.parameter.function',
      settings: {
        foreground: '#24292e',
      },
    },
    {
      scope: 'entity.name.tag',
      settings: {
        foreground: '#028623',
      },
    },
    {
      scope: 'keyword',
      settings: {
        foreground: '#c20046',
      },
    },
    {
      scope: ['storage', 'storage.type'],
      settings: {
        foreground: '#c20046',
      },
    },
    {
      scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
      settings: {
        foreground: '#24292e',
      },
    },
    {
      scope: [
        'string',
        'punctuation.definition.string',
        'string punctuation.section.embedded source',
      ],
      settings: {
        foreground: '#032f62',
      },
    },
    {
      scope: 'support',
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: 'meta.property-name',
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: 'variable',
      settings: {
        foreground: '#d85d00',
      },
    },
    {
      scope: 'variable.other',
      settings: {
        foreground: '#24292e',
      },
    },
    {
      scope: 'invalid.broken',
      settings: {
        fontStyle: 'italic',
        foreground: '#c20046',
      },
    },
    {
      scope: 'invalid.deprecated',
      settings: {
        fontStyle: 'italic',
        foreground: '#c20046',
      },
    },
    {
      scope: 'invalid.illegal',
      settings: {
        fontStyle: 'italic',
        foreground: '#c20046',
      },
    },
    {
      scope: 'invalid.unimplemented',
      settings: {
        fontStyle: 'italic',
        foreground: '#c20046',
      },
    },
    {
      scope: 'carriage-return',
      settings: {
        background: '#c20046',
        content: '^M',
        fontStyle: 'italic underline',
        foreground: '#fafbfc',
      },
    },
    {
      scope: 'message.error',
      settings: {
        foreground: '#c20046',
      },
    },
    {
      scope: 'string variable',
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: ['source.regexp', 'string.regexp'],
      settings: {
        foreground: '#032f62',
      },
    },
    {
      scope: [
        'string.regexp.character-class',
        'string.regexp constant.character.escape',
        'string.regexp source.ruby.embedded',
        'string.regexp string.regexp.arbitrary-repitition',
      ],
      settings: {
        foreground: '#032f62',
      },
    },
    {
      scope: 'string.regexp constant.character.escape',
      settings: {
        fontStyle: 'bold',
        foreground: '#028623',
      },
    },
    {
      scope: 'support.constant',
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: 'support.variable',
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: 'meta.module-reference',
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: 'punctuation.definition.list.begin.markdown',
      settings: {
        foreground: '#d85d00',
      },
    },
    {
      scope: ['markup.heading', 'markup.heading entity.name'],
      settings: {
        fontStyle: 'bold',
        foreground: '#005cc5',
      },
    },
    {
      scope: 'markup.quote',
      settings: {
        foreground: '#028623',
      },
    },
    {
      scope: 'markup.italic',
      settings: {
        fontStyle: 'italic',
        foreground: '#24292e',
      },
    },
    {
      scope: 'markup.bold',
      settings: {
        fontStyle: 'bold',
        foreground: '#24292e',
      },
    },
    {
      scope: ['markup.underline'],
      settings: {
        fontStyle: 'underline',
      },
    },
    {
      scope: ['markup.strikethrough'],
      settings: {
        fontStyle: 'strikethrough',
      },
    },
    {
      scope: 'markup.inline.raw',
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
      settings: {
        background: '#ffeef0',
        foreground: '#c20046',
      },
    },
    {
      scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
      settings: {
        background: '#f0fff4',
        foreground: '#028623',
      },
    },
    {
      scope: ['markup.changed', 'punctuation.definition.changed'],
      settings: {
        background: '#ffebda',
        foreground: '#d85d00',
      },
    },
    {
      scope: ['markup.ignored', 'markup.untracked'],
      settings: {
        background: '#005cc5',
        foreground: '#f6f8fa',
      },
    },
    {
      scope: 'meta.diff.range',
      settings: {
        fontStyle: 'bold',
        foreground: '#6f42c1',
      },
    },
    {
      scope: 'meta.diff.header',
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: 'meta.separator',
      settings: {
        fontStyle: 'bold',
        foreground: '#005cc5',
      },
    },
    {
      scope: 'meta.output',
      settings: {
        foreground: '#005cc5',
      },
    },
    {
      scope: [
        'brackethighlighter.tag',
        'brackethighlighter.curly',
        'brackethighlighter.round',
        'brackethighlighter.square',
        'brackethighlighter.angle',
        'brackethighlighter.quote',
      ],
      settings: {
        foreground: '#586069',
      },
    },
    {
      scope: 'brackethighlighter.unmatched',
      settings: {
        foreground: '#c20046',
      },
    },
    {
      scope: ['constant.other.reference.link', 'string.other.link'],
      settings: {
        fontStyle: 'underline',
        foreground: '#032f62',
      },
    },
  ],
  type: 'light',
};

const darkTheme: ThemeRegistrationAny = {
  colors: {
    'activityBar.activeBorder': '#f9826c',
    'activityBar.background': '#24292e',
    'activityBar.border': '#1b1f23',
    'activityBar.foreground': '#e1e4e8',
    'activityBar.inactiveForeground': '#6a737d',
    'activityBarBadge.background': '#0366d6',
    'activityBarBadge.foreground': '#fff',
    'badge.background': '#044289',
    'badge.foreground': '#c8e1ff',
    'breadcrumb.activeSelectionForeground': '#d1d5da',
    'breadcrumb.focusForeground': '#e1e4e8',
    'breadcrumb.foreground': '#959da5',
    'breadcrumbPicker.background': '#2b3036',
    'button.background': '#176f2c',
    'button.foreground': '#dcffe4',
    'button.hoverBackground': '#22863a',
    'button.secondaryBackground': '#444d56',
    'button.secondaryForeground': '#fff',
    'button.secondaryHoverBackground': '#586069',
    'checkbox.background': '#444d56',
    'checkbox.border': '#1b1f23',
    'debugToolBar.background': '#2b3036',
    descriptionForeground: '#959da5',
    'diffEditor.insertedTextBackground': '#28a74530',
    'diffEditor.removedTextBackground': '#d73a4930',
    'dropdown.background': '#2f363d',
    'dropdown.border': '#1b1f23',
    'dropdown.foreground': '#e1e4e8',
    'dropdown.listBackground': '#24292e',
    'editor.background': '#24292e',
    'editor.findMatchBackground': '#ffd33d44',
    'editor.findMatchHighlightBackground': '#ffd33d22',
    'editor.focusedStackFrameHighlightBackground': '#2b6a3033',
    'editor.foldBackground': '#58606915',
    'editor.foreground': '#e1e4e8',
    'editor.inactiveSelectionBackground': '#3392FF22',
    'editor.lineHighlightBackground': '#2b3036',
    'editor.linkedEditingBackground': '#3392FF22',
    'editor.selectionBackground': '#3392FF44',
    'editor.selectionHighlightBackground': '#17E5E633',
    'editor.selectionHighlightBorder': '#17E5E600',
    'editor.stackFrameHighlightBackground': '#C6902625',
    'editor.wordHighlightBackground': '#17E5E600',
    'editor.wordHighlightBorder': '#17E5E699',
    'editor.wordHighlightStrongBackground': '#17E5E600',
    'editor.wordHighlightStrongBorder': '#17E5E666',
    'editorBracketHighlight.foreground1': '#79b8ff',
    'editorBracketHighlight.foreground2': '#ffab70',
    'editorBracketHighlight.foreground3': '#b392f0',
    'editorBracketHighlight.foreground4': '#79b8ff',
    'editorBracketHighlight.foreground5': '#ffab70',
    'editorBracketHighlight.foreground6': '#b392f0',
    'editorBracketMatch.background': '#17E5E650',
    'editorBracketMatch.border': '#17E5E600',
    'editorCursor.foreground': '#c8e1ff',
    'editorError.foreground': '#f97583',
    'editorGroup.border': '#1b1f23',
    'editorGroupHeader.tabsBackground': '#1f2428',
    'editorGroupHeader.tabsBorder': '#1b1f23',
    'editorGutter.addedBackground': '#28a745',
    'editorGutter.deletedBackground': '#ea4a5a',
    'editorGutter.modifiedBackground': '#2188ff',
    'editorIndentGuide.activeBackground': '#444d56',
    'editorIndentGuide.background': '#2f363d',
    'editorLineNumber.activeForeground': '#e1e4e8',
    'editorLineNumber.foreground': '#444d56',
    'editorOverviewRuler.border': '#1b1f23',
    'editorWarning.foreground': '#ffea7f',
    'editorWhitespace.foreground': '#444d56',
    'editorWidget.background': '#1f2428',
    errorForeground: '#f97583',
    focusBorder: '#005cc5',
    foreground: '#d1d5da',
    'gitDecoration.addedResourceForeground': '#34d058',
    'gitDecoration.conflictingResourceForeground': '#ffab70',
    'gitDecoration.deletedResourceForeground': '#ea4a5a',
    'gitDecoration.ignoredResourceForeground': '#6a737d',
    'gitDecoration.modifiedResourceForeground': '#79b8ff',
    'gitDecoration.submoduleResourceForeground': '#6a737d',
    'gitDecoration.untrackedResourceForeground': '#34d058',
    'input.background': '#2f363d',
    'input.border': '#1b1f23',
    'input.foreground': '#e1e4e8',
    'input.placeholderForeground': '#959da5',
    'list.activeSelectionBackground': '#39414a',
    'list.activeSelectionForeground': '#e1e4e8',
    'list.focusBackground': '#044289',
    'list.hoverBackground': '#282e34',
    'list.hoverForeground': '#e1e4e8',
    'list.inactiveFocusBackground': '#1d2d3e',
    'list.inactiveSelectionBackground': '#282e34',
    'list.inactiveSelectionForeground': '#e1e4e8',
    'notificationCenterHeader.background': '#24292e',
    'notificationCenterHeader.foreground': '#959da5',
    'notifications.background': '#2f363d',
    'notifications.border': '#1b1f23',
    'notifications.foreground': '#e1e4e8',
    'notificationsErrorIcon.foreground': '#ea4a5a',
    'notificationsInfoIcon.foreground': '#79b8ff',
    'notificationsWarningIcon.foreground': '#ffab70',
    'panel.background': '#1f2428',
    'panel.border': '#1b1f23',
    'panelInput.border': '#2f363d',
    'panelTitle.activeBorder': '#f9826c',
    'panelTitle.activeForeground': '#e1e4e8',
    'panelTitle.inactiveForeground': '#959da5',
    'peekViewEditor.background': '#1f242888',
    'peekViewEditor.matchHighlightBackground': '#ffd33d33',
    'peekViewResult.background': '#1f2428',
    'peekViewResult.matchHighlightBackground': '#ffd33d33',
    'pickerGroup.border': '#444d56',
    'pickerGroup.foreground': '#e1e4e8',
    'progressBar.background': '#0366d6',
    'quickInput.background': '#24292e',
    'quickInput.foreground': '#e1e4e8',
    'scrollbar.shadow': '#0008',
    'scrollbarSlider.activeBackground': '#6a737d88',
    'scrollbarSlider.background': '#6a737d33',
    'scrollbarSlider.hoverBackground': '#6a737d44',
    'settings.headerForeground': '#e1e4e8',
    'settings.modifiedItemIndicator': '#0366d6',
    'sideBar.background': '#1f2428',
    'sideBar.border': '#1b1f23',
    'sideBar.foreground': '#d1d5da',
    'sideBarSectionHeader.background': '#1f2428',
    'sideBarSectionHeader.border': '#1b1f23',
    'sideBarSectionHeader.foreground': '#e1e4e8',
    'sideBarTitle.foreground': '#e1e4e8',
    'statusBar.background': '#24292e',
    'statusBar.border': '#1b1f23',
    'statusBar.debuggingBackground': '#931c06',
    'statusBar.debuggingForeground': '#fff',
    'statusBar.foreground': '#d1d5da',
    'statusBar.noFolderBackground': '#24292e',
    'statusBarItem.prominentBackground': '#282e34',
    'statusBarItem.remoteBackground': '#24292e',
    'statusBarItem.remoteForeground': '#d1d5da',
    'tab.activeBackground': '#24292e',
    'tab.activeBorder': '#24292e',
    'tab.activeBorderTop': '#f9826c',
    'tab.activeForeground': '#e1e4e8',
    'tab.border': '#1b1f23',
    'tab.hoverBackground': '#24292e',
    'tab.inactiveBackground': '#1f2428',
    'tab.inactiveForeground': '#959da5',
    'tab.unfocusedActiveBorder': '#24292e',
    'tab.unfocusedActiveBorderTop': '#1b1f23',
    'tab.unfocusedHoverBackground': '#24292e',
    'terminal.ansiBlack': '#586069',
    'terminal.ansiBlue': '#2188ff',
    'terminal.ansiBrightBlack': '#959da5',
    'terminal.ansiBrightBlue': '#79b8ff',
    'terminal.ansiBrightCyan': '#56d4dd',
    'terminal.ansiBrightGreen': '#85e89d',
    'terminal.ansiBrightMagenta': '#b392f0',
    'terminal.ansiBrightRed': '#f97583',
    'terminal.ansiBrightWhite': '#fafbfc',
    'terminal.ansiBrightYellow': '#ffea7f',
    'terminal.ansiCyan': '#39c5cf',
    'terminal.ansiGreen': '#34d058',
    'terminal.ansiMagenta': '#b392f0',
    'terminal.ansiRed': '#ea4a5a',
    'terminal.ansiWhite': '#d1d5da',
    'terminal.ansiYellow': '#ffea7f',
    'terminal.foreground': '#d1d5da',
    'terminal.tab.activeBorder': '#f9826c',
    'terminalCursor.background': '#586069',
    'terminalCursor.foreground': '#79b8ff',
    'textBlockQuote.background': '#24292e',
    'textBlockQuote.border': '#444d56',
    'textCodeBlock.background': '#2f363d',
    'textLink.activeForeground': '#c8e1ff',
    'textLink.foreground': '#79b8ff',
    'textPreformat.foreground': '#d1d5da',
    'textSeparator.foreground': '#586069',
    'titleBar.activeBackground': '#24292e',
    'titleBar.activeForeground': '#e1e4e8',
    'titleBar.border': '#1b1f23',
    'titleBar.inactiveBackground': '#1f2428',
    'titleBar.inactiveForeground': '#959da5',
    'tree.indentGuidesStroke': '#2f363d',
    'welcomePage.buttonBackground': '#2f363d',
    'welcomePage.buttonHoverBackground': '#444d56',
  },
  displayName: 'GitHub Dark',
  name: 'github-dark',
  semanticHighlighting: true,
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: {
        foreground: '#6a737d',
      },
    },
    {
      scope: [
        'constant',
        'entity.name.constant',
        'variable.other.constant',
        'variable.other.enummember',
        'variable.language',
      ],
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: ['entity', 'entity.name'],
      settings: {
        foreground: '#b392f0',
      },
    },
    {
      scope: 'variable.parameter.function',
      settings: {
        foreground: '#e1e4e8',
      },
    },
    {
      scope: 'entity.name.tag',
      settings: {
        foreground: '#85e89d',
      },
    },
    {
      scope: 'keyword',
      settings: {
        foreground: '#f97583',
      },
    },
    {
      scope: ['storage', 'storage.type'],
      settings: {
        foreground: '#f97583',
      },
    },
    {
      scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
      settings: {
        foreground: '#e1e4e8',
      },
    },
    {
      scope: [
        'string',
        'punctuation.definition.string',
        'string punctuation.section.embedded source',
      ],
      settings: {
        foreground: '#9ecbff',
      },
    },
    {
      scope: 'support',
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: 'meta.property-name',
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: 'variable',
      settings: {
        foreground: '#ffab70',
      },
    },
    {
      scope: 'variable.other',
      settings: {
        foreground: '#e1e4e8',
      },
    },
    {
      scope: 'invalid.broken',
      settings: {
        fontStyle: 'italic',
        foreground: '#fdaeb7',
      },
    },
    {
      scope: 'invalid.deprecated',
      settings: {
        fontStyle: 'italic',
        foreground: '#fdaeb7',
      },
    },
    {
      scope: 'invalid.illegal',
      settings: {
        fontStyle: 'italic',
        foreground: '#fdaeb7',
      },
    },
    {
      scope: 'invalid.unimplemented',
      settings: {
        fontStyle: 'italic',
        foreground: '#fdaeb7',
      },
    },
    {
      scope: 'carriage-return',
      settings: {
        background: '#f97583',
        // content: "^M",
        fontStyle: 'italic underline',
        foreground: '#24292e',
      },
    },
    {
      scope: 'message.error',
      settings: {
        foreground: '#fdaeb7',
      },
    },
    {
      scope: 'string variable',
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: ['source.regexp', 'string.regexp'],
      settings: {
        foreground: '#dbedff',
      },
    },
    {
      scope: [
        'string.regexp.character-class',
        'string.regexp constant.character.escape',
        'string.regexp source.ruby.embedded',
        'string.regexp string.regexp.arbitrary-repitition',
      ],
      settings: {
        foreground: '#dbedff',
      },
    },
    {
      scope: 'string.regexp constant.character.escape',
      settings: {
        fontStyle: 'bold',
        foreground: '#85e89d',
      },
    },
    {
      scope: 'support.constant',
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: 'support.variable',
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: 'meta.module-reference',
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: 'punctuation.definition.list.begin.markdown',
      settings: {
        foreground: '#ffab70',
      },
    },
    {
      scope: ['markup.heading', 'markup.heading entity.name'],
      settings: {
        fontStyle: 'bold',
        foreground: '#79b8ff',
      },
    },
    {
      scope: 'markup.quote',
      settings: {
        foreground: '#85e89d',
      },
    },
    {
      scope: 'markup.italic',
      settings: {
        fontStyle: 'italic',
        foreground: '#e1e4e8',
      },
    },
    {
      scope: 'markup.bold',
      settings: {
        fontStyle: 'bold',
        foreground: '#e1e4e8',
      },
    },
    {
      scope: ['markup.underline'],
      settings: {
        fontStyle: 'underline',
      },
    },
    {
      scope: ['markup.strikethrough'],
      settings: {
        fontStyle: 'strikethrough',
      },
    },
    {
      scope: 'markup.inline.raw',
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
      settings: {
        background: '#86181d',
        foreground: '#fdaeb7',
      },
    },
    {
      scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
      settings: {
        background: '#144620',
        foreground: '#85e89d',
      },
    },
    {
      scope: ['markup.changed', 'punctuation.definition.changed'],
      settings: {
        background: '#c24e00',
        foreground: '#ffab70',
      },
    },
    {
      scope: ['markup.ignored', 'markup.untracked'],
      settings: {
        background: '#79b8ff',
        foreground: '#2f363d',
      },
    },
    {
      scope: 'meta.diff.range',
      settings: {
        fontStyle: 'bold',
        foreground: '#b392f0',
      },
    },
    {
      scope: 'meta.diff.header',
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: 'meta.separator',
      settings: {
        fontStyle: 'bold',
        foreground: '#79b8ff',
      },
    },
    {
      scope: 'meta.output',
      settings: {
        foreground: '#79b8ff',
      },
    },
    {
      scope: [
        'brackethighlighter.tag',
        'brackethighlighter.curly',
        'brackethighlighter.round',
        'brackethighlighter.square',
        'brackethighlighter.angle',
        'brackethighlighter.quote',
      ],
      settings: {
        foreground: '#d1d5da',
      },
    },
    {
      scope: 'brackethighlighter.unmatched',
      settings: {
        foreground: '#fdaeb7',
      },
    },
    {
      scope: ['constant.other.reference.link', 'string.other.link'],
      settings: {
        fontStyle: 'underline',
        foreground: '#dbedff',
      },
    },
  ],
  type: 'dark',
};

export const codeTheme = {
  light: lightTheme,
  dark: darkTheme,
};
