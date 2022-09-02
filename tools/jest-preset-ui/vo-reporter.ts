import { voiceOver } from '@guidepup/guidepup';
import { readFile } from 'fs/promises';
import { relative as resolveRelativePath, resolve as resolvePath } from 'path';
import { CommanderCommands } from '@guidepup/guidepup/lib/macOS/VoiceOver/CommanderCommands';
import os from 'os';
type VoiceOver = typeof voiceOver;

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
  const actionsLog: string[] = [];

  let prevSpokenPhrase = await baseVoiceOver.lastSpokenPhrase();
  let prevItemTextLog = await baseVoiceOver.itemTextLog();
  const reportStateChange = async () => {
    const spokenPhrase = await baseVoiceOver.lastSpokenPhrase();
    const itemTextLog = await baseVoiceOver.itemTextLog();
    if (prevSpokenPhrase !== spokenPhrase) {
      actionsLog.push(`Screen reader says "${spokenPhrase}".`);
      prevSpokenPhrase = spokenPhrase;
    }
    if (prevItemTextLog !== itemTextLog) {
      actionsLog.push(`Screen reader see element "${itemTextLog}".`);
      prevItemTextLog = itemTextLog;
    }
    // eslint-disable-next-line no-console
    console.log(actionsLog.join(', '));
  };

  const voiceOverWrapper: Omit<VoiceOver, 'mouse' | 'keyboard' | 'cursor' | 'caption'> = {
    commander: baseVoiceOver.commander,
    detect: async () => {
      const result = await baseVoiceOver.detect();
      const resultString = result ? 'it is supported' : 'it is not supported';
      actionsLog.push(
        `Screen reader checked is it supported on current os (${getOsName()}): ${resultString}.`,
      );
      return result;
    },
    default: async () => {
      const result = await baseVoiceOver.default();
      const resultString = result ? 'it is' : "it's not";
      actionsLog.push(`Screen reader checked is it default system screen reader: ${resultString}.`);
      return result;
    },
    start: (options) => {
      actionsLog.push(`Screen reader was turned on.`);
      return baseVoiceOver.start(options);
    },
    stop: (options) => {
      actionsLog.push(`Screen reader was turned off.`);
      return baseVoiceOver.stop(options);
    },
    previous: async (options) => {
      actionsLog.push(`Screen reader goes to the previous element.`);
      const result = await baseVoiceOver.previous(options);
      await reportStateChange();
      return result;
    },
    next: async (options) => {
      actionsLog.push(`Screen reader goes to the next element.`);
      const result = await baseVoiceOver.next(options);
      await reportStateChange();
      return result;
    },
    act: async (options) => {
      actionsLog.push(`Screen reader triggers element default action.`);
      const result = await baseVoiceOver.act(options);
      await reportStateChange();
      return result;
    },
    interact: async (options) => {
      actionsLog.push(`Screen reader goes into the active element.`);
      const result = await baseVoiceOver.interact(options);
      await reportStateChange();
      return result;
    },
    stopInteracting: async (options) => {
      actionsLog.push(`Screen reader goes out of active element.`);
      const result = await baseVoiceOver.stopInteracting(options);
      await reportStateChange();
      return result;
    },
    press: async (key, options) => {
      actionsLog.push(`Screen reader presses the "${key}" button.`);
      const result = await baseVoiceOver.press(key, options);
      await reportStateChange();
      return result;
    },
    type: async (text, options) => {
      actionsLog.push(`Screen reader types "${text}".`);
      const result = await baseVoiceOver.type(text, options);
      await reportStateChange();
      return result;
    },
    perform: async (command, options) => {
      if (typeof command === 'object' && 'description' in command) {
        if (!command.description) {
          throw new Error(
            `Performing keyboard commands without description is restricted via VoiceOver reporter`,
          );
        }
        actionsLog.push(`Screen reader performs "${command.description}".`);
      } else {
        actionsLog.push(
          `Screen reader performs "${CommanderCommands[command as CommanderCommands]}".`,
        );
      }

      const result = await baseVoiceOver.perform(command, options);
      await reportStateChange();
      return result;
    },
    click: async (options) => {
      let action = `Screen reader clicks with ${options.button ?? 'left'} mouse button.`;
      if (options.clickCount > 1) {
        action += ` ${options.clickCount} times`;
      }
      actionsLog.push(action);

      const result = await baseVoiceOver.click(options);
      await reportStateChange();
      return result;
    },
    lastSpokenPhrase: (options) => baseVoiceOver.lastSpokenPhrase(options),
    itemText: (options) => baseVoiceOver.itemText(options),
    spokenPhraseLog: () => baseVoiceOver.spokenPhraseLog(),
    itemTextLog: () => baseVoiceOver.itemTextLog(),
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
