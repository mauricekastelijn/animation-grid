import {importedScenes} from './catalog.js';
import {hsv,mod,hash,text} from './engine.js';
const P={w:'#fff2ce',k:'#101326',o:'#f39538',r:'#fa4d67',b:'#50b8ff',c:'#63f5e0',p:'#b18aff',g:'#8de56b',y:'#ffda64',n:'#384674',d:'#925730'};
const sprites={
 fox:['o.....o','.oo.oo.','.owowo.','ooowooo','oowwwoo','.wwkww.','..www..'],
 cat:['p.....p','pp...pp','ppppppp','pwpppwp','pppkppp','.ppwpp.','..ppp..'],
 dog:['dd...dd','dowwwod','dowkwod','.owwwo.','..wrw..','..www..'],
 owl:['d.....d','ddddddd','dywdwyd','dkkdk kd'.replaceAll(' ',''),'dddoddd','.ddddd.','..d.d..'],
 frog:['.gg.gg.','gwwgwwg','gkkgkkg','ggggggg','.gkkkg.','..ggg..','gg...gg'],
 penguin:['..kkk..','.kkkkk.','.kwkwk.','kkwwwkk','kkwowkk','.kwwwk.','.ooooo.'],
 bunny:['.ww.ww.','.wp.pw.','.ww.ww.','wwwwwww','wkwwwkw','wwwrwww','.wwwww.'],
 robot:['...c...','..ccc..','nnnnnnn','nbbnbnn','nnnnnnn','.nrnrn.','..nnn..','n.nnn.n','n.ncn.n','..n.n..'],
 alien:['..g.g..','...g...','.ggggg.','ggkgkgg','ggggggg','g.g.g.g','..g.g..'],
 rocket:['...w...','..www..','..wbw..','..wbw..','.rwwwr.','rrwwwrr','...y...','...r...'],
 fish:['..oo....','oooooo.o','owkooooo','oooooo.o','..oo....'],
 jelly:['..ppp..','.ppppp.','ppwppwp','ppppppp','.p.p.p.','.p.p.p.'],
 whale:['....bbb....','..bbbbbbb..','.bbwbbbbbb.','bbbbbkbbbbb','bbbbbbbbbbb','.bbwwwbbb..','..bbbbb....'],
 butterfly:['p.....p','pp.y.pp','prpyprp','.ppkpp.','prpkprp','pp.k.pp','p..k..p'],
 duck:['..yyy..','.yyyyy.','.ykyooo','..yyy..','yyyyyy.','.yyyy..','..oo...'],
 dinosaur:['....gggg','....gkgw','....gggg','g..ggg..','ggggggg.','.ggggg..','..g.g...','..g.g...'],
 heart:['.rr.rr.','rrrrrrr','rrrrrrr','.rrrrr.','..rrr..','...r...'],
 skull:['.wwwww.','wwwwwww','wkkwkkw','wkkwkkw','.wwkww.','..www..','..w.w..'],
 mushroom:['..rrr..','.rwrrr.','rrrwrwr','rrrrrrr','..www..','..wkw..','..www..'],
 coffee:['wwwwwww.','wdddddwk','wdddddwk','wdddddwk','.wwwww..','........','wwwwwww.'],
 boombox:['.nnnnn.','nnnnnnn','nkny nkn'.replaceAll(' ',''),'nbnnnbn','nknnnkn','nnnnnnn'],
 car:['..rrrr....','.rwwwwr...','rrrrrrrrr.','rwrrrrrwr.','.kk...kk..'],
 ufo:['...ccc...','..cbbbc..','.ccccccc.','nnnnnnnnn','.y.y.y.y.'],
 boat:['...w...','..ww...','.www...','wwww...','...d...','ddddddd','.ddddd.'],
 pizza:['...y...','..yoy..','.yryyy.','yyyyroy','dddddyy'],
 cactus:['...g...','g..g..g','g..g..g','ggggggg','...g...','...g...','..ddd..','..ddd..'],
 planet:['...ppp...','..ppppp..','nypppppyn','nnnyyynnn','..ppppp..','...ppp...']};
