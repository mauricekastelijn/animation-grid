import {art} from './catalog-data.js';
import {hsv,mod,hash} from './engine.js';
const alphabet='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
const decoded=art.map(a=>({...a,frames:a.frames.map(frame=>Array.from(frame,c=>alphabet.indexOf(c)))}));
function paint(g,a,frame,ox=0,oy=0,{flip=false,scaleX=1,scaleY=1,shimmer=0}={}){
 let data=a.frames[frame%a.frames.length];
 // Inverse nearest-neighbour mapping keeps the output at exactly 256 RGB pixels.
 for(let y=0;y<16;y++)for(let x=0;x<16;x++){
  let sx=Math.floor((x-7.5-ox)/scaleX+8),sy=Math.floor((y-7.5-oy)/scaleY+8);
  if(flip)sx=15-sx;if(sx<0||sy<0||sx>15||sy>15)continue;
  let c=a.palette[data[sy*16+sx]];if(c){g.pixel(x,y,c);if(shimmer>0&&Math.abs(x+y-shimmer)<1)g.pixel(x,y,'#fff3d9',.45);}
 }
}
function background(g,t,seed,kind){
 g.clear(kind==='swim'?'#08223a':kind==='hero'?'#172832':'#151725');
 for(let i=0;i<7;i++)g.pixel(Math.floor(hash(i+seed)*16),mod(hash(i+22)*16+(kind==='swim'?-t:t*.3),16),kind==='swim'?'#79dce5':'#7f8399',.25+.2*Math.sin(t*2+i));
 if(['walk','hero','forest','monster'].includes(kind)){
  g.rect(0,14,16,2,kind==='monster'?'#292537':'#233b34');
  for(let i=0;i<7;i++)g.pixel(mod(i*4-t*2,20)-2,15,'#718b67',.45);
 }
}
export const importedScenes=decoded.map((a,index)=>({id:a.id,name:a.name,category:a.category,source:a.source,draw(g,t,seed){
 background(g,t,seed,a.kind);let phase=t/7,move=Math.sin(t*1.4+index)*1.2;
 if(a.kind==='forest'){
  // Authored idle/run cycles in all four directions: run in, look, turn and leave.
  let direction=t<2?3:t<3.2?0:t<4.2?1:2,action=t<2||t>4.2?1:0;
  let frame=action*16+direction*4+Math.floor(t*(action?10:5))%4;
  paint(g,a,frame,Math.sin(t*.9)*1.5,0);return;
 }
 if(a.kind==='hero'||a.kind==='monster'){
  let direction=t<1.6?3:t<3.4?0:t<5?2:1;
  let row=Math.floor(t*7)%Math.floor(a.frames.length/4);
  paint(g,a,row*4+direction,Math.sin(t*1.1)*1.2,0);
  if(t>2.8&&t<3.6)for(let i=0;i<4;i++)g.pixel(7+Math.cos(i*1.57+t*4)*6,7+Math.sin(i*1.57+t*4)*6,'#ffe1a4',.7);
  return;
 }
 if(a.kind==='food'){
  paint(g,a,Math.floor(t*4),move,Math.sin(t*2)*.5,{scaleX:1+Math.sin(t*2)*.06,scaleY:1+Math.cos(t*2)*.04});
  for(let i=0;i<3;i++)g.pixel(3+i*4+Math.sin(t*2+i),mod(7-t*2+i,8),'#f6debd',.35);return;
 }
 if(a.kind==='item'){
  let spin=a.frames.length===1&&index%3===0;
  paint(g,a,Math.floor(t*5),0,Math.sin(t*2),{scaleX:spin?.25+.75*Math.abs(Math.cos(t*2)):1,flip:spin&&Math.cos(t*2)<0,shimmer:mod(t*8,45)-10});
  if(index%3===1)g.ellipse(8,14,3, .5,'#d5ab67');return;
 }
 if(a.kind==='swim'){
  paint(g,a,Math.floor(t*5),Math.sin(t*1.4)*2,Math.sin(t*2),{flip:Math.cos(t*1.4)<0});
  for(let i=0;i<4;i++)g.pixel(mod(i*5+seed,16),mod(17-t*3+i*4,17),'#96e9ff',.65);return;
 }
 if(a.kind==='fly'){
  paint(g,a,Math.floor(t*7),Math.sin(t*1.5)*1.5,Math.sin(t*3)*1.5,{flip:Math.cos(t*1.5)<0});return;
 }
 // A miniature stage performance: arrive, bounce, look both ways, camera push-in.
 let entrance=t<.8?(1-t/.8)*14:0,exit=t>6.3?-(t-6.3)*15:0;
 let sx=1+Math.sin(t*5)*.04,sy=1-Math.sin(t*5)*.035;
 if(index%4===0&&t>3&&t<5){let zoom=1+Math.sin((t-3)*Math.PI/2)*.28;sx*=zoom;sy*=zoom;}
 paint(g,a,Math.floor(t*6),entrance+exit+Math.sin(t*1.3),Math.round(Math.sin(t*6)*.5),{flip:t>3.5,scaleX:sx,scaleY:sy});
}}));
