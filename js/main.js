/////INITIALISATION

var d = 9;// dimension du jeu
var iaActive=false;
var passTurn=0;
var tabGame; 
var tabCheck; 
var tabStock; 
var tabKO=new Array(); 
var player=1; 
var player1=1;
var player2=2;
var alive;
var X=0; 
var Y=0; 
var score1=0;
var score2=0;
var lastCaseX; 
var lastCaseY;  
var turn=0; 
var classRow="row-2";
var classCell="cell-2";
var territory=0;
var passTurn=0;
var IA=3;
var tabIa;
var tabPriority;
var tabSelection;
var maxPriority=100;
var passTurnPlayer1=0;
var passTurnPlayer2=0;
var compteur_grid = 0;
var compteur_menu = 0;
var endGame=false;



function obj(X, Y) 
{
    this.Y = Y;
    this.X = X;
}

function ko(X, Y, player) 
{
    this.Y = Y;
    this.X = X;
}

function initialisation() 
{
 	tabGame = new Array();
 	tabCheck = new Array(); 
 	var txt=" ";
	 
	for (var i = 0; i < d; i++) 
	{
		tabGame[i] = new Array(); 
		tabCheck[i] = new Array(); 
		txt=txt+"<div class='"+classRow+"'>";

		for (var j = 0; j < d; j++)
		{
			
			tabGame[i][j] = false;	
			tabCheck[i][j] = false;	
		
			txt=txt+"<div id='col_"+i+" line_"+j+" ' class='"+classCell+"' onclick=' modifier(this); '></div>";
		}

		txt=txt+'</div>';
	}

	document.getElementById('game').innerHTML=txt;
}	

//// PARTIE JEU : Détection des cellule mortes et Permission de jouer la case

function modifier(myID)
{	
	var verif=true;
	var stockage=1;
	var play=false;

	var id=myID.id;
	var extract1 = id.indexOf("_",0); 
	var extract2 = id.indexOf("_",5); 

	document.getElementById('resultGame').innerHTML=' ';
	
	extract1 = parseInt(id.substr(extract1+1,2)); 
	extract2 = parseInt(id.substr(extract2+1,2));
		 
	if(tabGame[extract1][extract2]==false) 
	{
		if (tabKO.length>0)
		{
			for (var i = 0; i < tabKO.length; i++) 
			{
				if (tabKO[i].X==extract1&&tabKO[i].Y==extract2&&tabKO[i].player==player)
				{
					verif=false; 
					
				}
				
			}
		}
			

		if (player==1&&IA!=player&&turn%2==0 )
		{
			tabGame[extract1][extract2]=1;
			if(verif==true && verifKo(extract1,extract2,player2,true)==true || check(extract1,extract2,player1,false)==false)
			{
				if(turn>0)
				{
					document.getElementById('col_'+lastCaseX+' line_'+lastCaseY+' ').style.opacity='1';
					
				}
			
				lastCaseX=extract1;
				lastCaseY=extract2;
				
				myID.style.opacity='0.5';
				myID.style.backgroundImage='url("imgs/joueur1.png")';
				
				if (iaActive==false)
				{
					player=2;// et on change de joueur
				}

				turn++;
				passTurn=0;
				play=true;
				
			}
			
			else
			{
				tabGame[extract1][extract2]=false;
			}
		
		}

		else if (player==2&&IA!=player&&turn%2==1 )// même chose pour le joueur 2
		{
			tabGame[extract1][extract2]=2;

			if (verif==true && verifKo(extract1,extract2,player1,true)==true || check(extract1,extract2,player2,false)==false)
			{
				document.getElementById('col_'+lastCaseX+' line_'+lastCaseY+' ').style.opacity='1';
						
				lastCaseX=extract1;
				lastCaseY=extract2;
				myID.style.opacity='0.5';
				myID.style.backgroundImage='url("imgs/joueur2.png")';
						
				if (iaActive==false)
				{
					player=1;
				}
				turn++;
				passTurn=0;
				play=true;				
			}

			else
			{
				tabGame[extract1][extract2]=false;
			}

		}
		
	}

	if(iaActive==true&&play==true)
	{
		document.getElementById('col_'+lastCaseX+' line_'+lastCaseY+' ').style.opacity='1'
	
		game();

		if (passTurn!=IA)
		{
				player=player%2+1;
				console.log(player);
				verifKo(lastCaseX,lastCaseY,player%2+1,true);
				var element=document.getElementById('col_'+lastCaseX+' line_'+lastCaseY+' ');
				element.style.opacity='0.5';
				element.style.backgroundImage='url("imgs/joueur'+IA+'.png")';
				player=player%2+1;
				console.log(player);
				
		}
			turn++;
			

	}
		
	
}

