export const SIZE=16, DURATION=7;
export const mod=(n,m)=>((n%m)+m)%m;
export function hsv(h,s=1,v=1){h=mod(h,1)*6;let i=Math.floor(h),f=h-i,p=v*(1-s),q=v*(1-f*s),t=v*(1-(1-f)*s);return [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]][i%6].map(x=>Math.round(x*255));}
export class Grid{
 constructor(){this.data=new Uint8ClampedArray(768);}
 clear(c='#02040b'){this.rect(0,0,16,16,c);return this;}
 color(c){return Array.isArray(c)?c:[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];}
 pixel(x,y,c,a=1){x=Math.round(x);y=Math.round(y);if(x<0||x>15||y<0||y>15)return;let i=(y*16+x)*3,r=this.color(c);for(let k=0;k<3;k++)this.data[i+k]=this.data[i+k]*(1-a)+r[k]*a;}
 rect(x,y,w,h,c,a=1){for(let j=0;j<h;j++)for(let i=0;i<w;i++)this.pixel(x+i,y+j,c,a);}
 line(x,y,u,v,c){let steps=Math.ceil(Math.max(Math.abs(u-x),Math.abs(v-y)));for(let i=0;i<=steps;i++)this.pixel(x+(u-x)*i/(steps||1),y+(v-y)*i/(steps||1),c);}
 ellipse(x,y,rx,ry,c){for(let j=Math.floor(y-ry);j<=y+ry;j++)for(let i=Math.floor(x-rx);i<=x+rx;i++)if(((i-x)/rx)**2+((j-y)/ry)**2<=1)this.pixel(i,j,c);}
 sprite(rows,x,y,palette,flip=false,scale=1){rows.forEach((r,j)=>[...r].forEach((p,i)=>{if(palette[p])this.rect(x+(flip?r.length-1-i:i)*scale,y+j*scale,scale,scale,palette[p]);}));}
}
const glyphs={A:'010101111101101',B:'110101110101110',C:'011100100100011',D:'110101101101110',E:'111100110100111',F:'111100110100100',G:'011100101101011',H:'101101111101101',I:'111010010010111',J:'001001001101010',K:'101101110101101',L:'100100100100111',M:'101111111101101',N:'101111111111101',O:'010101101101010',P:'110101110100100',Q:'010101101111011',R:'110101110101101',S:'011100010001110',T:'111010010010010',U:'101101101101111',V:'101101101101010',W:'101101111111101',X:'101101010101101',Y:'101101010010010',Z:'111001010100111','!':'010010010000010','?':'110001010000010',' ':'000000000000000','0':'111101101101111','1':'010110010010111','2':'110001010100111','3':'110001010001110','4':'101101111001001','5':'111100110001110','6':'011100111101111','7':'111001010010010','8':'111101111101111','9':'111101111001110'};
export function text(g,word,x,y,c,wave=0,t=0){[...word.toUpperCase()].forEach((ch,k)=>{let bits=glyphs[ch]||glyphs['?'];for(let i=0;i<15;i++)if(bits[i]==='1')g.pixel(x+k*4+i%3,y+Math.floor(i/3)+Math.round(Math.sin(k*.7+t*3)*wave),typeof c==='function'?c(k):c);});}
export function hash(n){return mod(Math.sin(n*127.1+311.7)*43758.5453,1);}
export class Playlist{
 constructor(items,random=Math.random){this.items=items;this.random=random;this.bag=[];this.last=null;}
 next(){if(!this.bag.length){this.bag=[...this.items];for(let i=this.bag.length-1;i>0;i--){let j=Math.floor(this.random()*(i+1));[this.bag[i],this.bag[j]]=[this.bag[j],this.bag[i]];}if(this.bag.length>1&&this.bag.at(-1)===this.last)[this.bag[0],this.bag[this.bag.length-1]]=[this.bag.at(-1),this.bag[0]];}this.last=this.bag.pop();return this.last;}
}
