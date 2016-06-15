 <script id="courseContentBig" type="text/html">
 	<ul>
 		{{each courseObjs as cObj i}}
 	 		<li class='content-one' data-fid={{cObj.CID}}>
 	 		{{if cObj.CPICNAME}}
 	 			<div><img src='{{picFileURL+cObj.CPICNAME}}' class='cont-img' alt='封面'/></div>
 	 		{{else}}
 	 			<div><img src='img/courseDefault.png' class='cont-img' alt='封面'/></div>
 	 		{{/if}}
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