// l'attribut destroy permet d'utiliser le résultats retourné par les fonctions
// sans éffacer les cases.

//verifKo regarde aux alentours de la case si il y a une case ennemi
function verifKo(posX,posY,actualPlayer,destroy)
{
	var posX=parseInt(posX);
	var posY=parseInt(posY);
	tabKO=new Array();
	var checked=false;	
	
	if (posX+1<d&&tabGame[posX+1][posY]==actualPlayer&&check(parseInt(posX+1),posY,actualPlayer,destroy)==true) 
	{
		checked=true;
	}

	if (posX-1>=0&&tabGame[posX-1][posY]==actualPlayer&&check(parseInt(posX-1),posY,actualPlayer,destroy)==true) 
	{
		checked=true;
	}

	if (posY+1<d&&tabGame[posX][posY+1]==actualPlayer&&check(posX,parseInt(posY+1),actualPlayer,destroy)==true) 
	{
		checked=true;
	}

	if (posY-1>=0&&tabGame[posX][posY-1]==actualPlayer&&check(posX,parseInt(posY-1),actualPlayer,destroy)==true) 
	{
		checked=true;
	}
		// ajout du score en fonction du nombre de cellule détruite(qui correspond à la valeur de tabStock.length)
		
	return checked;
}

//check détecte vérifie si un pattern à des libertés ou non
function check(posX,posY,actualPlayer,destroy)
{
	tabStock=new Array();
	alive=false;
	tabStock[0]=new obj;
	tabStock[0].X=posX;
	tabStock[0].Y=posY;
	tabCheck[posX][posY]=true;
	var compt=0;
	
	while(tabStock.length>compt&&alive==false)
	{
		verifCase(tabStock[compt].X,tabStock[compt].Y,actualPlayer);
		tabCheck[tabStock[compt].X][tabStock[compt].Y]=true;
		compt++;
	} 
	
	for (var i = 0; i < d; i++) 
	{
		
		for (var j = 0; j < d; j++)
		{
				tabCheck[i][j] = false;	
				
		}
				
	}
	
	if (tabStock.length>0&&alive==false)
	{
		if(destroy==true)
		{
			if (player==1&&alive==false)
			{
				score1=score1+tabStock.length;
				document.getElementById('player1Score').innerHTML='player 1 : '+score1;
			}
			if (player==2&&alive==false)
			{
				score2=score2+tabStock.length;
				document.getElementById('player2Score').innerHTML='player 2 : '+score2;
			}
			var b=tabKO.length
			tabKO[b]= new ko;
			tabKO[b].X=tabStock[0].X;
			tabKO[b].Y=tabStock[0].Y;
			tabKO[b].player=actualPlayer;
		
			for (var i = 0; i < tabStock.length; i++) 
			{
				document.getElementById("col_"+tabStock[i].X+" line_"+tabStock[i].Y+" ").style.backgroundImage='';
				tabGame[tabStock[i].X][tabStock[i].Y] = false;	
			}
		}
			
		return true;
	}
	
	else
	{
			return false;
	}
}

//verifCase regarde si elle trouve une cellule allié aux alentours ou une case vide
function verifCase(positionX,positionY,actualPlayer)
{
	var a;

	for (var i = -1; i < 2; i++) // on parcours toutes les cases auturn de la case sélectionnée
	{
		for (var j = -1; j < 2; j++) 
		{
			
			 if (positionX+i>=0&&positionX+i<d&&positionY+j>=0&&positionY+j<d&&((i==1&&j==0)||(i==(-1)&&j==0)||(i==0&&j==1)||(i==0&&j==(-1))))// on vérifie que la case que l'on veut vérifier existe et qu'il s'agit d'une des quatres cases à vérifier
			{
				if(tabGame[positionX+i][positionY+j]==false)
				{
					alive=true; 				
				}
				else if(tabGame[positionX+i][positionY+j]==actualPlayer&&tabCheck[positionX+i][positionY+j]==false)// sinon si c'est une case allié à coter et que l'on ne l'a pas déjà vérifiée
				{					
					a=tabStock.length; 					
					tabStock[a]=new obj;
					tabStock[a].X=parseInt(positionX+i);
					tabStock[a].Y=parseInt(positionY+j);
				}
				
			}
			
		}
	}
}

