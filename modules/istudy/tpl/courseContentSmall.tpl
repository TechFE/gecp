 <script id="courseContentSmall" type="text/html">
 	<ul>
 		{{each courseObjs as cObj i}}
 	 		<li class='content-one-small' data-fid={{cObj.CID}}>
 	 		
 	 		<h5 class='cont-title'>{{cObj.CNAME}}</h5>
 	 		<span class='glyphicon glyphicon-star'></span>{{cObj.CAVGRATE}}
 	 		<span class='glyphicon glyphicon-education'></span>{{cObj.ATTENDNUMS}}
 	 		<hr>
 	 		<span class='cont-name'><span class='glyphicon glyphicon-user'></span>
 	 		{{if cObj.CCREATEUSER !="null"}}
 	 		 {{cObj.CCREATEUSER}}{{/if}}</span>
 	 			
 	 		<span class='cont-date'><span class='glyphicon glyphicon-time'></span>{{cObj.CCREATEDATE}}</span>
 	 		</li>
 		{{/each}}
    </ul>
 </script>
