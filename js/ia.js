
function ia()
{

	this.attack=false;
	this.defend=false;
	this.patternLiberty=0;
	this.patternSize=0;
	this.liberty=0;
	this.player=0;
	this.priority=100;
	this.eye=false;
	this.upEdge=0;
	this.downEdge=0;
	this.leftEdge=0;
	this.rightEdge=0;
	this.betterEdge=0;
	this.territory=0;
}

function initialisationIa()
{
	
	maxPriority=100;
	tabIa=new Array();
	tabCheck=new Array();
	
	for (var i =0; i < d; i++) // on parcours toutes les cases autour de la case sélectionnée
	{
		tabIa[i]=new Array();
		tabCheck[i]=new Array();

		for (var j =0; j < d; j++) 
		{
			tabIa[i][j]=new ia();
			tabCheck[i][j]=false;
			if (tabGame[i][j]==3)
			{
				tabGame[i][j]=false;
			}
			else if (tabGame[i][j]==4)
			{
				tabGame[i][j]=false;
			}
			else if (tabGame[i][j]==1)
			{
				tabIa[i][j].priority=200;
			}
			else if (tabGame[i][j]==2)
			{
				tabIa[i][j].priority=200;
			}

		}
	}
}

//Vérifie les liberté de chaque case de façon individuelle

function checkAllLiberty()
{
	
	for (var positionX =0; positionX < d; positionX++) // on parcours toutes les cases autour de la case sélectionnée
	{
		
		for (var positionY =0; positionY < d; positionY++) 
		{
			
			for (var i = -1; i < 2; i++) // on parcours toutes les cases autour de la case sélectionnée
			{
				for (var j = -1; j < 2; j++) 
				{
					
					 if (positionX+i>=0&&positionX+i<d&&positionY+j>=0&&positionY+j<d&&((i==1&&j==0)||(i==(-1)&&j==0)||(i==0&&j==1)||(i==0&&j==(-1))))// on vérifie que la case que l'on veut vérifier existe et qu'il s'agit d'une des quatres cases à vérifier
					{
						if(tabGame[positionX+i][positionY+j]==false)// si elle trouve une case sans joueur à coter d'elle 
						{
							tabIa[positionX][positionY].liberty++;
							tabIa[positionX+i][positionY+j].upEdge=checkUp(positionX+i,positionY+j);
							tabIa[positionX+i][positionY+j].downEdge=checkDown(positionX+i,positionY+j);
							tabIa[positionX+i][positionY+j].rightEdge=checkRight(positionX+i,positionY+j);
							tabIa[positionX+i][positionY+j].leftEdge=checkLeft(positionX+i,positionY+j);

							
						}
						else if (tabGame[positionX+i][positionY+j]==player)
						{
							if(tabIa[positionX][positionY].player==0)
							{
								tabIa[positionX][positionY].player=player;
							}
							else if (tabIa[positionX][positionY].player==IA) 
							{
								tabIa[positionX][positionY].player=3;
							}
						}
						else if (tabGame[positionX+i][positionY+j]==IA)
						{
							

							if(tabIa[positionX][positionY].player==0)
							{
								tabIa[positionX][positionY].player=IA;
								

							}
							else if (tabIa[positionX][positionY].player==player) 
							{
								tabIa[positionX][positionY].player=3;
							}
						}
						else if (tabGame[positionX+i][positionY+j]==false)
						{
							var X=positionX+i;
							var Y=positionY+j;
						}
								
						
					}
					
				}
			}
			if(tabIa[positionX][positionY].liberty==0&&tabIa[positionX][positionY].player==IA)
			{
				tabIa[positionX][positionY].eye=true;
			}
			
		}
	}
}

//// pattern checkPattern et patternCase fonctionne comme verifKo check et verifCase,
//// à la différence qu'il attribut à chaque case le nombre de liberté total du pattern
//// auquel la dite case appartient
function pattern()
{
	
	for (var i =0; i < d; i++) // on parcours toutes les cases autour de la case sélectionnée
	{
		
		for (var j =0; j < d; j++) 
		{
			if (tabGame[i][j]!=false&&tabCheck[i][j]==false)
			
			{
				checkPattern(i,j,tabGame[i][j])
				
			}
		}
	}
	for (var i =0; i < d; i++) // on parcours toutes les cases autour de la case sélectionnée
	{
		
		for (var j =0; j < d; j++) 
		{
			
			tabCheck[i][j]=false;

		}
	}
}