//réinitialise les variables du jeu et l'affichage du score
function resetGame()
{
	tabStock=new Array(); ;
	tabKO=new Array(); 
	tabCheck=new Array();
	player=1; 
	X=0; 
	Y=0; 
	score1=0;
	score2=0;
	lastCaseX=d; 
	lastCaseY=d;  
	turn=0;
	endGame=false;
	
	document.getElementById('player1Score').innerHTML='player 1 : 0';
	document.getElementById('player2Score').innerHTML='player 2 : 0';

	initialisation(); 
}



initialisation(); 



//// PARTIE  JEU : Détection des territoires

////renvoi les territoire des joeurs
function checkTerritory()
{
	
	for (var i =0; i <d; i++) 
	{
		for (var j =0; j <d; j++) 
		{

			if (tabGame[i][j]==false)
			{
				intersection(i,j);		
				
			}
		}
	}
	
	for (var i =0; i <d; i++) 
	{
		
		for (var j =0; j <d; j++) 
		{
			
			if (tabGame[i][j]==false)
			{
				intersection(i,j);
			}
		}
	}
	
	clean();
	clean();
	clean();	
}

//// regarde si une case libre possède soit un joeur ou une case qui possède un joeur dans une de ses intersection
//// si une case trouve deux joeurs différent la case ne sera pas définis sinon elle sera définis comme un territoire

function intersection(posX,posY)
{
	
	var validity=true;
	var X=posX;
	var Y=posY;
	var territory=0;

	while (X<d&&validity==true&&territory!=3)
	{
		
		if (tabGame[X][Y]==1||tabGame[X][Y]==3)
		{
			if (territory==2)
			{
				territory=3;
			}
			else if (territory==0)
			{
				territory=1;
			}

			validity=false;
		}
		if  (tabGame[X][Y]==2||tabGame[X][Y]==4)
		{
			if (territory==1)
			{
				territory=3;
			}
			else if (territory==0)
			{
				territory=2;
			}

			validity=false;
		}
		X++;
	}
	X=posX;
	validity=true;
	while (X>=0&&validity==true&&territory!=3)
	{
		
		if (tabGame[X][Y]==1||tabGame[X][Y]==3)
		{
			
			if (territory==2)
			{
				territory=3;
			}
			else if (territory==0)
			{
				territory=1;
			}

			validity=false;
		}

		else if  (tabGame[X][Y]==2||tabGame[X][Y]==4)
		{
			if (territory==1)
			{
				territory=3;
			}
			else if (territory==0)
			{
				territory=2;
			}

			validity=false;
		}
		X--;
	}

	X=posX;
	validity=true;

	while (Y<d&&validity==true&&territory!=3)
	{
		
		if (tabGame[X][Y]==1||tabGame[X][Y]==3)
		{
			if (territory==2)
			{
				territory=3;
			}
			else if (territory==0)
			{
				territory=1;
			}

			validity=false;
		}

		else if  (tabGame[X][Y]==2||tabGame[X][Y]==4)
		{
			if (territory==1)
			{
				territory=3;
			}
			else if (territory==0)
			{
				territory=2;
			}

			validity=false;
		}
		Y++;
	}

	Y=posY;
	validity=true;

	while (Y>=0&&validity==true&&territory!=3)
	{
		
		if (tabGame[X][Y]==1||tabGame[X][Y]==3)
		{
			if (territory==2)
			{
				territory=3
			}
			else if (territory==0)
			{
				territory=1
			}

			validity=false;
		}

		else if  (tabGame[X][Y]==2||tabGame[X][Y]==4)
		{
			if (territory==1)
			{
				territory=3;
			}
			else if (territory==0)
			{
				territory=2;
			}

			validity=false;
		}
		Y--;
	}

	Y=posY;
	validity=true;

	if (territory==1)
	{
		tabGame[posX][posY]=3;
		
	}

	else if  (territory==2)
	{
		tabGame[posX][posY]=4;
	}
}

