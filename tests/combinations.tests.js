var alphabet = function() { return _.map(_.range('a'.charCodeAt(0), 'z'.charCodeAt(0)), function(c) { return String.fromCharCode(c); }); },
    vowels = function() { return ['a','e','i','o','u']; },
    consonants = function() { return _.difference(alphabet(), vowels()); };

//Will cause the test to fail if the list of 'terms' does not contain the item 'contains'
function assertListContainsTerm(terms, contains, initialTerm, overrideError) {
    ok(_.any(terms, function(term) { 
        return term === contains;
    }), overrideError || ('When given search term ' + initialTerm + ', the results should include ' + contains));
}

test('should give user\'s search term in list of results', function() {
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

function sameSoundTests(substitutions) {
    var searchTerms = _.map(substitutions, function(x) {
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
}

test('uvw', function() {  
    sameSoundTests(['u', 'v', 'w']);
});

test('i y', function() {
   sameSoundTests(['i', 'y']);
});

module('consonants');

function allCombinationsOfVowelsAndConsonants(f) {
    _.each(vowels(), function(vowel) {
        _.each(consonants(), function(consonant) {
            f(vowel, consonant);
        });
    });  
}

function consonantAssertions(testParameters) {
    allCombinationsOfVowelsAndConsonants(function(vowel, consonant) {
        var initialTerm = testParameters.initialTerm(vowel, consonant),
            target = combinations().all(initialTerm);
        
        assertListContainsTerm(target, testParameters.expected(vowel, consonant), initialTerm);    
    });
}

test('should double consonants when single consonant after short vowel', function() {
    consonantAssertions({
       initialTerm: function(vowel, consonant) {
           return vowel + consonant;
       },
       expected: function(vowel, consonant) {
           return vowel + consonant + consonant;
       }
    });
});

test('should halve consonants when double consonant after short vowel', function() {
    consonantAssertions({
       initialTerm: function(vowel, consonant) {
           return vowel + consonant + consonant;
       },
       expected: function(vowel, consonant) {
           return vowel + consonant;
       }
    });
});

test('should not touch consonants after long vowel', function() {
    allCombinationsOfVowelsAndConsonants(function(vowel, consonant) {
        var initialTerm = consonant + vowel + vowel + consonant,
            target = combinations().all(initialTerm);
            
        ok(!_.contains(target, initialTerm + consonant), 'should not have doubled the consonant after the long vowel');
    });
});

