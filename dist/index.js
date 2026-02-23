"use strict";var d=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var s=d(function(z,n){
var f=require('@stdlib/strided-base-dmap/dist'),j=require('@stdlib/math-base-special-deg2rad/dist');function x(e,r,a,i,t){return f(e,r,a,i,t,j)}n.exports=x
});var q=d(function(A,v){
var l=require('@stdlib/strided-base-dmap/dist').ndarray,R=require('@stdlib/math-base-special-deg2rad/dist');function _(e,r,a,i,t,m,y){return l(e,r,a,i,t,m,y,R)}v.exports=_
});var p=d(function(B,c){
var E=require('@stdlib/utils-define-nonenumerable-read-only-property/dist'),o=s(),O=q();E(o,"ndarray",O);c.exports=o
});var b=require("path").join,h=require('@stdlib/utils-try-require/dist'),k=p(),u,g=h(b(__dirname,"./native.js"));g instanceof Error?u=k:u=g;module.exports=u;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
