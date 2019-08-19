"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Node Mpdules
const fs_1 = __importDefault(require("fs"));
exports.getNotes = () => { };
exports.addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length) {
        console.log('Duplicate title found', duplicateNotes);
        return;
    }
    notes.push({ title, body });
    saveNotes(notes);
    console.log('New note added!');
};
exports.removeNote = (title) => {
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
        const dataBuffer = fs_1.default.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    }
    catch (error) {
        return [];
    }
};
const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs_1.default.writeFileSync('notes.json', dataJSON);
};
//# sourceMappingURL=notes.js.map