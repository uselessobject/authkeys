let crypto = require( "crypto" ) ;
let fs = require( "fs" ) ;
let path = require( "path" ) ;
var appRoot = require( 'app-root-path' ) ;
let colors = require( "colors" ) ;
let URLPattern = require( "url-pattern" ) ;

/**
 * 🗝️ Create API & Server keys with Roles and CustomData 🗝️
 * @module authkeys
 */

/**
 * Create a new AuthKey instance directly from a method.
 * @param {String} [str] - The value of the key to work like a index value.
 * @see {@link #authkeys~AuthKey} to see all parameters and execution ways.
 * @example
 * // This will generate a key with a random index value (sha256 hash).
 * const { AuthKey } = require( "@purpleboost/authkeys" ) ;
 * const key = new AuthKey( ) ;
 * @also
 * @param {String} [str] - The secret-string to generate a hash as key-index.
 * @param {String} algorithm - The algorithm used to generate the hash.
 * @example
 * const { AuthKey } = require( "@purpleboost/authkeys" ) ;
 * const key = new AuthKey( "secret", "md5" ) ;
 */
module.exports.createKey = function( str, algorithm ) {

} ;

/**
 * Create key instances with multiple methods to manage them.
 * @class
 */
class AuthKey {
  /**
   * Generate a new AuthKey with a random index (hash) generated by a random secret-string.
   *   
   * **Note:** We define *index* as the value of the key used to identify it, like the value you enter in your API url. 
   *
   * @param {String} [str] - The custom index of the key or the secret to generate the key-index hash.
   * @param {String} [algorithm] - The algorithm used to generate the hash.
   * @example <caption>Random SHA256-Hash Index (CommonJS)</caption>
   * const { AuthKey } = require( "@purpleboost/authkeys" ) ;
   * const key = new AuthKey( ) ;
   * @example <caption>Random SHA256-Hash Index (ES6)</caption>
   * import { AuthKey } from "@purpleboost/authkeys" ;
   * const key = new AuthKey( ) ;
   * @example <caption>Custom Index</caption>
   * const { AuthKey } = require( "@purpleboost/authkeys" ) ;
   * const key = new AuthKey( "my-key-index" ) ;
   * @example <caption>Custom Hash-Index</caption>
   * const { AuthKey } = require( "@purpleboost/authkeys" ) ;
   * const key = new AuthKey( "my-secret-string", "sha256" ) ;
   * @example <caption>Random Hash-Index with Custom Algorithm</caption>
   * const { AuthKey } = require( "@purpleboost/authkeys" ) ;
   * const key = new AuthKey( null, "md5" ) ;
   */
  constructor( str, algorithm ) {
    defineAuthKeyProperties( this, [ "algorithm", "value", "secret", "permissions", "data" ] ) ;
    // INIT CONSTRUCTION [v] ;
    this.$data = { } ;
    this.$permissions = [ ];
    this.$algorithm = ( typeof algorithm === "string" ? algorithm : "sha256" ).toLowerCase( ) ;
    if( AuthKey.getAlgorithms( ).indexOf( this.$algorithm ) === -1 ) 
      { throw new Error( `The algorithm "${ this.$algorithm }" is not available in Node.js crypto.`.red ) ; }
    if( typeof str === "undefined" || str === null ) {
      // AUTO-GENERATE SECRET [v] ;
      this.$secret = getRandomString( 64 ) ;
      this.$value = crypto.createHash( this.$algorithm ).update( this.$secret ).digest( "hex" ) ;
    } else if( typeof str === "string" && !algorithm ) {
      // CUSTOM KEY-INDEX [v] ;
      this.$value = str ;
    } else if( typeof str === "string" && typeof algorithm === "string" ) {
      this.$secret = str ;
      this.$value = crypto.createHash( this.$algorithm ).update( this.$secret ).digest( "hex" ) ;     
    } else {
      throw new Error( "Invalid constructor parameters: AuthKey( str<string>, algorithm<string> )".red ) ;
    }
  }

  /**
   * The string used to generate the key index (hash).
   * @type {string}
   * @default random  
   */
  get secret( ) { return this.$secret ; }

  /**
   * The algorithm used to generate the key index (hash).
   * @type {string}
   * @default sha256
   * @readonly
   */
  get algorithm( ) { return this.$algorithm ; } 

  /**
   * The index of the key to identify it.
   * @type {string}
   * @readonly
   */
  get value( ) { return this.$value } ;

  /**
   * Get all available algorithms to generate hash values for key-index.
   * @returns {string[]}
   */
  static getAlgorithms( ) {
    return crypto.getHashes( ) ;
  }

  // REAL FEATURES [v] ;

  /**
   * Get/Set custom data for the key.
   * @param {string} key
   * @param {string|number|boolean|object|null} [val]
   * @example <caption>Set Data</caption>
   * key.data( "name", "blitzcrank" ) ;
   * @example <caption>Get Data</caption>
   * const name = key.data( "name" ) ;
   */
  data( key, val ) {
    if( typeof key !== "string" ) { throw new Error( "The \"key\" parameter is required (AuthKey).".red ) ; }
    if( typeof val === "undefined" ) {
      return this.$data[ key ] ;
    } else {
      return this.$data[ key ] = val ;
    }
  }

  /**
   * Set or remove permissions from the current key.
   * 
   * **Tip:** You can use url patterns to indicate, for example, that a url must include the name of a user in order to be allowed to write or read (See example).
   * @see {@link http://expressjs.com/en/guide/routing.html} to watch url pattern examples.
   * @param {string} key - The path or key to store the permission.
   * @param {string} [str] - A string with all permissions and the operation (add, remove or check).
   * @example <caption>Modifying Basic Permissions</caption>
   * // Adding permissions (+)
   * // Read, Write, Delete and Execute
   * key.permission( "docs", "+rwdx" ) ;
   * 
   * // Removing permissions (-)
   * key.permission( "docs", "-w" ) ;
   * @example <caption>Creating URL-Path Permissions</caption>
   * // Can read and write in any URL under users/USERNAME/.
   * key.permission( "users/USERNAME/*", "+rw" ) ;
   * @example <caption>Checking Permissions</caption>
   * // To check permissions just define the first letter of the permission type.
   * const canRead = key.permission( "users/blitzcrank/inventory", "r" ) ; // <= read
   * console.log( canRead ) ; // <= Expected: true (See last example)
   */
  permission( key, val ) {
    
  }
} ;

function defineAuthKeyProperties( o, arr ) {
  if( !( o instanceof AuthKey ) ) { throw new Error( "Invalid AuthKey object.".yellow ) ; }
  function hide( key ) {
    let $ = null ;
    return Object.defineProperty( o, `$${ key }`, { 
      enumerable : false , configurable : false ,
      get( ) { return $ } , set( v ) { $ = v ; }
    } ) ;
  } // HIDE FUNCTION [^] ;
  arr.forEach( p => hide( p ) ) ;
} 

module.exports.AuthKey = AuthKey ;

// TOOLS [v] ;
function getRandomString( length ) {
  var result           = '' ;
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' ;
  var charactersLength = characters.length ;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt( Math.floor( Math.random( ) * charactersLength ) ) ;
  } return result ;
}