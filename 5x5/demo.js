// Unsplash Image API
var rootDirectory = './img/';
var images = [
    'stock-photo-1.jpeg',
    'stock-photo-2.jpeg',
    'stock-photo-3.jpeg',
    'stock-photo-4.jpeg',
    'stock-photo-5.jpeg',
    'stock-photo-6.jpeg',
    'stock-photo-7.jpeg',
    'stock-photo-8.jpeg',
    'stock-photo-9.jpeg',
    'stock-photo-10.jpeg',
    'stock-photo-11.jpeg',
    'stock-photo-12.jpeg',
    'stock-photo-13.jpeg',
    'stock-photo-14.jpeg',
    'stock-photo-15.jpeg',
    'stock-photo-16.jpeg',
    'stock-photo-17.jpeg',
    'stock-photo-18.jpeg',
    'stock-photo-19.jpeg',
    'stock-photo-20.jpeg',
    'stock-photo-21.jpeg',
    'stock-photo-22.jpeg',
    'stock-photo-23.jpeg',
    'stock-photo-24.jpeg',
    'stock-photo-25.jpeg',
    'stock-photo-26.jpeg',
    'stock-photo-27.jpeg',
    'stock-photo-28.jpeg',
    'stock-photo-29.jpeg',
    'stock-photo-30.jpeg',
    'stock-photo-31.jpeg',
    'stock-photo-32.jpeg',
    'stock-photo-33.jpeg',
    'stock-photo-34.jpeg',
    'stock-photo-35.jpeg'
]; 

//Select container and child
var tileContainer = ".tile-container";
var tileName = ".tile";

var delay = 2;  // Set delay interval in seconds
var maxTiles = 15; // Set maximum tiles to show and randomize

var tileArticle = tileContainer + ' > ' + tileName;
$(window).on("load", function () {
    //Make sure we're getting the right amount of tiles 
    if ($(tileArticle).length < maxTiles){ 
        for (let i = $(tileArticle).length; i < maxTiles; i++) {
            $(tileContainer).append('<article class="tile" />');
        }
    }

    var imageTotal = (images.length < maxTiles ? maxTiles - images.length : maxTiles);
    var imageSetTotal = (images.length < maxTiles ? images.length : maxTiles);  
    var randomImageSelect = getRandomUniqueInt(0, imageTotal, imageSetTotal);
    console.log(randomImageSelect);

    // The following loop, populates the first set of random images, limits the number of tiles to var maxTiles
    $(tileArticle).each(function(index){ 
        if (index >= maxTiles){ $(this).hide() }
        if (index < maxTiles){ 
            $(this).addClass('randomize');   
            $(this).append('<img>')
                .children('img')
                .attr('src', rootDirectory + images[randomImageSelect[index]])
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
    var nextImage = rootDirectory + images[getRandomInt(0, images.length - 1)];
   
    //Make sure there is no duplicate, change src if there is
    while (checkForDuplicate(nextImage) === true) {
        nextImage = rootDirectory + images[getRandomInt(0, images.length - 1)];
    }
    if(checkForDuplicate(nextImage) === false){
        var newImage = '<img src="' + nextImage + '" style="display: none;" />';
        selectedRandomTile.append(newImage); 
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
                randomImageCycle = setTimeout(randomizeTiles, convertDelay - delayOffset);
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

 

 