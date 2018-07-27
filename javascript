1. Javascript functions
*Typical function declaration
var x = myFunction(4, 3);

function myFunction(a, b) {
    return a * b;          
}
######
******
*Assigns a function as a property of an object literal
var obj = {
  queryString: function() {
    //some code
  }
};
obj.queryString();

Equals to==>

var obj = {};
obj.queryString = function() { ... };
obj.queryString();

Object literal syntax, like a map/dictionary==>{ key: value, otherKey: otherValue };
#######

2. Starting with ES6:
One can initialize a variable using const, let, and var
-const - a defined and not changed for the entire program
-let - limited to expression, block or statement scope, just like variable definition in Java program.
-var- if defined anywhere inside the function, will be available throughout the function. Scope is global and function only.

3. JQuery
$.extend([deep],target,source1,source2,sourceN...) - orignal is for merging sources into target. Target will be modified.
target = $.extend([deep],{}/[],source) - deep copying over, be careful with the object literal {} or array [] copy.

4. with ES 6,

let something = { 'title' : title }

if both the key and value are same name, can just put one, ES 6 will auto assign the key (string) value

let something = {title}

NPM
1. to check local packages, just npm ls or list at local project root
2. to check global npm -g list --depth=0
3. npm install -g npm: to update itself

Object Prototype:
-----------------
All JavaScript objects inherit the properties and methods from their prototype.
Objects created using an object literal, or with new Object(), inherit from a prototype called Object.prototype.
Objects created with new Date() inherit the Date.prototype.
The Object.prototype is on the top of the prototype chain.
All JavaScript objects (Date, Array, RegExp, Function, ....) inherit from the Object.prototype. 

function Person(first, last, age, eyecolor) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eyecolor;
} 

var myFather = new Person("John", "Doe", 50, "blue");
var myMother = new Person("Sally", "Rally", 48, "green");

-----------------
Array.prototype.map() - something like what Python map function
var array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]

------------------
export default function(){}//in exportFile
export default class{}

an export default can be imported with *any* value

import m from './exportFile'.... //there can only be one default export in one file

------------------
Improvement of JS arguments

function somefunction(...someArgs){ //--> rest parameters/arguments, just like Bash terminal input arguments concept
	console.log("first: "+ someArgs);
	console.log("second:"+ JSON.stringify(arguments)); //arguments is a built in object literal for passed in arguments
}

somefunction(1,2,3,45);

//Output
first: 4 : 1,2,3,45
second:{"0":1,"1":2,"2":3,"3":45}


********************************
Javascript EM 6 Arrow Functions:
--------------------------------
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions


=>Use non-arrow functions for methods that will be called using the object.method() syntax. Those are the functions that will receive a meaningful this value from their caller.

=>Use arrow functions for everything else.

ES6 also provides a shorter way to write methods in object literals:-

var something = 
{
  ...
  addAll: function addAll(pieces) {
    _.each(pieces, piece => this.add(piece));
  },
  ...
}

becomes

var something=
{
  ...
  addAll(pieces) {
    _.each(pieces, piece => this.add(piece));
  },
  ...
}

*******************************
-------------------------------
ES7 async await

const getName = async()=>{//functions tagged with async return a Promise that resolves the return value
  //throw new Error('someerror') // equivalent to 'reject'
  return 'Mike';
}
/return Promise{'Mike'}

same as

const getName = ()=>{
  return new Promise((resolve,reject)=>{resolve('Mike')});
}

await could ONLY be used inside an async function()

//async await
//simplifies the asynchronous code without chaining
const getStatusAlt = async (userId)=>{
  //all await codes under here will run synchronously - one by one
  const user = await getUser(userId);//await will return the return result from this promise
  //in case getUser rejects, it will throw an error
  const grades = await getGrades(user.schoolId);//this will only run once the above is resolved

  let average = 0;

  if(grades.length>0){
    average = grades.map((grade)=>grade.grade).reduce((a,b)=>a+b)/grades.length;
  }

  return `${user.name} has a ${average}% in the class.`

}

-------------------------------
ES6 spread syntax

function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// expected output: 6

