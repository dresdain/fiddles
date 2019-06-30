// Unsplash Image API
var unsplashAPI = 'https://source.unsplash.com/120x150/?';
var keywords = [
    'nature', 'water', 'city', 'night', 'fruit', 'sunset', 'music', 'town', 'lights', 'space', 'games', 'tea', 'drinks', 'coffee', 'trees', 'football', 'ocean', 'bicycle', 'taxi', 'painting', 'hospital', 'fashion', 'travel', 'people', 'health', 'culture', 'garden', 'computer', 'fire', 'camping', 'mountain', 'lake', 'meeting', 'building', 'japan', 'snow', 'bokeh'
]; 

//Select container and child
var tileContainer = ".tile-container";
var tileName = ".tile";

var delay = 5;  // Set delay interval in seconds
var maxTiles = 25; // Set maximum tiles to show and randomize


var tileArticle = tileContainer + ' > ' + tileName;
$(window).on("load", function () {
    //Make sure we're getting the right amount of tiles 
    if ($(tileArticle).length < maxTiles){ 
        for (let i = $(tileArticle).length; i < maxTiles; i++) {
            $(tileContainer).append('<article class="tile" />');
        }
    }

    // The following loop, populates the first set of random images, limits the number of tiles to var maxTiles
    var randomImageSelect = getRandomUniqueInt(0, keywords.length, maxTiles);
    $(tileArticle).each(function(index){ 
        if (index >= maxTiles){ $(this).hide() }
        if (index < maxTiles){ 
            $(this).addClass('randomize');
            //Check if a keyword exist in the keywords array, else we use the keyword 'random'
            var getImageKeyword = (keywords[randomImageSelect[index]] ? keywords[randomImageSelect[index]] : 'random');
            $(this).append('<img>')
                .children('img')
                .attr('src', unsplashAPI + getImageKeyword)
                .hide()
                .fadeIn();
        }
    });
    // Start the cycle
    randomizeTiles();
}); 

function randomizeTiles() {
    //Select a random tile
    var selectedRandomNum  = getRandomInt(0, (maxTiles - 1));
    var selectedRandomTile = $('.tile').eq(selectedRandomNum);

    //Check if delayOffset is not greater than the delay intended
    //Fallback to no offsetDelay / 0ms if false aka not preloading the image
    var convertDelay = delay * 1000;
    var delayOffset = (convertDelay > convertDelay - 1000 ? (convertDelay - 1000) : 0);
    
    //Ready next image URL
    var nextImage = unsplashAPI + keywords[getRandomInt(0, keywords.length)];
   
    //Make sure there is no duplicate, change src if there is
    while (checkForDuplicate(nextImage) === true) {
        nextImage = unsplashAPI + keywords[getRandomInt(0, keywords.length)];
    }
    if(checkForDuplicate(nextImage) === false){
        selectedRandomTile.append('<img src="' + nextImage+ '" style="display: none;" />');
    }

    //Delay fadeout and subtract offset to get a total of desired interval
    setTimeout(() => { 
        // $.when is a Promise and may require polyfill on IE
        $.when(selectedRandomTile.children('img:nth-child(1)').fadeOut())
            .done(function () {
                // Reset the cycle by removing original image, fading in new one
                selectedRandomTile.children('img:nth-child(1)').remove();
                selectedRandomTile.children('img:nth-child(1)').fadeIn(); 
                console.log('Changing tile #: ' + (selectedRandomNum+1));
                // And cycle again
                setTimeout(randomizeTiles, convertDelay - delayOffset);
            });
    }, delayOffset);
}
 
/* Traverses all .tiles > img in the DOM and checks for a duplicate of nextImage in their src attribute */
function checkForDuplicate(nextImage){
    var duplicate = false;
    $(tileArticle + '.randomize > img').map(function (index) {
        if (nextImage == $(this).attr('src')) {
            duplicate = true; 
        }
    }); 
    return (duplicate === true ? true : false);
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* Converted to ES5, original: https://stackoverflow.com/questions/52528059/javascript-generate-a-random-number-between-1-and-5-but-never-the-same-number */
function getRandomUniqueInt(min, max, length){ 
    var limit = max - min + 1;
    if (min > max || max < min) {
        throw new Error(`Parameter "min" has to be smaller than "max" and vice-versa.`)
    }
    else if (length > limit) {
        throw new Error(`The length between ${min} and ${max} cannot exceed ${limit}.`)
    } 
    var uniqueNumbers = [];
    var number;
    for (var i = 0; i < length; i++) {
        do
            number = Math.floor(Math.random() * limit) + min;
        while (uniqueNumbers.indexOf(number) !== -1);

        uniqueNumbers[i] = number;
    } 
    return uniqueNumbers;
}

 

 