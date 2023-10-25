const { execFile } = require('child_process');

const DEFAULT_TIMEOUT = 10000;
const DEFAULT_MAX_BUFFER = 1000 * 1000 * 100;

async function runAppleScript(
  script,
  { timeout = DEFAULT_TIMEOUT } = { timeout: DEFAULT_TIMEOUT },
) {
  const scriptWithTimeout = `
with timeout of ${timeout} seconds
  ${script}
end timeout

on withTimeout(uiScript, timeoutSeconds)
	set endDate to (current date) + timeoutSeconds
	repeat
		try
			run script "tell application \\"System Events\\"
" & uiScript & "
end tell"
			exit repeat
		on error errorMessage
			if ((current date) > endDate) then
				error errorMessage & "\n\nFor script: " & uiScript
			end if
		end try
		
		delay 0.2
	end repeat
end doWithTimeout
`;

  return await new Promise((resolve, reject) => {
    const child = execFile(
      '/usr/bin/osascript',
      [],
      {
        maxBuffer: DEFAULT_MAX_BUFFER,
      },
      (e, stdout) => {
        if (e) {
          return reject(e);
        }

        if (!stdout) {
          return resolve();
        } else {
          return resolve(stdout.trim());
        }
      },
    );

    child.stdin.write(scriptWithTimeout);
    child.stdin.end();
  });
}

const enableFocusModeAppleScript = `
set timeoutSeconds to 30.0

set command to "
  do shell script \\"open 'x-apple.systempreferences:com.apple.preference.notifications?focus'\\"

  delay 5.0
  
  tell application \\"System Settings\\" to activate

  delay 1.0

  set doNotDisturbToggle to checkbox 1 of group 1 of tab group 1 of window \\"Notifications & Focus\\" of application process \\"System Settings\\"

  tell doNotDisturbToggle
    if not (its value as boolean) then click doNotDisturbToggle
  end tell

  tell application \\"System Settings\\" to quit
"

my withTimeout(command, timeoutSeconds)
`;

runAppleScript(enableFocusModeAppleScript);
