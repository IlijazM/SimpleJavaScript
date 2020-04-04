# SuperJavaScriptObfuscator

This project is about obfuscating Text or JavaScript 
using only the chars ` [ ] ( ) + ! { } ` .

You can either convert Text into obfusctated JavaScript, which will return the given  text if run, 
or obfuscate JavaScript Code to make it literally unreadable.

**Warning:** The resulting code is big and slow!

Example:
The Text `Foo` obfuscates into:
```js
((([])[((![]+[]+[])[+!+[]+!![]+!![]+[]]+[])+(({}+[]+[])[+!+[]+[]]+[])+((!![]+[]+[])[+!+[]+[]]+[])+((!![]+[]+[])[+[]+[]]+[])])[({}+[])[+!+[]+!![]+!![]+!![]+!![]]+({}+[])[+!+[]]+([][+[]]+[])[+!+[]]+(![]+[])[+!+[]+!![]+!![]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+(!![]+[])[+!+[]+!![]]+({}+[])[+!+[]+!![]+!![]+!![]+!![]]+(!![]+[])[+[]]+({}+[])[+!+[]]+(!![]+[])[+!+[]]]+[])[+!+[]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+[]]+({}+[]+[])[+!+[]+[]]+({}+[]+[])[+!+[]+[]]
```