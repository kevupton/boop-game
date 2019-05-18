(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,i){e.exports=i(23)},19:function(e,t,i){},20:function(e,t,i){},23:function(e,t,i){"use strict";i.r(t);var n=i(7),r=i.n(n),a=i(10),o=i.n(a),c=(i(19),i(11)),s=(i(20),i(0)),u=i(2),l=i(3),y=i(5),p=i(4),v=i(6),h=i(1),b=function(e){function t(){return Object(u.a)(this,t),Object(y.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(l.a)(t,[{key:"calculateModifications",value:function(e,t){var i,n=e.players,r=t.mousePosition,a=r.x,o=r.y,c=t.uuid;if(!n[c])return{};var s=n[c].mousePosition,u=s.x,l=s.y;return i={},Object(h.a)(i,"players."+c+".mousePosition.x",["+",a-u]),Object(h.a)(i,"players."+c+".mousePosition.y",["+",o-l]),i}}]),t}(s.GameEvent),f=function(e){function t(){return Object(u.a)(this,t),Object(y.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(l.a)(t,[{key:"calculateModifications",value:function(e,t){var i,n=e.players,r=t.uuid;if(!n[r])return{};var a=n[r].playerPosition,o=a.x,c=a.y,s=n[r].mousePosition,u=s.x-o,l=s.y-c,y=Math.abs(u)+Math.abs(l);if(0===y)return{};var p=u/y,v=l/y,b=n[r].vector||{x:0,y:0},f=50*p,d=50*v;return i={},Object(h.a)(i,"players."+r+".playerPosition.x",["+",b.x]),Object(h.a)(i,"players."+r+".playerPosition.y",["+",b.y]),Object(h.a)(i,"players."+r+".vector.x",["+",f-b.x]),Object(h.a)(i,"players."+r+".vector.y",["+",d-b.y]),i}}]),t}(s.GameEvent),d=function(e){function t(){var e,i;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(i=Object(y.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).current=void 0,i.previous=void 0,i.countdown=0,i}return Object(v.a)(t,e),Object(l.a)(t,[{key:"init",value:function(){var e=this;window.addEventListener("mousemove",function(t){var i=t.clientX,n=t.clientY;e.current={x:i,y:n}})}},{key:"loop",value:function(e){this.countdown-=e,this.countdown>0||(this.countdown=t.INTERVAL,this.events.triggerLocalEvent(new f({uuid:this.party.uuid})).subscribe(),!this.current||this.previous&&this.previous.x===this.current.x&&this.previous.y===this.current.y||(this.events.triggerLocalEvent(new b({mousePosition:this.current,uuid:this.party.uuid})).subscribe(),this.previous=this.current))}}]),t}(s.GameController);d.INTERVAL=300;var j=i(12),O=i.n(j),m=function(e){function t(){return Object(u.a)(this,t),Object(y.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(l.a)(t,[{key:"calculateModifications",value:function(e,t){var i=t.uuid,n=t.color;return Object(h.a)({},"players."+i,["=",{playerPosition:{x:200,y:200},mousePosition:{x:200,y:200},vector:{x:0,y:0},color:n}])}}]),t}(s.GameEvent),P=i(8),w=function(e){function t(){return Object(u.a)(this,t),Object(y.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(l.a)(t,[{key:"init",value:function(e,t){}},{key:"render",value:function(e,t){var i=e.players[this.params.uuid];if(i){var n=this.x;t.beginPath(),t.arc(n(i.x),n(i.y),20,0,2*Math.PI),t.fillStyle=i.color,t.fill()}}},{key:"update",value:function(e,t,i){var n=e.players,r=t.players,a=n[this.params.uuid];if(a&&a.vector){var o=r[this.params.uuid]||{percentage:0,prevPlayerPosition:{}},c=0;o.prevPlayerPosition.x===a.playerPosition.x&&o.prevPlayerPosition.y===a.playerPosition.y&&(c=o.percentage);var s=Math.min(1,i/200+c);return{players:Object(P.a)({},r,Object(h.a)({},this.params.uuid,Object(P.a)({},o,{x:a.playerPosition.x+s*a.vector.x,y:a.playerPosition.y+s*a.vector.y,prevPlayerPosition:Object(P.a)({},a.playerPosition),percentage:s,color:a.color})))}}}}]),t}(s.ViewItem),x=function(e){function t(){return Object(u.a)(this,t),Object(y.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(l.a)(t,[{key:"init",value:function(){var e=this;Object.keys(this.state.players).forEach(function(t){return e.createPlayerBall(t)}),this.events.on(m).subscribe(function(t){e.createPlayerBall(t.params.uuid)});var t=O()();this.events.triggerLocalEvent(new m({uuid:this.party.uuid,color:t instanceof Array?t[0]:t})).subscribe()}},{key:"loop",value:function(e){}},{key:"createPlayerBall",value:function(e){this.view.registerViewItem(new w({uuid:e}))}}]),t}(s.GameController),g=new s.GameEngine({initialViewState:{players:{}},ticksPerSecond:30,framesPerSecond:60,initialState:{canvasWidth:500,canvasHeight:500,players:{}},controllers:[d,x],events:[b,m,f],socketConfig:{host:"p2p.s1r.io",rtcConfig:{iceServers:[{urls:"stun:stun.stunprotocol.org:3478"},{urls:"stun:stun.l.google.com:19302"}]}}});g.start();var k=Object(c.ReactiveXComponent)()(function(){return r.a.createElement("div",{className:"App",ref:function(e){return e&&e.appendChild(g.viewElement)}})});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,1,2]]]);
//# sourceMappingURL=main.b73e44c6.chunk.js.map