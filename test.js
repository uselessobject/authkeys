const { loadKey, createKey } = require( "./index.js" ) ;
const authkeys = require( "./index.js" ).middleware ;
const express = require( 'express' ) ;
const app = express( ) ;
const port = 3000 ;
const fs  = require( "fs" ) ;

// Creating a Local-Key for Test [v] ;
let authKey = createKey( ) ;
authKey.permission( "/API/*", "+rw" ) ;
const keysPath = "./keys/" ;
if( !fs.existsSync( keysPath ) ) { fs.mkdirSync( keysPath ) ; }
authKey.save( "./keys/test.key" ) ;

// CONFIGURE MIDDLEWARE [v] ;
const ENABLE_CACHE_KEYS = true ;
const AUTH_KEYS_GET = function( token ) {
  // [!] How auth-keys will be loaded or requested.
  // In this example we will get keys from a folder in the server-root.
  // You can load keys from a database like Firestore from Firebase.
  // Just remember to return the result ;
  // ---------------------------------- ;
  let key = null ;
  keyFiles = fs.readdirSync( keysPath ) ;
  keyFiles.forEach( file => {
    if( key ) { return false ; }
    // load and check [v] ;
    var k = loadKey( keysPath + file ) ;
    if( k.token === token ) { return key = k ; }
  } ) ;
  // If key == null, a 400 response will be returned.
  // The result can be a parsable object or an AuthKey instance.
  return key ;
} ;

// Check Keys only in any url under /API/* path.
app.use( "/API/*", authkeys( AUTH_KEYS_GET, ENABLE_CACHE_KEYS ) ) ;

// Go to http://localhost:3000/API/users?token=${ token-value }
app.get( '/API/users', (req, res) => {
  // Checking Permissions
  const auth = req.authKey ; // <= AuthKey instance.
  const list = req.permissions ; // <= All permissions for the current URL.
  return res.send( list ) ;
} ) ;

app.listen( port, ( ) => {
  console.log( `Example app listening at http://localhost:${port}` ) ;
  console.log( "TOKEN => " + authKey.token ) ;
} ) ;