// le jeu dans les deux sens 
// si elle trouve une case non définis (soit tabGame[i][j]==false) autour d'elle, elle prend la valeur false
function clean()
{
	for (var i =0; i < d; i++) 
	{
		for (var j =0; j < d; j++) 
		{
			if (tabGame[i][j]==3)
			{
				if(i+1<d&&tabGame[i+1][j]!=1&&tabGame[i+1][j]!=3)
				{
					tabGame[i][j]=false;
				}
				else if(j+1<d&&tabGame[i][j+1]!=1&&tabGame[i][j+1]!=3)
				{
					tabGame[i][j]=false;
				}
				else if(i-1>=0&&tabGame[i-1][j]!=1&&tabGame[i-1][j]!=3)
				{
					tabGame[i][j]=false;
				}
				else if(j-1>=0&&tabGame[i][j-1]!=1&&tabGame[i][j-1]!=3)
				{
					tabGame[i][j]=false;
				}
			}
		
			
			if (tabGame[i][j]==4)
			{
				if(i-1>=0&&tabGame[i-1][j]!=2&&tabGame[i-1][j]!=4)
				{
					tabGame[i][j]=false;
				}
				else if(j-1>=0&&tabGame[i][j-1]!=2&&tabGame[i][j-1]!=4)
				{
					tabGame[i][j]=false;
				}
				else if(i+1<d&&tabGame[i+1][j]!=2&&tabGame[i+1][j]!=4)
				{
					tabGame[i][j]=false;
				}
				else if(j+1<d&&tabGame[i][j+1]!=2&&tabGame[i][j+1]!=4)
				{
					tabGame[i][j]=false;
				}
			}

		}
		
	}
	for (var i =d-1; i >=0; i--) 
	{
		for (var j =d-1; j >=0; j--) 
		{
			if (tabGame[i][j]==3)
			{
				if(i+1<d&&tabGame[i+1][j]!=1&&tabGame[i+1][j]!=3)
				{
					tabGame[i][j]=false;
				}
				else if(j+1<d&&tabGame[i][j+1]!=1&&tabGame[i][j+1]!=3)
				{
					tabGame[i][j]=false;
				}
				else if(i-1>=0&&tabGame[i-1][j]!=1&&tabGame[i-1][j]!=3)
				{
					tabGame[i][j]=false;
				}
				else if(j-1>=0&&tabGame[i][j-1]!=1&&tabGame[i][j-1]!=3)
				{
					tabGame[i][j]=false;
				}
			}
		
			
			if (tabGame[i][j]==4)
			{
				if(i-1>=0&&tabGame[i-1][j]!=2&&tabGame[i-1][j]!=4)
				{
					tabGame[i][j]=false;
				}
				else if(j-1>=0&&tabGame[i][j-1]!=2&&tabGame[i][j-1]!=4)
				{
					tabGame[i][j]=false;
				}
				else if(i+1<d&&tabGame[i+1][j]!=2&&tabGame[i+1][j]!=4)
				{
					tabGame[i][j]=false;
				}
				else if(j+1<d&&tabGame[i][j+1]!=2&&tabGame[i][j+1]!=4)
				{
					tabGame[i][j]=false;
				}
			}

		}
		
	}
}

//// PARTIE FIN DE JEU et autres fonctions: 

//// affiche le territoire en fin de jeu et affiche en plus des territoire le gagnant et la différence de score
function afficheTerritory()
{
	checkTerritory();

	for (var i = 0; i<d; i++) 
	{
		for (var j = 0; j<d; j++) 
		{
			if (tabGame[i][j]==3)
			{
				document.getElementById('col_'+i+' line_'+j+' ').style.backgroundColor='black';
				document.getElementById('col_'+i+' line_'+j+' ').style.opacity=0.5;
				score1++;
				tabGame[i][j]=false;
			}

			else if(tabGame[i][j]==4)
			{
				document.getElementById('col_'+i+' line_'+j+' ').style.backgroundColor='#fff';
				document.getElementById('col_'+i+' line_'+j+' ').style.opacity=0.5;
				score2++;
				tabGame[i][j]=false;
			}

			else if (tabGame[i][j]==false)
			{
				document.getElementById('col_'+i+' line_'+j+' ').style.background='';
			}
		}
	}
	
	score2=score2+7.5;

	if (score1>score2)
	{
		document.getElementById('resultGame').innerHTML='Joueur 1 gagne de '+(score1-score2);
	}
	else
	{
		document.getElementById('resultGame').innerHTML='Joueur 2 gagne de '+(score2-score1);
	}
}

