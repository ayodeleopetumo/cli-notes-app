// Node Mpdules
import fs from 'fs';
import chalk from 'chalk';

interface Notes {
  title: string;
  body: string;
}

export const getNotes = () => {};

export const addNote = (title: string, body: string) => {
  const notes: Notes[] = loadNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length) {
    console.log(
      chalk.red.inverse(` Duplicate title found, ${duplicateNotes} `)
    );
    return;
  }

  notes.push({ title, body });
  saveNotes(notes);
  console.log(chalk.green.inverse(' New note added! '));
};

export const removeNote = (title: string) => {
  const notes: Notes[] = loadNotes();
  const remaningNotes = notes.filter(note => note.title !== title);

  if (notes.length === remaningNotes.length) {
    console.log(
      chalk.red.inverse(
        ` Note with title ${chalk.bgWhite.inverse(title)} was not found `
      )
    );
    return;
  }

  saveNotes(remaningNotes);
  console.log(
    chalk.green.inverse(` Note with title ${chalk.white(title)} removed `)
  );
};

// Helper Methods
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJson = dataBuffer.toString();

    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};
