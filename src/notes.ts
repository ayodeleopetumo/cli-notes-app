// Node Mpdules
import fs from 'fs';
import chalk from 'chalk';

interface Notes {
  title: string;
  body: string;
}

export const addNote = (title: string, body: string) => {
  const notes: Notes[] = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (duplicateNote) {
    console.log(chalk.red.inverse(` Duplicate title found, ${duplicateNote} `));
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

export const listNotes = () => {
  const notes: Notes[] = loadNotes();

  console.log(chalk.green.inverse(' Your notes '));
  notes.forEach(note => console.log(note.title));
};

export const readNote = title => {
  const notes: Notes[] = loadNotes();
  const noteToRead = notes.find(note => note.title === title);

  if (!noteToRead) {
    console.log(
      chalk.red.inverse(
        `Note with title(${chalk.bgWhite.inverse(title)}) wasn't found`
      )
    );
    return;
  }

  console.log(chalk.inverse.italic(noteToRead.title));
  console.log(chalk(noteToRead.body));
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
