(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(t,e,n){t.exports=n(22)},18:function(t,e,n){},19:function(t,e,n){},22:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),r=n(9),i=n.n(r),c=(n(18),n(10)),s=(n(19),n(1)),u=n(3),l=n(4),p=n(6),v=n(5),d=n(7),h=n(2),m={name:"mouse-position-event",calculateModifications:function(t,e){var n,o=t.players,a=e.posX,r=e.posY,i=e.uuid;if(!o[i])return{};var c=o[i],s=a-c.x,u=r-c.y,l=Math.abs(s)+Math.abs(u);if(0===l)return{};var p=s/l,v=u/l;return n={},Object(h.a)(n,"players."+i+".x",["+",20*p]),Object(h.a)(n,"players."+i+".y",["+",20*v]),n}},y=function(t){function e(){var t,n;Object(u.a)(this,e);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(p.a)(this,(t=Object(v.a)(e)).call.apply(t,[this].concat(a)))).currentX=void 0,n.currentY=void 0,n.countdown=0,n}return Object(d.a)(e,t),Object(l.a)(e,[{key:"init",value:function(){var t=this;window.addEventListener("mousemove",function(e){var n=e.clientX,o=e.clientY;t.currentX=n,t.currentY=o})}},{key:"loop",value:function(t){this.countdown-=t,this.countdown>0||void 0!==this.currentY&&void 0!==this.currentX&&(this.eventManager.triggerLocalEvent(m.name,{posX:this.currentX,posY:this.currentY,uuid:this.party.uuid}).subscribe(),this.countdown+=100)}}]),e}(s.GameController),f={name:"player-init-event",calculateModifications:function(t,e){var n=e.uuid,o=e.color;return Object(h.a)({},"players."+n,["=",{x:200,y:200,color:o}])}},b=n(11),w=n.n(b),g=function(t){function e(){return Object(u.a)(this,e),Object(p.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"init",value:function(){this.eventManager.triggerLocalEvent(f.name,{uuid:this.party.uuid,color:w()()}).subscribe()}},{key:"loop",value:function(t){}}]),e}(s.GameController),j=new s.GameEngine({socketConfig:{host:"ec2-13-236-85-45.ap-southeast-2.compute.amazonaws.com",rtcConfig:{iceServers:[{urls:"stun:stun.stunprotocol.org:3478"},{urls:"stun:stun.l.google.com:19302"}]}},initialState:{canvasWidth:500,canvasHeight:500,players:{}},controllers:[y,g],events:[m,f]});j.start();var O=Object(c.ReactiveXComponent)({state:j.state$},{state:j.state})(function(t){var e=t.state,n=Object.keys(e.players);return a.a.createElement("div",{className:"App"},n.map(function(t){return a.a.createElement("div",{key:t,style:{borderRadius:"50%",backgroundColor:e.players[t].color,position:"absolute",width:20,height:20,top:e.players[t].y,left:e.players[t].x,transform:"translate(-50%, -50%)",transition:"200ms"}})}))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.1e8af400.chunk.js.map