const scenes=[];
function add(id,name,category,draw){scenes.push({id,name,category,draw});}
function stars(g,t,seed=0){for(let i=0;i<17;i++){let x=Math.floor(hash(i+seed)*16),y=Math.floor(hash(i+seed+90)*16);g.pixel(x,y,P.w,.15+.55*(.5+.5*Math.sin(t*2+i)));}}
function sprite(g,id,x,y,flip=false,palette=P,scale=1){g.sprite(sprites[id],Math.round(x),Math.round(y),palette,flip,scale);}
function ground(g,t,c=P.g){g.rect(0,14,16,2,'#132b30');for(let i=0;i<8;i++)g.pixel(mod(i*3-t*2,18)-1,14,c,.4);}
const animals=['fox','cat','dog','owl','frog','penguin','bunny'];
for(const [i,a] of animals.entries())add(a,({fox:'Fox in the fireflies',cat:'Midnight cat',dog:'Happy little dog',owl:'Moonlit owl',frog:'Lily pond',penguin:'Polar wanderer',bunny:'Bunny meadow'})[a],'Animals',(g,t,s)=>{
 if(a==='penguin'){g.clear('#0d233d');for(let k=0;k<10;k++)g.pixel(mod(k*7+s,16),mod(t*(1+hash(k))+k*3,16),P.w,.5);ground(g,t,P.b);}else{g.clear('#06131d');stars(g,t,s);ground(g,t);}
 let x=4+Math.sin(t*1.1)*2,y=6+Math.round(Math.sin(t*5)*.5);if(a==='frog')y=8-Math.max(0,Math.sin(t*2.7))*4;
 sprite(g,a,x,y,Math.cos(t*.9)<0);
 if(a==='cat')g.line(x+6,y+5,x+8+Math.sin(t*4),y+3,P.p);
 if(a==='dog')g.pixel(x+3,y+4,P.r, .6+.4*Math.sin(t*6));
 if(a==='fox')for(let j=0;j<4;j++)g.pixel(mod(j*5+t*.4,16),5+Math.sin(t*2+j)*4,P.y,.6);
 if(Math.sin(t*2)> .93)g.line(x+1,y+3,x+5,y+3,P.o);
 g.pixel(x+1+(Math.floor(t*5)%2)*4,13,P.w);g.pixel(x+5-(Math.floor(t*5)%2)*4,13,P.w);
});
add('fish','Coral reef drift','Animals',(g,t,s)=>{for(let y=0;y<16;y++)g.rect(0,y,16,1,hsv(.57+y*.003,.9,.1+y*.014));for(let i=0;i<5;i++){let x=i*4;g.line(x,16,x+Math.sin(t*2+i),11+hash(i)*2,P.g);}sprite(g,'fish',mod(t*2.5,25)-8,4+Math.sin(t)*2);for(let i=0;i<4;i++)g.pixel(mod(i*5+s,16),mod(16-t*2+i*5,16),P.c,.5);});
add('whale','Whale beneath the waves','Animals',(g,t)=>{g.clear('#06233d');for(let x=0;x<16;x++)g.pixel(x,2+Math.sin(x*.7+t*2),P.b);sprite(g,'whale',2+Math.sin(t)*3,6+Math.sin(t*2));for(let i=0;i<3;i++)g.pixel(8+i,mod(7-t*3+i*2,7),P.c);});
add('jelly','Bioluminescence','Animals',(g,t,s)=>{g.clear('#061026');stars(g,t,s);sprite(g,'jelly',4+Math.sin(t)*2,3+Math.sin(t*2)*2);for(let i=0;i<3;i++)g.line(5+i*2,10,5+i*2+Math.sin(t*4+i),13,P.p);});
add('butterfly','Butterfly garden','Animals',(g,t)=>{g.clear('#0a2229');ground(g,t);for(let i=0;i<4;i++){g.line(i*5,14,i*5,10,P.g);g.pixel(i*5,9,P.r);}sprite(g,'butterfly',4+Math.sin(t*1.5)*3,3+Math.cos(t*2)*2,false,P,Math.sin(t*8)>.1?1:.8);});
add('duck','Duck on a pond','Animals',(g,t)=>{g.clear('#0b2633');for(let y=11;y<16;y++)for(let x=0;x<16;x++)g.pixel(x,y,hsv(.52,.7,.15+.12*Math.sin(x+y+t*3)));sprite(g,'duck',4+Math.sin(t)*3,5+Math.sin(t*3));});
add('dinosaur','Jurassic stroll','Animals',(g,t)=>{g.clear('#181834');g.ellipse(13,3,2,2,P.y);ground(g,t);sprite(g,'dinosaur',3+Math.sin(t)*2,5+Math.round(Math.sin(t*6)*.5));g.pixel(6+Math.floor(t*7)%2*3,13,P.g);});
add('robot','Robot says hello','Robots',(g,t)=>{g.clear('#0b1128');stars(g,t);let y=3+Math.round(Math.sin(t*3));sprite(g,'robot',4,y);g.line(3,y+7,1,y+5+Math.sin(t*8)*2,P.n);g.pixel(7,y,P.r,Math.sin(t*5)>.2?1:.1);});
add('alien','Alien dance party','Robots',(g,t,s)=>{g.clear('#120b29');for(let x=0;x<16;x++)g.pixel(x,15,hsv(x/16+t*.1));sprite(g,'alien',4+Math.sin(t*5)*2,4+Math.abs(Math.sin(t*5))*3,false,{...P,g:hsv(s*.01+t*.1)});});
add('ufo','Close encounter','Robots',(g,t)=>{g.clear('#071325');stars(g,t);let x=4+Math.sin(t)*3,y=2+Math.sin(t*2);for(let j=0;j<8;j++)g.rect(x+4-j/2,y+5+j,1+j,1,P.g,.08+.05*Math.sin(t*5));sprite(g,'ufo',x,y);ground(g,0);});
add('mech','Mech diagnostics','Robots',(g,t)=>{g.clear('#07131c');g.rect(2,2,12,9,P.n);g.rect(3,3,10,7,'#101b32');let eye=Math.sin(t*2)*2;g.rect(4+eye,5,2,2,P.c);g.rect(10+eye,5,2,2,P.c);g.line(5,9,10,9,P.r);g.line(7,1,7,0,P.y);g.rect(4,12,8,4,P.n);for(let i=0;i<5;i++)g.pixel(5+i,13,hsv(t*.3+i*.1));});
add('rocket','Launch sequence','Space',(g,t)=>{g.clear('#080c25');for(let i=0;i<20;i++)g.pixel(hash(i)*16,mod(i*3+t*(1+Math.min(t,4)),18)-1,P.w,.4);let y=7-Math.min(t,5);sprite(g,'rocket',4,y);for(let i=0;i<5;i++)g.rect(7-i%2,y+8+i,1+i%3,1,i%2?P.r:P.y,1-i*.15);});
add('planet','Ringed world','Space',(g,t)=>{g.clear('#090c24');stars(g,t);sprite(g,'planet',3+Math.sin(t*.8),4+Math.sin(t));g.pixel(mod(t*4,22)-3,mod(t*2,12),P.w);});
add('astronaut','Spacewalk','Space',(g,t)=>{g.clear('#060b20');stars(g,t);let y=4+Math.sin(t*2);g.line(0,14,6,y+6,P.n);g.rect(5,y,6,5,P.w);g.rect(6,y+1,4,2,P.b);g.rect(6,y+5,4,4,P.w);g.pixel(7,y+6,P.r);g.line(5,y+5,3,y+7,P.w);g.line(10,y+5,12,y+4,P.w);g.pixel(6,y+10,P.w);g.pixel(10,y+10,P.w);});
add('warp','Hyperspace jump','Space',(g,t,s)=>{g.clear('#05071a');for(let i=0;i<40;i++){let a=hash(i+s)*Math.PI*2,r=mod(t*4+hash(i+40)*12,12),x=7.5+Math.cos(a)*r,y=7.5+Math.sin(a)*r;g.line(x,y,x+Math.cos(a)*r*.25,y+Math.sin(a)*r*.25,hsv(.55+hash(i)*.15,.5,Math.min(1,r/7)));}});
add('coffee','Freshly brewed','Objects',(g,t)=>{g.clear('#211426');sprite(g,'coffee',4,7);for(let j=0;j<3;j++)for(let k=0;k<4;k++)g.pixel(5+j*2+Math.sin(t*3+k),mod(6-k-t*1.5,7),P.w,.2+k*.12);});
add('boombox','Pocket mixtape','Objects',(g,t)=>{g.clear('#1a0e2a');sprite(g,'boombox',4,7+Math.round(Math.sin(t*7)*.5));for(let i=0;i<16;i++){let h=Math.round((.5+.5*Math.sin(i*1.7+t*6))*4);g.rect(i,15-h,1,h,hsv(i/22+t*.1));}text(g,'!',2,1,P.y,1,t);});
add('car','Neon night drive','Objects',(g,t)=>{g.clear('#120e2b');for(let i=0;i<6;i++){let x=mod(i*4-t*3,24)-4,h=3+hash(i)*5;g.rect(x,10-h,3,h,'#2b2446');g.pixel(x+1,10-h+1,P.p);}g.rect(0,12,16,4,'#22243c');for(let i=0;i<4;i++)g.rect(mod(i*6-t*7,22)-3,15,3,1,P.y);sprite(g,'car',3,8);});
add('boat','Sail away','Objects',(g,t)=>{g.clear('#15203c');g.ellipse(12,3,2,2,P.y);for(let y=11;y<16;y++)for(let x=0;x<16;x++)g.pixel(x,y,hsv(.58,.7,.2+.1*Math.sin(x*.8+t*3+y)));sprite(g,'boat',4+Math.sin(t)*2,5+Math.sin(t*2));});
add('pizza','Pizza spin','Objects',(g,t)=>{g.clear('#291527');sprite(g,'pizza',4+Math.sin(t)*2,4+Math.sin(t*3),Math.sin(t*2)<0);stars(g,t,5);});
add('cactus','Desert afternoon','Objects',(g,t)=>{g.clear('#311c3c');g.ellipse(12-t*.5,4,3,3,P.o);g.rect(0,13,16,3,'#a65e46');sprite(g,'cactus',4,6);for(let i=0;i<5;i++)g.pixel(mod(i*5-t,16),14,P.y,.5);});
add('mushroom','Enchanted forest','Objects',(g,t,s)=>{g.clear('#081d24');ground(g,t);sprite(g,'mushroom',4,6+Math.sin(t*2));for(let i=0;i<7;i++)g.pixel(mod(hash(i+s)*16+t*.4,16),mod(hash(i+4)*16-t,16),P.c,.4+.3*Math.sin(t*3+i));});
add('heart','A little love','Objects',(g,t)=>{g.clear('#220c26');let beat=Math.sin(t*7)>.65; sprite(g,'heart',beat?1:4,beat?2:5,false,P,beat?2:1);for(let i=0;i<5;i++)g.pixel(mod(i*5+t,16),mod(16-t*2+i*4,16),P.r,.6);});
add('skull','Ghost in the machine','Objects',(g,t)=>{g.clear('#100b24');sprite(g,'skull',4+Math.sin(t*4),4+Math.sin(t*2),false,{...P,w:hsv(.5+t*.03,.25,1)});if(Math.sin(t*10)>.85)g.rect(0,Math.floor(t*13)%16,16,1,P.r,.6);});
add('camera','Say cheese','Objects',(g,t)=>{g.clear('#152132');g.rect(2,5,12,8,P.n);g.rect(4,3,4,2,P.n);g.ellipse(8,9,3,3,P.k);g.ellipse(8,9,2,2,P.b);g.pixel(7,8,P.w);g.rect(11,6,2,1,P.y);if(mod(t,2.4)<.12)g.clear('#fff2ce');});
add('rain','Rainy window','Landscapes',(g,t,s)=>{g.clear('#0c1c32');for(let i=0;i<20;i++){let x=Math.floor(hash(i+s)*16),y=mod(t*(5+hash(i)*5)+hash(i+90)*20,20)-3;g.line(x,y,x-1,y+2,P.b);}for(let j=0;j<4;j++)g.line(j*5,15,j*5+Math.sin(t*8+j)*2,15,P.c);});
add('mountains','Alpine parallax','Landscapes',(g,t)=>{g.clear('#152849');g.ellipse(12,3,2,2,P.y);for(let x=0;x<16;x++){let far=7+Math.sin((x+t)*.4)*3,near=11+Math.sin((x+t*2)*.6)*2;g.rect(x,far,1,16,'#4b4774');g.pixel(x,far,P.w);g.rect(x,near,1,16,'#203c54');}for(let i=0;i<5;i++){let x=mod(i*6-t*4,25)-3;g.line(x,15,x,10,P.g);g.line(x-2,13,x,10,P.g);g.line(x+2,13,x,10,P.g);}});
add('sunset','Ocean sunset','Landscapes',(g,t)=>{for(let y=0;y<16;y++)g.rect(0,y,16,1,y<9?hsv(.02+y*.012,.65,.65-y*.035):'#132a4b');g.ellipse(8,6+Math.sin(t*.5),3,3,P.y);g.rect(0,10,16,6,'#142d49');for(let y=10;y<16;y++)for(let x=0;x<16;x++)if(Math.sin(x*1.8+y+t*3)>.4)g.pixel(x,y,Math.abs(x-8)<(y-8)*.5?P.o:P.b,.5);});
add('fireplace','Fireside','Landscapes',(g,t,s)=>{g.clear('#170c20');g.rect(3,14,10,2,'#754434');for(let y=2;y<14;y++)for(let x=2;x<14;x++){let v=Math.sin(x*1.3+y*.7-t*9)+Math.sin(x*.8-y*.4+t*5);if(Math.abs(x-8)<(y-1)*.42+v)g.pixel(x,y,hsv(.01+y*.004,.9,.45+y*.035));}for(let i=0;i<4;i++)g.pixel(5+hash(i+s)*6+Math.sin(t*2+i),mod(14-t*3+i*4,15),P.y);});
add('waterfall','Hidden waterfall','Landscapes',(g,t)=>{g.clear('#0d2a31');for(let y=0;y<16;y++){g.rect(0,y,5,1,hsv(.32,.7,.1+hash(y)*.2));g.rect(11,y,5,1,hsv(.35,.7,.1+hash(y+3)*.2));for(let x=5;x<11;x++)g.pixel(x,y,hsv(.53,.3,.45+.5*hash(x+Math.floor(y-t*10)*3)));}for(let i=0;i<6;i++)g.pixel(4+i*1.5,14+Math.sin(t*8+i),P.w);});
add('city','Sleepless city','Landscapes',(g,t,s)=>{g.clear('#11152e');g.ellipse(13,2,1,1,P.w);for(let i=0;i<7;i++){let x=mod(i*3-t*1.4,23)-3,h=4+hash(i+s)*9;g.rect(x,16-h,3,h,'#343458');for(let y=16-h+1;y<15;y+=2)if(hash(i+y)>.3)g.pixel(x+1,y,Math.sin(t+i+y)>.3?P.y:P.p);}});
const patterns=[['plasma','Liquid plasma'],['tunnel','Chromatic tunnel'],['kaleido','Kaleidoscope'],['vortex','Rainbow vortex'],['ripples','Interference pond'],['aurora','Northern lights'],['checker','Warped checkerboard'],['metaballs','Lava lamp'],['spiral','Spiral galaxy'],['matrix','Digital rainfall'],['fireworks','Firework festival'],['life','Living mosaic'],['equalizer','Spectrum dance'],['snake','Rainbow ribbon'],['embers','Floating embers'],['radar','Radar sweep']];
for(const [id,name] of patterns)add(id,name,'Patterns',(g,t,s)=>{
 let phase=s*.13;
 if(['plasma','tunnel','kaleido','vortex','ripples','aurora','checker','metaballs','spiral','life'].includes(id)){
 for(let y=0;y<16;y++)for(let x=0;x<16;x++){let dx=x-7.5,dy=y-7.5,r=Math.hypot(dx,dy),a=Math.atan2(dy,dx),v=0,b=1;
 switch(id){case 'plasma':v=(Math.sin(x*.4+t)+Math.sin(y*.5-t)+Math.sin(r*.7-t*2))/3;break;
 case 'tunnel':v=1/(r+.8)*4-t*.7+a/6;b=.35+.65*Math.abs(Math.sin(v*5));break;
 case 'kaleido':v=Math.sin(Math.abs(Math.sin(a*3+t*.3))*r*.7-t*2);b=.2+.8*Math.abs(v);break;
 case 'vortex':v=a/6.28+r*.075-t*.3;b=.3+.7*Math.abs(Math.sin(v*12));break;
 case 'ripples':v=Math.sin(Math.hypot(x-4,y-5)*1.2-t*3)+Math.sin(Math.hypot(x-12,y-10)-t*2);b=.25+.7*Math.abs(v/2);break;
 case 'aurora':v=y/25+Math.sin(x*.4+t)*.15;b=Math.max(.02,1-Math.abs(y-6-Math.sin(x*.4+t)*3)/5);break;
 case 'checker':v=(Math.floor((dx*Math.cos(t)-dy*Math.sin(t))/(2+Math.sin(t)))+Math.floor((dy*Math.cos(t)+dx*Math.sin(t))/(2+Math.sin(t))))%2;b=v?.85:.08;break;
 case 'metaballs':v=0;for(let i=0;i<3;i++)v+=3/(1+Math.hypot(x-7-5*Math.sin(t+i*2),y-7-5*Math.cos(t*.8+i*2)));b=Math.min(1,v*v*.5);break;
 case 'spiral':v=a*.4-r*.15+t*.4;b=Math.pow(.5+.5*Math.sin(v*8),3);break;
 case 'life':v=hash(Math.floor(x/2)+Math.floor(y/2)*8+Math.floor(t*3));b=.15+.85*v;break;}
 g.pixel(x,y,hsv(v*.25+phase+t*.035,.8,b));}return;}
 g.clear('#060b1d');
 if(id==='matrix'){for(let x=0;x<16;x++){let head=mod(t*(3+hash(x+s)*7)+hash(x)*20,24);for(let j=0;j<8;j++)g.pixel(x,head-j,j===0?P.w:P.g,1-j/9);}}
 if(id==='fireworks'){for(let k=0;k<3;k++){let age=mod(t+k*2.2,3),cx=3+hash(k+s)*10,cy=3+hash(k+s+40)*7;if(age<.6)g.line(cx,16-age*16,cx,17-age*16,P.w);else for(let i=0;i<16;i++){let a=i/16*Math.PI*2,r=(age-.6)*3;g.pixel(cx+Math.cos(a)*r,cy+Math.sin(a)*r+(age-.6)**2*.5,hsv(k*.3+phase,.8,Math.max(0,1-(age-.6)/2.4)));}}}
 if(id==='equalizer')for(let x=0;x<16;x++){let h=2+Math.floor((.5+.5*Math.sin(x*1.7+t*5)+.3*Math.sin(t*9-x))*10);for(let y=0;y<h;y++)g.pixel(x,15-y,hsv(.32-y*.025+phase,.9,.9));}
 if(id==='snake')for(let i=0;i<55;i++){let z=t-i*.045;g.pixel(7.5+Math.sin(z*2)*6.5,7.5+Math.sin(z*3)*6.5,hsv(i/55+phase, .85,1-i/80));}
 if(id==='embers')for(let i=0;i<26;i++){let y=mod(i*3-t*(1+hash(i)*4),17);g.pixel(mod(hash(i+s)*16+Math.sin(t+i),16),y,hsv(.01+hash(i)*.1,.9,.2+.8*y/16));}
 if(id==='radar'){for(let y=0;y<16;y++)for(let x=0;x<16;x++){let r=Math.hypot(x-7.5,y-7.5),a=Math.atan2(y-7.5,x-7.5);if(r<7.8)g.pixel(x,y,P.g,.05+Math.max(0,1-mod(t*2-a,Math.PI*2))* .7);if(Math.abs(r-4)<.3)g.pixel(x,y,P.g,.25);}for(let i=0;i<4;i++)g.pixel(3+hash(i+s)*10,3+hash(i+60)*10,P.y,.5+.5*Math.sin(t*2-i));}
});
for(const [i,word] of ['HELLO WORLD!','STAY CURIOUS','GOOD VIBES','PIXEL POWER','DREAM BIG','LET IT GLOW','LEVEL UP!'].entries())add('word-'+i,word,'Words',(g,t,s,custom)=>{g.clear('#0d1027');stars(g,t,s);let w=custom||word;let x=16-(t/7)*(16+w.length*4);text(g,w,x,5,k=>hsv(k*.07+t*.1+s*.01),i%2?1:0,t);for(let x=0;x<16;x++)g.pixel(x,14,hsv(x/20-t*.1),.35);});
scenes.push(...importedScenes);
export {scenes,sprites};
