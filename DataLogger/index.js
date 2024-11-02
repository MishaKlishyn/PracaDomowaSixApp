const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//resolve obietnica spełnina
const askQuestion = (question) =>{
    return new Promise((resolve)=> rl.question(question,resolve));

};
(async ()=>{
    try {
        const firstName = await askQuestion("Podaj namę;");
        const lastName = await askQuestion("Podaj nazwisko;");
        const age = await askQuestion("Podaj wiek;");

        const userData = {
            firstName,
            lastName,
            age: parseInt(age,10),
        };
        await fs.writeFile('userData.json', JSON.stringify(userData,null,2), 'utf-8');
        console.log('Dane zapisane do pliku userData.json.');

        const data = await fs.readFile('userData.json', 'utf-8');
        console.log('Dane zapisane w pliku:', JSON.parse(data));
    }catch(error){
        console.error('Błąd:', error);
    }finally{
        rl.close();
    }
})();