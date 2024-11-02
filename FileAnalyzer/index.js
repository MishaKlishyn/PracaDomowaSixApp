const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class FileAnalyzer extends EventEmitter {
    constructor(directory) {
        super();
        this.directory = directory;
    }

    analyze() {
        this.emit('analysisStarted');
        fs.readdir(this.directory, (err, files) => {
            if (err) return console.error('error odczytu katalogu:', err);
            files.forEach(file => {
                const filePath = path.join(this.directory, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) return console.error('error odczytu pliku:', err);
                    if (stats.isFile()) {
                        console.log(`Nazwa: ${file}, Rozmiar: ${stats.size} bytes, Rozszerzenie: ${path.extname(file)}, Ostatnia modyfikacja: ${stats.mtime}`);
                    }
                });
            });
            this.emit('analysisEnded');
        });
    }
}

const directoryPath = process.argv[2];
if (!directoryPath) {
    console.error('Podaj ścieżkę do katalogu jako argument.');
    process.exit(1);
}

const analyzer = new FileAnalyzer(directoryPath);
analyzer.on('analysisStarted', () => console.log('Rozpoczęto analizę plików...'));
analyzer.on('analysisEnded', () => console.log('Analiza zakończona.'));
analyzer.analyze();
