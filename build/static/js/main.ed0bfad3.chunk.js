(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(t,e,n){t.exports=n(22)},18:function(t,e,n){},19:function(t,e,n){},22:function(t,e,n){"use strict";n.r(e);var i=n(6),r=n.n(i),a=n(9),o=n.n(a),c=(n(18),n(10)),u=(n(19),n(0)),s=n(1),l=n(2),h=n(4),v=n(3),p=n(5),b=n(7),f=function(t){function e(){return Object(s.a)(this,e),Object(h.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"calculateModifications",value:function(t,e){var n,i=t.players,r=e.posX,a=e.posY,o=e.uuid;if(!i[o])return{};var c=i[o],u=r-c.x,s=a-c.y,l=Math.abs(u)+Math.abs(s);if(0===l)return{};var h=u/l,v=s/l;return n={},Object(b.a)(n,"players."+o+".x",["+",60*h]),Object(b.a)(n,"players."+o+".y",["+",60*v]),n}}]),e}(u.GameEvent),d=function(t){function e(){var t,n;Object(s.a)(this,e);for(var i=arguments.length,r=new Array(i),a=0;a<i;a++)r[a]=arguments[a];return(n=Object(h.a)(this,(t=Object(v.a)(e)).call.apply(t,[this].concat(r)))).currentX=void 0,n.currentY=void 0,n.countdown=0,n}return Object(p.a)(e,t),Object(l.a)(e,[{key:"init",value:function(){var t=this;window.addEventListener("mousemove",function(e){var n=e.clientX,i=e.clientY;t.currentX=n,t.currentY=i})}},{key:"loop",value:function(t){this.countdown-=t,this.countdown>0||void 0!==this.currentY&&void 0!==this.currentX&&(this.events.triggerLocalEvent(new f({posX:this.currentX,posY:this.currentY,uuid:this.party.uuid})).subscribe(),this.countdown=300)}}]),e}(u.GameController),y=function(t){function e(){return Object(s.a)(this,e),Object(h.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"calculateModifications",value:function(t,e){var n=e.uuid,i=e.color;return Object(b.a)({},"players."+n,["=",{x:200,y:200,color:i}])}}]),e}(u.GameEvent),j=n(11),O=n.n(j),w=function(t){function e(){return Object(s.a)(this,e),Object(h.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"init",value:function(t,e){}},{key:"render",value:function(t,e){var n=t.players[this.params.uuid];if(n){var i=this.x;e.beginPath(),e.arc(i(n.x),i(n.y),20,0,2*Math.PI),e.fillStyle=n.color,e.fill()}}},{key:"update",value:function(t,e,n){return{players:t.players}}}]),e}(u.ViewItem),m=function(t){function e(){return Object(s.a)(this,e),Object(h.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(l.a)(e,[{key:"init",value:function(){this.events.triggerLocalEvent(new y({uuid:this.party.uuid,color:O()()})).subscribe(),this.view.registerViewItem(new w({uuid:this.party.uuid}))}},{key:"loop",value:function(t){}}]),e}(u.GameController),g=new u.GameEngine({initialViewState:{players:{}},socketConfig:{host:"p2p.s1r.io",rtcConfig:{iceServers:[{urls:"stun:stun.stunprotocol.org:3478"},{urls:"stun:stun.l.google.com:19302"}]}},initialState:{canvasWidth:500,canvasHeight:500,players:{}},controllers:[d,m],events:[f,y]});g.start();var k=Object(c.ReactiveXComponent)()(function(){return r.a.createElement("div",{className:"App",ref:function(t){return t&&t.appendChild(g.viewElement)}})});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.ed0bfad3.chunk.js.map