function checkPattern(posX,posY,actualPlayer)
{

	var libertys=0;
	tabStock=new Array(); 
	alive=false; 
	tabStock[0]=new obj; 
	tabStock[0].X=posX; 
	tabStock[0].Y=posY; 
	var compt=0; 
	

	while(tabStock.length>compt&&alive==false)
	{
				
		patternCase(tabStock[compt].X,tabStock[compt].Y,actualPlayer);
		tabCheck[tabStock[compt].X][tabStock[compt].Y]=true;
		libertys=libertys+tabIa[tabStock[compt].X][tabStock[compt].Y].liberty;
		compt++;
	}

	
		
	

	for (var i = 0; i <tabStock.length; i++) 
	{
		tabIa[tabStock[i].X][tabStock[i].Y].patternLiberty=libertys;
		tabIa[tabStock[i].X][tabStock[i].Y].patternSize=tabStock.length;

	}
}

function patternCase(positionX,positionY,actualPlayer)// permet de vérifier les cases en position (-1,0)(1,0)(0,-1)(0,1) d'une case
{

	var a;
 
	
	for (var i = -1; i < 2; i++) // on parcours toutes les cases autour de la case sélectionnée
	{
		for (var j = -1; j < 2; j++)
		{
			if (positionX+i>=0&&positionX+i<d&&positionY+j>=0&&positionY+j<d&&((i==1&&j==0)||(i==(-1)&&j==0)||(i==0&&j==1)||(i==0&&j==(-1))))// on vérifie que la case que l'on veut vérifier existe et qu'il s'agit d'une des quatres cases à vérifier
			{
				 if(tabGame[positionX+i][positionY+j]==actualPlayer&&tabCheck[positionX+i][positionY+j]==false)// sinon si c'est une case allié à coter et que l'on ne l'a pas déjà vérifiée
				{
					
					a=tabStock.length; // en recevant la taille actuel du tableau tab[a] correspondra à une nouvelle case du tableau que l'on ajoute à la fin					
					tabStock[a]=new obj;// on se sert de notre fonction obj
					tabStock[a].X=parseInt(positionX+i);// et on rentre les coordonnées dans le tableau
					tabStock[a].Y=parseInt(positionY+j);// et on rentre les coordonnées dans le tableau
					
				
				}				
			}			
		}
	}
}

