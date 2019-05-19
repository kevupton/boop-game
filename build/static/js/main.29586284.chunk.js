(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(t,e,n){t.exports=n(24)},20:function(t,e,n){},21:function(t,e,n){},24:function(t,e,n){"use strict";n.r(e);var i=n(7),a=n.n(i),o=n(10),r=n.n(o),c=(n(20),n(11)),u=(n(21),n(0)),s=n(1),l=n(2),y=n(4),v=n(3),h=n(5),p=function(t){function e(){return Object(s.a)(this,e),Object(y.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(l.a)(e,[{key:"calculateModifications",value:function(t,e){var n=e.mousePosition,i=n.x,a=n.y;if(!t)return{};var o=t.mousePosition;return{"mousePosition.x":["+",i-o.x],"mousePosition.y":["+",a-o.y]}}},{key:"getScope",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return"players.".concat(this.params.uuid)}}]),e}(u.GameEvent),f=n(6),b=n(13),d=function(t){function e(){var t,n;Object(s.a)(this,e);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return(n=Object(y.a)(this,(t=Object(v.a)(e)).call.apply(t,[this].concat(a)))).type=u.GameEventType.Local,n}return Object(h.a)(e,t),Object(l.a)(e,[{key:"calculateModifications",value:function(t){var e=this;return Object.assign.apply(Object,[{}].concat(Object(b.a)(Object.keys(t).map(function(n){return e.createChanges(t,n)}))))}},{key:"createChanges",value:function(t,e){var n,i=t[e],a=this._,o=i.playerPosition,r=o.x,c=o.y,u=i.mousePosition,s=u.x-r,l=u.y-c,y=Math.abs(s)+Math.abs(l);if(0===y)return{};var v=s/y,h=l/y,p=i.vector||{x:0,y:0},b=v*a(200),d=h*a(200);return n={},Object(f.a)(n,"".concat(e,".playerPosition.x"),["+",p.x]),Object(f.a)(n,"".concat(e,".playerPosition.y"),["+",p.y]),Object(f.a)(n,"".concat(e,".vector.x"),["+",b-p.x]),Object(f.a)(n,"".concat(e,".vector.y"),["+",d-p.y]),n}},{key:"getScope",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return"players"}}]),e}(u.GameEvent),j=function(t){function e(){var t,n;Object(s.a)(this,e);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return(n=Object(y.a)(this,(t=Object(v.a)(e)).call.apply(t,[this].concat(a)))).current=void 0,n.previous=void 0,n.countdown=0,n}return Object(h.a)(e,t),Object(l.a)(e,[{key:"init",value:function(){var t=this;window.addEventListener("mousemove",function(e){var n=e.clientX,i=e.clientY;t.current={x:n,y:i}})}},{key:"loop",value:function(t){this.countdown-=t,this.events.trigger(new d({uuid:this.uuid})),this.countdown>0||(this.countdown=e.INTERVAL,!this.current||this.previous&&this.previous.x===this.current.x&&this.previous.y===this.current.y||(this.events.trigger(new p({mousePosition:this.current,uuid:this.uuid})),this.previous=this.current))}}]),e}(u.GameController);j.INTERVAL=300;var O=n(12),m=n.n(O),g=function(t){function e(){return Object(s.a)(this,e),Object(y.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(l.a)(e,[{key:"calculateModifications",value:function(t,e){var n=e.uuid,i=e.color;return Object(f.a)({},"players."+n,["=",{playerPosition:{x:200,y:200},mousePosition:{x:200,y:200},vector:{x:0,y:0},color:i}])}}]),e}(u.GameEvent),w=n(8),P=function(t){function e(){return Object(s.a)(this,e),Object(y.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(l.a)(e,[{key:"init",value:function(t,e){}},{key:"render",value:function(t,e){if(t){var n=this._;e.beginPath(),e.arc(n(t.x),n(t.y),20,0,2*Math.PI),e.fillStyle=t.color,e.fill()}}},{key:"update",value:function(t,e,n){if(t&&t.vector){var i=0;e&&e.prevPlayerPosition.x===t.playerPosition.x&&e.prevPlayerPosition.y===t.playerPosition.y&&(i=e.percentage);var a=Math.min(1,n/(1e3/x.ticksPerSecond)+i),o=t.playerPosition.x+a*t.vector.x,r=t.playerPosition.y+a*t.vector.y;return e&&e.x===o&&e.y===r?void 0:Object(w.a)({},e,{x:o,y:r,percentage:a,color:t.color,prevPlayerPosition:Object(w.a)({},t.playerPosition)})}}},{key:"getStateScope",value:function(){return"players.".concat(this.params.uuid)}},{key:"getViewStateScope",value:function(){return"players.".concat(this.params.uuid)}}]),e}(u.ViewItem),k=function(t){function e(){return Object(s.a)(this,e),Object(y.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(l.a)(e,[{key:"init",value:function(){var t=this;Object.keys(this.state.players).forEach(function(e){return t.createPlayerBall(e)}),this.events.on$(g).subscribe(function(e){t.createPlayerBall(e.params.uuid)});var e=m()();this.events.trigger(new g({uuid:this.party.uuid,color:e instanceof Array?e[0]:e}))}},{key:"loop",value:function(t){}},{key:"createPlayerBall",value:function(t){this.view.registerViewItem(new P({uuid:t}))}}]),e}(u.GameController),x=new u.GameEngine({initialViewState:{players:{}},ticksPerSecond:20,framesPerSecond:40,initialState:{canvasWidth:500,canvasHeight:500,players:{}},controllers:[j,k],events:[p,g,d],socketConfig:{host:"p2p.s1r.io",rtcConfig:{iceServers:[{urls:"stun:stun.stunprotocol.org:3478"},{urls:"stun:stun.l.google.com:19302"}]}}});x.start();var E=Object(c.ReactiveXComponent)()(function(){return a.a.createElement("div",{className:"App",ref:function(t){return t&&t.appendChild(x.viewElement)}})});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.29586284.chunk.js.map