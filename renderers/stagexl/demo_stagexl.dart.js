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
b5.$isc=b4
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
var d=supportsDirectProtoAccess&&b1!="c"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="l"){processStatics(init.statics[b1]=b2.l,b3)
delete b2.l}else if(a1===43){w[g]=a0.substring(1)
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
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cO"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cO"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cO(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.H=function(){}
var dart=[["","",,H,{"^":"",mj:{"^":"c;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
bY:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bV:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cT==null){H.l6()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(new P.ej("Return interceptor for "+H.f(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$cb()]
if(v!=null)return v
v=H.lf(a)
if(v!=null)return v
if(typeof a=="function")return C.aa
y=Object.getPrototypeOf(a)
if(y==null)return C.H
if(y===Object.prototype)return C.H
if(typeof w=="function"){Object.defineProperty(w,$.$get$cb(),{value:C.z,enumerable:false,writable:true,configurable:true})
return C.z}return C.z},
e:{"^":"c;",
q:function(a,b){return a===b},
gn:function(a){return H.a0(a)},
j:["dL",function(a){return H.bv(a)}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationTimeline|AppBannerPromptResult|AudioListener|AudioParam|BarProp|Bluetooth|BluetoothAdvertisingData|BluetoothCharacteristicProperties|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|CHROMIUMSubscribeUniform|CHROMIUMValuebuffer|CSS|Cache|CacheStorage|CalcLength|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|CircularGeofencingRegion|Clients|CompositorProxy|ConsoleBase|Coordinates|Credential|CredentialsContainer|Crypto|CryptoKey|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMPoint|DOMPointReadOnly|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceAcceleration|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTColorBufferFloat|EXTDisjointTimerQuery|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|EffectModel|Entry|EntrySync|FederatedCredential|FileEntry|FileEntrySync|FileError|FileReaderSync|FileWriterSync|FontFace|FormData|GamepadButton|Geofencing|GeofencingRegion|Geolocation|Geoposition|HMDVRDevice|HTMLAllCollection|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|ImageData|InjectedScriptHost|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|Iterator|KeyframeEffect|KeywordValue|LengthValue|MIDIInputMap|MIDIOutputMap|MediaDeviceInfo|MediaDevices|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaMetadata|MediaSession|MemoryInfo|MessageChannel|Metadata|MutationObserver|MutationRecord|NFC|NavigatorStorageUtils|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NumberValue|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvas|PagePopupController|PasswordCredential|PerformanceCompositeTiming|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceObserver|PerformanceObserverEntryList|PerformanceRenderTiming|PerformanceResourceTiming|PerformanceTiming|PeriodicWave|Permissions|PositionError|PositionSensorVRDevice|PositionValue|Presentation|PushManager|PushMessageData|PushSubscription|RTCCertificate|RTCIceCandidate|RTCSessionDescription|RTCStatsReport|RTCStatsResponse|Range|ReadableByteStream|ReadableByteStreamReader|ReadableStreamReader|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPoint|SVGPreserveAspectRatio|SVGRect|SVGUnitTypes|Screen|ScrollState|Selection|ServicePort|SharedArrayBuffer|SimpleLength|SourceInfo|SpeechRecognitionAlternative|SpeechSynthesisVoice|StorageInfo|StorageManager|StorageQuota|Stream|StyleMedia|StylePropertyMap|StyleValue|SubtleCrypto|SyncManager|TextMetrics|TrackDefault|TransformValue|TreeWalker|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRDevice|VREyeParameters|VRFieldOfView|VRPositionState|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGLActiveInfo|WebGLBuffer|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WorkerConsole|Worklet|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
hQ:{"^":"e;",
j:function(a){return String(a)},
gn:function(a){return a?519018:218159},
$iscN:1},
dv:{"^":"e;",
q:function(a,b){return null==b},
j:function(a){return"null"},
gn:function(a){return 0}},
cc:{"^":"e;",
gn:function(a){return 0},
j:["dM",function(a){return String(a)}],
$ishR:1},
il:{"^":"cc;"},
bI:{"^":"cc;"},
b9:{"^":"cc;",
j:function(a){var z=a[$.$get$d7()]
return z==null?this.dM(a):J.aI(z)},
$isc9:1,
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
b7:{"^":"e;$ti",
eQ:function(a,b){if(!!a.immutable$list)throw H.d(new P.l(b))},
aM:function(a,b){if(!!a.fixed$length)throw H.d(new P.l(b))},
aV:function(a,b){this.aM(a,"removeAt")
if(b<0||b>=a.length)throw H.d(P.bb(b,null,null))
return a.splice(b,1)[0]},
N:function(a,b){var z
this.aM(a,"remove")
for(z=0;z<a.length;++z)if(J.a5(a[z],b)){a.splice(z,1)
return!0}return!1},
W:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(new P.Y(a))}},
d5:function(a,b){return new H.dG(a,b,[H.I(a,0),null])},
ff:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.d(new P.Y(a))}return y},
m:function(a,b){return a[b]},
gfc:function(a){if(a.length>0)return a[0]
throw H.d(H.dq())},
fM:function(a,b,c){this.aM(a,"removeRange")
P.bc(b,c,a.length,null,null,null)
a.splice(b,c-b)},
J:function(a,b,c,d,e){var z,y
this.eQ(a,"setRange")
P.bc(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.q(P.a1(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.d(H.dr())
if(e<b)for(y=z-1;y>=0;--y)a[b+y]=d[e+y]
else for(y=0;y<z;++y)a[b+y]=d[e+y]},
fm:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.a5(a[z],b))return z
return-1},
d0:function(a,b){return this.fm(a,b,0)},
aN:function(a,b){var z
for(z=0;z<a.length;++z)if(J.a5(a[z],b))return!0
return!1},
j:function(a){return P.bp(a,"[","]")},
gD:function(a){return new J.fh(a,a.length,0,null)},
gn:function(a){return H.a0(a)},
gi:function(a){return a.length},
si:function(a,b){this.aM(a,"set length")
if(b<0)throw H.d(P.a1(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.G(a,b))
if(b>=a.length||b<0)throw H.d(H.G(a,b))
return a[b]},
k:function(a,b,c){if(!!a.immutable$list)H.q(new P.l("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.d(H.G(a,b))
if(b>=a.length||b<0)throw H.d(H.G(a,b))
a[b]=c},
$isj:1,
$asj:I.H,
$isb:1,
$asb:null,
$isa:1,
$asa:null,
l:{
hP:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.d(P.c1(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.d(P.a1(a,0,4294967295,"length",null))
z=H.m(new Array(a),[b])
z.fixed$length=Array
return z}}},
mi:{"^":"b7;$ti"},
fh:{"^":"c;a,b,c,d",
gu:function(){return this.d},
t:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.aH(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
b8:{"^":"e;",
fe:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.d(new P.l(""+a+".floor()"))},
p:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(new P.l(""+a+".round()"))},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gn:function(a){return a&0x1FFFFFFF},
G:function(a,b){if(typeof b!=="number")throw H.d(H.aG(b))
return a+b},
H:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
ai:function(a,b){if(typeof b!=="number")throw H.d(H.aG(b))
if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.cq(a,b)},
U:function(a,b){return(a|0)===a?a/b|0:this.cq(a,b)},
cq:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.d(new P.l("Result of truncating division is "+H.f(z)+": "+H.f(a)+" ~/ "+b))},
T:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
a5:function(a,b){if(typeof b!=="number")throw H.d(H.aG(b))
return a<b},
ah:function(a,b){if(typeof b!=="number")throw H.d(H.aG(b))
return a>b},
$isF:1},
du:{"^":"b8;",$isF:1,$isi:1},
dt:{"^":"b8;",$isF:1},
bq:{"^":"e;",
c4:function(a,b){if(b>=a.length)throw H.d(H.G(a,b))
return a.charCodeAt(b)},
G:function(a,b){if(typeof b!=="string")throw H.d(P.c1(b,null,null))
return a+b},
dK:function(a,b,c){var z
if(c>a.length)throw H.d(P.a1(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
dJ:function(a,b){return this.dK(a,b,0)},
aG:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.d(P.bb(b,null,null))
if(b>c)throw H.d(P.bb(b,null,null))
if(c>a.length)throw H.d(P.bb(c,null,null))
return a.substring(b,c)},
bR:function(a,b){return this.aG(a,b,null)},
du:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.Y)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fF:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.du(c,z)+a},
aT:function(a,b){return this.fF(a,b," ")},
fA:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
fz:function(a,b){return this.fA(a,b,null)},
j:function(a){return a},
gn:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gi:function(a){return a.length},
h:function(a,b){if(b>=a.length||!1)throw H.d(H.G(a,b))
return a[b]},
$isj:1,
$asj:I.H,
$isp:1}}],["","",,H,{"^":"",
dq:function(){return new P.C("No element")},
dr:function(){return new P.C("Too few elements")},
a:{"^":"U;$ti",$asa:null},
ba:{"^":"a;$ti",
gD:function(a){return new H.dB(this,this.gi(this),0,null)},
bK:function(a,b){var z,y
z=H.m([],[H.X(this,"ba",0)])
C.b.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y)z[y]=this.m(0,y)
return z},
fQ:function(a){return this.bK(a,!0)}},
iY:{"^":"ba;a,b,c,$ti",
geb:function(){var z=J.aq(this.a)
return z},
geA:function(){var z,y
z=J.aq(this.a)
y=this.b
if(y>z)return z
return y},
gi:function(a){var z,y
z=J.aq(this.a)
y=this.b
if(y>=z)return 0
return z-y},
m:function(a,b){var z=this.geA()+b
if(b<0||z>=this.geb())throw H.d(P.w(b,this,"index",null,null))
return J.cY(this.a,z)},
bK:function(a,b){var z,y,x,w,v,u,t
z=this.b
y=this.a
x=J.R(y)
w=x.gi(y)
v=w-z
if(v<0)v=0
u=H.m(new Array(v),this.$ti)
for(t=0;t<v;++t){u[t]=x.m(y,z+t)
if(x.gi(y)<w)throw H.d(new P.Y(this))}return u}},
dB:{"^":"c;a,b,c,d",
gu:function(){return this.d},
t:function(){var z,y,x,w
z=this.a
y=J.R(z)
x=y.gi(z)
if(this.b!==x)throw H.d(new P.Y(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.m(z,w);++this.c
return!0}},
dF:{"^":"U;a,b,$ti",
gD:function(a){return new H.i6(null,J.bi(this.a),this.b,this.$ti)},
gi:function(a){return J.aq(this.a)},
$asU:function(a,b){return[b]},
l:{
ch:function(a,b,c,d){if(!!a.$isa)return new H.fH(a,b,[c,d])
return new H.dF(a,b,[c,d])}}},
fH:{"^":"dF;a,b,$ti",$isa:1,
$asa:function(a,b){return[b]}},
i6:{"^":"ds;a,b,c,$ti",
t:function(){var z=this.b
if(z.t()){this.a=this.c.$1(z.gu())
return!0}this.a=null
return!1},
gu:function(){return this.a}},
dG:{"^":"ba;a,b,$ti",
gi:function(a){return J.aq(this.a)},
m:function(a,b){return this.b.$1(J.cY(this.a,b))},
$asba:function(a,b){return[b]},
$asa:function(a,b){return[b]},
$asU:function(a,b){return[b]}},
jb:{"^":"U;a,b,$ti",
gD:function(a){return new H.jc(J.bi(this.a),this.b,this.$ti)}},
jc:{"^":"ds;a,b,$ti",
t:function(){var z,y
for(z=this.a,y=this.b;z.t();)if(y.$1(z.gu()))return!0
return!1},
gu:function(){return this.a.gu()}},
dj:{"^":"c;$ti"}}],["","",,H,{"^":"",
bf:function(a,b){var z=a.ar(b)
if(!init.globalState.d.cy)init.globalState.f.az()
return z},
f8:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.o(y).$isb)throw H.d(P.O("Arguments to main must be a List: "+H.f(y)))
init.globalState=new H.k0(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dn()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.js(P.ce(null,H.be),0)
x=P.i
y.z=new H.B(0,null,null,null,null,null,0,[x,H.cF])
y.ch=new H.B(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.k_()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.hI,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.k1)}if(init.globalState.x)return
y=init.globalState.a++
w=P.aN(null,null,null,x)
v=new H.by(0,null,!1)
u=new H.cF(y,new H.B(0,null,null,null,null,null,0,[x,H.by]),w,init.createNewIsolate(),v,new H.as(H.c_()),new H.as(H.c_()),!1,!1,[],P.aN(null,null,null,null),null,null,!1,!0,P.aN(null,null,null,null))
w.a1(0,0)
u.c_(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.b0(a,{func:1,args:[,]}))u.ar(new H.ls(z,a))
else if(H.b0(a,{func:1,args:[,,]}))u.ar(new H.lt(z,a))
else u.ar(a)
init.globalState.f.az()},
hM:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.hN()
return},
hN:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.d(new P.l("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.d(new P.l('Cannot extract URI from "'+z+'"'))},
hI:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bL(!0,[]).a2(b.data)
y=J.R(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bL(!0,[]).a2(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bL(!0,[]).a2(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.i
p=P.aN(null,null,null,q)
o=new H.by(0,null,!1)
n=new H.cF(y,new H.B(0,null,null,null,null,null,0,[q,H.by]),p,init.createNewIsolate(),o,new H.as(H.c_()),new H.as(H.c_()),!1,!1,[],P.aN(null,null,null,null),null,null,!1,!0,P.aN(null,null,null,null))
p.a1(0,0)
n.c_(0,o)
init.globalState.f.a.R(0,new H.be(n,new H.hJ(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.az()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.fg(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.az()
break
case"close":init.globalState.ch.N(0,$.$get$dp().h(0,a))
a.terminate()
init.globalState.f.az()
break
case"log":H.hH(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.V(["command","print","msg",z])
q=new H.aD(!0,P.aV(null,P.i)).I(q)
y.toString
self.postMessage(q)}else P.bZ(y.h(z,"msg"))
break
case"error":throw H.d(y.h(z,"msg"))}},
hH:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.V(["command","log","msg",a])
x=new H.aD(!0,P.aV(null,P.i)).I(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.J(w)
z=H.M(w)
y=P.bn(z)
throw H.d(y)}},
hK:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dS=$.dS+("_"+y)
$.dT=$.dT+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.E(0,["spawned",new H.bO(y,x),w,z.r])
x=new H.hL(a,b,c,d,z)
if(e){z.cE(w,w)
init.globalState.f.a.R(0,new H.be(z,x,"start isolate"))}else x.$0()},
kn:function(a){return new H.bL(!0,[]).a2(new H.aD(!1,P.aV(null,P.i)).I(a))},
ls:{"^":"h:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
lt:{"^":"h:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
k0:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",l:{
k1:function(a){var z=P.V(["command","print","msg",a])
return new H.aD(!0,P.aV(null,P.i)).I(z)}}},
cF:{"^":"c;a,b,c,fv:d<,eT:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cE:function(a,b){if(!this.f.q(0,a))return
if(this.Q.a1(0,b)&&!this.y)this.y=!0
this.bi()},
fL:function(a){var z,y,x,w,v
if(!this.y)return
z=this.Q
z.N(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
x=init.globalState.f.a
w=x.b
v=x.a
w=(w-1&v.length-1)>>>0
x.b=w
v[w]=y
if(w===x.c)x.cg();++x.d}this.y=!1}this.bi()},
eK:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
fJ:function(a){var z,y,x
if(this.ch==null)return
for(z=J.o(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.q(new P.l("removeRange"))
P.bc(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dF:function(a,b){if(!this.r.q(0,a))return
this.db=b},
fi:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.E(0,c)
return}z=this.cx
if(z==null){z=P.ce(null,null)
this.cx=z}z.R(0,new H.jT(a,c))},
fh:function(a,b){var z
if(!this.r.q(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.bC()
return}z=this.cx
if(z==null){z=P.ce(null,null)
this.cx=z}z.R(0,this.gfw())},
fj:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bZ(a)
if(b!=null)P.bZ(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aI(a)
y[1]=b==null?null:b.j(0)
for(x=new P.eu(z,z.r,null,null),x.c=z.e;x.t();)x.d.E(0,y)},
ar:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.J(u)
v=H.M(u)
this.fj(w,v)
if(this.db){this.bC()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfv()
if(this.cx!=null)for(;t=this.cx,!t.gau(t);)this.cx.de().$0()}return y},
d4:function(a){return this.b.h(0,a)},
c_:function(a,b){var z=this.b
if(z.aO(0,a))throw H.d(P.bn("Registry: ports must be registered only once."))
z.k(0,a,b)},
bi:function(){var z=this.b
if(z.gi(z)-this.c.a>0||this.y||!this.x)init.globalState.z.k(0,this.a,this)
else this.bC()},
bC:[function(){var z,y,x
z=this.cx
if(z!=null)z.V(0)
for(z=this.b,y=z.gbM(z),y=y.gD(y);y.t();)y.gu().e5()
z.V(0)
this.c.V(0)
init.globalState.z.N(0,this.a)
this.dx.V(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].E(0,z[x+1])
this.ch=null}},"$0","gfw",0,0,2]},
jT:{"^":"h:2;a,b",
$0:function(){this.a.E(0,this.b)}},
js:{"^":"c;a,b",
eX:function(){var z=this.a
if(z.b===z.c)return
return z.de()},
dj:function(){var z,y,x
z=this.eX()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aO(0,init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.gau(y)}else y=!1
else y=!1
else y=!1
if(y)H.q(P.bn("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.gau(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.V(["command","close"])
x=new H.aD(!0,new P.ev(0,null,null,null,null,null,0,[null,P.i])).I(x)
y.toString
self.postMessage(x)}return!1}z.fI()
return!0},
cm:function(){if(self.window!=null)new H.jt(this).$0()
else for(;this.dj(););},
az:function(){var z,y,x,w,v
if(!init.globalState.x)this.cm()
else try{this.cm()}catch(x){z=H.J(x)
y=H.M(x)
w=init.globalState.Q
v=P.V(["command","error","msg",H.f(z)+"\n"+H.f(y)])
v=new H.aD(!0,P.aV(null,P.i)).I(v)
w.toString
self.postMessage(v)}}},
jt:{"^":"h:2;a",
$0:function(){if(!this.a.dj())return
P.j4(C.A,this)}},
be:{"^":"c;a,b,c",
fI:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.ar(this.b)}},
k_:{"^":"c;"},
hJ:{"^":"h:0;a,b,c,d,e,f",
$0:function(){H.hK(this.a,this.b,this.c,this.d,this.e,this.f)}},
hL:{"^":"h:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.b0(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.b0(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.bi()}},
em:{"^":"c;"},
bO:{"^":"em;b,a",
E:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.kn(b)
if(z.geT()===y){y=J.R(x)
switch(y.h(x,0)){case"pause":z.cE(y.h(x,1),y.h(x,2))
break
case"resume":z.fL(y.h(x,1))
break
case"add-ondone":z.eK(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fJ(y.h(x,1))
break
case"set-errors-fatal":z.dF(y.h(x,1),y.h(x,2))
break
case"ping":z.fi(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fh(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.a1(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.N(0,y)
break}return}init.globalState.f.a.R(0,new H.be(z,new H.k4(this,x),"receive"))},
q:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.bO){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gn:function(a){return this.b.a}},
k4:{"^":"h:0;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.dZ(0,this.b)}},
cH:{"^":"em;b,c,a",
E:function(a,b){var z,y,x
z=P.V(["command","message","port",this,"msg",b])
y=new H.aD(!0,P.aV(null,P.i)).I(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
q:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.cH){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gn:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
by:{"^":"c;a,b,c",
e5:function(){this.c=!0
this.b=null},
dZ:function(a,b){if(this.c)return
this.b.$1(b)},
$isit:1},
e6:{"^":"c;a,b,c",
a9:function(a){var z
if(self.setTimeout!=null){if(this.b)throw H.d(new P.l("Timer in event loop cannot be canceled."))
z=this.c
if(z==null)return;--init.globalState.f.b
if(this.a)self.clearTimeout(z)
else self.clearInterval(z)
this.c=null}else throw H.d(new P.l("Canceling a timer."))},
dU:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.ao(new H.j1(this,b),0),a)}else throw H.d(new P.l("Periodic timer."))},
dT:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.R(0,new H.be(y,new H.j2(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ao(new H.j3(this,b),0),a)}else throw H.d(new P.l("Timer greater than 0."))},
l:{
j_:function(a,b){var z=new H.e6(!0,!1,null)
z.dT(a,b)
return z},
j0:function(a,b){var z=new H.e6(!1,!1,null)
z.dU(a,b)
return z}}},
j2:{"^":"h:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
j3:{"^":"h:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
j1:{"^":"h:0;a,b",
$0:function(){this.b.$1(this.a)}},
as:{"^":"c;a",
gn:function(a){var z=this.a
z=C.a.T(z,0)^C.a.U(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
q:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.as){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aD:{"^":"c;a,b",
I:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.k(0,a,z.gi(z))
z=J.o(a)
if(!!z.$isdK)return["buffer",a]
if(!!z.$iscl)return["typed",a]
if(!!z.$isj)return this.dB(a)
if(!!z.$ishG){x=this.gdw()
w=z.gd2(a)
w=H.ch(w,x,H.X(w,"U",0),null)
w=P.cf(w,!0,H.X(w,"U",0))
z=z.gbM(a)
z=H.ch(z,x,H.X(z,"U",0),null)
return["map",w,P.cf(z,!0,H.X(z,"U",0))]}if(!!z.$ishR)return this.dC(a)
if(!!z.$ise)this.dq(a)
if(!!z.$isit)this.aC(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbO)return this.dD(a)
if(!!z.$iscH)return this.dE(a)
if(!!z.$ish){v=a.$static_name
if(v==null)this.aC(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isas)return["capability",a.a]
if(!(a instanceof P.c))this.dq(a)
return["dart",init.classIdExtractor(a),this.dA(init.classFieldsExtractor(a))]},"$1","gdw",2,0,1],
aC:function(a,b){throw H.d(new P.l((b==null?"Can't transmit:":b)+" "+H.f(a)))},
dq:function(a){return this.aC(a,null)},
dB:function(a){var z=this.dz(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aC(a,"Can't serialize indexable: ")},
dz:function(a){var z,y
z=[]
C.b.si(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.I(a[y])
return z},
dA:function(a){var z
for(z=0;z<a.length;++z)C.b.k(a,z,this.I(a[z]))
return a},
dC:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.aC(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.si(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.I(a[z[x]])
return["js-object",z,y]},
dE:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dD:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
bL:{"^":"c;a,b",
a2:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.d(P.O("Bad serialized message: "+H.f(a)))
switch(C.b.gfc(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.m(this.aq(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.m(this.aq(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.aq(z)
case"const":z=a[1]
this.b.push(z)
y=H.m(this.aq(z),[null])
y.fixed$length=Array
return y
case"map":return this.f_(a)
case"sendport":return this.f0(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.eZ(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.as(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.aq(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.d("couldn't deserialize: "+H.f(a))}},"$1","geY",2,0,1],
aq:function(a){var z
for(z=0;z<a.length;++z)C.b.k(a,z,this.a2(a[z]))
return a},
f_:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.dz()
this.b.push(x)
z=J.ff(z,this.geY()).fQ(0)
for(w=J.R(y),v=0;v<z.length;++v)x.k(0,z[v],this.a2(w.h(y,v)))
return x},
f0:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.d4(x)
if(u==null)return
t=new H.bO(u,y)}else t=new H.cH(z,x,y)
this.b.push(t)
return t},
eZ:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.R(z),v=J.R(y),u=0;u<w.gi(z);++u)x[w.h(z,u)]=this.a2(v.h(y,u))
return x}}}],["","",,H,{"^":"",
l0:function(a){return init.types[a]},
le:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.o(a).$isk},
f:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aI(a)
if(typeof z!=="string")throw H.d(H.aG(a))
return z},
a0:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dQ:function(a,b){throw H.d(new P.dk(a,null,null))},
ir:function(a,b,c){var z,y
H.kE(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.dQ(a,c)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.dQ(a,c)},
co:function(a){var z,y,x,w,v,u,t,s
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.a3||!!J.o(a).$isbI){v=C.D(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.f.c4(w,0)===36)w=C.f.bR(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.f3(H.bW(a),0,null),init.mangledGlobalNames)},
bv:function(a){return"Instance of '"+H.co(a)+"'"},
mH:[function(){return Date.now()},"$0","kr",0,0,28],
ip:function(){var z,y
if($.bw!=null)return
$.bw=1000
$.bx=H.kr()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.bw=1e6
$.bx=new H.iq(y)},
dR:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.d(H.aG(a))
return a[b]},
G:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ar(!0,b,"index",null)
z=J.aq(a)
if(b<0||b>=z)return P.w(b,a,"index",null,z)
return P.bb(b,"index",null)},
aG:function(a){return new P.ar(!0,a,null,null)},
kE:function(a){if(typeof a!=="string")throw H.d(H.aG(a))
return a},
d:function(a){var z
if(a==null)a=new P.cn()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.f9})
z.name=""}else z.toString=H.f9
return z},
f9:function(){return J.aI(this.dartException)},
q:function(a){throw H.d(a)},
aH:function(a){throw H.d(new P.Y(a))},
J:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.lz(a)
if(a==null)return
if(a instanceof H.c8)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.T(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cd(H.f(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.f(y)+" (Error "+w+")"
return z.$1(new H.dP(v,null))}}if(a instanceof TypeError){u=$.$get$e8()
t=$.$get$e9()
s=$.$get$ea()
r=$.$get$eb()
q=$.$get$ef()
p=$.$get$eg()
o=$.$get$ed()
$.$get$ec()
n=$.$get$ei()
m=$.$get$eh()
l=u.K(y)
if(l!=null)return z.$1(H.cd(y,l))
else{l=t.K(y)
if(l!=null){l.method="call"
return z.$1(H.cd(y,l))}else{l=s.K(y)
if(l==null){l=r.K(y)
if(l==null){l=q.K(y)
if(l==null){l=p.K(y)
if(l==null){l=o.K(y)
if(l==null){l=r.K(y)
if(l==null){l=n.K(y)
if(l==null){l=m.K(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dP(y,l==null?null:l.method))}}return z.$1(new H.j9(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.e1()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ar(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.e1()
return a},
M:function(a){var z
if(a instanceof H.c8)return a.b
if(a==null)return new H.ew(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ew(a,null)},
lo:function(a){if(a==null||typeof a!='object')return J.N(a)
else return H.a0(a)},
kZ:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.k(0,a[y],a[x])}return b},
l8:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bf(b,new H.l9(a))
case 1:return H.bf(b,new H.la(a,d))
case 2:return H.bf(b,new H.lb(a,d,e))
case 3:return H.bf(b,new H.lc(a,d,e,f))
case 4:return H.bf(b,new H.ld(a,d,e,f,g))}throw H.d(P.bn("Unsupported number of arguments for wrapped closure"))},
ao:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.l8)
a.$identity=z
return z},
fy:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(c).$isb){z.$reflectionInfo=c
x=H.iv(z).r}else x=c
w=d?Object.create(new H.iT().constructor.prototype):Object.create(new H.c3(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.S
$.S=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.d5(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.l0,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.d4:H.c4
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.d("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.d5(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
fv:function(a,b,c,d){var z=H.c4
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
d5:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.fx(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fv(y,!w,z,b)
if(y===0){w=$.S
$.S=w+1
u="self"+H.f(w)
w="return function(){var "+u+" = this."
v=$.aK
if(v==null){v=H.bl("self")
$.aK=v}return new Function(w+H.f(v)+";return "+u+"."+H.f(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.S
$.S=w+1
t+=H.f(w)
w="return function("+t+"){return this."
v=$.aK
if(v==null){v=H.bl("self")
$.aK=v}return new Function(w+H.f(v)+"."+H.f(z)+"("+t+");}")()},
fw:function(a,b,c,d){var z,y
z=H.c4
y=H.d4
switch(b?-1:a){case 0:throw H.d(new H.iH("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fx:function(a,b){var z,y,x,w,v,u,t,s
z=H.fp()
y=$.d3
if(y==null){y=H.bl("receiver")
$.d3=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fw(w,!u,x,b)
if(w===1){y="return function(){return this."+H.f(z)+"."+H.f(x)+"(this."+H.f(y)+");"
u=$.S
$.S=u+1
return new Function(y+H.f(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.f(z)+"."+H.f(x)+"(this."+H.f(y)+", "+s+");"
u=$.S
$.S=u+1
return new Function(y+H.f(u)+"}")()},
cO:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.o(c).$isb){c.fixed$length=Array
z=c}else z=c
return H.fy(a,b,z,!!d,e,f)},
lq:function(a,b){var z=J.R(b)
throw H.d(H.fu(H.co(a),z.aG(b,3,z.gi(b))))},
cU:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.lq(a,b)},
kX:function(a){var z=J.o(a)
return"$S" in z?z.$S():null},
b0:function(a,b){var z
if(a==null)return!1
z=H.kX(a)
return z==null?!1:H.f1(z,b)},
lu:function(a){throw H.d(new P.fA(a))},
c_:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
eZ:function(a){return init.getIsolateTag(a)},
m:function(a,b){a.$ti=b
return a},
bW:function(a){if(a==null)return
return a.$ti},
f_:function(a,b){return H.cW(a["$as"+H.f(b)],H.bW(a))},
X:function(a,b,c){var z=H.f_(a,b)
return z==null?null:z[c]},
I:function(a,b){var z=H.bW(a)
return z==null?null:z[b]},
a4:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.f3(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.f(b==null?a:b.$1(a))
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.a4(z,b)
return H.ko(a,b)}return"unknown-reified-type"},
ko:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.a4(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.a4(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.a4(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.kY(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.a4(r[p],b)+(" "+H.f(p))}w+="}"}return"("+w+") => "+z},
f3:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cx("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.w=v+", "
u=a[y]
if(u!=null)w=!1
v=z.w+=H.a4(u,c)}return w?"":"<"+z.j(0)+">"},
cW:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
bg:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bW(a)
y=J.o(a)
if(y[b]==null)return!1
return H.eU(H.cW(y[d],z),c)},
eU:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.L(a[y],b[y]))return!1
return!0},
kS:function(a,b,c){return a.apply(b,H.f_(b,c))},
L:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="cm")return!0
if('func' in b)return H.f1(a,b)
if('func' in a)return b.builtin$cls==="c9"||b.builtin$cls==="c"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.a4(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.eU(H.cW(u,z),x)},
eT:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.L(z,v)||H.L(v,z)))return!1}return!0},
kz:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.L(v,u)||H.L(u,v)))return!1}return!0},
f1:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.L(z,y)||H.L(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eT(x,w,!1))return!1
if(!H.eT(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.L(o,n)||H.L(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.L(o,n)||H.L(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.L(o,n)||H.L(n,o)))return!1}}return H.kz(a.named,b.named)},
nF:function(a){var z=$.cS
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
nD:function(a){return H.a0(a)},
nC:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
lf:function(a){var z,y,x,w,v,u
z=$.cS.$1(a)
y=$.bU[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bX[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eS.$2(a,z)
if(z!=null){y=$.bU[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bX[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cV(x)
$.bU[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bX[z]=x
return x}if(v==="-"){u=H.cV(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.f4(a,x)
if(v==="*")throw H.d(new P.ej(z))
if(init.leafTags[z]===true){u=H.cV(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.f4(a,x)},
f4:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bY(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cV:function(a){return J.bY(a,!1,null,!!a.$isk)},
ll:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bY(z,!1,null,!!z.$isk)
else return J.bY(z,c,null,null)},
l6:function(){if(!0===$.cT)return
$.cT=!0
H.l7()},
l7:function(){var z,y,x,w,v,u,t,s
$.bU=Object.create(null)
$.bX=Object.create(null)
H.l2()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.f5.$1(v)
if(u!=null){t=H.ll(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
l2:function(){var z,y,x,w,v,u,t
z=C.a7()
z=H.aF(C.a4,H.aF(C.a9,H.aF(C.C,H.aF(C.C,H.aF(C.a8,H.aF(C.a5,H.aF(C.a6(C.D),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cS=new H.l3(v)
$.eS=new H.l4(u)
$.f5=new H.l5(t)},
aF:function(a,b){return a(b)||b},
iu:{"^":"c;a,b,c,d,e,f,r,x",l:{
iv:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.iu(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
iq:{"^":"h:0;a",
$0:function(){return C.d.fe(1000*this.a.now())}},
j7:{"^":"c;a,b,c,d,e,f",
K:function(a){var z,y,x
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
l:{
W:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.j7(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bH:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
ee:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dP:{"^":"A;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.f(this.a)
return"NullError: method not found: '"+z+"' on null"}},
hW:{"^":"A;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.f(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.f(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.f(this.a)+")"},
l:{
cd:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hW(a,y,z?null:b.receiver)}}},
j9:{"^":"A;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
c8:{"^":"c;a,b"},
lz:{"^":"h:1;a",
$1:function(a){if(!!J.o(a).$isA)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ew:{"^":"c;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
l9:{"^":"h:0;a",
$0:function(){return this.a.$0()}},
la:{"^":"h:0;a,b",
$0:function(){return this.a.$1(this.b)}},
lb:{"^":"h:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
lc:{"^":"h:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ld:{"^":"h:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
h:{"^":"c;",
j:function(a){return"Closure '"+H.co(this).trim()+"'"},
gdr:function(){return this},
$isc9:1,
gdr:function(){return this}},
e5:{"^":"h;"},
iT:{"^":"e5;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
c3:{"^":"e5;a,b,c,d",
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c3))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gn:function(a){var z,y
z=this.c
if(z==null)y=H.a0(this.a)
else y=typeof z!=="object"?J.N(z):H.a0(z)
return(y^H.a0(this.b))>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.f(this.d)+"' of "+H.bv(z)},
l:{
c4:function(a){return a.a},
d4:function(a){return a.c},
fp:function(){var z=$.aK
if(z==null){z=H.bl("self")
$.aK=z}return z},
bl:function(a){var z,y,x,w,v
z=new H.c3("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
ft:{"^":"A;a",
j:function(a){return this.a},
l:{
fu:function(a,b){return new H.ft("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
iH:{"^":"A;a",
j:function(a){return"RuntimeError: "+H.f(this.a)}},
cz:{"^":"c;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
y=function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(this.a,init.mangledGlobalNames)
this.b=y
return y},
gn:function(a){return J.N(this.a)},
q:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.cz){z=this.a
y=b.a
y=z==null?y==null:z===y
z=y}else z=!1
return z}},
B:{"^":"c;a,b,c,d,e,f,r,$ti",
gi:function(a){return this.a},
gau:function(a){return this.a===0},
gd2:function(a){return new H.hY(this,[H.I(this,0)])},
gbM:function(a){return H.ch(this.gd2(this),new H.hV(this),H.I(this,0),H.I(this,1))},
aO:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.c8(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.c8(y,b)}else return this.fp(b)},
fp:function(a){var z=this.d
if(z==null)return!1
return this.at(this.aJ(z,this.as(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.al(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.al(x,b)
return y==null?null:y.b}else return this.fq(b)},
fq:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aJ(z,this.as(a))
x=this.at(y,a)
if(x<0)return
return y[x].b},
k:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.b9()
this.b=z}this.bX(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.b9()
this.c=y}this.bX(y,b,c)}else this.ft(b,c)},
ft:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.b9()
this.d=z}y=this.as(a)
x=this.aJ(z,y)
if(x==null)this.bg(z,y,[this.ba(a,b)])
else{w=this.at(x,a)
if(w>=0)x[w].b=b
else x.push(this.ba(a,b))}},
da:function(a,b,c){var z
if(this.aO(0,b))return this.h(0,b)
z=c.$0()
this.k(0,b,z)
return z},
N:function(a,b){if(typeof b==="string")return this.cl(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cl(this.c,b)
else return this.fs(b)},
fs:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.aJ(z,this.as(a))
x=this.at(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cs(w)
return w.b},
V:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
W:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(new P.Y(this))
z=z.c}},
bX:function(a,b,c){var z=this.al(a,b)
if(z==null)this.bg(a,b,this.ba(b,c))
else z.b=c},
cl:function(a,b){var z
if(a==null)return
z=this.al(a,b)
if(z==null)return
this.cs(z)
this.ca(a,b)
return z.b},
ba:function(a,b){var z,y
z=new H.hX(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cs:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
as:function(a){return J.N(a)&0x3ffffff},
at:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
j:function(a){return P.i7(this)},
al:function(a,b){return a[b]},
aJ:function(a,b){return a[b]},
bg:function(a,b,c){a[b]=c},
ca:function(a,b){delete a[b]},
c8:function(a,b){return this.al(a,b)!=null},
b9:function(){var z=Object.create(null)
this.bg(z,"<non-identifier-key>",z)
this.ca(z,"<non-identifier-key>")
return z},
$ishG:1,
l:{
hU:function(a,b){return new H.B(0,null,null,null,null,null,0,[a,b])}}},
hV:{"^":"h:1;a",
$1:function(a){return this.a.h(0,a)}},
hX:{"^":"c;a,b,c,d"},
hY:{"^":"a;a,$ti",
gi:function(a){return this.a.a},
gD:function(a){var z,y
z=this.a
y=new H.hZ(z,z.r,null,null)
y.c=z.e
return y}},
hZ:{"^":"c;a,b,c,d",
gu:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.Y(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
l3:{"^":"h:1;a",
$1:function(a){return this.a(a)}},
l4:{"^":"h:10;a",
$2:function(a,b){return this.a(a,b)}},
l5:{"^":"h:11;a",
$1:function(a){return this.a(a)}},
hS:{"^":"c;a,b,c,d",
j:function(a){return"RegExp/"+this.a+"/"},
fd:function(a){var z=this.b.exec(a)
if(z==null)return
return new H.k3(this,z)},
l:{
hT:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.d(new P.dk("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
k3:{"^":"c;a,b",
h:function(a,b){return this.b[b]}}}],["","",,H,{"^":"",
kY:function(a){var z=H.m(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
lp:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
z:function(a){return a},
bP:function(a,b,c){},
ig:function(a,b,c){var z
H.bP(a,b,c)
z=new Float32Array(a,b,c)
return z},
ii:function(a,b,c){var z
H.bP(a,b,c)
z=new Int16Array(a,b,c)
return z},
dK:{"^":"e;",$isdK:1,"%":"ArrayBuffer"},
cl:{"^":"e;",
ee:function(a,b,c,d){var z=P.a1(b,0,c,d,null)
throw H.d(z)},
c2:function(a,b,c,d){if(b>>>0!==b||b>c)this.ee(a,b,c,d)},
$iscl:1,
"%":"DataView;ArrayBufferView;ck|dL|dN|bu|dM|dO|a_"},
ck:{"^":"cl;",
gi:function(a){return a.length},
co:function(a,b,c,d,e){var z,y,x
z=a.length
this.c2(a,b,z,"start")
this.c2(a,c,z,"end")
if(b>c)throw H.d(P.a1(b,0,c,null,null))
y=c-b
x=d.length
if(x-e<y)throw H.d(new P.C("Not enough elements"))
if(e!==0||x!==y)d=d.subarray(e,e+y)
a.set(d,b)},
$isk:1,
$ask:I.H,
$isj:1,
$asj:I.H},
bu:{"^":"dN;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
return a[b]},
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
a[b]=c},
J:function(a,b,c,d,e){if(!!J.o(d).$isbu){this.co(a,b,c,d,e)
return}this.bT(a,b,c,d,e)},
a7:function(a,b,c,d){return this.J(a,b,c,d,0)}},
dL:{"^":"ck+t;",$ask:I.H,$asj:I.H,
$asb:function(){return[P.ap]},
$asa:function(){return[P.ap]},
$isb:1,
$isa:1},
dN:{"^":"dL+dj;",$ask:I.H,$asj:I.H,
$asb:function(){return[P.ap]},
$asa:function(){return[P.ap]}},
a_:{"^":"dO;",
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
a[b]=c},
J:function(a,b,c,d,e){if(!!J.o(d).$isa_){this.co(a,b,c,d,e)
return}this.bT(a,b,c,d,e)},
a7:function(a,b,c,d){return this.J(a,b,c,d,0)},
$isb:1,
$asb:function(){return[P.i]},
$isa:1,
$asa:function(){return[P.i]}},
dM:{"^":"ck+t;",$ask:I.H,$asj:I.H,
$asb:function(){return[P.i]},
$asa:function(){return[P.i]},
$isb:1,
$isa:1},
dO:{"^":"dM+dj;",$ask:I.H,$asj:I.H,
$asb:function(){return[P.i]},
$asa:function(){return[P.i]}},
ie:{"^":"bu;",$isb:1,
$asb:function(){return[P.ap]},
$isa:1,
$asa:function(){return[P.ap]},
"%":"Float32Array"},
mr:{"^":"bu;",$isb:1,
$asb:function(){return[P.ap]},
$isa:1,
$asa:function(){return[P.ap]},
"%":"Float64Array"},
ih:{"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.i]},
$isa:1,
$asa:function(){return[P.i]},
"%":"Int16Array"},
ms:{"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.i]},
$isa:1,
$asa:function(){return[P.i]},
"%":"Int32Array"},
mt:{"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.i]},
$isa:1,
$asa:function(){return[P.i]},
"%":"Int8Array"},
mu:{"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.i]},
$isa:1,
$asa:function(){return[P.i]},
"%":"Uint16Array"},
mv:{"^":"a_;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.i]},
$isa:1,
$asa:function(){return[P.i]},
"%":"Uint32Array"},
mw:{"^":"a_;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.i]},
$isa:1,
$asa:function(){return[P.i]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
mx:{"^":"a_;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.q(H.G(a,b))
return a[b]},
$isb:1,
$asb:function(){return[P.i]},
$isa:1,
$asa:function(){return[P.i]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
jf:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.kA()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ao(new P.jh(z),1)).observe(y,{childList:true})
return new P.jg(z,y,x)}else if(self.setImmediate!=null)return P.kB()
return P.kC()},
nd:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ao(new P.ji(a),0))},"$1","kA",2,0,4],
ne:[function(a){++init.globalState.f.b
self.setImmediate(H.ao(new P.jj(a),0))},"$1","kB",2,0,4],
nf:[function(a){P.cy(C.A,a)},"$1","kC",2,0,4],
eC:function(a,b){P.eD(null,a)
return b.a},
kj:function(a,b){P.eD(a,b)},
eB:function(a,b){b.bo(0,a)},
eA:function(a,b){b.cJ(H.J(a),H.M(a))},
eD:function(a,b){var z,y,x,w
z=new P.kk(b)
y=new P.kl(b)
x=J.o(a)
if(!!x.$isa3)a.bh(z,y)
else if(!!x.$isat)a.bJ(z,y)
else{w=new P.a3(0,$.n,null,[null])
w.a=4
w.c=a
w.bh(z,null)}},
eQ:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.n.toString
return new P.ky(z)},
eL:function(a,b){if(H.b0(a,{func:1,args:[P.cm,P.cm]})){b.toString
return a}else{b.toString
return a}},
d6:function(a){return new P.kg(new P.a3(0,$.n,null,[a]),[a])},
ks:function(){var z,y
for(;z=$.aE,z!=null;){$.aX=null
y=z.b
$.aE=y
if(y==null)$.aW=null
z.a.$0()}},
nB:[function(){$.cL=!0
try{P.ks()}finally{$.aX=null
$.cL=!1
if($.aE!=null)$.$get$cB().$1(P.eW())}},"$0","eW",0,0,2],
eP:function(a){var z=new P.el(a,null)
if($.aE==null){$.aW=z
$.aE=z
if(!$.cL)$.$get$cB().$1(P.eW())}else{$.aW.b=z
$.aW=z}},
kx:function(a){var z,y,x
z=$.aE
if(z==null){P.eP(a)
$.aX=$.aW
return}y=new P.el(a,null)
x=$.aX
if(x==null){y.b=z
$.aX=y
$.aE=y}else{y.b=x.b
x.b=y
$.aX=y
if(y.b==null)$.aW=y}},
f6:function(a){var z=$.n
if(C.e===z){P.an(null,null,C.e,a)
return}z.toString
P.an(null,null,z,z.bm(a,!0))},
mU:function(a,b){return new P.kf(null,a,!1,[b])},
iU:function(a,b,c,d){return new P.Q(b,a,0,null,null,null,null,[d])},
bR:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.J(x)
y=H.M(x)
w=$.n
w.toString
P.aY(null,null,w,z,y)}},
kt:[function(a,b){var z=$.n
z.toString
P.aY(null,null,z,a,b)},function(a){return P.kt(a,null)},"$2","$1","kD",2,2,5,0],
nA:[function(){},"$0","eV",0,0,2],
j4:function(a,b){var z=$.n
if(z===C.e){z.toString
return P.cy(a,b)}return P.cy(a,z.bm(b,!0))},
j5:function(a,b){var z,y
z=$.n
if(z===C.e){z.toString
return P.e7(a,b)}y=z.cG(b,!0)
$.n.toString
return P.e7(a,y)},
cy:function(a,b){var z=C.a.U(a.a,1000)
return H.j_(z<0?0:z,b)},
e7:function(a,b){var z=C.a.U(a.a,1000)
return H.j0(z<0?0:z,b)},
aY:function(a,b,c,d,e){var z={}
z.a=d
P.kx(new P.ku(z,e))},
eN:function(a,b,c,d){var z,y
y=$.n
if(y===c)return d.$0()
$.n=c
z=y
try{y=d.$0()
return y}finally{$.n=z}},
eO:function(a,b,c,d,e){var z,y
y=$.n
if(y===c)return d.$1(e)
$.n=c
z=y
try{y=d.$1(e)
return y}finally{$.n=z}},
kw:function(a,b,c,d,e,f){var z,y
y=$.n
if(y===c)return d.$2(e,f)
$.n=c
z=y
try{y=d.$2(e,f)
return y}finally{$.n=z}},
an:function(a,b,c,d){var z=C.e!==c
if(z)d=c.bm(d,!(!z||!1))
P.eP(d)},
jh:{"^":"h:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
jg:{"^":"h:12;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ji:{"^":"h:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
jj:{"^":"h:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
kk:{"^":"h:1;a",
$1:function(a){return this.a.$2(0,a)}},
kl:{"^":"h:13;a",
$2:function(a,b){this.a.$2(1,new H.c8(a,b))}},
ky:{"^":"h:14;a",
$2:function(a,b){this.a(a,b)}},
jm:{"^":"bK;a,$ti"},
jo:{"^":"ep;y,z,Q,x,a,b,c,d,e,f,r,$ti",
bc:[function(){},"$0","gbb",0,0,2],
be:[function(){},"$0","gbd",0,0,2]},
jn:{"^":"c;a0:c<,$ti",
gb8:function(){return this.c<4},
cp:function(a,b,c,d){var z,y,x,w
if((this.c&4)!==0){if(c==null)c=P.eV()
z=new P.jq($.n,0,c)
z.cn()
return z}z=$.n
y=d?1:0
x=new P.jo(0,null,null,this,null,null,null,z,y,null,null,this.$ti)
x.bW(a,b,c,d,H.I(this,0))
x.Q=x
x.z=x
x.y=this.c&1
w=this.e
this.e=x
x.z=null
x.Q=w
if(w==null)this.d=x
else w.z=x
if(this.d===x)P.bR(this.a)
return x},
cj:function(a){},
ck:function(a){},
b2:function(){if((this.c&4)!==0)return new P.C("Cannot add new events after calling close")
return new P.C("Cannot add new events while doing an addStream")}},
Q:{"^":"jn;a,b,c,d,e,f,r,$ti",
a_:function(a){var z,y
for(z=this.d,y=this.$ti;z!=null;z=z.z)z.bZ(new P.cD(a,null,y))}},
eo:{"^":"c;$ti",
cJ:function(a,b){if(a==null)a=new P.cn()
if(this.a.a!==0)throw H.d(new P.C("Future already completed"))
$.n.toString
this.S(a,b)},
eS:function(a){return this.cJ(a,null)}},
je:{"^":"eo;a,$ti",
bo:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.C("Future already completed"))
z.e1(b)},
S:function(a,b){this.a.e2(a,b)}},
kg:{"^":"eo;a,$ti",
bo:function(a,b){var z=this.a
if(z.a!==0)throw H.d(new P.C("Future already completed"))
z.b4(b)},
S:function(a,b){this.a.S(a,b)}},
jy:{"^":"c;a,b,c,d,e",
fC:function(a){if(this.c!==6)return!0
return this.b.b.bI(this.d,a.a)},
fg:function(a){var z,y
z=this.e
y=this.b.b
if(H.b0(z,{func:1,args:[,,]}))return y.fP(z,a.a,a.b)
else return y.bI(z,a.a)}},
a3:{"^":"c;a0:a<,b,ex:c<,$ti",
bJ:function(a,b){var z=$.n
if(z!==C.e){z.toString
if(b!=null)b=P.eL(b,z)}return this.bh(a,b)},
dm:function(a){return this.bJ(a,null)},
bh:function(a,b){var z=new P.a3(0,$.n,null,[null])
this.bY(new P.jy(null,z,b==null?1:3,a,b))
return z},
bY:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.bY(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.an(null,null,z,new P.jz(this,a))}},
ci:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.ci(a)
return}this.a=u
this.c=y.c}z.a=this.am(a)
y=this.b
y.toString
P.an(null,null,y,new P.jG(z,this))}},
bf:function(){var z=this.c
this.c=null
return this.am(z)},
am:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
b4:function(a){var z,y
z=this.$ti
if(H.bg(a,"$isat",z,"$asat"))if(H.bg(a,"$isa3",z,null))P.bM(a,this)
else P.eq(a,this)
else{y=this.bf()
this.a=4
this.c=a
P.aB(this,y)}},
S:[function(a,b){var z=this.bf()
this.a=8
this.c=new P.bj(a,b)
P.aB(this,z)},function(a){return this.S(a,null)},"fY","$2","$1","ge6",2,2,5,0],
e1:function(a){var z
if(H.bg(a,"$isat",this.$ti,"$asat")){this.e4(a)
return}this.a=1
z=this.b
z.toString
P.an(null,null,z,new P.jB(this,a))},
e4:function(a){var z
if(H.bg(a,"$isa3",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.an(null,null,z,new P.jF(this,a))}else P.bM(a,this)
return}P.eq(a,this)},
e2:function(a,b){var z
this.a=1
z=this.b
z.toString
P.an(null,null,z,new P.jA(this,a,b))},
$isat:1,
l:{
eq:function(a,b){var z,y,x
b.a=1
try{a.bJ(new P.jC(b),new P.jD(b))}catch(x){z=H.J(x)
y=H.M(x)
P.f6(new P.jE(b,z,y))}},
bM:function(a,b){var z,y,x
for(;z=a.a,z===2;)a=a.c
y=b.c
if(z>=4){b.c=null
x=b.am(y)
b.a=a.a
b.c=a.c
P.aB(b,x)}else{b.a=2
b.c=a
a.ci(y)}},
aB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.aY(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.aB(z.a,b)}y=z.a
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
P.aY(null,null,y,v,u)
return}p=$.n
if(p==null?r!=null:p!==r)$.n=r
else p=null
y=b.c
if(y===8)new P.jJ(z,x,w,b).$0()
else if(v){if((y&1)!==0)new P.jI(x,b,s).$0()}else if((y&2)!==0)new P.jH(z,x,b).$0()
if(p!=null)$.n=p
y=x.b
if(!!J.o(y).$isat){if(y.a>=4){o=u.c
u.c=null
b=u.am(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.bM(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.am(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
jz:{"^":"h:0;a,b",
$0:function(){P.aB(this.a,this.b)}},
jG:{"^":"h:0;a,b",
$0:function(){P.aB(this.b,this.a.a)}},
jC:{"^":"h:1;a",
$1:function(a){var z=this.a
z.a=0
z.b4(a)}},
jD:{"^":"h:15;a",
$2:function(a,b){this.a.S(a,b)},
$1:function(a){return this.$2(a,null)}},
jE:{"^":"h:0;a,b,c",
$0:function(){this.a.S(this.b,this.c)}},
jB:{"^":"h:0;a,b",
$0:function(){var z,y
z=this.a
y=z.bf()
z.a=4
z.c=this.b
P.aB(z,y)}},
jF:{"^":"h:0;a,b",
$0:function(){P.bM(this.b,this.a)}},
jA:{"^":"h:0;a,b,c",
$0:function(){this.a.S(this.b,this.c)}},
jJ:{"^":"h:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.d
z=w.b.b.dh(w.d)}catch(v){y=H.J(v)
x=H.M(v)
if(this.c){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.bj(y,x)
u.a=!0
return}if(!!J.o(z).$isat){if(z instanceof P.a3&&z.ga0()>=4){if(z.ga0()===8){w=this.b
w.b=z.gex()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.dm(new P.jK(t))
w.a=!1}}},
jK:{"^":"h:1;a",
$1:function(a){return this.a}},
jI:{"^":"h:2;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.bI(x.d,this.c)}catch(w){z=H.J(w)
y=H.M(w)
x=this.a
x.b=new P.bj(z,y)
x.a=!0}}},
jH:{"^":"h:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.fC(z)&&w.e!=null){v=this.b
v.b=w.fg(z)
v.a=!1}}catch(u){y=H.J(u)
x=H.M(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.bj(y,x)
s.a=!0}}},
el:{"^":"c;a,b"},
e3:{"^":"c;$ti",
gi:function(a){var z,y
z={}
y=new P.a3(0,$.n,null,[P.i])
z.a=0
this.bE(new P.iW(z),!0,new P.iX(z,y),y.ge6())
return y}},
iW:{"^":"h:1;a",
$1:function(a){++this.a.a}},
iX:{"^":"h:0;a,b",
$0:function(){this.b.b4(this.a.a)}},
iV:{"^":"c;"},
kc:{"^":"c;a0:b<,$ti",
geq:function(){if((this.b&8)===0)return this.a
return this.a.gb_()},
ec:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.ex(null,null,0,this.$ti)
this.a=z}return z}y=this.a
y.gb_()
return y.gb_()},
geB:function(){if((this.b&8)!==0)return this.a.gb_()
return this.a},
ak:function(){if((this.b&4)!==0)return new P.C("Cannot add event after closing")
return new P.C("Cannot add event while adding a stream")},
aj:function(a,b){var z=this.b
if((z&1)!==0)this.a_(b)
else if((z&3)===0)this.ec().a1(0,new P.cD(b,null,this.$ti))},
cp:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.d(new P.C("Stream has already been listened to."))
z=$.n
y=d?1:0
x=new P.ep(this,null,null,null,z,y,null,null,this.$ti)
x.bW(a,b,c,d,H.I(this,0))
w=this.geq()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sb_(x)
v.aY(0)}else this.a=x
x.ez(w)
x.b7(new P.kd(this))
return x},
cj:function(a){if((this.b&8)!==0)C.k.ay(this.a)
P.bR(this.e)},
ck:function(a){if((this.b&8)!==0)C.k.aY(this.a)
P.bR(this.f)}},
kd:{"^":"h:0;a",
$0:function(){P.bR(this.a.d)}},
jk:{"^":"c;$ti",
a_:function(a){this.geB().bZ(new P.cD(a,null,[H.I(this,0)]))}},
cC:{"^":"kc+jk;a,b,c,d,e,f,r,$ti"},
bK:{"^":"ke;a,$ti",
gn:function(a){return(H.a0(this.a)^892482866)>>>0},
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.bK))return!1
return b.a===this.a}},
ep:{"^":"en;x,a,b,c,d,e,f,r,$ti",
bc:[function(){this.x.cj(this)},"$0","gbb",0,0,2],
be:[function(){this.x.ck(this)},"$0","gbd",0,0,2]},
en:{"^":"c;a0:e<,$ti",
ez:function(a){if(a==null)return
this.r=a
if(a.c!=null){this.e=(this.e|64)>>>0
a.aF(this)}},
bF:function(a,b){var z,y,x
z=this.e
if((z&8)!==0)return
y=(z+128|4)>>>0
this.e=y
if(z<128&&this.r!=null){x=this.r
if(x.a===1)x.a=3}if((z&4)===0&&(y&32)===0)this.b7(this.gbb())},
ay:function(a){return this.bF(a,null)},
aY:function(a){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128)if((z&64)!==0&&this.r.c!=null)this.r.aF(this)
else{z=(z&4294967291)>>>0
this.e=z
if((z&32)===0)this.b7(this.gbd())}}},
gav:function(){return this.e>=128},
bc:[function(){},"$0","gbb",0,0,2],
be:[function(){},"$0","gbd",0,0,2],
bZ:function(a){var z,y
z=this.r
if(z==null){z=new P.ex(null,null,0,[H.X(this,"en",0)])
this.r=z}z.a1(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.aF(this)}},
a_:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.dk(this.a,a)
this.e=(this.e&4294967263)>>>0
this.c3((z&4)!==0)},
b7:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.c3((z&4)!==0)},
c3:function(a){var z,y,x
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
if(x)this.bc()
else this.be()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.aF(this)},
bW:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.eL(b==null?P.kD():b,z)
this.c=c==null?P.eV():c}},
ke:{"^":"e3;$ti",
bE:function(a,b,c,d){return this.a.cp(a,d,c,!0===b)},
bD:function(a){return this.bE(a,null,null,null)}},
jp:{"^":"c;d8:a*"},
cD:{"^":"jp;b,a,$ti",
fG:function(a){a.a_(this.b)}},
k5:{"^":"c;a0:a<",
aF:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.f6(new P.k6(this,a))
this.a=1}},
k6:{"^":"h:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gd8(x)
z.b=w
if(w==null)z.c=null
x.fG(this.b)}},
ex:{"^":"k5;b,c,a,$ti",
a1:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sd8(0,b)
this.c=b}}},
jq:{"^":"c;a,a0:b<,c",
gav:function(){return this.b>=4},
cn:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.an(null,null,z,this.gey())
this.b=(this.b|2)>>>0},
bF:function(a,b){this.b+=4},
ay:function(a){return this.bF(a,null)},
aY:function(a){var z=this.b
if(z>=4){z-=4
this.b=z
if(z<4&&(z&1)===0)this.cn()}},
h8:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.di(this.c)},"$0","gey",0,0,2]},
kf:{"^":"c;a,b,c,$ti"},
bj:{"^":"c;a,b",
j:function(a){return H.f(this.a)},
$isA:1},
ki:{"^":"c;"},
ku:{"^":"h:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cn()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=y.j(0)
throw x}},
k8:{"^":"ki;",
di:function(a){var z,y,x,w
try{if(C.e===$.n){x=a.$0()
return x}x=P.eN(null,null,this,a)
return x}catch(w){z=H.J(w)
y=H.M(w)
return P.aY(null,null,this,z,y)}},
dk:function(a,b){var z,y,x,w
try{if(C.e===$.n){x=a.$1(b)
return x}x=P.eO(null,null,this,a,b)
return x}catch(w){z=H.J(w)
y=H.M(w)
return P.aY(null,null,this,z,y)}},
bm:function(a,b){if(b)return new P.k9(this,a)
else return new P.ka(this,a)},
cG:function(a,b){return new P.kb(this,a)},
h:function(a,b){return},
dh:function(a){if($.n===C.e)return a.$0()
return P.eN(null,null,this,a)},
bI:function(a,b){if($.n===C.e)return a.$1(b)
return P.eO(null,null,this,a,b)},
fP:function(a,b,c){if($.n===C.e)return a.$2(b,c)
return P.kw(null,null,this,a,b,c)}},
k9:{"^":"h:0;a,b",
$0:function(){return this.a.di(this.b)}},
ka:{"^":"h:0;a,b",
$0:function(){return this.a.dh(this.b)}},
kb:{"^":"h:1;a,b",
$1:function(a){return this.a.dk(this.b,a)}}}],["","",,P,{"^":"",
dy:function(a,b){return new H.B(0,null,null,null,null,null,0,[a,b])},
dz:function(){return new H.B(0,null,null,null,null,null,0,[null,null])},
V:function(a){return H.kZ(a,new H.B(0,null,null,null,null,null,0,[null,null]))},
hO:function(a,b,c){var z,y
if(P.cM(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aZ()
y.push(a)
try{P.kq(a,z)}finally{y.pop()}y=P.e4(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bp:function(a,b,c){var z,y,x
if(P.cM(a))return b+"..."+c
z=new P.cx(b)
y=$.$get$aZ()
y.push(a)
try{x=z
x.w=P.e4(x.gw(),a,", ")}finally{y.pop()}y=z
y.w=y.gw()+c
y=z.gw()
return y.charCodeAt(0)==0?y:y},
cM:function(a){var z,y
for(z=0;y=$.$get$aZ(),z<y.length;++z)if(a===y[z])return!0
return!1},
kq:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gD(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.t())return
w=H.f(z.gu())
b.push(w)
y+=w.length+2;++x}if(!z.t()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gu();++x
if(!z.t()){if(x<=4){b.push(H.f(t))
return}v=H.f(t)
u=b.pop()
y+=v.length+2}else{s=z.gu();++x
for(;z.t();t=s,s=r){r=z.gu();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.f(t)
v=H.f(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
i_:function(a,b,c,d,e){return new H.B(0,null,null,null,null,null,0,[d,e])},
i0:function(a,b,c){var z=P.i_(null,null,null,b,c)
a.W(0,new P.kJ(z))
return z},
aN:function(a,b,c,d){return new P.jW(0,null,null,null,null,null,0,[d])},
i7:function(a){var z,y,x
z={}
if(P.cM(a))return"{...}"
y=new P.cx("")
try{$.$get$aZ().push(a)
x=y
x.w=x.gw()+"{"
z.a=!0
a.W(0,new P.i8(z,y))
z=y
z.w=z.gw()+"}"}finally{$.$get$aZ().pop()}z=y.gw()
return z.charCodeAt(0)==0?z:z},
ev:{"^":"B;a,b,c,d,e,f,r,$ti",
as:function(a){return H.lo(a)&0x3ffffff},
at:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
l:{
aV:function(a,b){return new P.ev(0,null,null,null,null,null,0,[a,b])}}},
jW:{"^":"jS;a,b,c,d,e,f,r,$ti",
gD:function(a){var z=new P.eu(this,this.r,null,null)
z.c=this.e
return z},
gi:function(a){return this.a},
aN:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.c
if(z==null)return!1
return z[b]!=null}else return this.e7(b)},
e7:function(a){var z=this.d
if(z==null)return!1
return this.aI(z[this.aH(a)],a)>=0},
d4:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.aN(0,a)?a:null
else return this.eg(a)},
eg:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aH(a)]
x=this.aI(y,a)
if(x<0)return
return J.cX(y,x).gea()},
a1:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.c5(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.c5(x,b)}else return this.R(0,b)},
R:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.jY()
this.d=z}y=this.aH(b)
x=z[y]
if(x==null)z[y]=[this.b3(b)]
else{if(this.aI(x,b)>=0)return!1
x.push(this.b3(b))}return!0},
N:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.c6(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.c6(this.c,b)
else return this.er(0,b)},
er:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aH(b)]
x=this.aI(y,b)
if(x<0)return!1
this.c7(y.splice(x,1)[0])
return!0},
V:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
c5:function(a,b){if(a[b]!=null)return!1
a[b]=this.b3(b)
return!0},
c6:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.c7(z)
delete a[b]
return!0},
b3:function(a){var z,y
z=new P.jX(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
c7:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aH:function(a){return J.N(a)&0x3ffffff},
aI:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
$isa:1,
$asa:null,
l:{
jY:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
jX:{"^":"c;ea:a<,b,c"},
eu:{"^":"c;a,b,c,d",
gu:function(){return this.d},
t:function(){var z=this.a
if(this.b!==z.r)throw H.d(new P.Y(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
jS:{"^":"iI;$ti"},
kJ:{"^":"h:6;a",
$2:function(a,b){this.a.k(0,a,b)}},
i1:{"^":"ij;$ti"},
ij:{"^":"c+t;",$asb:null,$asa:null,$isb:1,$isa:1},
t:{"^":"c;$ti",
gD:function(a){return new H.dB(a,this.gi(a),0,null)},
m:function(a,b){return this.h(a,b)},
d5:function(a,b){return new H.dG(a,b,[H.X(a,"t",0),null])},
J:["bT",function(a,b,c,d,e){var z,y,x,w,v
P.bc(b,c,this.gi(a),null,null,null)
z=c-b
if(z===0)return
if(H.bg(d,"$isb",[H.X(a,"t",0)],"$asb")){y=e
x=d}else{x=new H.iY(d,e,null,[H.X(d,"t",0)]).bK(0,!1)
y=0}w=J.R(x)
if(y+z>w.gi(x))throw H.d(H.dr())
if(y<b)for(v=z-1;v>=0;--v)this.k(a,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.k(a,b+v,w.h(x,y+v))},function(a,b,c,d){return this.J(a,b,c,d,0)},"a7",null,null,"gfW",6,2,null,1],
bP:function(a,b,c){this.a7(a,b,b+c.length,c)},
j:function(a){return P.bp(a,"[","]")},
$isb:1,
$asb:null,
$isa:1,
$asa:null},
kh:{"^":"c;"},
i5:{"^":"c;",
h:function(a,b){return this.a.h(0,b)},
gi:function(a){var z=this.a
return z.gi(z)},
j:function(a){return this.a.j(0)}},
ja:{"^":"i5+kh;a,$ti"},
i8:{"^":"h:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.w+=", "
z.a=!1
z=this.b
y=z.w+=H.f(a)
z.w=y+": "
z.w+=H.f(b)}},
i2:{"^":"ba;a,b,c,d,$ti",
gD:function(a){return new P.jZ(this,this.c,this.d,this.b,null)},
gau:function(a){return this.b===this.c},
gi:function(a){return(this.c-this.b&this.a.length-1)>>>0},
m:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.q(P.w(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
V:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
j:function(a){return P.bp(this,"{","}")},
de:function(){var z,y,x
z=this.b
if(z===this.c)throw H.d(H.dq());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
R:function(a,b){var z,y
z=this.a
y=this.c
z[y]=b
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.cg();++this.d},
cg:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.m(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.b.J(y,0,w,z,x)
C.b.J(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
dO:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.m(z,[b])},
$asa:null,
l:{
ce:function(a,b){var z=new P.i2(null,0,0,0,[b])
z.dO(a,b)
return z}}},
jZ:{"^":"c;a,b,c,d,e",
gu:function(){return this.e},
t:function(){var z,y
z=this.a
if(this.c!==z.d)H.q(new P.Y(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
iJ:{"^":"c;$ti",
j:function(a){return P.bp(this,"{","}")},
$isa:1,
$asa:null},
iI:{"^":"iJ;$ti"}}],["","",,P,{"^":"",
bn:function(a){return new P.jx(a)},
i3:function(a,b,c,d){var z,y,x
z=J.hP(a,d)
if(a!==0&&b!=null)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
cf:function(a,b,c){var z,y
z=H.m([],[c])
for(y=J.bi(a);y.t();)z.push(y.gu())
if(b)return z
z.fixed$length=Array
return z},
bZ:function(a){H.lp(H.f(a))},
iw:function(a,b,c){return new H.hS(a,H.hT(a,!1,!0,!1),null,null)},
cN:{"^":"c;"},
"+bool":0,
ap:{"^":"F;"},
"+double":0,
b4:{"^":"c;a",
G:function(a,b){return new P.b4(C.a.G(this.a,b.gcd()))},
a5:function(a,b){return C.a.a5(this.a,b.gcd())},
ah:function(a,b){return C.a.ah(this.a,b.gcd())},
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.b4))return!1
return this.a===b.a},
gn:function(a){return this.a&0x1FFFFFFF},
j:function(a){var z,y,x,w,v
z=new P.fG()
y=this.a
if(y<0)return"-"+new P.b4(0-y).j(0)
x=z.$1(C.a.U(y,6e7)%60)
w=z.$1(C.a.U(y,1e6)%60)
v=new P.fF().$1(y%1e6)
return""+C.a.U(y,36e8)+":"+H.f(x)+":"+H.f(w)+"."+H.f(v)},
l:{
fE:function(a,b,c,d,e,f){return new P.b4(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fF:{"^":"h:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fG:{"^":"h:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
A:{"^":"c;",l:{
da:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aI(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fJ(a)},
fJ:function(a){var z=J.o(a)
if(!!z.$ish)return z.j(a)
return H.bv(a)}}},
cn:{"^":"A;",
j:function(a){return"Throw of null."}},
ar:{"^":"A;a,b,c,d",
gb6:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gb5:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.f(z)
w=this.gb6()+y+x
if(!this.a)return w
v=this.gb5()
u=P.da(this.b)
return w+v+": "+H.f(u)},
l:{
O:function(a){return new P.ar(!1,null,null,a)},
c1:function(a,b,c){return new P.ar(!0,a,b,c)}}},
cp:{"^":"ar;e,f,a,b,c,d",
gb6:function(){return"RangeError"},
gb5:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.f(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.f(z)
else if(x>z)y=": Not in range "+H.f(z)+".."+H.f(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.f(z)}return y},
l:{
is:function(a){return new P.cp(null,null,!1,null,null,a)},
bb:function(a,b,c){return new P.cp(null,null,!0,a,b,"Value not in range")},
a1:function(a,b,c,d,e){return new P.cp(b,c,!0,a,d,"Invalid value")},
bc:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.a1(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.d(P.a1(b,a,c,"end",f))
return b}return c}}},
h_:{"^":"ar;e,i:f>,a,b,c,d",
gb6:function(){return"RangeError"},
gb5:function(){if(J.fb(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.f(z)},
l:{
w:function(a,b,c,d,e){var z=e!=null?e:J.aq(b)
return new P.h_(b,z,!0,a,c,"Index out of range")}}},
l:{"^":"A;a",
j:function(a){return"Unsupported operation: "+this.a}},
ej:{"^":"A;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
C:{"^":"A;a",
j:function(a){return"Bad state: "+H.f(this.a)}},
Y:{"^":"A;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.f(P.da(z))+"."}},
ik:{"^":"c;",
j:function(a){return"Out of Memory"},
$isA:1},
e1:{"^":"c;",
j:function(a){return"Stack Overflow"},
$isA:1},
fA:{"^":"A;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
jx:{"^":"c;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.f(z)}},
dk:{"^":"c;a,b,c",
j:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.f(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.f.aG(x,0,75)+"..."
return y+"\n"+x}},
fL:{"^":"c;a,ef",
j:function(a){return"Expando:"+H.f(this.a)},
h:function(a,b){var z,y
z=this.ef
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.q(P.c1(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dR(b,"expando$values")
return y==null?null:H.dR(y,z)}},
i:{"^":"F;"},
"+int":0,
U:{"^":"c;$ti",
gi:function(a){var z,y
z=this.gD(this)
for(y=0;z.t();)++y
return y},
m:function(a,b){var z,y,x
if(b<0)H.q(P.a1(b,0,null,"index",null))
for(z=this.gD(this),y=0;z.t();){x=z.gu()
if(b===y)return x;++y}throw H.d(P.w(b,this,"index",null,y))},
j:function(a){return P.hO(this,"(",")")}},
ds:{"^":"c;"},
b:{"^":"c;$ti",$asb:null,$isa:1,$asa:null},
"+List":0,
aO:{"^":"c;$ti"},
cm:{"^":"c;",
gn:function(a){return P.c.prototype.gn.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
F:{"^":"c;"},
"+num":0,
c:{"^":";",
q:function(a,b){return this===b},
gn:function(a){return H.a0(this)},
j:function(a){return H.bv(this)},
toString:function(){return this.j(this)}},
bE:{"^":"c;"},
mR:{"^":"c;a,b"},
p:{"^":"c;"},
"+String":0,
cx:{"^":"c;w<",
gi:function(a){return this.w.length},
j:function(a){var z=this.w
return z.charCodeAt(0)==0?z:z},
l:{
e4:function(a,b,c){var z=J.bi(b)
if(!z.t())return a
if(c.length===0){do a+=H.f(z.gu())
while(z.t())}else{a+=H.f(z.gu())
for(;z.t();)a=a+c+H.f(z.gu())}return a}}}}],["","",,W,{"^":"",
lA:function(){return window},
c6:function(a,b){var z=document.createElement("canvas")
z.width=b
z.height=a
return z},
lS:[function(a){return"wheel"},"$1","l1",2,0,29],
fY:function(a,b,c){var z=document.createElement("img")
return z},
am:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
et:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
eR:function(a){var z=$.n
if(z===C.e)return a
return z.cG(a,!0)},
Z:{"^":"d9;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
lC:{"^":"Z;",
j:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
lE:{"^":"K;ad:url=","%":"ApplicationCacheErrorEvent"},
lF:{"^":"Z;",
j:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
a6:{"^":"e;",$isc:1,"%":"AudioTrack"},
lH:{"^":"df;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.a6]},
$isa:1,
$asa:function(){return[W.a6]},
$isk:1,
$ask:function(){return[W.a6]},
$isj:1,
$asj:function(){return[W.a6]},
"%":"AudioTrackList"},
dc:{"^":"r+t;",
$asb:function(){return[W.a6]},
$asa:function(){return[W.a6]},
$isb:1,
$isa:1},
df:{"^":"dc+y;",
$asb:function(){return[W.a6]},
$asa:function(){return[W.a6]},
$isb:1,
$isa:1},
fn:{"^":"e;","%":";Blob"},
fo:{"^":"e;","%":"Response;Body"},
lI:{"^":"Z;",$ise:1,"%":"HTMLBodyElement"},
b1:{"^":"Z;",
bO:function(a,b,c){var z=a.getContext(b,P.kT(c,null))
return z},
dt:function(a,b,c,d,e,f,g){var z,y
z=P.V(["alpha",!1,"depth",!1,"stencil",!0,"antialias",!1,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1])
y=this.bO(a,"webgl",z)
return y==null?this.bO(a,"experimental-webgl",z):y},
$isb1:1,
"%":"HTMLCanvasElement"},
lJ:{"^":"v;i:length=",$ise:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
lK:{"^":"e;ad:url=","%":"Client|WindowClient"},
lL:{"^":"r;",$ise:1,"%":"CompositorWorker"},
a7:{"^":"e;",$isc:1,"%":"CSSCharsetRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
lM:{"^":"h1;i:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
h1:{"^":"e+fz;"},
fz:{"^":"c;"},
lN:{"^":"e;i:length=",
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
lO:{"^":"v;",$ise:1,"%":"DocumentFragment|ShadowRoot"},
lP:{"^":"e;",
j:function(a){return String(a)},
"%":"DOMException"},
fD:{"^":"e;",
j:function(a){return"Rectangle ("+H.f(a.left)+", "+H.f(a.top)+") "+H.f(this.gO(a))+" x "+H.f(this.gM(a))},
q:function(a,b){var z
if(b==null)return!1
z=J.o(b)
if(!z.$isE)return!1
return a.left===z.gaw(b)&&a.top===z.gaA(b)&&this.gO(a)===z.gO(b)&&this.gM(a)===z.gM(b)},
gn:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gO(a)
w=this.gM(a)
return W.et(W.am(W.am(W.am(W.am(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gM:function(a){return a.height},
gaw:function(a){return a.left},
gaA:function(a){return a.top},
gO:function(a){return a.width},
$isE:1,
$asE:I.H,
"%":";DOMRectReadOnly"},
lQ:{"^":"hm;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[P.p]},
$isa:1,
$asa:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
$isj:1,
$asj:function(){return[P.p]},
"%":"DOMStringList"},
h2:{"^":"e+t;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},
hm:{"^":"h2+y;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},
lR:{"^":"e;i:length=","%":"DOMTokenList"},
d9:{"^":"v;",
j:function(a){return a.localName},
$ise:1,
"%":";Element"},
K:{"^":"e;",$isK:1,$isc:1,"%":"AnimationEvent|AnimationPlayerEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|WebKitTransitionEvent;Event|InputEvent"},
lT:{"^":"r;ad:url=","%":"EventSource"},
r:{"^":"e;",
e_:function(a,b,c,d){return a.addEventListener(b,H.ao(c,1),!1)},
es:function(a,b,c,d){return a.removeEventListener(b,H.ao(c,1),!1)},
$isr:1,
$isc:1,
"%":"AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioContext|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioSourceNode|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|CrossOriginServiceWorkerClient|DOMApplicationCache|DelayNode|DynamicsCompressorNode|FileReader|FontFaceSet|GainNode|IDBDatabase|IDBOpenDBRequest|IDBRequest|IDBTransaction|IDBVersionChangeRequest|IIRFilterNode|JavaScriptAudioNode|MIDIAccess|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MessagePort|NetworkInformation|Notification|OfflineAudioContext|OfflineResourceList|Oscillator|OscillatorNode|PannerNode|Performance|PermissionStatus|PresentationAvailability|PresentationReceiver|PresentationRequest|RTCDTMFSender|RTCPeerConnection|RealtimeAnalyserNode|ScreenOrientation|ScriptProcessorNode|ServicePortCollection|ServiceWorkerContainer|ServiceWorkerRegistration|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|WaveShaperNode|WorkerPerformance|mozRTCPeerConnection|webkitAudioContext|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;dc|df|dd|dg|de|dh"},
aa:{"^":"fn;",$isc:1,"%":"File"},
m9:{"^":"hn;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isk:1,
$ask:function(){return[W.aa]},
$isj:1,
$asj:function(){return[W.aa]},
$isb:1,
$asb:function(){return[W.aa]},
$isa:1,
$asa:function(){return[W.aa]},
"%":"FileList"},
h3:{"^":"e+t;",
$asb:function(){return[W.aa]},
$asa:function(){return[W.aa]},
$isb:1,
$isa:1},
hn:{"^":"h3+y;",
$asb:function(){return[W.aa]},
$asa:function(){return[W.aa]},
$isb:1,
$isa:1},
ma:{"^":"r;i:length=","%":"FileWriter"},
mc:{"^":"Z;i:length=","%":"HTMLFormElement"},
ac:{"^":"e;",$isc:1,"%":"Gamepad"},
md:{"^":"e;i:length=","%":"History"},
me:{"^":"ho;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.v]},
$isa:1,
$asa:function(){return[W.v]},
$isk:1,
$ask:function(){return[W.v]},
$isj:1,
$asj:function(){return[W.v]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
h4:{"^":"e+t;",
$asb:function(){return[W.v]},
$asa:function(){return[W.v]},
$isb:1,
$isa:1},
ho:{"^":"h4+y;",
$asb:function(){return[W.v]},
$asa:function(){return[W.v]},
$isb:1,
$isa:1},
mf:{"^":"fX;",
E:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
fX:{"^":"r;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
bo:{"^":"Z;",$isbo:1,$isr:1,$isc:1,"%":"HTMLImageElement"},
mh:{"^":"Z;",$ise:1,"%":"HTMLInputElement"},
br:{"^":"cA;",$isbr:1,$isK:1,$isc:1,"%":"KeyboardEvent"},
ml:{"^":"e;",
j:function(a){return String(a)},
"%":"Location"},
mo:{"^":"e;i:length=","%":"MediaList"},
mp:{"^":"ia;",
fV:function(a,b,c){return a.send(b,c)},
E:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
ia:{"^":"r;","%":"MIDIInput;MIDIPort"},
ad:{"^":"e;",$isc:1,"%":"MimeType"},
mq:{"^":"hy;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isk:1,
$ask:function(){return[W.ad]},
$isj:1,
$asj:function(){return[W.ad]},
$isb:1,
$asb:function(){return[W.ad]},
$isa:1,
$asa:function(){return[W.ad]},
"%":"MimeTypeArray"},
he:{"^":"e+t;",
$asb:function(){return[W.ad]},
$asa:function(){return[W.ad]},
$isb:1,
$isa:1},
hy:{"^":"he+y;",
$asb:function(){return[W.ad]},
$asa:function(){return[W.ad]},
$isb:1,
$isa:1},
aw:{"^":"cA;",$isaw:1,$isK:1,$isc:1,"%":"PointerEvent;DragEvent|MouseEvent"},
my:{"^":"e;",$ise:1,"%":"Navigator"},
v:{"^":"r;",
j:function(a){var z=a.nodeValue
return z==null?this.dL(a):z},
$isr:1,
$isc:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
mz:{"^":"hz;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.v]},
$isa:1,
$asa:function(){return[W.v]},
$isk:1,
$ask:function(){return[W.v]},
$isj:1,
$asj:function(){return[W.v]},
"%":"NodeList|RadioNodeList"},
hf:{"^":"e+t;",
$asb:function(){return[W.v]},
$asa:function(){return[W.v]},
$isb:1,
$isa:1},
hz:{"^":"hf+y;",
$asb:function(){return[W.v]},
$asa:function(){return[W.v]},
$isb:1,
$isa:1},
mB:{"^":"e;",$ise:1,"%":"Path2D"},
mD:{"^":"j6;i:length=","%":"Perspective"},
ae:{"^":"e;i:length=",$isc:1,"%":"Plugin"},
mE:{"^":"hA;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.ae]},
$isa:1,
$asa:function(){return[W.ae]},
$isk:1,
$ask:function(){return[W.ae]},
$isj:1,
$asj:function(){return[W.ae]},
"%":"PluginArray"},
hg:{"^":"e+t;",
$asb:function(){return[W.ae]},
$asa:function(){return[W.ae]},
$isb:1,
$isa:1},
hA:{"^":"hg+y;",
$asb:function(){return[W.ae]},
$asa:function(){return[W.ae]},
$isb:1,
$isa:1},
mG:{"^":"r;",
E:function(a,b){return a.send(b)},
"%":"PresentationConnection"},
mJ:{"^":"r;",
E:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
mL:{"^":"Z;i:length=","%":"HTMLSelectElement"},
mN:{"^":"r;",$ise:1,"%":"SharedWorker"},
af:{"^":"r;",$isr:1,$isc:1,"%":"SourceBuffer"},
mO:{"^":"dg;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.af]},
$isa:1,
$asa:function(){return[W.af]},
$isk:1,
$ask:function(){return[W.af]},
$isj:1,
$asj:function(){return[W.af]},
"%":"SourceBufferList"},
dd:{"^":"r+t;",
$asb:function(){return[W.af]},
$asa:function(){return[W.af]},
$isb:1,
$isa:1},
dg:{"^":"dd+y;",
$asb:function(){return[W.af]},
$asa:function(){return[W.af]},
$isb:1,
$isa:1},
ag:{"^":"e;",$isc:1,"%":"SpeechGrammar"},
mP:{"^":"hB;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.ag]},
$isa:1,
$asa:function(){return[W.ag]},
$isk:1,
$ask:function(){return[W.ag]},
$isj:1,
$asj:function(){return[W.ag]},
"%":"SpeechGrammarList"},
hh:{"^":"e+t;",
$asb:function(){return[W.ag]},
$asa:function(){return[W.ag]},
$isb:1,
$isa:1},
hB:{"^":"hh+y;",
$asb:function(){return[W.ag]},
$asa:function(){return[W.ag]},
$isb:1,
$isa:1},
ah:{"^":"e;i:length=",$isc:1,"%":"SpeechRecognitionResult"},
mS:{"^":"e;",
h:function(a,b){return a.getItem(b)},
gi:function(a){return a.length},
"%":"Storage"},
mT:{"^":"K;ad:url=","%":"StorageEvent"},
ai:{"^":"e;",$isc:1,"%":"CSSStyleSheet|StyleSheet"},
aj:{"^":"r;",$isr:1,$isc:1,"%":"TextTrack"},
ak:{"^":"r;",$isr:1,$isc:1,"%":"TextTrackCue|VTTCue"},
mZ:{"^":"hC;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isk:1,
$ask:function(){return[W.ak]},
$isj:1,
$asj:function(){return[W.ak]},
$isb:1,
$asb:function(){return[W.ak]},
$isa:1,
$asa:function(){return[W.ak]},
"%":"TextTrackCueList"},
hi:{"^":"e+t;",
$asb:function(){return[W.ak]},
$asa:function(){return[W.ak]},
$isb:1,
$isa:1},
hC:{"^":"hi+y;",
$asb:function(){return[W.ak]},
$asa:function(){return[W.ak]},
$isb:1,
$isa:1},
n_:{"^":"dh;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isk:1,
$ask:function(){return[W.aj]},
$isj:1,
$asj:function(){return[W.aj]},
$isb:1,
$asb:function(){return[W.aj]},
$isa:1,
$asa:function(){return[W.aj]},
"%":"TextTrackList"},
de:{"^":"r+t;",
$asb:function(){return[W.aj]},
$asa:function(){return[W.aj]},
$isb:1,
$isa:1},
dh:{"^":"de+y;",
$asb:function(){return[W.aj]},
$asa:function(){return[W.aj]},
$isb:1,
$isa:1},
n0:{"^":"e;i:length=","%":"TimeRanges"},
al:{"^":"e;",$isc:1,"%":"Touch"},
bG:{"^":"cA;",$isbG:1,$isK:1,$isc:1,"%":"TouchEvent"},
n1:{"^":"hD;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.al]},
$isa:1,
$asa:function(){return[W.al]},
$isk:1,
$ask:function(){return[W.al]},
$isj:1,
$asj:function(){return[W.al]},
"%":"TouchList"},
hj:{"^":"e+t;",
$asb:function(){return[W.al]},
$asa:function(){return[W.al]},
$isb:1,
$isa:1},
hD:{"^":"hj+y;",
$asb:function(){return[W.al]},
$asa:function(){return[W.al]},
$isb:1,
$isa:1},
n2:{"^":"e;i:length=","%":"TrackDefaultList"},
j6:{"^":"e;","%":"Matrix|Rotation|Skew|Translation;TransformComponent"},
cA:{"^":"K;","%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent;UIEvent"},
n4:{"^":"e;",
j:function(a){return String(a)},
$ise:1,
"%":"URL"},
n6:{"^":"r;i:length=","%":"VideoTrackList"},
n9:{"^":"e;i:length=","%":"VTTRegionList"},
na:{"^":"r;ad:url=",
E:function(a,b){return a.send(b)},
"%":"WebSocket"},
bd:{"^":"aw;",
geW:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.d(new P.l("deltaY is not supported"))},
geV:function(a){if(a.deltaX!==undefined)return a.deltaX
throw H.d(new P.l("deltaX is not supported"))},
$isbd:1,
$isaw:1,
$isK:1,
$isc:1,
"%":"WheelEvent"},
jd:{"^":"r;",
ew:function(a,b){return a.requestAnimationFrame(H.ao(b,1))},
ed:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$ise:1,
"%":"DOMWindow|Window"},
nb:{"^":"r;",$ise:1,"%":"Worker"},
nc:{"^":"r;",$ise:1,"%":"CompositorWorkerGlobalScope|DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope|SharedWorkerGlobalScope|WorkerGlobalScope"},
ng:{"^":"e;M:height=,aw:left=,aA:top=,O:width=",
j:function(a){return"Rectangle ("+H.f(a.left)+", "+H.f(a.top)+") "+H.f(a.width)+" x "+H.f(a.height)},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.o(b)
if(!z.$isE)return!1
y=a.left
x=z.gaw(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaA(b)
if(y==null?x==null:y===x){y=a.width
x=z.gO(b)
if(y==null?x==null:y===x){y=a.height
z=z.gM(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gn:function(a){var z,y,x,w
z=J.N(a.left)
y=J.N(a.top)
x=J.N(a.width)
w=J.N(a.height)
return W.et(W.am(W.am(W.am(W.am(0,z),y),x),w))},
$isE:1,
$asE:I.H,
"%":"ClientRect"},
nh:{"^":"hE;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isk:1,
$ask:function(){return[P.E]},
$isj:1,
$asj:function(){return[P.E]},
$isb:1,
$asb:function(){return[P.E]},
$isa:1,
$asa:function(){return[P.E]},
"%":"ClientRectList|DOMRectList"},
hk:{"^":"e+t;",
$asb:function(){return[P.E]},
$asa:function(){return[P.E]},
$isb:1,
$isa:1},
hE:{"^":"hk+y;",
$asb:function(){return[P.E]},
$asa:function(){return[P.E]},
$isb:1,
$isa:1},
ni:{"^":"hF;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.a7]},
$isa:1,
$asa:function(){return[W.a7]},
$isk:1,
$ask:function(){return[W.a7]},
$isj:1,
$asj:function(){return[W.a7]},
"%":"CSSRuleList"},
hl:{"^":"e+t;",
$asb:function(){return[W.a7]},
$asa:function(){return[W.a7]},
$isb:1,
$isa:1},
hF:{"^":"hl+y;",
$asb:function(){return[W.a7]},
$asa:function(){return[W.a7]},
$isb:1,
$isa:1},
nj:{"^":"v;",$ise:1,"%":"DocumentType"},
nk:{"^":"fD;",
gM:function(a){return a.height},
gO:function(a){return a.width},
"%":"DOMRect"},
nm:{"^":"hp;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isk:1,
$ask:function(){return[W.ac]},
$isj:1,
$asj:function(){return[W.ac]},
$isb:1,
$asb:function(){return[W.ac]},
$isa:1,
$asa:function(){return[W.ac]},
"%":"GamepadList"},
h5:{"^":"e+t;",
$asb:function(){return[W.ac]},
$asa:function(){return[W.ac]},
$isb:1,
$isa:1},
hp:{"^":"h5+y;",
$asb:function(){return[W.ac]},
$asa:function(){return[W.ac]},
$isb:1,
$isa:1},
no:{"^":"Z;",$ise:1,"%":"HTMLFrameSetElement"},
np:{"^":"hq;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.v]},
$isa:1,
$asa:function(){return[W.v]},
$isk:1,
$ask:function(){return[W.v]},
$isj:1,
$asj:function(){return[W.v]},
"%":"MozNamedAttrMap|NamedNodeMap"},
h6:{"^":"e+t;",
$asb:function(){return[W.v]},
$asa:function(){return[W.v]},
$isb:1,
$isa:1},
hq:{"^":"h6+y;",
$asb:function(){return[W.v]},
$asa:function(){return[W.v]},
$isb:1,
$isa:1},
nq:{"^":"fo;ad:url=","%":"Request"},
nu:{"^":"r;",$ise:1,"%":"ServiceWorker"},
nv:{"^":"hr;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isb:1,
$asb:function(){return[W.ah]},
$isa:1,
$asa:function(){return[W.ah]},
$isk:1,
$ask:function(){return[W.ah]},
$isj:1,
$asj:function(){return[W.ah]},
"%":"SpeechRecognitionResultList"},
h7:{"^":"e+t;",
$asb:function(){return[W.ah]},
$asa:function(){return[W.ah]},
$isb:1,
$isa:1},
hr:{"^":"h7+y;",
$asb:function(){return[W.ah]},
$asa:function(){return[W.ah]},
$isb:1,
$isa:1},
nw:{"^":"hs;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return a[b]},
$isk:1,
$ask:function(){return[W.ai]},
$isj:1,
$asj:function(){return[W.ai]},
$isb:1,
$asb:function(){return[W.ai]},
$isa:1,
$asa:function(){return[W.ai]},
"%":"StyleSheetList"},
h8:{"^":"e+t;",
$asb:function(){return[W.ai]},
$asa:function(){return[W.ai]},
$isb:1,
$isa:1},
hs:{"^":"h8+y;",
$asb:function(){return[W.ai]},
$asa:function(){return[W.ai]},
$isb:1,
$isa:1},
ny:{"^":"e;",$ise:1,"%":"WorkerLocation"},
nz:{"^":"e;",$ise:1,"%":"WorkerNavigator"},
ju:{"^":"e3;$ti",
bE:function(a,b,c,d){return W.x(this.a,this.b,a,!1,H.I(this,0))}},
nl:{"^":"ju;a,b,c,$ti"},
jv:{"^":"iV;a,b,c,d,e,$ti",
a9:function(a){if(this.b==null)return
this.eE()
this.b=null
this.d=null
return},
eD:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.fc(x,this.c,z,!1)}},
eE:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.fd(x,this.c,z,!1)}},
dV:function(a,b,c,d,e){this.eD()},
l:{
x:function(a,b,c,d,e){var z=W.eR(new W.jw(c))
z=new W.jv(0,a,b,z,!1,[e])
z.dV(a,b,c,!1,e)
return z}}},
jw:{"^":"h:1;a",
$1:function(a){return this.a.$1(a)}},
y:{"^":"c;$ti",
gD:function(a){return new W.fM(a,this.gi(a),-1,null)},
J:function(a,b,c,d,e){throw H.d(new P.l("Cannot setRange on immutable List."))},
a7:function(a,b,c,d){return this.J(a,b,c,d,0)},
$isb:1,
$asb:null,
$isa:1,
$asa:null},
fM:{"^":"c;a,b,c,d",
t:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cX(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gu:function(){return this.d}}}],["","",,P,{"^":"",
kV:function(a){return a},
kW:function(a){var z,y,x,w,v
if(a==null)return
z=P.dz()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.aH)(y),++w){v=y[w]
z.k(0,v,a[v])}return z},
kT:function(a,b){var z={}
a.W(0,new P.kU(z))
return z},
fC:function(a){var z,y,x
try{y=document.createEvent(a)
y.initEvent("",!0,!0)
z=y
return!!J.o(z).$isK}catch(x){H.J(x)}return!1},
kU:{"^":"h:16;a",
$2:function(a,b){this.a[a]=b}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
es:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
jV:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
jU:{"^":"c;",
fE:function(a){if(a<=0||a>4294967296)throw H.d(P.is("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
ay:{"^":"c;ae:a>,af:b>,$ti",
j:function(a){return"Point("+H.f(this.a)+", "+H.f(this.b)+")"},
q:function(a,b){var z,y,x
if(b==null)return!1
z=J.o(b)
if(!z.$isay)return!1
y=this.a
x=z.gae(b)
if(y==null?x==null:y===x){y=this.b
z=z.gaf(b)
z=y==null?z==null:y===z}else z=!1
return z},
gn:function(a){var z,y
z=J.N(this.a)
y=J.N(this.b)
return P.jV(P.es(P.es(0,z),y))},
G:function(a,b){return new P.ay(C.d.G(this.a,C.k.gae(b)),C.d.G(this.b,C.k.gaf(b)),this.$ti)}},
k7:{"^":"c;$ti"},
E:{"^":"k7;$ti",$asE:null}}],["","",,P,{"^":"",lB:{"^":"b6;",$ise:1,"%":"SVGAElement"},lD:{"^":"u;",$ise:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},lU:{"^":"u;",$ise:1,"%":"SVGFEBlendElement"},lV:{"^":"u;",$ise:1,"%":"SVGFEColorMatrixElement"},lW:{"^":"u;",$ise:1,"%":"SVGFEComponentTransferElement"},lX:{"^":"u;",$ise:1,"%":"SVGFECompositeElement"},lY:{"^":"u;",$ise:1,"%":"SVGFEConvolveMatrixElement"},lZ:{"^":"u;",$ise:1,"%":"SVGFEDiffuseLightingElement"},m_:{"^":"u;",$ise:1,"%":"SVGFEDisplacementMapElement"},m0:{"^":"u;",$ise:1,"%":"SVGFEFloodElement"},m1:{"^":"u;",$ise:1,"%":"SVGFEGaussianBlurElement"},m2:{"^":"u;",$ise:1,"%":"SVGFEImageElement"},m3:{"^":"u;",$ise:1,"%":"SVGFEMergeElement"},m4:{"^":"u;",$ise:1,"%":"SVGFEMorphologyElement"},m5:{"^":"u;",$ise:1,"%":"SVGFEOffsetElement"},m6:{"^":"u;",$ise:1,"%":"SVGFESpecularLightingElement"},m7:{"^":"u;",$ise:1,"%":"SVGFETileElement"},m8:{"^":"u;",$ise:1,"%":"SVGFETurbulenceElement"},mb:{"^":"u;",$ise:1,"%":"SVGFilterElement"},b6:{"^":"u;",$ise:1,"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},mg:{"^":"b6;",$ise:1,"%":"SVGImageElement"},aM:{"^":"e;",$isc:1,"%":"SVGLength"},mk:{"^":"ht;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.aM]},
$isa:1,
$asa:function(){return[P.aM]},
"%":"SVGLengthList"},h9:{"^":"e+t;",
$asb:function(){return[P.aM]},
$asa:function(){return[P.aM]},
$isb:1,
$isa:1},ht:{"^":"h9+y;",
$asb:function(){return[P.aM]},
$asa:function(){return[P.aM]},
$isb:1,
$isa:1},mm:{"^":"u;",$ise:1,"%":"SVGMarkerElement"},mn:{"^":"u;",$ise:1,"%":"SVGMaskElement"},aP:{"^":"e;",$isc:1,"%":"SVGNumber"},mA:{"^":"hu;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.aP]},
$isa:1,
$asa:function(){return[P.aP]},
"%":"SVGNumberList"},ha:{"^":"e+t;",
$asb:function(){return[P.aP]},
$asa:function(){return[P.aP]},
$isb:1,
$isa:1},hu:{"^":"ha+y;",
$asb:function(){return[P.aP]},
$asa:function(){return[P.aP]},
$isb:1,
$isa:1},mC:{"^":"u;",$ise:1,"%":"SVGPatternElement"},mF:{"^":"e;i:length=","%":"SVGPointList"},mK:{"^":"u;",$ise:1,"%":"SVGScriptElement"},mV:{"^":"hv;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.p]},
$isa:1,
$asa:function(){return[P.p]},
"%":"SVGStringList"},hb:{"^":"e+t;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},hv:{"^":"hb+y;",
$asb:function(){return[P.p]},
$asa:function(){return[P.p]},
$isb:1,
$isa:1},u:{"^":"d9;",$ise:1,"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},mW:{"^":"b6;",$ise:1,"%":"SVGSVGElement"},mX:{"^":"u;",$ise:1,"%":"SVGSymbolElement"},iZ:{"^":"b6;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},mY:{"^":"iZ;",$ise:1,"%":"SVGTextPathElement"},aU:{"^":"e;",$isc:1,"%":"SVGTransform"},n3:{"^":"hw;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return a.getItem(b)},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.aU]},
$isa:1,
$asa:function(){return[P.aU]},
"%":"SVGTransformList"},hc:{"^":"e+t;",
$asb:function(){return[P.aU]},
$asa:function(){return[P.aU]},
$isb:1,
$isa:1},hw:{"^":"hc+y;",
$asb:function(){return[P.aU]},
$asa:function(){return[P.aU]},
$isb:1,
$isa:1},n5:{"^":"b6;",$ise:1,"%":"SVGUseElement"},n7:{"^":"u;",$ise:1,"%":"SVGViewElement"},n8:{"^":"e;",$ise:1,"%":"SVGViewSpec"},nn:{"^":"u;",$ise:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},nr:{"^":"u;",$ise:1,"%":"SVGCursorElement"},ns:{"^":"u;",$ise:1,"%":"SVGFEDropShadowElement"},nt:{"^":"u;",$ise:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",lG:{"^":"e;i:length=","%":"AudioBuffer"}}],["","",,P,{"^":"",bm:{"^":"K;",$isbm:1,$isK:1,$isc:1,"%":"WebGLContextEvent"},cs:{"^":"e;",
dl:function(a,b,c,d,e,f,g,h,i,j){var z,y
z=i==null
if(!z&&h!=null&&typeof g==="number"&&Math.floor(g)===g){a.texImage2D(b,c,d,e,f,g,h,i,j)
return}if(g==null&&h==null&&z&&!0){a.texImage2D(b,c,d,e,f,P.kV(g))
return}y=J.o(g)
if(!!y.$isbo&&h==null&&z&&!0){a.texImage2D(b,c,d,e,f,g)
return}if(!!y.$isb1&&h==null&&z&&!0){a.texImage2D(b,c,d,e,f,g)
return}throw H.d(P.O("Incorrect number or type of arguments"))},
aZ:function(a,b,c,d,e,f,g){return this.dl(a,b,c,d,e,f,g,null,null,null)},
$iscs:1,
"%":"WebGLRenderingContext"},mI:{"^":"e;",$ise:1,"%":"WebGL2RenderingContext"},j8:{"^":"e;",$isc:1,"%":"WebGLUniformLocation"},nx:{"^":"e;",$ise:1,"%":"WebGL2RenderingContextBase"}}],["","",,P,{"^":"",mQ:{"^":"hx;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.w(b,a,null,null,null))
return P.kW(a.item(b))},
k:function(a,b,c){throw H.d(new P.l("Cannot assign element of immutable List."))},
m:function(a,b){return this.h(a,b)},
$isb:1,
$asb:function(){return[P.aO]},
$isa:1,
$asa:function(){return[P.aO]},
"%":"SQLResultSetRowList"},hd:{"^":"e+t;",
$asb:function(){return[P.aO]},
$asa:function(){return[P.aO]},
$isb:1,
$isa:1},hx:{"^":"hd+y;",
$asb:function(){return[P.aO]},
$asa:function(){return[P.aO]},
$isb:1,
$isa:1}}],["","",,A,{"^":"",b2:{"^":"i1;a,b,c,$ti",
gi:function(a){return this.c.length},
h:function(a,b){return this.c[b]},
k:function(a,b,c){this.c[b]=c},
cv:function(a,b,c){var z
if(a<b)z=a+c
else z=a>=c?a-c:a
return z},
C:function(a,b,c,d,e){var z,y,x
if(d){z=this.a
if(b<0)y=b+z
else y=b>=z?b-z:b
z=this.b
if(c<0)x=c+z
else x=c>=z?c-z:c}else{if(b<0||b>this.a-1||c<0||c>this.b-1)return e
x=c
y=b}return this.c[y+x*this.a]},
aE:function(a,b,c){return this.C(a,b,c,null,null)},
a6:function(a,b,c,d,e){var z,y
if(e){z=this.cv(b,0,this.a)
y=this.cv(c,0,this.b)}else{if(b<0||b>this.a-1||c<0||c>this.b-1)return
y=c
z=b}this.c[z+y*this.a]=d},
eJ:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=this.a
y=this.b
x=A.b3(z,y,!1,P.cN)
for(w=0;w<y;w=u)for(v=w-1,u=w+1,t=0;t<z;++t)if(C.b.aN(a,this.C(0,t,w,b,null)))for(s=t-1,r=t+1,q=v;q<=u;++q)for(p=s;p<=r;++p)x.a6(0,p,q,!0,b)
return x},
eI:function(a,b){return this.eJ(a,b,null)},
$isb:1,
l:{
b3:function(a,b,c,d){var z,y,x
z=a*b
y=P.i3(z,c,!1,d)
if(a===0)return new A.b2(0,b,[],[null])
x=a>0&&!0
z=x?C.a.ai(z,a):0
return new A.b2(a,z,y,[null])}}}}],["","",,Y,{"^":"",fP:{"^":"c;a,b,c,d,e,f",l:{
fQ:function(a,b,c,d,e){var z=new H.jb(e,new Y.fR(),[H.I(e,0)])
return new Y.fP(a,b,c,d,e,z.gi(z))}}},fR:{"^":"h:1;",
$1:function(a){return a}}}],["","",,S,{"^":"",fq:{"^":"c;"}}],["","",,K,{"^":"",P:{"^":"c;a,b",
j:function(a){return this.b}},i9:{"^":"fq;a,b,c,$ti",
ds:function(a,b){var z,y,x,w,v,u,t,s
z=A.b3(a,b,null,H.I(this,0))
y=-C.i.p(a/2)
x=-C.i.p(b/2)
for(w=this.c,v=this.b,u=0;u<a;++u)for(t=u+y,s=0;s<b;++s)z.a6(0,u,s,$.$get$dH().h(0,this.a).$2(t,(s+x)*-1)?v:w,!0)
return z}},kG:{"^":"h:3;",
$2:function(a,b){return C.Z.fE(2)===0}},kH:{"^":"h:3;",
$2:function(a,b){return Math.cos(a*10)>Math.sin(b*10)}},kK:{"^":"h:3;",
$2:function(a,b){return b===0||C.a.H(a,b)===0}},kL:{"^":"h:3;",
$2:function(a,b){return b>0&&(C.a.H(a,b)&(a^b))>>>0>2}},kM:{"^":"h:3;",
$2:function(a,b){return C.a.H((a^b)>>>0,8)===0}},kN:{"^":"h:3;",
$2:function(a,b){return C.d.H(Math.abs((a^b)>>>0),8)<4}},kO:{"^":"h:3;",
$2:function(a,b){return(a^b)>>>0>~a>>>0&&b<=0}},kP:{"^":"h:3;",
$2:function(a,b){return((a^b)>>>0)+a>=0}},kQ:{"^":"h:3;",
$2:function(a,b){return((a^b)>>>0)+a-b===0}},kR:{"^":"h:3;",
$2:function(a,b){return C.a.H(((a^b)>>>0)+a-b,1024)===0}},kI:{"^":"h:3;",
$2:function(a,b){var z=((a^b)>>>0)+b-a
return z===0||z%b===0}}}],["","",,T,{"^":"",e0:{"^":"c;a,b",
j:function(a){return this.b}},im:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch",
bB:function(a,b){var z=0,y=P.d6(),x=this,w
var $async$bB=P.eQ(function(c,d){if(c===1)return P.eA(d,y)
while(true)switch(z){case 0:x.d=a
w=U.lv(a,null)
x.b=w
x.c=w.bD(new T.io(x))
return P.eB(null,y)}})
return P.eC($async$bB,y)},
cr:function(){var z,y,x,w,v
z=this.a
z.eL()
y=this.Q
x=z.bl(!0,this.z)
if(y.b>=4)H.q(y.ak())
y.aj(0,x)
y=Date.now()
x=this.r
if(x!=null){w=y-x
if(w>0)this.f=(this.f+1/(w/1000))/2}this.r=y
y=z.a
x=y.length===0?0:z.B(0).a
if(C.a.H(x,C.i.p(2000/C.a.U(this.e.a,1000)))===0){x=$.$get$bQ()
x.aa(C.q,"Gen: "+(y.length===0?0:z.B(0).a)+" | Activity: "+z.gcC()+"% | FPS: "+C.d.p(this.f)+"/"+C.i.p(1000/C.a.U(this.d.a,1000)),null,null)}if(C.a.H(y.length===0?0:z.B(0).a,20)===0)if(z.gfu()){++this.x
v=z.gcC()
if(v>=5)z=v<10&&this.x>5||this.x>8
else z=!0
if(z){z=this.ch
if(z.b>=4)H.q(z.ak())
z.aj(0,C.ao)}$.$get$bQ().aa(C.q,"Stable scene counter: x"+this.x+" World activity: "+v+"%",null,null)}else this.x=0}},io:{"^":"h:17;a",
$1:function(a){return this.a.cr()}}}],["","",,E,{"^":"",fr:{"^":"c;"}}],["","",,E,{"^":"",e2:{"^":"c;a,b",
j:function(a){return this.b}},iO:{"^":"fr;a,b,c,d",
fo:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.a
y=this.b
$.$get$eK().aa(C.y,"Stage XL: "+z+"x"+y+" ("+e+"x"+d+"px)",null,null)
x=C.i.p(e/z)
w=C.i.p(d/y)
v=$.$get$cv()
v.a=C.r
v.f=4278190080
v.x=!1
v.c=C.v
v.e=C.n
switch(b){case C.U:v.d=C.w
break
case C.as:v.d=C.T
break}u=A.iL(a,d,null,e)
v=A.d_
t=H.m([],[v])
s=new T.av(new Float32Array(H.z(16)))
s.P()
r=new T.av(new Float32Array(H.z(16)))
r.P()
q=$.T
$.T=q+1
p=[A.c2]
o=new A.fi(t,s,r,q,0,0,0,0,1,1,0,0,0,1,!0,!1,null,null,H.m([],p),null,"",null,T.D(),!0,null,null)
v=A.b3(z,y,null,v)
this.d=v
for(z=v,n=0;n<z.a;++n,z=y)for(z=n*x,m=0;y=this.d,m<y.b;++m){y=$.T
$.T=y+1
l=new A.d_(null,y,0,0,0,0,1,1,0,0,0,1,!0,!1,null,null,H.m([],p),null,"",null,T.D(),!0,null,null)
l.c=z
l.d=m*w
t.push(l)
l.fy=o
this.d.a6(0,n,m,l,!1)}if(o.fy===u)u.e0(o)
else{o.fK()
u.eC(o)
u.rx.push(o)
o.fy=u
o.v(0,new R.a9("added",!0,C.c,null,null,!1,!1))
if(u.gbQ()!=null)u.cb(o,"addedToStage")}z=x+2
y=w+2
k=A.fm(z*c.length,y,4294967295,1)
v=[U.b5]
t=H.m([],v)
v=H.m([],v)
s=new U.fS(t,v,null)
$.T=$.T+1
H.m([],p)
T.D()
for(j=0;j<c.length;++j){i=new U.fT(null)
i.a=s
t.push(i)
C.b.si(v,0)
s.c=null
i=new U.fW(j*z,0,z,y,null)
i.a=s
t.push(i)
C.b.si(v,0)
s.c=null
i=new U.fV(c[j],null)
i.a=s
t.push(i)
C.b.si(v,0)
s.c=null}h=A.fl(k)
g=L.dY(h.b,h.c,null,null)
s.a4(g)
h.a.c.a.fT(0)
f=k.dG(x,w,1,2)
for(z=this.c,j=0;j<c.length;++j)z.k(0,c[j],f[j])
z=new K.dx(null,null,0,new P.Q(null,null,0,null,null,null,null,[P.F]))
y=new K.ek(null,null)
z.a=y
z.b=y
y=H.m([],[A.ct])
z=new A.iz(z,y,new R.fI(0,"enterFrame",!1,C.c,null,null,!1,!1),new R.fK("exitFrame",!1,C.c,null,null,!1,!1),0,!1)
z.dI(0)
v=u.y2
if(!(v==null))if(C.b.N(v.c,u))u.y2=null
u.y2=z
y.push(u)},
fn:function(a,b,c,d){return this.fo(a,C.U,b,c,d)},
a4:function(a){var z,y,x,w,v,u
for(z=a.a,y=a.b,x=this.c,w=0;w<z;++w)for(v=0;v<y;++v){u=a.aE(0,w,v)
if(u==null)continue
this.d.aE(0,w,v).seN(x.h(0,u))}}}}],["","",,B,{"^":"",fs:{"^":"c;"}}],["","",,X,{"^":"",ab:{"^":"c;a,b",
j:function(a){return this.b}},fN:{"^":"fs;d,a,b,c",
eO:function(a,b,c){var z,y,x,w,v,u,t,s
z=c.aE(0,a,b)
y=this.a
x=this.b
switch("moore"){case"moore":default:w=a-1
v=b-1
u=a+1
t=b+1}s=C.b.ff([c.C(0,w,v,y,x),c.C(0,a,v,y,x),c.C(0,u,v,y,x),c.C(0,w,b,y,x),c.C(0,u,b,y,x),c.C(0,w,t,y,x),c.C(0,a,t,y,x),c.C(0,u,t,y,x)],0,new X.fO(this))
switch(z){case C.m:case C.j:y=J.cR(s)
if(y.a5(s,2))return C.o
if(C.b.aN([2,3],s))return C.m
if(y.ah(s,3))return C.p
break
case C.l:case C.o:case C.p:if(J.a5(s,3))return C.j
break}return z}},fO:{"^":"h:18;a",
$2:function(a,b){return J.fa(a,this.a.d.h(0,b))}}}],["","",,L,{"^":"",iK:{"^":"c;a,b,c,d,e,$ti",
gfu:function(){var z,y,x,w,v
z=C.ac.gf2()
y=this.a
if(y.length>2)if(z.$2(this.B(0).e,this.B(1).e)&&z.$2(this.B(0).e,this.B(2).e))return!0
if(y.length>60)for(x=1;x<=30;++x){v=0
while(!0){if(!(v<2)){w=!0
break}if(this.B(v).f!==this.B(v+x*v).f){w=!1
break}++v}if(w){$.$get$eJ().aa(C.q,"Stable scene detected! Repeating pattern "+x,null,null)
return!0}}return!1},
gcC:function(){if(this.a.length===0)return 100
if(this.B(0).f===0)return 0
return C.i.p(this.B(0).f/(this.c*this.d)*100)},
B:function(a){var z,y
z=this.a
y=z.length-1
if(y<a)return
return z[y-a]},
ag:function(){return this.B(0)},
bl:function(a,b){var z,y,x,w,v,u,t,s
z=this.c
y=this.d
x=A.b3(z,y,null,null)
for(w=this.e,v=this.a,u=0;u<z;++u)for(t=0;t<y;++t){s=this.ag().d.C(0,u,t,w.a,w.b)
if(v.length>1&&a&&J.a5(s,this.B(1).d.C(0,u,t,w.a,w.b)))continue
x.a6(0,u,t,b.h(0,s),w.a)}return x},
d7:function(a){var z,y
z=this.ag()
z=z==null?z:z.a
if(z==null)z=0
y=this.a
y.push(Y.fQ(z+1,this.c,this.d,a,a.eI([C.j,C.m],this.e.a)))
if(y.length>this.b)C.b.fM(y,0,1)
return},
eM:function(a){var z,y,x,w,v,u
z=this.c
y=this.d
x=A.b3(z,y,null,H.I(this,0))
for(w=this.e,v=0;v<z;++v)for(u=0;u<y;++u)if(this.ag().e.aE(0,v,u))x.a6(0,v,u,w.eO(v,u,this.ag().d),w.a)
else x.a6(0,v,u,this.ag().d.C(0,v,u,w.a,null),w.a)
this.d7(x)},
eL:function(){return this.eM(null)}}}],["","",,U,{"^":"",
lv:function(a,b){var z,y,x,w,v
z={}
z.a=null
z.b=null
z.c=0
y=new U.lw(z,a,new U.ly(z,b))
x=new U.lx(z)
w=P.i
v=new P.cC(null,0,null,y,x,y,x,[w])
z.a=v
return new P.bK(v,[w])},
ly:{"^":"h:19;a,b",
$1:function(a){var z,y
z=this.a
y=++z.c
z=z.a
if(z.b>=4)H.q(z.ak())
z.aj(0,y)}},
lw:{"^":"h:2;a,b,c",
$0:function(){this.a.b=P.j5(this.b,this.c)}},
lx:{"^":"h:2;a",
$0:function(){var z,y
z=this.a
y=z.b
if(y!=null){y.a9(0)
z.b=null}}}}],["","",,U,{"^":"",fB:{"^":"c;$ti"},dA:{"^":"c;a,$ti",
h9:[function(a,b){var z,y,x,w
if(a===b)return!0
z=a.c
y=z.length
x=b.c
if(y!==x.length)return!1
for(w=0;w<y;++w)if(!J.a5(z[w],x[w]))return!1
return!0},"$2","gf2",4,0,function(){return H.kS(function(a){return{func:1,ret:P.cN,args:[[P.b,a],[P.b,a]]}},this.$receiver,"dA")}]}}],["","",,N,{"^":"",cg:{"^":"c;a,b,c,d,e,f",
gcZ:function(){var z,y,x
z=this.b
y=z==null||z.a===""
x=this.a
return y?x:z.gcZ()+"."+x},
gd3:function(a){var z
if($.f0){z=this.b
if(z!=null)return z.gd3(z)}return $.kv},
fB:function(a,b,c,d,e){var z,y,x,w,v,u
x=a.b
if(x>=this.gd3(this).b){if(!!J.o(b).$isc9)b=b.$0()
w=b
if(typeof w!=="string")b=J.aI(b)
if(d==null&&x>=$.lr.b)try{x="autogenerated stack trace for "+a.j(0)+" "+H.f(b)
throw H.d(x)}catch(v){z=H.J(v)
y=H.M(v)
d=y
if(c==null)c=z}this.gcZ()
Date.now()
$.dC=$.dC+1
if($.f0)for(u=this;u!=null;)u=u.b
else $.$get$dE().f}},
aa:function(a,b,c,d){return this.fB(a,b,c,d,null)},
l:{
au:function(a){return $.$get$dD().da(0,a,new N.kF(a))}}},kF:{"^":"h:0;a",
$0:function(){var z,y,x,w
z=this.a
if(C.f.dJ(z,"."))H.q(P.O("name shouldn't start with a '.'"))
y=C.f.fz(z,".")
if(y===-1)x=z!==""?N.au(""):null
else{x=N.au(C.f.aG(z,0,y))
z=C.f.bR(z,y+1)}w=new H.B(0,null,null,null,null,null,0,[P.p,N.cg])
w=new N.cg(z,x,null,w,new P.ja(w,[null,null]),null)
if(x!=null)x.d.k(0,z,w)
return w}},bs:{"^":"c;a,b",
q:function(a,b){if(b==null)return!1
return b instanceof N.bs&&this.b===b.b},
a5:function(a,b){return C.a.a5(this.b,b.gfU(b))},
ah:function(a,b){return C.a.ah(this.b,b.gfU(b))},
gn:function(a){return this.b},
j:function(a){return this.a}}}],["","",,K,{"^":"",ek:{"^":"c;a,b"},dx:{"^":"c;a,b,c,d",
aL:function(a){var z,y,x,w,v
z=this.c+=a
y=this.d
if(!y.gb8())H.q(y.b2())
y.a_(z)
x=this.a
w=this.b
for(;x!==w;){v=x.b
x.a=v.a
x.b=v.b
if(v===w)w=x
if(v===this.b)this.b=x}return!0}}}],["","",,A,{"^":"",d_:{"^":"a8;k2,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,a",
seN:function(a){this.k2=a}},fi:{"^":"a8;k2,k3,k4,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,a",
dd:function(a){var z,y
if(a.fy!==this)throw H.d(P.O("The supplied Bitmap must be a child of the caller."))
else{z=this.k2
y=C.b.d0(z,a)
a.fy=null
C.b.aV(z,y)}},
a4:function(a){if(a.c instanceof L.cq)this.ev(a)
else this.eu(a)},
ev:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=H.cU(a.c,"$iscq")
y=z.f
x=a.gZ()
w=a.gY()
v=a.gX(a)
u=T.D()
t=new T.av(new Float32Array(H.z(16)))
t.P()
s=new A.jl(null,w,v,0,0,z,new L.bJ(1,C.h,u,t,null,null),null)
s.bV(z,null,null,null)
s.a=a.a
s.b=a.b
t=this.k3
t.ap(y)
u=this.k4
u.eU(x,y)
z.cA(u)
for(w=this.k2,v=z.cy,u=z.fx,r=y.a,q=0;q<w.length;++q){p=w[q]
if(p.cx){o=p.k2
if(o!=null){s.f=p
n=o.c
m=z.x
if(v!==m){m.A(0)
z.x=v
v.an(0,z)
m=z.x
l=m.e.h(0,"uProjectionMatrix")
m.b.uniformMatrix4fv(l,!1,r)}m=s.gY()
if(m!==z.Q){z.x.A(0)
z.Q=m
z.e.blendFunc(m.a,m.b)}m=n.a
if(m!==u[0]){z.x.A(0)
u[0]=m
m.cw(0,z,33984)}v.ab(s,n)}}}z.cA(t)},
eu:function(a){var z,y,x,w,v
z=H.cU(a.c,"$isaR")
for(y=this.k2,x=0;x<y.length;++x){w=y[x]
if(w.cx){v=w.k2
if(v!=null){a.bH(w.gaB(),w.ch,w.dx)
z.ab(a,v.c)
a.bG()}}}}},jl:{"^":"dX;f,r,x,a,b,c,d,e",
gZ:function(){return this.f.gaB()},
gX:function(a){return this.f.ch*this.x},
gY:function(){this.f.dx
return this.r},
aW:function(a){throw H.d(new P.C("Not supported"))},
bH:function(a,b,c){throw H.d(new P.C("Not supported"))},
bG:function(){throw H.d(new P.C("Not supported"))}},aJ:{"^":"c;a,b,c",
dH:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p
z=a+e
y=C.d.ai(this.a-d+e,z)
x=b+e
w=C.d.ai(this.b-d+e,x)
v=H.m([],[A.aJ])
c=w*y
for(u=[P.F],t=this.c,s=0;s<c;++s){r=t.cL(new U.az(d+C.a.H(s,y)*z,d+C.a.ai(s,y)*x,a,b,u))
q=r.c
p=r.e
v.push(new A.aJ(q.c/p,q.d/p,r))}return v},
dG:function(a,b,c,d){return this.dH(a,b,null,c,d)},
l:{
d0:function(a){var z,y
z=a.c
y=a.e
return new A.aJ(z.c/y,z.d/y,a)},
fm:function(a,b,c,d){var z,y,x,w,v,u,t
z=C.d.p(a*d)
y=C.d.p(b*d)
x=new L.cr(0,0,null,null,C.J,C.t,C.t,null,-1,!1,null,null,-1)
if(z<=0)H.q(P.O("width"))
if(y<=0)H.q(P.O("height"))
w=V.b_(z)
x.a=w
v=V.b_(y)
x.b=v
u=W.c6(v,w)
x.d=u
x.c=u
if(c!==0){t=u.getContext("2d")
t.fillStyle=V.bT(c)
t.fillRect(0,0,w,v)}w=x.gdc()
return A.d0(L.bD(w.a,w.b,w.c,w.d,d))},
bk:function(a,b){var z=0,y=P.d6(),x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
var $async$bk=P.eQ(function(c,d){if(c===1)return P.eA(d,y)
while(true)switch(z){case 0:b=$.$get$d1()
w=P.iw("@(\\d)x",!0,!1).fd(a)
v=b.d
if(w!=null){u=w.b
t=H.ir(u[1],null,null)
s=V.lm(J.c0($.$get$cP()),v)
r=s/t
q=u.index
u=u[0].length
p="@"+s+"x"
o=P.bc(q,q+u,a.length,null,null,null)
n=a.substring(0,q)
m=a.substring(o)
a=n+p+m}else r=1
u=W.fY(null,null,null)
q=W.bo
p=new P.a3(0,$.n,null,[q])
l=new N.fZ(u,new P.je(p,[q]),a,null,null)
q=W.K
l.d=W.x(u,"load",l.gel(),!1,q)
l.e=W.x(u,"error",l.gek(),!1,q)
u.src=a
z=3
return P.kj(p,$async$bk)
case 3:k=d
j=new L.cr(0,0,null,null,C.J,C.t,C.t,null,-1,!1,null,null,-1)
j.a=V.b_(k.width)
j.b=V.b_(k.height)
j.c=k
u=j.gdc()
x=A.d0(L.bD(u.a,u.b,u.c,u.d,r))
z=1
break
case 1:return P.eB(x,y)}})
return P.eC($async$bk,y)}}},fj:{"^":"c;a,b,c,d,e"},fk:{"^":"c;a,b,c",l:{
fl:function(a){var z,y,x,w,v
z=a.c
y=z.a
y=y.geP(y)
x=T.D()
y.toString
w=y.getContext("2d")
v=[L.aS]
y=new L.aR(y,w,x,C.h,1,new L.aA(0,0,0),new P.Q(null,null,0,null,null,null,null,v),new P.Q(null,null,0,null,null,null,null,v))
y.ac(0)
return new A.fk(a,y,z.gf1())}}},c2:{"^":"iy;"},a8:{"^":"db;",
gfO:function(a){var z,y
for(z=this;y=z.fy,y!=null;z=y);return z},
gbQ:function(){var z=this.gfO(this)
return z instanceof A.ct?z:null},
gaB:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(this.id){this.id=!1
z=this.go
y=this.Q
x=this.r
w=this.x
v=this.y
u=this.z
if(x>-0.0001&&x<0.0001)x=x>=0?0.0001:-0.0001
if(w>-0.0001&&w<0.0001)w=w>=0?0.0001:-0.0001
if(v!==0||u!==0){t=u+y
s=x*Math.cos(t)
r=x*Math.sin(t)
t=v+y
q=-w*Math.sin(t)
p=w*Math.cos(t)
t=this.c
o=this.e
n=this.f
z.a8(s,r,q,p,t-o*s-n*q,this.d-o*r-n*p)}else if(y!==0){t=Math.cos(y)
o=Math.sin(y)
s=x*t
r=x*o
q=-w*o
p=w*t
t=this.c
o=this.e
n=this.f
z.a8(s,r,q,p,t-o*s-n*q,this.d-o*r-n*p)}else z.a8(x,0,0,w,this.c-this.e*x,this.d-this.f*w)}return this.go},
fK:function(){var z=this.fy
if(z!=null)z.dd(this)},
F:function(a,b){b.a=a.a
b.b=a.b
this.cf(b)
return b},
cf:function(a){var z,y,x,w,v,u,t,s,r
z=this.fy
if(z!=null)z.cf(a)
y=a.a
x=a.b
z=this.gaB().a
w=z[3]
v=y-z[4]
u=z[2]
t=x-z[5]
s=z[0]
z=z[1]
r=s*w-z*u
a.a=(w*v-u*t)/r
a.b=(s*t-z*v)/r},
v:function(a,b){var z,y,x,w
z=H.m([],[R.db])
for(y=this.fy;y!=null;y=y.fy)z.push(y)
x=z.length-1
while(!0){if(!(x>=0&&b.gcH()))break
z[x].bp(b,this,C.a0)
if(b.f)return;--x}this.bp(b,this,C.c)
if(b.f)return
w=b.b
x=0
while(!0){if(!(x<z.length&&w))break
z[x].bp(b,this,C.a1)
if(b.f)return;++x}}},d8:{"^":"h0;",
dd:function(a){var z,y
if(a.fy!==this)throw H.d(P.O("The supplied DisplayObject must be a child of the caller."))
else{z=this.rx
y=C.b.d0(z,a)
a.v(0,new R.a9("removed",!0,C.c,null,null,!1,!1))
if(this.gbQ()!=null)this.cb(a,"removedFromStage")
a.fy=null
C.b.aV(z,y)}},
bA:["bS",function(a,b){var z,y,x,w
for(z=this.rx,y=z.length-1,x=null;y>=0;--y){w=z[y]
w.gaB()
if(w.cx&&!0)continue}return x}],
a4:function(a){var z,y,x
for(z=this.rx,y=0;y<z.length;++y){x=z[y]
if(x.cx&&!0)a.aW(x)}},
eC:function(a){var z
for(z=this;z!=null;z=z.fy)if(z===a)throw H.d(P.O("An object cannot be added as a child to one of it's children (or children's children, etc.)."))},
e0:function(a){var z,y,x,w
z=this.rx
for(y=z.length-1,x=a;y>=0;--y,x=w){w=z[y]
z[y]=x
if(a===w)break}},
cb:function(a,b){var z,y
z=!1
y=this
while(!0){if(!(y!=null&&!z))break
if(y.bz(b,!0))z=!0
y=y.fy}this.cc(a,new R.a9(b,!1,C.c,null,null,!1,!1),z)},
cc:function(a,b,c){var z,y,x
z=!c
if(!z||a.fk(b.a))a.v(0,b)
if(!!a.$isd8){c=!z||a.bz(b.a,!0)
y=a.rx
for(x=0;x<y.length;++x)this.cc(y[x],b,c)}}},h0:{"^":"a8;"},iz:{"^":"iA;b,c,d,e,f,a",
gd1:function(){return this.b},
aL:function(a){var z
this.f+=a
z=this.d
z.x=a
R.cI(z,$.$get$eE())
this.b.aL(a)
z=this.c
C.b.W(z,new A.iB(a))
C.b.W(z,new A.iC(this,a))
R.cI(this.e,$.$get$eF())}},iB:{"^":"h:1;a",
$1:function(a){a.gd1().aL(this.a)
return!0}},iC:{"^":"h:1;a,b",
$1:function(a){return a.fD(this.a.f,this.b)}},mM:{"^":"a8;k2,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,a"},cu:{"^":"c;a,b",
j:function(a){return this.b}},bF:{"^":"c;a,b",
j:function(a){return this.b}},a2:{"^":"c;a,b",
j:function(a){return this.b}},ct:{"^":"d8;x2,y1,y2,a3,cM,cN,cO,cP,aP,f3,bq,br,bs,bt,f4,aQ,cQ,cR,f5,L,bu,aR,cS,cT,cU,cV,bv,cW,cX,f6,d1:hb<,hc,bw,f7,f8,f9,fa,rx,ry,x1,k2,k3,k4,r1,r2,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,a",
bA:function(a,b){var z=this.bS(a,b)
return z!=null?z:this},
fD:function(a,b){var z,y,x,w,v
z=this.aR
if(z!==C.v)z=z===C.S
else z=!0
if(z){if($.cw==null){H.ip()
$.cw=$.bw}z=$.bx.$0()
z-=0
this.ct()
R.cI(this.f5,$.$get$eM())
this.y1.ac(0)
y=this.y1
x=y.a
x.a=0
x.b=0
x.c=0
y.bn(0,this.bw)
this.L.dg(0,this.cQ)
this.L.a=V.eY(a)
this.L.b=V.eY(b)
this.L.aW(this)
this.L.c.A(0)
this.f3=!1
w=this.y1.a
y=$.bx.$0()
y=y
v=C.a.ai((y-z)*1000,$.cw)
this.br=this.br*0.75+w.a*0.25
this.bs=this.bs*0.75+w.b*0.25
this.bt=this.bt*0.75+w.c*0.25
this.bq=this.bq*0.95+v*0.05
z=this.a3
if(z.cx){z.cy
y=!0}else y=!1
if(y){C.b.si(z.r1,0)
z.r2=0
z.rx=0
this.a3.aU(0,"FRAMETIME"+C.f.aT(C.a.j(C.d.p(this.bq)),6))
this.a3.aU(0,"DRAWCALLS"+C.f.aT(C.a.j(C.d.p(this.br)),6))
this.a3.aU(0,"VERTICES"+C.f.aT(C.a.j(C.d.p(this.bs)),7))
this.a3.aU(0,"INDICES"+C.f.aT(C.a.j(C.d.p(this.bt)),8))
this.L.dg(0,this.cR)
this.L.aW(this.a3)
this.L.c.A(0)}}if(this.aR===C.S)this.aR=C.ap},
e9:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.a
if(z===C.r)try{z=new T.av(new Float32Array(H.z(16)))
z.P()
y=H.m([],[L.k2])
x=P.p
w=[x,P.i]
v=[x,P.j8]
u=new L.iD(-1,null,null,new H.B(0,null,null,null,null,null,0,w),new H.B(0,null,null,null,null,null,0,v),new L.bz(new Int16Array(H.z(0)),35048,0,0,-1,null,null,null),new L.bA(new Float32Array(H.z(0)),35048,0,0,-1,null,null,null),new L.aA(0,0,0))
t=new Int16Array(H.z(0))
s=new Float32Array(H.z(0))
r=new Int16Array(H.z(0))
q=new Float32Array(H.z(0))
p=new Int16Array(H.z(16384))
o=new Float32Array(H.z(32768))
n=H.m(new Array(8),[L.cr])
m=H.m([],[L.dW])
l=[L.aS]
z=new L.cq(a,null,z,y,null,null,null,null,!0,0,u,new L.iE(-1,null,null,new H.B(0,null,null,null,null,null,0,w),new H.B(0,null,null,null,null,null,0,v),new L.bz(t,35048,0,0,-1,null,null,null),new L.bA(s,35048,0,0,-1,null,null,null),new L.aA(0,0,0)),new L.iF(-1,null,null,new H.B(0,null,null,null,null,null,0,w),new H.B(0,null,null,null,null,null,0,v),new L.bz(r,35048,0,0,-1,null,null,null),new L.bA(q,35048,0,0,-1,null,null,null),new L.aA(0,0,0)),new L.bz(p,35048,0,0,-1,null,null,null),new L.bA(o,35048,0,0,-1,null,null,null),n,m,new H.B(0,null,null,null,null,null,0,[x,L.bC]),new L.aA(0,0,0),new P.Q(null,null,0,null,null,null,null,l),new P.Q(null,null,0,null,null,null,null,l))
y=P.bm
W.x(a,"webglcontextlost",z.geh(),!1,y)
W.x(a,"webglcontextrestored",z.gei(),!1,y)
k=C.a_.dt(a,!1,!1,!1,!0,!1,!0)
if(!J.o(k).$iscs)H.q(new P.C("Failed to get WebGL context."))
z.e=k
k.enable(3042)
z.e.disable(2960)
z.e.disable(2929)
z.e.disable(2884)
z.e.pixelStorei(37441,1)
z.e.blendFunc(1,771)
z.x=u
u.an(0,z)
z.ch=!0
y=$.bB+1
$.bB=y
z.cx=y
z.ac(0)
return z}catch(j){H.J(j)
z=T.D()
y=a.getContext("2d")
x=[L.aS]
z=new L.aR(a,y,z,C.h,1,new L.aA(0,0,0),new P.Q(null,null,0,null,null,null,null,x),new P.Q(null,null,0,null,null,null,null,x))
z.ac(0)
return z}else if(z===C.I){z=T.D()
y=a.getContext("2d")
x=[L.aS]
z=new L.aR(a,y,z,C.h,1,new L.aA(0,0,0),new P.Q(null,null,0,null,null,null,null,x),new P.Q(null,null,0,null,null,null,null,x))
z.ac(0)
return z}else throw H.d(new P.C("Unknown RenderEngine"))},
ct:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.cM
y=this.cN
x=this.x2.getBoundingClientRect()
w=this.x2
v=w.clientLeft
u=J.c0(x.left)
t=w.clientTop
s=J.c0(x.top)
r=w.clientWidth
q=w.clientHeight
if(typeof r!=="number")throw H.d("dart2js_hint")
if(typeof q!=="number")throw H.d("dart2js_hint")
if(r===0||q===0)return
p=r/z
o=q/y
switch(this.cS){case C.T:n=o
m=p
break
case C.aq:n=p>o?p:o
m=n
break
case C.ar:m=1
n=1
break
case C.w:n=p<o?p:o
m=n
break
default:m=1
n=1}w=this.cT
switch(w){case C.N:case C.P:case C.K:l=0
break
case C.L:case C.n:case C.Q:l=(r-z*m)/2
break
case C.M:case C.O:case C.R:l=r-z*m
break
default:l=0}switch(w){case C.K:case C.L:case C.M:k=0
break
case C.N:case C.n:case C.O:k=(q-y*n)/2
break
case C.P:case C.Q:case C.R:k=q-y*n
break
default:k=0}w=this.f4
w.a=-l/m
w.b=-k/n
w.c=r/m
w.d=q/n
w=this.cQ
w.a8(m,0,0,n,l,k)
j=this.aP
w.b0(0,j,j)
j=this.aQ
j.a8(1,0,0,1,-(v+u)-l,-(t+s)-k)
j.b0(0,1/m,1/n)
j=this.cR
j.d_()
s=this.aP
j.b0(0,s,s)
if(this.cO!==r||this.cP!==q){this.cO=r
this.cP=q
w=this.x2
v=this.aP
w.width=C.d.p(r*v)
w.height=C.d.p(q*v)
if(w.clientWidth!==r||w.clientHeight!==q){w=w.style
v=H.f(r)+"px"
w.width=v
w=this.x2.style
v=H.f(q)+"px"
w.height=v}this.v(0,new R.a9("resize",!1,C.c,null,null,!1,!1))}},
bj:function(){var z,y,x,w,v,u,t,s,r,q
z=this.bv
y=$.id
if(z!=null&&y==="auto"){x=z.k4
if(x!=="auto")y=x}if(y==="auto")y="default"
w=this.cU
if(w==null?y!=null:w!==y){this.cU=y
w=this.x2.style
if($.$get$cj().aO(0,y)){v=$.$get$cj().h(0,y)
u=J.fe(v)
t=v.gfl()
s=t.gae(t)
t=v.gfl()
r=t.gaf(t)
q="url('"+H.f(u)+"') "+H.f(s)+" "+H.f(r)+", "+H.f(y)}else q=y
t=$.ic?"none":q
w.toString
w.cursor=t==null?"":t}},
h5:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
a.preventDefault()
z=Date.now()
y=a.button
x=this.aQ.bL(new P.ay(a.clientX,a.clientY,[null]))
w=new U.aQ(0,0,[P.F])
if(y<0||y>2)return
if(a.type==="mousemove"&&this.cV.q(0,x))return
v=this.f6[y]
this.cV=x
C.b.W(this.cW,new A.iP(x))
if(a.type!=="mouseout")u=this.bA(x.a,x.b)
else{this.v(0,new R.a9("mouseLeave",!1,C.c,null,null,!1,!1))
u=null}t=this.bv
if(t==null?u!=null:t!==u){s=[A.a8]
r=H.m([],s)
q=H.m([],s)
for(p=t;p!=null;p=p.fy)r.push(p)
for(p=u;p!=null;p=p.fy)q.push(p)
for(s=r.length,o=q.length,n=0;!0;++n){if(n===s)break
if(n===o)break
if(r[s-n-1]!==q[o-n-1])break}if(t!=null){t.F(x,w)
s=w.a
o=w.b
m=x.a
l=x.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
t.v(0,new R.ax(0,0,v.f,0,s,o,m,l,k,j,i,!1,"mouseOut",!0,C.c,null,null,!1,!1))}for(h=0;h<r.length-n;++h){g=r[h]
g.F(x,w)
s=w.a
o=w.b
m=x.a
l=x.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
g.v(0,new R.ax(0,0,v.f,0,s,o,m,l,k,j,i,!1,"rollOut",!1,C.c,null,null,!1,!1))}for(h=q.length-n-1;h>=0;--h){g=q[h]
g.F(x,w)
s=w.a
o=w.b
m=x.a
l=x.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
g.v(0,new R.ax(0,0,v.f,0,s,o,m,l,k,j,i,!1,"rollOver",!1,C.c,null,null,!1,!1))}if(u!=null){u.F(x,w)
s=w.a
o=w.b
m=x.a
l=x.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
u.v(0,new R.ax(0,0,v.f,0,s,o,m,l,k,j,i,!1,"mouseOver",!0,C.c,null,null,!1,!1))}this.bv=u}this.bj()
if(a.type==="mousedown"){this.x2.focus()
f=v.a
s=v.e
if((u==null?s!=null:u!==s)||z>v.r+500)v.x=0
v.f=!0
v.e=u
v.r=z;++v.x}else f=null
if(a.type==="mouseup"){f=v.b
v.f=!1
z=v.e
e=z==null?u==null:z===u
e}else e=!1
z=a.type
if(z==="mousemove")f="mouseMove"
if(z==="contextmenu")f="contextMenu"
if(f!=null&&u!=null){u.F(x,w)
z=w.a
s=w.b
o=x.a
m=x.b
l=a.altKey
k=a.ctrlKey
j=a.shiftKey
u.v(0,new R.ax(0,0,v.f,v.x,z,s,o,m,l,k,j,!1,f,!0,C.c,null,null,!1,!1))
if(e){z=w.a
s=w.b
o=x.a
m=x.b
l=a.altKey
k=a.ctrlKey
j=a.shiftKey
u.v(0,new R.ax(0,0,v.f,0,z,s,o,m,l,k,j,!1,v.c,!0,C.c,null,null,!1,!1))}}},"$1","gen",2,0,20],
h6:[function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.aQ.bL(new P.ay(a.clientX,a.clientY,[null]))
y=new U.aQ(0,0,[P.F])
x=this.bA(z.a,z.b)
x.F(z,y)
w=y.a
v=y.b
u=z.a
t=z.b
s=a.altKey
r=a.ctrlKey
q=a.shiftKey
p=new R.ax((a&&C.V).geV(a),C.V.geW(a),!1,0,w,v,u,t,s,r,q,!1,"mouseWheel",!0,C.c,null,null,!1,!1)
x.v(0,p)
if(p.r)a.stopImmediatePropagation()
if(p.f)a.stopPropagation()
if(p.db)a.preventDefault()},"$1","geo",2,0,21],
h7:[function(b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9
b0.preventDefault()
z=b0.type
y=b0.altKey
x=b0.ctrlKey
w=b0.shiftKey
for(v=b0.changedTouches,u=v.length,t=z==="touchmove",s=z==="touchcancel",r=z==="touchend",q=z==="touchstart",p=this.cX,o=this.cW,n=[null],m=this.aQ,l=[P.F],k=[A.a8],j=0;j<v.length;v.length===u||(0,H.aH)(v),++j){i=v[j]
h=i.identifier
g=m.bL(new P.ay(C.d.p(i.clientX),C.d.p(i.clientY),n))
f=new U.aQ(0,0,l)
e=this.bS(g.a,g.b)
e=e!=null?e:this
d=p.da(0,h,new A.iQ(this,e))
c=d.gdn()
b=d.gfH()
C.b.W(o,new A.iR(g,c))
a=d.d
if(a!==e){a0=H.m([],k)
a1=H.m([],k)
for(a2=a;a2!=null;a2=a2.fy)a0.push(a2)
for(a2=e;a2!=null;a2=a2.fy)a1.push(a2)
for(a3=a0.length,a4=a1.length,a5=0;!0;++a5){if(a5===a3)break
if(a5===a4)break
if(a0[a3-a5-1]!==a1[a4-a5-1])break}if(a!=null){a.F(g,f)
a.v(0,new R.aT(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchOut",!0,C.c,null,null,!1,!1))}for(a6=0;a6<a0.length-a5;++a6){a7=a0[a6]
a7.F(g,f)
a7.v(0,new R.aT(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchRollOut",!1,C.c,null,null,!1,!1))}for(a6=a1.length-a5-1;a6>=0;--a6){a7=a1[a6]
a7.F(g,f)
a7.v(0,new R.aT(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchRollOver",!1,C.c,null,null,!1,!1))}e.F(g,f)
e.v(0,new R.aT(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchOver",!0,C.c,null,null,!1,!1))
d.d=e}if(q){this.x2.focus()
p.k(0,h,d)
a8="touchBegin"}else a8=null
if(r){p.N(0,h)
a9=d.c===e
a8="touchEnd"}else a9=!1
if(s){p.N(0,h)
a8="touchCancel"}if(t)a8="touchMove"
if(a8!=null&&!0){e.F(g,f)
e.v(0,new R.aT(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,a8,!0,C.c,null,null,!1,!1))
if(a9)e.v(0,new R.aT(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchTap",!0,C.c,null,null,!1,!1))}}},"$1","gep",2,0,22],
h4:[function(a){return},"$1","gem",2,0,23],
dS:function(a,b,c,d){var z,y,x,w
if(!J.o(a).$isb1)throw H.d(P.O("canvas"))
if(a.tabIndex<=0)a.tabIndex=1
z=a.style
if(z.outline==="")z.outline="none"
c=$.$get$cv()
this.bw=c.f
this.f7=!0
this.f8=!0
this.f9=!1
this.fa=!1
this.x2=a
this.cT=c.e
this.cS=c.d
this.aR=c.c
this.bu=c.b
this.cM=V.b_(d)
this.cN=V.b_(b)
this.aP=V.ln(c.y,$.$get$cP())
z=this.e9(a,c)
this.y1=z
this.L=L.dY(z,null,null,null)
z=H.m([],[L.e_])
y=T.D()
x=H.m([],[P.p])
w=$.T
$.T=w+1
w=new A.iM("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAAAOAQAAAACQy/GuAAABsElEQVR4Aa3OMWsTUQDA8f97eV6fEpvT6YZgX4qDYwoOAdE+IQ5OfoXzG7S46KA8HZSC1PQLaNCln8ElFxyaQWg3XZQLBAyi5BqjJDHeE7whoE7i7xP8+He1Wq38WGkLIFmyphryV2JQAQnIhwE6tQCR6Sc3dq80tsBmQVTrHlSeVZvT8flwr3p7u3/Q27va3MnMWKEA2e0oRAjI8uWN1f3rZ9YjhNNU392Ud7bPckGuf9LB62sblQ874E3OqbEEefRyrsNRywFs5sL5FOIuizSqQ0IO2JMApMAA4DQS/77+dZEBgMIhVor/Wi6nkAIgHAvAw0zTCz3fkCDOubJD3IorDgifH+8yydrNvleQsLIaNPDuB1zkMIH+8MjACAknnr564vCf28dOg4n5QrnFAoFu1JmNF70i3MPGQIT1DiTp91h0gAQAbGkfBeRrcjrYwgAImAOMYf7rDUhAKchC7rsgRDyYxYCLO33FoAUWBaTkFD5WgQQkhnzzkqMweTtq+7tMhnin9YTDF4/chDftUsKcoW97B2RQEIC24GDJWsNvDAWRVrjHUgmWhOMPEf/DT5NSmGlKVHTvAAAAAElFTkSuQmCC",z,y,x,0,0,w,0,0,0,0,1,1,0,0,0,1,!0,!1,null,null,H.m([],[A.c2]),null,"",null,T.D(),!0,null,null)
A.bk("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAAAOAQAAAACQy/GuAAABsElEQVR4Aa3OMWsTUQDA8f97eV6fEpvT6YZgX4qDYwoOAdE+IQ5OfoXzG7S46KA8HZSC1PQLaNCln8ElFxyaQWg3XZQLBAyi5BqjJDHeE7whoE7i7xP8+He1Wq38WGkLIFmyphryV2JQAQnIhwE6tQCR6Sc3dq80tsBmQVTrHlSeVZvT8flwr3p7u3/Q27va3MnMWKEA2e0oRAjI8uWN1f3rZ9YjhNNU392Ud7bPckGuf9LB62sblQ874E3OqbEEefRyrsNRywFs5sL5FOIuizSqQ0IO2JMApMAA4DQS/77+dZEBgMIhVor/Wi6nkAIgHAvAw0zTCz3fkCDOubJD3IorDgifH+8yydrNvleQsLIaNPDuB1zkMIH+8MjACAknnr564vCf28dOg4n5QrnFAoFu1JmNF70i3MPGQIT1DiTp91h0gAQAbGkfBeRrcjrYwgAImAOMYf7rDUhAKchC7rsgRDyYxYCLO33FoAUWBaTkFD5WgQQkhnzzkqMweTtq+7tMhnin9YTDF4/chDftUsKcoW97B2RQEIC24GDJWsNvDAWRVrjHUgmWhOMPEf/DT5NSmGlKVHTvAAAAAElFTkSuQmCC",null).dm(w.ge3())
w.cx=!1
this.a3=w
P.bZ("StageXL render engine : "+this.y1.gdf().b)
z=W.br
y=this.gem()
W.x(a,"keydown",y,!1,z)
W.x(a,"keyup",y,!1,z)
W.x(a,"keypress",y,!1,z)
z=this.bu
if(z===C.x||z===C.B){z=W.aw
y=this.gen()
W.x(a,"mousedown",y,!1,z)
W.x(a,"mouseup",y,!1,z)
W.x(a,"mousemove",y,!1,z)
W.x(a,"mouseout",y,!1,z)
W.x(a,"contextmenu",y,!1,z)
W.x(a,W.l1().$1(a),this.geo(),!1,W.bd)}z=this.bu
if((z===C.a2||z===C.B)&&$.$get$f2()){z=W.bG
y=this.gep()
W.x(a,"touchstart",y,!1,z)
W.x(a,"touchend",y,!1,z)
W.x(a,"touchmove",y,!1,z)
W.x(a,"touchenter",y,!1,z)
W.x(a,"touchleave",y,!1,z)
W.x(a,"touchcancel",y,!1,z)}$.$get$dJ().bD(new A.iS(this))
this.bj()
this.ct()
this.y1.bn(0,this.bw)},
l:{
iL:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=P.F
y=T.D()
x=T.D()
w=T.D()
v=H.m([],[A.jr])
u=new K.dx(null,null,0,new P.Q(null,null,0,null,null,null,null,[z]))
t=new K.ek(null,null)
u.a=t
u.b=t
t=H.m([],[A.a8])
s=$.T
$.T=s+1
s=new A.ct(null,null,null,null,0,0,0,0,1,!1,0,0,0,0,new U.az(0,0,0,0,[z]),y,x,w,new R.ix("render",!1,C.c,null,null,!1,!1),null,C.x,C.v,C.w,C.n,"default",new U.aQ(0,0,[z]),null,v,new H.B(0,null,null,null,null,null,0,[P.i,A.ey]),[new A.cG("mouseDown","mouseUp","click","doubleClick",null,!1,0,0),new A.cG("middleMouseDown","middleMouseUp","middleClick","middleClick",null,!1,0,0),new A.cG("rightMouseDown","rightMouseUp","rightClick","rightClick",null,!1,0,0)],u,null,4294967295,!0,!0,!1,!1,t,!0,!0,!1,!0,"auto",!0,0,s,0,0,0,0,1,1,0,0,0,1,!0,!1,null,null,H.m([],[A.c2]),null,"",null,T.D(),!0,null,null)
s.dS(a,b,c,d)
return s}}},iS:{"^":"h:1;a",
$1:function(a){return this.a.bj()}},iP:{"^":"h:1;a",
$1:function(a){return J.cZ(a,0,this.a)}},iQ:{"^":"h:0;a,b",
$0:function(){var z,y,x
z=this.b
y=this.a.cX
y=y.gau(y)
x=$.ez
$.ez=x+1
return new A.ey(x,y,z,z)}},iR:{"^":"h:1;a,b",
$1:function(a){return J.cZ(a,this.b,this.a)}},iM:{"^":"a8;k2,k3,k4,r1,r2,rx,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,a",
aU:function(a,b){var z,y
this.r1.push(b)
z=b.length
y=this.r2
this.r2=z>y?z:y;++this.rx},
a4:function(a){var z,y,x,w,v,u,t,s,r
this.v(0,new R.a9("Update",!1,C.c,null,null,!1,!1))
for(z=this.k4,y=this.k3,x=a.c,w=this.r1,v=0;v<this.rx;++v)for(u=v*14,t=0;t<this.r2;++t){s=w[v]
r=t<s.length?C.f.c4(s,t)-32:0
if(r<0||r>=64)r=0
z.a8(1,0,0,1,t*7,u)
a.bH(z,1,C.h)
x.ab(a,y[r])
a.bG()}},
fX:[function(a){var z,y,x,w
z=a.c
z.a.sfb(C.an)
for(y=[P.i],x=this.k3,w=0;w<64;++w)x.push(z.cL(new U.az(w*7,0,7,14,y)))},"$1","ge3",2,0,24]},iN:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx"},cG:{"^":"c;a,b,c,d,e,f,r,x"},ey:{"^":"c;dn:a<,fH:b<,c,d"},jr:{"^":"c;"}}],["","",,U,{"^":"",fT:{"^":"b5;a",
aD:function(a){a.cF(0)}},fU:{"^":"b5;"},fV:{"^":"fU;b,a",
aD:function(a){a.bx(this.b)}},fW:{"^":"b5;b,c,d,e,a",
aD:function(a){a.ax(0,this.b,this.c)
a.aS(0,this.b+this.d,this.c)
a.aS(0,this.b+this.d,this.c+this.e)
a.aS(0,this.b,this.c+this.e)
a.cI(0)}},fS:{"^":"c;a,b,c",
a4:function(a){var z
if(a.c instanceof L.aR){z=this.ce(!1)
this.cu(U.jN(a),z)}else{z=this.ce(!0)
this.cu(new U.jP(a,new U.bN(null,H.m([],[U.aC]))),z)}},
ce:function(a){var z,y,x,w
if(a&&this.b.length===0){z=new U.jO(this.b,new U.bN(null,H.m([],[U.aC])))
for(y=this.a,x=y.length,w=0;w<y.length;y.length===x||(0,H.aH)(y),++w)y[w].aD(z)}return a?this.b:this.a},
cu:function(a,b){var z
for(z=0;z<b.length;++z)b[z].aD(a)}},b5:{"^":"c;"},dl:{"^":"c;"},jL:{"^":"b5;b,c,a",
aD:function(a){if(!!a.$iscE)a.d6(this)}},cE:{"^":"dl;",
cF:function(a){this.a=new U.bN(null,H.m([],[U.aC]))},
cI:function(a){var z,y
z=this.a
y=z.b
if(y!=null){y.Q=!0
z.b=null}},
ax:function(a,b,c){this.a.ax(0,b,c)},
aS:function(a,b,c){var z,y
z=this.a
y=z.b
if(y==null)z.ax(0,b,c)
else y.bk(b,c)}},jM:{"^":"dl;a,b,c",
cF:function(a){this.c.beginPath()},
cI:function(a){this.c.closePath()},
ax:function(a,b,c){this.c.moveTo(b,c)},
aS:function(a,b,c){this.c.lineTo(b,c)},
bx:function(a){var z=this.c
z.fillStyle=V.bT(a)
z.toString
z.fill("nonzero")},
dW:function(a){var z,y
z=this.b
z.b1(0,a.gZ())
y=a.gX(a)
z.x=y
z.e.globalAlpha=y
this.c.beginPath()},
l:{
jN:function(a){var z=H.cU(a.c,"$isaR")
z=new U.jM(a,z,z.e)
z.dW(a)
return z}}},jO:{"^":"cE;b,a",
bx:function(a){this.b.push(new U.jL(U.jR(this.a),a,null))},
d6:function(a){this.b.push(a)}},jP:{"^":"cE;b,a",
bx:function(a){this.a.cY(this.b,a)},
d6:function(a){a.b.cY(this.b,a.c)}},er:{"^":"c;$ti"},jQ:{"^":"c;",
bk:["dN",function(a,b){var z,y,x,w,v
z=this.c*2
y=this.a
x=y.length
if(z+2>x){w=x<16?16:x
v=new Float32Array(H.z(x+(w>256?256:w)))
this.a=v
C.F.bP(v,0,y)}y=this.e
this.e=y>a?a:y
y=this.f
this.f=y>b?b:y
y=this.r
this.r=y<a?a:y
y=this.x
this.x=y<b?b:y
y=this.a
y[z]=a
y[z+1]=b
return this.c++}],
cD:function(a,b,c){var z,y,x,w,v
z=this.d
y=this.b
x=y.length
if(z+3>x){w=x<32?32:x
if(w>256)w=256
v=new Int16Array(x+w)
this.b=v
C.G.bP(v,0,y)}y=this.b
y[z]=a
y[z+1]=b
y[z+2]=c
this.d+=3},
dX:function(a){var z=a.c
this.c=z
this.d=a.d
this.e=a.e
this.f=a.f
this.r=a.r
this.x=a.x
C.F.a7(this.a,0,z*2,a.a)
C.G.a7(this.b,0,this.d,a.b)}},bN:{"^":"er;b,a",
ax:function(a,b,c){var z=T.D()
z=new U.aC(null,!1,new Float32Array(H.z(16)),new Int16Array(H.z(32)),0,0,17976931348623157e292,17976931348623157e292,-17976931348623157e292,-17976931348623157e292,z)
this.b=z
z.bk(b,c)
this.a.push(this.b)},
cY:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=this.a,y=z.length,x=a.c,w=0;w<z.length;z.length===y||(0,H.aH)(z),++w){v=z[w]
if(v.d===0)v.c1()
u=v.b.buffer
t=v.d
u.toString
H.bP(u,0,t)
s=new Int16Array(u,0,t)
u=v.a.buffer
t=v.c*2
u.toString
H.bP(u,0,t)
r=new Float32Array(u,0,t)
x.aX(a,s,r,b)}},
dY:function(a){var z,y,x,w,v,u,t,s
for(z=a.a,y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.aH)(z),++w){v=z[w]
if(v.d===0)v.c1()
u=T.D()
t=v.c
t=new Float32Array(t*2)
s=v.d
u=new U.aC(null,!1,t,new Int16Array(s),0,0,17976931348623157e292,17976931348623157e292,-17976931348623157e292,-17976931348623157e292,u)
u.dX(v)
t=v.z
if(typeof t!=="boolean"){t=v.c0()>=0
v.z=t}u.z=t
u.Q=v.Q
x.push(u)}},
$aser:function(){return[U.aC]},
l:{
jR:function(a){var z=new U.bN(null,H.m([],[U.aC]))
z.dY(a)
return z}}},aC:{"^":"jQ;z,Q,a,b,c,d,e,f,r,x,y",
geR:function(){var z=this.z
if(typeof z!=="boolean"){z=this.c0()>=0
this.z=z}return z},
bk:function(a,b){var z,y
z=this.a
y=this.c*2
if(y===0||!V.f7(z[y-2],a,0.0001)||!V.f7(z[y-1],b,0.0001)){this.d=0
this.z=null
return this.dN(a,b)}else return this.c-1},
c1:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
this.d=0
z=this.a
y=this.c
if(y<3)return
x=H.m([],[P.i])
w=this.geR()
for(v=0;v<y;++v)x.push(v)
for(u=0;t=x.length,t>3;){s=x[C.a.H(u,t)]
r=u+1
q=x[r%t]
p=x[(u+2)%t]
o=s*2
n=z[o]
m=z[o+1]
o=q*2
l=z[o]
k=z[o+1]
o=p*2
j=z[o]-n
i=z[o+1]-m
h=l-n
g=k-m
f=i*h-j*g
e=w?f>=0:f<=0
o=f*h
d=f*g
c=f*i
b=f*j
a=f*f
a0=0
a1=0
a2=0
while(!0){if(!(a2<t&&e))break
a3=x[a2]
if(a3!==s&&a3!==q&&a3!==p){a4=a3*2
a5=z[a4]-n
a6=z[a4+1]-m
a0=o*a6-d*a5
if(a0>=0){a1=c*a5-b*a6
if(a1>=0)e=a0+a1<a?!1:e}}++a2}if(e){this.cD(s,q,p)
C.b.aV(x,r%x.length)
u=0}else{if(u>3*t)break
u=r}}this.cD(x[0],x[1],x[2])},
c0:function(){var z,y,x,w,v,u,t,s,r
z=this.a
y=this.c
if(y<3)return 0
x=(y-1)*2
w=z[x]
v=z[x+1]
for(u=0,t=0;t<y;++t,v=r,w=s){x=t*2
s=z[x]
r=z[x+1]
u+=(w-s)*(v+r)}return u/2}}}],["","",,L,{"^":"",
eG:function(){if($.cJ===-1){var z=window
C.W.ed(z)
$.cJ=C.W.ew(z,W.eR(new L.kp()))}},
d2:{"^":"c;a,b,c"},
bz:{"^":"c;a,b,c,d,e,f,r,x"},
bA:{"^":"c;a,b,c,d,e,f,r,x",
ao:function(a,b,c,d){if(a==null)return
this.r.vertexAttribPointer(a,b,5126,!1,c,d)}},
dV:{"^":"c;a,b",
j:function(a){return this.b}},
aS:{"^":"c;"},
dU:{"^":"c;"},
aR:{"^":"dU;d,e,f,r,x,a,b,c",
gdf:function(){return C.I},
ac:function(a){var z
this.b1(0,this.f)
this.r=C.h
z=this.e
z.globalCompositeOperation="source-over"
this.x=1
z.globalAlpha=1},
bn:function(a,b){var z,y,x
this.b1(0,this.f)
this.r=C.h
z=this.e
z.globalCompositeOperation="source-over"
this.x=1
z.globalAlpha=1
y=b>>>24&255
if(y<255){x=this.d
z.clearRect(0,0,x.width,x.height)}if(y>0){z.fillStyle=V.bT(b)
x=this.d
z.fillRect(0,0,x.width,x.height)}},
A:function(a){},
ab:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.e
y=b.a.c
x=b.d
w=b.b
v=b.r
u=a.gZ()
t=a.gX(a)
s=a.gY()
if(this.x!==t){this.x=t
z.globalAlpha=t}if(this.r!==s){this.r=s
z.globalCompositeOperation=s.c}if(x===0){r=u.a
z.setTransform(r[0],r[1],r[2],r[3],r[4],r[5])
r=w.a
q=w.b
p=w.c
o=w.d
n=v[0]
m=v[1]
z.drawImage(y,r,q,p,o,n,m,v[8]-n,v[9]-m)}else if(x===1){r=u.a
z.setTransform(-r[2],-r[3],r[0],r[1],r[4],r[5])
z.drawImage(y,w.a,w.b,w.c,w.d,0-v[13],v[12],v[9]-v[1],v[8]-v[0])}else if(x===2){r=u.a
z.setTransform(-r[0],-r[1],-r[2],-r[3],r[4],r[5])
r=w.a
q=w.b
p=w.c
o=w.d
n=v[8]
m=v[9]
z.drawImage(y,r,q,p,o,0-n,0-m,n-v[0],m-v[1])}else if(x===3){r=u.a
z.setTransform(r[2],r[3],-r[0],-r[1],r[4],r[5])
z.drawImage(y,w.a,w.b,w.c,w.d,v[5],0-v[4],v[9]-v[1],v[8]-v[0])}},
aX:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.e
y=a.gZ()
x=a.gX(a)
w=a.gY()
if(this.x!==x){this.x=x
z.globalAlpha=x}if(this.r!==w){this.r=w
z.globalCompositeOperation=w.c}v=y.a
z.setTransform(v[0],v[1],v[2],v[3],v[4],v[5])
z.beginPath()
for(v=b.length-2,u=0;u<v;u+=3){t=b[u]<<1>>>0
s=b[u+1]<<1>>>0
r=b[u+2]<<1>>>0
q=c[t]
p=c[t+1]
o=c[s]
n=c[s+1]
m=c[r]
l=c[r+1]
z.moveTo(q,p)
z.lineTo(o,n)
z.lineTo(m,l)}z.fillStyle=V.bT(d)
z.fill("nonzero")},
b1:function(a,b){var z=b.a
this.e.setTransform(z[0],z[1],z[2],z[3],z[4],z[5])}},
cq:{"^":"dU;d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,a,b,c",
gdf:function(){return C.r},
ac:function(a){var z,y,x
z=this.d
y=z.width
x=z.height
this.y=null
this.e.bindFramebuffer(36160,null)
this.e.viewport(0,0,y,x)
z=this.f
z.P()
z.dv(0,2/y,-2/x,1)
z.fS(0,-1,1,0)
this.x.sd9(z)},
bn:function(a,b){var z,y
z=this.y
C.b.si(z instanceof L.dW?z.r:this.r,0)
this.eG(null)
this.e.disable(2960)
y=(b>>>24&255)/255
this.e.colorMask(!0,!0,!0,!0)
this.e.clearColor((b>>>16&255)/255*y,(b>>>8&255)/255*y,(b&255)/255*y,y)
this.e.clear(17408)},
A:function(a){this.x.A(0)},
ab:function(a,b){var z=this.cy
this.cB(z)
this.cz(a.gY())
this.aK(b.a)
z.ab(a,b)},
aX:function(a,b,c,d){var z=this.dx
this.cB(z)
this.cz(a.gY())
z.aX(a,b,c,d)},
cB:function(a){var z=this.x
if(a!==z){z.A(0)
this.x=a
a.an(0,this)
this.x.sd9(this.f)}},
cz:function(a){if(a!==this.Q){this.x.A(0)
this.Q=a
this.e.blendFunc(a.a,a.b)}},
aK:function(a){var z=this.fx
if(a!==z[0]){this.x.A(0)
z[0]=a
a.cw(0,this,33984)}},
cA:function(a){var z,y,x
z=this.f
z.ap(a)
this.x.A(0)
y=this.x
x=y.e.h(0,"uProjectionMatrix")
y.b.uniformMatrix4fv(x,!1,z.a)},
eG:function(a){this.e.disable(3089)},
h_:[function(a){var z
a.preventDefault()
this.ch=!1
z=this.b
if(!z.gb8())H.q(z.b2())
z.a_(new L.aS())},"$1","geh",2,0,8],
h0:[function(a){var z
this.ch=!0
z=$.bB+1
$.bB=z
this.cx=z
z=this.c
if(!z.gb8())H.q(z.b2())
z.a_(new L.aS())},"$1","gei",2,0,8]},
iy:{"^":"c;"},
dW:{"^":"c;a,b,c,d,e,f,r"},
kp:{"^":"h:25;",
$1:function(a){var z,y,x,w,v
z=a/1000
y=z-$.eH
$.eH=z
$.cJ=-1
L.eG()
x=$.$get$cK()
x.toString
x=H.m(x.slice(0),[H.I(x,0)])
w=x.length
v=0
for(;v<x.length;x.length===w||(0,H.aH)(x),++v)x[v].$1(y)}},
iA:{"^":"c;",
dI:function(a){this.a=!0
L.eG()
$.$get$cK().push(this.gej())},
h1:[function(a){if(this.a&&a>=0)if(typeof a==="number")this.aL(a)},"$1","gej",2,0,26]},
k2:{"^":"c;"},
bC:{"^":"c;",
sd9:function(a){var z=this.e.h(0,"uProjectionMatrix")
this.b.uniformMatrix4fv(z,!1,a.a)},
an:["bU",function(a,b){var z,y,x,w
z=this.a
y=b.cx
if(z!==y){this.a=y
z=b.e
this.b=z
x=b.a
this.x=x
w=b.dy
this.f=w
this.r=b.fr
if(w.e!==y){w.e=y
w.x=x
w.r=z
z=z.createBuffer()
w.f=z
w.r.bindBuffer(34963,z)
w.r.bufferData(34963,w.a,w.b)}w.r.bindBuffer(34963,w.f)
z=this.r
y=z.e
w=b.cx
if(y!==w){z.e=w
z.x=x
y=b.e
z.r=y
y=y.createBuffer()
z.f=y
z.r.bindBuffer(34962,y)
z.r.bufferData(34962,z.a,z.b)}z.r.bindBuffer(34962,z.f)
z=this.e8(this.b)
this.c=z
this.eF(this.b,z)
this.eH(this.b,this.c)}this.b.useProgram(this.c)}],
A:function(a){var z,y,x,w,v
z=this.f
y=z.c
if(y>0&&this.r.c>0){x=z.a.buffer
x.toString
w=H.ii(x,0,y)
z.r.bufferSubData(34963,0,w)
x=z.x
x.c=x.c+z.d
z=this.f
z.c=0
z.d=0
z=this.r
x=z.a.buffer
v=z.c
x.toString
w=H.ig(x,0,v)
z.r.bufferSubData(34962,0,w)
v=z.x
v.b=v.b+z.d
z=this.r
z.c=0
z.d=0
this.b.drawElements(4,y,5123,0);++this.x.a}},
e8:function(a){var z,y,x
z=a.createProgram()
y=this.c9(a,this.gbN(),35633)
x=this.c9(a,this.gby(),35632)
a.attachShader(z,y)
a.attachShader(z,x)
a.linkProgram(z)
if(a.getProgramParameter(z,35714)===!0)return z
throw H.d(new P.C(a.isContextLost()?"ContextLost":a.getProgramInfoLog(z)))},
c9:function(a,b,c){var z=a.createShader(c)
a.shaderSource(z,b)
a.compileShader(z)
if(a.getShaderParameter(z,35713)===!0)return z
throw H.d(new P.C(a.isContextLost()?"ContextLost":a.getShaderInfoLog(z)))},
eF:function(a,b){var z,y,x,w,v
z=this.d
z.V(0)
y=a.getProgramParameter(b,35721)
for(x=0;x<y;++x){w=a.getActiveAttrib(b,x)
v=a.getAttribLocation(b,w.name)
a.enableVertexAttribArray(v)
z.k(0,w.name,v)}},
eH:function(a,b){var z,y,x,w,v
z=this.e
z.V(0)
y=a.getProgramParameter(b,35718)
for(x=0;x<y;++x){w=a.getActiveUniform(b,x)
v=a.getUniformLocation(b,w.name)
z.k(0,w.name,v)}}},
iD:{"^":"bC;a,b,c,d,e,f,r,x",
gbN:function(){return"\r\n    uniform mat4 uProjectionMatrix;\r\n    attribute vec2 aVertexPosition;\r\n    attribute vec2 aVertexTextCoord;\r\n    attribute float aVertexAlpha;\r\n    varying vec2 vTextCoord;\r\n    varying float vAlpha;\r\n\r\n    void main() {\r\n      vTextCoord = aVertexTextCoord;\r\n      vAlpha = aVertexAlpha;\r\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\r\n    }\r\n    "},
gby:function(){return"\r\n    precision mediump float;\r\n    uniform sampler2D uSampler;\r\n    varying vec2 vTextCoord;\r\n    varying float vAlpha;\r\n\r\n    void main() {\r\n      gl_FragColor = texture2D(uSampler, vTextCoord) * vAlpha;\r\n    }\r\n    "},
an:function(a,b){var z
this.bU(0,b)
this.b.uniform1i(this.e.h(0,"uSampler"),0)
z=this.d
this.r.ao(z.h(0,"aVertexPosition"),2,20,0)
this.r.ao(z.h(0,"aVertexTextCoord"),2,20,8)
this.r.ao(z.h(0,"aVertexAlpha"),1,20,16)},
ab:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=a.gX(a)
y=a.gZ()
x=b.r
w=this.f
v=w.a
if(w.c+6>=v.length)this.A(0)
w=this.r
u=w.a
if(w.c+20>=u.length)this.A(0)
w=this.f
t=w.c
s=this.r
r=s.c
q=s.d
v[t]=q
v[t+1]=q+1
p=q+2
v[t+2]=p
v[t+3]=q
v[t+4]=p
v[t+5]=q+3
w.c=t+6
w.d+=6
w=x[0]
p=y.a
o=p[0]
n=p[4]
m=w*o+n
l=x[8]
k=l*o+n
n=p[1]
o=p[5]
j=w*n+o
i=l*n+o
o=x[1]
n=p[2]
h=o*n
l=x[9]
g=l*n
p=p[3]
f=o*p
e=l*p
u[r]=m+h
u[r+1]=j+f
u[r+2]=x[2]
u[r+3]=x[3]
u[r+4]=z
u[r+5]=k+h
u[r+6]=i+f
u[r+7]=x[6]
u[r+8]=x[7]
u[r+9]=z
u[r+10]=k+g
u[r+11]=i+e
u[r+12]=x[10]
u[r+13]=x[11]
u[r+14]=z
u[r+15]=m+g
u[r+16]=j+e
u[r+17]=x[14]
u[r+18]=x[15]
u[r+19]=z
s.c=r+20
s.d=q+4}},
iE:{"^":"bC;a,b,c,d,e,f,r,x",
gbN:function(){return"\r\n    uniform mat4 uProjectionMatrix;\r\n    attribute vec2 aVertexPosition;\r\n    attribute vec2 aVertexTextCoord;\r\n    attribute vec4 aVertexColor;\r\n    varying vec2 vTextCoord;\r\n    varying vec4 vColor; \r\n\r\n    void main() {\r\n      vTextCoord = aVertexTextCoord;\r\n      vColor = aVertexColor;\r\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\r\n    }\r\n    "},
gby:function(){return"\r\n    precision mediump float;\r\n    uniform sampler2D uSampler;\r\n    varying vec2 vTextCoord;\r\n    varying vec4 vColor; \r\n\r\n    void main() {\r\n      gl_FragColor = texture2D(uSampler, vTextCoord) * vColor;\r\n    }\r\n    "}},
iF:{"^":"bC;a,b,c,d,e,f,r,x",
gbN:function(){return"\r\n    uniform mat4 uProjectionMatrix;\r\n    attribute vec2 aVertexPosition;\r\n    attribute vec4 aVertexColor;\r\n    varying vec4 vColor;\r\n\r\n    void main() {\r\n      vColor = aVertexColor;\r\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\r\n    }\r\n    "},
gby:function(){return"\r\n    precision mediump float;\r\n    varying vec4 vColor;\r\n\r\n    void main() {\r\n      gl_FragColor = vColor;\r\n    }\r\n    "},
an:function(a,b){var z
this.bU(0,b)
z=this.d
this.r.ao(z.h(0,"aVertexPosition"),2,24,0)
this.r.ao(z.h(0,"aVertexColor"),4,24,8)},
aX:function(a0,a1,a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=a0.gZ()
y=a0.gX(a0)
x=a1.length
w=a2.length>>>1
v=this.f
u=v.a
if(v.c+x>=u.length)this.A(0)
v=this.r
t=v.a
s=w*6
if(v.c+s>=t.length)this.A(0)
v=this.f
r=v.c
q=this.r
p=q.c
o=q.d
for(n=0;n<x;++n)u[r+n]=o+a1[n]
v.c=r+x
this.f.d+=x
v=z.a
m=v[0]
l=v[1]
k=v[2]
j=v[3]
i=v[4]
h=v[5]
g=0.00392156862745098*(C.a.T(a3,24)&255)*y
f=0.00392156862745098*(C.a.T(a3,16)&255)*g
e=0.00392156862745098*(C.a.T(a3,8)&255)*g
d=0.00392156862745098*(a3&255)*g
for(n=0,c=0;n<w;++n,c+=2){b=a2[c]
a=a2[c+1]
t[p]=i+m*b+k*a
t[p+1]=h+l*b+j*a
t[p+2]=f
t[p+3]=e
t[p+4]=d
t[p+5]=g
p+=6}v=this.r
v.c+=s
v.d+=w}},
bJ:{"^":"c;a,b,c,d,e,f"},
dX:{"^":"c;a,b,c,d,e",
gZ:function(){return this.e.c},
gX:function(a){return this.e.a},
gY:function(){return this.e.b},
fN:function(a,b,c,d){var z,y
z=this.d
this.e=z
z=z.c
z.d_()
y=this.e
y.a=1
y.b=C.h
z.ap(b)},
dg:function(a,b){return this.fN(a,b,null,null)},
aW:function(a){var z,y,x,w,v,u
z=a.gaB()
y=a.ch
x=this.e
w=x.f
if(w==null){v=T.D()
u=new T.av(new Float32Array(H.z(16)))
u.P()
w=new L.bJ(1,C.h,v,u,x,null)
x.f=w}w.c.cK(z,x.c)
v=x.b
w.b=v
w.a=y*x.a
this.e=w
a.a4(this)
this.e=x},
bH:function(a,b,c){var z,y,x,w
z=this.e
y=z.f
if(y==null){x=T.D()
w=new T.av(new Float32Array(H.z(16)))
w.P()
y=new L.bJ(1,C.h,x,w,z,null)
z.f=y}y.c.cK(a,z.c)
y.b=c instanceof L.d2?c:z.b
y.a=b*z.a
this.e=y},
bG:function(){this.e=this.e.e},
bV:function(a,b,c,d){var z=this.d
this.e=z
if(b instanceof T.ci)z.c.ap(b)
if(typeof c==="number")z.a=c},
l:{
dY:function(a,b,c,d){var z,y
z=T.D()
y=new T.av(new Float32Array(H.z(16)))
y.P()
y=new L.dX(0,0,a,new L.bJ(1,C.h,z,y,null,null),null)
y.bV(a,b,c,d)
return y}}},
aA:{"^":"c;a,b,c",
j:function(a){return"RenderStatistics: "+this.a+" draws, "+this.b+" verices, "+this.c+" indices"}},
cr:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
gdc:function(){var z,y,x
z=this.a
y=this.b
x=[P.i]
return L.bD(this,new U.az(0,0,z,y,x),new U.az(0,0,z,y,x),0,1)},
geP:function(a){var z,y
z=this.c
y=J.o(z)
if(!!y.$isb1)return z
else if(!!y.$isbo){y=this.a
y=W.c6(this.b,y)
this.c=y
this.d=y
y.getContext("2d").drawImage(z,0,0,this.a,this.b)
return this.d}else throw H.d(new P.C("RenderTexture is read only."))},
sfb:function(a){var z
if(this.e===a)return
this.e=a
z=this.x
if(z==null||this.ch==null)return
if(z.cx!==this.y)return
z.aK(this)
this.Q.texParameteri(3553,10241,this.e.a)
this.Q.texParameteri(3553,10240,this.e.a)},
fT:function(a){var z,y
z=this.x
if(z==null||this.ch==null)return
if(z.cx!==this.y)return
y=this.Q.isEnabled(3089)
if(y)this.Q.disable(3089)
if(this.z){z=this.d
z.toString
z.getContext("2d").drawImage(this.c,0,0)
this.x.aK(this)
z=this.Q;(z&&C.u).aZ(z,3553,0,6408,6408,5121,this.d)}else{this.x.aK(this)
z=this.Q;(z&&C.u).aZ(z,3553,0,6408,6408,5121,this.c)}if(y)this.Q.enable(3089)},
cw:function(a,b,c){var z,y,x,w
z=this.y
y=b.cx
if(z!==y){this.x=b
this.y=y
z=b.e
this.Q=z
this.ch=z.createTexture()
this.Q.activeTexture(c)
this.Q.bindTexture(3553,this.ch)
x=this.Q.isEnabled(3089)
if(x)this.Q.disable(3089)
z=this.c
y=this.Q
w=y&&C.u
if(z!=null){w.aZ(y,3553,0,6408,6408,5121,z)
this.z=this.Q.getError()===1281}else w.dl(y,3553,0,6408,this.a,this.b,0,6408,5121,null)
if(this.z){z=this.a
z=W.c6(this.b,z)
this.d=z
z.getContext("2d").drawImage(this.c,0,0)
z=this.Q;(z&&C.u).aZ(z,3553,0,6408,6408,5121,this.d)}if(x)this.Q.enable(3089)
this.Q.texParameteri(3553,10242,this.f.a)
this.Q.texParameteri(3553,10243,this.r.a)
this.Q.texParameteri(3553,10241,this.e.a)
this.Q.texParameteri(3553,10240,this.e.a)}else{this.Q.activeTexture(c)
this.Q.bindTexture(3553,this.ch)}}},
dZ:{"^":"c;a"},
e_:{"^":"c;a,b,c,d,e,f,r,x,y,z",
gf1:function(){var z,y,x,w
z=this.e
y=this.d
if(y===0){y=this.b
x=this.c
return T.bt(z,0,0,z,y.a+x.a,y.b+x.b)}else if(y===1){y=this.b
x=this.c
return T.bt(0,z,0-z,0,y.a+y.c-x.b,y.b+x.a)}else if(y===2){y=this.b
x=this.c
w=0-z
return T.bt(w,0,0,w,y.a+y.c-x.a,y.b+y.d-x.b)}else if(y===3){y=this.b
x=this.c
return T.bt(0,0-z,z,0,y.a+x.b,y.b+y.d-x.a)}else throw H.d(new P.A())},
cL:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=a0.a
y=this.e
x=C.d.p(z*y)
w=a0.b
v=C.d.p(w*y)
z=C.d.p((z+a0.c)*y)-x
w=C.d.p((w+a0.d)*y)-v
u=[P.i]
t=this.d
s=this.b
r=s.a
q=s.b
p=r+s.c
o=q+s.d
s=this.c
n=s.a
m=s.b
l=C.a.H(t,4)
k=x+z
j=v+w
if(t===0){s=r+n
i=s+x
h=q+m
g=h+v
f=s+k
e=h+j}else if(t===1){s=p-m
i=s-j
h=q+n
g=h+x
f=s-v
e=h+k}else if(t===2){s=p-n
i=s-k
h=o-m
g=h-j
f=s-x
e=h-v}else if(t===3){s=r+m
i=s+v
h=o-n
g=h-k
f=s+j
e=h-x}else{i=0
g=0
f=0
e=0}d=V.bS(i,r,p)
c=V.bS(g,q,o)
k=V.bS(f,r,p)
j=V.bS(e,q,o)
if(l===0){b=0+(i-d)
a=0+(g-c)}else if(l===1){b=0+(g-c)
a=0+(k-f)}else if(l===2){b=0+(k-f)
a=0+(e-j)}else if(l===3){b=0+(j-e)
a=0+(d-i)}else{b=0
a=0}return L.bD(this.a,new U.az(d,c,k-d,j-c,u),new U.az(b,a,z,w,u),l,y)},
dR:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.b
y=this.c
x=this.a
w=this.e
v=this.d
u=v===0
if(u||v===2){t=this.r
s=0-y.a
r=s/w
t[12]=r
t[0]=r
r=0-y.b
q=r/w
t[5]=q
t[1]=q
q=z.c
s=(s+q)/w
t[4]=s
t[8]=s
s=z.d
r=(r+s)/w
t[13]=r
t[9]=r
r=s
s=q}else{if(v===1||v===3){t=this.r
s=0-y.a
r=s/w
t[12]=r
t[0]=r
r=0-y.b
q=r/w
t[5]=q
t[1]=q
q=z.d
s=(s+q)/w
t[4]=s
t[8]=s
s=z.c
r=(r+s)/w
t[13]=r
t[9]=r}else throw H.d(new P.A())
r=q}if(u){v=z.a
u=x.a
q=v/u
t[14]=q
t[2]=q
q=z.b
p=x.b
o=q/p
t[7]=o
t[3]=o
u=(v+s)/u
t[6]=u
t[10]=u
p=(q+r)/p
t[15]=p
t[11]=p}else if(v===1){v=z.a
u=x.a
s=(v+s)/u
t[6]=s
t[2]=s
s=z.b
q=x.b
p=s/q
t[15]=p
t[3]=p
u=v/u
t[14]=u
t[10]=u
q=(s+r)/q
t[7]=q
t[11]=q}else if(v===2){v=z.a
u=x.a
s=(v+s)/u
t[14]=s
t[2]=s
s=z.b
q=x.b
r=(s+r)/q
t[7]=r
t[3]=r
u=v/u
t[6]=u
t[10]=u
q=s/q
t[15]=q
t[11]=q}else if(v===3){v=z.a
u=x.a
q=v/u
t[6]=q
t[2]=q
q=z.b
p=x.b
r=(q+r)/p
t[15]=r
t[3]=r
u=(v+s)/u
t[14]=u
t[10]=u
p=q/p
t[7]=p
t[11]=p}else throw H.d(new P.A())
v=this.f
v[0]=0
v[1]=1
v[2]=2
v[3]=0
v[4]=2
v[5]=3
this.y=t
this.x=v
this.z=!1},
l:{
bD:function(a,b,c,d,e){var z=new L.e_(a,b,c,d,e,new Int16Array(H.z(6)),new Float32Array(H.z(16)),null,null,!1)
z.dR(a,b,c,d,e)
return z}}},
iG:{"^":"c;a"}}],["","",,T,{"^":"",i4:{"^":"A;a,b",
j:function(a){var z="LoadError: "+this.a
return z}}}],["","",,R,{"^":"",
cI:function(a,b){var z,y,x,w
z=b.length
for(y=0;y<z;++y){x=b[y]
if(!x.c){a.f=!1
a.r=!1
w=x.e.a
a.d=w
a.e=w
a.c=C.c
x.ha(a)}else{C.b.aV(b,y);--z;--y}}},
c5:{"^":"a9;",
gcH:function(){return!1}},
fI:{"^":"c5;x,a,b,c,d,e,f,r"},
fK:{"^":"c5;a,b,c,d,e,f,r"},
ix:{"^":"c5;a,b,c,d,e,f,r"},
a9:{"^":"c;a,b,c,d,e,f,r",
gcH:function(){return!0}},
db:{"^":"c;",
bz:function(a,b){var z,y
z=this.a
if(z==null)return!1
y=z.h(0,a)
if(y==null)return!1
return b?y.ghe():y.ghd()},
fk:function(a){return this.bz(a,!1)},
bp:function(a,b,c){var z,y
a.f=!1
a.r=!1
z=this.a
if(z==null)return
y=z.h(0,a.a)
if(y==null)return
y.fZ(a,b,c)}},
c7:{"^":"c;a,b",
j:function(a){return this.b}},
ca:{"^":"c;a,b",
j:function(a){return this.b}},
dm:{"^":"a9;"},
ax:{"^":"dm;dx,dy,fr,fx,x,y,z,Q,ch,cx,cy,db,a,b,c,d,e,f,r"},
aT:{"^":"dm;dn:dx<,dy,x,y,z,Q,ch,cx,cy,db,a,b,c,d,e,f,r"}}],["","",,T,{"^":"",ci:{"^":"c;a",
j:function(a){var z=this.a
return"Matrix [a="+H.f(z[0])+", b="+H.f(z[1])+", c="+H.f(z[2])+", d="+H.f(z[3])+", tx="+H.f(z[4])+", ty="+H.f(z[5])+"]"},
fR:function(a,b){var z,y,x,w,v,u,t,s
z=a.a
z.toString
y=a.b
y.toString
x=this.a
w=x[0]
v=x[2]
u=x[4]
t=x[1]
s=x[3]
x=x[5]
return new U.aQ(z*w+y*v+u,z*t+y*s+x,[P.F])},
bL:function(a){return this.fR(a,null)},
d_:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=1
z[4]=0
z[5]=0},
b0:function(a,b,c){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*c
z[2]=z[2]*b
z[3]=z[3]*c
z[4]=z[4]*b
z[5]=z[5]*c},
a8:function(a,b,c,d,e,f){var z=this.a
z[0]=a
z[1]=b
z[2]=c
z[3]=d
z[4]=e
z[5]=f},
ap:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
z[3]=y[3]
z[4]=y[4]
z[5]=y[5]},
cK:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
z=b.a
s=z[0]
r=z[1]
q=z[2]
p=z[3]
o=z[4]
n=z[5]
z=this.a
z[0]=y*s+x*q
z[1]=y*r+x*p
z[2]=w*s+v*q
z[3]=w*r+v*p
z[4]=u*s+t*q+o
z[5]=u*r+t*p+n},
dQ:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=1
z[4]=0
z[5]=0},
dP:function(a,b,c,d,e,f){var z=this.a
z[0]=a
z[1]=b
z[2]=c
z[3]=d
z[4]=e
z[5]=f},
l:{
bt:function(a,b,c,d,e,f){var z=new T.ci(new Float32Array(H.z(6)))
z.dP(a,b,c,d,e,f)
return z},
D:function(){var z=new T.ci(new Float32Array(H.z(6)))
z.dQ()
return z}}}}],["","",,T,{"^":"",av:{"^":"c;a",
P:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1},
dv:function(a,b,c,d){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b
z[4]=z[4]*c
z[5]=z[5]*c
z[6]=z[6]*c
z[7]=z[7]*c
z[8]=z[8]*d
z[9]=z[9]*d
z[10]=z[10]*d
z[11]=z[11]*d},
fS:function(a,b,c,d){var z=this.a
z[3]=z[3]+b
z[7]=z[7]+c
z[11]=z[11]+d},
ap:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
z[3]=y[3]
z[4]=y[4]
z[5]=y[5]
z[6]=y[6]
z[7]=y[7]
z[8]=y[8]
z[9]=y[9]
z[10]=y[10]
z[11]=y[11]
z[12]=y[12]
z[13]=y[13]
z[14]=y[14]
z[15]=y[15]},
eU:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=a.a
y=z[0]
x=z[2]
w=z[4]
v=z[1]
u=z[3]
t=z[5]
z=b.a
s=z[0]
r=z[1]
q=z[2]
p=z[3]
o=z[4]
n=z[5]
m=z[6]
l=z[7]
k=z[8]
j=z[9]
i=z[10]
h=z[11]
g=z[12]
f=z[13]
e=z[14]
z=z[15]
d=this.a
d[0]=y*s+v*r
d[1]=x*s+u*r
d[2]=q
d[3]=w*s+t*r+p
d[4]=y*o+v*n
d[5]=x*o+u*n
d[6]=m
d[7]=w*o+t*n+l
d[8]=y*k+v*j
d[9]=x*k+u*j
d[10]=i
d[11]=w*k+t*j+h
d[12]=y*g+v*f
d[13]=x*g+u*f
d[14]=e
d[15]=w*g+t*f+z}}}],["","",,U,{"^":"",aQ:{"^":"c;ae:a>,af:b>,$ti",
j:function(a){return"Point<"+new H.cz(H.a4(H.I(this,0)),null).j(0)+"> [x="+H.f(this.a)+", y="+H.f(this.b)+"]"},
q:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isay&&this.a===z.gae(b)&&this.b===z.gaf(b)},
gn:function(a){var z,y
z=this.a
y=this.b
return O.dw(O.aL(O.aL(0,z&0x1FFFFFFF),y&0x1FFFFFFF))},
G:function(a,b){return new U.aQ(C.d.G(this.a,C.k.gae(b)),C.d.G(this.b,C.k.gaf(b)),this.$ti)},
$isay:1}}],["","",,U,{"^":"",az:{"^":"c;aw:a>,aA:b>,O:c>,M:d>,$ti",
j:function(a){return"Rectangle<"+new H.cz(H.a4(H.I(this,0)),null).j(0)+"> [left="+H.f(this.a)+", top="+H.f(this.b)+", width="+H.f(this.c)+", height="+H.f(this.d)+"]"},
q:function(a,b){var z
if(b==null)return!1
z=J.o(b)
return!!z.$isE&&this.a===z.gaw(b)&&this.b===z.gaA(b)&&this.c===z.gO(b)&&this.d===z.gM(b)},
gn:function(a){var z,y,x,w
z=this.a
y=this.b
x=this.c
w=this.d
return O.dw(O.aL(O.aL(O.aL(O.aL(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
$isE:1,
$asE:null}}],["","",,Q,{"^":"",
km:function(){var z,y
try{z=P.fC("TouchEvent")
return z}catch(y){H.J(y)
return!1}}}],["","",,N,{"^":"",fZ:{"^":"c;a,b,c,d,e",
h3:[function(a){this.d.a9(0)
this.e.a9(0)
this.b.bo(0,this.a)},"$1","gel",2,0,9],
h2:[function(a){this.d.a9(0)
this.e.a9(0)
this.b.eS(new T.i4("Failed to load "+H.f(this.a.src)+".",null))},"$1","gek",2,0,9]}}],["","",,O,{"^":"",
aL:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dw:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,V,{"^":"",
bT:function(a){var z,y,x
z=C.a.T(a,16)
y=C.a.T(a,8)
x=C.a.T(a,24)
return"rgba("+(z&255)+","+(y&255)+","+(a&255)+","+H.f((x&255)/255)+")"},
lm:function(a,b){if(a<=b)return a
else return b},
ln:function(a,b){if(a<=b)return a
else return b},
bS:function(a,b,c){if(a<=b)return b
else if(a>=c)return c
else return a},
b_:function(a){if(typeof a==="number"&&Math.floor(a)===a)return a
else throw H.d(P.O("The supplied value ("+H.f(a)+") is not an int."))},
eY:function(a){return a},
f7:function(a,b,c){return a-c<b&&a+c>b}}],["","",,Q,{"^":"",ib:{"^":"c;"}}],["","",,B,{"^":"",
nE:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=X.ab
y=P.i
x=P.i0(P.V([C.l,4278190080,C.o,4278190219,C.p,4282924427,C.m,4294951115,C.j,4294928820]),z,y)
w=new X.fN(P.V([C.m,1,C.j,1,C.l,0,C.o,0,C.p,0]),null,null,null)
v=new L.iK([],62,64,64,w,[z])
w.a=!0
w.b=C.l
w=P.fE(0,0,0,50,0,0)
$.$get$eI().aa(C.y,"Generator: MathematicalGenerators.RANDOM",null,null)
u=A.b2
t=new P.cC(null,0,null,null,null,null,null,[u])
s=new T.im(v,null,null,null,w,0,null,0,null,x,t,new P.cC(null,0,null,null,null,null,null,[T.e0]))
$.$get$bQ().aa(C.y,"Max Age: null",null,null)
v.d7(new K.i9(C.E,C.j,C.l,[z]).ds(64,64))
z=v.bl(!0,x)
if(t.b>=4)H.q(t.ak())
t.aj(0,z)
r=new E.iO(64,64,P.dy(y,A.aJ),null)
z=document
y=z.querySelector("#canvas")
v=x.gbM(x)
r.fn(y,P.cf(v,!1,H.X(v,"U",0)),512,512)
new P.bK(t,[u]).bD(new B.lg(r))
q=z.querySelector("#controls_back")
p=z.querySelector("#controls_pause")
o=z.querySelector("#controls_play")
n=z.querySelector("#controls_forward")
p.toString
z=W.aw
W.x(p,"click",new B.lh(s),!1,z)
o.toString
W.x(o,"click",new B.li(s),!1,z)
q.toString
W.x(q,"click",new B.lj(s),!1,z)
n.toString
W.x(n,"click",new B.lk(s),!1,z)
s.bB(w,null)},"$0","eX",0,0,2],
lg:{"^":"h:27;a",
$1:function(a){this.a.a4(a)}},
lh:{"^":"h:1;a",
$1:function(a){var z=this.a
return!z.c.gav()?z.c.ay(0):null}},
li:{"^":"h:1;a",
$1:function(a){var z=this.a
return z.c.gav()?z.c.aY(0):null}},
lj:{"^":"h:1;a",
$1:function(a){var z,y,x
z=this.a
if(!z.c.gav())z.c.ay(0)
y=z.a
x=y.a
if(x.length>1)x.pop()
x=z.Q
z=y.bl(!1,z.z)
if(x.b>=4)H.q(x.ak())
x.aj(0,z)
return}},
lk:{"^":"h:1;a",
$1:function(a){var z=this.a
if(!z.c.gav())z.c.ay(0)
z.cr()
return}}},1]]
setupProgram(dart,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.du.prototype
return J.dt.prototype}if(typeof a=="string")return J.bq.prototype
if(a==null)return J.dv.prototype
if(typeof a=="boolean")return J.hQ.prototype
if(a.constructor==Array)return J.b7.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b9.prototype
return a}if(a instanceof P.c)return a
return J.bV(a)}
J.R=function(a){if(typeof a=="string")return J.bq.prototype
if(a==null)return a
if(a.constructor==Array)return J.b7.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b9.prototype
return a}if(a instanceof P.c)return a
return J.bV(a)}
J.cQ=function(a){if(a==null)return a
if(a.constructor==Array)return J.b7.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b9.prototype
return a}if(a instanceof P.c)return a
return J.bV(a)}
J.cR=function(a){if(typeof a=="number")return J.b8.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bI.prototype
return a}
J.l_=function(a){if(typeof a=="number")return J.b8.prototype
if(typeof a=="string")return J.bq.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bI.prototype
return a}
J.bh=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.b9.prototype
return a}if(a instanceof P.c)return a
return J.bV(a)}
J.fa=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.l_(a).G(a,b)}
J.a5=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).q(a,b)}
J.fb=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cR(a).a5(a,b)}
J.cX=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.le(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.R(a).h(a,b)}
J.fc=function(a,b,c,d){return J.bh(a).e_(a,b,c,d)}
J.fd=function(a,b,c,d){return J.bh(a).es(a,b,c,d)}
J.cY=function(a,b){return J.cQ(a).m(a,b)}
J.N=function(a){return J.o(a).gn(a)}
J.bi=function(a){return J.cQ(a).gD(a)}
J.aq=function(a){return J.R(a).gi(a)}
J.fe=function(a){return J.bh(a).gad(a)}
J.ff=function(a,b){return J.cQ(a).d5(a,b)}
J.c0=function(a){return J.cR(a).p(a)}
J.fg=function(a,b){return J.bh(a).E(a,b)}
J.aI=function(a){return J.o(a).j(a)}
J.cZ=function(a,b,c){return J.bh(a).hf(a,b,c)}
var $=I.p
C.a_=W.b1.prototype
C.a3=J.e.prototype
C.b=J.b7.prototype
C.i=J.dt.prototype
C.a=J.du.prototype
C.k=J.dv.prototype
C.d=J.b8.prototype
C.f=J.bq.prototype
C.aa=J.b9.prototype
C.F=H.ie.prototype
C.G=H.ih.prototype
C.H=J.il.prototype
C.u=P.cs.prototype
C.z=J.bI.prototype
C.V=W.bd.prototype
C.W=W.jd.prototype
C.h=new L.d2(1,771,"source-over")
C.Y=new P.ik()
C.Z=new P.jU()
C.e=new P.k8()
C.A=new P.b4(0)
C.a0=new R.c7(0,"EventPhase.CAPTURING_PHASE")
C.c=new R.c7(1,"EventPhase.AT_TARGET")
C.a1=new R.c7(2,"EventPhase.BUBBLING_PHASE")
C.l=new X.ab(0,"GameOfLifeStates.DEAD")
C.m=new X.ab(1,"GameOfLifeStates.ALIVE")
C.o=new X.ab(2,"GameOfLifeStates.DEAD_UNDER_POPULATED")
C.p=new X.ab(3,"GameOfLifeStates.DEAD_OVER_POPULATED")
C.j=new X.ab(4,"GameOfLifeStates.ALIVE_BORN")
C.x=new R.ca(0,"InputEventMode.MouseOnly")
C.a2=new R.ca(1,"InputEventMode.TouchOnly")
C.B=new R.ca(2,"InputEventMode.MouseAndTouch")
C.a4=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.a5=function(hooks) {
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
C.C=function(hooks) { return hooks; }

C.a6=function(getTagFallback) {
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
C.a7=function() {
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
C.a8=function(hooks) {
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
C.a9=function(hooks) {
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
C.D=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.y=new N.bs("FINE",500)
C.q=new N.bs("INFO",800)
C.ab=new N.bs("OFF",2000)
C.X=new U.fB([null])
C.ac=new U.dA(C.X,[null])
C.E=new K.P(0,"MathematicalGenerators.RANDOM")
C.ad=new K.P(1,"MathematicalGenerators.CELLS")
C.ae=new K.P(10,"MathematicalGenerators.SIERPINSKI_MOUNTAINS")
C.af=new K.P(2,"MathematicalGenerators.X_MOD_Y")
C.ag=new K.P(3,"MathematicalGenerators.ARCS")
C.ah=new K.P(4,"MathematicalGenerators.DIAGONAL_STRIPES")
C.ai=new K.P(5,"MathematicalGenerators.BLOCKS")
C.aj=new K.P(6,"MathematicalGenerators.BLOCKS2")
C.ak=new K.P(7,"MathematicalGenerators.CHESS")
C.al=new K.P(8,"MathematicalGenerators.ENDLESS_SIERPINSKI")
C.am=new K.P(9,"MathematicalGenerators.SIERPINSKI_LEVEL10")
C.r=new L.dV(0,"RenderEngine.WebGL")
C.I=new L.dV(1,"RenderEngine.Canvas2D")
C.an=new L.dZ(9728)
C.J=new L.dZ(9729)
C.t=new L.iG(33071)
C.ao=new T.e0(0,"SimulationCompleteReason.stable")
C.K=new A.a2(0,"StageAlign.TOP_LEFT")
C.L=new A.a2(1,"StageAlign.TOP")
C.M=new A.a2(2,"StageAlign.TOP_RIGHT")
C.N=new A.a2(3,"StageAlign.LEFT")
C.n=new A.a2(4,"StageAlign.NONE")
C.O=new A.a2(5,"StageAlign.RIGHT")
C.P=new A.a2(6,"StageAlign.BOTTOM_LEFT")
C.Q=new A.a2(7,"StageAlign.BOTTOM")
C.R=new A.a2(8,"StageAlign.BOTTOM_RIGHT")
C.v=new A.cu(0,"StageRenderMode.AUTO")
C.S=new A.cu(2,"StageRenderMode.ONCE")
C.ap=new A.cu(3,"StageRenderMode.STOP")
C.T=new A.bF(0,"StageScaleMode.EXACT_FIT")
C.aq=new A.bF(1,"StageScaleMode.NO_BORDER")
C.ar=new A.bF(2,"StageScaleMode.NO_SCALE")
C.w=new A.bF(3,"StageScaleMode.SHOW_ALL")
C.as=new E.e2(0,"StageXLDisplayMode.FULLSCREEN")
C.U=new E.e2(1,"StageXLDisplayMode.FIXED")
$.dS="$cachedFunction"
$.dT="$cachedInvocation"
$.bw=null
$.bx=null
$.S=0
$.aK=null
$.d3=null
$.cS=null
$.eS=null
$.f5=null
$.bU=null
$.bX=null
$.cT=null
$.aE=null
$.aW=null
$.aX=null
$.cL=!1
$.n=C.e
$.di=0
$.cw=null
$.f0=!1
$.lr=C.ab
$.kv=C.q
$.dC=0
$.T=0
$.ez=1
$.bB=0
$.eH=17976931348623157e292
$.cJ=-1
$.ic=!1
$.id="auto"
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
I.$lazy(y,x,w)}})(["d7","$get$d7",function(){return H.eZ("_$dart_dartClosure")},"cb","$get$cb",function(){return H.eZ("_$dart_js")},"dn","$get$dn",function(){return H.hM()},"dp","$get$dp",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.di
$.di=z+1
z="expando$key$"+z}return new P.fL(null,z)},"e8","$get$e8",function(){return H.W(H.bH({
toString:function(){return"$receiver$"}}))},"e9","$get$e9",function(){return H.W(H.bH({$method$:null,
toString:function(){return"$receiver$"}}))},"ea","$get$ea",function(){return H.W(H.bH(null))},"eb","$get$eb",function(){return H.W(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ef","$get$ef",function(){return H.W(H.bH(void 0))},"eg","$get$eg",function(){return H.W(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ed","$get$ed",function(){return H.W(H.ee(null))},"ec","$get$ec",function(){return H.W(function(){try{null.$method$}catch(z){return z.message}}())},"ei","$get$ei",function(){return H.W(H.ee(void 0))},"eh","$get$eh",function(){return H.W(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cB","$get$cB",function(){return P.jf()},"aZ","$get$aZ",function(){return[]},"eI","$get$eI",function(){return N.au("cellular_automata.generators.mathematical")},"dH","$get$dH",function(){return P.V([C.E,new K.kG(),C.ad,new K.kH(),C.af,new K.kK(),C.ag,new K.kL(),C.ah,new K.kM(),C.ak,new K.kN(),C.ai,new K.kO(),C.aj,new K.kP(),C.al,new K.kQ(),C.am,new K.kR(),C.ae,new K.kI()])},"bQ","$get$bQ",function(){return N.au("cellular_automata.player")},"eK","$get$eK",function(){return N.au("cellular_automata.renderers.stage_xl")},"eJ","$get$eJ",function(){return N.au("cellular_automata.simulator")},"dE","$get$dE",function(){return N.au("")},"dD","$get$dD",function(){return P.dy(P.p,N.cg)},"d1","$get$d1",function(){return new A.fj(!0,!0,!1,2,!1)},"cv","$get$cv",function(){return new A.iN(C.r,C.x,C.v,C.w,C.n,4294967295,!1,!1,5,!0,!0,!1,!1)},"cK","$get$cK",function(){return[]},"eE","$get$eE",function(){return[]},"eF","$get$eF",function(){return[]},"eM","$get$eM",function(){return[]},"cP","$get$cP",function(){var z=W.lA().devicePixelRatio
return typeof z!=="number"?1:z},"f2","$get$f2",function(){return Q.km()},"cj","$get$cj",function(){return H.hU(P.p,Q.ib)},"dI","$get$dI",function(){return P.iU(null,null,!1,P.p)},"dJ","$get$dJ",function(){var z=$.$get$dI()
z.toString
return new P.jm(z,[H.I(z,0)])}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null,0]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,args:[P.i,P.i]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.c],opt:[P.bE]},{func:1,args:[,,]},{func:1,ret:P.p,args:[P.i]},{func:1,v:true,args:[P.bm]},{func:1,v:true,args:[W.K]},{func:1,args:[,P.p]},{func:1,args:[P.p]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,P.bE]},{func:1,args:[P.i,,]},{func:1,args:[,],opt:[,]},{func:1,args:[P.p,,]},{func:1,args:[P.i]},{func:1,args:[,X.ab]},{func:1,v:true,args:[,]},{func:1,v:true,args:[W.aw]},{func:1,v:true,args:[W.bd]},{func:1,v:true,args:[W.bG]},{func:1,v:true,args:[W.br]},{func:1,v:true,args:[A.aJ]},{func:1,args:[P.F]},{func:1,v:true,args:[P.F]},{func:1,args:[A.b2]},{func:1,ret:P.F},{func:1,ret:P.p,args:[W.r]}]
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
if(x==y)H.lu(d||a)
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
Isolate.H=a.H
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.f8(B.eX(),b)},[])
else (function(b){H.f8(B.eX(),b)})([])})})()