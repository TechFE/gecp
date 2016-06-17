 <script id="courseContentSmall" type="text/html">
 	<ul>
 		{{each courseObjs as cObj i}}
 	 		<li class='content-one-small' data-cid={{cObj.CID}}>
 	 			<div class="course-messages">
 	 				<div class="messages-top cont-title">{{cObj.CNAME}}</div>
 	 				<div class="messages-bottom">
 	 					{{if cObj.CGRADE}}
 	 					<div class="mes-cgrade">{{cObj.CGRADE}}</div>
 	 					{{/if}}
 	 					{{if cObj.CDIFFICULTY}}
 	 					<div class="mes-cdiffi">{{cObj.CDIFFICULTY}}</div>
 	 					{{/if}}
 	 					<div class="mes-cduring">
 	 						{{if cObj.CDURINGSTARTTIME!='null'}}
 	 							{{cObj.CDURINGSTARTTIME}}至{{cObj.CDURINGSTOPTIME}}
 	 						{{/if}}
 	 					</div>
 	 					{{if cObj.CINTRO}}
 	 					<div class="mes-cintro">简介：{{cObj.CINTRO}}</div>
 	 					{{/if}}
 	 					<div class="course-date"><span class="glyphicon glyphicon-time"></span>{{cObj.CCREATEDATE}}</div>
                        <div class="course-uldname"><span class="glyphicon glyphicon-user"></span>
							{{if cObj.CCREATEUSER !='null'}}			   
                        		{{cObj.CCREATEUSER}}
                        		{{else}}
                        		匿名
                        	{{/if}}
                        </div>
 	 				</div>
 	 			</div>
 	 		
 	 		</li>
 		{{/each}}
    </ul>
 </script>
