// Image API
var unsplashAPI = 'https://source.unsplash.com/150x150/?';
var keywords = [
    'nature', 'water', 'city', 'night', 'fruit', 'sunset', 'music', 'town', 'lights', 'space', 'games', 'tea', 'drinks', 'coffee', 'trees', 'football', 'ocean', 'bicycle', 'taxi', 'painting', 'hospital', 'fashion', 'travel', 'people', 'health', 'culture', 'garden', 'computer', 'fire', 'camping', 'mountain', 'lake', 'meeting', 'building', 'japan', 'snow', 'bokeh'
]; 

// Random Tiles 
var maxTiles = 25;
var randomTiles = randomUniqueInt(0, keywords.length, 25);
console.log(randomTiles);

// Dynamically update/randomize dataset
var randomizeTiles = setInterval(() => {
    console.log(randomTiles);
    randomTiles = randomUniqueInt(0, keywords.length, 25);
}, 10000);

// 👇 Uncomment the following to stop randomization
// clearInterval(randomizeTiles);

// 👇 Set the following to bool false, to disable slideshow
var slideShow = true;



$(window).on("load", function () {
    $(".tile").each(function (index) { 

        // Parent reference
        let tile = this;

        // Only show 25 tiles
        if (index >= maxTiles) {
            $(this).hide();
        }   

        // Initial image load from unsplash using keywords
        $(tile).children('img')
            .attr('src', unsplashAPI + keywords[index])
            .attr('alt', keywords[index])
            .fadeIn('slow');  

        // Preload next image / img tag
        $(tile).append('<img>');
        $(tile).children('img:nth-child(2)')
            .attr('src', unsplashAPI + keywords[randomTiles[index]])
            .attr('alt', keywords[randomTiles[index]])
            .hide(); 
        
        //Every 10 seconds, change tile image 
        setInterval(() => {     
            //Check when first image has faded out | promise polyfill is needed for IE
            if(slideShow === true){
                $.when($(tile).children('img:nth-child(1)').fadeOut('slow'))
                    .done(function () {
                        // Remove original img tag
                        $(this).remove();
                        $(tile).children('img').fadeIn('slow');

                        // Preload next image   
                        $(tile).append('<img>');
                        $(tile).children('img:nth-child(2)')
                            .attr('src', unsplashAPI + keywords[randomTiles[index]])
                            .attr('alt', keywords[randomTiles[index]])
                            .hide();

                        // Remove unnecessary img tags (should only have two images alternating, the second img is for loading the next image)
                        $('.tile img:not([src]').remove();
                    });
            }
        }, 10000); 
    }); 
}); 

 

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

 

 