// change la taille du jeu mais sers aussi de fonction pour reset le jeu.
// Car reset Game ne s'occupe que des variable et de l'affichage des points
function changeGoban(size)
{
	resetGame();
	document.getElementById('resultGame').innerHTML=' ';
	tabGame=new Array();
	tabCheck=new Array();
	d=size;
	console.log(d);
	document.getElementById('game').innerHTML='';
	
	if (size==9)
	{
		classRow="row-2";
		classCell="cell-2";
		var element=document.getElementById('container1');
		element.style.backgroundImage="url('imgs/plateauGo2.png')";
	}
	else
	{	
		classRow="row";
		classCell="cell";
		var element=document.getElementById('container1');
		element.style.backgroundImage="url('imgs/plateauGo.png')";
	}
	initialisation();
}

//fonction pass, remplacer l'ancienne par celle ci
function pass(actualPlayer)
{
	if (passTurn==0)
	{
		document.getElementById('resultGame').innerHTML='joueur '+actualPlayer+" passe";
		passTurn=actualPlayer;
		if (actualPlayer==1)
		{
			score1--;
			if(iaActive==false)
			{
				player=2;
			}
			
		}
		else if (actualPlayer==2)
		{
			score2--;
			if(iaActive==false)
			{
				player=1;
			}
			
		}
	}
	else if(endGame==true)
		{
			changeGoban(d);
		}
		else if(endGame==false)
		{
			
			afficheTerritory();
			endGame=true;
			
		}
	
	console.log(endGame);
	turn++;
}

//// nécessaire car la configuration de modifier() ne permet pas à l'IA de jouer en premier
function iaFirstMove()
{
		
		game();

		if (passTurn!=IA)
		{
			player=player%2+1;
			console.log(player);
			verifKo(lastCaseX,lastCaseY,player%2+1,true);
			var element=document.getElementById('col_'+lastCaseX+' line_'+lastCaseY+' ');
			element.style.opacity='0.5';
			element.style.backgroundImage='url("imgs/joueur'+IA+'.png")';
			player=player%2+1;
			console.log(player);
			passTurn = 0;
				
		}
			turn++;
}

/* MENU HAMBURGER */

var compteur = 0;

$('#container_hamburger').on('click', function() {
	if (compteur == 0) {
		$('#hamburger_2').css({'width' : '5px', 'left' : '73px'})
		$('#hamburger_1').css({'width' : '5px', 'left' : '73px'})
		$('#hamburger_3').css({'width' : '5px', 'left' : '73px'})
		setTimeout(function() {
			$('#hamburger_3').css({'top' : '25px', 'transform' : 'rotateZ(45deg)'})
			$('#hamburger_1').css({'top' : '25px', 'transform' : 'rotateZ(-45deg)'})
		},300)
		setTimeout(function() {
			$('#hamburger_3').css({'width' : '75px', 'left' : '39px'})
			$('#hamburger_1').css({'width' : '75px', 'left' : '39px'})
		},600)
		setTimeout(function() {
			compteur++;
		},600)
	}
	if (compteur == 1) {
		$('#hamburger_1').css({'width' : '5px', 'left' : '73px'})
		$('#hamburger_3').css({'width' : '5px', 'left' : '73px'})
		setTimeout(function() {
			$('#hamburger_1').css({'top' : '7px', 'transform' : 'rotateZ(0deg)'})
			$('#hamburger_3').css({'top' : '43px', 'transform' : 'rotateZ(0deg)'})
		},300)
		setTimeout(function() {
			$('#hamburger_3').css({'width' : '75px', 'left' : '40px'})
			$('#hamburger_2').css({'width' : '75px', 'left' : '40px'})
			$('#hamburger_1').css({'width' : '75px', 'left' : '40px'})
		},600)
		setTimeout(function() {
			compteur = 0;
		},600)
	}
});

