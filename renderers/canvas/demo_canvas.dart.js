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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bi"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bi"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bi(this,c,d,true,[],f).prototype
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
var dart=[["","",,H,{"^":"",hT:{"^":"a;a"}}],["","",,J,{"^":"",
l:function(a){return void 0},
aL:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
aI:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.bl==null){H.h_()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(new P.cm("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$aV()]
if(v!=null)return v
v=H.h8(a)
if(v!=null)return v
if(typeof a=="function")return C.I
y=Object.getPrototypeOf(a)
if(y==null)return C.w
if(y===Object.prototype)return C.w
if(typeof w=="function"){Object.defineProperty(w,$.$get$aV(),{value:C.o,enumerable:false,writable:true,configurable:true})
return C.o}return C.o},
e:{"^":"a;",
q:function(a,b){return a===b},
gp:function(a){return H.E(a)},
i:["bu",function(a){return H.ax(a)}],
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|Blob|BlobEvent|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DOMError|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ErrorEvent|Event|ExtendableEvent|ExtendableMessageEvent|FetchEvent|File|FileError|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InputEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaError|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NavigatorUserMediaError|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PositionError|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SQLError|SVGAnimatedLength|SVGAnimatedNumberList|SVGAnimatedString|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent"},
dH:{"^":"e;",
i:function(a){return String(a)},
gp:function(a){return a?519018:218159},
$isbh:1},
bL:{"^":"e;",
q:function(a,b){return null==b},
i:function(a){return"null"},
gp:function(a){return 0}},
aW:{"^":"e;",
gp:function(a){return 0},
i:["bv",function(a){return String(a)}],
$isdI:1},
e1:{"^":"aW;"},
aC:{"^":"aW;"},
af:{"^":"aW;",
i:function(a){var z=a[$.$get$bu()]
return z==null?this.bv(a):J.Z(z)},
$isaT:1,
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
ad:{"^":"e;$ti",
b2:function(a,b){if(!!a.immutable$list)throw H.c(new P.r(b))},
b1:function(a,b){if(!!a.fixed$length)throw H.c(new P.r(b))},
b9:function(a,b){return new H.bT(a,b,[H.B(a,0),null])},
cc:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.c(new P.N(a))}return y},
I:function(a,b){return a[b]},
gcb:function(a){if(a.length>0)return a[0]
throw H.c(H.bH())},
cC:function(a,b,c){this.b1(a,"removeRange")
P.b6(b,c,a.length,null,null,null)
a.splice(b,c-b)},
az:function(a,b,c,d,e){var z,y
this.b2(a,"setRange")
P.b6(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.c(H.dF())
if(e<b)for(y=z-1;y>=0;--y)a[b+y]=d[e+y]
else for(y=0;y<z;++y)a[b+y]=d[e+y]},
a9:function(a,b){var z
for(z=0;z<a.length;++z)if(J.Y(a[z],b))return!0
return!1},
i:function(a){return P.as(a,"[","]")},
gv:function(a){return new J.d1(a,a.length,0,null)},
gp:function(a){return H.E(a)},
gj:function(a){return a.length},
sj:function(a,b){this.b1(a,"set length")
if(b<0)throw H.c(P.Q(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.o(a,b))
if(b>=a.length||b<0)throw H.c(H.o(a,b))
return a[b]},
w:function(a,b,c){this.b2(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.c(H.o(a,b))
if(b>=a.length||b<0)throw H.c(H.o(a,b))
a[b]=c},
$isx:1,
$asx:I.p,
$isi:1,
$asi:null,
$isf:1,
$asf:null,
k:{
dG:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.c(P.aP(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.c(P.Q(a,0,4294967295,"length",null))
z=H.G(new Array(a),[b])
z.fixed$length=Array
return z}}},
hS:{"^":"ad;$ti"},
d1:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.hl(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ae:{"^":"e;",
N:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.c(new P.r(""+a+".round()"))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gp:function(a){return a&0x1FFFFFFF},
a3:function(a,b){if(typeof b!=="number")throw H.c(H.aj(b))
return a+b},
E:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
bw:function(a,b){if((a|0)===a)if(b>=1||!1)return a/b|0
return this.aV(a,b)},
D:function(a,b){return(a|0)===a?a/b|0:this.aV(a,b)},
aV:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(new P.r("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
aU:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
J:function(a,b){if(typeof b!=="number")throw H.c(H.aj(b))
return a<b},
P:function(a,b){if(typeof b!=="number")throw H.c(H.aj(b))
return a>b},
$isak:1},
bK:{"^":"ae;",$isak:1,$ish:1},
bJ:{"^":"ae;",$isak:1},
at:{"^":"e;",
bG:function(a,b){if(b>=a.length)throw H.c(H.o(a,b))
return a.charCodeAt(b)},
a3:function(a,b){if(typeof b!=="string")throw H.c(P.aP(b,null,null))
return a+b},
bt:function(a,b,c){var z
if(c>a.length)throw H.c(P.Q(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
bs:function(a,b){return this.bt(a,b,0)},
aB:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.c(P.ay(b,null,null))
if(b>c)throw H.c(P.ay(b,null,null))
if(c>a.length)throw H.c(P.ay(c,null,null))
return a.substring(b,c)},
aA:function(a,b){return this.aB(a,b,null)},
cq:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
cp:function(a,b){return this.cq(a,b,null)},
c3:function(a,b,c){if(c>a.length)throw H.c(P.Q(c,0,a.length,null,null))
return H.hk(a,b,c)},
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
$isx:1,
$asx:I.p,
$isz:1}}],["","",,H,{"^":"",
bH:function(){return new P.R("No element")},
dF:function(){return new P.R("Too few elements")},
f:{"^":"C;$ti",$asf:null},
av:{"^":"f;$ti",
gv:function(a){return new H.bN(this,this.gj(this),0,null)},
cI:function(a,b){var z,y
z=H.G([],[H.W(this,"av",0)])
C.c.sj(z,this.gj(this))
for(y=0;y<this.gj(this);++y)z[y]=this.I(0,y)
return z},
cH:function(a){return this.cI(a,!0)}},
bN:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z,y,x,w
z=this.a
y=J.F(z)
x=y.gj(z)
if(this.b!==x)throw H.c(new P.N(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.I(z,w);++this.c
return!0}},
bS:{"^":"C;a,b,$ti",
gv:function(a){return new H.dW(null,J.am(this.a),this.b,this.$ti)},
gj:function(a){return J.an(this.a)},
$asC:function(a,b){return[b]},
k:{
b_:function(a,b,c,d){if(!!a.$isf)return new H.dl(a,b,[c,d])
return new H.bS(a,b,[c,d])}}},
dl:{"^":"bS;a,b,$ti",$isf:1,
$asf:function(a,b){return[b]}},
dW:{"^":"bI;a,b,c,$ti",
l:function(){var z=this.b
if(z.l()){this.a=this.c.$1(z.gm())
return!0}this.a=null
return!1},
gm:function(){return this.a}},
bT:{"^":"av;a,b,$ti",
gj:function(a){return J.an(this.a)},
I:function(a,b){return this.b.$1(J.d_(this.a,b))},
$asav:function(a,b){return[b]},
$asf:function(a,b){return[b]},
$asC:function(a,b){return[b]}},
er:{"^":"C;a,b,$ti",
gv:function(a){return new H.es(J.am(this.a),this.b,this.$ti)}},
es:{"^":"bI;a,b,$ti",
l:function(){var z,y
for(z=this.a,y=this.b;z.l();)if(y.$1(z.gm()))return!0
return!1},
gm:function(){return this.a.gm()}},
bE:{"^":"a;$ti"}}],["","",,H,{"^":"",
ai:function(a,b){var z=a.Y(b)
if(!init.globalState.d.cy)init.globalState.f.a1()
return z},
cU:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.l(y).$isi)throw H.c(P.aO("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.f_(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$bF()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.eC(P.aY(null,H.ah),0)
x=P.h
y.z=new H.y(0,null,null,null,null,null,0,[x,H.bc])
y.ch=new H.y(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.eZ()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.dy,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.f0)}if(init.globalState.x)return
y=init.globalState.a++
w=P.a0(null,null,null,x)
v=new H.az(0,null,!1)
u=new H.bc(y,new H.y(0,null,null,null,null,null,0,[x,H.az]),w,init.createNewIsolate(),v,new H.M(H.aM()),new H.M(H.aM()),!1,!1,[],P.a0(null,null,null,null),null,null,!1,!0,P.a0(null,null,null,null))
w.G(0,0)
u.aE(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.a8(a,{func:1,args:[,]}))u.Y(new H.hi(z,a))
else if(H.a8(a,{func:1,args:[,,]}))u.Y(new H.hj(z,a))
else u.Y(a)
init.globalState.f.a1()},
dC:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.dD()
return},
dD:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.c(new P.r("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.c(new P.r('Cannot extract URI from "'+z+'"'))},
dy:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.aD(!0,[]).H(b.data)
y=J.F(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.aD(!0,[]).H(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.aD(!0,[]).H(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.h
p=P.a0(null,null,null,q)
o=new H.az(0,null,!1)
n=new H.bc(y,new H.y(0,null,null,null,null,null,0,[q,H.az]),p,init.createNewIsolate(),o,new H.M(H.aM()),new H.M(H.aM()),!1,!1,[],P.a0(null,null,null,null),null,null,!1,!0,P.a0(null,null,null,null))
p.G(0,0)
n.aE(0,o)
init.globalState.f.a.C(new H.ah(n,new H.dz(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.a1()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").F(y.h(z,"msg"))
init.globalState.f.a1()
break
case"close":init.globalState.ch.a0(0,$.$get$bG().h(0,a))
a.terminate()
init.globalState.f.a1()
break
case"log":H.dx(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.D(["command","print","msg",z])
q=new H.T(!0,P.a2(null,P.h)).A(q)
y.toString
self.postMessage(q)}else P.bn(y.h(z,"msg"))
break
case"error":throw H.c(y.h(z,"msg"))}},
dx:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.D(["command","log","msg",a])
x=new H.T(!0,P.a2(null,P.h)).A(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.u(w)
z=H.t(w)
y=P.ar(z)
throw H.c(y)}},
dA:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.c1=$.c1+("_"+y)
$.c2=$.c2+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.F(["spawned",new H.aE(y,x),w,z.r])
x=new H.dB(a,b,c,d,z)
if(e){z.b_(w,w)
init.globalState.f.a.C(new H.ah(z,x,"start isolate"))}else x.$0()},
fk:function(a){return new H.aD(!0,[]).H(new H.T(!1,P.a2(null,P.h)).A(a))},
hi:{"^":"b:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
hj:{"^":"b:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
f_:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",k:{
f0:function(a){var z=P.D(["command","print","msg",a])
return new H.T(!0,P.a2(null,P.h)).A(z)}}},
bc:{"^":"a;a,b,c,cn:d<,c4:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
b_:function(a,b){if(!this.f.q(0,a))return
if(this.Q.G(0,b)&&!this.y)this.y=!0
this.ap()},
cB:function(a){var z,y,x,w,v
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
if(w===x.c)x.aL();++x.d}this.y=!1}this.ap()},
bX:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
cA:function(a){var z,y,x
if(this.ch==null)return
for(z=J.l(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.m(new P.r("removeRange"))
P.b6(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
br:function(a,b){if(!this.r.q(0,a))return
this.db=b},
cf:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.F(c)
return}z=this.cx
if(z==null){z=P.aY(null,null)
this.cx=z}z.C(new H.eU(a,c))},
ce:function(a,b){var z
if(!this.r.q(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.au()
return}z=this.cx
if(z==null){z=P.aY(null,null)
this.cx=z}z.C(this.gco())},
cg:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bn(a)
if(b!=null)P.bn(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.Z(a)
y[1]=b==null?null:b.i(0)
for(x=new P.cs(z,z.r,null,null),x.c=z.e;x.l();)x.d.F(y)},
Y:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.u(u)
v=H.t(u)
this.cg(w,v)
if(this.db){this.au()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gcn()
if(this.cx!=null)for(;t=this.cx,!t.gaa(t);)this.cx.bc().$0()}return y},
b8:function(a){return this.b.h(0,a)},
aE:function(a,b){var z=this.b
if(z.as(a))throw H.c(P.ar("Registry: ports must be registered only once."))
z.w(0,a,b)},
ap:function(){var z=this.b
if(z.gj(z)-this.c.a>0||this.y||!this.x)init.globalState.z.w(0,this.a,this)
else this.au()},
au:[function(){var z,y,x
z=this.cx
if(z!=null)z.L(0)
for(z=this.b,y=z.gbh(z),y=y.gv(y);y.l();)y.gm().bF()
z.L(0)
this.c.L(0)
init.globalState.z.a0(0,this.a)
this.dx.L(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].F(z[x+1])
this.ch=null}},"$0","gco",0,0,1]},
eU:{"^":"b:1;a,b",
$0:function(){this.a.F(this.b)}},
eC:{"^":"a;a,b",
c5:function(){var z=this.a
if(z.b===z.c)return
return z.bc()},
be:function(){var z,y,x
z=this.c5()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.as(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.gaa(y)}else y=!1
else y=!1
else y=!1
if(y)H.m(P.ar("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.gaa(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.D(["command","close"])
x=new H.T(!0,new P.cu(0,null,null,null,null,null,0,[null,P.h])).A(x)
y.toString
self.postMessage(x)}return!1}z.cw()
return!0},
aT:function(){if(self.window!=null)new H.eD(this).$0()
else for(;this.be(););},
a1:function(){var z,y,x,w,v
if(!init.globalState.x)this.aT()
else try{this.aT()}catch(x){z=H.u(x)
y=H.t(x)
w=init.globalState.Q
v=P.D(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.T(!0,P.a2(null,P.h)).A(v)
w.toString
self.postMessage(v)}}},
eD:{"^":"b:1;a",
$0:function(){if(!this.a.be())return
P.em(C.q,this)}},
ah:{"^":"a;a,b,c",
cw:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.Y(this.b)}},
eZ:{"^":"a;"},
dz:{"^":"b:0;a,b,c,d,e,f",
$0:function(){H.dA(this.a,this.b,this.c,this.d,this.e,this.f)}},
dB:{"^":"b:1;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.a8(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.a8(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.ap()}},
co:{"^":"a;"},
aE:{"^":"co;b,a",
F:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.fk(a)
if(z.gc4()===y){y=J.F(x)
switch(y.h(x,0)){case"pause":z.b_(y.h(x,1),y.h(x,2))
break
case"resume":z.cB(y.h(x,1))
break
case"add-ondone":z.bX(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.cA(y.h(x,1))
break
case"set-errors-fatal":z.br(y.h(x,1),y.h(x,2))
break
case"ping":z.cf(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ce(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.G(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.a0(0,y)
break}return}init.globalState.f.a.C(new H.ah(z,new H.f1(this,x),"receive"))},
q:function(a,b){if(b==null)return!1
return b instanceof H.aE&&this.b===b.b},
gp:function(a){return this.b.a}},
f1:{"^":"b:0;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.bC(this.b)}},
bd:{"^":"co;b,c,a",
F:function(a){var z,y,x
z=P.D(["command","message","port",this,"msg",a])
y=new H.T(!0,P.a2(null,P.h)).A(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
q:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.bd){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gp:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
az:{"^":"a;a,b,c",
bF:function(){this.c=!0
this.b=null},
bC:function(a){if(this.c)return
this.b.$1(a)},
$ise5:1},
c9:{"^":"a;a,b,c",
c0:function(){if(self.setTimeout!=null){if(this.b)throw H.c(new P.r("Timer in event loop cannot be canceled."))
var z=this.c
if(z==null)return;--init.globalState.f.b
if(this.a)self.clearTimeout(z)
else self.clearInterval(z)
this.c=null}else throw H.c(new P.r("Canceling a timer."))},
bz:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.a7(new H.ej(this,b),0),a)}else throw H.c(new P.r("Periodic timer."))},
by:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.C(new H.ah(y,new H.ek(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.a7(new H.el(this,b),0),a)}else throw H.c(new P.r("Timer greater than 0."))},
k:{
eh:function(a,b){var z=new H.c9(!0,!1,null)
z.by(a,b)
return z},
ei:function(a,b){var z=new H.c9(!1,!1,null)
z.bz(a,b)
return z}}},
ek:{"^":"b:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
el:{"^":"b:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ej:{"^":"b:0;a,b",
$0:function(){this.b.$1(this.a)}},
M:{"^":"a;a",
gp:function(a){var z=this.a
z=C.a.aU(z,0)^C.a.D(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
q:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.M){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
T:{"^":"a;a,b",
A:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.w(0,a,z.gj(z))
z=J.l(a)
if(!!z.$isbV)return["buffer",a]
if(!!z.$isb2)return["typed",a]
if(!!z.$isx)return this.bn(a)
if(!!z.$isdw){x=this.gbk()
w=a.gb5()
w=H.b_(w,x,H.W(w,"C",0),null)
w=P.bO(w,!0,H.W(w,"C",0))
z=z.gbh(a)
z=H.b_(z,x,H.W(z,"C",0),null)
return["map",w,P.bO(z,!0,H.W(z,"C",0))]}if(!!z.$isdI)return this.bo(a)
if(!!z.$ise)this.bg(a)
if(!!z.$ise5)this.a2(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isaE)return this.bp(a)
if(!!z.$isbd)return this.bq(a)
if(!!z.$isb){v=a.$static_name
if(v==null)this.a2(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isM)return["capability",a.a]
if(!(a instanceof P.a))this.bg(a)
return["dart",init.classIdExtractor(a),this.bm(init.classFieldsExtractor(a))]},"$1","gbk",2,0,2],
a2:function(a,b){throw H.c(new P.r((b==null?"Can't transmit:":b)+" "+H.d(a)))},
bg:function(a){return this.a2(a,null)},
bn:function(a){var z=this.bl(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.a2(a,"Can't serialize indexable: ")},
bl:function(a){var z,y
z=[]
C.c.sj(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.A(a[y])
return z},
bm:function(a){var z
for(z=0;z<a.length;++z)C.c.w(a,z,this.A(a[z]))
return a},
bo:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.a2(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sj(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.A(a[z[x]])
return["js-object",z,y]},
bq:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
bp:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
aD:{"^":"a;a,b",
H:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.c(P.aO("Bad serialized message: "+H.d(a)))
switch(C.c.gcb(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.G(this.X(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.G(this.X(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.X(z)
case"const":z=a[1]
this.b.push(z)
y=H.G(this.X(z),[null])
y.fixed$length=Array
return y
case"map":return this.c8(a)
case"sendport":return this.c9(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.c7(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.M(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.X(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.c("couldn't deserialize: "+H.d(a))}},"$1","gc6",2,0,2],
X:function(a){var z
for(z=0;z<a.length;++z)C.c.w(a,z,this.H(a[z]))
return a},
c8:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.dR()
this.b.push(x)
z=J.d0(z,this.gc6()).cH(0)
for(w=J.F(y),v=0;v<z.length;++v)x.w(0,z[v],this.H(w.h(y,v)))
return x},
c9:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.b8(x)
if(u==null)return
t=new H.aE(u,y)}else t=new H.bd(z,x,y)
this.b.push(t)
return t},
c7:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.F(z),v=J.F(y),u=0;u<w.gj(z);++u)x[w.h(z,u)]=this.H(v.h(y,u))
return x}}}],["","",,H,{"^":"",
fV:function(a){return init.types[a]},
h7:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.l(a).$isI},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.Z(a)
if(typeof z!=="string")throw H.c(H.aj(a))
return z},
E:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
c3:function(a){var z,y,x,w,v,u,t,s
z=J.l(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.A||!!J.l(a).$isaC){v=C.u(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.f.bG(w,0)===36)w=C.f.aA(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cQ(H.aJ(a),0,null),init.mangledGlobalNames)},
ax:function(a){return"Instance of '"+H.c3(a)+"'"},
c0:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.c(H.aj(a))
return a[b]},
o:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.L(!0,b,"index",null)
z=J.an(a)
if(b<0||b>=z)return P.aU(b,a,"index",null,z)
return P.ay(b,"index",null)},
aj:function(a){return new P.L(!0,a,null,null)},
c:function(a){var z
if(a==null)a=new P.b4()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.cV})
z.name=""}else z.toString=H.cV
return z},
cV:function(){return J.Z(this.dartException)},
m:function(a){throw H.c(a)},
hl:function(a){throw H.c(new P.N(a))},
u:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hr(a)
if(a==null)return
if(a instanceof H.aS)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.aU(x,16)&8191)===10)switch(w){case 438:return z.$1(H.aX(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.c_(v,null))}}if(a instanceof TypeError){u=$.$get$cb()
t=$.$get$cc()
s=$.$get$cd()
r=$.$get$ce()
q=$.$get$ci()
p=$.$get$cj()
o=$.$get$cg()
$.$get$cf()
n=$.$get$cl()
m=$.$get$ck()
l=u.B(y)
if(l!=null)return z.$1(H.aX(y,l))
else{l=t.B(y)
if(l!=null){l.method="call"
return z.$1(H.aX(y,l))}else{l=s.B(y)
if(l==null){l=r.B(y)
if(l==null){l=q.B(y)
if(l==null){l=p.B(y)
if(l==null){l=o.B(y)
if(l==null){l=r.B(y)
if(l==null){l=n.B(y)
if(l==null){l=m.B(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.c_(y,l==null?null:l.method))}}return z.$1(new H.ep(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.c5()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.L(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.c5()
return a},
t:function(a){var z
if(a instanceof H.aS)return a.b
if(a==null)return new H.cv(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.cv(a,null)},
hf:function(a){if(a==null||typeof a!='object')return J.al(a)
else return H.E(a)},
fS:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.w(0,a[y],a[x])}return b},
h1:function(a,b,c,d,e,f,g){switch(c){case 0:return H.ai(b,new H.h2(a))
case 1:return H.ai(b,new H.h3(a,d))
case 2:return H.ai(b,new H.h4(a,d,e))
case 3:return H.ai(b,new H.h5(a,d,e,f))
case 4:return H.ai(b,new H.h6(a,d,e,f,g))}throw H.c(P.ar("Unsupported number of arguments for wrapped closure"))},
a7:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.h1)
a.$identity=z
return z},
da:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.l(c).$isi){z.$reflectionInfo=c
x=H.e7(z).r}else x=c
w=d?Object.create(new H.ec().constructor.prototype):Object.create(new H.aQ(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.w
$.w=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.bs(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.fV,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.bq:H.aR
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.c("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bs(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
d7:function(a,b,c,d){var z=H.aR
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bs:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.d9(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.d7(y,!w,z,b)
if(y===0){w=$.w
$.w=w+1
u="self"+H.d(w)
w="return function(){var "+u+" = this."
v=$.a_
if(v==null){v=H.ap("self")
$.a_=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.w
$.w=w+1
t+=H.d(w)
w="return function("+t+"){return this."
v=$.a_
if(v==null){v=H.ap("self")
$.a_=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
d8:function(a,b,c,d){var z,y
z=H.aR
y=H.bq
switch(b?-1:a){case 0:throw H.c(new H.e8("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
d9:function(a,b){var z,y,x,w,v,u,t,s
z=H.d2()
y=$.bp
if(y==null){y=H.ap("receiver")
$.bp=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.d8(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.w
$.w=u+1
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.w
$.w=u+1
return new Function(y+H.d(u)+"}")()},
bi:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.l(c).$isi){c.fixed$length=Array
z=c}else z=c
return H.da(a,b,z,!!d,e,f)},
fQ:function(a){var z=J.l(a)
return"$S" in z?z.$S():null},
a8:function(a,b){var z
if(a==null)return!1
z=H.fQ(a)
return z==null?!1:H.cP(z,b)},
hm:function(a){throw H.c(new P.df(a))},
aM:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
cM:function(a){return init.getIsolateTag(a)},
G:function(a,b){a.$ti=b
return a},
aJ:function(a){if(a==null)return
return a.$ti},
cN:function(a,b){return H.bo(a["$as"+H.d(b)],H.aJ(a))},
W:function(a,b,c){var z=H.cN(a,b)
return z==null?null:z[c]},
B:function(a,b){var z=H.aJ(a)
return z==null?null:z[b]},
X:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cQ(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.X(z,b)
return H.fl(a,b)}return"unknown-reified-type"},
fl:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.X(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.X(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.X(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.fR(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.X(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
cQ:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.b7("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.n=v+", "
u=a[y]
if(u!=null)w=!1
v=z.n+=H.X(u,c)}return w?"":"<"+z.i(0)+">"},
bo:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
cJ:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.aJ(a)
y=J.l(a)
if(y[b]==null)return!1
return H.cH(H.bo(y[d],z),c)},
cH:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.q(a[y],b[y]))return!1
return!0},
fP:function(a,b,c){return a.apply(b,H.cN(b,c))},
q:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="b3")return!0
if('func' in b)return H.cP(a,b)
if('func' in a)return b.builtin$cls==="aT"||b.builtin$cls==="a"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.X(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.cH(H.bo(u,z),x)},
cG:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.q(z,v)||H.q(v,z)))return!1}return!0},
fw:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.q(v,u)||H.q(u,v)))return!1}return!0},
cP:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.q(z,y)||H.q(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.cG(x,w,!1))return!1
if(!H.cG(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.q(o,n)||H.q(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.q(o,n)||H.q(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.q(o,n)||H.q(n,o)))return!1}}return H.fw(a.named,b.named)},
ix:function(a){var z=$.bk
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
iv:function(a){return H.E(a)},
iu:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
h8:function(a){var z,y,x,w,v,u
z=$.bk.$1(a)
y=$.aH[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aK[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.cF.$2(a,z)
if(z!=null){y=$.aH[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aK[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bm(x)
$.aH[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.aK[z]=x
return x}if(v==="-"){u=H.bm(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.cR(a,x)
if(v==="*")throw H.c(new P.cm(z))
if(init.leafTags[z]===true){u=H.bm(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.cR(a,x)},
cR:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.aL(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bm:function(a){return J.aL(a,!1,null,!!a.$isI)},
he:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.aL(z,!1,null,!!z.$isI)
else return J.aL(z,c,null,null)},
h_:function(){if(!0===$.bl)return
$.bl=!0
H.h0()},
h0:function(){var z,y,x,w,v,u,t,s
$.aH=Object.create(null)
$.aK=Object.create(null)
H.fW()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.cS.$1(v)
if(u!=null){t=H.he(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
fW:function(){var z,y,x,w,v,u,t
z=C.F()
z=H.V(C.C,H.V(C.H,H.V(C.t,H.V(C.t,H.V(C.G,H.V(C.D,H.V(C.E(C.u),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bk=new H.fX(v)
$.cF=new H.fY(u)
$.cS=new H.fZ(t)},
V:function(a,b){return a(b)||b},
hk:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
e6:{"^":"a;a,b,c,d,e,f,r,x",k:{
e7:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.e6(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
eo:{"^":"a;a,b,c,d,e,f",
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
A:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.eo(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
aB:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
ch:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
c_:{"^":"n;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+z+"' on null"}},
dK:{"^":"n;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
k:{
aX:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.dK(a,y,z?null:b.receiver)}}},
ep:{"^":"n;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
aS:{"^":"a;a,b"},
hr:{"^":"b:2;a",
$1:function(a){if(!!J.l(a).$isn)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
cv:{"^":"a;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
h2:{"^":"b:0;a",
$0:function(){return this.a.$0()}},
h3:{"^":"b:0;a,b",
$0:function(){return this.a.$1(this.b)}},
h4:{"^":"b:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
h5:{"^":"b:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
h6:{"^":"b:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
b:{"^":"a;",
i:function(a){return"Closure '"+H.c3(this).trim()+"'"},
gbi:function(){return this},
$isaT:1,
gbi:function(){return this}},
c8:{"^":"b;"},
ec:{"^":"c8;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
aQ:{"^":"c8;a,b,c,d",
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.aQ))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gp:function(a){var z,y
z=this.c
if(z==null)y=H.E(this.a)
else y=typeof z!=="object"?J.al(z):H.E(z)
return(y^H.E(this.b))>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.ax(z)},
k:{
aR:function(a){return a.a},
bq:function(a){return a.c},
d2:function(){var z=$.a_
if(z==null){z=H.ap("self")
$.a_=z}return z},
ap:function(a){var z,y,x,w,v
z=new H.aQ("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
e8:{"^":"n;a",
i:function(a){return"RuntimeError: "+H.d(this.a)}},
y:{"^":"a;a,b,c,d,e,f,r,$ti",
gj:function(a){return this.a},
gaa:function(a){return this.a===0},
gb5:function(){return new H.dM(this,[H.B(this,0)])},
gbh:function(a){return H.b_(this.gb5(),new H.dJ(this),H.B(this,0),H.B(this,1))},
as:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.aI(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.aI(y,a)}else return this.ci(a)},
ci:function(a){var z=this.d
if(z==null)return!1
return this.a_(this.a8(z,this.Z(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.U(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.U(x,b)
return y==null?null:y.b}else return this.cj(b)},
cj:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a8(z,this.Z(a))
x=this.a_(y,a)
if(x<0)return
return y[x].b},
w:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.aj()
this.b=z}this.aC(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.aj()
this.c=y}this.aC(y,b,c)}else this.cl(b,c)},
cl:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.aj()
this.d=z}y=this.Z(a)
x=this.a8(z,y)
if(x==null)this.an(z,y,[this.ak(a,b)])
else{w=this.a_(x,a)
if(w>=0)x[w].b=b
else x.push(this.ak(a,b))}},
cz:function(a,b){var z
if(this.as(a))return this.h(0,a)
z=b.$0()
this.w(0,a,z)
return z},
a0:function(a,b){if(typeof b==="string")return this.aR(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aR(this.c,b)
else return this.ck(b)},
ck:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a8(z,this.Z(a))
x=this.a_(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.aX(w)
return w.b},
L:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
b3:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(new P.N(this))
z=z.c}},
aC:function(a,b,c){var z=this.U(a,b)
if(z==null)this.an(a,b,this.ak(b,c))
else z.b=c},
aR:function(a,b){var z
if(a==null)return
z=this.U(a,b)
if(z==null)return
this.aX(z)
this.aJ(a,b)
return z.b},
ak:function(a,b){var z,y
z=new H.dL(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
aX:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
Z:function(a){return J.al(a)&0x3ffffff},
a_:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Y(a[y].a,b))return y
return-1},
i:function(a){return P.dX(this)},
U:function(a,b){return a[b]},
a8:function(a,b){return a[b]},
an:function(a,b,c){a[b]=c},
aJ:function(a,b){delete a[b]},
aI:function(a,b){return this.U(a,b)!=null},
aj:function(){var z=Object.create(null)
this.an(z,"<non-identifier-key>",z)
this.aJ(z,"<non-identifier-key>")
return z},
$isdw:1},
dJ:{"^":"b:2;a",
$1:function(a){return this.a.h(0,a)}},
dL:{"^":"a;a,b,c,d"},
dM:{"^":"f;a,$ti",
gj:function(a){return this.a.a},
gv:function(a){var z,y
z=this.a
y=new H.dN(z,z.r,null,null)
y.c=z.e
return y}},
dN:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
fX:{"^":"b:2;a",
$1:function(a){return this.a(a)}},
fY:{"^":"b:8;a",
$2:function(a,b){return this.a(a,b)}},
fZ:{"^":"b:9;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
fR:function(a){var z=H.G(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
hg:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",bV:{"^":"e;",$isbV:1,"%":"ArrayBuffer"},b2:{"^":"e;",$isb2:1,"%":"DataView;ArrayBufferView;b0|bW|bY|b1|bX|bZ|J"},b0:{"^":"b2;",
gj:function(a){return a.length},
$isI:1,
$asI:I.p,
$isx:1,
$asx:I.p},b1:{"^":"bY;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]}},bW:{"^":"b0+aw;",$asI:I.p,$asx:I.p,
$asi:function(){return[P.K]},
$asf:function(){return[P.K]},
$isi:1,
$isf:1},bY:{"^":"bW+bE;",$asI:I.p,$asx:I.p,
$asi:function(){return[P.K]},
$asf:function(){return[P.K]}},J:{"^":"bZ;",$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]}},bX:{"^":"b0+aw;",$asI:I.p,$asx:I.p,
$asi:function(){return[P.h]},
$asf:function(){return[P.h]},
$isi:1,
$isf:1},bZ:{"^":"bX+bE;",$asI:I.p,$asx:I.p,
$asi:function(){return[P.h]},
$asf:function(){return[P.h]}},hX:{"^":"b1;",$isi:1,
$asi:function(){return[P.K]},
$isf:1,
$asf:function(){return[P.K]},
"%":"Float32Array"},hY:{"^":"b1;",$isi:1,
$asi:function(){return[P.K]},
$isf:1,
$asf:function(){return[P.K]},
"%":"Float64Array"},hZ:{"^":"J;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Int16Array"},i_:{"^":"J;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Int32Array"},i0:{"^":"J;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Int8Array"},i1:{"^":"J;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Uint16Array"},i2:{"^":"J;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"Uint32Array"},i3:{"^":"J;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":"CanvasPixelArray|Uint8ClampedArray"},i4:{"^":"J;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.m(H.o(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.h]},
$isf:1,
$asf:function(){return[P.h]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
et:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.fx()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a7(new P.ev(z),1)).observe(y,{childList:true})
return new P.eu(z,y,x)}else if(self.setImmediate!=null)return P.fy()
return P.fz()},
ih:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.a7(new P.ew(a),0))},"$1","fx",2,0,4],
ii:[function(a){++init.globalState.f.b
self.setImmediate(H.a7(new P.ex(a),0))},"$1","fy",2,0,4],
ij:[function(a){P.b8(C.q,a)},"$1","fz",2,0,4],
fh:function(a,b){P.cx(null,a)
return b.a},
ir:function(a,b){P.cx(a,b)},
fg:function(a,b){b.c1(0,a)},
ff:function(a,b){b.c2(H.u(a),H.t(a))},
cx:function(a,b){var z,y,x,w
z=new P.fi(b)
y=new P.fj(b)
x=J.l(a)
if(!!x.$isS)a.ao(z,y)
else if(!!x.$isab)a.ay(z,y)
else{w=new P.S(0,$.j,null,[null])
w.a=4
w.c=a
w.ao(z,null)}},
ft:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.j.toString
return new P.fu(z)},
cB:function(a,b){if(H.a8(a,{func:1,args:[P.b3,P.b3]})){b.toString
return a}else{b.toString
return a}},
db:function(a){return new P.fc(new P.S(0,$.j,null,[a]),[a])},
fn:function(){var z,y
for(;z=$.U,z!=null;){$.a4=null
y=z.b
$.U=y
if(y==null)$.a3=null
z.a.$0()}},
it:[function(){$.be=!0
try{P.fn()}finally{$.a4=null
$.be=!1
if($.U!=null)$.$get$b9().$1(P.cI())}},"$0","cI",0,0,1],
cE:function(a){var z=new P.cn(a,null)
if($.U==null){$.a3=z
$.U=z
if(!$.be)$.$get$b9().$1(P.cI())}else{$.a3.b=z
$.a3=z}},
fs:function(a){var z,y,x
z=$.U
if(z==null){P.cE(a)
$.a4=$.a3
return}y=new P.cn(a,null)
x=$.a4
if(x==null){y.b=z
$.a4=y
$.U=y}else{y.b=x.b
x.b=y
$.a4=y
if(y.b==null)$.a3=y}},
cT:function(a){var z=$.j
if(C.b===z){P.aG(null,null,C.b,a)
return}z.toString
P.aG(null,null,z,z.ar(a,!0))},
i9:function(a,b){return new P.fb(null,a,!1,[b])},
bg:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.u(x)
y=H.t(x)
w=$.j
w.toString
P.a5(null,null,w,z,y)}},
fo:[function(a,b){var z=$.j
z.toString
P.a5(null,null,z,a,b)},function(a){return P.fo(a,null)},"$2","$1","fB",2,2,5,0],
is:[function(){},"$0","fA",0,0,1],
em:function(a,b){var z=$.j
if(z===C.b){z.toString
return P.b8(a,b)}return P.b8(a,z.ar(b,!0))},
en:function(a,b){var z,y
z=$.j
if(z===C.b){z.toString
return P.ca(a,b)}y=z.b0(b,!0)
$.j.toString
return P.ca(a,y)},
b8:function(a,b){var z=C.a.D(a.a,1000)
return H.eh(z<0?0:z,b)},
ca:function(a,b){var z=C.a.D(a.a,1000)
return H.ei(z<0?0:z,b)},
a5:function(a,b,c,d,e){var z={}
z.a=d
P.fs(new P.fp(z,e))},
cC:function(a,b,c,d){var z,y
y=$.j
if(y===c)return d.$0()
$.j=c
z=y
try{y=d.$0()
return y}finally{$.j=z}},
cD:function(a,b,c,d,e){var z,y
y=$.j
if(y===c)return d.$1(e)
$.j=c
z=y
try{y=d.$1(e)
return y}finally{$.j=z}},
fr:function(a,b,c,d,e,f){var z,y
y=$.j
if(y===c)return d.$2(e,f)
$.j=c
z=y
try{y=d.$2(e,f)
return y}finally{$.j=z}},
aG:function(a,b,c,d){var z=C.b!==c
if(z)d=c.ar(d,!(!z||!1))
P.cE(d)},
ev:{"^":"b:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
eu:{"^":"b:10;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ew:{"^":"b:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ex:{"^":"b:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
fi:{"^":"b:2;a",
$1:function(a){return this.a.$2(0,a)}},
fj:{"^":"b:11;a",
$2:function(a,b){this.a.$2(1,new H.aS(a,b))}},
fu:{"^":"b:12;a",
$2:function(a,b){this.a(a,b)}},
ez:{"^":"a;$ti",
c2:function(a,b){if(a==null)a=new P.b4()
if(this.a.a!==0)throw H.c(new P.R("Future already completed"))
$.j.toString
this.K(a,b)}},
fc:{"^":"ez;a,$ti",
c1:function(a,b){var z=this.a
if(z.a!==0)throw H.c(new P.R("Future already completed"))
z.af(b)},
K:function(a,b){this.a.K(a,b)}},
eI:{"^":"a;a,b,c,d,e",
cs:function(a){if(this.c!==6)return!0
return this.b.b.ax(this.d,a.a)},
cd:function(a){var z,y
z=this.e
y=this.b.b
if(H.a8(z,{func:1,args:[,,]}))return y.cE(z,a.a,a.b)
else return y.ax(z,a.a)}},
S:{"^":"a;W:a<,b,bQ:c<,$ti",
ay:function(a,b){var z=$.j
if(z!==C.b){z.toString
if(b!=null)b=P.cB(b,z)}return this.ao(a,b)},
cG:function(a){return this.ay(a,null)},
ao:function(a,b){var z=new P.S(0,$.j,null,[null])
this.aD(new P.eI(null,z,b==null?1:3,a,b))
return z},
aD:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.aD(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.aG(null,null,z,new P.eJ(this,a))}},
aQ:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.aQ(a)
return}this.a=u
this.c=y.c}z.a=this.V(a)
y=this.b
y.toString
P.aG(null,null,y,new P.eO(z,this))}},
aS:function(){var z=this.c
this.c=null
return this.V(z)},
V:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
af:function(a){var z,y
z=this.$ti
if(H.cJ(a,"$isab",z,"$asab"))if(H.cJ(a,"$isS",z,null))P.cr(a,this)
else P.eK(a,this)
else{y=this.aS()
this.a=4
this.c=a
P.a1(this,y)}},
K:[function(a,b){var z=this.aS()
this.a=8
this.c=new P.ao(a,b)
P.a1(this,z)},function(a){return this.K(a,null)},"cK","$2","$1","gbI",2,2,5,0],
$isab:1,
k:{
eK:function(a,b){var z,y,x
b.a=1
try{a.ay(new P.eL(b),new P.eM(b))}catch(x){z=H.u(x)
y=H.t(x)
P.cT(new P.eN(b,z,y))}},
cr:function(a,b){var z,y,x
for(;z=a.a,z===2;)a=a.c
y=b.c
if(z>=4){b.c=null
x=b.V(y)
b.a=a.a
b.c=a.c
P.a1(b,x)}else{b.a=2
b.c=a
a.aQ(y)}},
a1:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.a5(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.a1(z.a,b)}y=z.a
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
P.a5(null,null,y,v,u)
return}p=$.j
if(p==null?r!=null:p!==r)$.j=r
else p=null
y=b.c
if(y===8)new P.eR(z,x,w,b).$0()
else if(v){if((y&1)!==0)new P.eQ(x,b,s).$0()}else if((y&2)!==0)new P.eP(z,x,b).$0()
if(p!=null)$.j=p
y=x.b
if(!!J.l(y).$isab){if(y.a>=4){o=u.c
u.c=null
b=u.V(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.cr(y,u)
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
eJ:{"^":"b:0;a,b",
$0:function(){P.a1(this.a,this.b)}},
eO:{"^":"b:0;a,b",
$0:function(){P.a1(this.b,this.a.a)}},
eL:{"^":"b:2;a",
$1:function(a){var z=this.a
z.a=0
z.af(a)}},
eM:{"^":"b:13;a",
$2:function(a,b){this.a.K(a,b)},
$1:function(a){return this.$2(a,null)}},
eN:{"^":"b:0;a,b,c",
$0:function(){this.a.K(this.b,this.c)}},
eR:{"^":"b:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.d
z=w.b.b.bd(w.d)}catch(v){y=H.u(v)
x=H.t(v)
if(this.c){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.ao(y,x)
u.a=!0
return}if(!!J.l(z).$isab){if(z instanceof P.S&&z.gW()>=4){if(z.gW()===8){w=this.b
w.b=z.gbQ()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.cG(new P.eS(t))
w.a=!1}}},
eS:{"^":"b:2;a",
$1:function(a){return this.a}},
eQ:{"^":"b:1;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.ax(x.d,this.c)}catch(w){z=H.u(w)
y=H.t(w)
x=this.a
x.b=new P.ao(z,y)
x.a=!0}}},
eP:{"^":"b:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.cs(z)&&w.e!=null){v=this.b
v.b=w.cd(z)
v.a=!1}}catch(u){y=H.u(u)
x=H.t(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.ao(y,x)
s.a=!0}}},
cn:{"^":"a;a,b"},
c6:{"^":"a;$ti",
gj:function(a){var z,y
z={}
y=new P.S(0,$.j,null,[P.h])
z.a=0
this.av(new P.ee(z),!0,new P.ef(z,y),y.gbI())
return y}},
ee:{"^":"b:2;a",
$1:function(a){++this.a.a}},
ef:{"^":"b:0;a,b",
$0:function(){this.b.af(this.a.a)}},
ed:{"^":"a;"},
f8:{"^":"a;W:b<,$ti",
gbO:function(){if((this.b&8)===0)return this.a
return this.a.gac()},
bL:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.cw(null,null,0,this.$ti)
this.a=z}return z}y=this.a
y.gac()
return y.gac()},
gbT:function(){if((this.b&8)!==0)return this.a.gac()
return this.a},
T:function(){if((this.b&4)!==0)return new P.R("Cannot add event after closing")
return new P.R("Cannot add event while adding a stream")},
S:function(a){var z=this.b
if((z&1)!==0)this.al(a)
else if((z&3)===0)this.bL().G(0,new P.cq(a,null,this.$ti))},
bS:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.c(new P.R("Stream has already been listened to."))
z=$.j
y=d?1:0
x=new P.eA(this,null,null,null,z,y,null,null,this.$ti)
x.bA(a,b,c,d,H.B(this,0))
w=this.gbO()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sac(x)
v.aw()}else this.a=x
x.bR(w)
x.ai(new P.f9(this))
return x}},
f9:{"^":"b:0;a",
$0:function(){P.bg(this.a.d)}},
ey:{"^":"a;$ti",
al:function(a){this.gbT().bE(new P.cq(a,null,[H.B(this,0)]))}},
ba:{"^":"f8+ey;a,b,c,d,e,f,r,$ti"},
bb:{"^":"fa;a,$ti",
gp:function(a){return(H.E(this.a)^892482866)>>>0},
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.bb))return!1
return b.a===this.a}},
eA:{"^":"cp;x,a,b,c,d,e,f,r,$ti",
aN:[function(){var z=this.x
if((z.b&8)!==0)C.B.ab(z.a)
P.bg(z.e)},"$0","gaM",0,0,1],
aP:[function(){var z=this.x
if((z.b&8)!==0)z.a.aw()
P.bg(z.f)},"$0","gaO",0,0,1]},
cp:{"^":"a;W:e<,$ti",
bR:function(a){if(a==null)return
this.r=a
if(a.c!=null){this.e=(this.e|64)>>>0
a.a5(this)}},
cu:function(a,b){var z,y,x
z=this.e
if((z&8)!==0)return
y=(z+128|4)>>>0
this.e=y
if(z<128&&this.r!=null){x=this.r
if(x.a===1)x.a=3}if((z&4)===0&&(y&32)===0)this.ai(this.gaM())},
ab:function(a){return this.cu(a,null)},
aw:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128)if((z&64)!==0&&this.r.c!=null)this.r.a5(this)
else{z=(z&4294967291)>>>0
this.e=z
if((z&32)===0)this.ai(this.gaO())}}},
aN:[function(){},"$0","gaM",0,0,1],
aP:[function(){},"$0","gaO",0,0,1],
bE:function(a){var z,y
z=this.r
if(z==null){z=new P.cw(null,null,0,[H.W(this,"cp",0)])
this.r=z}z.G(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.a5(this)}},
al:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bf(this.a,a)
this.e=(this.e&4294967263)>>>0
this.aF((z&4)!==0)},
ai:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.aF((z&4)!==0)},
aF:function(a){var z,y,x
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
if(x)this.aN()
else this.aP()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.a5(this)},
bA:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.cB(b==null?P.fB():b,z)
this.c=c==null?P.fA():c}},
fa:{"^":"c6;$ti",
av:function(a,b,c,d){return this.a.bS(a,d,c,!0===b)},
b7:function(a){return this.av(a,null,null,null)}},
eB:{"^":"a;bb:a@"},
cq:{"^":"eB;b,a,$ti",
cv:function(a){a.al(this.b)}},
f2:{"^":"a;W:a<",
a5:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cT(new P.f3(this,a))
this.a=1}},
f3:{"^":"b:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbb()
z.b=w
if(w==null)z.c=null
x.cv(this.b)}},
cw:{"^":"f2;b,c,a,$ti",
G:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbb(b)
this.c=b}}},
fb:{"^":"a;a,b,c,$ti"},
ao:{"^":"a;a,b",
i:function(a){return H.d(this.a)},
$isn:1},
fe:{"^":"a;"},
fp:{"^":"b:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.b4()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=y.i(0)
throw x}},
f4:{"^":"fe;",
cF:function(a){var z,y,x,w
try{if(C.b===$.j){x=a.$0()
return x}x=P.cC(null,null,this,a)
return x}catch(w){z=H.u(w)
y=H.t(w)
return P.a5(null,null,this,z,y)}},
bf:function(a,b){var z,y,x,w
try{if(C.b===$.j){x=a.$1(b)
return x}x=P.cD(null,null,this,a,b)
return x}catch(w){z=H.u(w)
y=H.t(w)
return P.a5(null,null,this,z,y)}},
ar:function(a,b){if(b)return new P.f5(this,a)
else return new P.f6(this,a)},
b0:function(a,b){return new P.f7(this,a)},
h:function(a,b){return},
bd:function(a){if($.j===C.b)return a.$0()
return P.cC(null,null,this,a)},
ax:function(a,b){if($.j===C.b)return a.$1(b)
return P.cD(null,null,this,a,b)},
cE:function(a,b,c){if($.j===C.b)return a.$2(b,c)
return P.fr(null,null,this,a,b,c)}},
f5:{"^":"b:0;a,b",
$0:function(){return this.a.cF(this.b)}},
f6:{"^":"b:0;a,b",
$0:function(){return this.a.bd(this.b)}},
f7:{"^":"b:2;a,b",
$1:function(a){return this.a.bf(this.b,a)}}}],["","",,P,{"^":"",
dP:function(a,b){return new H.y(0,null,null,null,null,null,0,[a,b])},
dR:function(){return new H.y(0,null,null,null,null,null,0,[null,null])},
D:function(a){return H.fS(a,new H.y(0,null,null,null,null,null,0,[null,null]))},
dE:function(a,b,c){var z,y
if(P.bf(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$a6()
y.push(a)
try{P.fm(a,z)}finally{y.pop()}y=P.c7(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
as:function(a,b,c){var z,y,x
if(P.bf(a))return b+"..."+c
z=new P.b7(b)
y=$.$get$a6()
y.push(a)
try{x=z
x.n=P.c7(x.gn(),a,", ")}finally{y.pop()}y=z
y.n=y.gn()+c
y=z.gn()
return y.charCodeAt(0)==0?y:y},
bf:function(a){var z,y
for(z=0;y=$.$get$a6(),z<y.length;++z)if(a===y[z])return!0
return!1},
fm:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
dO:function(a,b,c,d,e){return new H.y(0,null,null,null,null,null,0,[d,e])},
dQ:function(a,b,c){var z=P.dO(null,null,null,b,c)
a.b3(0,new P.fG(z))
return z},
a0:function(a,b,c,d){return new P.eW(0,null,null,null,null,null,0,[d])},
dX:function(a){var z,y,x
z={}
if(P.bf(a))return"{...}"
y=new P.b7("")
try{$.$get$a6().push(a)
x=y
x.n=x.gn()+"{"
z.a=!0
a.b3(0,new P.dY(z,y))
z=y
z.n=z.gn()+"}"}finally{$.$get$a6().pop()}z=y.gn()
return z.charCodeAt(0)==0?z:z},
cu:{"^":"y;a,b,c,d,e,f,r,$ti",
Z:function(a){return H.hf(a)&0x3ffffff},
a_:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
k:{
a2:function(a,b){return new P.cu(0,null,null,null,null,null,0,[a,b])}}},
eW:{"^":"eT;a,b,c,d,e,f,r,$ti",
gv:function(a){var z=new P.cs(this,this.r,null,null)
z.c=this.e
return z},
gj:function(a){return this.a},
a9:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null)return!1
return z[b]!=null}else return this.bJ(b)},
bJ:function(a){var z=this.d
if(z==null)return!1
return this.a7(z[this.a6(a)],a)>=0},
b8:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.a9(0,a)?a:null
else return this.bN(a)},
bN:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.a6(a)]
x=this.a7(y,a)
if(x<0)return
return J.cY(y,x).gbK()},
G:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null){z=P.ct()
this.c=z}return this.bH(z,b)}else return this.C(b)},
C:function(a){var z,y,x
z=this.d
if(z==null){z=P.ct()
this.d=z}y=this.a6(a)
x=z[y]
if(x==null)z[y]=[this.ae(a)]
else{if(this.a7(x,a)>=0)return!1
x.push(this.ae(a))}return!0},
a0:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.aG(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aG(this.c,b)
else return this.bP(b)},
bP:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.a6(a)]
x=this.a7(y,a)
if(x<0)return!1
this.aH(y.splice(x,1)[0])
return!0},
L:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bH:function(a,b){if(a[b]!=null)return!1
a[b]=this.ae(b)
return!0},
aG:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.aH(z)
delete a[b]
return!0},
ae:function(a){var z,y
z=new P.eX(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
aH:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
a6:function(a){return J.al(a)&0x3ffffff},
a7:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Y(a[y].a,b))return y
return-1},
$isf:1,
$asf:null,
k:{
ct:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
eX:{"^":"a;bK:a<,b,c"},
cs:{"^":"a;a,b,c,d",
gm:function(){return this.d},
l:function(){var z=this.a
if(this.b!==z.r)throw H.c(new P.N(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
eT:{"^":"e9;$ti"},
fG:{"^":"b:6;a",
$2:function(a,b){this.a.w(0,a,b)}},
dS:{"^":"e0;$ti"},
e0:{"^":"a+aw;",$asi:null,$asf:null,$isi:1,$isf:1},
aw:{"^":"a;$ti",
gv:function(a){return new H.bN(a,this.gj(a),0,null)},
I:function(a,b){return this.h(a,b)},
b9:function(a,b){return new H.bT(a,b,[H.W(a,"aw",0),null])},
i:function(a){return P.as(a,"[","]")},
$isi:1,
$asi:null,
$isf:1,
$asf:null},
fd:{"^":"a;"},
dV:{"^":"a;",
h:function(a,b){return this.a.h(0,b)},
gj:function(a){var z=this.a
return z.gj(z)},
i:function(a){return this.a.i(0)}},
eq:{"^":"dV+fd;a,$ti"},
dY:{"^":"b:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.n+=", "
z.a=!1
z=this.b
y=z.n+=H.d(a)
z.n=y+": "
z.n+=H.d(b)}},
dT:{"^":"av;a,b,c,d,$ti",
gv:function(a){return new P.eY(this,this.c,this.d,this.b,null)},
gaa:function(a){return this.b===this.c},
gj:function(a){return(this.c-this.b&this.a.length-1)>>>0},
I:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.m(P.aU(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
L:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
i:function(a){return P.as(this,"{","}")},
bc:function(){var z,y,x
z=this.b
if(z===this.c)throw H.c(H.bH());++this.d
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
if(this.b===z)this.aL();++this.d},
aL:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.G(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.c.az(y,0,w,z,x)
C.c.az(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
bx:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.G(z,[b])},
$asf:null,
k:{
aY:function(a,b){var z=new P.dT(null,0,0,0,[b])
z.bx(a,b)
return z}}},
eY:{"^":"a;a,b,c,d,e",
gm:function(){return this.e},
l:function(){var z,y
z=this.a
if(this.c!==z.d)H.m(new P.N(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
ea:{"^":"a;$ti",
i:function(a){return P.as(this,"{","}")},
$isf:1,
$asf:null},
e9:{"^":"ea;$ti"}}],["","",,P,{"^":"",
bB:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.Z(a)
if(typeof a==="string")return JSON.stringify(a)
return P.dm(a)},
dm:function(a){var z=J.l(a)
if(!!z.$isb)return z.i(a)
return H.ax(a)},
ar:function(a){return new P.eH(a)},
dU:function(a,b,c,d){var z,y,x
z=J.dG(a,d)
if(a!==0&&b!=null)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
bO:function(a,b,c){var z,y
z=H.G([],[c])
for(y=J.am(a);y.l();)z.push(y.gm())
return z},
bn:function(a){H.hg(H.d(a))},
bh:{"^":"a;"},
"+bool":0,
K:{"^":"ak;"},
"+double":0,
aa:{"^":"a;a",
a3:function(a,b){return new P.aa(C.a.a3(this.a,b.gaK()))},
J:function(a,b){return C.a.J(this.a,b.gaK())},
P:function(a,b){return C.a.P(this.a,b.gaK())},
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.aa))return!1
return this.a===b.a},
gp:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.dk()
y=this.a
if(y<0)return"-"+new P.aa(0-y).i(0)
x=z.$1(C.a.D(y,6e7)%60)
w=z.$1(C.a.D(y,1e6)%60)
v=new P.dj().$1(y%1e6)
return""+C.a.D(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
k:{
di:function(a,b,c,d,e,f){return new P.aa(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
dj:{"^":"b:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
dk:{"^":"b:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
n:{"^":"a;"},
b4:{"^":"n;",
i:function(a){return"Throw of null."}},
L:{"^":"n;a,b,c,d",
gah:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gag:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.d(z)
w=this.gah()+y+x
if(!this.a)return w
v=this.gag()
u=P.bB(this.b)
return w+v+": "+H.d(u)},
k:{
aO:function(a){return new P.L(!1,null,null,a)},
aP:function(a,b,c){return new P.L(!0,a,b,c)}}},
b5:{"^":"L;e,f,a,b,c,d",
gah:function(){return"RangeError"},
gag:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
k:{
e4:function(a){return new P.b5(null,null,!1,null,null,a)},
ay:function(a,b,c){return new P.b5(null,null,!0,a,b,"Value not in range")},
Q:function(a,b,c,d,e){return new P.b5(b,c,!0,a,d,"Invalid value")},
b6:function(a,b,c,d,e,f){if(0>a||a>c)throw H.c(P.Q(a,0,c,"start",f))
if(a>b||b>c)throw H.c(P.Q(b,a,c,"end",f))
return b}}},
du:{"^":"L;e,j:f>,a,b,c,d",
gah:function(){return"RangeError"},
gag:function(){if(J.cX(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
k:{
aU:function(a,b,c,d,e){var z=e!=null?e:J.an(b)
return new P.du(b,z,!0,a,c,"Index out of range")}}},
r:{"^":"n;a",
i:function(a){return"Unsupported operation: "+this.a}},
cm:{"^":"n;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
R:{"^":"n;a",
i:function(a){return"Bad state: "+this.a}},
N:{"^":"n;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.bB(z))+"."}},
c5:{"^":"a;",
i:function(a){return"Stack Overflow"},
$isn:1},
df:{"^":"n;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
eH:{"^":"a;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
dn:{"^":"a;a,bM",
i:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z,y
z=this.bM
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.m(P.aP(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.c0(b,"expando$values")
return y==null?null:H.c0(y,z)}},
h:{"^":"ak;"},
"+int":0,
C:{"^":"a;$ti",
gj:function(a){var z,y
z=this.gv(this)
for(y=0;z.l();)++y
return y},
I:function(a,b){var z,y,x
if(b<0)H.m(P.Q(b,0,null,"index",null))
for(z=this.gv(this),y=0;z.l();){x=z.gm()
if(b===y)return x;++y}throw H.c(P.aU(b,this,"index",null,y))},
i:function(a){return P.dE(this,"(",")")}},
bI:{"^":"a;"},
i:{"^":"a;$ti",$asi:null,$isf:1,$asf:null},
"+List":0,
b3:{"^":"a;",
gp:function(a){return P.a.prototype.gp.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
ak:{"^":"a;"},
"+num":0,
a:{"^":";",
q:function(a,b){return this===b},
gp:function(a){return H.E(this)},
i:function(a){return H.ax(this)},
toString:function(){return this.i(this)}},
aA:{"^":"a;"},
z:{"^":"a;"},
"+String":0,
b7:{"^":"a;n<",
gj:function(a){return this.n.length},
i:function(a){var z=this.n
return z.charCodeAt(0)==0?z:z},
k:{
c7:function(a,b,c){var z=J.am(b)
if(!z.l())return a
if(c.length===0){do a+=H.d(z.gm())
while(z.l())}else{a+=H.d(z.gm())
for(;z.l();)a=a+c+H.d(z.gm())}return a}}}}],["","",,W,{"^":"",
de:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(b,c){return c.toUpperCase()})},
fv:function(a){var z=$.j
if(z===C.b)return a
return z.b0(a,!0)},
O:{"^":"bA;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
ht:{"^":"O;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
hv:{"^":"O;",
i:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
hw:{"^":"O;",$ise:1,"%":"HTMLBodyElement"},
dc:{"^":"dv;j:length=",
ad:function(a,b){var z,y
z=$.$get$bt()
y=z[b]
if(typeof y==="string")return y
y=W.de(b) in a?b:P.dh()+b
z[b]=y
return y},
am:function(a,b,c,d){a.setProperty(b,c,d)},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
dv:{"^":"e+dd;"},
dd:{"^":"a;"},
hx:{"^":"e;",
i:function(a){return String(a)},
"%":"DOMException"},
bA:{"^":"e_;",
i:function(a){return a.localName},
$ise:1,
"%":";Element"},
bC:{"^":"e;",
bD:function(a,b,c,d){return a.addEventListener(b,H.a7(c,1),!1)},
"%":"MediaStream;EventTarget"},
hP:{"^":"O;j:length=","%":"HTMLFormElement"},
hR:{"^":"O;",$ise:1,"%":"HTMLInputElement"},
i5:{"^":"e;",$ise:1,"%":"Navigator"},
e_:{"^":"bC;",
i:function(a){var z=a.nodeValue
return z==null?this.bu(a):z},
"%":"Document|HTMLDocument;Node"},
i8:{"^":"O;j:length=","%":"HTMLSelectElement"},
ig:{"^":"bC;",$ise:1,"%":"DOMWindow|Window"},
im:{"^":"O;",$ise:1,"%":"HTMLFrameSetElement"},
eE:{"^":"c6;$ti",
av:function(a,b,c,d){return W.ag(this.a,this.b,a,!1,H.B(this,0))}},
ik:{"^":"eE;a,b,c,$ti"},
eF:{"^":"ed;a,b,c,d,e,$ti",
bU:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.cZ(x,this.c,z,!1)}},
bB:function(a,b,c,d,e){this.bU()},
k:{
ag:function(a,b,c,d,e){var z=W.fv(new W.eG(c))
z=new W.eF(0,a,b,z,!1,[e])
z.bB(a,b,c,!1,e)
return z}}},
eG:{"^":"b:2;a",
$1:function(a){return this.a.$1(a)}}}],["","",,P,{"^":"",
bz:function(){var z=$.by
if(z==null){z=J.aN(window.navigator.userAgent,"Opera",0)
$.by=z}return z},
dh:function(){var z,y
z=$.bv
if(z!=null)return z
y=$.bw
if(y==null){y=J.aN(window.navigator.userAgent,"Firefox",0)
$.bw=y}if(y)z="-moz-"
else{y=$.bx
if(y==null){y=!P.bz()&&J.aN(window.navigator.userAgent,"Trident/",0)
$.bx=y}if(y)z="-ms-"
else z=P.bz()?"-o-":"-webkit-"}$.bv=z
return z}}],["","",,P,{"^":""}],["","",,P,{"^":"",eV:{"^":"a;",
ct:function(a){if(a<=0||a>4294967296)throw H.c(P.e4("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}}}],["","",,P,{"^":"",hs:{"^":"ac;",$ise:1,"%":"SVGAElement"},hu:{"^":"k;",$ise:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},hy:{"^":"k;",$ise:1,"%":"SVGFEBlendElement"},hz:{"^":"k;",$ise:1,"%":"SVGFEColorMatrixElement"},hA:{"^":"k;",$ise:1,"%":"SVGFEComponentTransferElement"},hB:{"^":"k;",$ise:1,"%":"SVGFECompositeElement"},hC:{"^":"k;",$ise:1,"%":"SVGFEConvolveMatrixElement"},hD:{"^":"k;",$ise:1,"%":"SVGFEDiffuseLightingElement"},hE:{"^":"k;",$ise:1,"%":"SVGFEDisplacementMapElement"},hF:{"^":"k;",$ise:1,"%":"SVGFEFloodElement"},hG:{"^":"k;",$ise:1,"%":"SVGFEGaussianBlurElement"},hH:{"^":"k;",$ise:1,"%":"SVGFEImageElement"},hI:{"^":"k;",$ise:1,"%":"SVGFEMergeElement"},hJ:{"^":"k;",$ise:1,"%":"SVGFEMorphologyElement"},hK:{"^":"k;",$ise:1,"%":"SVGFEOffsetElement"},hL:{"^":"k;",$ise:1,"%":"SVGFESpecularLightingElement"},hM:{"^":"k;",$ise:1,"%":"SVGFETileElement"},hN:{"^":"k;",$ise:1,"%":"SVGFETurbulenceElement"},hO:{"^":"k;",$ise:1,"%":"SVGFilterElement"},ac:{"^":"k;",$ise:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},hQ:{"^":"ac;",$ise:1,"%":"SVGImageElement"},hU:{"^":"k;",$ise:1,"%":"SVGMarkerElement"},hV:{"^":"k;",$ise:1,"%":"SVGMaskElement"},i6:{"^":"k;",$ise:1,"%":"SVGPatternElement"},i7:{"^":"k;",$ise:1,"%":"SVGScriptElement"},k:{"^":"bA;",$ise:1,"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},ia:{"^":"ac;",$ise:1,"%":"SVGSVGElement"},ib:{"^":"k;",$ise:1,"%":"SVGSymbolElement"},eg:{"^":"ac;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},ic:{"^":"eg;",$ise:1,"%":"SVGTextPathElement"},id:{"^":"ac;",$ise:1,"%":"SVGUseElement"},ie:{"^":"k;",$ise:1,"%":"SVGViewElement"},il:{"^":"k;",$ise:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},io:{"^":"k;",$ise:1,"%":"SVGCursorElement"},ip:{"^":"k;",$ise:1,"%":"SVGFEDropShadowElement"},iq:{"^":"k;",$ise:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,A,{"^":"",a9:{"^":"dS;a,b,c,$ti",
gj:function(a){return this.c.length},
h:function(a,b){return this.c[b]},
aY:function(a,b,c){var z
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
if(d){z=this.aY(a,0,this.a)
y=this.aY(b,0,this.b)}else{if(a<0||a>this.a-1||b<0||b>this.b-1)return
y=b
z=a}this.c[z+y*this.a]=c},
bW:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
y=this.b
x=A.aq(z,y,!1,P.bh)
for(w=0;w<y;w=u)for(v=w-1,u=w+1,t=0;t<z;++t)if(C.c.a9(a,this.u(t,w,b,null)))for(s=t-1,r=t+1,q=v;q<=u;++q)for(p=s;p<=r;++p)x.R(p,q,!0,b)
return x},
bV:function(a,b){return this.bW(a,b,null)},
$isi:1,
k:{
aq:function(a,b,c,d){var z,y,x
z=a*b
y=P.dU(z,c,!1,d)
if(a===0)return new A.a9(0,b,[],[null])
x=a>0&&!0
z=x?C.a.bw(z,a):0
return new A.a9(a,z,y,[null])}}}}],["","",,Y,{"^":"",dr:{"^":"a;a,b,c,d,e,f",k:{
ds:function(a,b,c,d,e){var z=new H.er(e,new Y.dt(),[H.B(e,0)])
return new Y.dr(a,b,c,d,e,z.gj(z))}}},dt:{"^":"b:2;",
$1:function(a){return a}}}],["","",,S,{"^":"",d3:{"^":"a;"}}],["","",,K,{"^":"",v:{"^":"a;a,b",
i:function(a){return this.b}},dZ:{"^":"d3;a,b,c,$ti",
bj:function(a,b){var z,y,x,w,v,u,t,s
z=A.aq(a,b,null,H.B(this,0))
y=-C.j.N(a/2)
x=-C.j.N(b/2)
for(w=this.c,v=this.b,u=0;u<a;++u)for(t=u+y,s=0;s<b;++s)z.R(u,s,$.$get$bU().h(0,this.a).$2(t,(s+x)*-1)?v:w,!0)
return z}},fD:{"^":"b:3;",
$2:function(a,b){return C.y.ct(2)===0}},fE:{"^":"b:3;",
$2:function(a,b){return Math.cos(a*10)>Math.sin(b*10)}},fH:{"^":"b:3;",
$2:function(a,b){return b===0||C.a.E(a,b)===0}},fI:{"^":"b:3;",
$2:function(a,b){return b>0&&(C.a.E(a,b)&(a^b))>>>0>2}},fJ:{"^":"b:3;",
$2:function(a,b){return C.a.E((a^b)>>>0,8)===0}},fK:{"^":"b:3;",
$2:function(a,b){return C.r.E(Math.abs((a^b)>>>0),8)<4}},fL:{"^":"b:3;",
$2:function(a,b){return(a^b)>>>0>~a>>>0&&b<=0}},fM:{"^":"b:3;",
$2:function(a,b){return((a^b)>>>0)+a>=0}},fN:{"^":"b:3;",
$2:function(a,b){return((a^b)>>>0)+a-b===0}},fO:{"^":"b:3;",
$2:function(a,b){return C.a.E(((a^b)>>>0)+a-b,1024)===0}},fF:{"^":"b:3;",
$2:function(a,b){var z=((a^b)>>>0)+b-a
return z===0||z%b===0}}}],["","",,T,{"^":"",c4:{"^":"a;a,b",
i:function(a){return this.b}},e2:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch",
at:function(a,b){var z=0,y=P.db(),x=this,w
var $async$at=P.ft(function(c,d){if(c===1)return P.ff(d,y)
while(true)switch(z){case 0:x.d=a
w=U.hn(a,null)
x.b=w
x.c=w.b7(new T.e3(x))
return P.fg(null,y)}})
return P.fh($async$at,y)},
aW:function(){var z,y,x,w,v
z=this.a
z.bY()
y=this.Q
x=z.aq(!0,this.z)
if(y.b>=4)H.m(y.T())
y.S(x)
y=Date.now()
x=this.r
if(x!=null){w=y-x
if(w>0)this.f=(this.f+1/(w/1000))/2}this.r=y
y=z.a
x=y.length===0?0:z.t(0).a
if(C.a.E(x,C.j.N(2000/C.a.D(this.e.a,1000)))===0){x=$.$get$aF()
x.M(C.m,"Gen: "+(y.length===0?0:z.t(0).a)+" | Activity: "+z.gaZ()+"% | FPS: "+C.r.N(this.f)+"/"+C.j.N(1000/C.a.D(this.d.a,1000)),null,null)}if(C.a.E(y.length===0?0:z.t(0).a,20)===0)if(z.gcm()){++this.x
v=z.gaZ()
if(v>=5)z=v<10&&this.x>5||this.x>8
else z=!0
if(z){z=this.ch
if(z.b>=4)H.m(z.T())
z.S(C.V)}$.$get$aF().M(C.m,"Stable scene counter: x"+this.x+" World activity: "+v+"%",null,null)}else this.x=0}},e3:{"^":"b:14;a",
$1:function(a){return this.a.aW()}}}],["","",,E,{"^":"",d4:{"^":"a;"}}],["","",,G,{"^":"",br:{"^":"a;a,b",
i:function(a){return this.b}},d6:{"^":"d4;a,b,c,d,e,f,r",
cD:function(a){var z,y,x,w,v,u,t
for(z=a.a,y=a.b,x=0;x<z;++x)for(w=0;w<y;++w){if(a.a4(x,w)==null)continue
v=this.f
v.fillStyle=a.a4(x,w)
u=this.c
t=this.d
v.fillRect(x*u,w*t,u,t)}}}}],["","",,B,{"^":"",d5:{"^":"a;"}}],["","",,X,{"^":"",H:{"^":"a;a,b",
i:function(a){return this.b}},dp:{"^":"d5;d,a,b,c",
c_:function(a,b,c){var z,y,x,w,v,u,t,s
z=c.a4(a,b)
y=this.a
x=this.b
switch("moore"){case"moore":default:w=a-1
v=b-1
u=a+1
t=b+1}s=C.c.cc([c.u(w,v,y,x),c.u(a,v,y,x),c.u(u,v,y,x),c.u(w,b,y,x),c.u(u,b,y,x),c.u(w,t,y,x),c.u(a,t,y,x),c.u(u,t,y,x)],0,new X.dq(this))
switch(z){case C.i:case C.e:y=J.cL(s)
if(y.J(s,2))return C.k
if(C.c.a9([2,3],s))return C.i
if(y.P(s,3))return C.l
break
case C.h:case C.k:case C.l:if(J.Y(s,3))return C.e
break}return z}},dq:{"^":"b:15;a",
$2:function(a,b){return J.cW(a,this.a.d.h(0,b))}}}],["","",,L,{"^":"",eb:{"^":"a;a,b,c,d,e,$ti",
gcm:function(){var z,y,x,w,v
z=C.K.gca()
y=this.a
if(y.length>2)if(z.$2(this.t(0).e,this.t(1).e)&&z.$2(this.t(0).e,this.t(2).e))return!0
if(y.length>60)for(x=1;x<=30;++x){v=0
while(!0){if(!(v<2)){w=!0
break}if(this.t(v).f!==this.t(v+x*v).f){w=!1
break}++v}if(w){$.$get$cA().M(C.m,"Stable scene detected! Repeating pattern "+x,null,null)
return!0}}return!1},
gaZ:function(){if(this.a.length===0)return 100
if(this.t(0).f===0)return 0
return C.j.N(this.t(0).f/(this.c*this.d)*100)},
t:function(a){var z,y
z=this.a
y=z.length-1
if(y<a)return
return z[y-a]},
O:function(){return this.t(0)},
aq:function(a,b){var z,y,x,w,v,u,t,s
z=this.c
y=this.d
x=A.aq(z,y,null,null)
for(w=this.e,v=this.a,u=0;u<z;++u)for(t=0;t<y;++t){s=this.O().d.u(u,t,w.a,w.b)
if(v.length>1&&a&&J.Y(s,this.t(1).d.u(u,t,w.a,w.b)))continue
x.R(u,t,b.h(0,s),w.a)}return x},
ba:function(a){var z,y
z=this.O()
z=z==null?z:z.a
if(z==null)z=0
y=this.a
y.push(Y.ds(z+1,this.c,this.d,a,a.bV([C.e,C.i],this.e.a)))
if(y.length>this.b)C.c.cC(y,0,1)
return},
bZ:function(a){var z,y,x,w,v,u
z=this.c
y=this.d
x=A.aq(z,y,null,H.B(this,0))
for(w=this.e,v=0;v<z;++v)for(u=0;u<y;++u)if(this.O().e.a4(v,u))x.R(v,u,w.c_(v,u,this.O().d),w.a)
else x.R(v,u,this.O().d.u(v,u,w.a,null),w.a)
this.ba(x)},
bY:function(){return this.bZ(null)}}}],["","",,U,{"^":"",
hn:function(a,b){var z,y,x,w,v
z={}
z.a=null
z.b=null
z.c=0
y=new U.ho(z,a,new U.hq(z,b))
x=new U.hp(z)
w=P.h
v=new P.ba(null,0,null,y,x,y,x,[w])
z.a=v
return new P.bb(v,[w])},
hq:{"^":"b:16;a,b",
$1:function(a){var z,y
z=this.a
y=++z.c
z=z.a
if(z.b>=4)H.m(z.T())
z.S(y)}},
ho:{"^":"b:1;a,b,c",
$0:function(){this.a.b=P.en(this.b,this.c)}},
hp:{"^":"b:1;a",
$0:function(){var z,y
z=this.a
y=z.b
if(y!=null){y.c0()
z.b=null}}}}],["","",,U,{"^":"",dg:{"^":"a;$ti"},bM:{"^":"a;a,$ti",
cL:[function(a,b){var z,y,x,w
if(a===b)return!0
z=a.c
y=z.length
x=b.c
if(y!==x.length)return!1
for(w=0;w<y;++w)if(!J.Y(z[w],x[w]))return!1
return!0},"$2","gca",4,0,function(){return H.fP(function(a){return{func:1,ret:P.bh,args:[[P.i,a],[P.i,a]]}},this.$receiver,"bM")}]}}],["","",,N,{"^":"",aZ:{"^":"a;a,b,c,d,e,f",
gb4:function(){var z,y,x
z=this.b
y=z==null||z.a===""
x=this.a
return y?x:z.gb4()+"."+x},
gb6:function(){if($.cO){var z=this.b
if(z!=null)return z.gb6()}return $.fq},
cr:function(a,b,c,d,e){var z,y,x,w,v,u
x=a.b
if(x>=this.gb6().b){if(!!J.l(b).$isaT)b=b.$0()
w=b
if(typeof w!=="string")b=J.Z(b)
if(d==null&&x>=$.hh.b)try{x="autogenerated stack trace for "+a.i(0)+" "+H.d(b)
throw H.c(x)}catch(v){z=H.u(v)
y=H.t(v)
d=y
if(c==null)c=z}this.gb4()
Date.now()
$.bP=$.bP+1
if($.cO)for(u=this;u!=null;)u=u.b
else $.$get$bR().f}},
M:function(a,b,c,d){return this.cr(a,b,c,d,null)},
k:{
P:function(a){return $.$get$bQ().cz(a,new N.fC(a))}}},fC:{"^":"b:0;a",
$0:function(){var z,y,x,w
z=this.a
if(C.f.bs(z,"."))H.m(P.aO("name shouldn't start with a '.'"))
y=C.f.cp(z,".")
if(y===-1)x=z!==""?N.P(""):null
else{x=N.P(C.f.aB(z,0,y))
z=C.f.aA(z,y+1)}w=new H.y(0,null,null,null,null,null,0,[P.z,N.aZ])
w=new N.aZ(z,x,null,w,new P.eq(w,[null,null]),null)
if(x!=null)x.d.w(0,z,w)
return w}},au:{"^":"a;a,b",
q:function(a,b){if(b==null)return!1
return b instanceof N.au&&this.b===b.b},
J:function(a,b){return C.a.J(this.b,b.gcJ(b))},
P:function(a,b){return C.a.P(this.b,b.gcJ(b))},
gp:function(a){return this.b},
i:function(a){return this.a}}}],["","",,A,{"^":"",
iw:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=X.H
y=P.dQ(P.D([C.h,"#000",C.k,"#483D8B",C.l,"#00008B",C.i,"#FF69B4",C.e,"#FFC0CB"]),z,P.z)
x=new X.dp(P.D([C.i,1,C.e,1,C.h,0,C.k,0,C.l,0]),null,null,null)
w=new L.eb([],62,64,64,x,[z])
x.a=!0
x.b=C.h
x=P.di(0,0,0,50,0,0)
$.$get$cy().M(C.n,"Generator: MathematicalGenerators.RANDOM",null,null)
v=A.a9
u=new P.ba(null,0,null,null,null,null,null,[v])
t=new T.e2(w,null,null,null,x,0,null,0,null,y,u,new P.ba(null,0,null,null,null,null,null,[T.c4]))
$.$get$aF().M(C.n,"Max Age: null",null,null)
w.ba(new K.dZ(C.v,C.e,C.h,[z]).bj(64,64))
z=w.aq(!0,y)
if(u.b>=4)H.m(u.T())
u.S(z)
s=new G.d6(64,64,null,null,null,null,null)
z=document
r=z.querySelector("#canvas")
$.$get$cz().M(C.n,"Canvas: 64x64 (512x512px)",null,null)
s.r=!1
r.width=64
r.height=64
s.e=r
s.c=1
s.d=1
s.f=r.getContext("2d")
switch(C.p){case C.p:w=r.style
C.d.am(w,(w&&C.d).ad(w,"image-rendering"),"pixelated","")
C.d.am(w,C.d.ad(w,"image-rendering"),"optimizespeed","")
w.width="512px"
w.height="512px"
break
case C.z:w=r.style
C.d.am(w,(w&&C.d).ad(w,"image-rendering"),"pixelated","")
w.width="100%"
w.height="100%"
w.position="fixed"
w.top="0px"
w.left="0px"
w.right="0px"
w.bottom="0px"
break}new P.bb(u,[v]).b7(new A.h9(s))
q=z.querySelector("#controls_back")
p=z.querySelector("#controls_pause")
o=z.querySelector("#controls_play")
n=z.querySelector("#controls_forward")
p.toString
z=W.hW
W.ag(p,"click",new A.ha(t),!1,z)
o.toString
W.ag(o,"click",new A.hb(t),!1,z)
q.toString
W.ag(q,"click",new A.hc(t),!1,z)
n.toString
W.ag(n,"click",new A.hd(t),!1,z)
t.at(x,null)},"$0","cK",0,0,1],
h9:{"^":"b:17;a",
$1:function(a){this.a.cD(a)}},
ha:{"^":"b:2;a",
$1:function(a){var z=this.a.c
return z.e<128?z.ab(0):null}},
hb:{"^":"b:2;a",
$1:function(a){var z=this.a.c
return z.e>=128?z.aw():null}},
hc:{"^":"b:2;a",
$1:function(a){var z,y,x
z=this.a
y=z.c
if(y.e<128)y.ab(0)
y=z.a
x=y.a
if(x.length>1)x.pop()
x=z.Q
z=y.aq(!1,z.z)
if(x.b>=4)H.m(x.T())
x.S(z)
return}},
hd:{"^":"b:2;a",
$1:function(a){var z,y
z=this.a
y=z.c
if(y.e<128)y.ab(0)
z.aW()
return}}},1]]
setupProgram(dart,0)
J.l=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bK.prototype
return J.bJ.prototype}if(typeof a=="string")return J.at.prototype
if(a==null)return J.bL.prototype
if(typeof a=="boolean")return J.dH.prototype
if(a.constructor==Array)return J.ad.prototype
if(typeof a!="object"){if(typeof a=="function")return J.af.prototype
return a}if(a instanceof P.a)return a
return J.aI(a)}
J.F=function(a){if(typeof a=="string")return J.at.prototype
if(a==null)return a
if(a.constructor==Array)return J.ad.prototype
if(typeof a!="object"){if(typeof a=="function")return J.af.prototype
return a}if(a instanceof P.a)return a
return J.aI(a)}
J.bj=function(a){if(a==null)return a
if(a.constructor==Array)return J.ad.prototype
if(typeof a!="object"){if(typeof a=="function")return J.af.prototype
return a}if(a instanceof P.a)return a
return J.aI(a)}
J.cL=function(a){if(typeof a=="number")return J.ae.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.aC.prototype
return a}
J.fT=function(a){if(typeof a=="number")return J.ae.prototype
if(typeof a=="string")return J.at.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.aC.prototype
return a}
J.fU=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.af.prototype
return a}if(a instanceof P.a)return a
return J.aI(a)}
J.cW=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.fT(a).a3(a,b)}
J.Y=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.l(a).q(a,b)}
J.cX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cL(a).J(a,b)}
J.cY=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.h7(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.F(a).h(a,b)}
J.cZ=function(a,b,c,d){return J.fU(a).bD(a,b,c,d)}
J.aN=function(a,b,c){return J.F(a).c3(a,b,c)}
J.d_=function(a,b){return J.bj(a).I(a,b)}
J.al=function(a){return J.l(a).gp(a)}
J.am=function(a){return J.bj(a).gv(a)}
J.an=function(a){return J.F(a).gj(a)}
J.d0=function(a,b){return J.bj(a).b9(a,b)}
J.Z=function(a){return J.l(a).i(a)}
var $=I.p
C.d=W.dc.prototype
C.A=J.e.prototype
C.c=J.ad.prototype
C.j=J.bJ.prototype
C.a=J.bK.prototype
C.B=J.bL.prototype
C.r=J.ae.prototype
C.f=J.at.prototype
C.I=J.af.prototype
C.w=J.e1.prototype
C.o=J.aC.prototype
C.y=new P.eV()
C.b=new P.f4()
C.z=new G.br(0,"CanvasDisplayMode.FULLSCREEN")
C.p=new G.br(1,"CanvasDisplayMode.FIXED")
C.q=new P.aa(0)
C.h=new X.H(0,"GameOfLifeStates.DEAD")
C.i=new X.H(1,"GameOfLifeStates.ALIVE")
C.k=new X.H(2,"GameOfLifeStates.DEAD_UNDER_POPULATED")
C.l=new X.H(3,"GameOfLifeStates.DEAD_OVER_POPULATED")
C.e=new X.H(4,"GameOfLifeStates.ALIVE_BORN")
C.C=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.D=function(hooks) {
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

C.E=function(getTagFallback) {
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
C.F=function() {
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
C.G=function(hooks) {
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
C.H=function(hooks) {
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
C.n=new N.au("FINE",500)
C.m=new N.au("INFO",800)
C.J=new N.au("OFF",2000)
C.x=new U.dg([null])
C.K=new U.bM(C.x,[null])
C.v=new K.v(0,"MathematicalGenerators.RANDOM")
C.L=new K.v(1,"MathematicalGenerators.CELLS")
C.M=new K.v(10,"MathematicalGenerators.SIERPINSKI_MOUNTAINS")
C.N=new K.v(2,"MathematicalGenerators.X_MOD_Y")
C.O=new K.v(3,"MathematicalGenerators.ARCS")
C.P=new K.v(4,"MathematicalGenerators.DIAGONAL_STRIPES")
C.Q=new K.v(5,"MathematicalGenerators.BLOCKS")
C.R=new K.v(6,"MathematicalGenerators.BLOCKS2")
C.S=new K.v(7,"MathematicalGenerators.CHESS")
C.T=new K.v(8,"MathematicalGenerators.ENDLESS_SIERPINSKI")
C.U=new K.v(9,"MathematicalGenerators.SIERPINSKI_LEVEL10")
C.V=new T.c4(0,"SimulationCompleteReason.stable")
$.c1="$cachedFunction"
$.c2="$cachedInvocation"
$.w=0
$.a_=null
$.bp=null
$.bk=null
$.cF=null
$.cS=null
$.aH=null
$.aK=null
$.bl=null
$.U=null
$.a3=null
$.a4=null
$.be=!1
$.j=C.b
$.bD=0
$.by=null
$.bx=null
$.bw=null
$.bv=null
$.cO=!1
$.hh=C.J
$.fq=C.m
$.bP=0
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
I.$lazy(y,x,w)}})(["bu","$get$bu",function(){return H.cM("_$dart_dartClosure")},"aV","$get$aV",function(){return H.cM("_$dart_js")},"bF","$get$bF",function(){return H.dC()},"bG","$get$bG",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.bD
$.bD=z+1
z="expando$key$"+z}return new P.dn(null,z)},"cb","$get$cb",function(){return H.A(H.aB({
toString:function(){return"$receiver$"}}))},"cc","$get$cc",function(){return H.A(H.aB({$method$:null,
toString:function(){return"$receiver$"}}))},"cd","$get$cd",function(){return H.A(H.aB(null))},"ce","$get$ce",function(){return H.A(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ci","$get$ci",function(){return H.A(H.aB(void 0))},"cj","$get$cj",function(){return H.A(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cg","$get$cg",function(){return H.A(H.ch(null))},"cf","$get$cf",function(){return H.A(function(){try{null.$method$}catch(z){return z.message}}())},"cl","$get$cl",function(){return H.A(H.ch(void 0))},"ck","$get$ck",function(){return H.A(function(){try{(void 0).$method$}catch(z){return z.message}}())},"b9","$get$b9",function(){return P.et()},"a6","$get$a6",function(){return[]},"bt","$get$bt",function(){return{}},"cy","$get$cy",function(){return N.P("cellular_automata.generators.mathematical")},"bU","$get$bU",function(){return P.D([C.v,new K.fD(),C.L,new K.fE(),C.N,new K.fH(),C.O,new K.fI(),C.P,new K.fJ(),C.S,new K.fK(),C.Q,new K.fL(),C.R,new K.fM(),C.T,new K.fN(),C.U,new K.fO(),C.M,new K.fF()])},"aF","$get$aF",function(){return N.P("cellular_automata.player")},"cz","$get$cz",function(){return N.P("cellular_automata.renderers.canvas")},"cA","$get$cA",function(){return N.P("cellular_automata.simulator")},"bR","$get$bR",function(){return N.P("")},"bQ","$get$bQ",function(){return P.dP(P.z,N.aZ)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,args:[P.h,P.h]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.a],opt:[P.aA]},{func:1,args:[,,]},{func:1,ret:P.z,args:[P.h]},{func:1,args:[,P.z]},{func:1,args:[P.z]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,P.aA]},{func:1,args:[P.h,,]},{func:1,args:[,],opt:[,]},{func:1,args:[P.h]},{func:1,args:[,X.H]},{func:1,v:true,args:[,]},{func:1,args:[A.a9]}]
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
if(x==y)H.hm(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.cU(A.cK(),b)},[])
else (function(b){H.cU(A.cK(),b)})([])})})()