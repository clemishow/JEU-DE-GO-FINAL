function modifier(monID)
{	


	console.log(player);
	id=monID.id; 
	var verif=true; //on initialise la variable de vérification a true
	var extract1 = id.indexOf("_",0); 
	var extract2 = id.indexOf("_",5); 
	extract1 = parseInt(id.substr(extract1+1,2)); 
	extract2 = parseInt(id.substr(extract2+1,2)); 
	// ensemble qui permet d'extraire la valeur en int de la position de x(extract1) et y (extract2)

	if(tab3[extract1][extract2]==false) // si la class de la div est div3 cela signifie que personne n'a encore joué cette cas
	{
		
		if (tab4.length>0) // si le tableau contient des ko 
		{
			for (var i = 0; i < tab4.length; i++) //on parcours le tableau
			{
				if (tab4[i].X==extract1&&tab4[i].Y==extract2&&tab4[i].player==player)// et si les coordonnées du ko correspond à la case jouée
				{
					verif=false; //la variable de vérification reçoit false
					
				}
				
			}
		}
		
		if (verif==true)// si on a pas joué sur une case contenant un ko 
		{
			tab4=new Array(); // on réinitialise le tableau les contenant
		}

		if (player==1 && (canIPlayHere(extract1,extract2,player1)==true||verifKo(extract1,extract2,player2)==true)&&verif==true)//CanIPlayHere() vérifie si en jouant cette case le pion n'est pas encerclé et verifKo() si en jouant la case on détruit des cellules ennemis
		{
			if(tour>0)// si on est pas au premier tour lastCaseX et lastCaseY ne sont pas définis
			{
				document.getElementById('col_'+lastCaseX+' line_'+lastCaseY+' ').style.backgroundColor='white';// on change la couleur de la dernière case joué
				
			}
			monID.style.backgroundColor='blue';
			monID.style.opacity='1';
			lastCaseX=extract1;// et on rentre les coordonnées de la dernière joué pour le tour suivant;
			lastCaseY=extract2;// et on rentre les coordonnées de la dernière joué pour le tour suivant;
			
			
			tab1[extract1][extract2]=1;// tab1 reçoit la position et le numéro du joueur
			player=2;// et on change de joueur
			tour++;
			
			
		}
		else if (player==2 && (canIPlayHere(extract1,extract2,player2)==true||verifKo(extract1,extract2,player1)==true)&&verif==true)// même chose pour le joueur 2
		{
			
			if(tour>0)
			{
				document.getElementById('col_'+lastCaseX+' line_'+lastCaseY+' ').style.backgroundColor='black';
				
			}
			monID.style.backgroundColor='red';
			monID.style.opacity='1';
			lastCaseX=extract1;
			lastCaseY=extract2;
			
			
			tab1[extract1][extract2]=2;// tab1 reçoit la position et le numéro du joueur
			player=1;// et on change de joueur
			tour++;
			
			
		}
		
		
		// regarde sur  4 cases autour (-1,0)(1,0)(0,-1)(0,1)
		if (extract1+1<d&&tab1[extract1+1][extract2]==player) 
		{
			verifEvent(extract1+1,extract2);//et on lance la fonction de destruction des cases ennemis
		}
		if (extract1-1>=0&&tab1[extract1-1][extract2]==player) 
		{
			verifEvent(extract1-1,extract2);//et on lance la fonction de destruction des cases ennemis
		}
		if (extract2+1<d&&tab1[extract1][extract2+1]==player) 
		{
			verifEvent(extract1,extract2+1);//et on lance la fonction de destruction des cases ennemis
		}
		if (extract2-1>=0&&tab1[extract1][extract2-1]==player) 
		{
			verifEvent(extract1,extract2-1);//et on lance la fonction de destruction des cases ennemis
		}

	}
	
}
