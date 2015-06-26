var d = 19;// dimension du jeu
var tab1; // tableau qui contient les cases jouées (1: correspond au joueur 1, 2: au joueur 2 et false si la case est innocupées)
var tab3; // tableau temporaire pour stocké la position des cases vérifiés et pour éviter de vérifier deux fois la même case
var tab2 ; // contient les coordonnés des cases vérifiées
var tab4=new Array(); // contient les coordonnées des ko et le joueur auquel il s'applique
var player=1; //joueur courant
var player1=1;
var player2=2;
var alive;// vérifie si les cases sont encerclées ou non
var X=0; 
var Y=0; 
var score1=0;
var score2=0;
var lastCaseX; //position X de la dernière case jouée
var lastCaseY;  //position Y de la dernière case jouée
var tour=0; // numéro  du tour actuel 
var tab5// contient valeur des cases attribué par l'IA
function obj(X, Y) //va me servir à mettre plusieurs information dans la même case d'un tableau
{
    this.Y = Y;
    this.X = X;
    
}
function ko(X, Y, player) //va me servir à mettre plusieurs information dans la même case d'un tableau
{
    this.Y = Y;
    this.X = X;
    this.player=player;
    
}

function initialisation() // on initialise les cases du jeu
{
 	tab1 = new Array(d);
 	tab3 = new Array(d); 
	 document.write('<table cellspacing="6">');

	for (var i = 0; i < d; i++) 
	{
		tab1[i] = new Array(d); 
		tab3[i] = new Array(d); 
		document.write('<tr>');
		
		for (var j = 0; j < d; j++)
		{
			
			
			tab1[i][j] = false;	
			tab3[i][j] = false;	
		
			document.write("<td  id='col_"+i+" line_"+j+" ' class='div1'onclick=' modifier(this);'></td>")
		}document.write('</tr>');
		
	}document.write('</table');
}