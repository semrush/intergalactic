import { readFile } from 'fs/promises';
import { relative as resolveRelativePath, resolve as resolvePath } from 'path';
import os from 'os';
import { VoiceOverPlaywright } from '@guidepup/playwright/lib/voiceOverTest';
import { CommandOptions } from '@guidepup/guidepup';

const darwin2macos: Record<number, string> = {
  23: 'Sonoma 14',
  22: 'Ventura 13',
  21: 'Monterey 12',
  20: 'Big Sur 11',
  19: 'Catalina 10.15',
  18: 'Mojave 10.14',
  17: 'High Sierra 10.13',
  16: 'Sierra 10.12',
  15: 'El Capitan 10.11',
  14: 'Yosemite 10.10',
  13: 'Mavericks 10.9',
  12: 'Mountain Lion 10.8',
  11: 'Lion 10.7',
  10: 'Snow Leopard 10.6',
  9: 'Leopard 10.5',
  8: 'Tiger 10.4',
  7: 'Panther 10.3',
  6: 'Jaguar 10.2',
  5: 'Puma 10.1',
};
const getOsName = () => {
  if (os.platform() !== 'darwin') {
    throw new Error(`VoiceOver supports MacOS only, got platform ${os.platform()}`);
  }

  const platformMajor = Number(os.version().split('Version ')[1].split('.')[0]);
  const systemName = `MacOS ${darwin2macos[platformMajor]}`;

  if (!darwin2macos[platformMajor]) {
    throw new Error(
      `Unknown platform version "${platformMajor}". Need to update darwin2macos mapping.`,
    );
  }

  return systemName;
};

