<a name="module_authkeys"></a>

## authkeys
🗝️ Create API & Server keys with Permissions and CustomData 🗝️


* [authkeys](#module_authkeys)
    * _static_
        * [.createKey([str])](#module_authkeys.createKey)
        * [.createKey([str], algorithm)](#module_authkeys.createKey)
        * [.parseKey(obj)](#module_authkeys.parseKey) ⇒ <code>AuthKey</code>
        * [.loadKey(file)](#module_authkeys.loadKey) ⇒ <code>AuthKey</code>
    * _inner_
        * [~AuthKey](#module_authkeys..AuthKey)
            * [new AuthKey([str], [algorithm])](#new_module_authkeys..AuthKey_new)
            * _instance_
                * [.public](#module_authkeys..AuthKey+public) : <code>string</code>
                * [.secret](#module_authkeys..AuthKey+secret) : <code>string</code>
                * [.algorithm](#module_authkeys..AuthKey+algorithm) : <code>string</code>
                * [.token](#module_authkeys..AuthKey+token) : <code>string</code>
                * [.refreshPublicPassword([length])](#module_authkeys..AuthKey+refreshPublicPassword) ⇒ <code>string</code>
                * [.updateToken([algorithm])](#module_authkeys..AuthKey+updateToken)
                * [.data(key, [val])](#module_authkeys..AuthKey+data)
                * [.permission(key, [str])](#module_authkeys..AuthKey+permission)
                * [.checkPermissions(key)](#module_authkeys..AuthKey+checkPermissions) ⇒ <code>object</code>
                * [.toJSON()](#module_authkeys..AuthKey+toJSON) ⇒ <code>object</code>
                * [.save(file)](#module_authkeys..AuthKey+save)
            * _static_
                * [.getAlgorithms()](#module_authkeys..AuthKey.getAlgorithms) ⇒ <code>Array.&lt;string&gt;</code>
                * [.load(file)](#module_authkeys..AuthKey.load) ⇒ <code>AuthKey</code>
                * [.parse(data)](#module_authkeys..AuthKey.parse) ⇒ <code>AuthKey</code>


* * *

<a name="module_authkeys.createKey"></a>

### authkeys.createKey([str])
Create a new AuthKey instance directly from a method.

**Kind**: static method of [<code>authkeys</code>](#module_authkeys)  
**See**: [#authkeys~AuthKey](#authkeys~AuthKey) to see all parameters and execution ways.  

| Param | Type | Description |
| --- | --- | --- |
| [str] | <code>String</code> | The value of the key to work like a index value. |

**Example**  
```js
// This will generate a key with a random index value (sha256 hash).const { AuthKey } = require( "@purpleboost/authkeys" ) ;const key = new AuthKey( ) ;
```

* * *

<a name="module_authkeys.createKey"></a>

### authkeys.createKey([str], algorithm)
**Kind**: static method of [<code>authkeys</code>](#module_authkeys)  

| Param | Type | Description |
| --- | --- | --- |
| [str] | <code>String</code> | The secret-string to generate a hash as key-index. |
| algorithm | <code>String</code> | The algorithm used to generate the hash. |

**Example**  
```js
const { AuthKey } = require( "@purpleboost/authkeys" ) ;const key = new AuthKey( "secret", "md5" ) ;
```

* * *

<a name="module_authkeys.parseKey"></a>

### authkeys.parseKey(obj) ⇒ <code>AuthKey</code>
Create a new key from a simple object.

**Kind**: static method of [<code>authkeys</code>](#module_authkeys)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | An object obtained with *authKey.toJSON( )* method |


* * *

<a name="module_authkeys.loadKey"></a>

### authkeys.loadKey(file) ⇒ <code>AuthKey</code>
Load a key from a file saved with *authKey.save( )* method.

**Kind**: static method of [<code>authkeys</code>](#module_authkeys)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | The path of the file with all *hex* data. |


* * *

<a name="module_authkeys..AuthKey"></a>

### authkeys~AuthKey
Create key instances with multiple methods to manage them.

**Kind**: inner class of [<code>authkeys</code>](#module_authkeys)  

* [~AuthKey](#module_authkeys..AuthKey)
    * [new AuthKey([str], [algorithm])](#new_module_authkeys..AuthKey_new)
    * _instance_
        * [.public](#module_authkeys..AuthKey+public) : <code>string</code>
        * [.secret](#module_authkeys..AuthKey+secret) : <code>string</code>
        * [.algorithm](#module_authkeys..AuthKey+algorithm) : <code>string</code>
        * [.token](#module_authkeys..AuthKey+token) : <code>string</code>
        * [.refreshPublicPassword([length])](#module_authkeys..AuthKey+refreshPublicPassword) ⇒ <code>string</code>
        * [.updateToken([algorithm])](#module_authkeys..AuthKey+updateToken)
        * [.data(key, [val])](#module_authkeys..AuthKey+data)
        * [.permission(key, [str])](#module_authkeys..AuthKey+permission)
        * [.checkPermissions(key)](#module_authkeys..AuthKey+checkPermissions) ⇒ <code>object</code>
        * [.toJSON()](#module_authkeys..AuthKey+toJSON) ⇒ <code>object</code>
        * [.save(file)](#module_authkeys..AuthKey+save)
    * _static_
        * [.getAlgorithms()](#module_authkeys..AuthKey.getAlgorithms) ⇒ <code>Array.&lt;string&gt;</code>
        * [.load(file)](#module_authkeys..AuthKey.load) ⇒ <code>AuthKey</code>
        * [.parse(data)](#module_authkeys..AuthKey.parse) ⇒ <code>AuthKey</code>


* * *

<a name="new_module_authkeys..AuthKey_new"></a>

#### new AuthKey([str], [algorithm])
Generate a new AuthKey with a token (hash) generated by a random secret-string.  **Note:** We define *token* as the value of the key used to identify it, like the value you enter in your API url (www.mysite.com/api?token=mytoken).


| Param | Type | Description |
| --- | --- | --- |
| [str] | <code>String</code> | The custom token of the key or the secret to generate the key-token hash. |
| [algorithm] | <code>String</code> | The algorithm used to generate the hash. |

**Example** *(Random SHA256-Hash Token (CommonJS))*  
```js
const { AuthKey } = require( "@purpleboost/authkeys" ) ;
const key = new AuthKey( ) ;
```
**Example** *(Random SHA256-Hash Token (ES6))*  
```js
import { AuthKey } from "@purpleboost/authkeys" ;
const key = new AuthKey( ) ;
```
**Example** *(Custom Token)*  
```js
const { AuthKey } = require( "@purpleboost/authkeys" ) ;
const key = new AuthKey( "my-key-token" ) ;
```
**Example** *(Custom Hash-Token)*  
```js
const { AuthKey } = require( "@purpleboost/authkeys" ) ;
const key = new AuthKey( "my-secret-string", "sha256" ) ;
```
**Example** *(Random Hash-Token with Custom Algorithm)*  
```js
const { AuthKey } = require( "@purpleboost/authkeys" ) ;
const key = new AuthKey( null, "md5" ) ;
```

* * *

<a name="module_authkeys..AuthKey+public"></a>

#### authKey.public : <code>string</code>
A random 32-length (default) string to use as a public password for the token.

**Kind**: instance property of [<code>AuthKey</code>](#module_authkeys..AuthKey)  
**Default**: <code>&quot;RANDOM&quot;</code>  
**Example** *(Change Public-Password)*  
```js
key.public = "new-public-value" ;
```

* * *

<a name="module_authkeys..AuthKey+secret"></a>

#### authKey.secret : <code>string</code>
The string used to generate the key token (hash).Use **updateToken( )** before to use the new secret string.

**Kind**: instance property of [<code>AuthKey</code>](#module_authkeys..AuthKey)  
**Default**: <code>&quot;RANDOM&quot;</code>  

* * *

<a name="module_authkeys..AuthKey+algorithm"></a>

#### authKey.algorithm : <code>string</code>
The algorithm used to generate the key token (hash).

**Kind**: instance property of [<code>AuthKey</code>](#module_authkeys..AuthKey)  
**Default**: <code>&quot;sha256&quot;</code>  
**Read only**: true  

* * *

<a name="module_authkeys..AuthKey+token"></a>

#### authKey.token : <code>string</code>
The token of the current key.

**Kind**: instance property of [<code>AuthKey</code>](#module_authkeys..AuthKey)  
**Read only**: true  

* * *

<a name="module_authkeys..AuthKey+refreshPublicPassword"></a>

#### authKey.refreshPublicPassword([length]) ⇒ <code>string</code>
Generate a new public alpha-numeric password.

**Kind**: instance method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  
**Returns**: <code>string</code> - - The new *public* value.  

| Param | Type | Default |
| --- | --- | --- |
| [length] | <code>number</code> | <code>32</code> | 


* * *

<a name="module_authkeys..AuthKey+updateToken"></a>

#### authKey.updateToken([algorithm])
Update the current key token based on the key-secret.

**Kind**: instance method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [algorithm] | <code>string</code> | <code>&quot;current&quot;</code> | Select a hash algorithm to generate token string (sha256 by default). |


* * *

<a name="module_authkeys..AuthKey+data"></a>

#### authKey.data(key, [val])
Get/Set custom data for the key.

**Kind**: instance method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| [val] | <code>string</code> \| <code>number</code> \| <code>boolean</code> \| <code>object</code> \| <code>null</code> | 

**Example** *(Set Data)*  
```js
key.data( "name", "blitzcrank" ) ;
```
**Example** *(Get Data)*  
```js
const name = key.data( "name" ) ;
```

* * *

<a name="module_authkeys..AuthKey+permission"></a>

#### authKey.permission(key, [str])
Set or remove permissions from the current key.**Tip:** You can use url patterns to indicate, for example, that a url must include the name of a user in order to be allowed to write or read (See example).

**Kind**: instance method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  
**See**: [http://expressjs.com/en/guide/routing.html](http://expressjs.com/en/guide/routing.html) to watch url pattern examples.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The path or key to store the permission. |
| [str] | <code>string</code> | A string with all permissions and the operation (add, remove or check). |

**Example** *(Modifying Basic Permissions)*  
```js
// Adding permissions (+)
// Read, Write, Delete and Execute
key.permission( "docs", "+rwdx" ) ;

// Removing permissions (-)
key.permission( "docs", "-w" ) ;
```
**Example** *(Creating URL-Path Permissions)*  
```js
// Can read and write in any URL under users/USERNAME/.
key.permission( "users/USERNAME/*", "+rw" ) ;
```
**Example** *(Checking Permissions)*  
```js
// To check permissions just define the first letter of the permission type.
const canRead = key.permission( "users/blitzcrank/inventory", "r" ) ; // <= read
// or
const canRead = key.permission( "users/blitzcrank/inventory" ).read ;
console.log( canRead ) ; // <= Expected: true (See last example)
```

* * *

<a name="module_authkeys..AuthKey+checkPermissions"></a>

#### authKey.checkPermissions(key) ⇒ <code>object</code>
Return all permissions (added=true or not=false) of a given key/path.

**Kind**: instance method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  
**Returns**: <code>object</code> - - All possible permissions (true or false) for the current key.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key or url-pattern to check permissions. |

**Example**  
```js
key.permission( "users/blitzcrank/*", "+w" ) ;if( key.checkPermissions( "users/blitzcrank/edit" ).write === true ) {  // do something...}
```

* * *

<a name="module_authkeys..AuthKey+toJSON"></a>

#### authKey.toJSON() ⇒ <code>object</code>
Convert the current key data into a simple object to store in cloud services, then you will able to parse it with AuthKey.parse( ) static method.

**Kind**: instance method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  

* * *

<a name="module_authkeys..AuthKey+save"></a>

#### authKey.save(file)
Save the current key data (hex) into a local-storage file.

**Kind**: instance method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | The file path to store the key data. |


* * *

<a name="module_authkeys..AuthKey.getAlgorithms"></a>

#### AuthKey.getAlgorithms() ⇒ <code>Array.&lt;string&gt;</code>
Get all available algorithms to generate hash values for key-index.

**Kind**: static method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  

* * *

<a name="module_authkeys..AuthKey.load"></a>

#### AuthKey.load(file) ⇒ <code>AuthKey</code>
Load AuthKey from a file saved with authKey.save( ) method.

**Kind**: static method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | The file path. |


* * *

<a name="module_authkeys..AuthKey.parse"></a>

#### AuthKey.parse(data) ⇒ <code>AuthKey</code>
Convert a simple object from **toJSON( )** method into an AuthKey instance.

**Kind**: static method of [<code>AuthKey</code>](#module_authkeys..AuthKey)  

| Param | Type |
| --- | --- |
| data | <code>object</code> | 


* * *