$('#hamburger_1, #hamburger_2, #hamburger_3').on('click', function() {
	if (compteur_menu == 0) {
	$('#logo_home').css({'top' : '50px', 'opacity' : '0'});
	$('#logo_grid').css({'top' : '80px', 'opacity' : '0'});
	$('#logo_restart').css({'top' : '110px', 'opacity' : '0'});
	$('#logo_next').css({'top' : '140px', 'opacity' : '0'});
	$('#logo_score').css({'top' : '-180px'});
	$('.player_score_design').css({'top' : '-170px'});
	setTimeout(function() {
		compteur_menu++;
	},1300)
	}

	if (compteur_menu == 1) {
		$('#logo_home').css({'top' : '100px', 'opacity' : '0.7'});
		$('#logo_grid').css({'top' : '130px', 'opacity' : '0.7'});
		$('#logo_restart').css({'top' : '160px', 'opacity' : '0.7'});
		$('#logo_next').css({'top' : '190px', 'opacity' : '0.7'});
		$('#logo_score').css({'top' : '220px'});
		$('.player_score_design').css({'top' : '230px'});
		setTimeout(function() {
			compteur_menu = 0;
		},1300)
	}
});

$('#logo_grid').on('click', function() {
	if (compteur_grid == 0) {
		changeGoban(9);
		compteur_grid++;
	}

	else if (compteur_grid == 1) {
		changeGoban(19);
		compteur_grid = 0;
	}
});


/*CIEL ETOILE*/

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var starDensity = .216;
var speedCoeff = .05;
var width;
var height;
var starCount;
var circleRadius;
var circleCenter;
var first = true;
var giantColor = '180,184,240';
var starColor = '226,225,142';
var cometColor = '226,225,224';
var canva = document.getElementById('universe');
var stars = [];

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

createUniverse();

function createUniverse() {
  universe = canva.getContext('2d');

  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
    stars[i].reset();
  }

  draw();
}

function draw() {
  universe.clearRect(0, 0, width, height);

  var starsLength = stars.length;

  for (var i = 0; i < starsLength; i++) {
    var star = stars[i];
    star.move();
    star.fadeIn();
    star.fadeOut();
    star.draw();
  }

  window.requestAnimationFrame(draw);
}

function Star() {

  this.reset = function() {
    this.giant = getProbability(3);
    this.comet = this.giant || first ? false : getProbability(10);
    this.x = getRandInterval(0, width - 10);
    this.y = getRandInterval(0, height);
    this.r = getRandInterval(1.1, 2.6);
    this.dx = getRandInterval(speedCoeff, 6 * speedCoeff) + (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) + speedCoeff * 2;
    this.dy = -getRandInterval(speedCoeff, 6 * speedCoeff) - (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120);
    this.fadingOut = null;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = getRandInterval(.2, 1 - (this.comet + 1 - 1) * .4);
    this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * .001;
  };

  this.fadeIn = function() {
    if (this.fadingIn) {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      this.opacity += this.do;
    }
  };

  this.fadeOut = function() {
    if (this.fadingOut) {
      this.fadingOut = this.opacity < 0 ? false : true;
      this.opacity -= this.do / 2;
      if (this.x > width || this.y < 0) {
        this.fadingOut = false;
        this.reset();
      }
    }
  };

  this.draw = function() {
    universe.beginPath();

    if (this.giant) {
      universe.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
      universe.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

      //comet tail
      for (var i = 0; i < 30; i++) {
        universe.fillStyle = 'rgba(' + cometColor + ',' + (this.opacity - (this.opacity / 20) * i) + ')';
        universe.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
        universe.fill();
      }
    } else {
      universe.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')';
      universe.rect(this.x, this.y, this.r, this.r);
    }

    universe.closePath();
    universe.fill();
  };

  this.move = function() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.fadingOut === false) {
      this.reset();
    }
    if (this.x > width - (width / 4) || this.y < 0) {
      this.fadingOut = true;
    }
  };

  (function() {
    setTimeout(function() {
      first = false;
    }, 50)
  })()
}

function getProbability(percents) {
  return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
}

function getRandInterval(min, max) {
  return (Math.random() * (max - min) + min);
}

function windowResizeHandler() {
  width = window.innerWidth;
  height = window.innerHeight;
  starCount = width * starDensity;
  circleRadius = (width > height ? height / 2 : width / 2);
  circleCenter = {
    x: width / 2,
    y: height / 2
  }

  canva.setAttribute('width', width);
  canva.setAttribute('height', height);
}

$('#logo_home').on('click', function() {
	window.location.href = "http://projet2.saulnier.fr/index.html";
});