(...somearray) -> can only be used inside an argument -> it spreads the array out into individual elements
-> this is good for passing an array into function that takes only one argument, or multiple individual arguments
-> instead of writing a loop

somearray.push(...anotherarray)

SPREAD in object literals. It copies own enumerable properties from a provided object onto a new object.
i.e. shallow-cloning. Its function is like clonedObj = Object.assign({}, source1, source2...) or rather Object.assign(target, source..) method WITHOUT the setter on target (ie original target wont be overwritten)

var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }

------------------------
Unary Plus:
Attempts to converts its operands to numbers
+3     // 3
+'3'   // 3
+true  // 1
+false // 0
+null  // 0
+function(val){  return val } // NaN
------------------------
Quick boolean conversion for string:

!!""  // false
!!"my name" //true

------------------------
Object/Array destructuring:

var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true

nested object destructuring:

var metadata = {
    title: 'Scratchpad',
    translations: [
       {
        locale: 'de',
        localization_tags: [],
        last_edit: '2014-04-14T08:43:37',
        url: '/de/docs/Tools/Scratchpad',
        title: 'JavaScript-Umgebung'
       }
    ],
    url: '/en-US/docs/Tools/Scratchpad'
};

var {title: englishTitle, translations: [{title: localeTitle}]} = metadata;
//can assign it into another property 'name' here...
console.log(englishTitle);
console.log(localeTitle);

//OR use it plain vanilla..
let{translations:[{last_edit,url,title}]} =metadata;

console.log(last_edit);
console.log(url);
console.log(title);

-----

var a, b, rest;
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: [30,40,50]

--------------------------------

// Computed property names (ES2015)

The keys can be arbitary computed values
var i = 0;
var a = {
  ['foo' + ++i]: i,
  ['foo' + ++i]: i,
  ['foo' + ++i]: i
};

console.log(a.foo1); // 1
console.log(a.foo2); // 2
console.log(a.foo3); // 3

var param = 'size';
var config = {
  [param]: 12,
  ['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
};

console.log(config); // {size: 12, mobileSize: 4}

------

This also leads to a technique calls 'key interpolation'. Where you use a unique content of an object as key.

const newPost = {id:34};

return {...state,[newPost.id]:newPost}; //<--- id has now becomes the key for this 'newPost' object. Assume here state is a list of posts, this syntax will return a shallow copy of immutable state.

--------------------------------
Asynchronous - program moves on before waiting for task finishes.

normal callback code:

 function doAsyncTask(cb) {
 setTimeout(() => {
 console.log("Async Task Calling Callback");
 cb();
 }, 1000);
 }

 doAsyncTask(() => console.log("Callback Called"));

cb() is the callback function that will notify/trigger something once the async task is done.

with promise:
// Via Promise
let error = false;
function doAsyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Async task has done its thing");
      if (error) {
        reject('error');
      } else {
        resolve('done');
      }
    }, 1000);
  });
}

doAsyncTask().then( <-- notice the then keyword here, which is waiting for return
    (val) => console.log(val),  <-- the params 1 & 2 here are the arguments passed in the resolve and reject function
    (err) => console.error(err)
);


