 <script id="courseContentBig" type="text/html">
 	<ul class="big-ul">
 		{{each courseObjs as cObj i}}
 	 		<li class='content-one' data-cid={{cObj.CID}}>
 	 		{{if cObj.CPICNAME}}
 	 			<div><img src='{{picFileURL+cObj.CPICNAME}}' class='cont-img' alt='封面'/></div>
 	 		{{else}}
 	 			<div><img src='img/courseDefault.png' class='cont-img' alt='封面'/></div>
 	 		{{/if}}
 	 		<h5 class='cont-title'>{{cObj.CNAME}}</h5>
 	 		<span class='glyphicon glyphicon-star'></span><span class="num-avgrate">
 	 		{{if cObj.AVGRATE !="null"}}
 	 		{{cObj.AVGRATE}}{{else}}0{{/if}}</span>&nbsp&nbsp
 	 		<span class='glyphicon glyphicon-education'></span><span class="num-ca">&nbsp{{cObj.CANUMS}}</span>
 	 		<hr>
 	 		<span class='cont-name'><span class='glyphicon glyphicon-user'></span>
 	 		{{if cObj.CCREATEUSER !="null"}}
 	 		 {{cObj.CCREATEUSER}}{{/if}}</span>
 	 			
 	 		<span class='cont-date'><span class='glyphicon glyphicon-time'></span>{{cObj.CCREATEDATE}}</span>
 	 		</li>
 		{{/each}}
    </ul>
 </script>
