"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Node Mpdules
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
exports.addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);
    if (duplicateNote) {
        console.log(chalk_1.default.red.inverse(` Duplicate title found, ${duplicateNote} `));
        return;
    }
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk_1.default.green.inverse(' New note added! '));
};
exports.removeNote = (title) => {
    const notes = loadNotes();
    const remaningNotes = notes.filter(note => note.title !== title);
    if (notes.length === remaningNotes.length) {
        console.log(chalk_1.default.red.inverse(` Note with title ${chalk_1.default.bgWhite.inverse(title)} was not found `));
        return;
    }
    saveNotes(remaningNotes);
    console.log(chalk_1.default.green.inverse(` Note with title ${chalk_1.default.white(title)} removed `));
};
exports.listNotes = () => {
    const notes = loadNotes();
    console.log(chalk_1.default.green.inverse(' Your notes '));
    notes.forEach(note => console.log(note.title));
};
exports.readNote = title => {
    const notes = loadNotes();
    const noteToRead = notes.find(note => note.title === title);
    if (!noteToRead) {
        console.log(chalk_1.default.red.inverse(`Note with title(${chalk_1.default.bgWhite.inverse(title)}) wasn't found`));
        return;
    }
    console.log(chalk_1.default.inverse.italic(noteToRead.title));
    console.log(chalk_1.default(noteToRead.body));
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