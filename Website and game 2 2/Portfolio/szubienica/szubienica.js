var haslo = "<Money makes you happy>";
haslo = haslo.toUpperCase();

var dlugosc = haslo.length;
var ile_skuch = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var haslo1 = "";

for (i=0; i<dlugosc; i++)
{
	if (haslo.charAt(i)==" ") haslo1 = haslo1 + " ";
	else haslo1 = haslo1 + "-";
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = start;

var litery = new Array(33);

litery[0] = "A";
litery[1] = "B";
litery[2] = "C";
litery[3] = "D";
litery[4] = "E";
litery[5] = "F";
litery[6] = "G";
litery[7] = "H";
litery[8] = "I";
litery[9] = "J";
litery[10] = "K";
litery[11] = "L";
litery[12] = "Ł";
litery[13] = "M";
litery[14] = "N";
litery[15] = "O";
litery[16] = "P";
litery[17] = "R";
litery[18] = "S";
litery[19] = "T";
litery[20] = "U";
litery[21] = "V";
litery[22] = "W";
litery[23] = "X";
litery[24] = "Y";
litery[25] = "Z";




function start()
{
	
	var tresc_diva ="";
	
	for (i=0; i<=25; i++)
	{
		var element = "lit" + i;
		tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
		if ((i+1) % 7 ==0) tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
	}
	
	document.getElementById("alfabet").innerHTML = tresc_diva;
	
	
	wypisz_haslo();
}

String.prototype.ustawZnak = function(miejsce, znak)
{
	if (miejsce > this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}


function sprawdz(nr)
{
	
	var trafiona = false;
	
	for(i=0; i<dlugosc; i++)
	{
		if (haslo.charAt(i) == litery[nr]) 
		{
			haslo1 = haslo1.ustawZnak(i,litery[nr]);
			trafiona = true;
		}
	}
	
	if(trafiona == true)
	{
		yes.play();
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		
		wypisz_haslo();
	}
	else
	{
		no.play();
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";	
		document.getElementById(element).setAttribute("onclick",";");		
		
		//skucha
		ile_skuch++;
		var obraz = "img/s"+ ile_skuch + ".jpg";
		document.getElementById("szubienica").innerHTML = '<img src="'+obraz+'" alt="" />';
	}
	
	//wygrana
	if (haslo == haslo1)
	document.getElementById("alfabet").innerHTML  = "You win! The answear is right!: "+haslo+'<br /><br /><span class="reset" onclick="location.reload()">Try again</span>';
	
	//przegrana
	if (ile_skuch>=9)
	document.getElementById("alfabet").innerHTML  = "You loose, try again!: "+haslo+'<br /><br /><span class="reset" onclick="location.reload()">Try again?</span>';
}