//// game va renvoyé la 'meilleur case' en fonction des données qu'il a sur chaque case
function game()
{
	initialisationIa();
	checkAllLiberty();
	pattern();
	var maxLiberty=5;
	var maxEdge=0;
	var maxPriority;
	if(theTerritoryLeft()==false&&turn>d*d/2)
	{
		pass(IA);
	}
	else
	{
		maxPriority=110;
		passturn=0;
		

		if (tabKO.length>0) 
		{
			for (var i = 0; i < tabKO.length; i++) 
			{
					
				tabIa[tabKO[i].X][tabKO[i].Y].priority=300; 
			}
		}

		var compt=0;

		for (var positionX =0; positionX < d; positionX++) // on check 
		{
			
			for (var positionY =0; positionY < d; positionY++) 
			{
				var aroundPlayer=0;
				if(tabGame[positionX][positionY]==false)
				{
				
					if(tabIa[positionX][positionY].priority!=300||tabIa[positionX][positionY].liberty>0)
					{
							for (var i = -1; i < 2; i++) // on parcours toutes les cases autour de la case sélectionnée
							{
								for (var j = -1; j < 2; j++) 
								{
									var aroundIa;
									if (positionX+i>=0&&positionX+i<d&&positionY+j>=0&&positionY+j<d&&((i==1&&j==0)||(i==(-1)&&j==0)||(i==0&&j==1)||(i==0&&j==(-1))))// on vérifie que la case que l'on veut vérifier existe et qu'il s'agit d'une des quatres cases à vérifier
									{
										if(tabIa[positionX+i][positionY+j].patternLiberty>0)
										{
											if (tabIa[positionX][positionY].priority>=tabIa[positionX+i][positionY+j].patternLiberty)
											{
												tabIa[positionX][positionY].priority=tabIa[positionX+i][positionY+j].patternLiberty;	
												
												if(tabGame[positionX+i][positionY+j]==IA)
												{
													if(tabIa[positionX][positionY].priority==1)
													{
														tabIa[positionX][positionY].priority=tabIa[positionX][positionY].priority-210;
													}
													
													aroundIa++;
												}

												else if(tabGame[positionX+i][positionY+j]==player)
												{
																									
													
													if(tabIa[positionX+i][positionY+j].patternSize>=10)
													{
														tabIa[positionX][positionY].priority=8;
													}
													aroundPlayer++;											
												}
											}
											if(tabGame[positionX+i][positionY+j]==IA)
											{
												tabIa[positionX][positionY].defend=true;
											}
											else if(tabGame[positionX+i][positionY+j]==player)
											{
												tabIa[positionX][positionY].attack=true;																										
											}
										}
									}
								}
							}
							if(tabIa[positionX][positionY].eye==true&&tabIa[positionX][positionY].priority!=-210)
							{
								tabIa[positionX][positionY].priority=tabIa[positionX][positionY].priority+150;
							}	
							if(tabIa[positionX][positionY].territory==IA)
							{
								tabIa[positionX][positionY].priority=tabIa[positionX][positionY].priority+100;
							}				
							
							if(tabIa[positionX][positionY].territory==player&&turn>d*d/1.33)
							{
								tabIa[positionX][positionY].priority=200;
							}
							
							
							
							if(tabIa[positionX][positionY].defend==true&&tabIa[positionX][positionY].attack==true)
							{
								tabIa[positionX][positionY].priority--;
							}

							else if(tabIa[positionX][positionY].defend==true)
							{
								if (tabIa[positionX][positionY].aroundIa>=2)
								{
									tabIa[positionX][positionY].priority--;
								}

							}
							else if(tabIa[positionX][positionY].attack==true&&tabIa[positionX][positionY].defend==false)
							{
								tabIa[positionX][positionY].priority=tabIa[positionX][positionY].priority-1.5;
								
								if (tabIa[positionX][positionY].liberty==1&&tabIa[positionX][positionY].priority!=-10) 
								{
									tabIa[positionX][positionY].priority=tabIa[positionX][positionY].priority+10;
								}
							}
					}
				}

			
			}
		}
		console.log(tabIa);
		tabPriority=new Array();

		for (var i =0; i < d; i++)
		{
			
			for (var j =0; j < d; j++) 
			{
				
				if (tabGame[i][j]==false)
				{	
					player=player%2+1;
					tabGame[i][j]=IA;
					var verificationKill=verifKo(i,j,player%2+1,false);
					var playHere=check(i,j,IA,false);
					player=player%2+1;
					tabGame[i][j]=player;
					var verificationKill2=verifKo(i,j,IA,false);
					tabGame[i][j]=false;
					if (verificationKill2==true)
					{
						tabIa[i][j].priority=-200;
					}
					if(verificationKill==true||playHere==false)
					{
						if (verificationKill==true) 
						{
							tabIa[i][j].priority=-500;
						}
						if(tabIa[i][j].priority<maxPriority)
						{

							
							maxPriority=tabIa[i][j].priority;
							compt=0;
							tabPriority.length=0;
							tabPriority=new Array();
							tabPriority[compt]=new obj;
							tabPriority[compt].X=i;
							tabPriority[compt].Y=j;
							maxLiberty=tabIa[i][j].liberty;
							maxEdge=bestEdge;

						}
							
						else if(tabIa[i][j].priority==maxPriority)
						{
							
									console.log(maxPriority);
									compt++;
									tabPriority[compt]=new obj;
									tabPriority[compt].X=i;
									tabPriority[compt].Y=j;

							
						}
					
					}
					var bestEdge=0;
					if(tabIa[i][j].upEdge+tabIa[i][j].leftEdge>bestEdge)
					{
						bestEdge=tabIa[i][j].upEdge+tabIa[i][j].leftEdge;
					}

					if(tabIa[i][j].upEdge+tabIa[i][j].rightEdge>bestEdge)
					{
						bestEdge=tabIa[i][j].upEdge+tabIa[i][j].rightEdge;
					}
					if(tabIa[i][j].downEdge+tabIa[i][j].leftEdge>bestEdge)
					{
						bestEdge=tabIa[i][j].downEdge+tabIa[i][j].leftEdge;
					}

					if(tabIa[i][j].downEdge+tabIa[i][j].rightEdge>bestEdge)
					{
						bestEdge=tabIa[i][j].downEdge+tabIa[i][j].rightEdge;
					}

					tabIa[i][j].betterEdge=bestEdge;
				}
				
			}

		}
		
		var bestEdge=0;
		tabSelection=new Array();	
		for (var i = 0; i < tabPriority.length; i++) 
		{
			if(tabIa[tabPriority[i].X][tabPriority[i].Y].betterEdge>bestEdge&&turn>=1)
			{ 
				bestEdge=tabIa[tabPriority[i].X][tabPriority[i].Y].betterEdge;
				compt=0;
				tabSelection=new Array();
				tabSelection[compt]=new obj();
				tabSelection[compt].X=tabPriority[i].X;
				tabSelection[compt].Y=tabPriority[i].Y;

			}
			else if(tabIa[tabPriority[i].X][tabPriority[i].Y].betterEdge==bestEdge&&turn>1)
			{
				compt++;
				tabSelection[compt]=new obj();
				tabSelection[compt].X=tabPriority[i].X;
				tabSelection[compt].Y=tabPriority[i].Y;

			}
		}
		
	
		
		
	
			if (turn<1)
			{
				tabSelection=tabPriority;
			}
				console.log(tabGame);				
				var witchCase=parseInt(Math.random() * (tabSelection.length)) ;
				lastCaseY=tabSelection[witchCase].Y;
				lastCaseX=tabSelection[witchCase].X;
				tabGame[lastCaseX][lastCaseY]=IA;

		
		
	}
}

