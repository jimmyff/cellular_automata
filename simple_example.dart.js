(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isa=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ise)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="a"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="k"){processStatics(init.statics[b1]=b2.k,b3)
delete b2.k}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bm"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bm"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bm(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.p=function(){}
var dart=[["","",,H,{"^":"",i0:{"^":"a;a"}}],["","",,J,{"^":"",
l:function(a){return void 0},
aQ:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
aN:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.bp==null){H.h4()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.cq("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$b_()]
if(v!=null)return v
v=H.hd(a)
if(v!=null)return v
if(typeof a=="function")return C.J
y=Object.getPrototypeOf(a)
if(y==null)return C.w
if(y===Object.prototype)return C.w
if(typeof w=="function"){Object.defineProperty(w,$.$get$b_(),{value:C.o,enumerable:false,writable:true,configurable:true})
return C.o}return C.o},
e:{"^":"a;",
q:function(a,b){return a===b},
gp:function(a){return H.F(a)},
i:["bx",function(a){return H.az(a)}],
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|Blob|BlobEvent|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DOMError|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ErrorEvent|Event|ExtendableEvent|ExtendableMessageEvent|FetchEvent|File|FileError|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InputEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaError|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NavigatorUserMediaError|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PositionError|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SQLError|SVGAnimatedLength|SVGAnimatedNumberList|SVGAnimatedString|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent"},
dK:{"^":"e;",
i:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$isbl:1},
bQ:{"^":"e;",
q:function(a,b){return null==b},
i:function(a){return"null"},
gp:function(a){return 0}},
b0:{"^":"e;",
gp:function(a){return 0},
i:["by",function(a){return String(a)}],
$isdL:1},
e4:{"^":"b0;"},
aF:{"^":"b0;"},
ag:{"^":"b0;",
i:function(a){var z=a[$.$get$by()]
return z==null?this.by(a):J.a1(z)},
$isaY:1,
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
ae:{"^":"e;$ti",
b5:function(a,b){if(!!a.immutable$list)throw H.c(new P.u(b))},
b4:function(a,b){if(!!a.fixed$length)throw H.c(new P.u(b))},
bb:function(a,b){return new H.bY(a,b,[H.x(a,0),null])},
cl:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.O(a))}return y},
J:function(a,b){return a[b]},
gck:function(a){if(a.length>0)return a[0]
throw H.c(H.bM())},
cK:function(a,b,c){this.b4(a,"removeRange")
P.bb(b,c,a.length,null,null,null)
a.splice(b,c-b)},
aD:function(a,b,c,d,e){var z,y
this.b5(a,"setRange")
P.bb(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.c(H.dI())
if(e<b)for(y=z-1;y>=0;--y)a[b+y]=d[e+y]
else for(y=0;y<z;++y)a[b+y]=d[e+y]},
aa:function(a,b){var z
for(z=0;z<a.length;++z)if(J.a0(a[z],b))return!0
return!1},
i:function(a){return P.at(a,"[","]")},
gv:function(a){return new J.d5(a,a.length,0,null)},
gp:function(a){return H.F(a)},
gj:function(a){return a.length},
sj:function(a,b){this.b4(a,"set length")
if(b<0)throw H.c(P.S(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.o(a,b))
if(b>=a.length||b<0)throw H.c(H.o(a,b))
return a[b]},
w:function(a,b,c){this.b5(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.o(a,b))
if(b>=a.length||b<0)throw H.c(H.o(a,b))
a[b]=c},
$isz:1,
$asz:I.p,
$isi:1,
$asi:null,
$isf:1,
$asf:null,
k:{
dJ:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(P.aU(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.c(P.S(a,0,4294967295,"length",null))
z=H.H(new Array(a),[b])
z.fixed$length=Array
return z}}},
i_:{"^":"ae;$ti"},
d5:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.ht(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
af:{"^":"e;",
N:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.u(""+a+".round()"))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
a3:function(a,b){if(typeof b!=="number")throw H.c(H.ak(b))
return a+b},
E:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
bz:function(a,b){if((a|0)===a)if(b>=1||!1)return a/b|0
return this.aY(a,b)},
D:function(a,b){return(a|0)===a?a/b|0:this.aY(a,b)},
aY:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.u("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
aX:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
K:function(a,b){if(typeof b!=="number")throw H.c(H.ak(b))
return a<b},
P:function(a,b){if(typeof b!=="number")throw H.c(H.ak(b))
return a>b},
$isal:1},
bP:{"^":"af;",$isal:1,$ish:1},
bO:{"^":"af;",$isal:1},
au:{"^":"e;",
bO:function(a,b){if(b>=a.length)throw H.c(H.o(a,b))
return a.charCodeAt(b)},
a3:function(a,b){if(typeof b!=="string")throw H.c(P.aU(b,null,null))
return a+b},
bw:function(a,b,c){var z
if(c>a.length)throw H.c(P.S(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
bv:function(a,b){return this.bw(a,b,0)},
aF:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.c(P.aA(b,null,null))
if(b>c)throw H.c(P.aA(b,null,null))
if(c>a.length)throw H.c(P.aA(c,null,null))
return a.substring(b,c)},
aE:function(a,b){return this.aF(a,b,null)},
cA:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
cz:function(a,b){return this.cA(a,b,null)},
cb:function(a,b,c){if(c>a.length)throw H.c(P.S(c,0,a.length,null,null))
return H.hs(a,b,c)},
i:function(a){return a},
gp:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
h:function(a,b){if(b>=a.length||!1)throw H.c(H.o(a,b))
return a[b]},
$isz:1,
$asz:I.p,
$isB:1}}],["","",,H,{"^":"",
bM:function(){return new P.T("No element")},
dI:function(){return new P.T("Too few elements")},
f:{"^":"D;$ti",$asf:null},
aw:{"^":"f;$ti",
gv:function(a){return new H.bS(this,this.gj(this),0,null)},
cQ:function(a,b){var z,y
z=H.H([],[H.Z(this,"aw",0)])
C.c.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y)z[y]=this.J(0,y)
return z},
cP:function(a){return this.cQ(a,!0)}},
bS:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z,y,x,w
z=this.a
y=J.G(z)
x=y.gj(z)
if(this.b!==x)throw H.c(new P.O(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.J(z,w);++this.c
return!0}},
bX:{"^":"D;a,b,$ti",
gv:function(a){return new H.dZ(null,J.an(this.a),this.b,this.$ti)},
gj:function(a){return J.ao(this.a)},
$asD:function(a,b){return[b]},
k:{
b4:function(a,b,c,d){if(!!a.$isf)return new H.dp(a,b,[c,d])
return new H.bX(a,b,[c,d])}}},
dp:{"^":"bX;a,b,$ti",$isf:1,
$asf:function(a,b){return[b]}},
dZ:{"^":"bN;a,b,c,$ti",
l:function(){var z=this.b
if(z.l()){this.a=this.c.$1(z.gm())
return!0}this.a=null
return!1},
gm:function(){return this.a}},
bY:{"^":"aw;a,b,$ti",
gj:function(a){return J.ao(this.a)},
J:function(a,b){return this.b.$1(J.d3(this.a,b))},
$asaw:function(a,b){return[b]},
$asf:function(a,b){return[b]},
$asD:function(a,b){return[b]}},
et:{"^":"D;a,b,$ti",
gv:function(a){return new H.eu(J.an(this.a),this.b,this.$ti)}},
eu:{"^":"bN;a,b,$ti",
l:function(){var z,y
for(z=this.a,y=this.b;z.l();)if(y.$1(z.gm()))return!0
return!1},
gm:function(){return this.a.gm()}},
bI:{"^":"a;$ti"}}],["","",,H,{"^":"",
aj:function(a,b){var z=a.Y(b)
if(!init.globalState.d.cy)init.globalState.f.a1()
return z},
cY:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isi)throw H.c(P.aT("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.f3(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$bK()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.eF(P.b2(null,H.ai),0)
x=P.h
y.z=new H.A(0,null,null,null,null,null,0,[x,H.bg])
y.ch=new H.A(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.f2()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.dB,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.f4)}if(init.globalState.x)return
y=init.globalState.a++
w=P.a3(null,null,null,x)
v=new H.aB(0,null,!1)
u=new H.bg(y,new H.A(0,null,null,null,null,null,0,[x,H.aB]),w,init.createNewIsolate(),v,new H.N(H.aR()),new H.N(H.aR()),!1,!1,[],P.a3(null,null,null,null),null,null,!1,!0,P.a3(null,null,null,null))
w.H(0,0)
u.aH(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.aa(a,{func:1,args:[,]}))u.Y(new H.hq(z,a))
else if(H.aa(a,{func:1,args:[,,]}))u.Y(new H.hr(z,a))
else u.Y(a)
init.globalState.f.a1()},
dF:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.dG()
return},
dG:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.u("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.u('Cannot extract URI from "'+z+'"'))},
dB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.aH(!0,[]).I(b.data)
y=J.G(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.aH(!0,[]).I(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.aH(!0,[]).I(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.h
p=P.a3(null,null,null,q)
o=new H.aB(0,null,!1)
n=new H.bg(y,new H.A(0,null,null,null,null,null,0,[q,H.aB]),p,init.createNewIsolate(),o,new H.N(H.aR()),new H.N(H.aR()),!1,!1,[],P.a3(null,null,null,null),null,null,!1,!0,P.a3(null,null,null,null))
p.H(0,0)
n.aH(0,o)
init.globalState.f.a.C(new H.ai(n,new H.dC(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.a1()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").F(y.h(z,"msg"))
init.globalState.f.a1()
break
case"close":init.globalState.ch.a0(0,$.$get$bL().h(0,a))
a.terminate()
init.globalState.f.a1()
break
case"log":H.dA(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.E(["command","print","msg",z])
q=new H.V(!0,P.a4(null,P.h)).A(q)
y.toString
self.postMessage(q)}else P.br(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
dA:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.E(["command","log","msg",a])
x=new H.V(!0,P.a4(null,P.h)).A(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.t(w)
z=H.q(w)
y=P.as(z)
throw H.c(y)}},
dD:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.c6=$.c6+("_"+y)
$.c7=$.c7+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.aJ(y,x),w,z.r])
x=new H.dE(a,b,c,d,z)
if(e){z.b2(w,w)
init.globalState.f.a.C(new H.ai(z,x,"start isolate"))}else x.$0()},
fp:function(a){return new H.aH(!0,[]).I(new H.V(!1,P.a4(null,P.h)).A(a))},
hq:{"^":"b:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
hr:{"^":"b:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
f3:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",k:{
f4:function(a){var z=P.E(["command","print","msg",a])
return new H.V(!0,P.a4(null,P.h)).A(z)}}},
bg:{"^":"a;a,b,c,cv:d<,cc:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
b2:function(a,b){if(!this.f.q(0,a))return
if(this.Q.H(0,b)&&!this.y)this.y=!0
this.as()},
cJ:function(a){var z,y,x,w,v
if(!this.y)return
z=this.Q
z.a0(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
x=init.globalState.f.a
w=x.b
v=x.a
w=(w-1&v.length-1)>>>0
x.b=w
v[w]=y
if(w===x.c)x.aO();++x.d}this.y=!1}this.as()},
c5:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
cI:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.m(new P.u("removeRange"))
P.bb(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
bu:function(a,b){if(!this.r.q(0,a))return
this.db=b},
co:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.b2(null,null)
this.cx=z}z.C(new H.eY(a,c))},
cn:function(a,b){var z
if(!this.r.q(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.ax()
return}z=this.cx
if(z==null){z=P.b2(null,null)
this.cx=z}z.C(this.gcw())},
cp:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.br(a)
if(b!=null)P.br(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.a1(a)
y[1]=b==null?null:b.i(0)
for(x=new P.cx(z,z.r,null,null),x.c=z.e;x.l();)x.d.F(y)},
Y:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.t(u)
v=H.q(u)
this.cp(w,v)
if(this.db){this.ax()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gcv()
if(this.cx!=null)for(;t=this.cx,!t.gab(t);)this.cx.be().$0()}return y},
ba:function(a){return this.b.h(0,a)},
aH:function(a,b){var z=this.b
if(z.av(a))throw H.c(P.as("Registry: ports must be registered only once."))
z.w(0,a,b)},
as:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.w(0,this.a,this)
else this.ax()},
ax:[function(){var z,y,x
z=this.cx
if(z!=null)z.L(0)
for(z=this.b,y=z.gbj(z),y=y.gv(y);y.l();)y.gm().bN()
z.L(0)
this.c.L(0)
init.globalState.z.a0(0,this.a)
this.dx.L(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].F(z[x+1])
this.ch=null}},"$0","gcw",0,0,1]},
eY:{"^":"b:1;a,b",
$0:function(){this.a.F(this.b)}},
eF:{"^":"a;a,b",
cd:function(){var z=this.a
if(z.b===z.c)return
return z.be()},
bg:function(){var z,y,x
z=this.cd()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.av(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.gab(y)}else y=!1
else y=!1
else y=!1
if(y)H.m(P.as("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.gab(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.E(["command","close"])
x=new H.V(!0,new P.cz(0,null,null,null,null,null,0,[null,P.h])).A(x)
y.toString
self.postMessage(x)}return!1}z.cG()
return!0},
aW:function(){if(self.window!=null)new H.eG(this).$0()
else for(;this.bg(););},
a1:function(){var z,y,x,w,v
if(!init.globalState.x)this.aW()
else try{this.aW()}catch(x){z=H.t(x)
y=H.q(x)
w=init.globalState.Q
v=P.E(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.V(!0,P.a4(null,P.h)).A(v)
w.toString
self.postMessage(v)}}},
eG:{"^":"b:1;a",
$0:function(){if(!this.a.bg())return
P.eo(C.q,this)}},
ai:{"^":"a;a,b,c",
cG:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.Y(this.b)}},
f2:{"^":"a;"},
dC:{"^":"b:0;a,b,c,d,e,f",
$0:function(){H.dD(this.a,this.b,this.c,this.d,this.e,this.f)}},
dE:{"^":"b:1;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.aa(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.aa(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.as()}},
cs:{"^":"a;"},
aJ:{"^":"cs;b,a",
F:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.fp(a)
if(z.gcc()===y){y=J.G(x)
switch(y.h(x,0)){case"pause":z.b2(y.h(x,1),y.h(x,2))
break
case"resume":z.cJ(y.h(x,1))
break
case"add-ondone":z.c5(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.cI(y.h(x,1))
break
case"set-errors-fatal":z.bu(y.h(x,1),y.h(x,2))
break
case"ping":z.co(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.cn(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.H(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a0(0,y)
break}return}init.globalState.f.a.C(new H.ai(z,new H.f5(this,x),"receive"))},
q:function(a,b){if(b==null)return!1
return b instanceof H.aJ&&this.b===b.b},
gp:function(a){return this.b.a}},
f5:{"^":"b:0;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.bG(this.b)}},
bh:{"^":"cs;b,c,a",
F:function(a){var z,y,x
z=P.E(["command","message","port",this,"msg",a])
y=new H.V(!0,P.a4(null,P.h)).A(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
q:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.bh){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
aB:{"^":"a;a,b,c",
bN:function(){this.c=!0
this.b=null},
bG:function(a){if(this.c)return
this.b.$1(a)},
$ise7:1},
cd:{"^":"a;a,b,c",
a9:function(){if(self.setTimeout!=null){if(this.b)throw H.c(new P.u("Timer in event loop cannot be canceled."))
var z=this.c
if(z==null)return;--init.globalState.f.b
if(this.a)self.clearTimeout(z)
else self.clearInterval(z)
this.c=null}else throw H.c(new P.u("Canceling a timer."))},
bC:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.a9(new H.el(this,b),0),a)}else throw H.c(new P.u("Periodic timer."))},
bB:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.C(new H.ai(y,new H.em(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.a9(new H.en(this,b),0),a)}else throw H.c(new P.u("Timer greater than 0."))},
k:{
ej:function(a,b){var z=new H.cd(!0,!1,null)
z.bB(a,b)
return z},
ek:function(a,b){var z=new H.cd(!1,!1,null)
z.bC(a,b)
return z}}},
em:{"^":"b:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
en:{"^":"b:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
el:{"^":"b:0;a,b",
$0:function(){this.b.$1(this.a)}},
N:{"^":"a;a",
gp:function(a){var z=this.a
z=C.a.aX(z,0)^C.a.D(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
q:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.N){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
V:{"^":"a;a,b",
A:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.w(0,a,z.gj(z))
z=J.l(a)
if(!!z.$isc_)return["buffer",a]
if(!!z.$isb7)return["typed",a]
if(!!z.$isz)return this.bq(a)
if(!!z.$isdz){x=this.gbn()
w=a.gb8()
w=H.b4(w,x,H.Z(w,"D",0),null)
w=P.bT(w,!0,H.Z(w,"D",0))
z=z.gbj(a)
z=H.b4(z,x,H.Z(z,"D",0),null)
return["map",w,P.bT(z,!0,H.Z(z,"D",0))]}if(!!z.$isdL)return this.br(a)
if(!!z.$ise)this.bi(a)
if(!!z.$ise7)this.a2(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isaJ)return this.bs(a)
if(!!z.$isbh)return this.bt(a)
if(!!z.$isb){v=a.$static_name
if(v==null)this.a2(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isN)return["capability",a.a]
if(!(a instanceof P.a))this.bi(a)
return["dart",init.classIdExtractor(a),this.bp(init.classFieldsExtractor(a))]},"$1","gbn",2,0,2],
a2:function(a,b){throw H.c(new P.u((b==null?"Can't transmit:":b)+" "+H.d(a)))},
bi:function(a){return this.a2(a,null)},
bq:function(a){var z=this.bo(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.a2(a,"Can't serialize indexable: ")},
bo:function(a){var z,y
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.A(a[y])
return z},
bp:function(a){var z
for(z=0;z<a.length;++z)C.c.w(a,z,this.A(a[z]))
return a},
br:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.a2(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.A(a[z[x]])
return["js-object",z,y]},
bt:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
bs:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
aH:{"^":"a;a,b",
I:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.aT("Bad serialized message: "+H.d(a)))
switch(C.c.gck(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.H(this.X(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.H(this.X(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.X(z)
case"const":z=a[1]
this.b.push(z)
y=H.H(this.X(z),[null])
y.fixed$length=Array
return y
case"map":return this.cg(a)
case"sendport":return this.ci(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.cf(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.N(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.X(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.c("couldn't deserialize: "+H.d(a))}},"$1","gce",2,0,2],
X:function(a){var z
for(z=0;z<a.length;++z)C.c.w(a,z,this.I(a[z]))
return a},
cg:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.dU()
this.b.push(x)
z=J.d4(z,this.gce()).cP(0)
for(w=J.G(y),v=0;v<z.length;++v)x.w(0,z[v],this.I(w.h(y,v)))
return x},
ci:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.ba(x)
if(u==null)return
t=new H.aJ(u,y)}else t=new H.bh(z,x,y)
this.b.push(t)
return t},
cf:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.G(z),v=J.G(y),u=0;u<w.gj(z);++u)x[w.h(z,u)]=this.I(v.h(y,u))
return x}}}],["","",,H,{"^":"",
h_:function(a){return init.types[a]},
hc:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isJ},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.a1(a)
if(typeof z!=="string")throw H.c(H.ak(a))
return z},
F:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
c8:function(a){var z,y,x,w,v,u,t,s
z=J.l(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.B||!!J.l(a).$isaF){v=C.u(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.f.bO(w,0)===36)w=C.f.aE(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cT(H.aO(a),0,null),init.mangledGlobalNames)},
az:function(a){return"Instance of '"+H.c8(a)+"'"},
c5:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.ak(a))
return a[b]},
o:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.M(!0,b,"index",null)
z=J.ao(a)
if(b<0||b>=z)return P.aZ(b,a,"index",null,z)
return P.aA(b,"index",null)},
ak:function(a){return new P.M(!0,a,null,null)},
c:function(a){var z
if(a==null)a=new P.b8()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.cZ})
z.name=""}else z.toString=H.cZ
return z},
cZ:function(){return J.a1(this.dartException)},
m:function(a){throw H.c(a)},
ht:function(a){throw H.c(new P.O(a))},
t:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hz(a)
if(a==null)return
if(a instanceof H.aX)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.aX(x,16)&8191)===10)switch(w){case 438:return z.$1(H.b1(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.c4(v,null))}}if(a instanceof TypeError){u=$.$get$cf()
t=$.$get$cg()
s=$.$get$ch()
r=$.$get$ci()
q=$.$get$cm()
p=$.$get$cn()
o=$.$get$ck()
$.$get$cj()
n=$.$get$cp()
m=$.$get$co()
l=u.B(y)
if(l!=null)return z.$1(H.b1(y,l))
else{l=t.B(y)
if(l!=null){l.method="call"
return z.$1(H.b1(y,l))}else{l=s.B(y)
if(l==null){l=r.B(y)
if(l==null){l=q.B(y)
if(l==null){l=p.B(y)
if(l==null){l=o.B(y)
if(l==null){l=r.B(y)
if(l==null){l=n.B(y)
if(l==null){l=m.B(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.c4(y,l==null?null:l.method))}}return z.$1(new H.er(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.c9()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.M(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.c9()
return a},
q:function(a){var z
if(a instanceof H.aX)return a.b
if(a==null)return new H.cA(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.cA(a,null)},
hn:function(a){if(a==null||typeof a!='object')return J.am(a)
else return H.F(a)},
fX:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.w(0,a[y],a[x])}return b},
h6:function(a,b,c,d,e,f,g){switch(c){case 0:return H.aj(b,new H.h7(a))
case 1:return H.aj(b,new H.h8(a,d))
case 2:return H.aj(b,new H.h9(a,d,e))
case 3:return H.aj(b,new H.ha(a,d,e,f))
case 4:return H.aj(b,new H.hb(a,d,e,f,g))}throw H.c(P.as("Unsupported number of arguments for wrapped closure"))},
a9:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.h6)
a.$identity=z
return z},
de:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isi){z.$reflectionInfo=c
x=H.e9(z).r}else x=c
w=d?Object.create(new H.ee().constructor.prototype):Object.create(new H.aV(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.y
$.y=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.bw(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.h_,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.bu:H.aW
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bw(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
db:function(a,b,c,d){var z=H.aW
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bw:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.dd(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.db(y,!w,z,b)
if(y===0){w=$.y
$.y=w+1
u="self"+H.d(w)
w="return function(){var "+u+" = this."
v=$.a2
if(v==null){v=H.aq("self")
$.a2=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.y
$.y=w+1
t+=H.d(w)
w="return function("+t+"){return this."
v=$.a2
if(v==null){v=H.aq("self")
$.a2=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
dc:function(a,b,c,d){var z,y
z=H.aW
y=H.bu
switch(b?-1:a){case 0:throw H.c(new H.ea("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
dd:function(a,b){var z,y,x,w,v,u,t,s
z=H.d6()
y=$.bt
if(y==null){y=H.aq("receiver")
$.bt=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.dc(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.y
$.y=u+1
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.y
$.y=u+1
return new Function(y+H.d(u)+"}")()},
bm:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.de(a,b,z,!!d,e,f)},
fV:function(a){var z=J.l(a)
return"$S" in z?z.$S():null},
aa:function(a,b){var z
if(a==null)return!1
z=H.fV(a)
return z==null?!1:H.cS(z,b)},
hu:function(a){throw H.c(new P.dj(a))},
aR:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
cP:function(a){return init.getIsolateTag(a)},
H:function(a,b){a.$ti=b
return a},
aO:function(a){if(a==null)return
return a.$ti},
cQ:function(a,b){return H.bs(a["$as"+H.d(b)],H.aO(a))},
Z:function(a,b,c){var z=H.cQ(a,b)
return z==null?null:z[c]},
x:function(a,b){var z=H.aO(a)
return z==null?null:z[b]},
a_:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cT(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.a_(z,b)
return H.fq(a,b)}return"unknown-reified-type"},
fq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.a_(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.a_(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.a_(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.fW(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.a_(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
cT:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bc("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.n=v+", "
u=a[y]
if(u!=null)w=!1
v=z.n+=H.a_(u,c)}return w?"":"<"+z.i(0)+">"},
bs:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aL:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.aO(a)
y=J.l(a)
if(y[b]==null)return!1
return H.cM(H.bs(y[d],z),c)},
cM:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.r(a[y],b[y]))return!1
return!0},
fU:function(a,b,c){return a.apply(b,H.cQ(b,c))},
r:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ay")return!0
if('func' in b)return H.cS(a,b)
if('func' in a)return b.builtin$cls==="aY"||b.builtin$cls==="a"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.a_(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.cM(H.bs(u,z),x)},
cL:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.r(z,v)||H.r(v,z)))return!1}return!0},
fB:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.r(v,u)||H.r(u,v)))return!1}return!0},
cS:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.r(z,y)||H.r(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.cL(x,w,!1))return!1
if(!H.cL(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.r(o,n)||H.r(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.r(o,n)||H.r(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.r(o,n)||H.r(n,o)))return!1}}return H.fB(a.named,b.named)},
iF:function(a){var z=$.bo
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
iD:function(a){return H.F(a)},
iC:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
hd:function(a){var z,y,x,w,v,u
z=$.bo.$1(a)
y=$.aM[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aP[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.cK.$2(a,z)
if(z!=null){y=$.aM[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aP[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bq(x)
$.aM[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.aP[z]=x
return x}if(v==="-"){u=H.bq(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.cU(a,x)
if(v==="*")throw H.c(new P.cq(z))
if(init.leafTags[z]===true){u=H.bq(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.cU(a,x)},
cU:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.aQ(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bq:function(a){return J.aQ(a,!1,null,!!a.$isJ)},
hm:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.aQ(z,!1,null,!!z.$isJ)
else return J.aQ(z,c,null,null)},
h4:function(){if(!0===$.bp)return
$.bp=!0
H.h5()},
h5:function(){var z,y,x,w,v,u,t,s
$.aM=Object.create(null)
$.aP=Object.create(null)
H.h0()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.cV.$1(v)
if(u!=null){t=H.hm(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
h0:function(){var z,y,x,w,v,u,t
z=C.G()
z=H.Y(C.D,H.Y(C.I,H.Y(C.t,H.Y(C.t,H.Y(C.H,H.Y(C.E,H.Y(C.F(C.u),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bo=new H.h1(v)
$.cK=new H.h2(u)
$.cV=new H.h3(t)},
Y:function(a,b){return a(b)||b},
hs:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
e8:{"^":"a;a,b,c,d,e,f,r,x",k:{
e9:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.e8(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
eq:{"^":"a;a,b,c,d,e,f",
B:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
k:{
C:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.eq(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
aE:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
cl:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
c4:{"^":"n;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+z+"' on null"}},
dN:{"^":"n;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
k:{
b1:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.dN(a,y,z?null:b.receiver)}}},
er:{"^":"n;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
aX:{"^":"a;a,b"},
hz:{"^":"b:2;a",
$1:function(a){if(!!J.l(a).$isn)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
cA:{"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
h7:{"^":"b:0;a",
$0:function(){return this.a.$0()}},
h8:{"^":"b:0;a,b",
$0:function(){return this.a.$1(this.b)}},
h9:{"^":"b:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ha:{"^":"b:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
hb:{"^":"b:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
b:{"^":"a;",
i:function(a){return"Closure '"+H.c8(this).trim()+"'"},
gbl:function(){return this},
$isaY:1,
gbl:function(){return this}},
cc:{"^":"b;"},
ee:{"^":"cc;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
aV:{"^":"cc;a,b,c,d",
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.aV))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.F(this.a)
else y=typeof z!=="object"?J.am(z):H.F(z)
return(y^H.F(this.b))>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.az(z)},
k:{
aW:function(a){return a.a},
bu:function(a){return a.c},
d6:function(){var z=$.a2
if(z==null){z=H.aq("self")
$.a2=z}return z},
aq:function(a){var z,y,x,w,v
z=new H.aV("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
ea:{"^":"n;a",
i:function(a){return"RuntimeError: "+H.d(this.a)}},
A:{"^":"a;a,b,c,d,e,f,r,$ti",
gj:function(a){return this.a},
gab:function(a){return this.a===0},
gb8:function(){return new H.dP(this,[H.x(this,0)])},
gbj:function(a){return H.b4(this.gb8(),new H.dM(this),H.x(this,0),H.x(this,1))},
av:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.aL(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.aL(y,a)}else return this.cq(a)},
cq:function(a){var z=this.d
if(z==null)return!1
return this.a_(this.a8(z,this.Z(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.U(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.U(x,b)
return y==null?null:y.b}else return this.cr(b)},
cr:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a8(z,this.Z(a))
x=this.a_(y,a)
if(x<0)return
return y[x].b},
w:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.al()
this.b=z}this.aG(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.al()
this.c=y}this.aG(y,b,c)}else this.ct(b,c)},
ct:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.al()
this.d=z}y=this.Z(a)
x=this.a8(z,y)
if(x==null)this.aq(z,y,[this.am(a,b)])
else{w=this.a_(x,a)
if(w>=0)x[w].b=b
else x.push(this.am(a,b))}},
cH:function(a,b){var z
if(this.av(a))return this.h(0,a)
z=b.$0()
this.w(0,a,z)
return z},
a0:function(a,b){if(typeof b==="string")return this.aV(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aV(this.c,b)
else return this.cs(b)},
cs:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a8(z,this.Z(a))
x=this.a_(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.b_(w)
return w.b},
L:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
b6:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.O(this))
z=z.c}},
aG:function(a,b,c){var z=this.U(a,b)
if(z==null)this.aq(a,b,this.am(b,c))
else z.b=c},
aV:function(a,b){var z
if(a==null)return
z=this.U(a,b)
if(z==null)return
this.b_(z)
this.aM(a,b)
return z.b},
am:function(a,b){var z,y
z=new H.dO(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
b_:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
Z:function(a){return J.am(a)&0x3ffffff},
a_:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a0(a[y].a,b))return y
return-1},
i:function(a){return P.e_(this)},
U:function(a,b){return a[b]},
a8:function(a,b){return a[b]},
aq:function(a,b,c){a[b]=c},
aM:function(a,b){delete a[b]},
aL:function(a,b){return this.U(a,b)!=null},
al:function(){var z=Object.create(null)
this.aq(z,"<non-identifier-key>",z)
this.aM(z,"<non-identifier-key>")
return z},
$isdz:1},
dM:{"^":"b:2;a",
$1:function(a){return this.a.h(0,a)}},
dO:{"^":"a;a,b,c,d"},
dP:{"^":"f;a,$ti",
gj:function(a){return this.a.a},
gv:function(a){var z,y
z=this.a
y=new H.dQ(z,z.r,null,null)
y.c=z.e
return y}},
dQ:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.O(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
h1:{"^":"b:2;a",
$1:function(a){return this.a(a)}},
h2:{"^":"b:8;a",
$2:function(a,b){return this.a(a,b)}},
h3:{"^":"b:9;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
fW:function(a){var z=H.H(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
ho:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",c_:{"^":"e;",$isc_:1,"%":"ArrayBuffer"},b7:{"^":"e;",$isb7:1,"%":"DataView;ArrayBufferView;b5|c0|c2|b6|c1|c3|K"},b5:{"^":"b7;",
gj:function(a){return a.length},
$isJ:1,
$asJ:I.p,
$isz:1,
$asz:I.p},b6:{"^":"c2;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]}},c0:{"^":"b5+ax;",$asJ:I.p,$asz:I.p,
$asi:function(){return[P.L]},
$asf:function(){return[P.L]},
$isi:1,
$isf:1},c2:{"^":"c0+bI;",$asJ:I.p,$asz:I.p,
$asi:function(){return[P.L]},
$asf:function(){return[P.L]}},K:{"^":"c3;",$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]}},c1:{"^":"b5+ax;",$asJ:I.p,$asz:I.p,
$asi:function(){return[P.h]},
$asf:function(){return[P.h]},
$isi:1,
$isf:1},c3:{"^":"c1+bI;",$asJ:I.p,$asz:I.p,
$asi:function(){return[P.h]},
$asf:function(){return[P.h]}},i4:{"^":"b6;",$isi:1,
$asi:function(){return[P.L]},
$isf:1,
$asf:function(){return[P.L]},
"%":"Float32Array"},i5:{"^":"b6;",$isi:1,
$asi:function(){return[P.L]},
$isf:1,
$asf:function(){return[P.L]},
"%":"Float64Array"},i6:{"^":"K;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Int16Array"},i7:{"^":"K;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Int32Array"},i8:{"^":"K;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Int8Array"},i9:{"^":"K;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Uint16Array"},ia:{"^":"K;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Uint32Array"},ib:{"^":"K;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"CanvasPixelArray|Uint8ClampedArray"},ic:{"^":"K;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
ew:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.fC()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a9(new P.ey(z),1)).observe(y,{childList:true})
return new P.ex(z,y,x)}else if(self.setImmediate!=null)return P.fD()
return P.fE()},
iq:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.a9(new P.ez(a),0))},"$1","fC",2,0,4],
ir:[function(a){++init.globalState.f.b
self.setImmediate(H.a9(new P.eA(a),0))},"$1","fD",2,0,4],
is:[function(a){P.bd(C.q,a)},"$1","fE",2,0,4],
fm:function(a,b){P.cC(null,a)
return b.a},
iz:function(a,b){P.cC(a,b)},
fl:function(a,b){b.c9(0,a)},
fk:function(a,b){b.ca(H.t(a),H.q(a))},
cC:function(a,b){var z,y,x,w
z=new P.fn(b)
y=new P.fo(b)
x=J.l(a)
if(!!x.$isw)a.ar(z,y)
else if(!!x.$isP)a.aC(z,y)
else{w=new P.w(0,$.j,null,[null])
w.a=4
w.c=a
w.ar(z,null)}},
fy:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.j.toString
return new P.fz(z)},
cG:function(a,b){if(H.aa(a,{func:1,args:[P.ay,P.ay]})){b.toString
return a}else{b.toString
return a}},
df:function(a){return new P.fh(new P.w(0,$.j,null,[a]),[a])},
fs:function(){var z,y
for(;z=$.W,z!=null;){$.a6=null
y=z.b
$.W=y
if(y==null)$.a5=null
z.a.$0()}},
iB:[function(){$.bi=!0
try{P.fs()}finally{$.a6=null
$.bi=!1
if($.W!=null)$.$get$be().$1(P.cN())}},"$0","cN",0,0,1],
cJ:function(a){var z=new P.cr(a,null)
if($.W==null){$.a5=z
$.W=z
if(!$.bi)$.$get$be().$1(P.cN())}else{$.a5.b=z
$.a5=z}},
fx:function(a){var z,y,x
z=$.W
if(z==null){P.cJ(a)
$.a6=$.a5
return}y=new P.cr(a,null)
x=$.a6
if(x==null){y.b=z
$.a6=y
$.W=y}else{y.b=x.b
x.b=y
$.a6=y
if(y.b==null)$.a5=y}},
cW:function(a){var z=$.j
if(C.b===z){P.X(null,null,C.b,a)
return}z.toString
P.X(null,null,z,z.au(a,!0))},
ii:function(a,b){return new P.fg(null,a,!1,[b])},
bk:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.t(x)
y=H.q(x)
w=$.j
w.toString
P.a7(null,null,w,z,y)}},
ft:[function(a,b){var z=$.j
z.toString
P.a7(null,null,z,a,b)},function(a){return P.ft(a,null)},"$2","$1","fG",2,2,5,0],
iA:[function(){},"$0","fF",0,0,1],
eo:function(a,b){var z=$.j
if(z===C.b){z.toString
return P.bd(a,b)}return P.bd(a,z.au(b,!0))},
ep:function(a,b){var z,y
z=$.j
if(z===C.b){z.toString
return P.ce(a,b)}y=z.b3(b,!0)
$.j.toString
return P.ce(a,y)},
bd:function(a,b){var z=C.a.D(a.a,1000)
return H.ej(z<0?0:z,b)},
ce:function(a,b){var z=C.a.D(a.a,1000)
return H.ek(z<0?0:z,b)},
ev:function(){return $.j},
a7:function(a,b,c,d,e){var z={}
z.a=d
P.fx(new P.fu(z,e))},
cH:function(a,b,c,d){var z,y
y=$.j
if(y===c)return d.$0()
$.j=c
z=y
try{y=d.$0()
return y}finally{$.j=z}},
cI:function(a,b,c,d,e){var z,y
y=$.j
if(y===c)return d.$1(e)
$.j=c
z=y
try{y=d.$1(e)
return y}finally{$.j=z}},
fw:function(a,b,c,d,e,f){var z,y
y=$.j
if(y===c)return d.$2(e,f)
$.j=c
z=y
try{y=d.$2(e,f)
return y}finally{$.j=z}},
X:function(a,b,c,d){var z=C.b!==c
if(z)d=c.au(d,!(!z||!1))
P.cJ(d)},
ey:{"^":"b:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
ex:{"^":"b:10;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ez:{"^":"b:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
eA:{"^":"b:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
fn:{"^":"b:2;a",
$1:function(a){return this.a.$2(0,a)}},
fo:{"^":"b:11;a",
$2:function(a,b){this.a.$2(1,new H.aX(a,b))}},
fz:{"^":"b:12;a",
$2:function(a,b){this.a(a,b)}},
eC:{"^":"a;$ti",
ca:function(a,b){if(a==null)a=new P.b8()
if(this.a.a!==0)throw H.c(new P.T("Future already completed"))
$.j.toString
this.G(a,b)}},
fh:{"^":"eC;a,$ti",
c9:function(a,b){var z=this.a
if(z.a!==0)throw H.c(new P.T("Future already completed"))
z.ah(b)},
G:function(a,b){this.a.G(a,b)}},
cv:{"^":"a;a,b,c,d,e",
cC:function(a){if(this.c!==6)return!0
return this.b.b.aB(this.d,a.a)},
cm:function(a){var z,y
z=this.e
y=this.b.b
if(H.aa(z,{func:1,args:[,,]}))return y.cM(z,a.a,a.b)
else return y.aB(z,a.a)}},
w:{"^":"a;W:a<,b,bZ:c<,$ti",
aC:function(a,b){var z=$.j
if(z!==C.b){z.toString
if(b!=null)b=P.cG(b,z)}return this.ar(a,b)},
cO:function(a){return this.aC(a,null)},
ar:function(a,b){var z=new P.w(0,$.j,null,[null])
this.ae(new P.cv(null,z,b==null?1:3,a,b))
return z},
bk:function(a){var z,y
z=$.j
y=new P.w(0,z,null,this.$ti)
if(z!==C.b)z.toString
this.ae(new P.cv(null,y,8,a,null))
return y},
ae:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.ae(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.X(null,null,z,new P.eL(this,a))}},
aU:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.aU(a)
return}this.a=u
this.c=y.c}z.a=this.V(a)
y=this.b
y.toString
P.X(null,null,y,new P.eS(z,this))}},
an:function(){var z=this.c
this.c=null
return this.V(z)},
V:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
ah:function(a){var z,y
z=this.$ti
if(H.aL(a,"$isP",z,"$asP"))if(H.aL(a,"$isw",z,null))P.aI(a,this)
else P.cw(a,this)
else{y=this.an()
this.a=4
this.c=a
P.U(this,y)}},
G:[function(a,b){var z=this.an()
this.a=8
this.c=new P.ap(a,b)
P.U(this,z)},function(a){return this.G(a,null)},"cS","$2","$1","gbQ",2,2,5,0],
bJ:function(a){var z
if(H.aL(a,"$isP",this.$ti,"$asP")){this.bM(a)
return}this.a=1
z=this.b
z.toString
P.X(null,null,z,new P.eN(this,a))},
bM:function(a){var z
if(H.aL(a,"$isw",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.X(null,null,z,new P.eR(this,a))}else P.aI(a,this)
return}P.cw(a,this)},
bK:function(a,b){var z
this.a=1
z=this.b
z.toString
P.X(null,null,z,new P.eM(this,a,b))},
bF:function(a,b){this.a=4
this.c=a},
$isP:1,
k:{
cw:function(a,b){var z,y,x
b.a=1
try{a.aC(new P.eO(b),new P.eP(b))}catch(x){z=H.t(x)
y=H.q(x)
P.cW(new P.eQ(b,z,y))}},
aI:function(a,b){var z,y,x
for(;z=a.a,z===2;)a=a.c
y=b.c
if(z>=4){b.c=null
x=b.V(y)
b.a=a.a
b.c=a.c
P.U(b,x)}else{b.a=2
b.c=a
a.aU(y)}},
U:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.a7(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.U(z.a,b)}y=z.a
s=y.c
x.a=w
x.b=s
v=!w
if(v){u=b.c
u=(u&1)!==0||u===8}else u=!0
if(u){u=b.b
r=u.b
if(w){q=y.b
q.toString
q=q==null?r==null:q===r
if(!q)r.toString
else q=!0
q=!q}else q=!1
if(q){y=y.b
v=s.a
u=s.b
y.toString
P.a7(null,null,y,v,u)
return}p=$.j
if(p==null?r!=null:p!==r)$.j=r
else p=null
y=b.c
if(y===8)new P.eV(z,x,w,b).$0()
else if(v){if((y&1)!==0)new P.eU(x,b,s).$0()}else if((y&2)!==0)new P.eT(z,x,b).$0()
if(p!=null)$.j=p
y=x.b
if(!!J.l(y).$isP){if(y.a>=4){o=u.c
u.c=null
b=u.V(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.aI(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.V(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
eL:{"^":"b:0;a,b",
$0:function(){P.U(this.a,this.b)}},
eS:{"^":"b:0;a,b",
$0:function(){P.U(this.b,this.a.a)}},
eO:{"^":"b:2;a",
$1:function(a){var z=this.a
z.a=0
z.ah(a)}},
eP:{"^":"b:13;a",
$2:function(a,b){this.a.G(a,b)},
$1:function(a){return this.$2(a,null)}},
eQ:{"^":"b:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
eN:{"^":"b:0;a,b",
$0:function(){var z,y
z=this.a
y=z.an()
z.a=4
z.c=this.b
P.U(z,y)}},
eR:{"^":"b:0;a,b",
$0:function(){P.aI(this.b,this.a)}},
eM:{"^":"b:0;a,b,c",
$0:function(){this.a.G(this.b,this.c)}},
eV:{"^":"b:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.d
z=w.b.b.bf(w.d)}catch(v){y=H.t(v)
x=H.q(v)
if(this.c){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.ap(y,x)
u.a=!0
return}if(!!J.l(z).$isP){if(z instanceof P.w&&z.gW()>=4){if(z.gW()===8){w=this.b
w.b=z.gbZ()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.cO(new P.eW(t))
w.a=!1}}},
eW:{"^":"b:2;a",
$1:function(a){return this.a}},
eU:{"^":"b:1;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.aB(x.d,this.c)}catch(w){z=H.t(w)
y=H.q(w)
x=this.a
x.b=new P.ap(z,y)
x.a=!0}}},
eT:{"^":"b:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.cC(z)&&w.e!=null){v=this.b
v.b=w.cm(z)
v.a=!1}}catch(u){y=H.t(u)
x=H.q(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.ap(y,x)
s.a=!0}}},
cr:{"^":"a;a,b"},
ca:{"^":"a;$ti",
gj:function(a){var z,y
z={}
y=new P.w(0,$.j,null,[P.h])
z.a=0
this.az(new P.eg(z),!0,new P.eh(z,y),y.gbQ())
return y}},
eg:{"^":"b:2;a",
$1:function(a){++this.a.a}},
eh:{"^":"b:0;a,b",
$0:function(){this.b.ah(this.a.a)}},
ef:{"^":"a;"},
fc:{"^":"a;W:b<,$ti",
gbW:function(){if((this.b&8)===0)return this.a
return this.a.gad()},
bT:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.cB(null,null,0,this.$ti)
this.a=z}return z}y=this.a
y.gad()
return y.gad()},
gc1:function(){if((this.b&8)!==0)return this.a.gad()
return this.a},
T:function(){if((this.b&4)!==0)return new P.T("Cannot add event after closing")
return new P.T("Cannot add event while adding a stream")},
S:function(a){var z=this.b
if((z&1)!==0)this.ao(a)
else if((z&3)===0)this.bT().H(0,new P.cu(a,null,this.$ti))},
c0:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.T("Stream has already been listened to."))
z=$.j
y=d?1:0
x=new P.eD(this,null,null,null,z,y,null,null,this.$ti)
x.bD(a,b,c,d,H.x(this,0))
w=this.gbW()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sad(x)
v.aA()}else this.a=x
x.c_(w)
x.ak(new P.fe(this))
return x},
bX:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.a9()
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.t(v)
x=H.q(v)
u=new P.w(0,$.j,null,[null])
u.bK(y,x)
z=u}else z=z.bk(w)
w=new P.fd(this)
if(z!=null)z=z.bk(w)
else w.$0()
return z}},
fe:{"^":"b:0;a",
$0:function(){P.bk(this.a.d)}},
fd:{"^":"b:1;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.bJ(null)}},
eB:{"^":"a;$ti",
ao:function(a){this.gc1().bI(new P.cu(a,null,[H.x(this,0)]))}},
bf:{"^":"fc+eB;a,b,c,d,e,f,r,$ti"},
aG:{"^":"ff;a,$ti",
gp:function(a){return(H.F(this.a)^892482866)>>>0},
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.aG))return!1
return b.a===this.a}},
eD:{"^":"ct;x,a,b,c,d,e,f,r,$ti",
aP:function(){return this.x.bX(this)},
aR:[function(){var z=this.x
if((z.b&8)!==0)C.C.ac(z.a)
P.bk(z.e)},"$0","gaQ",0,0,1],
aT:[function(){var z=this.x
if((z.b&8)!==0)z.a.aA()
P.bk(z.f)},"$0","gaS",0,0,1]},
ct:{"^":"a;W:e<,$ti",
c_:function(a){if(a==null)return
this.r=a
if(a.c!=null){this.e=(this.e|64)>>>0
a.a5(this)}},
cE:function(a,b){var z,y,x
z=this.e
if((z&8)!==0)return
y=(z+128|4)>>>0
this.e=y
if(z<128&&this.r!=null){x=this.r
if(x.a===1)x.a=3}if((z&4)===0&&(y&32)===0)this.ak(this.gaQ())},
ac:function(a){return this.cE(a,null)},
aA:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128)if((z&64)!==0&&this.r.c!=null)this.r.a5(this)
else{z=(z&4294967291)>>>0
this.e=z
if((z&32)===0)this.ak(this.gaS())}}},
a9:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.bL()
z=this.f
return z==null?$.$get$bJ():z},
bL:function(){var z,y
z=(this.e|8)>>>0
this.e=z
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.aP()},
aR:[function(){},"$0","gaQ",0,0,1],
aT:[function(){},"$0","gaS",0,0,1],
aP:function(){return},
bI:function(a){var z,y
z=this.r
if(z==null){z=new P.cB(null,null,0,[H.Z(this,"ct",0)])
this.r=z}z.H(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.a5(this)}},
ao:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bh(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aI((z&4)!==0)},
ak:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aI((z&4)!==0)},
aI:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z=(z&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z=(z&4294967291)>>>0
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.r=null
return}x=(z&4)!==0
if(a===x)break
this.e=(z^32)>>>0
if(x)this.aR()
else this.aT()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.a5(this)},
bD:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.cG(b==null?P.fG():b,z)
this.c=c==null?P.fF():c}},
ff:{"^":"ca;$ti",
az:function(a,b,c,d){return this.a.c0(a,d,c,!0===b)},
ay:function(a){return this.az(a,null,null,null)}},
eE:{"^":"a;bd:a@"},
cu:{"^":"eE;b,a,$ti",
cF:function(a){a.ao(this.b)}},
f6:{"^":"a;W:a<",
a5:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cW(new P.f7(this,a))
this.a=1}},
f7:{"^":"b:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbd()
z.b=w
if(w==null)z.c=null
x.cF(this.b)}},
cB:{"^":"f6;b,c,a,$ti",
H:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbd(b)
this.c=b}}},
fg:{"^":"a;a,b,c,$ti"},
ap:{"^":"a;a,b",
i:function(a){return H.d(this.a)},
$isn:1},
fj:{"^":"a;"},
fu:{"^":"b:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.b8()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=y.i(0)
throw x}},
f8:{"^":"fj;",
cN:function(a){var z,y,x,w
try{if(C.b===$.j){x=a.$0()
return x}x=P.cH(null,null,this,a)
return x}catch(w){z=H.t(w)
y=H.q(w)
return P.a7(null,null,this,z,y)}},
bh:function(a,b){var z,y,x,w
try{if(C.b===$.j){x=a.$1(b)
return x}x=P.cI(null,null,this,a,b)
return x}catch(w){z=H.t(w)
y=H.q(w)
return P.a7(null,null,this,z,y)}},
au:function(a,b){if(b)return new P.f9(this,a)
else return new P.fa(this,a)},
b3:function(a,b){return new P.fb(this,a)},
h:function(a,b){return},
bf:function(a){if($.j===C.b)return a.$0()
return P.cH(null,null,this,a)},
aB:function(a,b){if($.j===C.b)return a.$1(b)
return P.cI(null,null,this,a,b)},
cM:function(a,b,c){if($.j===C.b)return a.$2(b,c)
return P.fw(null,null,this,a,b,c)}},
f9:{"^":"b:0;a,b",
$0:function(){return this.a.cN(this.b)}},
fa:{"^":"b:0;a,b",
$0:function(){return this.a.bf(this.b)}},
fb:{"^":"b:2;a,b",
$1:function(a){return this.a.bh(this.b,a)}}}],["","",,P,{"^":"",
dS:function(a,b){return new H.A(0,null,null,null,null,null,0,[a,b])},
dU:function(){return new H.A(0,null,null,null,null,null,0,[null,null])},
E:function(a){return H.fX(a,new H.A(0,null,null,null,null,null,0,[null,null]))},
dH:function(a,b,c){var z,y
if(P.bj(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$a8()
y.push(a)
try{P.fr(a,z)}finally{y.pop()}y=P.cb(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
at:function(a,b,c){var z,y,x
if(P.bj(a))return b+"..."+c
z=new P.bc(b)
y=$.$get$a8()
y.push(a)
try{x=z
x.n=P.cb(x.gn(),a,", ")}finally{y.pop()}y=z
y.n=y.gn()+c
y=z.gn()
return y.charCodeAt(0)==0?y:y},
bj:function(a){var z,y
for(z=0;y=$.$get$a8(),z<y.length;++z)if(a===y[z])return!0
return!1},
fr:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gv(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.l())return
w=H.d(z.gm())
b.push(w)
y+=w.length+2;++x}if(!z.l()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gm();++x
if(!z.l()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
u=b.pop()
y+=v.length+2}else{s=z.gm();++x
for(;z.l();t=s,s=r){r=z.gm();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
dR:function(a,b,c,d,e){return new H.A(0,null,null,null,null,null,0,[d,e])},
dT:function(a,b,c){var z=P.dR(null,null,null,b,c)
a.b6(0,new P.fL(z))
return z},
a3:function(a,b,c,d){return new P.f_(0,null,null,null,null,null,0,[d])},
e_:function(a){var z,y,x
z={}
if(P.bj(a))return"{...}"
y=new P.bc("")
try{$.$get$a8().push(a)
x=y
x.n=x.gn()+"{"
z.a=!0
a.b6(0,new P.e0(z,y))
z=y
z.n=z.gn()+"}"}finally{$.$get$a8().pop()}z=y.gn()
return z.charCodeAt(0)==0?z:z},
cz:{"^":"A;a,b,c,d,e,f,r,$ti",
Z:function(a){return H.hn(a)&0x3ffffff},
a_:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
k:{
a4:function(a,b){return new P.cz(0,null,null,null,null,null,0,[a,b])}}},
f_:{"^":"eX;a,b,c,d,e,f,r,$ti",
gv:function(a){var z=new P.cx(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
aa:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null)return!1
return z[b]!=null}else return this.bR(b)},
bR:function(a){var z=this.d
if(z==null)return!1
return this.a7(z[this.a6(a)],a)>=0},
ba:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.aa(0,a)?a:null
else return this.bV(a)},
bV:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.a6(a)]
x=this.a7(y,a)
if(x<0)return
return J.d1(y,x).gbS()},
H:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null){z=P.cy()
this.c=z}return this.bP(z,b)}else return this.C(b)},
C:function(a){var z,y,x
z=this.d
if(z==null){z=P.cy()
this.d=z}y=this.a6(a)
x=z[y]
if(x==null)z[y]=[this.ag(a)]
else{if(this.a7(x,a)>=0)return!1
x.push(this.ag(a))}return!0},
a0:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.aJ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aJ(this.c,b)
else return this.bY(b)},
bY:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.a6(a)]
x=this.a7(y,a)
if(x<0)return!1
this.aK(y.splice(x,1)[0])
return!0},
L:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bP:function(a,b){if(a[b]!=null)return!1
a[b]=this.ag(b)
return!0},
aJ:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.aK(z)
delete a[b]
return!0},
ag:function(a){var z,y
z=new P.f0(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
aK:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
a6:function(a){return J.am(a)&0x3ffffff},
a7:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a0(a[y].a,b))return y
return-1},
$isf:1,
$asf:null,
k:{
cy:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
f0:{"^":"a;bS:a<,b,c"},
cx:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.O(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
eX:{"^":"eb;$ti"},
fL:{"^":"b:6;a",
$2:function(a,b){this.a.w(0,a,b)}},
dV:{"^":"e3;$ti"},
e3:{"^":"a+ax;",$asi:null,$asf:null,$isi:1,$isf:1},
ax:{"^":"a;$ti",
gv:function(a){return new H.bS(a,this.gj(a),0,null)},
J:function(a,b){return this.h(a,b)},
bb:function(a,b){return new H.bY(a,b,[H.Z(a,"ax",0),null])},
i:function(a){return P.at(a,"[","]")},
$isi:1,
$asi:null,
$isf:1,
$asf:null},
fi:{"^":"a;"},
dY:{"^":"a;",
h:function(a,b){return this.a.h(0,b)},
gj:function(a){var z=this.a
return z.gj(z)},
i:function(a){return this.a.i(0)}},
es:{"^":"dY+fi;a,$ti"},
e0:{"^":"b:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.n+=", "
z.a=!1
z=this.b
y=z.n+=H.d(a)
z.n=y+": "
z.n+=H.d(b)}},
dW:{"^":"aw;a,b,c,d,$ti",
gv:function(a){return new P.f1(this,this.c,this.d,this.b,null)},
gab:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
J:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.m(P.aZ(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
L:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
i:function(a){return P.at(this,"{","}")},
be:function(){var z,y,x
z=this.b
if(z===this.c)throw H.c(H.bM());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
C:function(a){var z,y
z=this.a
y=this.c
z[y]=a
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.aO();++this.d},
aO:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.H(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.c.aD(y,0,w,z,x)
C.c.aD(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
bA:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.H(z,[b])},
$asf:null,
k:{
b2:function(a,b){var z=new P.dW(null,0,0,0,[b])
z.bA(a,b)
return z}}},
f1:{"^":"a;a,b,c,d,e",
gm:function(){return this.e},
l:function(){var z,y
z=this.a
if(this.c!==z.d)H.m(new P.O(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
ec:{"^":"a;$ti",
i:function(a){return P.at(this,"{","}")},
$isf:1,
$asf:null},
eb:{"^":"ec;$ti"}}],["","",,P,{"^":"",
bF:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.a1(a)
if(typeof a==="string")return JSON.stringify(a)
return P.dq(a)},
dq:function(a){var z=J.l(a)
if(!!z.$isb)return z.i(a)
return H.az(a)},
as:function(a){return new P.eK(a)},
dX:function(a,b,c,d){var z,y,x
z=J.dJ(a,d)
if(a!==0&&b!=null)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
bT:function(a,b,c){var z,y
z=H.H([],[c])
for(y=J.an(a);y.l();)z.push(y.gm())
return z},
br:function(a){H.ho(H.d(a))},
bl:{"^":"a;"},
"+bool":0,
L:{"^":"al;"},
"+double":0,
ac:{"^":"a;a",
a3:function(a,b){return new P.ac(C.a.a3(this.a,b.gaN()))},
K:function(a,b){return C.a.K(this.a,b.gaN())},
P:function(a,b){return C.a.P(this.a,b.gaN())},
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.ac))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.dn()
y=this.a
if(y<0)return"-"+new P.ac(0-y).i(0)
x=z.$1(C.a.D(y,6e7)%60)
w=z.$1(C.a.D(y,1e6)%60)
v=new P.dm().$1(y%1e6)
return""+C.a.D(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)}},
dm:{"^":"b:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
dn:{"^":"b:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
n:{"^":"a;"},
b8:{"^":"n;",
i:function(a){return"Throw of null."}},
M:{"^":"n;a,b,c,d",
gaj:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gai:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.d(z)
w=this.gaj()+y+x
if(!this.a)return w
v=this.gai()
u=P.bF(this.b)
return w+v+": "+H.d(u)},
k:{
aT:function(a){return new P.M(!1,null,null,a)},
aU:function(a,b,c){return new P.M(!0,a,b,c)}}},
ba:{"^":"M;e,f,a,b,c,d",
gaj:function(){return"RangeError"},
gai:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
k:{
e6:function(a){return new P.ba(null,null,!1,null,null,a)},
aA:function(a,b,c){return new P.ba(null,null,!0,a,b,"Value not in range")},
S:function(a,b,c,d,e){return new P.ba(b,c,!0,a,d,"Invalid value")},
bb:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.S(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.S(b,a,c,"end",f))
return b}}},
dx:{"^":"M;e,j:f>,a,b,c,d",
gaj:function(){return"RangeError"},
gai:function(){if(J.d0(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
k:{
aZ:function(a,b,c,d,e){var z=e!=null?e:J.ao(b)
return new P.dx(b,z,!0,a,c,"Index out of range")}}},
u:{"^":"n;a",
i:function(a){return"Unsupported operation: "+this.a}},
cq:{"^":"n;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
T:{"^":"n;a",
i:function(a){return"Bad state: "+this.a}},
O:{"^":"n;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.bF(z))+"."}},
c9:{"^":"a;",
i:function(a){return"Stack Overflow"},
$isn:1},
dj:{"^":"n;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
eK:{"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
dr:{"^":"a;a,bU",
i:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z,y
z=this.bU
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.m(P.aU(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.c5(b,"expando$values")
return y==null?null:H.c5(y,z)}},
h:{"^":"al;"},
"+int":0,
D:{"^":"a;$ti",
gj:function(a){var z,y
z=this.gv(this)
for(y=0;z.l();)++y
return y},
J:function(a,b){var z,y,x
if(b<0)H.m(P.S(b,0,null,"index",null))
for(z=this.gv(this),y=0;z.l();){x=z.gm()
if(b===y)return x;++y}throw H.c(P.aZ(b,this,"index",null,y))},
i:function(a){return P.dH(this,"(",")")}},
bN:{"^":"a;"},
i:{"^":"a;$ti",$asi:null,$isf:1,$asf:null},
"+List":0,
ay:{"^":"a;",
gp:function(a){return P.a.prototype.gp.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
al:{"^":"a;"},
"+num":0,
a:{"^":";",
q:function(a,b){return this===b},
gp:function(a){return H.F(this)},
i:function(a){return H.az(this)},
toString:function(){return this.i(this)}},
aD:{"^":"a;"},
B:{"^":"a;"},
"+String":0,
bc:{"^":"a;n<",
gj:function(a){return this.n.length},
i:function(a){var z=this.n
return z.charCodeAt(0)==0?z:z},
k:{
cb:function(a,b,c){var z=J.an(b)
if(!z.l())return a
if(c.length===0){do a+=H.d(z.gm())
while(z.l())}else{a+=H.d(z.gm())
for(;z.l();)a=a+c+H.d(z.gm())}return a}}}}],["","",,W,{"^":"",
di:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(b,c){return c.toUpperCase()})},
fA:function(a){var z=$.j
if(z===C.b)return a
return z.b3(a,!0)},
Q:{"^":"bE;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
hB:{"^":"Q;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
hD:{"^":"Q;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
hE:{"^":"Q;",$ise:1,"%":"HTMLBodyElement"},
dg:{"^":"dy;j:length=",
af:function(a,b){var z,y
z=$.$get$bx()
y=z[b]
if(typeof y==="string")return y
y=W.di(b) in a?b:P.dl()+b
z[b]=y
return y},
ap:function(a,b,c,d){a.setProperty(b,c,d)},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
dy:{"^":"e+dh;"},
dh:{"^":"a;"},
hF:{"^":"e;",
i:function(a){return String(a)},
"%":"DOMException"},
bE:{"^":"e2;",
i:function(a){return a.localName},
$ise:1,
"%":";Element"},
bG:{"^":"e;",
bH:function(a,b,c,d){return a.addEventListener(b,H.a9(c,1),!1)},
"%":"MediaStream;EventTarget"},
hX:{"^":"Q;j:length=","%":"HTMLFormElement"},
hZ:{"^":"Q;",$ise:1,"%":"HTMLInputElement"},
id:{"^":"e;",$ise:1,"%":"Navigator"},
e2:{"^":"bG;",
i:function(a){var z=a.nodeValue
return z==null?this.bx(a):z},
"%":"Document|HTMLDocument;Node"},
ih:{"^":"Q;j:length=","%":"HTMLSelectElement"},
ip:{"^":"bG;",$ise:1,"%":"DOMWindow|Window"},
iv:{"^":"Q;",$ise:1,"%":"HTMLFrameSetElement"},
eH:{"^":"ca;$ti",
az:function(a,b,c,d){return W.ah(this.a,this.b,a,!1,H.x(this,0))}},
it:{"^":"eH;a,b,c,$ti"},
eI:{"^":"ef;a,b,c,d,e,$ti",
c2:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.d2(x,this.c,z,!1)}},
bE:function(a,b,c,d,e){this.c2()},
k:{
ah:function(a,b,c,d,e){var z=W.fA(new W.eJ(c))
z=new W.eI(0,a,b,z,!1,[e])
z.bE(a,b,c,!1,e)
return z}}},
eJ:{"^":"b:2;a",
$1:function(a){return this.a.$1(a)}}}],["","",,P,{"^":"",
bD:function(){var z=$.bC
if(z==null){z=J.aS(window.navigator.userAgent,"Opera",0)
$.bC=z}return z},
dl:function(){var z,y
z=$.bz
if(z!=null)return z
y=$.bA
if(y==null){y=J.aS(window.navigator.userAgent,"Firefox",0)
$.bA=y}if(y)z="-moz-"
else{y=$.bB
if(y==null){y=!P.bD()&&J.aS(window.navigator.userAgent,"Trident/",0)
$.bB=y}if(y)z="-ms-"
else z=P.bD()?"-o-":"-webkit-"}$.bz=z
return z}}],["","",,P,{"^":""}],["","",,P,{"^":"",eZ:{"^":"a;",
cD:function(a){if(a<=0||a>4294967296)throw H.c(P.e6("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}}}],["","",,P,{"^":"",hA:{"^":"ad;",$ise:1,"%":"SVGAElement"},hC:{"^":"k;",$ise:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},hG:{"^":"k;",$ise:1,"%":"SVGFEBlendElement"},hH:{"^":"k;",$ise:1,"%":"SVGFEColorMatrixElement"},hI:{"^":"k;",$ise:1,"%":"SVGFEComponentTransferElement"},hJ:{"^":"k;",$ise:1,"%":"SVGFECompositeElement"},hK:{"^":"k;",$ise:1,"%":"SVGFEConvolveMatrixElement"},hL:{"^":"k;",$ise:1,"%":"SVGFEDiffuseLightingElement"},hM:{"^":"k;",$ise:1,"%":"SVGFEDisplacementMapElement"},hN:{"^":"k;",$ise:1,"%":"SVGFEFloodElement"},hO:{"^":"k;",$ise:1,"%":"SVGFEGaussianBlurElement"},hP:{"^":"k;",$ise:1,"%":"SVGFEImageElement"},hQ:{"^":"k;",$ise:1,"%":"SVGFEMergeElement"},hR:{"^":"k;",$ise:1,"%":"SVGFEMorphologyElement"},hS:{"^":"k;",$ise:1,"%":"SVGFEOffsetElement"},hT:{"^":"k;",$ise:1,"%":"SVGFESpecularLightingElement"},hU:{"^":"k;",$ise:1,"%":"SVGFETileElement"},hV:{"^":"k;",$ise:1,"%":"SVGFETurbulenceElement"},hW:{"^":"k;",$ise:1,"%":"SVGFilterElement"},ad:{"^":"k;",$ise:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},hY:{"^":"ad;",$ise:1,"%":"SVGImageElement"},i1:{"^":"k;",$ise:1,"%":"SVGMarkerElement"},i2:{"^":"k;",$ise:1,"%":"SVGMaskElement"},ie:{"^":"k;",$ise:1,"%":"SVGPatternElement"},ig:{"^":"k;",$ise:1,"%":"SVGScriptElement"},k:{"^":"bE;",$ise:1,"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},ij:{"^":"ad;",$ise:1,"%":"SVGSVGElement"},ik:{"^":"k;",$ise:1,"%":"SVGSymbolElement"},ei:{"^":"ad;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},il:{"^":"ei;",$ise:1,"%":"SVGTextPathElement"},im:{"^":"ad;",$ise:1,"%":"SVGUseElement"},io:{"^":"k;",$ise:1,"%":"SVGViewElement"},iu:{"^":"k;",$ise:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},iw:{"^":"k;",$ise:1,"%":"SVGCursorElement"},ix:{"^":"k;",$ise:1,"%":"SVGFEDropShadowElement"},iy:{"^":"k;",$ise:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,A,{"^":"",ab:{"^":"dV;a,b,c,$ti",
gj:function(a){return this.c.length},
h:function(a,b){return this.c[b]},
b0:function(a,b,c){var z
if(a<b)z=a+c
else z=a>=c?a-c:a
return z},
u:function(a,b,c,d){var z,y,x
if(c){z=this.a
if(a<0)y=a+z
else y=a>=z?a-z:a
z=this.b
if(b<0)x=b+z
else x=b>=z?b-z:b}else{if(a<0||a>this.a-1||b<0||b>this.b-1)return d
x=b
y=a}return this.c[y+x*this.a]},
a4:function(a,b){return this.u(a,b,null,null)},
R:function(a,b,c,d){var z,y
if(d){z=this.b0(a,0,this.a)
y=this.b0(b,0,this.b)}else{if(a<0||a>this.a-1||b<0||b>this.b-1)return
y=b
z=a}this.c[z+y*this.a]=c},
c4:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
y=this.b
x=A.ar(z,y,!1,P.bl)
for(w=0;w<y;w=u)for(v=w-1,u=w+1,t=0;t<z;++t)if(C.c.aa(a,this.u(t,w,b,null)))for(s=t-1,r=t+1,q=v;q<=u;++q)for(p=s;p<=r;++p)x.R(p,q,!0,b)
return x},
c3:function(a,b){return this.c4(a,b,null)},
$isi:1,
k:{
ar:function(a,b,c,d){var z,y,x
z=a*b
y=P.dX(z,c,!1,d)
if(a===0)return new A.ab(0,b,[],[null])
x=a>0&&!0
z=x?C.a.bz(z,a):0
return new A.ab(a,z,y,[null])}}}}],["","",,Y,{"^":"",du:{"^":"a;a,b,c,d,e,f",k:{
dv:function(a,b,c,d,e){var z=new H.et(e,new Y.dw(),[H.x(e,0)])
return new Y.du(a,b,c,d,e,z.gj(z))}}},dw:{"^":"b:2;",
$1:function(a){return a}}}],["","",,S,{"^":"",d7:{"^":"a;"}}],["","",,K,{"^":"",v:{"^":"a;a,b",
i:function(a){return this.b}},e1:{"^":"d7;a,b,c,$ti",
bm:function(a,b){var z,y,x,w,v,u,t,s
z=A.ar(a,b,null,H.x(this,0))
y=-C.j.N(a/2)
x=-C.j.N(b/2)
for(w=this.c,v=this.b,u=0;u<a;++u)for(t=u+y,s=0;s<b;++s)z.R(u,s,$.$get$bZ().h(0,this.a).$2(t,(s+x)*-1)?v:w,!0)
return z}},fI:{"^":"b:3;",
$2:function(a,b){return C.y.cD(2)===0}},fJ:{"^":"b:3;",
$2:function(a,b){return Math.cos(a*10)>Math.sin(b*10)}},fM:{"^":"b:3;",
$2:function(a,b){return b===0||C.a.E(a,b)===0}},fN:{"^":"b:3;",
$2:function(a,b){return b>0&&(C.a.E(a,b)&(a^b))>>>0>2}},fO:{"^":"b:3;",
$2:function(a,b){return C.a.E((a^b)>>>0,8)===0}},fP:{"^":"b:3;",
$2:function(a,b){return C.r.E(Math.abs((a^b)>>>0),8)<4}},fQ:{"^":"b:3;",
$2:function(a,b){return(a^b)>>>0>~a>>>0&&b<=0}},fR:{"^":"b:3;",
$2:function(a,b){return((a^b)>>>0)+a>=0}},fS:{"^":"b:3;",
$2:function(a,b){return((a^b)>>>0)+a-b===0}},fT:{"^":"b:3;",
$2:function(a,b){return C.a.E(((a^b)>>>0)+a-b,1024)===0}},fK:{"^":"b:3;",
$2:function(a,b){var z=((a^b)>>>0)+b-a
return z===0||z%b===0}}}],["","",,T,{"^":"",aC:{"^":"a;a,b",
i:function(a){return this.b}},b9:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch",
aw:function(a,b){var z=0,y=P.df(),x=this,w
var $async$aw=P.fy(function(c,d){if(c===1)return P.fk(d,y)
while(true)switch(z){case 0:x.d=a
w=U.hv(a,null)
x.b=w
x.c=w.ay(new T.e5(x))
return P.fl(null,y)}})
return P.fm($async$aw,y)},
aZ:function(){var z,y,x,w,v
z=this.a
z.c6()
y=this.Q
x=z.at(!0,this.z)
if(y.b>=4)H.m(y.T())
y.S(x)
y=Date.now()
x=this.r
if(x!=null){w=y-x
if(w>0)this.f=(this.f+1/(w/1000))/2}this.r=y
y=z.a
x=y.length===0?0:z.t(0).a
if(C.a.E(x,C.j.N(2000/C.a.D(this.e.a,1000)))===0){x=$.$get$aK()
x.M(C.m,"Gen: "+(y.length===0?0:z.t(0).a)+" | Activity: "+z.gb1()+"% | FPS: "+C.r.N(this.f)+"/"+C.j.N(1000/C.a.D(this.d.a,1000)),null,null)}if(C.a.E(y.length===0?0:z.t(0).a,20)===0)if(z.gcu()){++this.x
v=z.gb1()
if(v>=5)z=v<10&&this.x>5||this.x>8
else z=!0
if(z){z=this.ch
if(z.b>=4)H.m(z.T())
z.S(C.W)}$.$get$aK().M(C.m,"Stable scene counter: x"+this.x+" World activity: "+v+"%",null,null)}else this.x=0}},e5:{"^":"b:14;a",
$1:function(a){return this.a.aZ()}}}],["","",,E,{"^":"",d8:{"^":"a;"}}],["","",,G,{"^":"",bv:{"^":"a;a,b",
i:function(a){return this.b}},da:{"^":"d8;a,b,c,d,e,f,r",
cL:function(a){var z,y,x,w,v,u,t
for(z=a.a,y=a.b,x=0;x<z;++x)for(w=0;w<y;++w){if(a.a4(x,w)==null)continue
v=this.f
v.fillStyle=a.a4(x,w)
u=this.c
t=this.d
v.fillRect(x*u,w*t,u,t)}}}}],["","",,B,{"^":"",d9:{"^":"a;"}}],["","",,X,{"^":"",I:{"^":"a;a,b",
i:function(a){return this.b}},ds:{"^":"d9;d,a,b,c",
c8:function(a,b,c){var z,y,x,w,v,u,t,s
z=c.a4(a,b)
y=this.a
x=this.b
switch("moore"){case"moore":default:w=a-1
v=b-1
u=a+1
t=b+1}s=C.c.cl([c.u(w,v,y,x),c.u(a,v,y,x),c.u(u,v,y,x),c.u(w,b,y,x),c.u(u,b,y,x),c.u(w,t,y,x),c.u(a,t,y,x),c.u(u,t,y,x)],0,new X.dt(this))
switch(z){case C.i:case C.e:y=J.cO(s)
if(y.K(s,2))return C.k
if(C.c.aa([2,3],s))return C.i
if(y.P(s,3))return C.l
break
case C.h:case C.k:case C.l:if(J.a0(s,3))return C.e
break}return z}},dt:{"^":"b:15;a",
$2:function(a,b){return J.d_(a,this.a.d.h(0,b))}}}],["","",,L,{"^":"",ed:{"^":"a;a,b,c,d,e,$ti",
gcu:function(){var z,y,x,w,v
z=C.L.gcj()
y=this.a
if(y.length>2)if(z.$2(this.t(0).e,this.t(1).e)&&z.$2(this.t(0).e,this.t(2).e))return!0
if(y.length>60)for(x=1;x<=30;++x){v=0
while(!0){if(!(v<2)){w=!0
break}if(this.t(v).f!==this.t(v+x*v).f){w=!1
break}++v}if(w){$.$get$cD().M(C.m,"Stable scene detected! Repeating pattern "+x,null,null)
return!0}}return!1},
gb1:function(){if(this.a.length===0)return 100
if(this.t(0).f===0)return 0
return C.j.N(this.t(0).f/(this.c*this.d)*100)},
t:function(a){var z,y
z=this.a
y=z.length-1
if(y<a)return
return z[y-a]},
O:function(){return this.t(0)},
at:function(a,b){var z,y,x,w,v,u,t,s
z=this.c
y=this.d
x=A.ar(z,y,null,null)
for(w=this.e,v=this.a,u=0;u<z;++u)for(t=0;t<y;++t){s=this.O().d.u(u,t,w.a,w.b)
if(v.length>1&&a&&J.a0(s,this.t(1).d.u(u,t,w.a,w.b)))continue
x.R(u,t,b.h(0,s),w.a)}return x},
bc:function(a){var z,y
z=this.O()
z=z==null?z:z.a
if(z==null)z=0
y=this.a
y.push(Y.dv(z+1,this.c,this.d,a,a.c3([C.e,C.i],this.e.a)))
if(y.length>this.b)C.c.cK(y,0,1)
return},
c7:function(a){var z,y,x,w,v,u
z=this.c
y=this.d
x=A.ar(z,y,null,H.x(this,0))
for(w=this.e,v=0;v<z;++v)for(u=0;u<y;++u)if(this.O().e.a4(v,u))x.R(v,u,w.c8(v,u,this.O().d),w.a)
else x.R(v,u,this.O().d.u(v,u,w.a,null),w.a)
this.bc(x)},
c6:function(){return this.c7(null)}}}],["","",,U,{"^":"",
hv:function(a,b){var z,y,x,w,v
z={}
z.a=null
z.b=null
z.c=0
y=new U.hw(z,a,new U.hy(z,b))
x=new U.hx(z)
w=P.h
v=new P.bf(null,0,null,y,x,y,x,[w])
z.a=v
return new P.aG(v,[w])},
hy:{"^":"b:16;a,b",
$1:function(a){var z,y
z=this.a
y=++z.c
z=z.a
if(z.b>=4)H.m(z.T())
z.S(y)}},
hw:{"^":"b:1;a,b,c",
$0:function(){this.a.b=P.ep(this.b,this.c)}},
hx:{"^":"b:1;a",
$0:function(){var z,y
z=this.a
y=z.b
if(y!=null){y.a9()
z.b=null}}}}],["","",,U,{"^":"",dk:{"^":"a;$ti"},bR:{"^":"a;a,$ti",
cT:[function(a,b){var z,y,x,w
if(a===b)return!0
z=a.c
y=z.length
x=b.c
if(y!==x.length)return!1
for(w=0;w<y;++w)if(!J.a0(z[w],x[w]))return!1
return!0},"$2","gcj",4,0,function(){return H.fU(function(a){return{func:1,ret:P.bl,args:[[P.i,a],[P.i,a]]}},this.$receiver,"bR")}]}}],["","",,N,{"^":"",b3:{"^":"a;a,b,c,d,e,f",
gb7:function(){var z,y,x
z=this.b
y=z==null||z.a===""
x=this.a
return y?x:z.gb7()+"."+x},
gb9:function(){if($.cR){var z=this.b
if(z!=null)return z.gb9()}return $.fv},
cB:function(a,b,c,d,e){var z,y,x,w,v,u
x=a.b
if(x>=this.gb9().b){if(!!J.l(b).$isaY)b=b.$0()
w=b
if(typeof w!=="string")b=J.a1(b)
if(d==null&&x>=$.hp.b)try{x="autogenerated stack trace for "+a.i(0)+" "+H.d(b)
throw H.c(x)}catch(v){z=H.t(v)
y=H.q(v)
d=y
if(c==null)c=z}this.gb7()
Date.now()
$.bU=$.bU+1
if($.cR)for(u=this;u!=null;)u=u.b
else $.$get$bW().f}},
M:function(a,b,c,d){return this.cB(a,b,c,d,null)},
k:{
R:function(a){return $.$get$bV().cH(a,new N.fH(a))}}},fH:{"^":"b:0;a",
$0:function(){var z,y,x,w
z=this.a
if(C.f.bv(z,"."))H.m(P.aT("name shouldn't start with a '.'"))
y=C.f.cz(z,".")
if(y===-1)x=z!==""?N.R(""):null
else{x=N.R(C.f.aF(z,0,y))
z=C.f.aE(z,y+1)}w=new H.A(0,null,null,null,null,null,0,[P.B,N.b3])
w=new N.b3(z,x,null,w,new P.es(w,[null,null]),null)
if(x!=null)x.d.w(0,z,w)
return w}},av:{"^":"a;a,b",
q:function(a,b){if(b==null)return!1
return b instanceof N.av&&this.b===b.b},
K:function(a,b){return C.a.K(this.b,b.gcR(b))},
P:function(a,b){return C.a.P(this.b,b.gcR(b))},
gp:function(a){return this.b},
i:function(a){return this.a}}}],["","",,K,{"^":"",
iE:[function(){var z,y,x,w,v,u
z={}
z.a=null
new K.hk(z,new K.hi()).$0()
y=document
x=y.querySelector("#controls_back")
w=y.querySelector("#controls_pause")
v=y.querySelector("#controls_play")
u=y.querySelector("#controls_forward")
w.toString
y=W.i3
W.ah(w,"click",new K.he(z),!1,y)
v.toString
W.ah(v,"click",new K.hf(z),!1,y)
x.toString
W.ah(x,"click",new K.hg(z),!1,y)
u.toString
W.ah(u,"click",new K.hh(z),!1,y)},"$0","cX",0,0,1],
hi:{"^":"b:17;",
$0:function(){var z,y,x,w,v,u,t
z=X.I
y=P.dT(P.E([C.h,"#000",C.k,"#483D8B",C.l,"#00008B",C.i,"#FF69B4",C.e,"#FFC0CB"]),z,P.B)
x=new X.ds(P.E([C.i,1,C.e,1,C.h,0,C.k,0,C.l,0]),null,null,null)
w=new L.ed([],62,64,64,x,[z])
x.a=!0
x.b=C.h
$.$get$cE().M(C.n,"Generator: MathematicalGenerators.RANDOM",null,null)
x=A.ab
v=new P.bf(null,0,null,null,null,null,null,[x])
$.$get$aK().M(C.n,"Max Age: null",null,null)
w.bc(new K.e1(C.v,C.e,C.h,[z]).bm(64,64))
z=w.at(!0,y)
if(v.b>=4)H.m(v.T())
v.S(z)
u=new G.da(64,64,null,null,null,null,null)
t=document.querySelector("#canvas")
$.$get$cF().M(C.n,"Canvas: 64x64 (512x512px)",null,null)
u.r=!1
t.width=64
t.height=64
u.e=t
u.c=1
u.d=1
u.f=t.getContext("2d")
switch(C.p){case C.p:z=t.style
C.d.ap(z,(z&&C.d).af(z,"image-rendering"),"pixelated","")
C.d.ap(z,C.d.af(z,"image-rendering"),"optimizespeed","")
z.width="512px"
z.height="512px"
break
case C.z:z=t.style
C.d.ap(z,(z&&C.d).af(z,"image-rendering"),"pixelated","")
z.width="100%"
z.height="100%"
z.position="fixed"
z.top="0px"
z.left="0px"
z.right="0px"
z.bottom="0px"
break}new P.aG(v,[x]).ay(new K.hj(u))
return new T.b9(w,null,null,null,C.A,0,null,0,null,y,v,new P.bf(null,0,null,null,null,null,null,[T.aC]))}},
hj:{"^":"b:18;a",
$1:function(a){this.a.cL(a)}},
hk:{"^":"b:1;a,b",
$0:function(){var z,y,x
z=this.b.$0()
y=this.a
y.a=z
z.aw(z.e,null)
x=y.a.ch
new P.aG(x,[H.x(x,0)]).ay(new K.hl(y,this))}},
hl:{"^":"b:19;a,b",
$1:function(a){var z=this.a.a.c
if(z!=null)z.a9()
this.b.$0()}},
he:{"^":"b:2;a",
$1:function(a){var z=this.a.a.c
return z.e<128?z.ac(0):null}},
hf:{"^":"b:2;a",
$1:function(a){var z=this.a.a.c
return z.e>=128?z.aA():null}},
hg:{"^":"b:2;a",
$1:function(a){var z,y,x
z=this.a.a
y=z.c
if(y.e<128)y.ac(0)
y=z.a
x=y.a
if(x.length>1)x.pop()
x=z.Q
z=y.at(!1,z.z)
if(x.b>=4)H.m(x.T())
x.S(z)
return}},
hh:{"^":"b:2;a",
$1:function(a){var z,y
z=this.a.a
y=z.c
if(y.e<128)y.ac(0)
z.aZ()
return}}},1]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bP.prototype
return J.bO.prototype}if(typeof a=="string")return J.au.prototype
if(a==null)return J.bQ.prototype
if(typeof a=="boolean")return J.dK.prototype
if(a.constructor==Array)return J.ae.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ag.prototype
return a}if(a instanceof P.a)return a
return J.aN(a)}
J.G=function(a){if(typeof a=="string")return J.au.prototype
if(a==null)return a
if(a.constructor==Array)return J.ae.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ag.prototype
return a}if(a instanceof P.a)return a
return J.aN(a)}
J.bn=function(a){if(a==null)return a
if(a.constructor==Array)return J.ae.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ag.prototype
return a}if(a instanceof P.a)return a
return J.aN(a)}
J.cO=function(a){if(typeof a=="number")return J.af.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.aF.prototype
return a}
J.fY=function(a){if(typeof a=="number")return J.af.prototype
if(typeof a=="string")return J.au.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.aF.prototype
return a}
J.fZ=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ag.prototype
return a}if(a instanceof P.a)return a
return J.aN(a)}
J.d_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.fY(a).a3(a,b)}
J.a0=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).q(a,b)}
J.d0=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cO(a).K(a,b)}
J.d1=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.hc(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.G(a).h(a,b)}
J.d2=function(a,b,c,d){return J.fZ(a).bH(a,b,c,d)}
J.aS=function(a,b,c){return J.G(a).cb(a,b,c)}
J.d3=function(a,b){return J.bn(a).J(a,b)}
J.am=function(a){return J.l(a).gp(a)}
J.an=function(a){return J.bn(a).gv(a)}
J.ao=function(a){return J.G(a).gj(a)}
J.d4=function(a,b){return J.bn(a).bb(a,b)}
J.a1=function(a){return J.l(a).i(a)}
var $=I.p
C.d=W.dg.prototype
C.B=J.e.prototype
C.c=J.ae.prototype
C.j=J.bO.prototype
C.a=J.bP.prototype
C.C=J.bQ.prototype
C.r=J.af.prototype
C.f=J.au.prototype
C.J=J.ag.prototype
C.w=J.e4.prototype
C.o=J.aF.prototype
C.y=new P.eZ()
C.b=new P.f8()
C.z=new G.bv(0,"CanvasDisplayMode.FULLSCREEN")
C.p=new G.bv(1,"CanvasDisplayMode.FIXED")
C.q=new P.ac(0)
C.A=new P.ac(5e4)
C.h=new X.I(0,"GameOfLifeStates.DEAD")
C.i=new X.I(1,"GameOfLifeStates.ALIVE")
C.k=new X.I(2,"GameOfLifeStates.DEAD_UNDER_POPULATED")
C.l=new X.I(3,"GameOfLifeStates.DEAD_OVER_POPULATED")
C.e=new X.I(4,"GameOfLifeStates.ALIVE_BORN")
C.D=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.E=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.t=function(hooks) { return hooks; }

C.F=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.G=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.H=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.I=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.u=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.n=new N.av("FINE",500)
C.m=new N.av("INFO",800)
C.K=new N.av("OFF",2000)
C.x=new U.dk([null])
C.L=new U.bR(C.x,[null])
C.v=new K.v(0,"MathematicalGenerators.RANDOM")
C.M=new K.v(1,"MathematicalGenerators.CELLS")
C.N=new K.v(10,"MathematicalGenerators.SIERPINSKI_MOUNTAINS")
C.O=new K.v(2,"MathematicalGenerators.X_MOD_Y")
C.P=new K.v(3,"MathematicalGenerators.ARCS")
C.Q=new K.v(4,"MathematicalGenerators.DIAGONAL_STRIPES")
C.R=new K.v(5,"MathematicalGenerators.BLOCKS")
C.S=new K.v(6,"MathematicalGenerators.BLOCKS2")
C.T=new K.v(7,"MathematicalGenerators.CHESS")
C.U=new K.v(8,"MathematicalGenerators.ENDLESS_SIERPINSKI")
C.V=new K.v(9,"MathematicalGenerators.SIERPINSKI_LEVEL10")
C.W=new T.aC(0,"SimulationCompleteReason.stable")
$.c6="$cachedFunction"
$.c7="$cachedInvocation"
$.y=0
$.a2=null
$.bt=null
$.bo=null
$.cK=null
$.cV=null
$.aM=null
$.aP=null
$.bp=null
$.W=null
$.a5=null
$.a6=null
$.bi=!1
$.j=C.b
$.bH=0
$.bC=null
$.bB=null
$.bA=null
$.bz=null
$.cR=!1
$.hp=C.K
$.fv=C.m
$.bU=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["by","$get$by",function(){return H.cP("_$dart_dartClosure")},"b_","$get$b_",function(){return H.cP("_$dart_js")},"bK","$get$bK",function(){return H.dF()},"bL","$get$bL",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.bH
$.bH=z+1
z="expando$key$"+z}return new P.dr(null,z)},"cf","$get$cf",function(){return H.C(H.aE({
toString:function(){return"$receiver$"}}))},"cg","$get$cg",function(){return H.C(H.aE({$method$:null,
toString:function(){return"$receiver$"}}))},"ch","$get$ch",function(){return H.C(H.aE(null))},"ci","$get$ci",function(){return H.C(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cm","$get$cm",function(){return H.C(H.aE(void 0))},"cn","$get$cn",function(){return H.C(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ck","$get$ck",function(){return H.C(H.cl(null))},"cj","$get$cj",function(){return H.C(function(){try{null.$method$}catch(z){return z.message}}())},"cp","$get$cp",function(){return H.C(H.cl(void 0))},"co","$get$co",function(){return H.C(function(){try{(void 0).$method$}catch(z){return z.message}}())},"be","$get$be",function(){return P.ew()},"bJ","$get$bJ",function(){var z,y
z=P.ay
y=new P.w(0,P.ev(),null,[z])
y.bF(null,z)
return y},"a8","$get$a8",function(){return[]},"bx","$get$bx",function(){return{}},"cE","$get$cE",function(){return N.R("cellular_automata.generators.mathematical")},"bZ","$get$bZ",function(){return P.E([C.v,new K.fI(),C.M,new K.fJ(),C.O,new K.fM(),C.P,new K.fN(),C.Q,new K.fO(),C.T,new K.fP(),C.R,new K.fQ(),C.S,new K.fR(),C.U,new K.fS(),C.V,new K.fT(),C.N,new K.fK()])},"aK","$get$aK",function(){return N.R("cellular_automata.player")},"cF","$get$cF",function(){return N.R("cellular_automata.renderers.canvas")},"cD","$get$cD",function(){return N.R("cellular_automata.simulator")},"bW","$get$bW",function(){return N.R("")},"bV","$get$bV",function(){return P.dS(P.B,N.b3)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,args:[P.h,P.h]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.a],opt:[P.aD]},{func:1,args:[,,]},{func:1,ret:P.B,args:[P.h]},{func:1,args:[,P.B]},{func:1,args:[P.B]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,P.aD]},{func:1,args:[P.h,,]},{func:1,args:[,],opt:[,]},{func:1,args:[P.h]},{func:1,args:[,X.I]},{func:1,v:true,args:[,]},{func:1,ret:T.b9},{func:1,args:[A.ab]},{func:1,args:[T.aC]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.hu(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.p=a.p
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.cY(K.cX(),b)},[])
else (function(b){H.cY(K.cX(),b)})([])})})()