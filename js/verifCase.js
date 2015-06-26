function verifCase(positionX,positionY,actualPlayer)// permet de vérifier les cases en position (-1,0)(1,0)(0,-1)(0,1) d'une case
{

	var a;
 
	
	for (var i = -1; i < 2; i++) // on parcours toutes les cases autour de la case sélectionnée
	{
		for (var j = -1; j < 2; j++) 
		{
			
			 if (positionX+i>=0&&positionX+i<d&&positionY+j>=0&&positionY+j<d&&((i==1&&j==0)||(i==(-1)&&j==0)||(i==0&&j==1)||(i==0&&j==(-1))))// on vérifie que la case que l'on veut vérifier existe et qu'il s'agit d'une des quatres cases à vérifier
			{
				if(tab1[positionX+i][positionY+j]==false)// si elle trouve une case sans joueur à coter d'elle 
				{
					alive=true; // alive reçoit true 
		
					
				}
				else if(tab1[positionX+i][positionY+j]==actualPlayer&&tab3[positionX+i][positionY+j]==false)// sinon si c'est une case allié à coter et que l'on ne l'a pas déjà vérifiée
				{
					
					a=tab2.length; // en recevant la taille actuel du tableau tab[a] correspondra à une nouvelle case du tableau que l'on ajoute à la fin					
					tab2[a]=new obj;// on se sert de notre fonction obj
					tab2[a].X=parseInt(positionX+i);// et on rentre les coordonnées dans le tableau
					tab2[a].Y=parseInt(positionY+j);// et on rentre les coordonnées dans le tableau
					
				
				}
				
						
				
			}
			
		}
	}

	
}