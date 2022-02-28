/* eslint-disable no-console */
import EventEmitter from 'events';
import chalk from 'chalk';
import PrettyError from 'pretty-error';

export class Reporter extends EventEmitter {
  progressStatus = null;
  tasks = [];
  progressTasks = [];

  constructor() {
    super();

    const pe = new PrettyError();

    this.progressStatus = null;
    this.tasks = [];
    this.progressTasks = [];

    this.on('start', (taskName) => {
      this.progressTasks.push(taskName);
      console.log(`${this.getProgressTask(taskName)} ${chalk.green(`${taskName}`)}`);
    });

    this.on('skip', (taskName) => {
      console.log(`${chalk.blue(`${taskName}`)}: SKIP`);
    });

    this.on('message', (taskName, message) => {
      console.log(`${chalk.cyan(`${taskName}`)}: ${message}`);
    });

    this.on('warning', (taskName, message) => {
      console.log(`${chalk.red(`${taskName}`)}: ${message}`);
    });

    this.on('done', (taskName) => {
      // if (this.progressStatus) {
      //   this.progressStatus.succeed('Success');
      // }
    });

    this.on('error', (taskName, error) => {
      // if (this.progressStatus) {
      //   this.progressStatus.fail('Failure');
      // }
      console.error(pe.render(error));
    });
  }

  progress(message) {
    // Hack 😞
    // if (this.progressStatus) console.log('');
    // this.progressStatus = ora(message);
    // this.progressStatus.start();
    // this.progressStatus = elegantStatus(message);
  }

  getProgressTask(taskName) {
    const index = this.progressTasks.indexOf(taskName);
    return chalk.inverse(` ${index + 1}/${this.tasks.length} `);
  }

  addTask(taskName) {
    this.tasks.push(taskName);
  }
}
