import { readFile } from 'fs/promises';
import { relative as resolveRelativePath, resolve as resolvePath } from 'path';
import os from 'os';
import { VoiceOver } from '@guidepup/guidepup/lib/macOS/VoiceOver/VoiceOver';
import { CommandOptions } from '@guidepup/guidepup';
import { execSync } from 'child_process';

const darwin2macos = {
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

export const makeVoiceOverReporter = async (baseVoiceOver: VoiceOver) => {
  const verboseLogging = false;
  const actionsLog: string[] = [];
  const actionsHistory: { actionName: keyof VoiceOver; args: any[] }[] = [];

  // const repeatLastAction = async () => {
  //   const lastAction = actionsHistory[actionsHistory.length - 1];
  //   if (lastAction) {
  //     // eslint-disable-next-line no-console
  //     console.log(`Repeating last action "${lastAction.actionName}"`);
  //     if (typeof baseVoiceOver[lastAction.actionName] === 'function') {
  //       return await (baseVoiceOver[lastAction.actionName] as any)(...lastAction.args);
  //     } else {
  //       return baseVoiceOver[lastAction.actionName];
  //     }
  //   }
  // };

  let prevSpokenPhrase = await baseVoiceOver.lastSpokenPhrase();
  let prevItemTextLog = await baseVoiceOver.itemTextLog();
  const healthCheck = async () => {
    /* eslint-disable no-console */
    const spokenPhrase = await baseVoiceOver.lastSpokenPhrase();
    const itemTextLog = await baseVoiceOver.itemTextLog();
    if (
      spokenPhrase === 'Dictation Preferences… default button' ||
      spokenPhrase === 'You can configure your microphone in Dictation preferences.' ||
      spokenPhrase ===
        'Dictation system dialog To use Dictation, you need to select a microphone or connect an external microphone. You can configure your microphone in Dictation preferences. To use Dictation, you need to select a microphone or connect an external microphone.'
    ) {
      console.log({
        spokenPhrase,
        itemTextLog,
        actionsLog,
        detect: await baseVoiceOver.detect(),
        default: await baseVoiceOver.default(),
      });
      console.log(`Unexpected settings window detected. Debug logs are available above.`);
      console.log('System settings:');
      console.log(execSync('defaults read', { encoding: 'utf8' }));
      await baseVoiceOver.next();
      console.log(
        `Next was performed, now item text is "${await baseVoiceOver.itemText()}" and last spoken phrase is "${await baseVoiceOver.lastSpokenPhrase()}"`,
      );
      await baseVoiceOver.next();
      console.log(
        `Next was performed, now item text is "${await baseVoiceOver.itemText()}" and last spoken phrase is "${await baseVoiceOver.lastSpokenPhrase()}"`,
      );
      await baseVoiceOver.next();
      console.log(
        `Next was performed, now item text is "${await baseVoiceOver.itemText()}" and last spoken phrase is "${await baseVoiceOver.lastSpokenPhrase()}"`,
      );
      await baseVoiceOver.act();
      console.log(
        `Act was performed, now item text is "${await baseVoiceOver.itemText()}" and last spoken phrase is "${await baseVoiceOver.lastSpokenPhrase()}"`,
      );
      console.log('System settings:');
      console.log(execSync('defaults read', { encoding: 'utf8' }));

      throw new Error(`This all is not ok, use debug logs to resolve the issue`);
      // console.log(
      //   `Removing last action log from report, pressing Escape and trying to repeat last action`,
      // );

      // actionsLog.pop();
      // await baseVoiceOver.press('Escape', { application: 'Playwright' });

      // console.log(
      //   `Escaped was pressed, now item text is "${await baseVoiceOver.itemText()}" and last spoken phrase is "${await baseVoiceOver.lastSpokenPhrase()}"`,
      // );

      // if ((await baseVoiceOver.lastSpokenPhrase()).includes('about:blank')) {
      //   console.log(
      //     `Focus switched to tab itself, performing .interact() to put focus back into tab`,
      //   );
      //   await baseVoiceOver.interact();

      //   console.log(
      //     `.interact() was performed, now item text is "${await baseVoiceOver.itemText()}" and last spoken phrase is "${await baseVoiceOver.lastSpokenPhrase()}"`,
      //   );
      // }

      // verboseLogging = true;
      // console.log(`Verbose logging was enabled`);

      // return await repeatLastAction();
      /* eslint-enable no-console */
    }
  };
  const reportStateChange = async () => {
    const spokenPhrase = await baseVoiceOver.lastSpokenPhrase();
    const itemTextLog = await baseVoiceOver.itemTextLog();
    if (spokenPhrase && spokenPhrase !== prevSpokenPhrase) {
      actionsLog.push(`Screen reader says "${spokenPhrase}".`);
    }
    if (itemTextLog && itemTextLog !== prevItemTextLog) {
      actionsLog.push(`Screen reader see element "${itemTextLog}".`);
    }
    if (verboseLogging) {
      // eslint-disable-next-line no-console
      console.log(`Verbose log`, {
        spokenPhrase,
        itemTextLog,
        actionsLog,
      });
    }
    prevSpokenPhrase = spokenPhrase;
    prevItemTextLog = itemTextLog;
  };

  const voiceOverWrapper: Omit<
    VoiceOver,
    'mouse' | 'keyboard' | 'cursor' | 'caption' | 'lastSpokenPhrase' | 'itemText'
  > & {
    lastSpokenPhrase: (options?: CommandOptions) => Promise<string>;
    itemText: (options?: CommandOptions) => Promise<string>;
  } = {
    commander: baseVoiceOver.commander,
    detect: async () => {
      actionsHistory.push({ actionName: 'detect', args: [] });
      const result = await baseVoiceOver.detect();
      const resultString = result ? 'it is supported' : 'it is not supported';
      actionsLog.push(
        `Screen reader checked is it supported on current os (${getOsName()}): ${resultString}.`,
      );
      if (result) {
        const repeatedResult = await healthCheck();
        if (repeatedResult) return repeatedResult;
      }
      return result;
    },
    default: async () => {
      actionsHistory.push({ actionName: 'default', args: [] });
      const result = await baseVoiceOver.default();
      const resultString = result ? 'it is' : "it's not";
      actionsLog.push(`Screen reader checked is it default system screen reader: ${resultString}.`);
      if (result) {
        const repeatedResult = await healthCheck();
        if (repeatedResult) return repeatedResult;
      }
      return result;
    },
    start: async (options) => {
      actionsHistory.push({ actionName: 'start', args: [options] });
      actionsLog.push(`Screen reader is turning on.`);
      const result = await baseVoiceOver.start(options);
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    stop: async (options) => {
      actionsHistory.push({ actionName: 'stop', args: [options] });
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      actionsLog.push(`Screen reader is turning off.`);
      return baseVoiceOver.stop(options);
    },
    previous: async (options) => {
      actionsHistory.push({ actionName: 'previous', args: [options] });
      actionsLog.push(`Screen reader goes to the previous element.`);
      const result = await baseVoiceOver.previous(options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    next: async (options) => {
      actionsHistory.push({ actionName: 'next', args: [options] });
      actionsLog.push(`Screen reader goes to the next element.`);
      const result = await baseVoiceOver.next(options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    act: async (options) => {
      actionsHistory.push({ actionName: 'act', args: [options] });
      actionsLog.push(`Screen reader triggers element default action.`);
      const result = await baseVoiceOver.act(options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    interact: async (options) => {
      actionsHistory.push({ actionName: 'interact', args: [options] });
      actionsLog.push(`Screen reader goes into the active element.`);
      const result = await baseVoiceOver.interact(options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    stopInteracting: async (options) => {
      actionsHistory.push({ actionName: 'stopInteracting', args: [options] });
      actionsLog.push(`Screen reader goes out of active element.`);
      const result = await baseVoiceOver.stopInteracting(options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    press: async (key, options) => {
      actionsHistory.push({ actionName: 'press', args: [key, options] });
      actionsLog.push(`Screen reader presses the "${key}" button.`);
      const result = await baseVoiceOver.press(key, options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    type: async (text, options) => {
      actionsHistory.push({ actionName: 'type', args: [text, options] });
      actionsLog.push(`Screen reader types "${text}".`);
      const result = await baseVoiceOver.type(text, options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    perform: async (command, options) => {
      actionsHistory.push({ actionName: 'perform', args: [command, options] });
      if (typeof command === 'object' && 'description' in command) {
        if (!command.description) {
          throw new Error(
            `Performing keyboard commands without description is restricted via VoiceOver reporter`,
          );
        }
        actionsLog.push(`Screen reader performs "${command.description}".`);
      } else {
        const commandName = baseVoiceOver.commander.commands[command as any];
        actionsLog.push(`Screen reader performs "${commandName}".`);
      }

      const result = await baseVoiceOver.perform(command, options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    click: async (options) => {
      actionsHistory.push({ actionName: 'click', args: [options] });
      let action = `Screen reader clicks with ${options.button ?? 'left'} mouse button.`;
      if (options.clickCount > 1) {
        action += ` ${options.clickCount} times`;
      }
      actionsLog.push(action);

      const result = await baseVoiceOver.click(options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    lastSpokenPhrase: async (options) => {
      actionsHistory.push({ actionName: 'lastSpokenPhrase', args: [options] });
      const result = await baseVoiceOver.lastSpokenPhrase(options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    itemText: async (options) => {
      actionsHistory.push({ actionName: 'itemText', args: [options] });
      const result = await baseVoiceOver.itemText(options);
      await reportStateChange();
      const repeatedResult = await healthCheck();
      if (repeatedResult) return repeatedResult;
      return result;
    },
    spokenPhraseLog: baseVoiceOver.spokenPhraseLog,
    itemTextLog: baseVoiceOver.itemTextLog,
  };

  const getReport = async (standFilePath: string) => {
    const exampleFileRealtivePath = resolveRelativePath(
      resolvePath(__dirname, '../..'),
      standFilePath,
    );
    const standUrl = `https://github.com/semrush/intergalactic/blob/master/${exampleFileRealtivePath}`;
    const actionsList = actionsLog.map((log, index) => `${index + 1}. ${log}`).join('\n');

    return `**Running screen reader against [this file](${standUrl}).**

${actionsList}
`;
  };
  return {
    voiceOver: voiceOverWrapper,
    getReport,
  };
};

export const getReportHeader = async () => {
  const intergalacticPacakgeFile = await readFile(
    resolvePath('./semcore/ui/package.json'),
    'utf-8',
  );
  const reactPackageFile = await readFile(
    resolvePath('./node_modules/react/package.json'),
    'utf-8',
  );
  const playwrightPacakgeFile = await readFile(
    resolvePath('./node_modules/playwright/package.json'),
    'utf-8',
  );
  const guidepupPacakgeFile = await readFile(
    resolvePath('./node_modules/@guidepup/guidepup/package.json'),
    'utf-8',
  );

  const { version: intergalacticVersion } = JSON.parse(intergalacticPacakgeFile);
  const { version: reactVersion } = JSON.parse(reactPackageFile);
  const { version: playwrightVersion } = JSON.parse(playwrightPacakgeFile);
  const { version: guidepupVersion } = JSON.parse(guidepupPacakgeFile);

  return `## Automated screen reader testing

_Intergalactic v${intergalacticVersion}, React v${reactVersion}, Playwright v${playwrightVersion},\nGuidepup v${guidepupVersion}, ${getOsName()}._`;
};
