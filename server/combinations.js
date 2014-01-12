//calling combinations() returns an object with a method called all
function combinations() {
    
    var replacement = function(original) {
        return function(toReplace, replaceWith) {
            return original.replace(toReplace, replaceWith);
        };
    };
    
    return {
        //This is a method that takes a single parameter (a string called initialTerm), 
        //that the user searched for. It returns an array of permutations of the search
        //term that they may also be interested in
        all: function(initialTerm) {
            
            var replacementForOriginal = replacement(initialTerm),
            
                allPermuations = _.map([
                    ['',''],
                    ['aa', 'a'],
                    ['a', 'aa'],
                    ['ee', 'e'],
                    ['e', 'ee'],
                    ['oo', 'o'],
                    ['o', 'oo'],
                    ['u', 'v'],
                    ['u', 'w'],
                    ['w', 'u'],
                    ['w', 'v'],
                    ['v', 'u'],
                    ['v', 'w']
                ], function(applicationOfReplacement) {
                    return replacementForOriginal(applicationOfReplacement[0], applicationOfReplacement[1]);
                });
                
            return allPermuations;
        }
    };
    
}

