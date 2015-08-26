var c = document.getElementById("c");
var ctx = c.getContext("2d");

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// the characters
var gurmukhi = "੧੨੩੪੫੬੭੮੯੦ੳਅਰਤਯਪਸਦਗਹਜਕਲਙੜਚਵਬਨਮੲਥਫਸ਼ਧਘਝਖਲ਼ੜ੍ਹਛਭਣ"
var sanskrit = "१२३४५६७८९अरतयपसदगहजकलङषचवबनमआथय़फशधघझखळक्षछभणऒ"
// converting the string into an array of single characters
var characters = sanskrit.split("");
var font_size = 12;
var columns = c.width/font_size;    // number of columns for the rain

// an array of drops - one per column
var drops = [];
// x below is the x coordinate
// 1 = y-coordinate of the drop (same for every drop initially)
for (var x = 0; x < columns; x++) 
    drops[x] = 1;

function getColor() {
    return "rgba(" + moment().format('HH') + ","
                + moment().format('mm') + ","
                + moment().format('ss')  + ", 0.05)";
}

function getColorHex() {
    return "#" + moment().format('HHmmss');   
}

// drawing the characters
function draw() {
    $("#color").css("background", getColorHex());
    $('#color').html(getColorHex());
    
    // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
    // translucent BG to show trail
    ctx.fillStyle = getColor();
    ctx.fillRect(0, 0, c.width, c.height);
    
    ctx.fillStyle = "#BBB"; // grey text
    ctx.font = font_size + "px arial";
    
    // looping over drops
    for (var i = 0; i < drops.length; i++) {
        // a random chinese character to print
        var text = characters[Math.floor(Math.random() * characters.length)];
        // x = i * font_size, y = value of drops[i] * font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        
        // sending the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;
        
        // Incrementing Y coordinate
        drops[i]++;
    }
}



setInterval(draw, 33);