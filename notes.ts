// Node Mpdules
import fs from 'fs';

export const getNotes = () => {};

export const addNote = (title: string, body: string) => {
  const notes: { title: string; body: string }[] = loadNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length) {
    console.log('Duplicate title found', duplicateNotes);
    return;
  }

  notes.push({ title, body });
  saveNotes(notes);
  console.log('New note added!');
};

export const removeNote = (title: string) => {
  console.log(title);
  // const notes: { title: string; body: string }[] = loadNotes();
  // const duplicateNotes = notes.filter(note => note.title === title);

  // if (duplicateNotes.length) {
  //   console.log('Duplicate title found', duplicateNotes);
  //   return;
  // }

  // saveNotes(notes);
  // console.log('New note added!');
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
