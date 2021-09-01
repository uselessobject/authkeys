let { AuthKey } = require( "./" ) ;
const key = new AuthKey( ) ;
let crypto = require( "crypto" ) ;

console.log( key.token ) ;

key.permission( "tacos/*", "+rw" ) ;

const key2 = AuthKey.load( "./api.key" )
console.log( key2.permission( "tacos/read" ) ) ;

console.log( crypto.getCiphers( ).splice( 32 ) ) ;