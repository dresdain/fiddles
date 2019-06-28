let tiles = document.querySelectorAll('.tile');
let unsplashAPI = 'https://source.unsplash.com/150x150/?';
let keywords = [
    'nature', 'water', 'city', 'night', 'fruit', 'sunset', 'music', 'town', 'lights', 'space', 'games', 'tea', 'girl', 'coffee', 'trees', 'football', 'ocean', 'bicycle', 'taxi', 'painting', 'hospital', 'fashion', 'travel', 'people', 'health', 'culture', 'garden', 'computer', 'fire', 'camping', 'mountain', 'lake', 'meeting', 'building', 'japan', 'snow', 'bokeh'
]; 

$(window).on("load", function () {
    $(".tile").each(function (index) { 

        // Parent
        let tile = this;

        // Only show 25 tiles
        if (index >= 25) {
            $(this).hide();
        }   
        // Initial image load from unsplash using keywords
        $(tile).children('img').attr('src', unsplashAPI + keywords[index]).fadeIn('slow');
        $(tile).append('<img>');

        // Preload next image  
        $(tile).children('img:nth-child(2)').attr('src', unsplashAPI + keywords[getRandomInt(0, keywords.length)]).hide(); 
        
        //Every 10 seconds, change tile image
        setInterval(() => { 
            //Check when first image has faded out
            $.when($(tile).children('img:nth-child(1)').fadeOut('slow')).done(function () {
                $(this).remove();
                $(tile).children('img').fadeIn('slow');
                // Preload next image
                $(tile).append('<img>'); 
                $(tile).children('img:nth-child(2)').attr('src', unsplashAPI + keywords[getRandomInt(0, keywords.length)]).hide(); 
                // Remove unnecessary img tags (should only have two images alternating, the second img is for loading the next image)
                $('.tile img:not([src]').remove();
            }); 
        }, 10000); 
    }); 
}); 

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
    

 
