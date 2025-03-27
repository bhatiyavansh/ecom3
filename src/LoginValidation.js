function validation(values) {
    if (typeof values !== 'object' || values === null || Array.isArray(values)) {
        return "Invalid input: Expected an object";
    }

    
    return "Valid input";
}

console.log(validation({ email: "test@gmail.com" }));  
console.log(validation([1, 2, 3]));   
console.log(validation(null));        