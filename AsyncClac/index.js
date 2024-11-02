function calculator(num1, num2, operation, method) {
    const isValidOperation = operation === "add" || operation === "multiply";
    if (!isValidOperation) {
        console.error("Tylko add lub mnożenia");
        return;
    }

    const delay = 5000;

    if (method === "callback") {
        setTimeout(() => {
            const result = operation === "add" ? num1 + num2 : num1 * num2;
            console.log("Resultat callback:", result);
        }, delay);
    } else if (method === "promise") {
        new Promise((resolve) => {
            setTimeout(() => {
                const result = operation === "add" ? num1 + num2 : num1 * num2;
                resolve(result);
            }, delay);
        })
        .then(result => console.log("Resultat promise:", result))
        .catch(error => console.error("Error:", error));
    } else {
        console.error("Niewiadoma metoda.");
    }
}


calculator(5, 3, "add", "callback");    
calculator(4, 7, "multiply", "promise");  
calculator(2, 3, "subtract", "callback"); 
calculator(2, 3, "add", "calflback"); 