//// cette fonction va essentiellement de permettre à l'IA de savoir quand passer 
function theTerritoryLeft()
{
	checkTerritory();
	var check=false;
	
	for (var i = 0; i<d; i++) 
	{
		for (var j = 0; j<d; j++) 
		{
			if(tabGame[i][j]==false)
			{

				var check=true;
			}
			else if (tabGame[i][j]==3)
			{
				tabIa[i][j].territory=1;
				tabGame[i][j]=false;
			}
			else if (tabGame[i][j]==4)
			{
				tabIa[i][j].territory=2;
				tabGame[i][j]=false;
			}
		}
	}
	return check;
}

////checkNomDeLaDirection me renvoi la distance entre le bord ou une case ennemi si elle en trouve une
//// en fonction de la direction
function checkDown(posX,posY)
{
	var validity=true;
	var X=posX;
	var i=0;
	var Y=posY;
	var j=0;
	
	while (X+i<d&&validity==true)
	{
		i++;
		if (X+i<d&&X+i>=0&&Y+j>=0&&Y+j<d&&tabGame[X+i][Y+j]==player)
		{
			validity=false;
		}
	}
	i--;
	
	return Math.abs(i);
}

function checkUp(posX,posY)
{
	var validity=true;
	var X=posX;
	var i=0;
	var Y=posY;
	var j=0;

	while (X+i>=0&&validity==true)
	{
		i--;
		if (X+i<d&&X+i>=0&&Y+j>=0&&Y+j<d&&tabGame[X+i][Y+j]==player)
		{
			validity=false;
		}
	}
	
	i++;
	return Math.abs(i);
}

function checkRight(posX,posY)
{
	var validity=true;
	var X=posX;
	var i=0;
	var Y=posY;
	var j=0;
	
	while (Y+j<d&&validity==true)
	{
		j++;
		if (X+i<d&&X+i>=0&&Y+j>=0&&Y+j<d&&tabGame[X+i][Y+j]==player)
		{
			validity=false;
		}
	}
	
	j--;
	return Math.abs(j);
}
function checkLeft(posX,posY)
{
	var validity=true;
	var X=posX;
	var i=0;
	var Y=posY;
	var j=0;
	
	while (Y+j>=0&&validity==true)
	{
		j--;
		if (X+i<d&&X+i>=0&&Y+j>=0&&Y+j<d&&tabGame[X+i][Y+j]==player)
		{
			validity=false;
		}
}
	
	j++;
	return Math.abs(j);
}


	