'use strict'
let dd = require('debug')('holdem:playground')

var hashs = [
  
]

function getPokerScore(cs) {
    console.log('called getpokerscore ' + cs);
    var a = cs.slice(), d={}, i;
    for (i=0; i<5; i++) {
      d[a[i]] = (d[a[i]] >= 1) ? d[a[i]] + 1 : 1;
    }
    dd(d)
    dd(a)
    a.sort(function(a,b){return (d[a] < d[b]) ? +1 : (d[a] > d[b]) ? -1 : (b - a);});
    dd(a)
    return a[0]<<16|a[1]<<12|a[2]<<8|a[3]<<4|a[4];
}
dd((10 >>> 0).toString(2))
dd(((10 >>> 0)<<16).toString(2))
dd(((10 >>> 0)<<32).toString(2))
dd(((10 >>> 0)<<64).toString(2))
//dd(10<<16|8<<12|12<<8|12<<4|3)
//dd(getPokerScore([10,8,12,12,3]))
dd(getPokerScore([11,8,12,12,3]))
