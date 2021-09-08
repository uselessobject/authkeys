# 🔑 AuthKeys

![version](https://img.shields.io/badge/Version-v0.2.4-red)
![express-support](https://img.shields.io/badge/Middleware-Available-yellow?logo=express)

Create API & Server keys with Permissions and CustomData

This tool was designed to improve permissions management, especially in HTTP and database tasks that works with *url-paths* to access to the stored data.

***

Table of Contents

* 1. [Getting Started](#getting-started)
  * 1.1. [Creating a Key](#creating-a-key)
  * 1.2. [Custom Tokens](#custom-tokens)
  * 1.3. [Updating Secret](#updating-secret)
  * 1.4. [Adding CustomData](#adding-customdata)
* 2. [Saving & Loading Keys](#saving-&-loading-keys)
  * 2.1. [Local Storage](#local-storage)
  * 2.2. [Cloud Storage](#cloud-storage)
* 3. [Permissions](#permissions)
  * 3.1. [Managing Permissions](#managing-permissions)
  * 3.2. [Check Permissions](#check-permissions)
* 4. [Express Integration](#express-integration)
  * 4.1. [Tokens in Client-Side](#tokens-in-client-side)
    * 4.1.1. [Query Parameter](#query-parameter)
    * 4.1.2. [Body Property](#body-property)
    * 4.1.3. [Authorization Header](#authorization-header)
* 5. [Full API Documentation](#api-documentation)

##  1. <a name='getting-started'></a>Getting Started

Let's create our first auth-key, but first, we need to install the package in our current *Node.js* project.

```shell
npm install --save authkeys
```

###  1.1. <a name='creating-a-key'></a>Creating a Key

Is really easy to make a new key to start adding permissions and custom-data (json).
Just import the *AuthKey* class from the package or use the *createKey( )* method which uses the same parameters as the class.

```javascript title="CommonJS"
const { createKey, AuthKey } = require( "authkeys" ) ;
let key = createKey( ) ;
// or
let key2 = new AuthKey( ) ;
```

```javascript title="ES6"
import { createKey, AuthKey } from "authkeys" ;
let key = createKey( ) ;
```

By default, the class constructor will create a token **(sha256 hash)** based in a random *secret* string and also it will add a random 32-length *public* password (can be useful or not, but I just added it to prevent).

```javascript title="Result"
AuthKey {
  "token"  : "1696be1679f6696dd8e7bca9c7584e4a4916548d883d3e84dad3eec10c866a79" ,
  "secret" : "RHJVpx4EQk1drllHmUmHfUShzejcqod0Lc1YLffqUDR6YHKaucPGtQj46TfG0OfU" ,
  "public" : "WlagtNpeLnPlJmSuhVZYsNTpLPA3g9lP" ,
  "permissions" : { } ,
  "data" : { }
} ;
```

###  1.2. <a name='custom-tokens'></a>Custom Tokens

The *token* is the value used to identify your keys in a database.
In this way, you can use the token to make HTTP calls in a server, obtaining the `AuthKey` instance by searching its data in your database using the token as an ID.

The `AuthKey` class will generate a random token, but you can set your own *secret* string to generate it, even select the hash algorithm.

```javascript title="Creating Custom-Tokens"
const { createKey, AuthKey } = require( "authkeys" ) ;

// Using a Custom Token-Value [v] ;
let key1 = createKey( "my-custom-token-value" ) ;

// Generating a Token from a Secret-String [v] ;
// You must set algorithm parameter to indicate that you want to generate a token from the first string.
let key2 = createKey( "i-love-pizza", "sha256" ) ;

console.log( key1.token, key2.token ) ;
```

<details><summary>See Algorithms List (from crypto module)</summary>
<p>

```shell title="Current list obtained from crypto module"
RSA-MD4
RSA-MD5
RSA-MDC2
RSA-RIPEMD160
RSA-SHA1
RSA-SHA1-2
RSA-SHA224
RSA-SHA256
RSA-SHA3-224
RSA-SHA3-256
RSA-SHA3-384
RSA-SHA3-512
RSA-SHA384
RSA-SHA512
RSA-SHA512/224
RSA-SHA512/256
RSA-SM3
blake2b512
blake2s256
id-rsassa-pkcs1-v1_5-with-sha3-224
id-rsassa-pkcs1-v1_5-with-sha3-256
id-rsassa-pkcs1-v1_5-with-sha3-384
id-rsassa-pkcs1-v1_5-with-sha3-512
md4
md4WithRSAEncryption
md5
md5-sha1
md5WithRSAEncryption
mdc2
mdc2WithRSA
ripemd
ripemd160
ripemd160WithRSA
rmd160
sha1
sha1WithRSAEncryption
sha224
sha224WithRSAEncryption
sha256
sha256WithRSAEncryption
sha3-224
sha3-256
sha3-384
sha3-512
sha384
sha384WithRSAEncryption
sha512
sha512-224
sha512-224WithRSAEncryption
sha512-256
sha512-256WithRSAEncryption
sha512WithRSAEncryption
shake128
shake256
sm3
sm3WithRSAEncryption
ssl3-md5
ssl3-sha1
whirlpool
```
</p>
</details>


***

###  1.3. <a name='updating-secret'></a>Updating Secret

Maybe you want to reset your users' API keys without deleting permissions, so you can change the `secret` property and then call `updateToken( )`.

About the `public` password property, just change it like any other variable.

```javascript
const { AuthKey } = require( "authkeys" ) ;
let key = new AuthKey( "love-lemon-flavor", "sha256" ) ;
key.secret = "new-secret" ;
const newToken = key.updateToken( ) ;

// Update the token with a new algorithm [v] ;
const newMD5Token = key.updateToken( "md5" ) ;

// Public-Password doesn't need to call updateToken( ) method.
// Remember, tokens is just based on secret property. 
key.public = "new-public-password" ; 
```

###  1.4. <a name='adding-customdata'></a>Adding CustomData

*CustomData* is just a little feature to store **simple data** (strings, numbers, booleans or even objects) in our keys.

```javascript
// SET [v] ;
key.data( "key", "value" ) ;
key.data( "pizza", true ) ;

// GET [v] ;
var wantPizza = key.data( "pizza" ) ;
```

***

##  2. <a name='saving-&-loading-keys'></a>Saving & Loading Keys

###  2.1. <a name='local-storage'></a>Local Storage

Save your current key data (hexadecimal) in your drive and then load it with all its permissions and custom-data.

```javascript title="Saving File"
const { createKey } = require( "authkeys" ) ;
let key = createKey( ) ;
key.save( "./api.key" ) ;
```

```javascript title="Loading File"
const { AuthKey, loadKey } = require( "authkeys" ) ;
let key = AuthKey.load( "./api.key" ) ;
// or
let key = loadKey( "./api.key" ) ;
```

###  2.2. <a name='cloud-storage'></a>Cloud Storage

Sometimes we will need to save the key in a cloud-storage or database, so we can get a **JSON** and then parse it into a new *AuthKey*.

```javascript title="Get JSON"
let obj = key.toJSON( ) ;
```

```javascript title="Parse JSON"
const { AuthKey, parseKey } = require( "authkeys" ) ;
let key = AuthKey.parse( obj ) ;
// or
let key = parseKey( obj ) ;
```

***

##  3. <a name='permissions'></a>Permissions

Permissions are a bit more difficult, that's why we set it aside in a separate section.
You just need to understand that permissions work based on *url-paths* or *IDs*.

**Note:** The *AuthKey* permissions structure are useful for HTTP servers, but they aren't exclusive for that.

###  3.1. <a name='managing-permissions'></a>Managing Permissions

You can set multiple permissions using url-patterns with `permission( pattern<string>, permissions-action<string> )` method.
Just add `+` or `-` symbol at the beginning of the string and then add the first letter of each type of permission.

```shell title="Available Permission-Types"
r = read
w = write
d = delete 
x = execute
```

```javascript title="Adding Permissions"
key.permission( "id1", "+wr" ) ;
key.permission( "/users/*", "+r" ) ;
```

```javascript title="Removing Permissions"
key.permission( "id1", "-w" ) ;
key.permission( "/users/*", "-d" ) ;
```

**Note:** *What happens if I type a letter twice or enter an initial that is not available?* Actually nothing, it will be ignored.

:::tip

If you will use AuthKeys with Express.js, don't forget to add a slash (`/`) at the beginning of the permissions url-pattern. On this way, you can check permissions using `req.path` property.

:::

###  3.2. <a name='check-permissions'></a>Check Permissions

It's really easy to check all available permissions (even those that have not been added), just remove the **symbol (+/-)** from the string and use only one permission type.
Also you can use `checkPermissions(pattern<string>)` method instead to return all permissions in an object.

```javascript title="Checking Single-Permission"
const canRead    = key.permission( "id1", "r" ) ;
const canWrite   = key.permission( "/users/blitzcrank", "w" ) ; 
const canDelete  = key.permission( "/a/pattern/that/does/not/coincide", "r" ) ; // <= It will return false instead an error.
const canExecute = key.permission( "id1", "rw" ) ; // <= Not allowed. 
```

```javascript title="Using checkPermissions() Method"
// This method will return all permissions (added or not) in an object.
if( key.checkPermissions( "users/blitzcrank" ).read === true ) {
  // do something...
}
```

***

##  4. <a name='express-integration'></a>Express Integration

The `AuthKey` middleware will allow you to have a direct access to the permissions of all your keys and their data in **every HTTP call in your Express.js** server, 
using an optional cache system to save time and resources. 

**See:** [How middlewares works in Express.js](https://expressjs.com/en/guide/using-middleware.html)

```javascript title="ES6 Import"
import { middleware as authkeys, loadKey, createKey } from "authkeys" ;
```

```javascript title="Quick Example (CommonJS)"
const { loadKey, createKey } = require( "authkeys" ) ;
const authkeys = require( "authkeys" ).middleware ;
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
  /* [!] How auth-keys will be loaded or requested.
  // In this example we will get keys from a folder in the server-root.
  // You can load keys from a database like Firestore from Firebase.
  // Just remember to return the result ;
  // ---------------------------------- ; */
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

/* Check Keys only in any url under /API/ path. */
app.use( "/API/*", authkeys( AUTH_KEYS_GET, ENABLE_CACHE_KEYS ) ) ;

app.get( '/API/users', (req, res) => {
  // Checking Permissions
  const auth = req.authKey ; /* <= AuthKey instance. */
  const list = req.permissions ; /* <= All permissions for the current URL. */
  return res.send( list ) ;
} ) ;

app.listen( port, ( ) => {
  console.log( `Example app listening at http://localhost:${port}` ) ;
  console.log( "TOKEN => " + authKey.token ) ;
} ) ;

/* Go to http://localhost:3000/API/users?token=${ token-value } */
```

###  4.1. <a name='tokens-in-client-side'></a>Tokens in Client-Side

You can set the token in your HTTP requests in 3 different ways: *Query Parameter*, *Body Property* and *Authorization Header*.
The **middleware** will automatically search all this parameters (in the previous order) in every request.

####  4.1.1. <a name='query-parameter'></a>Query Parameter
Just add the `token` query parameter to the URL.

```shell
curl http://localhost:3000/API/users?token=TOKEN_VALUE
```

####  4.1.2. <a name='body-property'></a>Body Property
Add the `token` property to your body-data.

```shell
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"token":"TOKEN_VALUE"}' \
  http://localhost:3000/API/users
```

####  4.1.3. <a name='authorization-header'></a>Authorization Header

```shell
curl http://localhost:3000/API/users
  -H "Authorization: {TOKEN_VALUE}"
```

***

##  5. <a name='api-documentation'></a>Full API Documentation

To see full API documentation please visit the [github repository](https://github.com/uselessobject/authkeys/blob/main/API.md).
