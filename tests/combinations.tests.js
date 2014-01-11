//Will cause the test to fail if the list of 'terms' does not contain the item 'contains'
function assertListContainsTerm(terms, contains, initialTerm, overrideError) {
    ok(_.any(terms, function(term) { 
        return term === contains;
    }), overrideError || ('When given search term ' + initialTerm + ', the results should include ' + contains));
}

test('should give user\'s search term first', function() {
    var userSearchTerm = 'User\'s initial search',
        target = combinations().all(userSearchTerm);

    assertListContainsTerm(target, userSearchTerm, userSearchTerm, 'You should include the user\'s initial search');
});

module('vowels');

//Given a character it will check that an item with two characters is returned and
//given two characters it will check that an item with one of those characters is returned 
function replacementVowelTest(characters) {
    return function() {
        var initialTerm = 'b' + characters,
            target = combinations().all(initialTerm),
            replacement,
            count = function(str, chars) {
                return str.split(chars).length - 1;
            };
        
        if(count(initialTerm, characters) === 1) {
            replacement = initialTerm.replace(characters, characters[0]);
        } else {
            replacement = initialTerm.replace(characters, characters + characters);
        }
        
        assertListContainsTerm(target, replacement, initialTerm);
    };
}

_.each(['a', 'o', 'e'], function(vowel) {
    test(vowel, replacementVowelTest(vowel));
    test(vowel + vowel, replacementVowelTest(vowel + vowel));
});

module('same sounds');

test('uvw', function() {    
    var uvw = ['u', 'v', 'w'],
        searchTerms = _.map(uvw, function(x) {
            return 'b' + x;  
        }),
        results = _.map(searchTerms, function(term) {
            return combinations().all(term);
        });
        
    _.each(searchTerms, function(term) {
       ok(_.all(results, function(resultSet) {
           return _.contains(resultSet, term);
       }), term + ' should have been returned when supplying ' + searchTerms); 
    });
});
