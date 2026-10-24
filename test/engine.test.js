import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Grid,Playlist,DURATION} from '../engine.js';
import {scenes} from '../scenes.js';
test('every seven-second scene produces bounded RGB pixels, is deterministic, and moves',()=>{
 assert.equal(DURATION,7);assert.ok(scenes.length>=60);assert.equal(new Set(scenes.map(s=>s.id)).size,scenes.length);
 for(let scene of scenes){let samples=[];for(let t of [0,.37,1.1,2.8,4.5,6.99]){let a=new Grid().clear(),b=new Grid().clear();scene.draw(a,t,42);scene.draw(b,t,42);assert.equal(a.data.length,16*16*3);assert.deepEqual(a.data,b.data,scene.id+' determinism');assert.ok(a.data.some(v=>v>30),scene.id+' visible');samples.push(Buffer.from(a.data).toString('hex'));}assert.ok(new Set(samples).size>1,scene.id+' animates');}
});
test('shuffle cycles include all items exactly once with no repeat at cycle boundary',()=>{let items=scenes.slice(0,10),p=new Playlist(items,()=>.4);let last;for(let cycle=0;cycle<10;cycle++){let draw=Array.from({length:10},()=>p.next());assert.equal(new Set(draw).size,10);assert.notEqual(draw[0],last);last=draw.at(-1);}});
test('clipping never wraps to an adjacent row and alpha blending works',()=>{let g=new Grid().clear('#000000');g.pixel(-1,1,'#ffffff');g.pixel(16,0,'#ffffff');assert.ok(g.data.every(v=>v===0));g.pixel(3,4,'#ff0000',.5);assert.equal(g.data[(4*16+3)*3],128);});
