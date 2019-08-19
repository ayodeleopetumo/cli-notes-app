// Node Core Modules
import fs from 'fs';

// NPM Modules
import chalk from 'chalk';
import yargs from 'yargs';

// Project Modules
import * as notes from './notes';

// Create cli commands
yargs.command({
  command: 'add',
  describe: 'Adds a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => {
    notes.addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Removes a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: argv => {
    notes.removeNote(argv.title);
  }
});

yargs.command({
  command: 'list',
  describe: 'Lists available notes',
  builder: {}
});

yargs.parse();
