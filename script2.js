var squares = document.getElementsByClassName("square");
var resetGame = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var state = document.querySelector("#score");
var rgbValue = document.querySelector(".rgbValue");
var gameover=false,pickedRgb,isHard=true;

//start game on hard mode
loadGame();

//click event for reset,hard,easy
resetGame.addEventListener("click",resetHtml);
easyButton.addEventListener("click",function(){
	isHard=false;
	resetHtml();//reset and reload 
});
hardButton.addEventListener("click",function(){
    isHard=true;
    resetHtml();//reset and reload 
});

//function to pick RGB by picking easy(0-3) hard(0-6)
function pickRgb(value)
{
	return Math.floor(Math.random() * value);
}
//function to create RGB value
function setRgbValue()
{
	var r=Math.floor(Math.random() * 255);
	var g=Math.floor(Math.random() * 255);
	var b=Math.floor(Math.random() * 255);
	col = "rgb(" + r + ", " + g + ", " + b + ")";	
	return col;
}
//load game function set hard or easy game by ishard bolean value
function loadGame()
{
	gameover=false;
	var value;
	if(isHard)
	{
		value=6;
		hardButton.classList.add("selected");
		easyButton.classList.remove("selected");
		isHard=true;
	}
	else
	{
		value=3;
		hardButton.classList.remove("selected");
        easyButton.classList.add("selected");
		isHard=false;
	}
	for(var i=0;i<value;i++)
	{
		squares[i].addEventListener("click",function(){
		    if(!gameover)
	        {
	            if(this.style.background === pickedRgb)
		        {
		           gameover=true;
		           winner(this.style.background);
	            }
	            else
	            {
			        this.style.background="#232323";
			        state.textContent = "Try Again";
		        }
            }
		});
		squares[i].style.background=setRgbValue();
	}
	pickedRgb=squares[pickRgb(value)].style.background;
	rgbValue.textContent=pickedRgb; 	// winner pick RGB value
}
//function reset the game and reload it even when switching between hard and easy
function resetHtml() 
{
	resetGame.textContent = "NEW COLORS";
	state.textContent = "Start";
	document.querySelector("#container").style.backgroundColor="steelblue";
	gameover=false;
	for(var i=0;i<6;i++)
    {
    	squares[i].style.background = "#232323";   
    }
    loadGame();
}
//function deal with the winner
function winner(back)
{
	for(var i=0;i<6;i++)
    {
    	squares[i].style.background=pickedRgb;
    }
    document.querySelector("#container").style.backgroundColor=pickedRgb;
    resetGame.textContent = "Replay?";
    state.textContent = "You Win!";
}