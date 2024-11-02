const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addNewObject(filePath) {
    rl.question('Wpisz imię i nazwisko, wiek i adres e-mail oddzielone przecinkami: ', input => {
        const [name, age, email] = input.split(',').map(item => item.trim());
        const newObject = { name, age: Number(age), email };

        fs.readFile(filePath, 'utf8', (err, data) => {
            const jsonData = err ? [] : JSON.parse(data || '[]');
            jsonData.push(newObject);

            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
                if (err) console.error('Bład zapisu:', err);
                else console.log('Spoko jest zapisane!');
                rl.close();
            });
        });
    });
}

function displayData(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Bład przeczuty || nie znaleziono pliku .');
        } else {
            console.log('danne z pliku:', JSON.parse(data));
        }
        rl.close();
    });
}

rl.question('Czego potrzebujesz? (add / display): ', action => {
    rl.question('Napisz adrese do pliku JSON: ', filePath => {
        if (action === 'add') addNewObject(filePath);
        else if (action === 'display') displayData(filePath);
        else {
            console.log('Nie wiem czego potrzebujesz');
            rl.close();
        }
    });
});
