!function(){var n=Handlebars.template,l=Handlebars.templates=Handlebars.templates||{};l.maze=n({1:function(n,l,a,e,o){var r,t,i,s="            <tr>\n";return t=null!=(t=a.col||(null!=l?l.col:l))?t:a.helperMissing,i={name:"col",hash:{},fn:n.program(2,o,0),inverse:n.noop,data:o},r="function"==typeof t?t.call(null!=l?l:{},i):t,a.col||(r=a.blockHelperMissing.call(l,r,i)),null!=r&&(s+=r),s+"            </tr>\n"},2:function(n,l,a,e,o){var r,t=null!=l?l:{};return'                <td id="'+n.escapeExpression((a.concat||l&&l.concat||a.helperMissing).call(t,null!=(r=null!=l?l.position:l)?r.row:r,null!=(r=null!=l?l.position:l)?r.col:r,{name:"concat",hash:{},data:o}))+'" class="'+(null!=(r=a.if.call(t,null!=l?l.isUp:l,{name:"if",hash:{},fn:n.program(3,o,0),inverse:n.noop,data:o}))?r:"")+(null!=(r=a.if.call(t,null!=l?l.isRight:l,{name:"if",hash:{},fn:n.program(5,o,0),inverse:n.noop,data:o}))?r:"")+(null!=(r=a.if.call(t,null!=l?l.isDown:l,{name:"if",hash:{},fn:n.program(7,o,0),inverse:n.noop,data:o}))?r:"")+(null!=(r=a.if.call(t,null!=l?l.isLeft:l,{name:"if",hash:{},fn:n.program(9,o,0),inverse:n.noop,data:o}))?r:"")+" "+(null!=(r=a.if.call(t,null!=l?l.isStart:l,{name:"if",hash:{},fn:n.program(11,o,0),inverse:n.noop,data:o}))?r:"")+" "+(null!=(r=a.if.call(t,null!=l?l.isEnd:l,{name:"if",hash:{},fn:n.program(13,o,0),inverse:n.noop,data:o}))?r:"")+'">\n'+(null!=(r=a.if.call(t,null!=l?l.isPokemons:l,{name:"if",hash:{},fn:n.program(15,o,0),inverse:n.noop,data:o}))?r:"")+"                </td>\n"},3:function(n,l,a,e,o){return"top "},5:function(n,l,a,e,o){return" right"},7:function(n,l,a,e,o){return" bottom"},9:function(n,l,a,e,o){return" left"},11:function(n,l,a,e,o){return" start"},13:function(n,l,a,e,o){return" end"},15:function(n,l,a,e,o){return'                        <img src="app/assets/img/'+n.escapeExpression(n.lambda(null!=l?l.pokemonNumber:l,l))+'.png" />\n'},compiler:[7,">= 4.0.0"],main:function(n,l,a,e,o){var r,t,i,s="<table>\n    <tbody>\n";return t=null!=(t=a.row||(null!=l?l.row:l))?t:a.helperMissing,i={name:"row",hash:{},fn:n.program(1,o,0),inverse:n.noop,data:o},r="function"==typeof t?t.call(null!=l?l:{},i):t,a.row||(r=a.blockHelperMissing.call(l,r,i)),null!=r&&(s+=r),s+"    </tbody>\n</table>\n"},useData:!0})}();