export const makeVoiceOverReporter = async (baseVoiceOver: VoiceOverPlaywright) => {
  await baseVoiceOver.stop();
  await baseVoiceOver.start({ capture: 'initial' });

  // const actionsLog: string[] = [];

  // let prevSpokenPhrase = await baseVoiceOver.lastSpokenPhrase();
  // let prevItemTextLog = await baseVoiceOver.itemTextLog();
  // const reportStateChange = async () => {
  //   const spokenPhrase = await baseVoiceOver.lastSpokenPhrase();
  //   const itemTextLog = await baseVoiceOver.itemTextLog();
  //   if (spokenPhrase && spokenPhrase !== prevSpokenPhrase) {
  //     actionsLog.push(`Screen reader says "${spokenPhrase}".`);
  //   }
  //   if (itemTextLog && itemTextLog !== prevItemTextLog) {
  //     actionsLog.push(`Screen reader see element "${itemTextLog}".`);
  //   }
  //   prevSpokenPhrase = spokenPhrase;
  //   prevItemTextLog = itemTextLog;
  // };

  // const voiceOverWrapper: Omit<
  //   VoiceOverPlaywright,
  //   'mouse' | 'keyboard' | 'cursor' | 'caption' | 'lastSpokenPhrase' | 'itemText'
  // > & {
  //   lastSpokenPhrase: (options?: CommandOptions) => Promise<string>;
  //   itemText: (options?: CommandOptions) => Promise<string>;
  // } = {
  //   commanderCommands: baseVoiceOver.commanderCommands,
  //   detect: async () => {
  //     const result = await baseVoiceOver.detect();
  //     const resultString = result ? 'it is supported' : 'it is not supported';
  //     actionsLog.push(
  //       `Screen reader checked is it supported on current os (${getOsName()}): ${resultString}.`,
  //     );
  //     return result;
  //   },
  //   default: async () => {
  //     const result = await baseVoiceOver.default();
  //     const resultString = result ? 'it is' : "it's not";
  //     actionsLog.push(`Screen reader checked is it default system screen reader: ${resultString}.`);

  //     return result;
  //   },
  //   start: async (options) => {
  //     actionsLog.push('Screen reader is turning on.');
  //     const result = await baseVoiceOver.start(options);
  //     return result;
  //   },
  //   stop: async (options) => {
  //     actionsLog.push('Screen reader is turning off.');
  //     return baseVoiceOver.stop(options);
  //   },
  //   previous: async (options) => {
  //     actionsLog.push('Screen reader goes to the previous element.');
  //     const result = await baseVoiceOver.previous(options);
  //     await reportStateChange();
  //     return result;
  //   },
  //   next: async (options) => {
  //     actionsLog.push('Screen reader goes to the next element.');
  //     const result = await baseVoiceOver.next(options);
  //     await reportStateChange();
  //     return result;
  //   },
  //   act: async (options) => {
  //     actionsLog.push('Screen reader triggers element default action.');
  //     const result = await baseVoiceOver.act(options);
  //     await reportStateChange();
  //     return result;
  //   },
  //   interact: async (options) => {
  //     actionsLog.push('Screen reader goes into the active element.');
  //     const result = await baseVoiceOver.interact(options);
  //     await reportStateChange();
  //     return result;
  //   },
  //   stopInteracting: async (options) => {
  //     actionsLog.push('Screen reader goes out of active element.');
  //     const result = await baseVoiceOver.stopInteracting(options);
  //     await reportStateChange();
  //     return result;
  //   },
  //   press: async (key, options) => {
  //     actionsLog.push(`Screen reader presses the "${key}" button.`);
  //     const result = await baseVoiceOver.press(key, options);
  //     await reportStateChange();
  //     return result;
  //   },
  //   type: async (text, options) => {
  //     actionsLog.push(`Screen reader types "${text}".`);
  //     const result = await baseVoiceOver.type(text, options);
  //     await reportStateChange();
  //     return result;
  //   },
  //   perform: async (command, options) => {
  //     if (typeof command === 'object' && 'description' in command) {
  //       if (!command.description) {
  //         throw new Error(
  //           'Performing keyboard commands without description is restricted via VoiceOver reporter',
  //         );
  //       }
  //       actionsLog.push(`Screen reader performs "${command.description}".`);
  //     } else {
  //       const commandName = (baseVoiceOver.commanderCommands as any)[command as any];
  //       actionsLog.push(`Screen reader performs "${commandName}".`);
  //     }

  //     const result = await baseVoiceOver.perform(command, options);
  //     await reportStateChange();
  //     return result;
  //   },
  //   click: async (options) => {
  //     let action = `Screen reader clicks with ${options?.button ?? 'left'} mouse button.`;
  //     if (options?.clickCount && options.clickCount > 1) {
  //       action += ` ${options.clickCount} times`;
  //     }
  //     actionsLog.push(action);

  //     const result = await baseVoiceOver.click(options);
  //     await reportStateChange();
  //     return result;
  //   },
  //   lastSpokenPhrase: async () => {
  //     const result = await baseVoiceOver.lastSpokenPhrase();
  //     await reportStateChange();
  //     return result;
  //   },
  //   itemText: async () => {
  //     const result = await baseVoiceOver.itemText();
  //     await reportStateChange();
  //     return result;
  //   },
  //   spokenPhraseLog: baseVoiceOver.spokenPhraseLog,
  //   itemTextLog: baseVoiceOver.itemTextLog,
  //   navigateToWebContent: async () => {
  //     const result = await baseVoiceOver.navigateToWebContent();
  //     actionsLog.push('Screen reader navigates to the web content.');
  //     return result;
  //   },
  //   keyboardCommands: 1 as any,
  //   takeCursorScreenshot: 1 as any,
  //   copyLastSpokenPhrase: 1 as any,
  //   saveLastSpokenPhrase: 1 as any,
  //   clearSpokenPhraseLog: 1 as any,
  //   clearItemTextLog: 1 as any,
  // };

  const getReport = async (standFilePath: string) => {
    const exampleFileRelativePath = resolveRelativePath(
      resolvePath(__dirname, '../..'),
      standFilePath,
    );
    const standUrl = `https://github.com/semrush/intergalactic/blob/master/${exampleFileRelativePath}`;
    const actionsList = (await baseVoiceOver.spokenPhraseLog()).join('\n');

    return `**Running screen reader against [this file](${standUrl}).**

\`\`\`
${actionsList}
\`\`\`
`;
  };
  return {
    voiceOver: baseVoiceOver,
    getReport,
  };
};
