let { AuthKey } = require( "./" ) ;
const key = new AuthKey( ) ;

key.data( "game", "hola" ) ;
console.log( key, key.data( "game" ) )