const fs = require('fs');
const path = require('path');
const logFile = 'file_changes.log';
const folderToWatch = './watched_folder';


const logChange = message => fs.appendFile(logFile, message + '\n', err => {
    if (err) console.error('Bład logfile:', err);
});


fs.watch(folderToWatch, (eventType, filename) => {
    if (!filename) return;
    const filePath = path.join(folderToWatch, filename);
    if (eventType === 'rename') {
        fs.access(filePath, fs.constants.F_OK, err => {
            logChange(err ? `Delete plik: ${filename}` : `add plik: ${filename}`);
        });
    } else if (eventType === 'change') {
        logChange(`zmieniono plik: ${filename}`);
    }
});

console.log(`Monitoring changes in folder: ${folderToWatch}`);