*advantages of promises over callbacks:
once a promise is resolved/rejected - ie settled, calling resolve or reject again won't do anything
- a callback function can be called again (mistakenly, which isn't what we wanted)

the 'then' function handles the 3 status, ie resolved, rejected and completed separately in their own functions, this save away the many
if/else statements that need to be written for a normal callback function.

with promise, code is cleaner

--------------------------------
The bind('value') method creates a new function that, when called, has its this keyword set to the provided value.

somemethod.bind(this)

--------------------------------
********************************
There are many methods that allow easy manipulation of array:

Array.prototype.reduce(callback[,initialValue]) - applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value

callback function takes 4 arguments callback(accumulator,currentValue[,currentIndex,array])

currentValue - The index of the current element being processed in the array. Starts at index 0 if an initialValue is provided, ELSE at index 1 otherwise.

**more info
The first time the callback is called, accumulator and currentValue can be one of two values. If initialValue is provided in the call to reduce(), then accumulator will be equal to initialValue, and currentValue will be equal to the first value in the array. If no initialValue is provided, then accumulator will be equal to the first value in the array, and currentValue will be equal to the second.

const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

console.log(array1.reduce(reducer));
//since no initial value provided, accumulator starts at position 0 and currentValue starts at position 1 [currentIndex], callback 'reducer' invoked 3 times
//acc curValue curIndex = retVal
// 1 	2  	1	= 3
// 3 	3  	2	= 6
// 6 	4  	3	= 10 [last value is returned]
// expected output: 10

console.log(array1.reduce(reducer,10));
//initial value is provided, accumulator starts with initial value and currentValue starts at position 0, callback function invoked 4 times.
//acc curValue curIndex = retVal
//10	1	0	= 11
//11	2	1	= 13
//13	3	2	= 16
//16	4	3	= 20 [last value is returned]
//output: 20

********************************
manipulation of object, the comma operator

var x = 1;

x = (x++, x);

console.log(x);
// expected output: 2

x = (2, 3);

console.log(x);
// expected output: 3

**The comma operator evaluates each of its operands (from left to right) and returns the value of the LAST operand.

Because of this, we can use it to return a modified object during objects assignment in one shot, for e.g.

someTestData = {
	id: 100,
  content: 'test data'
}

const test = {};

const testVal = (test[someTestData.id]=someTestData);

console.log(testVal);
//{id:100, content: 'test data'}

console.log(test);
//{100:{id:100, content: 'test data'}}

-------------------
The last 3 lines can be shortened to:

const testVal = (test[someTestData.id]=someTestData, test);
console.log(testVal);
//{100:{id:100, content: 'test data'}}
//since test will be evaluated last

********************************
Javascript Event Propagation


********************************
Javascript Parser

var parser = document.createElement('a');
parser.href = "http://example.com:3000/pathname/?search=test#hash";

parser.protocol; // => "http:"
parser.hostname; // => "example.com"
parser.port;     // => "3000"
parser.pathname; // => "/pathname/"
parser.search;   // => "?search=test"
parser.hash;     // => "#hash"
parser.host;     // => "example.com:3000"

********************************
--------------------------------

Function.prototype.apply() - func.apply(thisArg, [argsArray]))
Function.prototype.call() - function.call(thisArg, arg1, arg2, ...)

The call() method calls a function with a given *this* value and arguments *for this* provided individually.
apply() is the same, just arguments in an array

Object.assign(target,... sources) - similar concept to JQuery $.extend(...) function, but on objects. Properties in the target object will be overwritten by properties in the sources if they have the same key.  Later sources' properties will similarly overwrite earlier ones.  
Object.create(proto[, propertiesObject]) - returned a new prototype object (with the optional specified properties)

*****************************

Classical Class inheritance (subclass extends superclass) problem:

the dilemma of subclasses inheriting everything when calling super(). Its fine when these subclasses dont have conflict with each other.

So.. in terms of JS, there seems to be not much difference using Prototype delegation with Object.create(superclass.prototype).. with the classical class extends.. if I am not too picky with the said issue.

*****************************

Prototype delegation: In JavaScript, an object may have a link to a prototype for delegation. If a property is not found on the object, the lookup is delegated to the delegate prototype, which may have a link to its own delegate prototype, and so on up the chain until you arrive at `Object.prototype`, which is the root delegate. This is the prototype that gets hooked up when you attach to a `Constructor.prototype` and instantiate with `new`. You can also use `Object.create()` for this purpose, and even mix this technique with concatenation in order to flatten multiple prototypes to a single delegate, or extend the object instance after creation.

Functional inheritance: In JavaScript, any function can create an object. When that function is not a constructor (or `class`), it’s called a factory function. Functional inheritance works by producing an object from a factory, and extending the produced object by assigning properties to it directly (using concatenative inheritance). Douglas Crockford coined the term, but functional inheritance has been in common use in JavaScript for a long time.

Concatenative inheritance: The process of inheriting features directly from one object to another by copying the source objects properties. In JavaScript, source prototypes are commonly referred to as mixins. Since ES6, this feature has a convenience utility in JavaScript called `Object.assign()`. Prior to ES6, this was commonly done with Underscore/Lodash’s `.extend()` jQuery’s `$.extend()`, and so on… The composition example above uses concatenative inheritance. ---> Object composition

****************************

 
