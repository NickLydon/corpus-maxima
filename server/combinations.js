//calling combinations() returns an object with a method called all
function combinations() {
    
    return {
        //This is a method that takes a single parameter (a string called initialTerm), 
        //that the user searched for. It returns an array of permutations of the search
        //term that they may also be interested in
        all: function(initialTerm) {
            //This is a local variable called 'x' that represents an array. Variables declared in functions
            //are only visible within the function, i.e. within the two braces ('{' and '}')
            var x = [];
            console.log(_);
            //Push is an array method that pushes an item into the next available slot
            x.push(initialTerm);
            
            var replaceAA = initialTerm.replace("aa", "a");
            x.push(replaceAA);
            
            var replaceOO = initialTerm.replace("oo", "o");
            x.push(replaceOO);
            
            var replaceEE = initialTerm.replace("ee", "e");
            x.push(replaceEE);
            
            var replaceUV = initialTerm.replace("u", "v");
            x.push(replaceUV);
            
            var replaceUW = initialTerm.replace("u", "w");
            x.push(replaceUW);
            
            var replaceVU = initialTerm.replace("v", "u");
            x.push(replaceVU);
            
            var replaceVW = initialTerm.replace("v", "w");
            x.push(replaceVW);
            
            var replaceWV = initialTerm.replace("w", "v");
            x.push(replaceWV);
            
            var replaceWU = initialTerm.replace("w", "u");
            x.push(replaceWU);
            
            //Functions always return a value - if the 'return' keyword is not used then it returns 'undefined',
            //a special JavaScript value. 
            return x;//an array of all search terms
        }
    };
    
}

