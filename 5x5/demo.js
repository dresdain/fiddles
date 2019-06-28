// Image API
var unsplashAPI = 'https://source.unsplash.com/120x150/?';
var keywords = [
    'nature', 'water', 'city', 'night', 'fruit', 'sunset', 'music', 'town', 'lights', 'space', 'games', 'tea', 'drinks', 'coffee', 'trees', 'football', 'ocean', 'bicycle', 'taxi', 'painting', 'hospital', 'fashion', 'travel', 'people', 'health', 'culture', 'garden', 'computer', 'fire', 'camping', 'mountain', 'lake', 'meeting', 'building', 'japan', 'snow', 'bokeh'
]; 

// Setup delay
var delay = 1000; 
var slideCounter = 0;
// Random Tiles 
var maxTiles = 25; 
var randomImageSelect = randomUniqueInt(0, keywords.length, 25);
console.log(randomImageSelect);

var randomTileToChange = randomUniqueInt(0, 24, 25);
  

// 👇 Uncomment the following to stop randomization
// clearInterval(randomizeTiles);
// clearInterval(randomizeImages);

// 👇 Set the following to bool false, to disable slideshow
var slideShow = true;



$(window).on("load", function () {
    
    $(".tile").each(function(index){
        // Show only maxTiles
        if (index >= maxTiles){ $(this).hide() }
        if (index < maxTiles){
            // Using unsplash API involves adding keywords to the url
            // We check if keyword index is within our [keywords] array
            // otherwise, if index > keywords.length 
            // we will use a 'random' keyword as fallback
            var getImageKeyword = (keywords[randomImageSelect[index]] ? keywords[randomImageSelect[index]] : 'random');
            $(this).append('<img>')
                .children('img')
                .attr('src', unsplashAPI + getImageKeyword);
            $(this).append('<img/>');  
        }
    });

    
    // Store the next img in a hidden img tag
    preloadImg();
    var preloadimg_interval = setInterval(preloadImg, delay * (maxTiles - 1));

    //Randomly pick a tile, hide first img, show second image
    console.log(randomTileToChange);
    
    var randomizedTiles_interval = setInterval(() => {  
        $.when($('.tile').eq(randomTileToChange[slideCounter]).children('img:nth-child(1)').fadeOut('500'))
            .done(function(){
                $(this).remove();
                $('.tile').eq(randomTileToChange[slideCounter]).children('img:nth-child(2)').fadeIn('500');
               
                 $('.tile').eq(randomTileToChange[slideCounter]).append('<img>');
            });
        
        
        console.log(randomTileToChange[slideCounter]);    
        
        (slideCounter < maxTiles - 1 ? slideCounter++ : slideCounter = 0); 
    }, delay);  

 
}); 

function preloadImg(){
    randomImageSelect = randomUniqueInt(0, keywords.length, 25);
    // console.log(randomImageSelect);
    $(".tile").each(function (index) {
         $('.tile').eq(randomTileToChange[slideCounter]).append('<img>');
        //Initialize next image tag
        var getImageKeyword = (keywords[randomImageSelect[index]] ? keywords[randomImageSelect[index]] : 'random');
        $(this).children().eq(1)
            .hide()
            .attr('src', unsplashAPI + getImageKeyword);
    });
}


/* Converted to ES5, original: https://stackoverflow.com/questions/52528059/javascript-generate-a-random-number-between-1-and-5-but-never-the-same-number */
function randomUniqueInt(min, max, length){ 
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

 

 