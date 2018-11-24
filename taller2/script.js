// COMO LUCE UN URL DE BUSQUEDA: http://twitrss.me/twitter_search_to_rss/?term=[SEARCH TERM]

function crearTextoBuscado(texto){
	var textBuscado = $("<h4/>",{
      	"class" : "texto col-xl-12 col-12",
      	html: "Resultados de: "+texto
    })

	textBuscado.appendTo("#tweets");
}

function mostrarTweet(content, author, pubDate){
	var div = $("<div/>",{
		"class" : "row tweet col-xl-12 col-12"
	})

	var article = $("<article/>",{
		"class" : "col-xl-11 col-11"
	});


	var author = $("<h4/>",{
		"class" : "author col-xl-12 col-12",
		html : author+",dijo:"
	});

	var content = $("<p/>",{
		"class" : "content col-xl-12 col-12",
		html : content
	});

	var date = $("<p/>",{
		"class" : "date col-xl-12 col-12",
		html : pubDate
	});

	var img = $("<img/>",{
		"src" : "logo_twitter.png",
		"class" : "twitter col-xl-1 col-1"
	});

	author.appendTo(article);
	content.appendTo(article);
	date.appendTo(article);
	img.appendTo(div);
	article.appendTo(div);
	div.appendTo("#tweets");


}

function cargarTweets(linkRSS){
	$.ajax({
		type: "GET",
      	url: linkRSS,
      	dataType: "xml",
      	success: function(xml){
      		$(xml).find('item').each(function() {	        		
		        var title= $(this).find('title').text();
		        var author= $(this).find('dc\\:creator').text();
		        var content= $(this).find('description').text();
		        var pubDate= $(this).find('pubDate').text();
		        var link= $(this).find('link').text(); 
		        mostrarTweet(content, author, pubDate);            	        			        	
    		});
      	},
      	error: function() {
        	alert("Error al procesar el xml");
      	}
	});
	
}

$(document).ready(function(){
	$('button').click(function(e){
		document.getElementById("tweets").innerHTML = " ";
		let texto=$('input#buscador').val();
		if(texto.length != 0){
			crearTextoBuscado(texto);
			console.log("TExto "+texto);
			var link="https://twitrss.me/twitter_search_to_rss/?term="+texto;
			cargarTweets(link);			


		}else{
			window.alert("Ingrese texto a buscar");
		}

	})
});

