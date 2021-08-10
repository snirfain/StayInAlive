(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Stay_In_Alive_AnimationByFainshteinSnir_atlas_1", frames: [[3797,1334,14,53],[3797,1447,9,53],[3797,1389,10,56],[3797,1275,14,57],[3207,903,588,1033],[3797,903,129,370],[0,0,1923,1109],[1925,0,1280,720],[2564,1938,1280,386],[1925,722,1280,720],[3207,0,759,901],[0,1111,1280,720],[1282,1444,1280,720],[0,1833,1280,720]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Bitmap1 = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap2 = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap4 = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap5 = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap5_1 = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap7 = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.MDALOGONEWpngcopy = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.רקעעיר = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.רקעקדמימדאpngcopy = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.רקעאחורימדאpngcopy = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.דפיברילטור = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.מפעלהפיססגור = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.מפעלהפיספתוח = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.מפעלהפיסריק = function() {
	this.initialize(ss["Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.upLeg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(0.1,1,1).p("AhGlKQgggFgjgHQgVgEgWgFIABBRAiukHIBKgNIAmCyIglA5AA1lAQAqgCAagKIAvH5IANByAA1lAQALCxhJAJAhGlKQBJALAygBABdE8IADAAIgFgHABdE8IgCgHAgeCuIApCbIBSgNAB7FgIgbgkACoCtIgCCEIhGALAhGlKIBwGJIAcBvIAVCHAhMAcIgBAHAhMAlIgCgGIhlkq");
	this.shape.setTransform(40.65,9.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000099").s().p("AB7FgIgbgkIBGgLIACiEIgCCEIhGALIgFgHIABAHIhRANIgpibIguiJIAAgCIAAgHIAAAHIgCgEIhlkqIgBgDIAAhRIArAJIBDAMQBIALAzgBQAqgCAagKIAvH5IANByIgEAAIAAAAIAAACIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAACIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIAAABIgBABIAAACIAAABIAAABIgBAAIAAABIgBAAIAAABIAAABIAAABIgBABIAAABIgBABIAAABIAAABIAAABIgBAAIAAABIAAABIAAAAIgBABIAAAAIAAABIAAAAIAAABIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIgCACIAAAAIgBABIAAABIgBABIAAAAIgCADIAAAAIgBACIgBAAIgCACIgBAAIgBABIgBABIgBAAIgBABIAAAAIgBABIgBABIgCAAIgBABIgBAAIgCABIgCAAIAAAAIgEABIgDAAIAAAAIgCABIgBAAIgDAAIgCAAIgCABgAAqA/IAcBvIAVCHIgViHIgchvIhwmJgAhjgpIAlg5IgmiyIhJANIBJgNIAmCygAgKiGQBAgIAAiHIgBgrIABArQAACHhAAIgABbE1IAFAHIgEAAgABbE1g");
	this.shape_1.setTransform(40.65,9.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.upLeg, new cjs.Rectangle(21.6,-26.7,38.199999999999996,72.3), null);


(lib.downLeg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ED7874").s().p("AgBgCIAEADIgFACg");
	this.shape.setTransform(39.8994,21.8014,0.0926,0.0926);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2773BF").s().p("AgJgGIATAEQgGAJgEAAQgFAAgEgNg");
	this.shape_1.setTransform(21.0195,-26.7372,0.0926,0.0926);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D0E5F3").s().p("AgJgEQACgLAHAAQAIAAACALQABAIgDAMIgRAAQgCgMACgIg");
	this.shape_2.setTransform(21.0253,-26.1654,0.0926,0.0926);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#333333").ss(0.1,1,1).p("AhblgIABAHIAoHHAAJjiIABADIAMFVQgCAIgMABIgQABIABANIhZAJIgEADIAJA3QgFAzgLAxQgBAIAAAGIDJgDQgEgfAOgdQgDgBgDAAQhwgXALhPQAAgFABgEQAAgBABgCIgFgDAAJjiIABAAAAKjiIAAADAAAkBIAJAfAhsFCQAAAXAJABIEDAHQAuADgUg2QgTgjhAgIAhfCEIgeABQgGgBgDgEQgCgDgBgEIg2mKAgICAIhXAEAhgCWIABgS");
	this.shape_3.setTransform(40.091,0.5306);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFCC99").s().p("AgrgHIBXgDIAAALIhYAKg");
	this.shape_4.setTransform(34.8,14.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CC0000").s().p("AhoBMQALgwAFgyIgJg3IAEgDIBZgKIAEAEIAAACIgBAJQgLBPBwAWIAGABQgOAdAEAfIjJAEIABgPg");
	this.shape_5.setTransform(39.775,23.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCCC").s().p("AB3AvIkEgHQgJgBABgXIDJgDQgEgeANgdQBAAIATAjQAUAygpAAIgEAAg");
	this.shape_6.setTransform(44.2397,31.1306);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000099").s().p("AgwDuQgDgCgBgEIg1mKIgChQIBlAAIAQAAIAAABIAAABIAAABIAAACIAAACIAAABIAAACIAAABIAAABIAAACIAAAAIAAABIAAACIgBAAIAAACIAAAAIAAABIAAABIAAACIAAABIAAABIAAABIAAACIAAAAIAAABIAAABIAAACIAAAAIAAACIABAAIAAACIAAABIAAABIACABIAAACIAAAAIAAABIABABIAAAAIAAABIAAABIABAAIAAABIABAAIAAABIAAABIAAAAIABABIAAAAIAAABIAAABIABABIAAABIAAAAIAAABIABAAIAAABIABAAIAAABIABABIABAAIABABIAAAAIABABIACAAIAAABIAQAAIAHAIQANAMAQAEIAAAFIABABIAAABIABAAIAAAAIAAABIAGAAIAAADIAKAfIABADIAMFVQgDAIgMABIgQABIhXAEIgeABQgFgBgDgEgAgEjqIAnHGIgnnGIgCgIgABghxIgBgDIAAABIABAAIAAACgABfh0g");
	this.shape_7.setTransform(31.525,-10.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.downLeg, new cjs.Rectangle(19.9,-35.8,40.4,72.69999999999999), null);


(lib.Tween4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(0.1,1,1).p("ABlhXIACgFIgGgKABZhTIALgCIAAAAABggRIAogUIgHgJAB4gzIgPAEABghnQhFAbhEAaIgTAIAiHBnIDnh4");
	this.shape.setTransform(-3.25,2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AhggcIAkgOIAUgHICKg1IAAAAIAGAKIgCAFIgCABIABABIAAAAIgLACIgBABIARAkIABgBIAOgEIAEAGIAAAAIAFgCIABABIAEAJIgmAUIAAAAIjnB5g");
	this.shape_1.setTransform(-3.35,2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#333333").ss(0.1,1,1).p("AgvAGIACgGQAIgNAOgLIATgPIAZgHIgBACQgTANgHAUQAdgCAbgWQACAHgFAFQADAYgNAZIhDAVAgyAMIABgB");
	this.shape_2.setTransform(11.8548,-7.8375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF9900").s().p("AgVALIArgWIgrAXg");
	this.shape_3.setTransform(-14.6875,11.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFCC99").s().p("Ag4ANIABgBIALgCIABAAIAAgCIACgFIADgFQAIgNAOgLIASgPIAZgHIAAACQgTAMgIAVQAdgDAcgWQABAIgFAFQADAZgNAYIhDAUIgOAEIgBABg");
	this.shape_4.setTransform(11.2173,-7.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.8,-13.5,35.8,26.9);


(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(51,51,51,0)").ss(0.1,1,1).p("AAwgcIhfA5");
	this.shape.setTransform(-25.5,-4.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#333333").ss(0.1,1,1).p("ABwAFIANAGIAUgLQAXgJAdAAIAngBIAnAQIgCACQglgDgeASQAoAaA5gBQgFALgMADQgUAigpATIhIgfIg0gQIgGgCABwAFIABgDIABAAIAEgSIkGhiIg/AqABsACIAEADAkugOIGPBgIAEgO");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF9900").s().p("AjRACIBfg5IA/grIEFBiIgEASIgBAAIgBADIgEgDIgBAAIgNA/IABABIAGACIgDAOg");
	this.shape_2.setTransform(-9.25,-1.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgtAfIgzgQIgHgCIAAAAIAMg/IABABIAFACIANAGIAUgLQAXgJAcAAIAngBIAnAQIgCADQglgDgfASQAoAZA5gBQgEALgNACQgUAigpAUg");
	this.shape_3.setTransform(19.8,5.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.2,-12.5,62.5,25);


(lib.Symbol76 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap7();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol76, new cjs.Rectangle(0,0,129,370), null);


(lib.Symbol75 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6C6C").s().p("Ak/jDIAAgKQE7AAE6gPIAAgPIAKAAIAAAeIAAAKQgFAAiqFDQg5BshHAAQiMAAjEmvg");
	this.shape.setTransform(99,212.6128);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(87,87,87,0.875)").s().p("AgEAoIAAgKIAAhFIAJAAIAABFIAAAKIgJAAg");
	this.shape_1.setTransform(130.5,185);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(21,21,21,0.384)").s().p("AgFAeIAAhFIAJAAIAAAKQAHAugQAXIAAgKg");
	this.shape_2.setTransform(131.625,185);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(91,91,91,0.898)").s().p("AgEAoIAAgKIAAhFIAJAAIAABFIAAAKIgJAAg");
	this.shape_3.setTransform(131.5,162);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(36,36,36,0.533)").s().p("AgFAeIAAhFIAJAAIAAAKQAHAvgQAWIAAgKg");
	this.shape_4.setTransform(132.625,162);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(68,68,68,0.631)").s().p("AgFAyIAAhtIAJAAIAAAKQAHBDgQAqIAAgKg");
	this.shape_5.setTransform(135.625,117);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(85,85,85,0.843)").s().p("AgEAyIAAgKIAAhZIAJAAIAABFIAAAKIAAAKIAAAKIgJAAg");
	this.shape_6.setTransform(135.5,106);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(15,15,15,0.361)").s().p("AgFAeIAAhFIAJAAIAAAKQAHAugQAXIAAgKg");
	this.shape_7.setTransform(136.625,105);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(66,66,67,0.737)").s().p("AAAAFIgJAAQADgJAGAAIAKAAIAAAJIgKAAg");
	this.shape_8.setTransform(65.975,192.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(20,20,20,0.322)").s().p("Agdg8IgKAAQAAgFgBAAQgPgEAGgVQARgDgCgbIAFAAIAAAoIAIAUIBJC1QhRi4AAADg");
	this.shape_9.setTransform(57.9893,199.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(30,30,31,0.529)").s().p("AgEA8IAAg8IAAgJIAAg8QAQA5gMBRIgEABIAAgKg");
	this.shape_10.setTransform(55.5104,180);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(16,16,16,0.286)").s().p("AAABZQgFhZAAhZQAQAlgHA+IAAAKIAAA8IAAAKIgEgBg");
	this.shape_11.setTransform(54.625,171);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(29,29,30,0.475)").s().p("AAAAxQgFgxAAgxQAQAggHA5IAAAKIgEgBg");
	this.shape_12.setTransform(51.625,136);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(28,28,28,0.451)").s().p("AAAA8QgFg8AAg7QAQAqgHBDIAAAKIgEAAg");
	this.shape_13.setTransform(50.625,124);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(23,23,23,0.4)").s().p("AAAA3QgFg3AAg2QAQAlgHA+IAAAKIgEAAg");
	this.shape_14.setTransform(49.625,112.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(27,27,27,0.443)").s().p("AAAAxQgFgxAAgxQAQAggHA5IAAAKIgEgBg");
	this.shape_15.setTransform(48.625,100);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(25,25,25,0.373)").s().p("AAABKQgFhKAAhKQAQA5gHBSIAAAKIgEgBg");
	this.shape_16.setTransform(46.625,80.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(28,28,28,0.424)").s().p("AAJC4QgFg7AAg8QARArgHBDIAAAKIgFgBgAgKgsQgFhGAAhGIAKAAIAACCIAAAKIgFAAg");
	this.shape_17.setTransform(44.625,52.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(39,39,39,0.627)").s().p("AABAtIABgKQALgtgWgLIAAgXIAKAAIAKAAIAABPIAAAKIgKAAg");
	this.shape_18.setTransform(42.95,29.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(105,105,105,0.976)").s().p("AAAAhIgKAAIABhBQAWASgDAvIgKAAg");
	this.shape_19.setTransform(42.9792,21.725);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(81,81,81,0.749)").s().p("AgEBGIAAgKIAAiBIAJAAIAACBIAAAKIgJAAg");
	this.shape_20.setTransform(136.5,94);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(51,51,51,0.608)").s().p("AgFAyIAAg7IAAgKIAAgoIAJAAIAAAKQAHBDgQAqIAAgKg");
	this.shape_21.setTransform(143.625,49);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(77,77,77,0.761)").s().p("AgFAyIAAhtIAJAAIAAA7IAAAKIABAKQAGAggQAIIAAgKg");
	this.shape_22.setTransform(142.6283,54);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(85,85,85,0.839)").s().p("AAAAsQgEgsAAgsIAJAAIAABPIAAAKIgFgBg");
	this.shape_23.setTransform(144.5,29.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(81,81,81,0.745)").s().p("AhLNmIAAgKIAAiMIAKAAIAACMIAAAKIgKAAgAhBKAIAAgKIAAhkIAKAAIAABkIAAAKIgKAAgABAq7IAAiqIAKAAIAAAKQAHBhgRBJIAAgKg");
	this.shape_24.setTransform(138.625,94);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(20,20,20,0.376)").s().p("AgEA3IAAgKIAAhjIAJAAIAABjIAAAKIgJAAg");
	this.shape_25.setTransform(146.5,1.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(87,87,87,0.871)").s().p("AgEA3IAAgKIAAhjIAJAAIAABjIAAAKIgJAAg");
	this.shape_26.setTransform(145.5,1.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(94,94,94,0.918)").s().p("AgEETIAAgKIAAobQAEAFADAGQACAEAAAFIAAIHIAAAKIgJAAg");
	this.shape_27.setTransform(145.5,-31.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(43,43,43,0.545)").s().p("AgEEJIAAgKIAAoHIAJAAIAAIHIAAAKIgJAAg");
	this.shape_28.setTransform(146.5,-30.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(6,6,6,0.125)").s().p("AAIAfQAAgFgCgEQgDgGgEgFQAAgFgCgEQgIgPgKgPQA2gKgOA7IgBAKIgKAAg");
	this.shape_29.setTransform(145.192,-60.0709);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(36,36,36,0.553)").s().p("AgsgEIBPAAIAKAAIAAAEQgtAFgsAAIAAgJg");
	this.shape_30.setTransform(59.5,-45.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(88,88,89,0.98)").s().p("ABKOeIhKi2IgGgUIAAgoIAFgBQALhSgQg5IAAgKQAGg/gQglIgBgKQgShbgBhtIAAgKQAHg6gRggIAAgKIAAgKQAHhEgRgpIAAgKQAHg/gRglIAAgKIAAgKIAAgKQAHg6gRggQAAgFgDgDQgPgUAIgqIAAgKQAHhTgRg5IAAgKIAAgKIAAgKQAHhEgRgqQAAgFgCgFQgQgmAIg+IAAgKIAAiCIAAgKIAAhQQADgwgYgSIACi8IBtgGIAKAAQA8NCA3NDQAJCCAFCCIgKAAQgIAAgDAKQAjBgALFiQgIACgHAAQhGAAAVkOg");
	this.shape_31.setTransform(55.725,118.623);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(107,107,107,0.992)").s().p("AkXP3Qg3tEg+tBIgKAAIhtAGIADm+IB0AAIAKAAQAtAAAtgFIAAgFQGOgqFAh7QABAAAAgFIA8AAIAKAAQAKAPAIAQQACAEAAAFIAAIcIAAAKIAABkIAAAKIAACqIAAAKIgKAAQAAAtAFAsIAFABIABAKQAHAvgSAXIAAAKIgKAAIAAAoIAAAKIgKAAIAABuIAAAKIAAAKQgTCBgfB4IAAAKIgKAAIAACCIAAAKIgKAAIAABaIAAAKIAABuIAAAKIAAAKQgBBygTBgIAAAKIAAAKIgKAAIAABkIAAAKIgKAAIAABGIAAAKIAACMIAAAKIgKAAIAABGIAAAKIAAAPQk7APk6AAQgFiCgIiCg");
	this.shape_32.setTransform(93.6625,64.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol75, new cjs.Rectangle(41.9,-63.1,105.5,301.40000000000003), null);


(lib.Symbol25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(0.1,1,1).p("AhagxIARAIIAUgLQAXgJAdAAIAngBIAmAQIgCADQgkgDgfASQAoAZA5gBQgFALgMACQgUAigpAUIhHggIg6gS");
	this.shape.setTransform(10.5,6.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("AgsAfIg7gSIgBAAIANg/IACABIARAIIAUgLQAXgJAcAAIAngBIAnAQIgCADQglgDgfASQAoAZA5gBQgEALgNACQgTAigpAUg");
	this.shape_1.setTransform(10.45,6.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol25, new cjs.Rectangle(-0.9,-1,22.799999999999997,14.6), null);


(lib.Symbol24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(51,51,51,0)").ss(0.1,1,1).p("AAwgcIhfA5");
	this.shape.setTransform(4.75,7.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#333333").ss(0.1,1,1).p("AjRACIGPBhIADgRIgBAAIANhAIABAAIAEgSIkGhiIg+Ar");
	this.shape_1.setTransform(21,9.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF9900").s().p("AjRACIBfg5IA+grIEGBiIgEASIgBAAIgNBAIABAAIgDARg");
	this.shape_2.setTransform(21,9.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol24, new cjs.Rectangle(-1,-1,44,21.7), null);


(lib.Symbol23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(0.1,1,1).p("AA9i1IAlEGAg7C2Igmk1");
	this.shape.setTransform(15.8,38.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AidGDIAAgBQgOgKgIgIQgIgIgBgHQgDiYAXinIAdj2IAhhEIAAAAQgUgjA1hLQAQgOAIgXQATgNA3AbQgHAbgLAXQAuAuA+AUIgLglIACgNQAlAdgCAYIgGAnIAMAaQAnBagCAmIAFD5IgCAAIAAACIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAAAIAAABIAAABIgBAAIAAABIAAAAIgBABIAAACIAAAAIgBABIAAAAIAAABIgBABIAAABIAAAAIAAABIgBAAIAAACIAAAAIgBABIAAABIAAABIAAABIgBABIAAADIAAABIAAAAIgBAAIAAACIAAAAIAAABIgBAAIAAAAIAAABIAAAAIgBABIAAABIAAAAIAAABIgBAAIAAABIAAABIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAACIAAAAIgBABIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAACIAAAAIAAABIgBABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAABIAAABIAAAAIgBAAIAAACIAAAAIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAACIAAAAIAAABIgBAAIAAABIAAAAIgBAAIAAABIAAAAIAAACIgBAAIAAABIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAABIgBAAIAAABIAAAAIAAABIgBABIAAAAIAAACIgBABIAAAAIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAAAIAAACIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAACIAAAAIAAAAIgBABIAAAAIAAACIgBAAIAAABIAAAAIAAACIgBAAIAAABIAAAAIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAAAIAAABIgBAAIAAABIAAAAIgBABIAAAAIAAAAIAAABIgBABIAAAAIAAAAIAAABIgBAAIAAABIAAAAIgBABIAAACIgBAAIAAAAIAAABIgDgBIAAADIgBAFIAAABIAAAAIAAADIgBACQgKBDgaAVQgKAIgMABIgGA3QjBgQgfgdgAhbCKIglk0gABCAmIglkGg");
	this.shape_1.setTransform(18.9577,43.2164);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol23, new cjs.Rectangle(0,0,37.9,86.5), null);


(lib.Start = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("התחל", "64px 'Times New Roman'");
	this.text.textAlign = "center";
	this.text.lineHeight = 73;
	this.text.lineWidth = 161;
	this.text.parent = this;
	this.text.setTransform(0,-36.05);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("ATgD0QhTCHh3B3QmKGKosAAQosAAmJmKQmKmJAAosQAAjqBGjO");
	this.shape.setTransform(-220.25,118.9875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.686)").s().p("Au1O2QmKmKAAosQAAorGKmKQGKmKIrAAQIsAAGKGKQGKGKAAIrQAAIsmKGKQmKGKosAAQorAAmKmKg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-346,-134.3,480.4,343.5);


(lib.secondmanup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF675C").s().p("AmUKgQgvg5guhYQEXpXCWn+QAOgmAFgTQAKgiAFgWQBAg5A7gUQBJgaBKARIAhACQATADACAMQALA4AyAbQAdAPBCAUQAJADAUAFQAPAGAIAMQkDLUj1FAQj2FBgJAKQgKALgMAXQhahNgfgog");
	this.shape.setTransform(1365.45,430.939,1,1,0,0,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FACB94").s().p("AkbFCQgngBgPgGQgbgLgDgfQgKg0ABgaQABgsAjgZIAogdQAXgPAWgEICQhdQAXiLEsioQA6BgA3AeQA3AegDBKQjfFHgfATQgZAPgnAMQiJAqihAAIgsgBg");
	this.shape_1.setTransform(1417.3138,515.895,1,1,-90);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FACB94").s().p("AkbFCQgngBgPgGQgbgLgDgfQgKg0ABgaQABgsAjgZIAogdQAXgPAWgEICQhdQAXiLEsioQA6BgA3AeQA3AegDBKQjfFHgfATQgZAPgnAMQiJAqihAAIgsgBg");
	this.shape_2.setTransform(1024.955,587.7138);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B4855B").s().p("AgYADIAYgXQAMAHAIAIQAJAKgHAIQgGAIgJAAQgNAAgSgSg");
	this.shape_3.setTransform(1305.9113,131.6481);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BE8E63").s().p("AgSgEQACgaAQgRIATAVQABAUgHAOQgJATgWAVQgBgmABgOg");
	this.shape_4.setTransform(1187.5062,126.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A97952").s().p("AgSgIQABgeARgYIATAAIgaB9QgMguABgZg");
	this.shape_5.setTransform(1323.3712,146);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A0714B").s().p("AgTA6QAAgpABgTQACglASgWIARgBQAEAYgKAlQgNArAAAQQgFAFgFAAQgEAAgFgFg");
	this.shape_6.setTransform(1325.3468,133.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#AD7D56").s().p("AgSBrQgGgFAGgPIAFjDQAMAGAEAWQAGAWAMAGQAFAegMAyQgOA4ABAYIgKABQgHAAgCgCg");
	this.shape_7.setTransform(1189.3465,112.8143);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#64605C").s().p("AgFBBQgcgEgQgSQgPgRgBgbQgCgaAYgUQAXgTAbACQAaACARATQARATgBAZQgBAcgWATQgTARgWAAIgHAAg");
	this.shape_8.setTransform(1220.9733,134.1869);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#66625C").s().p("AgqAzQgSgQgCgdQgDgdASgUQARgVAdgBQAcgBATAUQATAUgCAdQgBAdgRARQgQARgbAAIgCAAQgZAAgRgPg");
	this.shape_9.setTransform(1281.6149,144.4502);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8C5C3B").s().p("AB2BZIjJhSQgggMgMgJQgXgRAOglQALggAlARQBSAlApAZQBBAmAqAwQAEAZgSAAIgKgBg");
	this.shape_10.setTransform(1291.6401,123.0415);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8E5E3D").s().p("AifAqQAygqBKgUQAbgIBrgSQAzgJAJAtQAFAYgPALQgJAHgbAEQhJAMhOAAQg6AAg/gGg");
	this.shape_11.setTransform(1215.3875,110.8906);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#D4AC7E").s().p("Ag3BjQhwgGhLicQB2AyB8gOQBpgLCJg9Qg8BohDAvQhBAwhVAAIgUgBg");
	this.shape_12.setTransform(1252,237.7558);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFEFD").s().p("AgSBrQhFgPgkgaQgxgkgOhFQA9gIBDgRQAvgMBIgWQAqgNAVABQAkACASAgQAQAegLAhQgIAXgaAgQgiAogqARQgcAMgdAAQgQAAgSgEg");
	this.shape_13.setTransform(1250.8362,186.3647);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFEFE").s().p("Ag7DlQgSAAgngyIhoiEQAHgVAWgNIAogRQCXhFAoibIBdAsQA4AaAgAaQhOCziLCKQgrAsgTAAIgBAAg");
	this.shape_14.setTransform(1273.725,258.8761);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FE7A67").s().p("AgUAPIADgVQASgIAFgBQANgCACAPQACASgQAAQgTgDgIACg");
	this.shape_15.setTransform(1104.1861,388.2129);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFEFE").s().p("AALC/QiYiThGiwQAggbA4gaIBdgsQAKBGAxA6QAiAnBJA0QAOAJAdAMQAZAOAJAVIhjCJQghAugOABIgBAAQgPAAgogng");
	this.shape_16.setTransform(1228.35,258.9762);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FACB94").s().p("ADaBzQgSgygNgWQgQgcgPgHQgRgIgdANQhgAqhWgFQg8gEg9AmQgvAegRAGQgpAPgrgSQAphSAuguQA3g4BKgTQBIgTAigFQAkgFBJgIQA+gLAmgiQADAjAdAjIAyA6IBGBcQgHAcgXAhIgmA4QgkgNgUgpg");
	this.shape_17.setTransform(1031.775,566.725);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF675C").s().p("AmsKuQgvg6AChKQDnplCXn+QANglAFgUQAKghAFgXQBAg4A7gUQBJgaBLARIAgACQATACACANQALA4AyAaQAdAQBCATQAJAEAUAFQAQAFAHAMQkCLUnhJbIgZAfQgPAQgQAIQhMgygfgng");
	this.shape_18.setTransform(1098.1937,494.439);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF675C").s().p("AtbKrQANkcgTAbQgOAUgiDOQhLHZigkDQAGi1hYAOQhYAPi3BnICtqUQAEgJABgHQAtjSAaigQAhjIAQiuQAOilBhhoQBVhbCOgoIAZgHQBogZCbgZIEEgoQAlAhArBJQAwBQAbAdIAfAmQAUAZAMANQAeAeAZgCQAZgBAYgkQAZgqAQgTQAbghAigIIAUgBQAdgCAUAXQAMANASAeQBBBNAZAAQAaAABChQQBShiAphQQAPgdAGgJQAPgTAWgFQCJAPCkAkIAAAAIACAAQAbAGAlARIAAAAQBhAnBABFQBhBoAOClQAPCuAiDIQAaCgAtDSQABAHAEAJICtKUQi3hnhZgPQhYgOAHC1QiKDghMlDQgbBKghBNQiAEokwhcQkwhdn9BlQhWARhHAAQleAAASmig");
	this.shape_19.setTransform(1239.3,355.7129);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF675C").s().p("Ak9SQQk2ghlNiAQgjgPgGgiIAAg/IAMvEIAEk0QA3gFBKAKQArAGBUAPQGEA6GqiiQHcizEonqIApg4QAMACAFATQAGATAKADIAJCaQAGBaACBAIANHzQAIEsAIDFQAFBwAHD8QAGDsAGCAQACAmgKAUQgLAXggALQizA+h3AhQilAviNAVQjUAfjGAAQiBAAh8gNg");
	this.shape_20.setTransform(1252.2042,473.5102);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#825233").s().p("AJfIwQgJgcgdgLQgkgIgQgGQkhhcjpiCQhwg/hNg6QhhhHhDhSQgTgVgPgFQgTgHgXAOQh7BMhDBKQhVBggZB4QgdAEABgZQABgfgHgEIgGgBIgCh4QgBhHAEgwQAOikBEh0QBJh/CPhNICBhIQBMgoA7gUQFwgvErC9QDJB/BPDOQBODNhFDdQgOAugfA2QgJAQgyBMIgRAUQgEAFgFAAQgEAAgEgEg");
	this.shape_21.setTransform(1264.8665,71.7281);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FACB94").s().p("AhHPUQh9g3hUhqQgdgkgIgVQgMgiATgiQAIgegOgVQgKgQgfgTQkDilhelDQghhuAZiRQANhQgEgmQgIg+gwgvQhAg/AYiIQAQhWBkABIAMALQAOAigEAxIgGA7IACgUQAGgrgBgdQALhuBjh9QBjh8BjgfQA8gTAoAqQCdClDmB7QCpBaEUBjQAYAIAzAPQAoASAJArQgDATgJAmQgGAjAAAYQgKAegFAYQAFgXAKgYQAAgvAShBQAHgbAVgBQBEAmAOAmQANAngdBEQgkBRhWA7QgPAdgIAqQgEAVgFAzQgRCdheCGQhMBsiPBwQgkAdgQAXQgWAfABAmQgTBrhSBKQg5Azh2A5QgIADgHAAQgHAAgIgCgAqtmqQgHAdgCARQAFgMADgUQACgUAEgJIACgSIgHAhg");
	this.shape_22.setTransform(1256.3596,166.5006);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.secondmanup, new cjs.Rectangle(987.3,15.3,462.4000000000001,604.8000000000001), null);


(lib.Scene_1_RekaCSN2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// RekaCSN2
	this.instance = new lib.רקעעיר();
	this.instance.setTransform(18,3);

	this.instance_1 = new lib.מפעלהפיססגור();
	this.instance_1.setTransform(18,3,0.9936,0.9997);

	this.instance_2 = new lib.מפעלהפיספתוח();
	this.instance_2.setTransform(18,3,0.9927,0.9998);

	this.instance_3 = new lib.מפעלהפיסריק();
	this.instance_3.setTransform(18,3,0.9927,0.9997);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance,p:{x:18,y:3}}]},371).to({state:[{t:this.instance_1}]},30).to({state:[{t:this.instance_2}]},9).to({state:[{t:this.instance_3,p:{scaleX:0.9927,scaleY:0.9997,x:18,y:3}}]},7).to({state:[{t:this.instance_3,p:{scaleX:1,scaleY:1,x:0,y:0}}]},11).to({state:[{t:this.instance,p:{x:0,y:0}}]},6).to({state:[]},300).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Reka = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Reka
	this.instance = new lib.רקעעיר();

	this.instance_1 = new lib.רקעאחורימדאpngcopy();
	this.instance_1.setTransform(18,9,0.9921,0.9998);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E9E9E9").ss(0.1,1,1).p("A99xjMA77AAAMAAAAjHMg77AAAg");
	this.shape.setTransform(637.325,127.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AWS1bIPYAAMAAAAq3MhLTAAAIAAnx");
	this.shape_1.setTransform(686.525,152.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E9E9E9").s().p("A99RjMAAAgjFMA77AAAMAAAAjFg");
	this.shape_2.setTransform(637.325,127.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E30613").s().p("EglpAVcIAAnxMA77AAAMAAAgjFIPYAAMAAAAq2g");
	this.shape_3.setTransform(686.525,152.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},128).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},46).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_1}]},40).to({state:[]},156).wait(185));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(175).to({_off:true},40).wait(341));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_RamzorCSN2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// RamzorCSN2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9FDED").s().p("AgTA0QgagQgLgeQgGgPACgSQACgMAGgWQAFAIABAMIADAVQAKAjAZAOQAYAPAjgKQAFgBACAAQADABABAFIgWAPQgOAIgPAAQgOAAgQgKg");
	this.shape.setTransform(1131.1474,384.3646);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B4FAE5").s().p("Ag5BGQgbgeAFgcQAAgDgEgKIADgKIACgKQAHgoAhgWQAfgUAgALQAhAMAPAjQAKAVABAgQAAAggWAaQgUAZgaAEIgQACQghAAgYgbg");
	this.shape_1.setTransform(1132.274,382.1498);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D26D28").s().p("ABKAxIgDgQIgHgUQgEgLgHgGQgggjggAJQgwAOgMAvIgDANQgCAHgIACQgEgFAAgJIAAgOQACgCAAgFQAAgGACgCIABgJIAEgEIAAgFIAFgFIAAgFIAFgEIAAgFIAQgOQApggAuASIALAEIAYAYIAFAJIAFAFIAAAFIACAFIACAEIABAEIACAFQABAEABABIABAYQAAAPgFAJQgHgFgDgJg");
	this.shape_2.setTransform(1132.3011,376.669);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E29234").s().p("AgHByQgbgCgbgYQgbgZgHgbIgCgOQgCgIgEgFQgFgIADgKIAWhDQAEgMAMgBIADAEIgCAIIgFALIgGATQgCAFAAAJQAAASAEAGQAEAIAAAMQADAdATAVQAUAVAcABQAYABATgNQAVgPAJgdIAHgbQAEgLAAgcQAAgIgCgEIgCgGQgBgHgCgDIgCgEIgIgNIgDgEIgBgCIgPgPQgDgFADgDQAagCAPAhQAsBeg7BGIgDAEQgmAcghAAIgGAAg");
	this.shape_3.setTransform(1132.1045,382.8085);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9C521F").s().p("AgqAKQABgGAIgFQAIgGACgFIAdAAQASAAALgDQAGgBACAIQgZAYgeAAQgOAAgQgGg");
	this.shape_4.setTransform(1142.0985,396.7462);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DE8B31").s().p("Ag2CIIgFgGQgCgEgDAAQgRgEgKgRIgOgfQgUglAHglQAJgyARgcQAMgTAVgOQALgIAcgOQAIADAQgEQARgDAIADQA7AcAWAxQARApgJA5QgEAYgOANQgFAFgDAHQgJAcgVAGQgGACgGAKg");
	this.shape_5.setTransform(1132.2765,381.2952);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#AB8B5F").s().p("AgNAAIANgIIAFgGIAAABQAIAAABAJIgIAKQgFAGgFADQAAgKgJgFg");
	this.shape_6.setTransform(1136.8238,361.8335);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BCA473").s().p("AgIABQgKgEgBgDIAJAAQADgCAHAAQAGAAADgDQARgBgIAPIgEAFIgOAEQAAgHgIgEg");
	this.shape_7.setTransform(1134.5387,363.0305);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C8B884").s().p("AAKAeQgLgDgUgLIgMgOQgGgIgCgJIgDgFIgCgJQAGgDAFAFQAHAGADAAQAbAbAYACQADADAMABQAIACgEANQgKAFgMAAIgNgCg");
	this.shape_8.setTransform(1129.9131,361.5719);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A97449").s().p("AgcASIgEgEIgFgBQgEgEgLgFIAAgEIAFgPQAGgEAHABIAMAFQAXAGAPgEIAJgBQAFAAAEADQAFAJAOAAIgKAJQgPAHgUACIgPABIgVgBg");
	this.shape_9.setTransform(1132.499,364.788);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#AC5821").s().p("AgUADQAUgKAVAKg");
	this.shape_10.setTransform(1121.7245,397.0569);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#AC5821").s().p("AADAJIgJAAQgLAIgIgJQgHgEgMABQgPAAgFgBQgBgEgJgEQgJgEAAgGICnAAQADAKgIAEIgOAIIgmACQgGAFgGAAQgGAAgGgGg");
	this.shape_11.setTransform(1131.3399,396.945);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#986944").s().p("AgCAOIgFgDQgDgDgBgDIATgTIAEABIgGAOQgDAJgEAFg");
	this.shape_12.setTransform(1138.5237,359.9086);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#B7A070").s().p("AABAaIgIgHQgFgKABgNQABgQAAgIIAIAAQgBAOAEAOQADAKAJARQgDACgDAAQgDAAgDgDg");
	this.shape_13.setTransform(1126.047,356.6477);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8C5F3F").s().p("Ag4AMQgKgRgCgKQgEgQAHgPQBHAABAAvQgHARgGADIgJAKQgCACgEACIgHAEIgGABQgFABgOAFIgKABQghgEgXgfg");
	this.shape_14.setTransform(1132.3012,358.3837);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#D0772C").s().p("ABDCbQgoAChOgBQgbAAgRgJIgfgBQgPAAgBgQIgBg3QgFg1AFg0IAAgYQAIgSAPgVIAbglQATgXAWgCQAPgEAAAOIgNAKQgIAFgHACQgKAEgEAIQgLASgOALQgEAEAAACIgUAvQgJAcACAWIABATIABATIAHAfQAGARALAKIADAEQAEATAPAFQAIADAXgBQAFgHALAAIBIgBQAKgBAGAJQAmAGAQgkQADgFAIgJQAIgJACgGQAOgeAAgYQAEAWgBAtIAAAOQAAAIAEAFIABAUQAEAJgLACIgjACIgMABQgOAAgKgCg");
	this.shape_15.setTransform(1132.4541,380.7513);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#D67F2F").s().p("AAzCVQgHgIAEgGIALgKQAxgsAFg8QAEg9gugvQgegfglAAQgkAAghAdQgpAlgFA6QgFA6AhAuQADAEAOAMQAIAGACADQADAGgEAHQgUAGgMgEQgKgEgMgRQg7hVAvhvQALgbAUgVQAWgWAcgJIAIgCIAMAAQAgACAOgEQANgEAHAHQAXAHAbAaQAMALAMAUIAVAgIABASQAAAKAEAHIABADQgDA7ADBQIgBAAQgKgCgCgIQgBgDAAgNQAAgHADgRQgIAbgVAbQgMAPgMAFQgGACgHAAQgIAAgJgDg");
	this.shape_16.setTransform(1132.4693,380.4665);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#986944").s().p("AgTAKQgBgFADgFIAJgKQAGgGAFgCIADACQABAMANACIAAADIgTAPQgEADgEAAQgIAAgEgJg");
	this.shape_17.setTransform(1137.6702,363.1039);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#8C5F3F").s().p("AgKAUQgDgDgDgJIAGgQQAFgJAHgEIAPAIQgBAGgDAHIgGALIgFAFIgBAEQgCACgEAAQgDAAgCgCg");
	this.shape_18.setTransform(1139.4986,360.7586);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#936442").s().p("AADAwQgFgJgEgDQgQgbgDgZQAFgHgBgMIAAgTIAPAAQAGAHAAAOQAAAQACAFIADAKIAEAIQABAFAJANQAGAKABAIQgBALgJACQgHAAgGgHg");
	this.shape_19.setTransform(1125.5743,359.2087);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C76B28").s().p("AguA+IABg1QAGgDAEgHIAGgOQAPgcAjgTQAJAAAHAGIAKANQAAAEgCADQgYAPgUAZQgKANgYAlIgFAGQgCADgDAAIgDgBg");
	this.shape_20.setTransform(1122.7744,369.0539);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CB702A").s().p("AAgA2QgNgagXgXQgQgPgegXQgCgGAHgKIALgIQAGgEAHACIAFAGQACAEACAAQAiAJAVApQABABAGAFIABAlQgDADgBAFIgCAIIgEABQgGAAgDgHg");
	this.shape_21.setTransform(1141.8525,369.2702);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#87451B").s().p("AhKggQAVggAkgHIAIAAIAbAAQAqAHAVApQAaAvgOAnQAAg9gogiQgWgUgfAAQggAAgWAVQgiAfAAAiQAIAMAAAIQAAAKgNAIQgOg3Ahgxg");
	this.shape_22.setTransform(1132.3219,350.3091);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#954C1E").s().p("AgNCkIgMgBQgTgBgDgQQgHgbgBghQAAgVACgnQABgGAHgJIABgzQAGgHAFgLIAIgTQAIgSABgaIAAgsQAGAKgBAQIAAAbQAKAIgCARQgBAUACAGQABAQgDAKQgLAwALA2QAAAIACAPQACAcAEAGQAEAFAaAHIAOAJQAIAGAAAJQgCAEgHABIgVgCQgMgBgIADIgHABIgMgCg");
	this.shape_23.setTransform(1119.3454,381.3077);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#64311B").s().p("ABMBMIgJgEIgGgDQg/gnhBgFIgLAAQgIAAgGgGQgCggAVgbQAVgcAggGQAigHAeASQAfASALAjQAMAjgHAWQAAAUgFAIQgDACgDAAIgEgBg");
	this.shape_24.setTransform(1132.5331,351.851);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#87451B").s().p("AgPhUQgGgMAAgSIAAgdIAAgeIAMAAIAbABIABDdQADAjAAAPQAAAcgIAWQgEAMgDAFQgGAIgKAAg");
	this.shape_25.setTransform(1115.7747,359.7794);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#4E3952").s().p("AgbAKIAAgTIAEgKQADgFAHAAIAbACIAKAWQAEANAAALIgrABQgKgEgCgLg");
	this.shape_26.setTransform(1148.3982,376.2079);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#52373D").s().p("AgCCvQgVgkAWgkIAAhOIACgeQADgTgCgLQgFgHAAgQIAAhcQAAgRAGgHIAKAAIAAFdg");
	this.shape_27.setTransform(1159.5599,354.8589);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#39222A").s().p("AgKCvQgFgFgCgHIAAgOIABiiQABgYgBgqIgBhCIABgPQABgJAFgFIAXAAIgBA4QAAAhACAXQAEAuAABIIAAB3g");
	this.shape_28.setTransform(1161.9001,354.8589);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#C16226").s().p("ACFCMQgJgPgWgRQgdgWgFgGIgCgHIABgHIADgJQAEgIAGgQQACgEABgJIACgNQAMgxgdgmQgdgmgvACQgYABgVAQQgWAQgHAXQgIAYgCAOQgCAVAIARQAAAIAHATQAGARgBALIgdAfQgTATgHAPQgCAGgFACQgGACgGgHIgDgaQgCgRgEgKQgBhSAAiIIAfACIAyAEQAWABAsAAIBZAAQAgAAAPgDQAXgEALgMQAAAsgCA9IgFCCIACAXQAAAOgEAJQgDAGgFACIgCAAQgEAAgDgFg");
	this.shape_29.setTransform(1132.5087,355.704);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#50373D").s().p("AgEMHQgGgHAGgHIAAkWQAChDgCgsQgGgJAGgFIAAgOQgNgNAFgSIABgJQgBgFACgNQAFgegBgwIgBhNQACgvgCgvQgFg4AEhJQACgRgBgMIgCgMIgCgMIACgVQgBghACg+QAChAAAgfQgBgYgCgJIAAg1QgBgiACgUIABgNIAAgSQgDgPABgfQABgJgBgXQgBgUACgNIABgUIgBgWQgDgfADgsIgBgbQAAgQAJgJIAOgBIAAY+QAAAMgDACQgCADgNACg");
	this.shape_30.setTransform(1159.4263,460.929);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#52383E").s().p("AgVCVIAAgrQACgsgEhOQgDhYAAgjQAAgOABgEQACgLAHgGIAhAAIABAKQAKALgCANQgBAPACAdQABAagKARIAAAJQAAAGADADIABCKQgCAzACAVIghAAQgKgJAAgRg");
	this.shape_31.setTransform(1164.9456,354.8589);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#44334C").s().p("AAGAuQgNgGgbgEQgdgDgMgFQgLgPgDgJQgGgOAGgOQAIgIALABQAvABAbgNIARgBQAKgCAUACQAUgFANAMQAJAAAAAIIAAA9QAAAIgJAAIg/AAQgIAGgGAAIgBAAg");
	this.shape_32.setTransform(1158.7853,376.0982);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#39222A").s().p("AgeU+QgPAAAFgNQAFgQAAgYIABgpQACgqABhQQAAhTACgnQACgdAAhAQAAg9ADghQADgigBhFQAAhEADgjQACgfAAg/QAAg/ACggQADghABhsIADgEQAHgFAAgJIAAgOQgBidACkaIABm5QgBjgABnAIgBgQQAAgKAFgGQARgNAOANIgBFzQgBDbAECXQADCFAADOIAAFTIACFTQAADBgDCSQgDBkABC+QAADEgCBeg");
	this.shape_33.setTransform(1160.0883,513.6327);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#44334C").s().p("AASAwIgSgBQgKAAgIgHQgNgIgTAAQgXACgLAAIgIAAIgCAAIACgKQAGgQABgHQACgJgBgVIAAgGQARgCANADQAUADASgMQAHgFAIAAIAHABQAEABAGAFIA7AAQAJgEAFAEQAFADAAAJQACAqgIAZIgOACQgMAMgUgEIgMABIgDAAIgJgBg");
	this.shape_34.setTransform(1159.2552,333.3661);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#51383E").s().p("ABrIXIjUAAIgMAAQgHAAgCgIIAEgQQADgUARACQAOACABgQIABhGQAAgrgBgbQgHgHgBgKQADgqAAhfQgBhaAFgwQACgYAAgjIgBg8IAAg5QgBgjACgXQAIgYgBgkQgDgogBgUQAEgLgCgUQgCgVACgKIAAgWQgBgWADgnQADgqgBgTQAAgJAIgIQAMgJAPAJQAIAJAAAUIgECVQgBBcgEA6IAAAJQABA+gCBeIgFCaIgCB5QAABHgEAyIgBBIQgBAsgDAbQgBALAGAFQAEACALABIAXAAQANACAHAIIB8AAQgEAEgFABIgLgBg");
	this.shape_35.setTransform(1163.3975,594.804);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#51383E").s().p("Ag5U+QgHgGgBgKIgBgSIgBjuQAAiOAChhQAEiLAAjUIAAlfIACkrQAAiqgDiCQgDigAAj7IgBmbIAAgXQACgNAGgIQASgPATANQAHAHABAMIABAUQABA6gDB1QgCB0ABA6QABAjAFATQAEAsgEAjQAEA7gEAvQACAnAAA5IAABgQAAAOgJAKQgDAtACBZIAAB2IAAAOQAAAIAEAGQgEAHAAAJIABARQACATABAcIAAAvQAHAMgGAHQgCA8ACBdQgCAjABA3IABBaQgBARAPAAQAGAAAEAFQAGAFACAKIACAQQAEARAAAYIgBApQAAAMgKAKIAAATQAHAGACAKIABATIAAAtQgBAcAFARQABAIAAAGQgCBGAECNQAECNgBBGQAAAPACAbQADAcAAAOQAAAagKAPQgCANACAVQAJAIAAAUIABA5QgBAZACAHQADARARAJQAFACgCAJQgBAEADAKQADAJgCAFQgfADgfAAQgfAAgfgDg");
	this.shape_36.setTransform(1169.3712,513.7068);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},371).wait(30));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Ramzor = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ramzor
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9FDED").s().p("AgTA0QgagQgLgeQgGgPACgSQACgMAGgWQAFAIABAMIADAVQAKAjAZAOQAYAPAjgKQAFgBACAAQADABABAFIgWAPQgOAIgPAAQgOAAgQgKg");
	this.shape.setTransform(1113.3983,380.932);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B4FAE5").s().p("Ag5BGQgbgeAFgcQAAgDgEgKIADgKIACgKQAHgoAhgWQAfgUAgALQAhAMAPAjQAKAVABAgQAAAggWAaQgUAZgaAEIgQACQghAAgYgbg");
	this.shape_1.setTransform(1114.525,378.7172);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D26D28").s().p("ABKAxIgDgQIgHgUQgEgLgHgGQgggjggAJQgwAOgMAvIgDANQgCAHgIACQgEgFAAgJIAAgOQACgCAAgFQAAgGACgCIABgJIAEgEIAAgFIAFgFIAAgFIAFgEIAAgFIAQgOQApggAuASIALAEIAYAYIAFAJIAFAFIAAAFIACAFIACAEIABAEIACAFQABAEABABIABAYQAAAPgFAJQgHgFgDgJg");
	this.shape_2.setTransform(1114.5521,373.2361);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E29234").s().p("AgHByQgbgCgbgYQgbgZgHgbIgCgOQgCgIgEgFQgFgIADgKIAWhDQAEgMAMgBIADAEIgCAIIgFALIgGATQgCAFAAAJQAAASAEAGQAEAIAAAMQADAdATAVQAUAVAcABQAYABATgNQAVgPAJgdIAHgbQAEgLAAgcQAAgIgCgEIgCgGQgBgHgCgDIgCgEIgIgNIgDgEIgBgCIgPgPQgDgFADgDQAagCAPAhQAsBeg7BGIgDAEQgmAcghAAIgGAAg");
	this.shape_3.setTransform(1114.3555,379.3759);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9C521F").s().p("AgqAKQABgGAIgFQAIgGACgFIAdAAQASAAALgDQAGgBACAIQgZAYgeAAQgOAAgQgGg");
	this.shape_4.setTransform(1124.35,393.3142);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DE8B31").s().p("Ag2CIIgFgGQgCgEgDAAQgRgEgKgRIgOgfQgUglAHglQAJgyARgcQAMgTAVgOQALgIAcgOQAIADAQgEQARgDAIADQA7AcAWAxQARApgJA5QgEAYgOANQgFAFgDAHQgJAcgVAGQgGACgGAKg");
	this.shape_5.setTransform(1114.5276,377.8625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#AB8B5F").s().p("AgNAAIANgIIAFgGIAAABQAIAAABAJIgIAKQgFAGgFADQAAgKgJgFg");
	this.shape_6.setTransform(1119.075,358.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BCA473").s().p("AgIABQgKgEgBgDIAJAAQADgCAHAAQAGAAADgDQARgBgIAPIgEAFIgOAEQAAgHgIgEg");
	this.shape_7.setTransform(1116.7898,359.597);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C8B884").s().p("AAKAeQgLgDgUgLIgMgOQgGgIgCgJIgDgFIgCgJQAGgDAFAFQAHAGADAAQAbAbAYACQADADAMABQAIACgEANQgKAFgMAAIgNgCg");
	this.shape_8.setTransform(1112.164,358.1383);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A97449").s().p("AgcASIgEgEIgFgBQgEgEgLgFIAAgEIAFgPQAGgEAHABIAMAFQAXAGAPgEIAJgBQAFAAAEADQAFAJAOAAIgKAJQgPAHgUACIgPABIgVgBg");
	this.shape_9.setTransform(1114.75,361.3546);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#AC5821").s().p("AgUADQAUgKAVAKg");
	this.shape_10.setTransform(1103.975,393.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#AC5821").s().p("AADAJIgJAAQgLAIgIgJQgHgEgMABQgPAAgFgBQgBgEgJgEQgJgEAAgGICnAAQADAKgIAEIgOAIIgmACQgGAFgGAAQgGAAgGgGg");
	this.shape_11.setTransform(1113.5909,393.5131);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#986944").s().p("AgCAOIgFgDQgDgDgBgDIATgTIAEABIgGAOQgDAJgEAFg");
	this.shape_12.setTransform(1120.775,356.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#B7A070").s().p("AABAaIgIgHQgFgKABgNQABgQAAgIIAIAAQgBAOAEAOQADAKAJARQgDACgDAAQgDAAgDgDg");
	this.shape_13.setTransform(1108.2977,353.2139);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8C5F3F").s().p("Ag4AMQgKgRgCgKQgEgQAHgPQBHAABAAvQgHARgGADIgJAKQgCACgEACIgHAEIgGABQgFABgOAFIgKABQghgEgXgfg");
	this.shape_14.setTransform(1114.5523,354.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#D0772C").s().p("ABDCbQgoAChOgBQgbAAgRgJIgfgBQgPAAgBgQIgBg3QgFg1AFg0IAAgYQAIgSAPgVIAbglQATgXAWgCQAPgEAAAOIgNAKQgIAFgHACQgKAEgEAIQgLASgOALQgEAEAAACIgUAvQgJAcACAWIABATIABATIAHAfQAGARALAKIADAEQAEATAPAFQAIADAXgBQAFgHALAAIBIgBQAKgBAGAJQAmAGAQgkQADgFAIgJQAIgJACgGQAOgeAAgYQAEAWgBAtIAAAOQAAAIAEAFIABAUQAEAJgLACIgjACIgMABQgOAAgKgCg");
	this.shape_15.setTransform(1114.7052,377.3186);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#D67F2F").s().p("AAzCVQgHgIAEgGIALgKQAxgsAFg8QAEg9gugvQgegfglAAQgkAAghAdQgpAlgFA6QgFA6AhAuQADAEAOAMQAIAGACADQADAGgEAHQgUAGgMgEQgKgEgMgRQg7hVAvhvQALgbAUgVQAWgWAcgJIAIgCIAMAAQAgACAOgEQANgEAHAHQAXAHAbAaQAMALAMAUIAVAgIABASQAAAKAEAHIABADQgDA7ADBQIgBAAQgKgCgCgIQgBgDAAgNQAAgHADgRQgIAbgVAbQgMAPgMAFQgGACgHAAQgIAAgJgDg");
	this.shape_16.setTransform(1114.7204,377.0338);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#986944").s().p("AgTAKQgBgFADgFIAJgKQAGgGAFgCIADACQABAMANACIAAADIgTAPQgEADgEAAQgIAAgEgJg");
	this.shape_17.setTransform(1119.9214,359.6705);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#8C5F3F").s().p("AgKAUQgDgDgDgJIAGgQQAFgJAHgEIAPAIQgBAGgDAHIgGALIgFAFIgBAEQgCACgEAAQgDAAgCgCg");
	this.shape_18.setTransform(1121.75,357.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#936442").s().p("AADAwQgFgJgEgDQgQgbgDgZQAFgHgBgMIAAgTIAPAAQAGAHAAAOQAAAQACAFIADAKIAEAIQABAFAJANQAGAKABAIQgBALgJACQgHAAgGgHg");
	this.shape_19.setTransform(1107.825,355.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C76B28").s().p("AguA+IABg1QAGgDAEgHIAGgOQAPgcAjgTQAJAAAHAGIAKANQAAAEgCADQgYAPgUAZQgKANgYAlIgFAGQgCADgDAAIgDgBg");
	this.shape_20.setTransform(1105.025,365.6207);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CB702A").s().p("AAgA2QgNgagXgXQgQgPgegXQgCgGAHgKIALgIQAGgEAHACIAFAGQACAEACAAQAiAJAVApQABABAGAFIABAlQgDADgBAFIgCAIIgEABQgGAAgDgHg");
	this.shape_21.setTransform(1124.1039,365.837);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#87451B").s().p("AhKggQAVggAkgHIAIAAIAbAAQAqAHAVApQAaAvgOAnQAAg9gogiQgWgUgfAAQggAAgWAVQgiAfAAAiQAIAMAAAIQAAAKgNAIQgOg3Ahgxg");
	this.shape_22.setTransform(1114.5729,346.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#954C1E").s().p("AgNCkIgMgBQgTgBgDgQQgHgbgBghQAAgVACgnQABgGAHgJIABgzQAGgHAFgLIAIgTQAIgSABgaIAAgsQAGAKgBAQIAAAbQAKAIgCARQgBAUACAGQABAQgDAKQgLAwALA2QAAAIACAPQACAcAEAGQAEAFAaAHIAOAJQAIAGAAAJQgCAEgHABIgVgCQgMgBgIADIgHABIgMgCg");
	this.shape_23.setTransform(1101.5958,377.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#64311B").s().p("ABMBMIgJgEIgGgDQg/gnhBgFIgLAAQgIAAgGgGQgCggAVgbQAVgcAggGQAigHAeASQAfASALAjQAMAjgHAWQAAAUgFAIQgDACgDAAIgEgBg");
	this.shape_24.setTransform(1114.7842,348.417);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#87451B").s().p("AgPhUQgGgMAAgSIAAgdIAAgeIAMAAIAbABIABDdQADAjAAAPQAAAcgIAWQgEAMgDAFQgGAIgKAAg");
	this.shape_25.setTransform(1098.025,356.3458);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#4E3952").s().p("AgbAKIAAgTIAEgKQADgFAHAAIAbACIAKAWQAEANAAALIgrABQgKgEgCgLg");
	this.shape_26.setTransform(1130.65,372.775);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#52373D").s().p("AgCCvQgVgkAWgkIAAhOIACgeQADgTgCgLQgFgHAAgQIAAhcQAAgRAGgHIAKAAIAAFdg");
	this.shape_27.setTransform(1141.8122,351.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#39222A").s().p("AgKCvQgFgFgCgHIAAgOIABiiQABgYgBgqIgBhCIABgPQABgJAFgFIAXAAIgBA4QAAAhACAXQAEAuAABIIAAB3g");
	this.shape_28.setTransform(1144.1525,351.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#C16226").s().p("ACFCMQgJgPgWgRQgdgWgFgGIgCgHIABgHIADgJQAEgIAGgQQACgEABgJIACgNQAMgxgdgmQgdgmgvACQgYABgVAQQgWAQgHAXQgIAYgCAOQgCAVAIARQAAAIAHATQAGARgBALIgdAfQgTATgHAPQgCAGgFACQgGACgGgHIgDgaQgCgRgEgKQgBhSAAiIIAfACIAyAEQAWABAsAAIBZAAQAgAAAPgDQAXgEALgMQAAAsgCA9IgFCCIACAXQAAAOgEAJQgDAGgFACIgCAAQgEAAgDgFg");
	this.shape_29.setTransform(1114.7597,352.2702);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#50373D").s().p("AgEMHQgGgHAGgHIAAkWQAChDgCgsQgGgJAGgFIAAgOQgNgNAFgSIABgJQgBgFACgNQAFgegBgwIgBhNQACgvgCgvQgFg4AEhJQACgRgBgMIgCgMIgCgMIACgVQgBghACg+QAChAAAgfQgBgYgCgJIAAg1QgBgiACgUIABgNIAAgSQgDgPABgfQABgJgBgXQgBgUACgNIABgUIgBgWQgDgfADgsIgBgbQAAgQAJgJIAOgBIAAY+QAAAMgDACQgCADgNACg");
	this.shape_30.setTransform(1141.6786,457.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#52383E").s().p("AgVCVIAAgrQACgsgEhOQgDhYAAgjQAAgOABgEQACgLAHgGIAhAAIABAKQAKALgCANQgBAPACAdQABAagKARIAAAJQAAAGADADIABCKQgCAzACAVIghAAQgKgJAAgRg");
	this.shape_31.setTransform(1147.1981,351.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#44334C").s().p("AAGAuQgNgGgbgEQgdgDgMgFQgLgPgDgJQgGgOAGgOQAIgIALABQAvABAbgNIARgBQAKgCAUACQAUgFANAMQAJAAAAAIIAAA9QAAAIgJAAIg/AAQgIAGgGAAIgBAAg");
	this.shape_32.setTransform(1141.0375,372.6653);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#39222A").s().p("AgeU+QgPAAAFgNQAFgQAAgYIABgpQACgqABhQQAAhTACgnQACgdAAhAQAAg9ADghQADgigBhFQAAhEADgjQACgfAAg/QAAg/ACggQADghABhsIADgEQAHgFAAgJIAAgOQgBidACkaIABm5QgBjgABnAIgBgQQAAgKAFgGQARgNAOANIgBFzQgBDbAECXQADCFAADOIAAFTIACFTQAADBgDCSQgDBkABC+QAADEgCBeg");
	this.shape_33.setTransform(1142.3406,510.2061);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#44334C").s().p("AASAwIgSgBQgKAAgIgHQgNgIgTAAQgXACgLAAIgIAAIgCAAIACgKQAGgQABgHQACgJgBgVIAAgGQARgCANADQAUADASgMQAHgFAIAAIAHABQAEABAGAFIA7AAQAJgEAFAEQAFADAAAJQACAqgIAZIgOACQgMAMgUgEIgMABIgDAAIgJgBg");
	this.shape_34.setTransform(1141.5075,329.9313);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#51383E").s().p("ABrIXIjUAAIgMAAQgHAAgCgIIAEgQQADgUARACQAOACABgQIABhGQAAgrgBgbQgHgHgBgKQADgqAAhfQgBhaAFgwQACgYAAgjIgBg8IAAg5QgBgjACgXQAIgYgBgkQgDgogBgUQAEgLgCgUQgCgVACgKIAAgWQgBgWADgnQADgqgBgTQAAgJAIgIQAMgJAPAJQAIAJAAAUIgECVQgBBcgEA6IAAAJQABA+gCBeIgFCaIgCB5QAABHgEAyIgBBIQgBAsgDAbQgBALAGAFQAEACALABIAXAAQANACAHAIIB8AAQgEAEgFABIgLgBg");
	this.shape_35.setTransform(1145.65,591.3811);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#51383E").s().p("Ag5U+QgHgGgBgKIgBgSIgBjuQAAiOAChhQAEiLAAjUIAAlfIACkrQAAiqgDiCQgDigAAj7IgBmbIAAgXQACgNAGgIQASgPATANQAHAHABAMIABAUQABA6gDB1QgCB0ABA6QABAjAFATQAEAsgEAjQAEA7gEAvQACAnAAA5IAABgQAAAOgJAKQgDAtACBZIAAB2IAAAOQAAAIAEAGQgEAHAAAJIABARQACATABAcIAAAvQAHAMgGAHQgCA8ACBdQgCAjABA3IABBaQgBARAPAAQAGAAAEAFQAGAFACAKIACAQQAEARAAAYIgBApQAAAMgKAKIAAATQAHAGACAKIABATIAAAtQgBAcAFARQABAIAAAGQgCBGAECNQAECNgBBGQAAAPACAbQADAcAAAOQAAAagKAPQgCANACAVQAJAIAAAUIABA5QgBAZACAHQADARARAJQAFACgCAJQgBAEADAKQADAJgCAFQgfADgfAAQgfAAgfgDg");
	this.shape_36.setTransform(1151.624,510.2802);

	this.instance = new lib.MDALOGONEWpngcopy();
	this.instance.setTransform(1014,33,0.1289,0.1299);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},175).to({state:[{t:this.instance}]},40).to({state:[]},156).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.secondmanupDeficopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF675C").s().p("AmUKgQgvg5guhYQEXpXCWn+QAOgmAFgTQAKgiAFgWQBAg5A7gUQBJgaBKARIAhACQATADACAMQALA4AyAbQAdAPBCAUQAJADAUAFQAPAGAIAMQkDLUj1FAQj2FBgJAKQgKALgMAXQhahNgfgog");
	this.shape.setTransform(1071.45,430.939);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FACB94").s().p("AkbFCQgngBgPgGQgbgLgDgfQgKg0ABgaQABgsAjgZIAogdQAXgPAWgEICQhdQAXiLEsioQA6BgA3AeQA3AegDBKQjfFHgfATQgZAPgnAMQiJAqihAAIgsgBg");
	this.shape_1.setTransform(1019.5862,515.895,1,1,0,90,-90);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FACB94").s().p("AkbFCQgngBgPgGQgbgLgDgfQgKg0ABgaQABgsAjgZIAogdQAXgPAWgEICQhdQAXiLEsioQA6BgA3AeQA3AegDBKQjfFHgfATQgZAPgnAMQiJAqihAAIgsgBg");
	this.shape_2.setTransform(1411.945,587.7138,1,1,0,0,180);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B4855B").s().p("AgYADIAYgXQAMAHAIAIQAJAKgHAIQgGAIgJAAQgNAAgSgSg");
	this.shape_3.setTransform(1130.9887,131.6481,1,1,0,0,180);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BE8E63").s().p("AgSgEQACgaAQgRIATAVQABAUgHAOQgJATgWAVQgBgmABgOg");
	this.shape_4.setTransform(1249.3938,126.325,1,1,0,0,180);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A97952").s().p("AgSgIQABgeARgYIATAAIgaB9QgMguABgZg");
	this.shape_5.setTransform(1113.5288,146,1,1,0,0,180);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A0714B").s().p("AgTA6QAAgpABgTQACglASgWIARgBQAEAYgKAlQgNArAAAQQgFAFgFAAQgEAAgFgFg");
	this.shape_6.setTransform(1111.5532,133.9,1,1,0,0,180);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#AD7D56").s().p("AgSBrQgGgFAGgPIAFjDQAMAGAEAWQAGAWAMAGQAFAegMAyQgOA4ABAYIgKABQgHAAgCgCg");
	this.shape_7.setTransform(1247.5535,112.8143,1,1,0,0,180);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#64605C").s().p("AgFBBQgcgEgQgSQgPgRgBgbQgCgaAYgUQAXgTAbACQAaACARATQARATgBAZQgBAcgWATQgTARgWAAIgHAAg");
	this.shape_8.setTransform(1215.9267,134.1869,1,1,0,0,180);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#66625C").s().p("AgqAzQgSgQgCgdQgDgdASgUQARgVAdgBQAcgBATAUQATAUgCAdQgBAdgRARQgQARgbAAIgCAAQgZAAgRgPg");
	this.shape_9.setTransform(1155.2851,144.4502,1,1,0,0,180);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8C5C3B").s().p("AB2BZIjJhSQgggMgMgJQgXgRAOglQALggAlARQBSAlApAZQBBAmAqAwQAEAZgSAAIgKgBg");
	this.shape_10.setTransform(1145.2599,123.0415,1,1,0,0,180);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8E5E3D").s().p("AifAqQAygqBKgUQAbgIBrgSQAzgJAJAtQAFAYgPALQgJAHgbAEQhJAMhOAAQg6AAg/gGg");
	this.shape_11.setTransform(1221.5125,110.8906,1,1,0,0,180);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#D4AC7E").s().p("Ag3BjQhwgGhLicQB2AyB8gOQBpgLCJg9Qg8BohDAvQhBAwhVAAIgUgBg");
	this.shape_12.setTransform(1184.9,237.7558,1,1,0,0,180);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFEFD").s().p("AgSBrQhFgPgkgaQgxgkgOhFQA9gIBDgRQAvgMBIgWQAqgNAVABQAkACASAgQAQAegLAhQgIAXgaAgQgiAogqARQgcAMgdAAQgQAAgSgEg");
	this.shape_13.setTransform(1186.0638,186.3647,1,1,0,0,180);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFEFE").s().p("Ag7DlQgSAAgngyIhoiEQAHgVAWgNIAogRQCXhFAoibIBdAsQA4AaAgAaQhOCziLCKQgrAsgTAAIgBAAg");
	this.shape_14.setTransform(1163.175,258.8761,1,1,0,0,180);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FE7A67").s().p("AgUAPIADgVQASgIAFgBQANgCACAPQACASgQAAQgTgDgIACg");
	this.shape_15.setTransform(1332.7139,388.2129,1,1,0,0,180);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFEFE").s().p("AALC/QiYiThGiwQAggbA4gaIBdgsQAKBGAxA6QAiAnBJA0QAOAJAdAMQAZAOAJAVIhjCJQghAugOABIgBAAQgPAAgogng");
	this.shape_16.setTransform(1208.55,258.9762,1,1,0,0,180);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FACB94").s().p("ADaBzQgSgygNgWQgQgcgPgHQgRgIgdANQhgAqhWgFQg8gEg9AmQgvAegRAGQgpAPgrgSQAphSAuguQA3g4BKgTQBIgTAigFQAkgFBJgIQA+gLAmgiQADAjAdAjIAyA6IBGBcQgHAcgXAhIgmA4QgkgNgUgpg");
	this.shape_17.setTransform(1405.125,566.725,1,1,0,0,180);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF675C").s().p("AmsKuQgvg6AChKQDnplCXn+QANglAFgUQAKghAFgXQBAg4A7gUQBJgaBLARIAgACQATACACANQALA4AyAaQAdAQBCATQAJAEAUAFQAQAFAHAMQkCLUnhJbIgZAfQgPAQgQAIQhMgygfgng");
	this.shape_18.setTransform(1338.7063,494.439,1,1,0,0,180);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF675C").s().p("AtbKrQANkcgTAbQgOAUgiDOQhLHZigkDQAGi1hYAOQhYAPi3BnICtqUQAEgJABgHQAtjSAaigQAhjIAQiuQAOilBhhoQBVhbCOgoIAZgHQBogZCbgZIEEgoQAlAhArBJQAwBQAbAdIAfAmQAUAZAMANQAeAeAZgCQAZgBAYgkQAZgqAQgTQAbghAigIIAUgBQAdgCAUAXQAMANASAeQBBBNAZAAQAaAABChQQBShiAphQQAPgdAGgJQAPgTAWgFQCJAPCkAkIAAAAIACAAQAbAGAlARIAAAAQBhAnBABFQBhBoAOClQAPCuAiDIQAaCgAtDSQABAHAEAJICtKUQi3hnhZgPQhYgOAHC1QiKDghMlDQgbBKghBNQiAEokwhcQkwhdn9BlQhWARhHAAQleAAASmig");
	this.shape_19.setTransform(1197.6,355.7129,1,1,0,0,180);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF675C").s().p("Ak9SQQk2ghlNiAQgjgPgGgiIAAg/IAMvEIAEk0QA3gFBKAKQArAGBUAPQGEA6GqiiQHcizEonqIApg4QAMACAFATQAGATAKADIAJCaQAGBaACBAIANHzQAIEsAIDFQAFBwAHD8QAGDsAGCAQACAmgKAUQgLAXggALQizA+h3AhQilAviNAVQjUAfjGAAQiBAAh8gNg");
	this.shape_20.setTransform(1184.6958,473.5102,1,1,0,0,180);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#825233").s().p("AJfIwQgJgcgdgLQgkgIgQgGQkhhcjpiCQhwg/hNg6QhhhHhDhSQgTgVgPgFQgTgHgXAOQh7BMhDBKQhVBggZB4QgdAEABgZQABgfgHgEIgGgBIgCh4QgBhHAEgwQAOikBEh0QBJh/CPhNICBhIQBMgoA7gUQFwgvErC9QDJB/BPDOQBODNhFDdQgOAugfA2QgJAQgyBMIgRAUQgEAFgFAAQgEAAgEgEg");
	this.shape_21.setTransform(1172.0335,71.7281,1,1,0,0,180);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FACB94").s().p("AhHPUQh9g3hUhqQgdgkgIgVQgMgiATgiQAIgegOgVQgKgQgfgTQkDilhelDQghhuAZiRQANhQgEgmQgIg+gwgvQhAg/AYiIQAQhWBkABIAMALQAOAigEAxIgGA7IACgUQAGgrgBgdQALhuBjh9QBjh8BjgfQA8gTAoAqQCdClDmB7QCpBaEUBjQAYAIAzAPQAoASAJArQgDATgJAmQgGAjAAAYQgKAegFAYQAFgXAKgYQAAgvAShBQAHgbAVgBQBEAmAOAmQANAngdBEQgkBRhWA7QgPAdgIAqQgEAVgFAzQgRCdheCGQhMBsiPBwQgkAdgQAXQgWAfABAmQgTBrhSBKQg5Azh2A5QgIADgHAAQgHAAgIgCgAqtmqQgHAdgCARQAFgMADgUQACgUAEgJIACgSIgHAhg");
	this.shape_22.setTransform(1180.5404,166.5006,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.secondmanupDeficopy, new cjs.Rectangle(987.3,15.3,462.4000000000001,604.8000000000001), null);


(lib.secondmanupDefi = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF675C").s().p("AmUKgQgvg5guhYQEXpXCWn+QAOgmAFgTQAKgiAFgWQBAg5A7gUQBJgaBKARIAhACQATADACAMQALA4AyAbQAdAPBCAUQAJADAUAFQAPAGAIAMQkDLUj1FAQj2FBgJAKQgKALgMAXQhahNgfgog");
	this.shape.setTransform(1071.45,430.939);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FACB94").s().p("AkbFCQgngBgPgGQgbgLgDgfQgKg0ABgaQABgsAjgZIAogdQAXgPAWgEICQhdQAXiLEsioQA6BgA3AeQA3AegDBKQjfFHgfATQgZAPgnAMQiJAqihAAIgsgBg");
	this.shape_1.setTransform(1019.5862,515.895,1,1,0,90,-90);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FACB94").s().p("AkbFCQgngBgPgGQgbgLgDgfQgKg0ABgaQABgsAjgZIAogdQAXgPAWgEICQhdQAXiLEsioQA6BgA3AeQA3AegDBKQjfFHgfATQgZAPgnAMQiJAqihAAIgsgBg");
	this.shape_2.setTransform(1411.945,587.7138,1,1,0,0,180);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B4855B").s().p("AgYADIAYgXQAMAHAIAIQAJAKgHAIQgGAIgJAAQgNAAgSgSg");
	this.shape_3.setTransform(1130.9887,131.6481,1,1,0,0,180);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BE8E63").s().p("AgSgEQACgaAQgRIATAVQABAUgHAOQgJATgWAVQgBgmABgOg");
	this.shape_4.setTransform(1249.3938,126.325,1,1,0,0,180);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A97952").s().p("AgSgIQABgeARgYIATAAIgaB9QgMguABgZg");
	this.shape_5.setTransform(1113.5288,146,1,1,0,0,180);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A0714B").s().p("AgTA6QAAgpABgTQACglASgWIARgBQAEAYgKAlQgNArAAAQQgFAFgFAAQgEAAgFgFg");
	this.shape_6.setTransform(1111.5532,133.9,1,1,0,0,180);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#AD7D56").s().p("AgSBrQgGgFAGgPIAFjDQAMAGAEAWQAGAWAMAGQAFAegMAyQgOA4ABAYIgKABQgHAAgCgCg");
	this.shape_7.setTransform(1247.5535,112.8143,1,1,0,0,180);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#64605C").s().p("AgFBBQgcgEgQgSQgPgRgBgbQgCgaAYgUQAXgTAbACQAaACARATQARATgBAZQgBAcgWATQgTARgWAAIgHAAg");
	this.shape_8.setTransform(1215.9267,134.1869,1,1,0,0,180);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#66625C").s().p("AgqAzQgSgQgCgdQgDgdASgUQARgVAdgBQAcgBATAUQATAUgCAdQgBAdgRARQgQARgbAAIgCAAQgZAAgRgPg");
	this.shape_9.setTransform(1155.2851,144.4502,1,1,0,0,180);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8C5C3B").s().p("AB2BZIjJhSQgggMgMgJQgXgRAOglQALggAlARQBSAlApAZQBBAmAqAwQAEAZgSAAIgKgBg");
	this.shape_10.setTransform(1145.2599,123.0415,1,1,0,0,180);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8E5E3D").s().p("AifAqQAygqBKgUQAbgIBrgSQAzgJAJAtQAFAYgPALQgJAHgbAEQhJAMhOAAQg6AAg/gGg");
	this.shape_11.setTransform(1221.5125,110.8906,1,1,0,0,180);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#D4AC7E").s().p("Ag3BjQhwgGhLicQB2AyB8gOQBpgLCJg9Qg8BohDAvQhBAwhVAAIgUgBg");
	this.shape_12.setTransform(1184.9,237.7558,1,1,0,0,180);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFEFD").s().p("AgSBrQhFgPgkgaQgxgkgOhFQA9gIBDgRQAvgMBIgWQAqgNAVABQAkACASAgQAQAegLAhQgIAXgaAgQgiAogqARQgcAMgdAAQgQAAgSgEg");
	this.shape_13.setTransform(1186.0638,186.3647,1,1,0,0,180);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFEFE").s().p("Ag7DlQgSAAgngyIhoiEQAHgVAWgNIAogRQCXhFAoibIBdAsQA4AaAgAaQhOCziLCKQgrAsgTAAIgBAAg");
	this.shape_14.setTransform(1163.175,258.8761,1,1,0,0,180);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FE7A67").s().p("AgUAPIADgVQASgIAFgBQANgCACAPQACASgQAAQgTgDgIACg");
	this.shape_15.setTransform(1332.7139,388.2129,1,1,0,0,180);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFEFE").s().p("AALC/QiYiThGiwQAggbA4gaIBdgsQAKBGAxA6QAiAnBJA0QAOAJAdAMQAZAOAJAVIhjCJQghAugOABIgBAAQgPAAgogng");
	this.shape_16.setTransform(1208.55,258.9762,1,1,0,0,180);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FACB94").s().p("ADaBzQgSgygNgWQgQgcgPgHQgRgIgdANQhgAqhWgFQg8gEg9AmQgvAegRAGQgpAPgrgSQAphSAuguQA3g4BKgTQBIgTAigFQAkgFBJgIQA+gLAmgiQADAjAdAjIAyA6IBGBcQgHAcgXAhIgmA4QgkgNgUgpg");
	this.shape_17.setTransform(1405.125,566.725,1,1,0,0,180);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF675C").s().p("AmsKuQgvg6AChKQDnplCXn+QANglAFgUQAKghAFgXQBAg4A7gUQBJgaBLARIAgACQATACACANQALA4AyAaQAdAQBCATQAJAEAUAFQAQAFAHAMQkCLUnhJbIgZAfQgPAQgQAIQhMgygfgng");
	this.shape_18.setTransform(1338.7063,494.439,1,1,0,0,180);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF675C").s().p("AtbKrQANkcgTAbQgOAUgiDOQhLHZigkDQAGi1hYAOQhYAPi3BnICtqUQAEgJABgHQAtjSAaigQAhjIAQiuQAOilBhhoQBVhbCOgoIAZgHQBogZCbgZIEEgoQAlAhArBJQAwBQAbAdIAfAmQAUAZAMANQAeAeAZgCQAZgBAYgkQAZgqAQgTQAbghAigIIAUgBQAdgCAUAXQAMANASAeQBBBNAZAAQAaAABChQQBShiAphQQAPgdAGgJQAPgTAWgFQCJAPCkAkIAAAAIACAAQAbAGAlARIAAAAQBhAnBABFQBhBoAOClQAPCuAiDIQAaCgAtDSQABAHAEAJICtKUQi3hnhZgPQhYgOAHC1QiKDghMlDQgbBKghBNQiAEokwhcQkwhdn9BlQhWARhHAAQleAAASmig");
	this.shape_19.setTransform(1197.6,355.7129,1,1,0,0,180);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF675C").s().p("Ak9SQQk2ghlNiAQgjgPgGgiIAAg/IAMvEIAEk0QA3gFBKAKQArAGBUAPQGEA6GqiiQHcizEonqIApg4QAMACAFATQAGATAKADIAJCaQAGBaACBAIANHzQAIEsAIDFQAFBwAHD8QAGDsAGCAQACAmgKAUQgLAXggALQizA+h3AhQilAviNAVQjUAfjGAAQiBAAh8gNg");
	this.shape_20.setTransform(1184.6958,473.5102,1,1,0,0,180);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#825233").s().p("AJfIwQgJgcgdgLQgkgIgQgGQkhhcjpiCQhwg/hNg6QhhhHhDhSQgTgVgPgFQgTgHgXAOQh7BMhDBKQhVBggZB4QgdAEABgZQABgfgHgEIgGgBIgCh4QgBhHAEgwQAOikBEh0QBJh/CPhNICBhIQBMgoA7gUQFwgvErC9QDJB/BPDOQBODNhFDdQgOAugfA2QgJAQgyBMIgRAUQgEAFgFAAQgEAAgEgEg");
	this.shape_21.setTransform(1172.0335,71.7281,1,1,0,0,180);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FACB94").s().p("AhHPUQh9g3hUhqQgdgkgIgVQgMgiATgiQAIgegOgVQgKgQgfgTQkDilhelDQghhuAZiRQANhQgEgmQgIg+gwgvQhAg/AYiIQAQhWBkABIAMALQAOAigEAxIgGA7IACgUQAGgrgBgdQALhuBjh9QBjh8BjgfQA8gTAoAqQCdClDmB7QCpBaEUBjQAYAIAzAPQAoASAJArQgDATgJAmQgGAjAAAYQgKAegFAYQAFgXAKgYQAAgvAShBQAHgbAVgBQBEAmAOAmQANAngdBEQgkBRhWA7QgPAdgIAqQgEAVgFAzQgRCdheCGQhMBsiPBwQgkAdgQAXQgWAfABAmQgTBrhSBKQg5Azh2A5QgIADgHAAQgHAAgIgCgAqtmqQgHAdgCARQAFgMADgUQACgUAEgJIACgSIgHAhg");
	this.shape_22.setTransform(1180.5404,166.5006,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.secondmanupDefi, new cjs.Rectangle(987.3,15.3,462.4000000000001,604.8000000000001), null);


(lib.lipsMokdanit = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FEFEFE").s().p("AhVArQhkgUh+ggIgNgEQgHgEgCgIIDcAAQDRABDBgfQAKgBANABIAWABQgeA2g6AaQgtAUhGAGQgsAEgnAAQhJAAg8gNg");
	this.shape.setTransform(38.2,-9.3496);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E16C59").s().p("AkiAlQgegDgNgGIgggCQA/gSBNgMQA2gJBXgKQCTgUBOgBQB9gCBkAhIgSACQgKACgEAIQgdAQgqAGIhKAGQiNANhiADIhJACQhZAAhOgIg");
	this.shape_1.setTransform(38.225,-14.6987);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E16C59").s().p("AADCTQgxgOhcg7QgPgJgkgiQgegdgYgIIhviBQAqATBCAsQBKAzAhAQQA1AbAfAOQAvAVAoALQAvANAsgNQAngMAnghQAkgdAtg5QA+hPAMgNQgjBmglA8QgyBRhLAqQgvAagyAAQgdAAgegJg");
	this.shape_2.setTransform(38.2,4.6647);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#953C2D").s().p("AgPCDQijhAiUhzQgYgUgHgEIgKgKQABgCgGgJQgEgHAJgEQAKgFAWAEQB1AeAiAIQBWAUBEAHQBeAKBOgJQB6gOA8hWQATgNAUAIIALAMIgVAoQgsBZhXBUQhFBDhSAAQgqAAgsgRg");
	this.shape_3.setTransform(38.486,-1.6084);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FEFEFE").s().p("AhcArQhigUh9gfIAAAAIAAgBIAAAAIAAgBIgCgBIAAgBIAAAAIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBgBIAAAAIgEgEIAAAAIAAgBIDOAAQDSABDAgfQAKgBANABIAWABQgeA2g6AaQgtAUhGAGQgsAEgnAAQhJAAg8gNg");
	this.shape_4.setTransform(38.875,-9.1996);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E16C59").s().p("AkrAlQgPgBgLgDIgDgDIgBAAIAAgBIgBgBIAAgBIgBgBIAAgBIgCgCIAAAAIgGgGIABAAIAAgBIABAAIABAAIAAAAIADAAIAAgBIADAAIAAAAIABAAIAAgBIABAAIAAAAIAAAAIABAAIAAAAIABgBQArgKAxgHQA2gJBXgKQCTgUBOgBQBygBBdAaIAAACIAAAAIAAACIABAAIAAACIAAABIAAABIgBAAQgKACgEAIQgdAQgqAGIhKAGQiNANhiADIhJACQhZAAhOgIg");
	this.shape_5.setTransform(39.125,-14.6987);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E16C59").s().p("AgFCPQgzgPhcg6QgOgJgkgjQgegbgYgJIgegiIAAgBIAAAAIgegjIAAAAIgBgBIAAAAIgCgDIAAAAIgBgBIAAAAIgBgBIAAgBIAAAAIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAAAIAAgBIgCgBIAAgBIAAAAIAAgBIgCgBIAAgBIgBgBIAAAAIgDgEIgBAAIAAgBIgBgBIAAgBIgBgBIAAgBIgCgCIAAAAIgGgGIABAAIAAgBIABAAIABAAIADAAIAAgBIADAAIAAAAIABAAIAAgBIABAAIAAAAIABAAIABgBIAAAAIABAAQAeASAoAaQBKAyAgARQA2AaAfAOQAvAVAoALQAvANArgNQAngLAogiQAkgdAsg4IBDhUIAAAAIAAACIABAAIAAACIAAABIAAAAIAAACIAAAAIAAABIAAABIAAABIAAABIgBAAIAAABIgBADIgBABIAAAAIgBABIAAABIAAABIAAABIgBABIAAACIAAAAIAAABIgBABIAAAAIAAABIAAABIgFAPIgBAAIAAAAIAAABIgBABIAAAAIgBABIAAABIAAABIAAABIgBABIAAABIgBABIAAABIgBAAIAAADIgIATIAAAAIAAAAIAAABIAAAAIAAABIgBAAIgBABIAAABIAAABIAAABIgBABIAAAAIgBABIAAAAIAAABIAAABIgBAAIAAABIAAABIAAAAIgBABIAAABIAAAAIAAABIgBAAIAAABIAAABIAAAAIgBABIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAABIgBABIAAABIAAABIAAABIgBAAIAAABIAAAAIgBABIAAABQgNAdgOAVQgzBRhLAqQguAbgyAAQgdAAgdgJg");
	this.shape_6.setTransform(39.125,-1.2978);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#953C2D").s().p("AgWCDQiIg1h8hYIAAAAIgCgBIAAgBIgBAAIAAgCIgGgHIAAgBIgFgHIAAgBIgBgBIgBAAIAAgBIgHgKIAAgBIgCgCIAAgBIgBgBIAAAAIgBgCIAAgBIAAgBIAAAAIgCgCIAAgBIAAgBIgCgCIAAgBIgBgBIAAAAIgCgEIAAAAIgBgBIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIAAAAIgCgDIAAAAIAAgBIAAgBIgBAAIAAgBIgCgCIAAgBIAAAAIAAgBIgCgCIAAgBIgBgBIAAgBIgDgEIAAgBIAAgBIgBgCIAAAAIgCgCIAAgBIgCgDIAAAAIgEgGQByAdAgAIQBWAUBEAHQBeAKBPgJQB5gOA9hWQALgIALAAIAAAAIAAABIAAACIAAABIAAABIAAABIAAABIAAABIAAAAIAAABIAAADIgBABIAAABIgCABIAAABIAAAAIAAACIgBABIAAACIAAABIAAACIgBABIAAACIgBABIAAACIAAAAIAAAEIgBABIAAACIAAAAIAAACIgBAAIAAABIAAABIAAABIgBABIAAAAIAAABIAAABIgBAAIAAABIAAABIAAABIgBACIAAABIgBACIAAAAIgBACIAAABIgBABIAAABIgBABIAAACIgBACIAAAAIgBABIAAAHIAAAAIAAABIgBABIAAABIAAABIAAAAIgBABIAAABIAAABIAAAAIAAABIAAABIgBABIAAABIAAAAIAAABIgBABIAAACIAAAAIAAABIAAAAIgBABIAAABIAAABIAAAAIgDADIAAABIAAABIAAABIgBAAIgBACIAAABIAAABIAAABIgBABIAAABIAAABIAAAAIgBABIAAABIAAABIAAABIgBABIAAABIAAAAIAAACIgBAAIAAABIAAABIAAABIgBABIAAAAIgBACIAAAAIgBABIAAABIAAABIAAAAIgBABIAAABIgBABIAAABQgkA0g1AzQhEBDhSAAQgqAAgsgRg");
	this.shape_7.setTransform(39.2,-4.9959,1,0.7441);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7,p:{scaleX:1,x:39.2,scaleY:0.7441,y:-4.9959}},{t:this.shape_6,p:{scaleX:1,x:39.125,scaleY:1,y:-1.2978}},{t:this.shape_5,p:{scaleX:1,x:39.125,scaleY:1,y:-14.6987}},{t:this.shape_4,p:{scaleX:1,x:38.875,y:-9.1996,scaleY:1}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.9426,x:39.1618,scaleY:0.7441,y:-4.9959}},{t:this.shape_6,p:{scaleX:0.9426,x:39.0911,scaleY:1,y:-1.2978}},{t:this.shape_5,p:{scaleX:0.9426,x:39.0911,scaleY:1,y:-14.6987}},{t:this.shape_4,p:{scaleX:0.9426,x:38.8554,y:-8.9996,scaleY:1}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.8706,x:39.1624,scaleY:0.7441,y:-4.9959}},{t:this.shape_6,p:{scaleX:0.8706,x:39.0971,scaleY:1,y:-1.2978}},{t:this.shape_5,p:{scaleX:0.8706,x:39.0971,scaleY:1,y:-14.6987}},{t:this.shape_4,p:{scaleX:0.8706,x:38.8795,y:-8.9996,scaleY:1}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.7735,x:39.1596,scaleY:0.7441,y:-4.9959}},{t:this.shape_6,p:{scaleX:0.7735,x:39.1015,scaleY:1,y:-1.2978}},{t:this.shape_5,p:{scaleX:0.7735,x:39.1015,scaleY:1,y:-14.6987}},{t:this.shape_4,p:{scaleX:0.7735,x:38.9082,y:-8.9996,scaleY:1}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.7044,x:39.1225,scaleY:0.7441,y:-4.9959}},{t:this.shape_6,p:{scaleX:0.7044,x:39.0697,scaleY:1,y:-1.2978}},{t:this.shape_5,p:{scaleX:0.7044,x:39.0697,scaleY:1,y:-14.6987}},{t:this.shape_4,p:{scaleX:0.7044,x:38.8936,y:-8.9996,scaleY:1}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.7044,x:39.1225,scaleY:0.6677,y:-4.737}},{t:this.shape_6,p:{scaleX:0.7044,x:39.0697,scaleY:0.8973,y:-1.439}},{t:this.shape_5,p:{scaleX:0.7044,x:39.0697,scaleY:0.8973,y:-13.4559}},{t:this.shape_4,p:{scaleX:0.7044,x:38.8936,y:-8.3563,scaleY:0.8973}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.7044,x:39.1225,scaleY:0.58,y:-4.4251}},{t:this.shape_6,p:{scaleX:0.7044,x:39.0697,scaleY:0.7794,y:-1.5966}},{t:this.shape_5,p:{scaleX:0.7044,x:39.0697,scaleY:0.7794,y:-12.0304}},{t:this.shape_4,p:{scaleX:0.7044,x:38.8936,y:-7.5611,scaleY:0.7794}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.7044,x:39.1225,scaleY:0.6676,y:-4.6873}},{t:this.shape_6,p:{scaleX:0.7044,x:39.0697,scaleY:0.8973,y:-1.389}},{t:this.shape_5,p:{scaleX:0.7044,x:39.0697,scaleY:0.8973,y:-13.4059}},{t:this.shape_4,p:{scaleX:0.7044,x:38.8936,y:-8.2563,scaleY:0.8973}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.766,x:39.1231,scaleY:0.6676,y:-4.6873}},{t:this.shape_6,p:{scaleX:0.766,x:39.0657,scaleY:0.8973,y:-1.389}},{t:this.shape_5,p:{scaleX:0.766,x:39.0657,scaleY:0.8973,y:-13.4059}},{t:this.shape_4,p:{scaleX:0.766,x:38.8742,y:-8.2563,scaleY:0.8973}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.8658,x:39.1296,scaleY:0.6676,y:-4.6873}},{t:this.shape_6,p:{scaleX:0.8658,x:39.0647,scaleY:0.8973,y:-1.389}},{t:this.shape_5,p:{scaleX:0.8658,x:39.0647,scaleY:0.8973,y:-13.4059}},{t:this.shape_4,p:{scaleX:0.8658,x:38.8483,y:-8.2563,scaleY:0.8973}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.8658,x:39.1296,scaleY:0.7553,y:-4.9994}},{t:this.shape_6,p:{scaleX:0.8658,x:39.0647,scaleY:1.0151,y:-1.2318}},{t:this.shape_5,p:{scaleX:0.8658,x:39.0647,scaleY:1.0151,y:-14.8315}},{t:this.shape_4,p:{scaleX:0.8658,x:38.8483,y:-9.0017,scaleY:1.0151}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.8658,x:39.1296,scaleY:0.6719,y:-4.7128}},{t:this.shape_6,p:{scaleX:0.8658,x:39.0647,scaleY:0.903,y:-1.351}},{t:this.shape_5,p:{scaleX:0.8658,x:39.0647,scaleY:0.903,y:-13.4806}},{t:this.shape_4,p:{scaleX:0.8658,x:38.8483,y:-8.3005,scaleY:0.903}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.7658,x:39.1162,scaleY:0.6719,y:-4.7128}},{t:this.shape_6,p:{scaleX:0.7658,x:39.0587,scaleY:0.903,y:-1.351}},{t:this.shape_5,p:{scaleX:0.7658,x:39.0587,scaleY:0.903,y:-13.4806}},{t:this.shape_4,p:{scaleX:0.7658,x:38.8673,y:-8.3005,scaleY:0.903}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.6894,x:39.0997,scaleY:0.6719,y:-4.7128}},{t:this.shape_6,p:{scaleX:0.6894,x:39.048,scaleY:0.903,y:-1.351}},{t:this.shape_5,p:{scaleX:0.6894,x:39.048,scaleY:0.903,y:-13.4806}},{t:this.shape_4,p:{scaleX:0.6894,x:38.8757,y:-8.3005,scaleY:0.903}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.7467,x:39.1368,scaleY:0.6719,y:-4.7128}},{t:this.shape_6,p:{scaleX:0.7467,x:39.0808,scaleY:0.903,y:-1.351}},{t:this.shape_5,p:{scaleX:0.7467,x:39.0808,scaleY:0.903,y:-13.4806}},{t:this.shape_4,p:{scaleX:0.7467,x:38.8941,y:-8.3005,scaleY:0.903}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.7467,x:39.1368,scaleY:0.7483,y:-4.9728}},{t:this.shape_6,p:{scaleX:0.7467,x:39.0808,scaleY:1.0056,y:-1.2113}},{t:this.shape_5,p:{scaleX:0.7467,x:39.0808,scaleY:1.0056,y:-14.7236}},{t:this.shape_4,p:{scaleX:0.7467,x:38.8941,y:-8.9944,scaleY:1.0056}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.804,x:39.1732,scaleY:0.7483,y:-4.9728}},{t:this.shape_6,p:{scaleX:0.804,x:39.1129,scaleY:1.0056,y:-1.2113}},{t:this.shape_5,p:{scaleX:0.804,x:39.1129,scaleY:1.0056,y:-14.7236}},{t:this.shape_4,p:{scaleX:0.804,x:38.9119,y:-8.9944,scaleY:1.0056}}]},1).to({state:[{t:this.shape_7,p:{scaleX:0.948,x:39.1679,scaleY:0.7483,y:-4.9728}},{t:this.shape_6,p:{scaleX:0.948,x:39.0968,scaleY:1.0056,y:-1.2113}},{t:this.shape_5,p:{scaleX:0.948,x:39.0968,scaleY:1.0056,y:-14.7236}},{t:this.shape_4,p:{scaleX:0.948,x:38.8598,y:-8.9944,scaleY:1.0056}}]},1).to({state:[{t:this.shape_7,p:{scaleX:1.0054,x:39.1549,scaleY:0.7483,y:-4.9728}},{t:this.shape_6,p:{scaleX:1.0054,x:39.0795,scaleY:1.0056,y:-1.2113}},{t:this.shape_5,p:{scaleX:1.0054,x:39.0795,scaleY:1.0056,y:-14.7236}},{t:this.shape_4,p:{scaleX:1.0054,x:38.8282,y:-8.9944,scaleY:1.0056}}]},1).to({state:[{t:this.shape_7,p:{scaleX:1.092,x:39.2085,scaleY:0.7483,y:-4.9728}},{t:this.shape_6,p:{scaleX:1.092,x:39.1266,scaleY:1.0056,y:-1.2113}},{t:this.shape_5,p:{scaleX:1.092,x:39.1266,scaleY:1.0056,y:-14.7236}},{t:this.shape_4,p:{scaleX:1.092,x:38.8536,y:-8.9944,scaleY:1.0056}}]},1).to({state:[{t:this.shape_7,p:{scaleX:1.092,x:39.2085,scaleY:0.8696,y:-5.3444}},{t:this.shape_6,p:{scaleX:1.092,x:39.1266,scaleY:1.1687,y:-1.0068}},{t:this.shape_5,p:{scaleX:1.092,x:39.1266,scaleY:1.1687,y:-16.6978}},{t:this.shape_4,p:{scaleX:1.092,x:38.8536,y:-10.0464,scaleY:1.1687}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.1,-21.9,75.2,42.2);


(lib.secondmanupDefiisueem = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FACB94").s().p("Ai4GaQgngCgPgGQgbgLgEgfQgJg0AAgZQACgjAVgXQAGgGAHgFIApgdQAXgQAWgEIAJgFIg2hSQhjgRhzieQgtg/gvhVQBfg6Afg3QAdg2BKACIBFAwQCeBsBEA1IAYgIQBIgTAigEQAkgGBKgHQA+gMAmgiQACAjAdAkIAzA6IBGBdQgIAbgWAiIgnA3IgBAAQhvCjg4BJQgnAzgLAHQgZAQgnALQiLArifAAIgsgBg");
	this.shape.setTransform(1071.35,563.3083);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FE7A67").s().p("AgUAPIADgVQASgIAFgBQANgCACAPQACASgQAAQgTgDgIACg");
	this.shape_1.setTransform(1160.4361,372.5629);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF675C").s().p("AggbCQA3hJBwijIABAAIAmg4QAXgiAHgbIhGhdIgyg6QgdgkgDgjQgmAig9AMQhJAHglAGQgiAEhIATIgYAIQhFg1idhsIhFgwQhKgCgeA2QgfA3hfA6QAvBVAtA/QBzCfBkARIA1BSIgJAFQgWAEgXAQIgoAdQgIAFgGAGQhOgRhUgYIhigdQhZgbhvgnQgggLgMgXQgKgUACgmQAHiAAGjsIAEimQgWgigXgkQg3g4gWhnQgpi/AEjEQAAgQACgQQAIh+gLgyQgah4gIh7QgQh7gTonQgDggADghQAPibA2iSQAyiIBDh/IAEgIIAEgHIABgCIAEgGIAAAAQAVglAegfQBAhFBhgnQAlgRAbgGIACAAIAAAAQCkgkCIgPQBOCzCLCKQAuAuASgBQASgBAogxIBoiFIAUABIBhCJQAhAuAOABQAPABAqgpQCYiSBHiyIEEAoQCbAZBnAZIAaAHQCOAoBVBbQBhBoAOClQAIBZAMBfIgBAEQAEAYABAaQAEDEgpDAQgFAXgHAUQgQCOgnCJIgCAVQgZDChFC3Qg4CUhyAgIACC5IAMPFIAAA/QgGAigiAPQlOCAk2AhQh7ANh/AAIgcAAgAzalwIAAAAIAAgCgAJRm8QAQAAgCgTQgCgOgNACQgFAAgTAIIgDAXIAJgBIATABg");
	this.shape_2.setTransform(1101.8407,418.6073);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFEFE").s().p("ACkDmQgOgBghguIhiiJQAIgVAZgOQAegMANgJQBKg0AignQAxg6AKhGIBdAsQA4AaAhAbQhHCwiYCTQgpAngPAAIgBAAgAjiC4QiLiKhOizQAggaA4gaIBLgkIASgIQApCbCYBFIAnARQAWANAIAVIhoCEQgoAygSAAIgBAAQgSAAgtgsg");
	this.shape_3.setTransform(1095.425,258.9762);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D4AC7E").s().p("AhzA0QhBgvg+hoQCKA9BoALQB9AOB2gyQhLCchxAGIgTABQhVAAhCgwg");
	this.shape_4.setTransform(1094.9,237.7558);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFEFD").s().p("AhIBjQgqgRgigoQgagggIgXQgLghAQgeQASggAkgCQAVgBAqANQBIAWAvAMQBDARA9AIQgOBFgxAkQgkAahFAPQgSAEgQAAQgdAAgcgMg");
	this.shape_5.setTransform(1096.0638,186.3647);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#66625C").s().p("AgBBCQgbAAgQgRQgRgRgBgdQgCgdATgUQATgUAcABQAdABARAVQASAUgDAdQgCAdgSAQQgRAPgaAAIgBAAg");
	this.shape_6.setTransform(1065.2851,144.4502);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#64605C").s().p("AgqAwQgWgTgBgcQgBgZARgTQARgTAagCQAbgCAXATQAYAUgCAaQgBAbgPARQgQASgcAEIgHAAQgWAAgTgRg");
	this.shape_7.setTransform(1125.9267,134.1869);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8C5C3B").s().p("AiNBBQAqgwBBgmQAogZBTglQAkgQAMAgQANAlgWAQQgNAJgfANIjJBRg");
	this.shape_8.setTransform(1055.3031,122.9693);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#B4855B").s().p("AgVANQgHgIAJgKQAIgIAMgHIAYAXQgSASgNAAQgJAAgGgIg");
	this.shape_9.setTransform(1040.9887,131.6481);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#A97952").s().p("AgSg+IASAAQASAYABAeQABAZgMAug");
	this.shape_10.setTransform(1023.5288,146);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#A0714B").s().p("AABA8QgBgQgMgrQgKgkAEgYIARABQASAWACAkQABATAAApg");
	this.shape_11.setTransform(1021.5532,133.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#8E5E3D").s().p("AhwAkQgbgEgJgHQgPgLAFgYQAJgtAzAJQBrASAbAIQBKAUAyAqQg/AGg6AAQhOAAhJgMg");
	this.shape_12.setTransform(1131.5125,110.8906);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#BE8E63").s().p("AgMAIQgHgOABgUIATgVQAQARACAaQABAOgBAmQgWgVgJgTg");
	this.shape_13.setTransform(1159.3938,126.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#AD7D56").s().p("AgLAcQgNgxAGgeQAMgGAFgWQAFgWALgHIAAAFIAGC/IgUAUQABgXgNg5g");
	this.shape_14.setTransform(1157.416,112.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FACB94").s().p("AAwPIQgIgUgWgNIgmgTQiYhFgpibIgSAJIgDgNQABgmgWgfQgQgXgkgdQiPhwhMhsQheiGgRidQgFgzgEgVQgIgqgPgdQhWg7gkhRQgdhEANgnQAOgmBEgmIARAUQgEAYALAlQANAsAAAQIAbB+QAMgugBgbQgBgdgSgYQABgpgBgVQgCgkgUgWQAJgcAdgLQAkgIAQgGQEhhcDqiCQBvg/BNg6QBhhHBDhSQATgWAPgFQATgHAXAOQB7BNBDBKQBVBgAZB4QgGAeANAzQAOA4gBAYQgBAUAHAPQAIATAXAVQABgmgBgPQgCgagPgRIgGjAIAGgFQBkgBAQBWQAYCIhAA/QgwAvgIA+QgEAmANBQQAZCRghBuQheFDkDClQgfATgKAQQgOAVAIAeQgKBHgxA5QgiAnhKA0QgNAJgeAOQgZANgIAWgAhHL7QBJA0BhgGQBxgGBKicQh1Axh9gNQhogLiKg9QA9BpBCAvgAhEBWQgjACgSAgQgRAdAMAiQAIAXAaAgQAhApAqARQArASAxgLQBEgOAkgbQAygjAOhGQg9gJhEgRQgugLhJgXQgmgLgWAAIgDAAgAkpkNQgTAUABAfQACAdAQAQQAQARAcAAQAbABARgPQASgQADgdQACgfgRgUQgSgVgdgBIgBAAQgcAAgSATgAFbmFQgaACgRATQgRASABAaQABAcAWAUQAWAUAbgEQAcgDAQgSQAPgRABgdQACgZgYgUQgVgSgYAAIgGABgAkGoIQhTAlgpAZQhBAngqAwQgOAHgHAIQgJALAGAIQARAWAfggIDKhSQAfgNANgJQAWgRgNglQgIgVgSAAQgKAAgMAGgAD7o5QgFAaAPALQAJAGAbAFQB+AVCTgQQgygqhKgVQgbgHhsgSIgQgCQgkAAgIAlg");
	this.shape_15.setTransform(1090.5404,166.7333);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#825233").s().p("ApvIxIgRgUQgyhMgJgQQgfg2gOguQhFjdBOjNQBPjODJh/QEri9FwAvQA7AUBMAoICBBIQCPBNBJB/QBEB0AOCkQAEAwgBBHIgCB4IgGABQgLAGgGAWQgFAWgMAGQgZh4hVhgQhDhKh7hMQgXgOgTAHQgPAFgTAVQhDBShhBHQhNA6hwA/QjpCCkhBcQgQAGgkAIQgdALgJAcIgRgBg");
	this.shape_16.setTransform(1082.0335,71.5149);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16,p:{y:71.5149}},{t:this.shape_15,p:{y:166.7333}},{t:this.shape_14,p:{y:112.75}},{t:this.shape_13,p:{y:126.325}},{t:this.shape_12,p:{y:110.8906}},{t:this.shape_11,p:{y:133.675}},{t:this.shape_10,p:{y:146}},{t:this.shape_9,p:{y:131.6481}},{t:this.shape_8,p:{y:122.9693}},{t:this.shape_7,p:{y:134.1869}},{t:this.shape_6,p:{y:144.4502}},{t:this.shape_5,p:{y:186.3647}},{t:this.shape_4,p:{y:237.7558}},{t:this.shape_3,p:{y:258.9762}},{t:this.shape_2,p:{y:418.6073}},{t:this.shape_1,p:{y:372.5629}},{t:this.shape,p:{y:563.3083}}]}).to({state:[{t:this.shape_16,p:{y:91.2149}},{t:this.shape_14,p:{y:132.45}},{t:this.shape_15,p:{y:186.4333}},{t:this.shape_13,p:{y:146.025}},{t:this.shape_12,p:{y:130.5906}},{t:this.shape_11,p:{y:153.375}},{t:this.shape_10,p:{y:165.7}},{t:this.shape_9,p:{y:151.3481}},{t:this.shape_8,p:{y:142.6693}},{t:this.shape_7,p:{y:153.8869}},{t:this.shape_6,p:{y:164.1502}},{t:this.shape_5,p:{y:206.0647}},{t:this.shape_3,p:{y:278.6762}},{t:this.shape_4,p:{y:257.4558}},{t:this.shape_2,p:{y:438.3073}},{t:this.shape_1,p:{y:392.2629}},{t:this.shape,p:{y:583.0083}}]},3).to({state:[{t:this.shape_16,p:{y:67.5649}},{t:this.shape_15,p:{y:162.7833}},{t:this.shape_14,p:{y:108.8}},{t:this.shape_13,p:{y:122.375}},{t:this.shape_12,p:{y:106.9406}},{t:this.shape_11,p:{y:129.725}},{t:this.shape_10,p:{y:142.05}},{t:this.shape_9,p:{y:127.6981}},{t:this.shape_8,p:{y:119.0193}},{t:this.shape_7,p:{y:130.2369}},{t:this.shape_6,p:{y:140.5002}},{t:this.shape_5,p:{y:182.4147}},{t:this.shape_4,p:{y:233.8058}},{t:this.shape_3,p:{y:255.0262}},{t:this.shape_2,p:{y:414.6573}},{t:this.shape_1,p:{y:368.6129}},{t:this.shape,p:{y:559.3583}}]},3).to({state:[{t:this.shape_16,p:{y:89.2149}},{t:this.shape_14,p:{y:130.45}},{t:this.shape_15,p:{y:184.4333}},{t:this.shape_13,p:{y:144.025}},{t:this.shape_12,p:{y:128.5906}},{t:this.shape_11,p:{y:151.375}},{t:this.shape_10,p:{y:163.7}},{t:this.shape_9,p:{y:149.3481}},{t:this.shape_8,p:{y:140.6693}},{t:this.shape_7,p:{y:151.8869}},{t:this.shape_6,p:{y:162.1502}},{t:this.shape_5,p:{y:204.0647}},{t:this.shape_3,p:{y:276.6762}},{t:this.shape_4,p:{y:255.4558}},{t:this.shape_2,p:{y:436.3073}},{t:this.shape_1,p:{y:390.2629}},{t:this.shape,p:{y:581.0083}}]},3).to({state:[{t:this.shape_16,p:{y:67.5149}},{t:this.shape_15,p:{y:162.7333}},{t:this.shape_14,p:{y:108.75}},{t:this.shape_13,p:{y:122.325}},{t:this.shape_12,p:{y:106.8906}},{t:this.shape_11,p:{y:129.675}},{t:this.shape_10,p:{y:142}},{t:this.shape_9,p:{y:127.6481}},{t:this.shape_8,p:{y:118.9693}},{t:this.shape_7,p:{y:130.1869}},{t:this.shape_6,p:{y:140.4502}},{t:this.shape_5,p:{y:182.3647}},{t:this.shape_4,p:{y:233.7558}},{t:this.shape_3,p:{y:254.9762}},{t:this.shape_2,p:{y:414.6073}},{t:this.shape_1,p:{y:368.5629}},{t:this.shape,p:{y:559.3083}}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(973.2,11.3,257.29999999999995,612.8000000000001);


(lib.EMTBad = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(37,41,43,0.463)").s().p("AgBAQIAAgDIAAgcQAFAMgEATg");
	this.shape.setTransform(736.0592,111.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#87939A").s().p("AgBAQIAAgDIAAgcQAFAMgEATg");
	this.shape_1.setTransform(730.78,111.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#778188").s().p("AgOBKIAZAAIAEAAIAAACIgOACQgIAAgHgEgAALhJIgZAAIAAgEQAOAAAPACIAAACIgEAAg");
	this.shape_2.setTransform(723.2,111.005);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(19,21,22,0.243)").s().p("AALCCIgZAAIAAgDIAZAAIAEAAIAAADIgEAAgAALh+IgZAAIAAgDQAOAAAPACIAAABIgEAAg");
	this.shape_3.setTransform(723.2,111);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(98,109,115,0.996)").s().p("AB2ACQh6gCh7AAIAAgCID8AAIADAAIAAACIgDABIgHACg");
	this.shape_4.setTransform(711.5,56.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(60,66,70,0.749)").s().p("AkegBII2AAIAEAAIACAAIAAABQkeACkeAAIAAgDg");
	this.shape_5.setTransform(753,56.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#79838A").s().p("AgrApIAXAAIADAAIgBACIgMACQgIAAgFgEgAApgVIAAgXQAGAJgEARIgCABIAAgEg");
	this.shape_6.setTransform(565.1342,114.305);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(25,27,29,0.314)").s().p("AAAAOQgBgOAAgOIADAAIAAAZIAAAEIgCgBg");
	this.shape_7.setTransform(548.975,111);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#788289").s().p("AgsAuQgBgPAAgPIADAAIAAAbIAAADIgCAAgAArgqIgbAAIAAgDQAPAAAPACIAAABIgDAAg");
	this.shape_8.setTransform(558.7,107.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AFBDC6").s().p("AMyBKIgaAAIgDgBQgkgLgRgfIAAgDQgFgVACgcQAPgmApgNIADgBIAaAAIAEAAQAvALALAtIABADIAAAdIAAADIgBADQgMAqguALIgEAAgAsaBKIgXAAIgEAAQgxgKgKgxIAAgEIAAgZIAAgDIAAgEQAPgnAqgMIACgBIAbAAIADAAQAxALAKAwIAAAEIAAAVIAAAEIAAADQgMAugvAKIgDAAg");
	this.shape_9.setTransform(642.5,111);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(82,90,95,0.988)").s().p("AMyB/IgaAAIgDAAQhogSgFh0IAAgDIAAgLQAKgmAWgcIABgCQAegaAugKIADgBIAaAAIAEAAQBgAOAPBfIABADIAAAdIAAADIgBADQgRBbheAPIgEAAgAMYhJIgDABQgpANgPAmQgCAcAFAVIAAADQARAfAkALIADABQALAGASgEIABgCQAtgLANgqIABgDIACAAQAEgTgGgNIgBgDQgLgtgvgLIgBgCQgOgBgPgBIAAAEgAsaB/IgbAAIgDAAQhdgRgQhfIAAgEIAAgZIAAgDIAAgOQAZhNBUgRIADgBIAbAAIADAAQA0AJAfAeIACAAIAAADIgDABQAbAcAEAzIACAAIAAAEQgLBthoASIgDAAgAtyAOIACABQAKAxAxAKIAEAAQAJAGAQgEIABgCQAvgKAMguIAAgDIACgBQAEgQgGgIIAAgEQgKgwgxgLIAAgCQgPgCgPAAIAAAEIgDABQgqAMgOAnIAAAEIAAADIgDAAQAAAOABAOg");
	this.shape_10.setTransform(642.525,111);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(20,22,23,0.251)").s().p("AAMCCIgaAAIAAgDIAaAAIADAAIAAADIgDAAgAAMh+IgaAAIAAgDQAOAAAPACIAAABIgDAAg");
	this.shape_11.setTransform(561.825,111);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(61,67,71,0.753)").s().p("AtABFIpOAAIAAgDQEnAAEngCQAigBAZAGIg7AAgAWMBCIAAgBIADABIgDAAgAWMhEIADAAIgDABIAAgBg");
	this.shape_12.setTransform(639.375,49.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#818C93").s().p("AgBABIAAAAIAAgBIADAAIAAAAIAAABIgDAAg");
	this.shape_13.setTransform(781.2,43.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(60,66,70,0.745)").s().p("AAABEQAAhEgBhDIACAAIAACAIAAADIAAAEg");
	this.shape_14.setTransform(496.95,50.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#545C61").s().p("AgTAPQgGgJABgPQAXgfAVAfQANASgSAKQgJAGgHAAQgKAAgIgKg");
	this.shape_15.setTransform(642.888,81.5018);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(61,67,71,0.749)").s().p("AAsAAQklABknAAIAAADIgDAAIgEgDIAAgCQEnAAEmgCQEFgBD9AFIgDABIgEACQj2gEj/AAg");
	this.shape_16.setTransform(643.175,56.7429);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(143,163,172,0.988)").s().p("AqsEMQgFgzgagcIACgBIABgCICXg1QDZhODXhPQh4gph2grImyicIAAgDID0AAIADAAIADAAIAEACIADABQDaBMDYBPIBwAnIGyicIBtgmIAEgDIADAAIADAAQB7AAB8ABIAAACIjtBWQjYBOjbBMIGwCbICQA0IAAACQgWAcgLAnIAAAKIAAADIjshWQjZhOjahMQh/Aqh7AtQjZBPjZBNgAgbgeQgBAPAGAJQANARAVgMQASgLgNgSQgLgQgKAAQgMAAgLAQg");
	this.shape_17.setTransform(643.175,83.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(98,109,115,0.992)").s().p("Ah6ADIgEgDIAAgCQB+AAB/ABIAAABIgEAAIjyAAIAAADIgDAAg");
	this.shape_18.setTransform(575,56.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(83,91,96,0.996)").s().p("AJPBEQj9gGkFABQklABknAAIAAAEIgDAAIAAgCQh/gCh/AAIAAAEIgDAAQgagGgiAAQkmACknAAIAAgDIAAiAIJNAAIA1AAIIWAAIADAAIA1AAIIUAAIADAAIA1AAIJBAAIG4AAIABAAIADAAIAACAIAAADIAAAAIgDAAIo3AAIgDAAIj+AAIAAAEIgDAAg");
	this.shape_19.setTransform(639.225,50.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(176,189,198,0.996)").s().p("AWMBoIm4AAIpBAAIg1AAIgDAAIoUAAIg1AAIgDAAIoWAAIg1AAIpNAAIgDAAIAAgDIAAjMMAsZAAAIAADMIAAAAIAAADIAAAAIgBAAg");
	this.shape_20.setTransform(638.925,32.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.EMTBad, new cjs.Rectangle(496.8,22.5,284.90000000000003,101.5), null);


(lib.EMT2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#904520").s().p("AgTAAIAAAAIAEAAIADAAIAdAAIADAAIAAAAg");
	this.shape.setTransform(208.425,5.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F7520A").s().p("AANAKIgdAAIAAgDQALgMASgEIAEAAIAAAQIAAADIgEAAg");
	this.shape_1.setTransform(208.75,4.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#8F4121").s().p("AkPAAIgEAAIgDAAIgDAAIgGAAIgCAAIAAAAIAaAAIAEAAIIhAAIAEAAIAAAAg");
	this.shape_2.setTransform(240.075,5.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(38,49,55,0.996)").s().p("ABZA9IAAgBIAAgBQg6gCg4AAIAAADIAAABIhgAAIAAgBIAAgBQhNgChOAAIgDAAQhXgUgMheQA/AAA+gCIAAgBIABAAIAoAAIACAAIADAAIACAAIACAAIAFAAIADAAIAEAAIADAAIIxAAIACAAIAAAAIAEAAIAAAGIAAAEIgBADQgOBYhXAQIgEAAIhZAAIAAADIgDAAIAAABg");
	this.shape_3.setTransform(231.725,11.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(52,18,3,0.251)").s().p("AgBAjIAAgBIAAgDIAAhBIACAAIAAADQACAhgDAdIAAAEg");
	this.shape_4.setTransform(269.251,1.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(60,19,2,0.251)").s().p("AgBB4IAAgDIAAjmIAAgDIAAgDIADAAIAADsIAAADIgDAAg");
	this.shape_5.setTransform(269.2,-25.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(112,49,22,0.459)").s().p("AALACIgZAAIAAgDIAdABIAAACIgEAAg");
	this.shape_6.setTransform(264.925,-71.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FBB395").s().p("AgBAKIAAgWIACAAIAAADQACAPgEAHIAAgDg");
	this.shape_7.setTransform(255.4017,-59.775);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(250,209,192,0.988)").s().p("AgCCmIAAlFIAAgDIAAgHIACAAQAAClABCkIACAAIgBADIgEAHIAAgEg");
	this.shape_8.setTransform(249.625,-55.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F7520D").s().p("AgJADIAAgIIAQAAIADAAIgBABQgLAEgHAGIAAgDg");
	this.shape_9.setTransform(260.15,-70.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(123,123,123,0.49)").s().p("AAnACIhRAAIAAgDIBVABIAAACIgEAAg");
	this.shape_10.setTransform(254.225,-72.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(254,253,253,0.996)").s().p("AgtCmQgCikAAikIAAgDIAEAAIBRAAIADAAQAHABAAAJIAAADIAAADIAAAKIAAADIgDABQgWAXgLAgIAAAbIAAADIgEAAIAAAXIAAADIAAAEQgKBqgpBNIAAADg");
	this.shape_11.setTransform(254.3767,-55.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(184,62,11,0.753)").s().p("AAAACIgQAAIAAgDIAdAAIADAAIAAABQgGACgGAAIgEAAg");
	this.shape_12.setTransform(260.8,-71.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(97,76,30,0.831)").s().p("AAXACIgwAAIAAgDIAgAAIADAAIADAAQAHAAAGABIAAACIgDAAg");
	this.shape_13.setTransform(248.625,-96.825);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(62,41,1,0.251)").s().p("AgBANIAAgdQAFANgEATIgBABIAAgEg");
	this.shape_14.setTransform(254.38,-91.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F7500A").s().p("AEQDRIoiAAIAAgDQCBgQBfgxIADgBIE/AAIADAAIAABCIAAADIgDAAgADBAZQgHAAgBgDQgMgWADgiIAAgDIAAgDQA+hGAjhhIACgBIAADlIAAAEIhSAAg");
	this.shape_15.setTransform(241.55,-15.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F97B47").s().p("AgBEeIAAgDIAAo4QAFEYgDEgIAAADIgCAAg");
	this.shape_16.setTransform(212.2618,-42.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(247,108,51,0.996)").s().p("Ak0F+IgDAAIgDAAIAAAAIAAgDIAAgRIAAgDQgEhCgChFIAAgEIAAgXIAXgBIAAgCIADAAQD0gnBxi4QAHgLAEgMIAGgHIABgDIAAgDQAphNALhrIAAgEQAGgHgCgQIAAgDIAAgDIAAgbQALggAWgXIADgBQAHgHAMgEIABgCQAGAAAGgBIABgCIAGAAIAEAAIAaAAIADAAQA/ALALBAIACABIAAA0IAAAEIgCAAQgIBzgkBVIAAAEIAAADIgDAAIAAADIAAAEIgCAAQgjBhg+BGIAAADIAAADIgCABQhYBtiFA9IAAAEIgDAAQhfAyiBAQIAAADIgEAAIgaAAIAAAAg");
	this.shape_17.setTransform(241.875,-33.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FCBF86").s().p("AgGAJQAPgBgEgVIACAAIAAAWIAAAEIgEAAIgDABQgFAAgBgFg");
	this.shape_18.setTransform(209.1,-11.9839);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#E8AB3B").s().p("AABA1QABg2gFgvIAAgEIADAAQAFAvgCA2IAAAEg");
	this.shape_19.setTransform(187.7267,-3.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FED183").s().p("AgZAAIADgBIADgBQASAFAYgDIADAAIAAACQgMABgMAAQgOAAgNgDg");
	this.shape_20.setTransform(194.925,-13.0158);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFDFA").s().p("AgWgBIAqAAIADAAIAAACIgDAAIgOABQgQAAgMgDg");
	this.shape_21.setTransform(195.25,-13.1382);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FCD1BE").s().p("AgBBHIAAgEIAAiJQAFBDgEBKg");
	this.shape_22.setTransform(194.1214,-21.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FA7B07").s().p("AAAANQgBgNAAgMQAFAHgCAPIgBADIgBAAg");
	this.shape_23.setTransform(167.4967,-16.625);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(248,165,131,0.988)").s().p("AAAEZIAAgDIAAgDIAAoeIAAgEIAAgKIACAAIAAIvIAAAEIgCgBg");
	this.shape_24.setTransform(202.35,-44.125);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FEFEFD").s().p("AkOEZQgIhCADhLIADAAIADAAIAACKIAAADgAC2jXQgugYgegpICoAAIADAAIgTAXQgXAjgyAHIgDAAg");
	this.shape_25.setTransform(220.9188,-42.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(125,125,125,0.498)").s().p("AAmACIhOAAIAAgDQAoAAApABIAAACIgDAAg");
	this.shape_26.setTransform(207.275,-72.775);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(254,254,254,0.996)").s().p("AFEFiIgEAAIk/AAIAAgEQCGg9BYhtIACgBQgDAiALAXQACADAGAAIBTAAIADAAQARAggDA5QgBAVgNAFIgDAAgAkaEDQgYgcgjgSIAAgEIAAovIAAgDIAEAAIADAAIBPAAIADAAQAIABgBAJIAAADIAAAEIAAI4IAAADIAAACIgXACIgCAAQAEAVgPABIgBgCg");
	this.shape_27.setTransform(236.666,-37.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FEE8BF").s().p("AgGACQhUgChUAAIAAADIgCAAIgBgFICrAAIAEAAICwAAIAEAAIgBACIgDAAIgDAAIioAAIgDAAIgCAAIgBADIgDAAg");
	this.shape_28.setTransform(231.175,-70.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(246,80,10,0.996)").s().p("AmTE5IAAgDQgDgqAAgvIABgDQABgQgFgHIAAgDIAAgUIAAgEIAAgTQCbgQBjhIIADgBQADifAIifQABgQAIgOQAWglAygJIAAIeIAAADIgDAAQgigCgJAWIAAAHIAAADIgDAAIgrAAIgDABIgEACIgDABQgeAJgNAaIAAAHIAAADIgDAAIAAAEQg9AVhGAPIgWAGQgKADgHAAQgWAAgDgagAiQDkIABAAIACAAQAEhLgGhDIgDAAIgDAAQgCBLAHBDgAApDqQADkggHkYIAAgEIAHAAIADAAIAEAAIABAGIACABQAcAwA9AOIADAAQAugWAeglIAAgDIADgBIAAgCIADAAIAEAAQAeApAuAYIADAAQAygHAYgiIASgYIACgBIABgDIAEAAIAAFGIAAAEQgEALgHAKQhyC5j0AoIAAgEg");
	this.shape_29.setTransform(208.3,-37.4483);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FEFCFA").s().p("AAFAhQg8gPgcgvIAAgDQBTAABUACIAAABIAAADQgeAlguAWIgDAAg");
	this.shape_30.setTransform(222.1,-67.675);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#343934").s().p("AgFAMQgJgDAAgPQAigXgGAmQgBAGgHAAQgFAAgGgDg");
	this.shape_31.setTransform(222.4259,-97.9582);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(190,125,4,0.753)").s().p("ACyBzIAAgDIAAiGIADAAIAAB8IAAADIAAAHIAAADIgDAAgAi0BzIAAgDIAAjiIADAAIAADiIAAADIgDAAg");
	this.shape_32.setTransform(231.175,-82.825);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#936D1F").s().p("AgcgBIA3AAIACAAIAAABQgOACgNAAQgQAAgOgDg");
	this.shape_33.setTransform(227.55,-91.8786);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2A3337").s().p("AAcAIIg3AAIgDAAQgEgEAAgIIAEgCIADgBIA3AAIADAAQAGAEgEALIgCAAIgDAAg");
	this.shape_34.setTransform(227.3656,-92.875);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CB8B11").s().p("AAbACIg3AAIAAgCQAcAAAdAAIAAACIgCAAg");
	this.shape_35.setTransform(227.55,-93.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2D3536").s().p("AAAAPQgRgCAFgXQAogPgUAmQgCACgDAAIgDAAg");
	this.shape_36.setTransform(231.5429,-97.8829);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#5E4F2A").s().p("ABFA2IgChrQAGAugCA3IAAADIAAADgAhGgLIAoAAIADAAIAAACIgTACQgOAAgKgEg");
	this.shape_37.setTransform(238.9368,-102.075);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3536").s().p("AAUALIgnAAIgDgBQgGgDACgMQAngOANAZQACAEgFABIgDAAg");
	this.shape_38.setTransform(233.8017,-104.3231);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(16,20,22,0.424)").s().p("AANACIgcAAIAAgDQAPAAARABIAAACIgEAAg");
	this.shape_39.setTransform(231.5,-117.575);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(17,22,25,0.471)").s().p("AgOgBIAaAAIADAAIAAABQgIACgHAAQgHAAgHgDg");
	this.shape_40.setTransform(239.875,-116.2408);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(9,12,13,0.251)").s().p("AgBBCIAAgDIAAiAIADAAIAACAIAAADIgDAAg");
	this.shape_41.setTransform(249.775,-103.575);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(38,49,55,0.992)").s().p("ACaBmIghAAIAAgDQACg3gGguIgDAAIj9AAIgDAAQgWAAACgbQAghABXgIIADAAIAeAAIADAAQAbACAWAHIADABQALAGASgFIAAgBQAmgTAgASIADABQAXAVgJAmIgBADIgDAAIAACAIAAADIgDAAg");
	this.shape_42.setTransform(233.9391,-107.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#E9AD3A").s().p("AgtgBIBYAAIADAAIAAABIhbACIAAgDg");
	this.shape_43.setTransform(159.375,-3.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#D7B366").s().p("AgZgBIAwAAIADAAIAAACIgDAAIgPABQgSAAgPgDg");
	this.shape_44.setTransform(152.125,-3.8983);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#D7B264").s().p("AAAA2QgBg2AAg1IADAAIAABoIAAADg");
	this.shape_45.setTransform(145.375,-13.175);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(254,167,6,0.996)").s().p("ABBIzIibAAIgBAAIgDAAIgBgCIgCgBQgRgIgEgTIABgDQACg3gGgvIAAgDIAAgHQANgbAegJIADAAQAXAFAegEIAAgBIAAgEIAAgDIAAgGQAJgWAhACIADAAIABACIACABQAjATAYAcIABACQABAGAJgCIADAAQACBFAEBCIAAADIgDAAQgTAEgLANIAAADIgDAAIgDAAIAAAAgAlpHXIhZAAIgDAAIgyAAIgDgBQgfgFgFgfIAAgDIAAhpIAAgEIAAgDIAFgHIABgDIAAgDQAMgKAPgGIADAAIA7gCIAAgCIAAgDIAAgDQAggwAsAsQAUAUAaANIAAAUIAAADQAAANACANIABABQAAAuADArIABADIgEAAQgWAFgOAPIgDAAgAHnjIIixAAIgEAAIirAAIAAgDIAAjkIAAgDIAAgHQAVgcApgMQAFgBgBgLIAAhCIAAgDID+AAIADAAIABBsIACAAIAyAAIADAAQAZAIAEAcIAAAEIAAAdIAAAEIAAADQgDApgugCIgDAAIAACIIAAADIgEAAgAD3moIgDABIgEACQAAAJAEAEIADAAQAaAGAhgEIAAgCIACAAQAEgMgGgEIAAgCQgdgBgeAAIAAADgAEvndQgEAYARACQAHABABgDQAPgcgRAAQgHAAgMAEgADTnaQAAAQAIADQASAIACgLQAEgYgMAAQgHAAgNAIgAE5oYQgCAMAGAEIACAAQASAGAZgEIAAgCQAGgBgCgEQgJgQgUAAQgKAAgOAFg");
	this.shape_46.setTransform(199.875,-51.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(78,52,1,0.314)").s().p("AgdgBIA3AAIAEAAIAAABIg7ACIAAgDg");
	this.shape_47.setTransform(152.125,-22.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.EMT2, new cjs.Rectangle(145.2,-117.7,128.8,135.1), null);


(lib.EMT1LegR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap2();
	this.instance.setTransform(-147.85,16.85,0.9999,0.9999,22.9482);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(-163.5,58.75,0.9999,0.9999,61.4188);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{rotation:61.4188,x:-163.5,y:58.75,scaleX:0.9999,scaleY:0.9999}},{t:this.instance,p:{rotation:22.9482,x:-147.85,y:16.85,scaleX:0.9999,scaleY:0.9999}}]}).to({state:[{t:this.instance_1,p:{rotation:40.9661,x:-155.75,y:63.4,scaleX:0.9999,scaleY:0.9999}},{t:this.instance,p:{rotation:11.7396,x:-147.9,y:17.5,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:30.0144,x:-148.15,y:64.25,scaleX:0.9999,scaleY:0.9999}},{t:this.instance,p:{rotation:0.7835,x:-149.05,y:17.7,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:15.0133,x:-150.05,y:66.8,scaleX:0.9999,scaleY:0.9999}},{t:this.instance,p:{rotation:0.7835,x:-149.05,y:17.7,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:0.0149,x:-150,y:67.5,scaleX:1,scaleY:1}},{t:this.instance,p:{rotation:0.7835,x:-149.05,y:17.7,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:15.0137,x:-149.7,y:66.75,scaleX:0.9999,scaleY:0.9999}},{t:this.instance,p:{rotation:0.7835,x:-149.05,y:17.7,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:30.0122,x:-148.1,y:64.1,scaleX:0.9998,scaleY:0.9998}},{t:this.instance,p:{rotation:0.7835,x:-149.05,y:17.7,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:41.476,x:-155.9,y:62.8,scaleX:0.9998,scaleY:0.9998}},{t:this.instance,p:{rotation:12.2452,x:-147.8,y:17.1,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:56.4744,x:-165.45,y:58.4,scaleX:0.9998,scaleY:0.9998}},{t:this.instance,p:{rotation:27.2479,x:-145.7,y:16.5,scaleX:0.9998,scaleY:0.9998}}]},1).to({state:[{t:this.instance_1,p:{rotation:65.6798,x:-166.1,y:58.15,scaleX:0.9998,scaleY:0.9998}},{t:this.instance,p:{rotation:27.2479,x:-145.7,y:16.5,scaleX:0.9998,scaleY:0.9998}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.4,16.5,78.4,105.2);


(lib.EMT1LegL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap5();
	this.instance.setTransform(-170,67);

	this.instance_1 = new lib.Bitmap4();
	this.instance_1.setTransform(-170,19);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{rotation:0,x:-170,y:19}},{t:this.instance,p:{rotation:0,x:-170,y:67,scaleX:1,scaleY:1}}]}).to({state:[{t:this.instance_1,p:{rotation:0,x:-170,y:19}},{t:this.instance,p:{rotation:5.4751,x:-169.85,y:66.65,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.instance_1,p:{rotation:0,x:-170,y:19}},{t:this.instance,p:{rotation:20.4741,x:-168.1,y:66.95,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.instance_1,p:{rotation:0,x:-170,y:19}},{t:this.instance,p:{rotation:35.4733,x:-166.6,y:64.85,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.instance_1,p:{rotation:13.8961,x:-169.15,y:19.8}},{t:this.instance,p:{rotation:49.3696,x:-176.85,y:65.1,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:3.4511,x:-171.4,y:16.8}},{t:this.instance,p:{rotation:38.9243,x:-170.75,y:62.75,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:3.4511,x:-171.4,y:16.8}},{t:this.instance,p:{rotation:23.9248,x:-174.2,y:64.15,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:3.4511,x:-171.4,y:16.8}},{t:this.instance,p:{rotation:16.7168,x:-173.65,y:63.6,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:3.4511,x:-171.4,y:16.8}},{t:this.instance,p:{rotation:7.9763,x:-174.15,y:66.3,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{rotation:0,x:-172,y:23}},{t:this.instance,p:{rotation:0,x:-172,y:71,scaleX:1,scaleY:1}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-220.1,16.8,65.1,111.2);


(lib.EMT1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#954925").s().p("AAXACIgwAAIAAgDIAKAAIADAAIAcAAIAEAAQADAAADABIAAACIgDAAg");
	this.shape.setTransform(-129.125,5.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C7AE8A").s().p("AgJABIAAgFQAJAAAKACIAAACIgEAAQgMgCgDAHIAAgEg");
	this.shape_1.setTransform(-86.65,2.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E8AD3C").s().p("AgBA2IAAhvQAFA2gEA8IgBABIAAgEg");
	this.shape_2.setTransform(-65.07,-4.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D5B369").s().p("AhJgBICQAAIADAAIAAABQgfACgeAAQgsAAgqgDg");
	this.shape_3.setTransform(-75.95,4.28);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D6B368").s().p("AgdgBQAdAAAeABIAAABIgEAAIgTABQgTAAgRgDg");
	this.shape_4.setTransform(-71.825,-14.1109);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FB8607").s().p("AgBANIAAgcIACAAIAAACQADATgFAKIAAgDg");
	this.shape_5.setTransform(-87.0882,-5.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FEA706").s().p("ABMBsIiQAAIgDgBQgOgFgGgOIAAgBQgKgCgKAAIAAgDIAAgUQAGgNgDgUIAAgDQAGgLgCgSIAAgDIAAgEIAAguIADAAQAggTAdgVQAjgaATAjQACAFABAHQAYAFAfgCIAEAAQAcAFAHAZIABADIAABvIAAADIgBADQgIAXgYAHIgDAAg");
	this.shape_6.setTransform(-76.45,-6.6919);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CD8E75").s().p("AAEAMIAAgDQACgSgOgBQAVgEgFAXIgBADIgDAAg");
	this.shape_7.setTransform(-87.396,-13.5286);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(172,113,3,0.682)").s().p("AgBAKIAAgWIACAAIAAADQADAPgFAHIAAgDg");
	this.shape_8.setTransform(-107.8382,0.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFD280").s().p("AgZgBIAtAAIADAAIADAAIAAABQgMACgMAAQgOAAgNgDg");
	this.shape_9.setTransform(-114.975,-12.8408);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FEFBF7").s().p("AAVACIgtAAIAAgDQAYAAAZABIAAACIgEAAg");
	this.shape_10.setTransform(-115.125,-13.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(247,122,70,0.992)").s().p("AgBAwIAAhiIACAAIAAADIAAADQADAzgFAsIAAgDg");
	this.shape_11.setTransform(-113.1109,-19.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FBA784").s().p("AAAA+QgBg+AAg9IADAAIAAB4IAAADg");
	this.shape_12.setTransform(-114.125,-20.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FEFDFD").s().p("AAABAIgCAAIAAgDIAAh5IAAgDIACAAIADAAIAAAXIAAADIAABiIAAADIgDAAg");
	this.shape_13.setTransform(-113.625,-20.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(60,21,5,0.251)").s().p("AgBC8IAAgEIAAgXIAAgDIAAlZQAFC2gDC9IAAAEIgCAAg");
	this.shape_14.setTransform(-113.1109,-42.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FBB79B").s().p("AACAMIABgDQACgRgLgCQARgDgFAWIAAADIgEAAg");
	this.shape_15.setTransform(-130.0218,-12.2125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(126,83,2,0.502)").s().p("AgBB4IAAgDIAAjsQAFBygDB6IAAADIgCAAg");
	this.shape_16.setTransform(-132.8609,-83.325);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(251,210,192,0.992)").s().p("AgBEYIAAgDIAAosQAEAAgBAHIgBADIAAIiIAAADIgCAAg");
	this.shape_17.setTransform(-122.3339,-43.9517);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FEE6BD").s().p("ABWACQhVgChTAAIAAADIgCAAIgEgDIAAgCQBYAABZABIAAABIgBADIgCAAg");
	this.shape_18.setTransform(-142.3,-70.975);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#615129").s().p("AgggBIA9AAIAEAAIAAABQgQACgOAAQgTAAgQgDg");
	this.shape_19.setTransform(-151.5,-95.4908);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#60502A").s().p("AAfACIhBAAIAAgDQAiAAAjABIAAACIgEAAg");
	this.shape_20.setTransform(-151.35,-97.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(18,23,25,0.478)").s().p("AgGAiQALgZgFgoIAAgDQAFANACAUQACAkgOAAIgBgBg");
	this.shape_21.setTransform(-137.3136,-112.9497);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#393B33").s().p("AgBANQgNgDADgSQAlgPgUAiQgBABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgDAAg");
	this.shape_22.setTransform(-144.364,-101.375);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333835").s().p("AgKAEQgBgFAAgHQAmgMgYAcQgDAEgDAAQgEAAgDgIg");
	this.shape_23.setTransform(-158.1832,-101.3579);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FDD3C1").s().p("AgBAaIAAg3IABABIABACIAAAEQADAegFAWIAAgEg");
	this.shape_24.setTransform(-178.9882,-16.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(54,18,3,0.251)").s().p("AAAAoQgBgoAAgnIADAAIAABBIAAAEIAAADIAAADIAAAEg");
	this.shape_25.setTransform(-189.225,2.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(188,188,188,0.745)").s().p("AAAAzIgBhlIADAAIAABiIAAADg");
	this.shape_26.setTransform(-190.225,-7.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FBB69A").s().p("AAAANQgBgNAAgMQAEAHgCAPIAAADg");
	this.shape_27.setTransform(-175.3483,-60.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#F7530E").s().p("AAHAFQgHgGgJgEIAQAAIADAAIAAAIIAAADIgDgBg");
	this.shape_28.setTransform(-180.1625,-70.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FEFDFC").s().p("AgEAgQgzgTgcgqIAAgDICkAAIADAAIgPAXQgXAigvAIIgDgBg");
	this.shape_29.setTransform(-159.9,-67.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(254,253,252,0.996)").s().p("AAvCqQgthVgLh1IAAgDQACgQgFgHIAAgEQgCg4gjgXIAAgDIAAgKIAAgDIAAgDIAAgHIAEgDIADAAIBRAAIAEAAQAHABgBAJIAAADIAAFFIAAADIgCgBg");
	this.shape_30.setTransform(-174.2483,-55.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(254,231,191,0.996)").s().p("AhUADIgEgFIADAAICrAAIADAAIAAACIgDAAIgEAAIijAAIAAADIgDAAg");
	this.shape_31.setTransform(-160.075,-70.975);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(128,55,26,0.522)").s().p("AgBAPIAAgDIAAgaQAEAKgCAQIAAADIgCAAg");
	this.shape_32.setTransform(-193.7983,-58.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#99701D").s().p("AgYgBIAtAAIAEAAIgBABQgYACgYAAIAAgDg");
	this.shape_33.setTransform(-169.125,-97.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#273238").s().p("AAgAHIhCAAIAAgDIAAgJQAmgDAdAJIAAAAIABABQAAABAAAEIgCAAg");
	this.shape_34.setTransform(-159.6,-107.8749);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#5F502A").s().p("AAiAEIAAAAQAGAEgGABQAAgEAAgBgAgjAJQgBgIgBgIQAsgFAaAPQgdgJgmADIAAAJIAAADg");
	this.shape_35.setTransform(-159.6,-108.0816);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(39,50,55,0.996)").s().p("AirCBIgBgEIgCgGIAAgEIAAidIAAgDIAAgEQAUgQAGgeIAAgDQAMgSAUgJIABgDIDsAAIADAAQAoARAJAuIABAEIAAACQAFApgMAYIgDAAQgEgDgJAAIgEAAIAAgBQiBgbh7geQgGArAFAzQAEA3gQAfIgEAAIguAAIAAAEIgDAAg");
	this.shape_36.setTransform(-154.7242,-110.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#5D4F2B").s().p("Ag+gBIB5AAIAEAAIAAACIgEAAIgoABQgqAAgngDg");
	this.shape_37.setTransform(-119.575,5.6391);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F7520A").s().p("AANAKIgcAAIAAgDIAAgQQAVACAKAOIAAADIgDAAg");
	this.shape_38.setTransform(-128.8,4.125);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#8F4121").s().p("AEbACIo5AAIAAgDIIiAAIAEAAIATAAIADAAIAAADIgDAAg");
	this.shape_39.setTransform(-160.4,5.275);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(38,49,55,0.996)").s().p("AkXA7QhWgSgNhbIAAgBIAAgEIAAgDII5AAIADAAIAyAAIADAAIADAAIADAAQA5AFBBgCIAEAAIgBAEIAAABQgMBbhXASg");
	this.shape_40.setTransform(-151.175,11.35);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(60,19,2,0.251)").s().p("AgBB4IAAgDIAAjsQABAAAAABQAAAAAAABQAAAAAAABQABAAAAABIABACIAADmIAAADIgDAAg");
	this.shape_41.setTransform(-189.225,-25.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(112,49,22,0.459)").s().p("AAMACIgaAAIAAgDQAOAAAOABIABACIgDAAg");
	this.shape_42.setTransform(-184.95,-71.45);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(123,123,123,0.49)").s().p("AETACIhTAAIAAgDQArAAArABIAAACIgDAAgAjDACIhSAAIAAgDIBVABIAAACIgDAAg");
	this.shape_43.setTransform(-150.675,-72.775);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("rgba(184,62,11,0.753)").s().p("AgPgBIAcAAIADAAIAAACIgDAAIgPAAIgEAAIgEABQgFAAAAgDg");
	this.shape_44.setTransform(-180.825,-71.0983);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("rgba(62,41,1,0.251)").s().p("AAAATQgBgTAAgTIADAAIAAAjIAAAEIgCgBg");
	this.shape_45.setTransform(-174.075,-92.025);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#F7500A").s().p("AEQDRIoiAAIAAgDIAAhCIE+AAIAEAAQBhAxCBASIABACIgDAAgAiyAZIhgAAIAAgEIAAjlQAnBfA7BNIABACIAAA3IAAAEIgDAAg");
	this.shape_46.setTransform(-161.55,-15.8);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(247,108,51,0.996)").s().p("AE3F+IgKAAIgDAAIgUAAIAAgCQiBgShigxIgBgCQiChAhZhqIgBgCIgCgBIgBgCQg6hNgoheIgBgDQAAAAAAgBQAAAAgBgBQAAAAAAgBQgBAAAAgBIgBgDQgghXgKhuIAAgEQACgRgFgKIAAgDIAAgkQASg0A2gRIADAAIAbAAIADAAIAHAAIADAAQABAFAJgBIADAAQAKAEAHAHIADABQAjAYABA4IAAADQAAANACANIABAAQANB2AtBWIACABQBjDAD1AzIAbAGIAKAAIADAAQAMACgCASIAAACIAAAEQgBBGgGBBIAAADIAAARIAAADIgDAAg");
	this.shape_47.setTransform(-161.8607,-33.1);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(254,254,254,0.996)").s().p("AgHFiIlAAAIgDAAIgCgBIgFgFIAAgEIAAhjIAAgDIAEgCIADgBIADAAIBgAAIADAAQAGgWgCgfIAAgEQBYBqCDBAIABACIgDAAgAENEDQAFgXgTADIgDAAIgKAAIAAgEIAAo/IAAgDIAAgHIAEgCIACgBIBTAAIADAAIADADIAAAEIAAIrIAAAEIgSAOQgXATgbAPIAAgCg");
	this.shape_48.setTransform(-156.3,-37.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(246,80,10,0.996)").s().p("AFWF0IgDAAIAAgBQhIgPg/gXIAAgDQAShmhAgUIgDAAIAAgCQgZgCgZAAIAAgDQgIgigmALIAAgDIAAoiQBLAOAOBLIAAADIAAFZIAAADIgDAAIgDAAIAAAEIgEAAQAAA+ACA/IACAAIADAAIADAAQAGgsgDg0IAAgDQBUA7BrAUIAEAAQASAOAfgBIADAAQAQABgCATIAAADIAAAuIAAAEIgEAAIAAAdIAAAEIAAADQADAUgGANIAAAUIAAADIAAAGIAAAEQAAAFgBAAQgOAEgRAAQgOAAgRgDgAhBDHQj1gzhljBIAAgDIAAlGIAEAAIAEAGIACAAQAcArAzATIADABQAxgIAWgjIAPgXIADAAIAEADIADAAQAcAtA2ARIAEABQA0gTAdgpIABgDIACAAIABgDIADgBIABgCIADAAIADAAIADAAIAAI/IAAADIgagFg");
	this.shape_49.setTransform(-128.1136,-33.7865);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FEFCFA").s().p("AAAAgQg3gRgcgsIAAgDQBTAABUACIAAABIgBADQgdAog0ATIgCgBg");
	this.shape_50.setTransform(-142.15,-67.675);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(190,125,4,0.753)").s().p("AiRDBIAAgDIAAiRQAFBEgDBNIAAADIgCAAgACQh3QgBgkAAglIADAAIAABGIAAADg");
	this.shape_51.setTransform(-154.3,-90.575);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2A3337").s().p("AAeAIIg+AAIgDgBQgEgDABgIIADgDIADAAIBBAAIADAAIACAAQAEANgJACIgDAAg");
	this.shape_52.setTransform(-151.5226,-96.475);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(9,12,13,0.251)").s().p("AAABRQgBhRAAhQIADAAIAACdIAAAEg");
	this.shape_53.setTransform(-172.425,-106.375);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(254,167,6,0.996)").s().p("AERJeIgDAAIh6AAIgDAAIgEAAIAAgCQgDgCgDAAIgBgDQgJgPgXgBIAAgEQAGhBAAhGIAAgDIAEAAQAbgQAXgTIATgOIADAAQAmgMAIAjIAAADIAAADQAXAGAegEIAAgCQBAAVgSBlIAAADIgDAAIAAAXIAAAEIgBADQgIAegoAAIgEAAgABIifQhYgChZAAIgDAAIirAAIAAgDQAChNgFhEIgEAAQgpgBgFgmIAAgEIAAgkIAAgDIAAgHQAIgMAKgKIACgBIADAAQAZAAAYgCIABgBQAQgfgEg3QgFg0AGgrQB8AeCAAbIAAACQAAAkACAkIACAAQANAWAcAKQAXAIACAhIAADtIAAADIgBADIgDABgAiNmlIgDABIgDACQgBAJAEAEIADABQAdAFAlgEIAAgBQAJgDgEgNIgCgBIAAgCQgigBgjAAIAAADgAgxnWQgCATANACQAGACABgDQAOgZgOAAQgGAAgMAFgAi7nWQAAAGACAGQAEAQAKgMQAQgUgOAAQgGAAgMAEgAjioYQAAAIABAIIACAAIBCAAIADAAQAGgBgGgDIgBgBIgBAAIAAAAQgUgMgfAAIgTABg");
	this.shape_54.setTransform(-140.6121,-55.1466);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.EMT1, new cjs.Rectangle(-194,-123,129.1,140.3), null);


(lib.wheelNoAnimation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#454545").s().p("AgIAJQgLgFANgSIAUAdQgQgDgGgDg");
	this.shape.setTransform(37.0603,29.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#454545").s().p("AgMAOQgHgEABgZQALAOAEACQAJAIANgDQgSAKgIAAIgFgCg");
	this.shape_1.setTransform(58.3688,-16.4404);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#454545").s().p("AgEABQABgJAIgbIAABGQgLgOACgUg");
	this.shape_2.setTransform(17.8298,1.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#454545").s().p("AADAZQgHgBgHgKQgSgWAVgQQAAATAFAIQAFALASABQgHAKgIAAIgCAAg");
	this.shape_3.setTransform(10.272,1.7292);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#454545").s().p("AgPAPQgJgKAAgKQAAgLAMgJQgFAqAqgDQgJAMgLAAQgJAAgLgLg");
	this.shape_4.setTransform(19.775,22.7688);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#454545").s().p("AgrADIAAgFIBXAAIAAAFg");
	this.shape_5.setTransform(38.875,21.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#454545").s().p("AgSgnIAmBPQgrgmAFgpg");
	this.shape_6.setTransform(20.2903,9.2375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#959595").s().p("AgdABQAKgTAKgGQAMgIAQAOQAOALgEALQgEAKgQAJQgJAFgGAAQgRAAgGgbg");
	this.shape_7.setTransform(59.4297,-18.1222);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#959595").s().p("AgXgNQAMgLALgBQAOgBAIAMQAIAMgDALQgDAOgTADIgJAAQggAAANgng");
	this.shape_8.setTransform(11.7937,0.6392);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#959595").s().p("AgbgPQASgJAJgBQAPgCAKANQASAWggAQQgLADgHAAQghAAANgqg");
	this.shape_9.setTransform(21.21,21.7971);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#959595").s().p("AgXATQgIgHADgLQAKgTADgDQAKgKAPAEQAWAFgCAYQAAARgMAGQgIAFgRAAIgQgLg");
	this.shape_10.setTransform(39.2907,28.1929);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#959595").s().p("AgbAAQABgbAagBQAegBgBAaQgCAYgdAIQgbgEACgZg");
	this.shape_11.setTransform(58.3494,21.1481);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#959595").s().p("AgVAXQgIgHACgNQADgcAegDQAPABAFAHQADAHAAAMQgBAegcAAQgNAAgIgGg");
	this.shape_12.setTransform(18.4841,-17.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#959595").s().p("AgcAIQABgOAIgKQAJgKANgBQAOgCAGAJQAGAIAAAMQgBAdgeAAIgCAAQgZAAABgVg");
	this.shape_13.setTransform(39.4001,-26.759);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#808080").s().p("Aj1DqQhfhjABiHQABiPBjhkQBmhmCNALQCAgOBqBtQBmBqAACDQABCKhpBlQhjBgh8ADIgNABQiTAAhihng");
	this.shape_14.setTransform(39.5496,0.7044);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#575757").s().p("AhpJvQjvgfijjOQh4iggJjaQgBgmAMhLQAvkhEEiXQC3hqDUAbQDrAeCZCrQCmC4gGD3QAPAQgDAjQgPCPg+BuQgKATgZAPQhCBZg5AxQiqCSjoAAQgzAAg2gHg");
	this.shape_15.setTransform(40.0212,0.5172);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wheelNoAnimation, new cjs.Rectangle(-23.7,-62.5,127.5,126.1), null);


(lib.wheel = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#454545").s().p("AgIAJQgLgFANgSIAUAdQgQgDgGgDg");
	this.shape.setTransform(37.0603,29.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#454545").s().p("AgMAOQgHgEABgZQALAOAEACQAJAIANgDQgSAKgIAAIgFgCg");
	this.shape_1.setTransform(58.3688,-16.4404);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#454545").s().p("AgEABQABgJAIgbIAABGQgLgOACgUg");
	this.shape_2.setTransform(17.8298,1.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#454545").s().p("AADAZQgHgBgHgKQgSgWAVgQQAAATAFAIQAFALASABQgHAKgIAAIgCAAg");
	this.shape_3.setTransform(10.272,1.7292);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#454545").s().p("AgPAPQgJgKAAgKQAAgLAMgJQgFAqAqgDQgJAMgLAAQgJAAgLgLg");
	this.shape_4.setTransform(19.775,22.7688);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#454545").s().p("AgrADIAAgFIBXAAIAAAFg");
	this.shape_5.setTransform(38.875,21.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#454545").s().p("AgSgnIAmBPQgrgmAFgpg");
	this.shape_6.setTransform(20.2903,9.2375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#959595").s().p("AgdABQAKgTAKgGQAMgIAQAOQAOALgEALQgEAKgQAJQgJAFgGAAQgRAAgGgbg");
	this.shape_7.setTransform(59.4297,-18.1222);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#959595").s().p("AgXgNQAMgLALgBQAOgBAIAMQAIAMgDALQgDAOgTADIgJAAQggAAANgng");
	this.shape_8.setTransform(11.7937,0.6392);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#959595").s().p("AgbgPQASgJAJgBQAPgCAKANQASAWggAQQgLADgHAAQghAAANgqg");
	this.shape_9.setTransform(21.21,21.7971);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#959595").s().p("AgXATQgIgHADgLQAKgTADgDQAKgKAPAEQAWAFgCAYQAAARgMAGQgIAFgRAAIgQgLg");
	this.shape_10.setTransform(39.2907,28.1929);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#959595").s().p("AgbAAQABgbAagBQAegBgBAaQgCAYgdAIQgbgEACgZg");
	this.shape_11.setTransform(58.3494,21.1481);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#959595").s().p("AgVAXQgIgHACgNQADgcAegDQAPABAFAHQADAHAAAMQgBAegcAAQgNAAgIgGg");
	this.shape_12.setTransform(18.4841,-17.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#959595").s().p("AgcAIQABgOAIgKQAJgKANgBQAOgCAGAJQAGAIAAAMQgBAdgeAAIgCAAQgZAAABgVg");
	this.shape_13.setTransform(39.4001,-26.759);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#808080").s().p("Aj1DqQhfhjABiHQABiPBjhkQBmhmCNALQCAgOBqBtQBmBqAACDQABCKhpBlQhjBgh8ADIgNABQiTAAhihng");
	this.shape_14.setTransform(39.5496,0.7044);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#575757").s().p("AhpJvQjvgfijjOQh4iggJjaQgBgmAMhLQAvkhEEiXQC3hqDUAbQDrAeCZCrQCmC4gGD3QAPAQgDAjQgPCPg+BuQgKATgZAPQhCBZg5AxQiqCSjoAAQgzAAg2gHg");
	this.shape_15.setTransform(40.0212,0.5172);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15,p:{rotation:0,x:40.0212,y:0.5172,scaleX:1,scaleY:1}},{t:this.shape_14,p:{rotation:0,x:39.5496,y:0.7044,scaleX:1,scaleY:1}},{t:this.shape_13,p:{rotation:0,x:39.4001,y:-26.759,scaleX:1,scaleY:1}},{t:this.shape_12,p:{rotation:0,x:18.4841,y:-17.85,scaleX:1,scaleY:1}},{t:this.shape_11,p:{rotation:0,x:58.3494,y:21.1481,scaleX:1,scaleY:1}},{t:this.shape_10,p:{rotation:0,x:39.2907,y:28.1929,scaleX:1,scaleY:1}},{t:this.shape_9,p:{rotation:0,x:21.21,y:21.7971,scaleX:1,scaleY:1}},{t:this.shape_8,p:{rotation:0,x:11.7937,y:0.6392,scaleX:1,scaleY:1}},{t:this.shape_7,p:{rotation:0,x:59.4297,y:-18.1222,scaleX:1,scaleY:1}},{t:this.shape_6,p:{rotation:0,x:20.2903,y:9.2375,scaleX:1,scaleY:1}},{t:this.shape_5,p:{rotation:0,x:38.875,y:21.65,scaleX:1,scaleY:1}},{t:this.shape_4,p:{rotation:0,x:19.775,y:22.7688,scaleX:1,scaleY:1}},{t:this.shape_3,p:{rotation:0,x:10.272,y:1.7292,scaleX:1,scaleY:1}},{t:this.shape_2,p:{rotation:0,x:17.8298,y:1.55,scaleX:1,scaleY:1}},{t:this.shape_1,p:{rotation:0,x:58.3688,y:-16.4404,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:0,x:37.0603,y:29.7,scaleX:1,scaleY:1}}]}).to({state:[{t:this.shape_15,p:{rotation:8.4533,x:40.0651,y:0.5498,scaleX:1,scaleY:1}},{t:this.shape_14,p:{rotation:8.4533,x:39.5712,y:0.6656,scaleX:1,scaleY:1}},{t:this.shape_13,p:{rotation:8.4533,x:43.4606,y:-26.5214,scaleX:1,scaleY:1}},{t:this.shape_12,p:{rotation:8.4533,x:21.4621,y:-20.7839,scaleX:1,scaleY:1}},{t:this.shape_11,p:{rotation:8.4533,x:55.1615,y:23.6509,scaleX:1,scaleY:1}},{t:this.shape_10,p:{rotation:8.4533,x:35.2742,y:27.8174,scaleX:1,scaleY:1}},{t:this.shape_9,p:{rotation:8.4533,x:18.3302,y:18.8332,scaleX:1,scaleY:1}},{t:this.shape_8,p:{rotation:8.4533,x:12.1264,y:-3.479,scaleX:1,scaleY:1}},{t:this.shape_7,p:{rotation:8.4533,x:62.0029,y:-15.034,scaleX:1,scaleY:1}},{t:this.shape_6,p:{rotation:8.4533,x:19.2667,y:6.2748,scaleX:1,scaleY:1}},{t:this.shape_5,p:{rotation:8.4533,x:35.8249,y:21.2845,scaleX:1,scaleY:1}},{t:this.shape_4,p:{rotation:8.4533,x:16.7679,y:19.5834,scaleX:1,scaleY:1}},{t:this.shape_3,p:{rotation:8.4533,x:10.4611,y:-2.6246,scaleX:1,scaleY:1}},{t:this.shape_2,p:{rotation:8.4533,x:17.9631,y:-1.6908,scaleX:1,scaleY:1}},{t:this.shape_1,p:{rotation:8.4533,x:60.7062,y:-13.5265,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:8.4533,x:32.8465,y:28.9803,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_15,p:{rotation:19.1784,x:40.0323,y:0.6519,scaleX:1,scaleY:1}},{t:this.shape_14,p:{rotation:19.1784,x:39.5255,y:0.6737,scaleX:1,scaleY:1}},{t:this.shape_13,p:{rotation:19.1784,x:48.4062,y:-25.3143,scaleX:1,scaleY:1}},{t:this.shape_12,p:{rotation:19.1784,x:25.7246,y:-23.7708,scaleX:1,scaleY:1}},{t:this.shape_11,p:{rotation:19.1784,x:50.5658,y:26.1585,scaleX:1,scaleY:1}},{t:this.shape_10,p:{rotation:19.1784,x:30.2508,y:26.5512,scaleX:1,scaleY:1}},{t:this.shape_9,p:{rotation:19.1784,x:15.2749,y:14.5709,scaleX:1,scaleY:1}},{t:this.shape_8,p:{rotation:19.1784,x:13.3317,y:-8.5058,scaleX:1,scaleY:1}},{t:this.shape_7,p:{rotation:19.1784,x:64.4867,y:-10.577,scaleX:1,scaleY:1}},{t:this.shape_6,p:{rotation:19.1784,x:18.5321,y:2.4063,scaleX:1,scaleY:1}},{t:this.shape_5,p:{rotation:19.1784,x:32.0076,y:20.235,scaleX:1,scaleY:1}},{t:this.shape_4,p:{rotation:19.1784,x:13.6003,y:15.0172,scaleX:1,scaleY:1}},{t:this.shape_3,p:{rotation:19.1784,x:11.5365,y:-7.9763,scaleX:1,scaleY:1}},{t:this.shape_2,p:{rotation:19.1784,x:18.7336,y:-5.6627,scaleX:1,scaleY:1}},{t:this.shape_1,p:{rotation:19.1784,x:62.9321,y:-9.3372,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:19.1784,x:27.6491,y:27.242,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_15,p:{rotation:34.177,x:40.0165,y:0.8278,scaleX:1,scaleY:1}},{t:this.shape_14,p:{rotation:34.177,x:39.5212,y:0.7177,scaleX:1,scaleY:1}},{t:this.shape_13,p:{rotation:34.177,x:54.8248,y:-22.0863,scaleX:1,scaleY:1}},{t:this.shape_12,p:{rotation:34.177,x:32.5167,y:-26.4653,scaleX:1,scaleY:1}},{t:this.shape_11,p:{rotation:34.177,x:43.5901,y:28.1911,scaleX:1,scaleY:1}},{t:this.shape_10,p:{rotation:34.177,x:23.8657,y:23.3131,scaleX:1,scaleY:1}},{t:this.shape_9,p:{rotation:34.177,x:12.5006,y:7.8654,scaleX:1,scaleY:1}},{t:this.shape_8,p:{rotation:34.177,x:16.5958,y:-14.9277,scaleX:1,scaleY:1}},{t:this.shape_7,p:{rotation:34.177,x:66.5434,y:-3.6898,scaleX:1,scaleY:1}},{t:this.shape_6,p:{rotation:34.177,x:18.7949,y:-3.0416,scaleX:1,scaleY:1}},{t:this.shape_5,p:{rotation:34.177,x:27.1972,y:17.6668,scaleX:1,scaleY:1}},{t:this.shape_4,p:{rotation:34.177,x:10.7676,y:7.8632,scaleX:1,scaleY:1}},{t:this.shape_3,p:{rotation:34.177,x:14.7247,y:-14.8808,scaleX:1,scaleY:1}},{t:this.shape_2,p:{rotation:34.177,x:21.0778,y:-10.7835,scaleX:1,scaleY:1}},{t:this.shape_1,p:{rotation:34.177,x:64.7209,y:-2.8945,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:34.177,x:21.174,y:23.3071,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_15,p:{rotation:49.176,x:39.9706,y:0.9631,scaleX:1,scaleY:1}},{t:this.shape_14,p:{rotation:49.176,x:39.5207,y:0.7287,scaleX:1,scaleY:1}},{t:this.shape_13,p:{rotation:49.176,x:60.2045,y:-17.3377,scaleX:1,scaleY:1}},{t:this.shape_12,p:{rotation:49.176,x:39.7899,y:-27.3409,scaleX:1,scaleY:1}},{t:this.shape_11,p:{rotation:49.176,x:36.3407,y:28.3189,scaleX:1,scaleY:1}},{t:this.shape_10,p:{rotation:49.176,x:18.5509,y:18.5024,scaleX:1,scaleY:1}},{t:this.shape_9,p:{rotation:49.176,x:11.571,y:0.6398,scaleX:1,scaleY:1}},{t:this.shape_8,p:{rotation:49.176,x:21.4255,y:-20.3168,scaleX:1,scaleY:1}},{t:this.shape_7,p:{rotation:49.176,x:66.7627,y:3.4647,scaleX:1,scaleY:1}},{t:this.shape_6,p:{rotation:49.176,x:20.4735,y:-8.2666,scaleX:1,scaleY:1}},{t:this.shape_5,p:{rotation:49.176,x:23.2302,y:13.9107,scaleX:1,scaleY:1}},{t:this.shape_4,p:{rotation:49.176,x:9.8976,y:0.1892,scaleX:1,scaleY:1}},{t:this.shape_3,p:{rotation:49.176,x:19.606,y:-20.7557,scaleX:1,scaleY:1}},{t:this.shape_2,p:{rotation:49.176,x:24.6822,y:-15.1538,scaleX:1,scaleY:1}},{t:this.shape_1,p:{rotation:49.176,x:64.7965,y:3.7612,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:49.176,x:15.9524,y:17.8,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_15,p:{rotation:64.1755,x:39.8856,y:1.1043,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_14,p:{rotation:64.1755,x:39.5117,y:0.7614,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_13,p:{rotation:64.1755,x:64.166,y:-11.336,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_12,p:{rotation:64.1755,x:47.0363,y:-26.2815,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_11,p:{rotation:64.1755,x:29.2997,y:26.588,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_10,p:{rotation:64.1755,x:14.6569,y:12.5021,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_9,p:{rotation:64.1755,x:12.5379,y:-6.5579,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_8,p:{rotation:64.1755,x:27.4801,y:-24.2497,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_7,p:{rotation:64.1755,x:65.1169,y:10.4545,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_6,p:{rotation:64.1755,x:23.442,y:-12.8566,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_5,p:{rotation:64.1755,x:20.365,y:9.278,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_4,p:{rotation:64.1755,x:11.0382,y:-7.4263,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_3,p:{rotation:64.1755,x:25.8362,y:-25.1445,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{rotation:64.1755,x:29.2896,y:-18.4199,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{rotation:64.1755,x:63.141,y:10.2321,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:64.1755,x:12.3289,y:11.1511,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.shape_15,p:{rotation:79.1755,x:39.924,y:1.2676,scaleX:1,scaleY:1}},{t:this.shape_14,p:{rotation:79.1755,x:39.6516,y:0.8396,scaleX:1,scaleY:1}},{t:this.shape_13,p:{rotation:79.1755,x:66.5967,y:-4.4646,scaleX:1,scaleY:1}},{t:this.shape_12,p:{rotation:79.1755,x:53.9189,y:-23.3342,scaleX:1,scaleY:1}},{t:this.shape_11,p:{rotation:79.1755,x:23.1033,y:23.1429,scaleX:1,scaleY:1}},{t:this.shape_10,p:{rotation:79.1755,x:12.6053,y:5.7473,scaleX:1,scaleY:1}},{t:this.shape_9,p:{rotation:79.1755,x:15.4915,y:-13.2116,scaleX:1,scaleY:1}},{t:this.shape_8,p:{rotation:79.1755,x:34.5033,y:-26.4331,scaleX:1,scaleY:1}},{t:this.shape_7,p:{rotation:79.1755,x:61.8754,y:16.8293,scaleX:1,scaleY:1}},{t:this.shape_6,p:{rotation:79.1755,x:27.6541,y:-16.4735,scaleX:1,scaleY:1}},{t:this.shape_5,p:{rotation:79.1755,x:18.9533,y:4.1104,scaleX:1,scaleY:1}},{t:this.shape_4,p:{rotation:79.1755,x:14.2676,y:-14.4385,scaleX:1,scaleY:1}},{t:this.shape_3,p:{rotation:79.1755,x:33.1471,y:-27.7229,scaleX:1,scaleY:1}},{t:this.shape_2,p:{rotation:79.1755,x:34.7424,y:-20.3336,scaleX:1,scaleY:1}},{t:this.shape_1,p:{rotation:79.1755,x:60.0244,y:16.1031,scaleX:1,scaleY:1}},{t:this.shape,p:{rotation:79.1755,x:10.7062,y:3.8398,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.shape_15,p:{rotation:94.1743,x:39.967,y:1.3604,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_14,p:{rotation:94.1743,x:39.8146,y:0.8765,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_13,p:{rotation:94.1743,x:67.2139,y:2.7264,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_12,p:{rotation:94.1743,x:59.8516,y:-18.781,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_11,p:{rotation:94.1743,x:18.0584,y:18.1371,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_10,p:{rotation:94.1743,x:12.4201,y:-1.3824,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_9,p:{rotation:94.1743,x:20.1144,y:-18.9481,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_8,p:{rotation:94.1743,x:41.8998,y:-26.7988,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_7,p:{rotation:94.1743,x:57.1428,y:22.0727,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_6,p:{rotation:94.1743,x:32.7066,y:-18.9512,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_5,p:{rotation:94.1743,x:18.9754,y:-1.3207,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_4,p:{rotation:94.1743,x:19.2498,y:-20.45,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_3,p:{rotation:94.1743,x:40.9236,y:-28.3956,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{rotation:94.1743,x:40.5522,y:-20.8454,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{rotation:94.1743,x:55.5429,y:20.8922,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:94.1743,x:11.0794,y:-3.7164,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.shape_15,p:{rotation:109.1735,x:39.9078,y:1.3861,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_14,p:{rotation:109.1735,x:39.8859,y:0.8793,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_13,p:{rotation:109.1735,x:65.8726,y:9.7571,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_12,p:{rotation:109.1735,x:64.3274,y:-12.9226,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_11,p:{rotation:109.1735,x:14.4041,y:11.921,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_10,p:{rotation:109.1735,x:14.0097,y:-8.3924,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_9,p:{rotation:109.1735,x:25.9878,y:-23.3682,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_8,p:{rotation:109.1735,x:49.0625,y:-25.3131,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_7,p:{rotation:109.1735,x:51.1379,y:25.8376,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_6,p:{rotation:109.1735,x:38.1516,y:-20.1122,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_5,p:{rotation:109.1735,x:20.3255,y:-6.6363,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_4,p:{rotation:109.1735,x:25.5413,y:-25.0426,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_3,p:{rotation:109.1735,x:48.5328,y:-27.1082,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{rotation:109.1735,x:46.2201,y:-19.9114,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{rotation:109.1735,x:49.898,y:24.2833,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:109.1735,x:13.3187,y:-10.9938,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.shape_15,p:{rotation:124.1724,x:39.83,y:1.4232,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_14,p:{rotation:124.1724,x:39.94,y:0.928,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_13,p:{rotation:124.1724,x:62.7436,y:16.2286,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_12,p:{rotation:124.1724,x:67.1205,y:-6.0785,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_11,p:{rotation:124.1724,x:12.4689,y:4.999,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_10,p:{rotation:124.1724,x:17.345,y:-14.7246,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_9,p:{rotation:124.1724,x:32.7907,y:-26.0904,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_8,p:{rotation:124.1724,x:55.5824,y:-21.9975,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_7,p:{rotation:124.1724,x:44.3494,y:27.9481,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_6,p:{rotation:124.1724,x:43.6974,y:-19.7974,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_5,p:{rotation:124.1724,x:22.9912,y:-11.3938,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_4,p:{rotation:124.1724,x:32.7927,y:-27.8233,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_3,p:{rotation:124.1724,x:55.5354,y:-23.8685,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{rotation:124.1724,x:51.4389,y:-17.5154,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{rotation:124.1724,x:43.554,y:26.1259,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:124.1724,x:17.3508,y:-17.4162,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.shape_15,p:{rotation:139.172,x:39.7437,y:1.3773,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_14,p:{rotation:139.172,x:39.9781,y:0.9274,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_13,p:{rotation:139.172,x:58.0445,y:21.6083,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_12,p:{rotation:139.172,x:68.0454,y:1.1946,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_11,p:{rotation:139.172,x:12.3898,y:-2.2504,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_10,p:{rotation:139.172,x:22.2043,y:-20.0394,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_9,p:{rotation:139.172,x:40.065,y:-27.02,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_8,p:{rotation:139.172,x:61.0206,y:-17.1678,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_7,p:{rotation:139.172,x:37.2442,y:28.1674,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_6,p:{rotation:139.172,x:48.9713,y:-18.1188,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_5,p:{rotation:139.172,x:26.796,y:-15.3609,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_4,p:{rotation:139.172,x:40.5155,y:-28.6933,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_3,p:{rotation:139.172,x:61.4593,y:-18.9872,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{rotation:139.172,x:55.8583,y:-13.9109,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{rotation:139.172,x:36.9475,y:26.2015,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:139.172,x:22.9065,y:-22.6377,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.shape_15,p:{rotation:154.1717,x:39.6496,y:1.2933,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_14,p:{rotation:154.1717,x:39.9924,y:0.9194,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_13,p:{rotation:154.1717,x:52.0907,y:25.5712,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_12,p:{rotation:154.1717,x:67.034,y:8.4416,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_11,p:{rotation:154.1717,x:14.1669,y:-9.2902,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_10,p:{rotation:154.1717,x:28.2509,y:-23.9328,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_9,p:{rotation:154.1717,x:47.3095,y:-26.053,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_8,p:{rotation:154.1717,x:65.001,y:-11.1131,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_7,p:{rotation:154.1717,x:30.3017,y:26.5235,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_6,p:{rotation:154.1717,x:53.6085,y:-15.1501,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_5,p:{rotation:154.1717,x:31.4752,y:-18.2254,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_4,p:{rotation:154.1717,x:48.1777,y:-27.5527,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_3,p:{rotation:154.1717,x:65.8957,y:-12.7568,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{rotation:154.1717,x:59.1717,y:-9.3032,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{rotation:154.1717,x:30.524,y:24.5477,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:154.1717,x:29.6016,y:-26.2608,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.shape_15,p:{rotation:169.1711,x:39.5344,y:1.3337,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_14,p:{rotation:169.1711,x:39.9624,y:1.0613,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_13,p:{rotation:169.1711,x:45.2682,y:28.0038,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_12,p:{rotation:169.1711,x:64.1353,y:15.3255,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_11,p:{rotation:169.1711,x:17.6595,y:-15.4841,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_10,p:{rotation:169.1711,x:35.0529,y:-25.9826,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_9,p:{rotation:169.1711,x:54.0106,y:-23.098,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_8,p:{rotation:169.1711,x:67.2324,y:-4.0887,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_7,p:{rotation:169.1711,x:23.9756,y:23.2845,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_6,p:{rotation:169.1711,x:57.2731,y:-10.9366,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_5,p:{rotation:169.1711,x:36.6902,y:-19.6352,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_4,p:{rotation:169.1711,x:55.2373,y:-24.3219,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_3,p:{rotation:169.1711,x:68.5221,y:-5.4449,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{rotation:169.1711,x:61.1335,y:-3.8492,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{rotation:169.1711,x:24.7016,y:21.4336,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:169.1711,x:36.9601,y:-27.8816,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.shape_15,p:{rotation:-175.8298,x:39.4886,y:1.3757,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_14,p:{rotation:-175.8298,x:39.9725,y:1.2233,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_13,p:{rotation:-175.8298,x:38.1247,y:28.6209,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_12,p:{rotation:-175.8298,x:59.6301,y:21.2576,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_11,p:{rotation:-175.8298,x:22.7116,y:-20.5302,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_10,p:{rotation:-175.8298,x:42.2293,y:-26.1695,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_9,p:{rotation:-175.8298,x:59.7945,y:-18.477,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_8,p:{rotation:-175.8298,x:67.6462,y:3.3064,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_7,p:{rotation:-175.8298,x:18.779,y:18.5519,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_6,p:{rotation:-175.8298,x:59.7984,y:-5.8856,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_5,p:{rotation:-175.8298,x:42.1681,y:-19.6147,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_4,p:{rotation:-175.8298,x:61.2961,y:-19.3417,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_3,p:{rotation:-175.8298,x:69.2428,y:2.3301,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{rotation:-175.8298,x:61.6931,y:1.9593,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{rotation:-175.8298,x:19.9593,y:16.952,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:-175.8298,x:44.563,y:-27.5103,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.shape_15,p:{rotation:-160.8309,x:39.51,y:1.3156,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_14,p:{rotation:-160.8309,x:40.0168,y:1.2936,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_13,p:{rotation:-160.8309,x:31.1415,y:27.2795,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_12,p:{rotation:-160.8309,x:53.8198,y:25.7326,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_11,p:{rotation:-160.8309,x:28.9739,y:-24.1858,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_10,p:{rotation:-160.8309,x:49.2861,y:-24.5818,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_9,p:{rotation:-160.8309,x:64.2618,y:-12.6055,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_8,p:{rotation:-160.8309,x:66.2084,y:10.4677,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_7,p:{rotation:-160.8309,x:15.0609,y:12.5469,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_6,p:{rotation:-160.8309,x:61.007,y:-0.4421,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_5,p:{rotation:-160.8309,x:47.5305,y:-18.2662,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_4,p:{rotation:-160.8309,x:65.9361,y:-13.0521,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_3,p:{rotation:-160.8309,x:68.0033,y:9.9379,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{rotation:-160.8309,x:60.8068,y:7.6258,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{rotation:-160.8309,x:16.615,y:11.307,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{rotation:-160.8309,x:51.8872,y:-25.2729,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.shape_15,p:{rotation:-145.8314,x:39.5229,y:1.2368,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_14,p:{rotation:-145.8314,x:40.0182,y:1.3467,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_13,p:{rotation:-145.8314,x:24.72,y:24.1499,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_12,p:{rotation:-145.8314,x:47.0257,y:28.5251,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_11,p:{rotation:-145.8314,x:35.9458,y:-26.1223,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_10,p:{rotation:-145.8314,x:55.6682,y:-21.2478,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_9,p:{rotation:-145.8314,x:67.034,y:-5.8039,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_8,p:{rotation:-145.8314,x:62.9428,y:16.9867,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_7,p:{rotation:-145.8314,x:13.0004,y:5.7577,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_6,p:{rotation:-145.8314,x:60.7422,y:5.1025,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_5,p:{rotation:-145.8314,x:52.338,y:-15.6018,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_4,p:{rotation:-145.8314,x:68.7668,y:-5.802,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_3,p:{rotation:-145.8314,x:64.8136,y:16.9395,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_2,p:{rotation:-145.8314,x:58.4608,y:12.8437,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_1,p:{rotation:-145.8314,x:14.8224,y:4.9622,scaleX:0.9998,scaleY:0.9998}},{t:this.shape,p:{rotation:-145.8314,x:58.3596,y:-21.2422,scaleX:0.9998,scaleY:0.9998}}]},1).to({state:[{t:this.shape_15,p:{rotation:-130.832,x:39.566,y:1.1485,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_14,p:{rotation:-130.832,x:40.0158,y:1.3829,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_13,p:{rotation:-130.832,x:19.3375,y:19.4497,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_12,p:{rotation:-130.832,x:39.7506,y:29.4486,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_11,p:{rotation:-130.832,x:43.1915,y:-26.2039,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_10,p:{rotation:-130.832,x:60.9801,y:-16.3913,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_9,p:{rotation:-130.832,x:67.9616,y:1.4678,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_8,p:{rotation:-130.832,x:58.1115,y:22.4229,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_7,p:{rotation:-130.832,x:12.7772,y:-1.3489,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_6,p:{rotation:-130.832,x:59.0616,y:10.3742,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_5,p:{rotation:-130.832,x:56.3022,y:-11.7996,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_4,p:{rotation:-130.832,x:69.6349,y:1.9182,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_3,p:{rotation:-130.832,x:59.9308,y:22.8615,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_2,p:{rotation:-130.832,x:54.8544,y:17.2611,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_1,p:{rotation:-130.832,x:14.7431,y:-1.6457,scaleX:0.9998,scaleY:0.9998}},{t:this.shape,p:{rotation:-130.832,x:63.5783,y:-15.6893,scaleX:0.9998,scaleY:0.9998}}]},1).to({state:[{t:this.shape_15,p:{rotation:-115.833,x:39.648,y:1.0525,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_14,p:{rotation:-115.833,x:40.0219,y:1.3953,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_13,p:{rotation:-115.833,x:15.3726,y:13.4948,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_12,p:{rotation:-115.833,x:32.5023,y:28.4358,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_11,p:{rotation:-115.833,x:50.2288,y:-24.4294,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_10,p:{rotation:-115.833,x:64.8716,y:-10.3475,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_9,p:{rotation:-115.833,x:66.9932,y:8.7097,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_8,p:{rotation:-115.833,x:52.0556,y:26.4013,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_7,p:{rotation:-115.833,x:14.4187,y:-8.2927,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_6,p:{rotation:-115.833,x:56.0915,y:15.0092,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_5,p:{rotation:-115.833,x:59.1648,y:-7.1229,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_4,p:{rotation:-115.833,x:68.4929,y:9.5778,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_3,p:{rotation:-115.833,x:53.6994,y:27.2958,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_2,p:{rotation:-115.833,x:50.2455,y:20.5726,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_1,p:{rotation:-115.833,x:16.3943,y:-8.0706,scaleX:0.9998,scaleY:0.9998}},{t:this.shape,p:{rotation:-115.833,x:67.1996,y:-8.997,scaleX:0.9998,scaleY:0.9998}}]},1).to({state:[{t:this.shape_15,p:{rotation:-100.8332,x:39.6576,y:0.9355,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_14,p:{rotation:-100.8332,x:39.9301,y:1.3633,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_13,p:{rotation:-100.8332,x:12.9896,y:6.6708,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_12,p:{rotation:-100.8332,x:25.6685,y:25.5358,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_11,p:{rotation:-100.8332,x:56.4727,y:-20.9394,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_10,p:{rotation:-100.8332,x:66.9718,y:-3.5478,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_9,p:{rotation:-100.8332,x:64.0889,y:15.4088,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_8,p:{rotation:-100.8332,x:45.0817,y:28.6313,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_7,p:{rotation:-100.8332,x:17.707,y:-14.6208,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_6,p:{rotation:-100.8332,x:51.9284,y:18.6721,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_5,p:{rotation:-100.8332,x:60.625,y:-1.9102,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_4,p:{rotation:-100.8332,x:65.3127,y:16.6354,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_3,p:{rotation:-100.8332,x:46.438,y:29.9207,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_2,p:{rotation:-100.8332,x:44.8418,y:22.5328,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_1,p:{rotation:-100.8332,x:19.5578,y:-13.895,scaleX:0.9998,scaleY:0.9998}},{t:this.shape,p:{rotation:-100.8332,x:68.8709,y:-1.6409,scaleX:0.9998,scaleY:0.9998}}]},1).to({state:[{t:this.shape_15,p:{rotation:-85.8348,x:39.6146,y:0.8868,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_14,p:{rotation:-85.8348,x:39.767,y:1.3706,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_13,p:{rotation:-85.8348,x:12.3711,y:-0.4747,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_12,p:{rotation:-85.8348,x:19.7359,y:21.0286,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_11,p:{rotation:-85.8348,x:61.5176,y:-15.8911,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_10,p:{rotation:-85.8348,x:67.1582,y:3.6249,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_9,p:{rotation:-85.8348,x:59.4678,y:21.1895,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_8,p:{rotation:-85.8348,x:37.6865,y:29.0425,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_7,p:{rotation:-85.8348,x:22.4378,y:-19.82,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_6,p:{rotation:-85.8348,x:46.8772,y:21.1946,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_5,p:{rotation:-85.8348,x:60.6039,y:3.5642,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_4,p:{rotation:-85.8348,x:60.3325,y:22.691,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_3,p:{rotation:-85.8348,x:38.6628,y:30.639,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_2,p:{rotation:-85.8348,x:39.033,y:23.0898,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_1,p:{rotation:-85.8348,x:24.0377,y:-18.6399,scaleX:0.9998,scaleY:0.9998}},{t:this.shape,p:{rotation:-85.8348,x:68.4991,y:5.9583,scaleX:0.9998,scaleY:0.9998}}]},1).to({state:[{t:this.shape_15,p:{rotation:-70.8358,x:39.7247,y:0.9062,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_14,p:{rotation:-70.8358,x:39.7467,y:1.413,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_13,p:{rotation:-70.8358,x:13.7621,y:-7.4594,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_12,p:{rotation:-70.8358,x:15.3108,y:15.217,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_11,p:{rotation:-70.8358,x:65.2232,y:-9.6313,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_10,p:{rotation:-70.8358,x:65.6209,y:10.6793,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_9,p:{rotation:-70.8358,x:53.6469,y:25.6549,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_8,p:{rotation:-70.8358,x:30.5757,y:27.6033,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_7,p:{rotation:-70.8358,x:28.4922,y:-23.5401,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_6,p:{rotation:-70.8358,x:41.4842,y:22.4014,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_5,p:{rotation:-70.8358,x:59.3056,y:8.9244,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_4,p:{rotation:-70.8358,x:54.0936,y:27.329,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_3,p:{rotation:-70.8358,x:31.1055,y:29.398,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_2,p:{rotation:-70.8358,x:33.4168,y:22.2019,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_1,p:{rotation:-70.8358,x:29.7322,y:-21.9862,scaleX:0.9998,scaleY:0.9998}},{t:this.shape,p:{rotation:-70.8358,x:66.3122,y:13.2801,scaleX:0.9998,scaleY:0.9998}}]},1).to({state:[{t:this.shape_15,p:{rotation:-55.8367,x:39.8545,y:0.9162,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_14,p:{rotation:-55.8367,x:39.7446,y:1.4114,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_13,p:{rotation:-55.8367,x:16.9418,y:-13.8834,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_12,p:{rotation:-55.8367,x:12.5691,y:8.4209,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_11,p:{rotation:-55.8367,x:67.211,y:-2.6631,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_10,p:{rotation:-55.8367,x:62.3388,y:17.0581,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_9,p:{rotation:-55.8367,x:46.8972,y:28.4244,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_8,p:{rotation:-55.8367,x:24.1081,y:24.3356,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_7,p:{rotation:-55.8367,x:35.3315,y:-25.6038,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_6,p:{rotation:-55.8367,x:35.991,y:22.1341,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_5,p:{rotation:-55.8367,x:56.6929,y:13.7287,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_4,p:{rotation:-55.8367,x:46.8954,y:30.1571,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_3,p:{rotation:-55.8367,x:24.1554,y:26.2063,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_2,p:{rotation:-55.8367,x:28.2503,y:19.8536,scaleX:0.9998,scaleY:0.9998}},{t:this.shape_1,p:{rotation:-55.8367,x:36.1271,y:-23.7819,scaleX:0.9998,scaleY:0.9998}},{t:this.shape,p:{rotation:-55.8367,x:62.3334,y:19.7492,scaleX:0.9998,scaleY:0.9998}}]},1).to({state:[{t:this.shape_15,p:{rotation:-40.8373,x:39.9946,y:1.0073,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_14,p:{rotation:-40.8373,x:39.7603,y:1.4572,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_13,p:{rotation:-40.8373,x:21.6931,y:-19.2179,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_12,p:{rotation:-40.8373,x:11.6969,y:1.1945,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_11,p:{rotation:-40.8373,x:67.3452,y:4.63,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_10,p:{rotation:-40.8373,x:57.535,y:22.4181,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_9,p:{rotation:-40.8373,x:39.678,y:29.4007,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_8,p:{rotation:-40.8373,x:18.7238,y:19.5532,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_7,p:{rotation:-40.8373,x:42.4894,y:-25.7794,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_6,p:{rotation:-40.8373,x:30.7715,y:20.5021,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_5,p:{rotation:-40.8373,x:52.9432,y:17.741,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_4,p:{rotation:-40.8373,x:39.2278,y:31.0738,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_3,p:{rotation:-40.8373,x:18.2854,y:21.3724,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_2,p:{rotation:-40.8373,x:23.8848,y:16.296,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_1,p:{rotation:-40.8373,x:42.7863,y:-23.8138,scaleX:0.9997,scaleY:0.9997}},{t:this.shape,p:{rotation:-40.8373,x:56.8333,y:25.0162,scaleX:0.9997,scaleY:0.9997}}]},1).to({state:[{t:this.shape_15,p:{rotation:-25.838,x:40.1435,y:1.1384,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_14,p:{rotation:-25.838,x:39.8008,y:1.5123,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_13,p:{rotation:-25.838,x:27.7001,y:-23.1341,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_12,p:{rotation:-25.838,x:12.7617,y:-6.0044,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_11,p:{rotation:-25.838,x:65.6245,y:11.7161,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_10,p:{rotation:-25.838,x:51.5449,y:26.3591,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_9,p:{rotation:-25.838,x:32.4893,y:28.4822,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_8,p:{rotation:-25.838,x:14.7978,y:13.5473,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_7,p:{rotation:-25.838,x:49.4858,y:-24.0899,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_6,p:{rotation:-25.838,x:26.1894,y:17.5819,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_5,p:{rotation:-25.838,x:48.3201,y:20.6529,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_4,p:{rotation:-25.838,x:31.6215,y:29.9818,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_3,p:{rotation:-25.838,x:13.9035,y:15.191,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_2,p:{rotation:-25.838,x:20.6259,y:11.7367,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_1,p:{rotation:-25.838,x:49.2639,y:-22.1144,scaleX:0.9997,scaleY:0.9997}},{t:this.shape,p:{rotation:-25.838,x:50.1948,y:28.687,scaleX:0.9997,scaleY:0.9997}}]},1).to({state:[{t:this.shape_15,p:{rotation:-10.8385,x:40.2635,y:1.147,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_14,p:{rotation:-10.8385,x:39.8357,y:1.4195,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_13,p:{rotation:-10.8385,x:34.5261,y:-25.5185,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_12,p:{rotation:-10.8385,x:15.6637,y:-12.8388,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_11,p:{rotation:-10.8385,x:62.1382,y:17.9588,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_10,p:{rotation:-10.8385,x:44.749,y:28.4587,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_9,p:{rotation:-10.8385,x:25.7935,y:25.5777,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_8,p:{rotation:-10.8385,x:12.5703,y:6.5732,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_7,p:{rotation:-10.8385,x:55.8166,y:-20.8034,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_6,p:{rotation:-10.8385,x:22.5294,y:13.4185,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_5,p:{rotation:-10.8385,x:43.1108,y:22.1125,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_4,p:{rotation:-10.8385,x:24.5671,y:26.8016,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_3,p:{rotation:-10.8385,x:11.2811,y:7.9295,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_2,p:{rotation:-10.8385,x:18.6683,y:6.3328,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_1,p:{rotation:-10.8385,x:55.091,y:-18.9526,scaleX:0.9997,scaleY:0.9997}},{t:this.shape,p:{rotation:-10.8385,x:42.8423,y:30.3578,scaleX:0.9997,scaleY:0.9997}}]},1).to({state:[{t:this.shape_15,p:{rotation:4.1603,x:40.3641,y:1.154,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_14,p:{rotation:4.1603,x:39.8804,y:1.3064,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_13,p:{rotation:4.1603,x:41.7232,y:-26.0874,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_12,p:{rotation:4.1603,x:20.2222,y:-18.7214,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_11,p:{rotation:4.1603,x:57.1425,y:23.0537,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_10,p:{rotation:4.1603,x:37.6286,y:28.6956,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_9,p:{rotation:4.1603,x:20.0648,y:21.0072,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_8,p:{rotation:4.1603,x:12.2105,y:-0.7716,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_7,p:{rotation:4.1603,x:61.0677,y:-16.0232,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_6,p:{rotation:4.1603,x:20.0587,y:8.4177,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_5,p:{rotation:4.1603,x:37.6887,y:22.1417,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_4,p:{rotation:4.1603,x:18.5635,y:21.872,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_3,p:{rotation:4.1603,x:10.6143,y:0.2048,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_2,p:{rotation:4.1603,x:18.1629,y:0.5743,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_1,p:{rotation:4.1603,x:59.8878,y:-14.4233,scaleX:0.9997,scaleY:0.9997}},{t:this.shape,p:{rotation:4.1603,x:35.2955,y:30.0365,scaleX:0.9997,scaleY:0.9997}}]},1).to({state:[{t:this.shape_15,p:{rotation:19.1593,x:40.3476,y:1.215,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_14,p:{rotation:19.1593,x:39.8409,y:1.2371,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_13,p:{rotation:19.1593,x:48.7103,y:-24.7463,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_12,p:{rotation:19.1593,x:26.0359,y:-23.1957,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_11,p:{rotation:19.1593,x:50.8865,y:26.7106,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_10,p:{rotation:19.1593,x:30.5776,y:27.11,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_9,p:{rotation:19.1593,x:15.6021,y:15.1382,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_8,p:{rotation:19.1593,x:13.6518,y:-7.931,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_7,p:{rotation:19.1593,x:64.791,y:-10.0187,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_6,p:{rotation:19.1593,x:18.8543,y:2.9762,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_5,p:{rotation:19.1593,x:32.3317,y:20.7951,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_4,p:{rotation:19.1593,x:13.9281,y:15.585,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_3,p:{rotation:19.1593,x:11.8573,y:-7.401,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_2,p:{rotation:19.1593,x:19.053,y:-5.0905,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_1,p:{rotation:19.1593,x:63.2373,y:-8.7787,scaleX:0.9997,scaleY:0.9997}},{t:this.shape,p:{rotation:19.1593,x:27.9769,y:27.8015,scaleX:0.9997,scaleY:0.9997}}]},1).to({state:[{t:this.shape_15,p:{rotation:34.158,x:40.3405,y:1.3957,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_14,p:{rotation:34.158,x:39.8453,y:1.2859,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_13,p:{rotation:34.158,x:55.1368,y:-21.5164,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_12,p:{rotation:34.158,x:32.8339,y:-25.8867,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_11,p:{rotation:34.158,x:43.9221,y:28.7497,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_10,p:{rotation:34.158,x:24.202,y:23.8797,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_9,p:{rotation:34.158,x:12.8352,y:8.4404,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_8,p:{rotation:34.158,x:16.9216,y:-14.3472,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_7,p:{rotation:34.158,x:66.8579,y:-3.1293,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_6,p:{rotation:34.158,x:19.124,y:-2.4654,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_5,p:{rotation:34.158,x:27.5307,y:18.234,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_4,p:{rotation:34.158,x:11.1027,y:8.4388,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_3,p:{rotation:34.158,x:15.051,y:-14.2997,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_2,p:{rotation:34.158,x:21.4036,y:-10.2058,scaleX:0.9997,scaleY:0.9997}},{t:this.shape_1,p:{rotation:34.158,x:65.0363,y:-2.3337,scaleX:0.9997,scaleY:0.9997}},{t:this.shape,p:{rotation:34.158,x:21.5111,y:23.8746,scaleX:0.9997,scaleY:0.9997}}]},1).to({state:[{t:this.shape_15,p:{rotation:49.1581,x:40.3004,y:1.5369,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_14,p:{rotation:49.1581,x:39.8506,y:1.3026,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_13,p:{rotation:49.1581,x:60.5222,y:-16.7646,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_12,p:{rotation:49.1581,x:40.1109,y:-26.7582,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_11,p:{rotation:49.1581,x:36.6802,y:28.8852,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_10,p:{rotation:49.1581,x:18.893,y:19.0773,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_9,p:{rotation:49.1581,x:11.9096,y:1.2225,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_8,p:{rotation:49.1581,x:21.7545,y:-19.7306,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_7,p:{rotation:49.1581,x:67.0849,y:4.0293,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_6,p:{rotation:49.1581,x:20.8066,y:-7.6838,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_5,p:{rotation:49.1581,x:23.5693,y:14.4856,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_4,p:{rotation:49.1581,x:10.2366,y:0.7725,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_3,p:{rotation:49.1581,x:19.9354,y:-20.1688,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_2,p:{rotation:49.1581,x:25.0118,y:-14.5703,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_1,p:{rotation:49.1581,x:65.1194,y:4.3263,scaleX:0.9996,scaleY:0.9996}},{t:this.shape,p:{rotation:49.1581,x:16.2951,y:18.3759,scaleX:0.9996,scaleY:0.9996}}]},1).to({state:[{t:this.shape_15,p:{rotation:64.1566,x:40.2222,y:1.6886,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_14,p:{rotation:64.1566,x:39.8483,y:1.346,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_13,p:{rotation:64.1566,x:64.4913,y:-10.756,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_12,p:{rotation:64.1566,x:47.3617,y:-25.6914,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_11,p:{rotation:64.1566,x:29.6479,y:27.1683,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_10,p:{rotation:64.1566,x:15.0049,y:13.0914,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_9,p:{rotation:64.1566,x:12.8802,y:-5.9623,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_8,p:{rotation:64.1566,x:27.8121,y:-23.6537,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_7,p:{rotation:64.1566,x:65.4491,y:11.0277,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_6,p:{rotation:64.1566,x:23.7789,y:-12.2627,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_5,p:{rotation:64.1566,x:20.7102,y:9.8663,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_4,p:{rotation:64.1566,x:11.3806,y:-6.8299,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_3,p:{rotation:64.1566,x:26.1684,y:-24.5477,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_2,p:{rotation:64.1566,x:29.623,y:-17.8262,scaleX:0.9996,scaleY:0.9996}},{t:this.shape_1,p:{rotation:64.1566,x:63.4738,y:10.806,scaleX:0.9996,scaleY:0.9996}},{t:this.shape,p:{rotation:64.1566,x:12.6771,y:11.7416,scaleX:0.9996,scaleY:0.9996}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.4,-63,128.7,128.8);


(lib.ambulanceVE = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.MDALOGONEWpngcopy();
	this.instance.setTransform(-279,-165,0.1175,0.1175);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6391B9").s().p("AgdgWQAdAPAFAEQARAKAIAPIg7ABg");
	this.shape.setTransform(311,11.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6391B9").s().p("AgmATQgMgPACg/IAzA6QAgAhAOAcQhLgagMgPg");
	this.shape_1.setTransform(312.9607,-12.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#858585").s().p("AgeFPQgEgJAAgbIAApWQAAgZADgIQAHgQAXgBQAYgBAHAQQAFAJAAAbIAAJWQAAAZgDAIQgGAQgXABIgDAAQgWAAgIgPg");
	this.shape_2.setTransform(302.45,-9.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6391B9").s().p("ACLHLIh3lKIjbpLIAyAAIABAMQAAAIACAEIFaN9g");
	this.shape_3.setTransform(221.975,-33.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A5C0D7").s().p("ACbHLQgNgFgIgNIgLgZIk9s3QgHgUgBgFQgCgPAKgLIAxAAICXGKIDGILg");
	this.shape_4.setTransform(226.5333,-33.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6391B9").s().p("ACIHLQgMgJgIgQIgMgeQjOofhpkPQgHgSgBgGQgDgNAFgLIAzAAICjGNIDYIIg");
	this.shape_5.setTransform(233.3083,-33.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A5C0D7").s().p("ACdHLIhHiuIjboYIgrhmQgZg9gLgsIBPAAQAQAMAJAYIE3M5IAJAbQADAQgJANg");
	this.shape_6.setTransform(215.311,-33.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A5C0D7").s().p("ACBHLQgSgOgLgaQjkokh0kRQgJgSgCgJQgFgQAKgNQAOAAAtAHQAlAGAXgDQgBALAFANIAKAXIBVC/IEiKdg");
	this.shape_7.setTransform(242.1277,-33.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#6391B9").s().p("AAVFaQgsAAgegFQgZgFgJgMQgHgKAAgZIABpfQgBgKABgEQABgJALgFICwDMIAAHpIhKgBg");
	this.shape_8.setTransform(284.375,-21.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#6391B9").s().p("AC2HGQgMgFgIgNQgFgHgHgRIleslIgNgdQgEgRALgOQBcgBBcAgQBOAcBaA4QAoAZAQAjQAOAfgBAzQgDB5AAC0IABEuIAAAhQgEAOgUAAIgHAAg");
	this.shape_9.setTransform(249.663,-33.0594);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#6391B9").s().p("AChHDIhXAAIiaAAQgvgCgjgfQgkgfgDguIgKh2QgEgwgGiFQgGhxgHhDQgCgVgDg/QgCg1gFgfQgQhZAdgkQAdglBSALQAPAOALAcIFUM8IAIAXQADAOgIAKQgkgIgygBg");
	this.shape_10.setTransform(206.2929,-33.6911);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7EBC8").s().p("ADDBPIgDgJQgbhRgZgSQgagThrgHIhpgHQg8gGgtgQIFMABQAjABAUAWQAUAVAAAkIAABYQgHgBgCgFg");
	this.shape_11.setTransform(447.475,55.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#8B8B8B").s().p("Ah8CbQANgMAQABQAMABASAJIAbAAIAbABQA0AGARgnQAKgWgCgWQgCgWgPgSQgOgSgXgXIgmgpQgpgkgPgSQgdgggNghIAAggQAyAyBFBSIBxCIQAQATABAWQABASgJAYQgHAWgTAKQgQAHgaAAIitABg");
	this.shape_12.setTransform(320.5553,-2.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#575757").s().p("AhnGKQgigDgNgVQgNgUgCg3IAAgpQgLgMgDgRQgBgKAAgWIAAlvQAAgXABgIQADgSALgMIABhGQABgqAVgYQAVgYAiABQAcABARAZQASAZAAAmIABDRQAIARADAMQgMBOBPAYQAKAEARAJQAYAPAWAbQAMAOAYAkQAeArgWApQgWAog1ADQggADgWgGQgKgDgQgNQgQgNgJgCQgEAFAAAJIAAAOQAAAUgLAPQgCA9gRAVQgOARggAAIgPgBg");
	this.shape_13.setTransform(310.4529,-12.0373);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8B8B8B").s().p("AGyHvQhigIgzACQgjACgyAAIhVgBQhKAAi9gHQiogGhhACQgtABgkghQgkgggFgtQgPiagFhNIgJivQgFhqgIhGQgCgUgCg+QgCgzgGgeQgLg3AbghQAbgiA4gCQA9gDB7AIQB6AIA+gDQBZgEBbAZQD0BDCMCsIBCBTQAoAvAjAdQARARgNAXQgZAAgTgVQgTgagLgMQgNgNgkgqQgegkgVgTQgFALAAAPIAAAWIAAIBQAAA2ANANQAMANA2ADQARACAjgCQAeAAATAPQAMAZgRAQIgSAAQgvAAhUgGg");
	this.shape_14.setTransform(235.5641,-32.5673);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#7F7F7F").s().p("AgnEhIABpAIA7ABQgDBlALC6QALDGAABag");
	this.shape_15.setTransform(112.976,147.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C9403D").s().p("AjjBYIgChiQgBg8AKgnIACBSQABAvgCAiQgCAcAMAKQAKAJAcAAQBTgBB1AAIDJABIgGAFQgEACgCAAImiACQgcAAABgWg");
	this.shape_16.setTransform(445.8406,56.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CCAE2A").s().p("AgdDCIgBmOIAoAAIAGAYQADAOABAKQABA6gBBzQAABpAKBFIABAEQgQAKgPAAQgOAAgPgLg");
	this.shape_17.setTransform(112,99.0628);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#A2BEC2").s().p("AgUFmIABrLIAnAAIABLLg");
	this.shape_18.setTransform(-143.975,114.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#B2454A").s().p("AAIBwQipgBgsABQgOAAgHgFQgGgHAAgOIAAhdQgBg6AEgkIAEgFIADgCIGwgDQAWAAgBAPIACBmQACA/gOAoQhDADhkAAIguAAg");
	this.shape_19.setTransform(446.7297,55.6841);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E7D93B").s().p("AL4FgQgMgIgIgYQhRjri9iUQkwjwl3A0QkTAnjOC/QiPCChTDbQgGATgEADQgGAKgPgCIAArMIA8gBIV7AAIGfABQAMAMADATQACAIAAAbQABEkgBElQAAAYgCAKQgDATgMAMIhEAAIhDACIgHAAQgSAAgLgIg");
	this.shape_20.setTransform(-239.1,114.4107);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CCAE2A").s().p("AoXFIQgCgJAAgaIAApJQAAgaACgJQACgSAMgMIQjAAIAALLIwiAAQgMgMgDgSg");
	this.shape_21.setTransform(-89.775,114.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E7D93B").s().p("ArTFnQgMgMgDgUQgCgIAAgaIAApIQAAgaACgIQADgTAMgNIFigBIRGABQAKALAEAQQACAJAAAUIAACrQABBlgCBGQACA2gBBNIAACEQAAAVgCAIQgDAQgLAKg");
	this.shape_22.setTransform(36.4925,114.325);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#A2BEC2").s().p("AgTEEIAAnaQgBgaAHgJQAJgNAYAFIAAIFg");
	this.shape_23.setTransform(-143.9767,9.2904);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFF99").s().p("AjZDZQgIgJABgVIAAi5IAAi8QgBgVAIgJQAIgJAVABQC9ABC+gBQAUgBAHAJQAHAIAAATQgBC9ABC+QAAATgHAIQgHAIgUAAQi+gBi9ABIgCAAQgTAAgIgIg");
	this.shape_24.setTransform(-395.4266,-172.0251);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FF0000").s().p("AjZDZQgIgIABgTQABi+gBi9QgBgTAHgIQAIgJAUABQC9ABC+gBQAVgBAIAJQAIAIgBAWIAAC4IAAC9QABAVgIAJQgIAJgVgBQi9gBi+ABIgCAAQgSAAgHgIg");
	this.shape_25.setTransform(-337.4251,-172.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FF0000").s().p("AC+DhQi+gBi9ABQgUAAgIgHQgIgIABgUIAAi9IAAi4QgBgXAIgJQAIgKAYAAQCRADDkgCQAWgBAIAJQAIAIAAAVQgCC7ACC7QAAAVgHAIQgIAKgTAAIgCgBg");
	this.shape_26.setTransform(7.4984,-172.0488);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFF99").s().p("AjZDYQgIgKABgYIABhaIgBhaIABhbIgBhdQgBgYAJgKQAJgJAZAAQCOADDegCQAYgBAJAIQALAJAAAYQgCC4ACC5QAAAXgIAJQgJAJgXgBQjhgCiQADIgCAAQgXAAgJgKg");
	this.shape_27.setTransform(65.4961,-172.0251);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#CCAE2A").s().p("AoJEYQgLgMgEgRQgBgJAAgXQgBiEABkHQAAgXACgKQADgRALgLQgDgZAMgJQAKgIAZAAQJFADGDgDQAdAAAKAMQAIAJABAdQgCCpABFUg");
	this.shape_28.setTransform(-89.75,7.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CCAE2A").s().p("AhPLeIAB27ICeABQgmBPgMA3QgiCSgPC9QgHBXgLD7QgFCGABDDIACFKg");
	this.shape_29.setTransform(116.95,-38.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#CCAE2A").s().p("ApcDgQABhagBgxQgChNgIg8QgGgqgSgvQgMgfgYg0IATAFQBvBOCHAsQB5AnCUAOID6AXQCUAOBmAOQBpAPBPA1QBQA4AzBdIk/ABg");
	this.shape_30.setTransform(415.45,12.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CCAE2A").s().p("AoeloIQtADQAMAMACATQABAHAAAbQABEkgBEkQAAAagBAJQgDASgLANIhBABIvrACg");
	this.shape_31.setTransform(-386.575,114.4);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#E7D93B").s().p("AbwDEIrcAAQm0AAkpACQhPAAgqgNQg7gSglg2QgFgIgOgKIgXgQQkQjVliAhQk+AejcDkIgaAbQgRANgVAAQiigCo3gBQgSgUgEgeQgCgOgBgoQgBglABhXQgBhQgBgsIAAgWQAAgNAHgIMA7WgADQANAMAAAXIABAkQAMBHAMBhIAWCqQg7gJhiAAg");
	this.shape_32.setTransform(305.6,98.775);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#8B8B8B").s().p("EApZAHHMgrBAAAIgoAAQgXgBgRgFQgUgHgEgUIgDglQgSkHjLilQjLinkIAeQjHAXibCSQieCVgZDJQgCARgCAjQgDAegPATIg8gCQuxAAjsACQglAAgMgNQgMgNACgjQADgoAAg8IgBhjQAQgPAZgDQAPgBAeABIPEABQAVADALgOIAOgfQBPi9BvhxQEPkTF+ACQFaADEDDyQCSCHBGC+QAKAcASAMQARAMAegCQAngDBQABIAWAAQAPAAAHgBQIOgDINADIAKAAIK0gBIKzAAQAUAAAKACQAQADAMAJQAQAsgBBCIgDBuQACAcgQASQgTALgbACIgvAAg");
	this.shape_33.setTransform(-165.1187,132.5493);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#E7D93B").s().p("Ay5LfQgOgQgCgXIAAgqQgBlmABhkQAEkCARjHQALiBAJhAQAPhrAahTQAKggAJgRQANgYAVgOICTgBQBXgBA9ABIF6gDQDlgCCWAQQDwAZCrClQBcBYB9CQIDRDwQA3A7BqB6QBgBnBTA9QAkAgATA9QAbBbABB3QABAZADAxQAAArgRAdMglPAABIgjgBg");
	this.shape_34.setTransform(234.025,-38.2114);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#8B8B8B").s().p("A+dHIQgjAAgRgNQgLgMgCgUIgCgiQgFg3gEh0QgEhxgFg6QgEgzAAggQAAgvAJgmQAFgIAIgFQAPgHAWgBIAlAAQG0gBCeACQAoAAAegMQAfgNAcgbQB6h5CihBQCcg+CrgCQCrgBCdA8QCkA+B6B3QAjAiAmAOQAlAOAxAAQH/gCP+ABQAyAAAMACQAjAEAXASQCCAmA1BbQAxBSgNCDQgJBXhTBGQhTBGhdABI7MABQgIgGgDgKQgCgHAAgNQgCgugThSQg+j5jliCQhrg+h5gPQh+gRh5AkQjEA6h1CSQh1CSgRDQQgBAYgDAHQgFAQgSAGQgQAFgSAAIkXAAImHAAg");
	this.shape_35.setTransform(317.1374,132.3982);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FF6728").s().p("EBHdADnMg43AAAQghAAgbgCQgTACgegCQh6ADiuAAIkpgBImpAAQj7ABivgCQojADn9gEQgZACgYgCQgPACg3AAI6zAAQhIAAgSgBQjQACkqgBIn7AAQgSAAgLgCQgPgEgMgLIAAmrMAuFgACQAOgMAggCQDJgCEtABIH0AAQAjAAARAPIFjABIRFgBQAPgMAggCQARgCAYAAIAnABMAjEAAAQBIgBASACQD8gCFqABIJmAAQAhAAATAPQAPAIAKATQAEAJAJAYQAaBSAQBlQAKBKAJBwQgTAQgcACIgxgBg");
	this.shape_36.setTransform(26,56.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#E7D83D").s().p("EgqXATRQgbgCgSgOQAA5BgBshQAAgfAOgJQAKgHAdAAUAuzAABAlcgACQAiAAALAMQALALAAAhQgBCaAAMDQAMANADAVQABAIAAAdQABKYgBKYQAAAegBAIQgDAUgLAOQgOAKgVADQgIABgdAAI0cAAQgdAAgIgBQgVgCgPgKQgLgPgCgWIgBgoQgBjPABjPQAAgfgMgMQgMgOgfAAIuWABQguAAgUAbQgVAKgFAWQgDAKAAAfIAAF1IgBAoQgDAWgOAOQgQAJgWACIgoAAMgrYgABIgjACIgMgBg");
	this.shape_37.setTransform(-165.175,-86.2333);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFF00").s().p("AjZDZQgIgJABgVIAAi5IAAi8QgBgVAIgJQAIgJAVABQC9ABC+gBQAUgBAHAJQAHAIAAATQgBC9ABC+QAAATgHAIQgHAIgUAAQi+gBi9ABIgCAAQgTAAgIgIg");
	this.shape_38.setTransform(-395.4266,-172.0251);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FF9966").s().p("AjZDZQgIgIABgTQABi+gBi9QgBgTAHgIQAIgJAUABQC9ABC+gBQAVgBAIAJQAIAIgBAWIAAC4IAAC9QABAVgIAJQgIAJgVgBQi9gBi+ABIgCAAQgSAAgHgIg");
	this.shape_39.setTransform(-337.4251,-172.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FF9966").s().p("AC+DhQi+gBi9ABQgUAAgIgHQgIgIABgUIAAi9IAAi4QgBgXAIgJQAIgKAYAAQCRADDkgCQAWgBAIAJQAIAIAAAVQgCC7ACC7QAAAVgHAIQgIAKgTAAIgCgBg");
	this.shape_40.setTransform(7.4984,-172.0488);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFF00").s().p("AjZDYQgIgKABgYIABhaIgBhaIABhbIgBhdQgBgYAJgKQAJgJAZAAQCOADDegCQAYgBAJAIQALAJAAAYQgCC4ACC5QAAAXgIAJQgJAJgXgBQjhgCiQADIgCAAQgXAAgJgKg");
	this.shape_41.setTransform(65.4961,-172.0251);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]},14).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]},13).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-441,-209.6,962.1,387.7);


(lib.Bird = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AmFAyQDYjICtDIQDFjCDBDC");
	this.shape.setTransform(48,-86.9855);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("AmFApQDPijC2CjQDAiVDGCV");
	this.shape_1.setTransform(48,-86.0644);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("AmFAfQDOh8C3B8QC+hoDIBo");
	this.shape_2.setTransform(48,-85.0694);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,1,1).p("AmFAUQDOhOC3BOQC4g8DOA8");
	this.shape_3.setTransform(48,-83.9201);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("AmFAIQDWggCvAgQC4gbDOAb");
	this.shape_4.setTransform(48,-82.7935);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,1,1).p("AmFATQDehLCnBLQC4g8DOA8");
	this.shape_5.setTransform(48,-83.863);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,1,1).p("AmFAfQDOh6C3B6QC2hsDQBs");
	this.shape_6.setTransform(48,-85.0127);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(1,1,1).p("AmFAqQDSimCzCmQCviYDXCY");
	this.shape_7.setTransform(48,-86.121);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,1,1).p("AmFA1QDSjSCzDSQCvjKDXDK");
	this.shape_8.setTransform(48,-87.2275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(8,-93.5,80,12.599999999999994);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.fullLeg2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_1
	this.ikNode_1 = new lib.upLeg();
	this.ikNode_1.name = "ikNode_1";
	this.ikNode_1.setTransform(21.5,18.3,0.9995,0.9995,10.2538,0,0,43.4,-6.9);

	this.ikNode_2 = new lib.downLeg();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(19.35,63.2,0.9973,0.9973,2.7301,0,0,31.8,-23.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_2,p:{scaleX:0.9973,scaleY:0.9973,rotation:2.7301,x:19.35,y:63.2,regY:-23.3,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.9,scaleX:0.9995,scaleY:0.9995,rotation:10.2538,x:21.5,y:18.3}}]}).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:16.0897,x:17.25,y:63.15,regY:-23.3,regX:31.8}},{t:this.ikNode_1,p:{regX:43.3,regY:-6.8,scaleX:0.9994,scaleY:0.9994,rotation:12.9492,x:21.4,y:18.4}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:23.9807,x:9.4,y:61.55,regY:-23.3,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.8,scaleX:0.9994,scaleY:0.9994,rotation:23.1203,x:21.5,y:18.35}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:39.0291,x:4.6,y:60,regY:-23.2,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.8,scaleX:0.9994,scaleY:0.9994,rotation:29.6975,x:21.55,y:18.2}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:49.4713,x:1.6,y:58.45,regY:-23.2,regX:31.7}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.8,scaleX:0.9994,scaleY:0.9994,rotation:33.922,x:21.6,y:18.4}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:67.6376,x:1.15,y:58.3,regY:-23.2,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.8,scaleX:0.9994,scaleY:0.9994,rotation:34.5919,x:21.55,y:18.5}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:81.1752,x:-1.65,y:56.7,regY:-23.2,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.8,scaleX:0.9994,scaleY:0.9994,rotation:38.6374,x:21.45,y:18.55}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:68.8643,x:2.05,y:58.6,regY:-23.2,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.8,scaleX:0.9994,scaleY:0.9994,rotation:33.3186,x:21.45,y:18.4}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:48.5539,x:1,y:58,regY:-23.2,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.9,scaleX:0.9994,scaleY:0.9994,rotation:34.7768,x:21.5,y:18.55}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:35.9192,x:3.45,y:59.05,regY:-23.3,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.9,scaleX:0.9994,scaleY:0.9994,rotation:31.4795,x:21.45,y:18.3}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:24.8008,x:10.25,y:61.5,regY:-23.2,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.8,scaleX:0.9994,scaleY:0.9994,rotation:22.0662,x:21.35,y:18.35}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:16.0363,x:18.6,y:62.8,regY:-23.2,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.8,scaleX:0.9994,scaleY:0.9994,rotation:11.2545,x:21.4,y:18.4}}]},1).to({state:[{t:this.ikNode_2,p:{scaleX:0.9972,scaleY:0.9972,rotation:4.9904,x:20.9,y:62.75,regY:-23.2,regX:31.8}},{t:this.ikNode_1,p:{regX:43.4,regY:-6.8,scaleX:0.9995,scaleY:0.9995,rotation:8.2901,x:21.5,y:18.35}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.2,-3.9,55.5,127.4);


(lib.fullLeg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_1
	this.ikNode_1 = new lib.upLeg();
	this.ikNode_1.name = "ikNode_1";
	this.ikNode_1.setTransform(21.35,18.9,0.9997,0.9997,32.8397,0,0,43.5,-6.9);

	this.ikNode_2 = new lib.downLeg();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(1.9,58.6,0.9978,0.9978,85.0301,0,0,32,-23.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9978,scaleY:0.9978,rotation:85.0301,x:1.9,y:58.6,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9997,scaleY:0.9997,rotation:32.8397,y:18.9,regY:-6.9,x:21.35,regX:43.5}}]}).to({state:[{t:this.ikNode_2,p:{regX:31.9,scaleX:0.9977,scaleY:0.9977,rotation:68.5627,x:2.1,y:59.05,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9996,scaleY:0.9996,rotation:32.6526,y:18.8,regY:-6.9,x:21.35,regX:43.5}}]},1).to({state:[{t:this.ikNode_2,p:{regX:31.9,scaleX:0.9977,scaleY:0.9977,rotation:52.7757,x:4.1,y:59.85,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9997,scaleY:0.9997,rotation:29.9345,y:18.6,regY:-7,x:21.45,regX:43.5}}]},1).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9977,scaleY:0.9977,rotation:37.9895,x:4.1,y:59.8,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9996,scaleY:0.9996,rotation:30.1692,y:18.6,regY:-6.9,x:21.4,regX:43.5}}]},1).to({state:[{t:this.ikNode_2,p:{regX:31.9,scaleX:0.9977,scaleY:0.9977,rotation:21.2262,x:6.6,y:60.75,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9996,scaleY:0.9996,rotation:26.5744,y:18.6,regY:-6.9,x:21.55,regX:43.6}}]},1).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9977,scaleY:0.9977,rotation:15.4845,x:16.9,y:62.95,regY:-23.7}},{t:this.ikNode_1,p:{scaleX:0.9997,scaleY:0.9997,rotation:13.3013,y:18.45,regY:-6.9,x:21.5,regX:43.5}}]},1).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9978,scaleY:0.9978,rotation:4.8585,x:24.25,y:63.3,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9997,scaleY:0.9997,rotation:3.9455,y:18.4,regY:-6.9,x:21.45,regX:43.5}}]},1).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9977,scaleY:0.9977,rotation:16.0895,x:17.3,y:63.15,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9997,scaleY:0.9997,rotation:12.9495,y:18.35,regY:-6.9,x:21.7,regX:43.6}}]},1).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9977,scaleY:0.9977,rotation:23.9809,x:9.45,y:61.65,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9997,scaleY:0.9997,rotation:23.1207,y:18.2,regY:-6.9,x:21.55,regX:43.5}}]},1).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9977,scaleY:0.9977,rotation:39.0292,x:4.7,y:59.85,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9997,scaleY:0.9997,rotation:29.6982,y:18.1,regY:-6.9,x:21.5,regX:43.5}}]},1).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9977,scaleY:0.9977,rotation:49.4713,x:1.75,y:58.45,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9996,scaleY:0.9996,rotation:33.9203,y:18.3,regY:-6.9,x:21.5,regX:43.5}}]},1).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9977,scaleY:0.9977,rotation:67.6382,x:1.2,y:58.3,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9997,scaleY:0.9997,rotation:34.5912,y:18.4,regY:-6.9,x:21.45,regX:43.5}}]},1).to({state:[{t:this.ikNode_2,p:{regX:32,scaleX:0.9978,scaleY:0.9978,rotation:83.2108,x:0.3,y:57.8,regY:-23.6}},{t:this.ikNode_1,p:{scaleX:0.9997,scaleY:0.9997,rotation:36.0117,y:18.35,regY:-7,x:21.6,regX:43.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.2,-8.3,102.7,99.3);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.ikNode_48 = new lib.Symbol25();
	this.ikNode_48.name = "ikNode_48";
	this.ikNode_48.setTransform(45.7,16.65,1,1,0,0,0,5.5,6.2);

	this.ikNode_46 = new lib.Symbol24();
	this.ikNode_46.name = "ikNode_46";
	this.ikNode_46.setTransform(12.2,7.1,1,1,0,0,0,12.2,7.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_46},{t:this.ikNode_48}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,61.2,23.1), null);


(lib.Tween33 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.ambulanceVE();
	this.instance.setTransform(1.85,-4.7,0.4386,0.4381,0,0,0,44.2,3.6);

	this.instance_1 = new lib.wheelNoAnimation();
	this.instance_1.setTransform(-126.35,70.5,0.4347,0.4344,0,0,0,39.9,0.6);

	this.instance_2 = new lib.wheelNoAnimation();
	this.instance_2.setTransform(94.95,70.5,0.4347,0.4344,0,0,0,39.9,0.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210.9,-98.1,421.9,196);


(lib.Tween32 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.wheel();
	this.instance.setTransform(-124.45,72.25,0.4346,0.4333,0,0,0,44.8,3.8);

	this.instance_1 = new lib.wheel();
	this.instance_1.setTransform(96.7,72.25,0.4346,0.4333,0,0,0,44.9,3.8);

	this.instance_2 = new lib.ambulanceVE();
	this.instance_2.setTransform(1.85,-4.65,0.4386,0.4382,0,0,0,44.2,3.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-211,-98.1,422,196.3);


(lib.Tween8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.EMTBad();
	this.instance.setTransform(0.7,39.2,0.498,0.7332,0,0,0,639.2,73.3);

	this.instance_1 = new lib.EMT1LegR();
	this.instance_1.setTransform(-123.95,33.4,0.5957,0.5951,0,0,0,-174.2,57.4);

	this.instance_2 = new lib.EMT1LegL();
	this.instance_2.setTransform(-86.65,41.1,0.5957,0.5951,0,0,0,-161.8,72.4);

	this.instance_3 = new lib.EMT1();
	this.instance_3.setTransform(-82.95,-31.3,0.6302,0.6304,0,0,0,-127.9,-51.6);

	this.instance_4 = new lib.EMT1LegR();
	this.instance_4.setTransform(123.95,37.95,0.5957,0.5951,0,0,180,-174.2,57.4);

	this.instance_5 = new lib.EMT1LegL();
	this.instance_5.setTransform(86.65,45.65,0.5957,0.5951,0,0,180,-161.8,72.4);

	this.instance_6 = new lib.EMT2();
	this.instance_6.setTransform(86.1,-24.2,0.6302,0.6304,0,0,0,210.9,-48.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145.3,-76.3,290.6,152.7);


(lib.Tween7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.EMTBad();
	this.instance.setTransform(0.7,39.2,0.498,0.7332,0,0,0,639.2,73.3);

	this.instance_1 = new lib.EMT1LegR();
	this.instance_1.setTransform(-123.95,33.4,0.5957,0.5951,0,0,0,-174.2,57.4);

	this.instance_2 = new lib.EMT1LegL();
	this.instance_2.setTransform(-86.65,41.1,0.5957,0.5951,0,0,0,-161.8,72.4);

	this.instance_3 = new lib.EMT1();
	this.instance_3.setTransform(-82.95,-31.3,0.6302,0.6304,0,0,0,-127.9,-51.6);

	this.instance_4 = new lib.EMT1LegR();
	this.instance_4.setTransform(123.95,37.95,0.5957,0.5951,0,0,180,-174.2,57.4);

	this.instance_5 = new lib.EMT1LegL();
	this.instance_5.setTransform(86.65,45.65,0.5957,0.5951,0,0,180,-161.8,72.4);

	this.instance_6 = new lib.EMT2();
	this.instance_6.setTransform(86.1,-24.2,0.6302,0.6304,0,0,0,210.9,-48.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145.3,-76.3,290.6,152.7);


(lib.Tween6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bird();
	this.instance.setTransform(-56.5,-27.25,0.9996,0.9996,0,0,0,49.2,-85.8);

	this.instance_1 = new lib.Bird();
	this.instance_1.setTransform(-34.1,26.2,0.9996,0.9996,0,0,0,49.2,-85.8);

	this.instance_2 = new lib.Bird();
	this.instance_2.setTransform(59,29.65,0.9996,0.9996,0,0,0,49.2,-85.8);

	this.instance_3 = new lib.Bird();
	this.instance_3.setTransform(22.8,-4.85,0.9996,0.9996,0,0,0,49.2,-85.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.2,-34,194.5,68);


(lib.Tween5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bird();
	this.instance.setTransform(-57.75,-28.45,1,1,0,0,0,48,-87);

	this.instance_1 = new lib.Bird();
	this.instance_1.setTransform(-35.35,25,1,1,0,0,0,48,-87);

	this.instance_2 = new lib.Bird();
	this.instance_2.setTransform(57.75,28.45,1,1,0,0,0,48,-87);

	this.instance_3 = new lib.Bird();
	this.instance_3.setTransform(21.55,-6.05,1,1,0,0,0,48,-87);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.2,-34,194.5,68);


(lib.secondmandownR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_85
	this.ikNode_52 = new lib.Symbol75();
	this.ikNode_52.name = "ikNode_52";
	this.ikNode_52.setTransform(159.5,-231.9,0.9999,0.9999,-20.4212,0,0,117.9,154);

	this.ikNode_53 = new lib.Symbol76();
	this.ikNode_53.name = "ikNode_53";
	this.ikNode_53.setTransform(206.5,-102.45,0.9995,0.9995,-37.8478,0,0,104.2,139.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_53,p:{regX:104.2,rotation:-37.8478,x:206.5,y:-102.45,regY:139.6}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-20.4212,x:159.5,y:-231.9,regY:154}}]}).to({state:[{t:this.ikNode_53,p:{regX:104.3,rotation:-33.7289,x:205.45,y:-102,regY:139.6}},{t:this.ikNode_52,p:{scaleX:0.9998,scaleY:0.9998,rotation:-19.9112,x:159.6,y:-231.9,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,rotation:-29.6092,x:204.35,y:-101.55,regY:139.6}},{t:this.ikNode_52,p:{scaleX:0.9998,scaleY:0.9998,rotation:-19.3987,x:159.6,y:-231.85,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,rotation:-25.4908,x:203.1,y:-101.15,regY:139.6}},{t:this.ikNode_52,p:{scaleX:0.9998,scaleY:0.9998,rotation:-18.8868,x:159.6,y:-231.8,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.4,rotation:-21.3716,x:201.95,y:-100.8,regY:139.6}},{t:this.ikNode_52,p:{scaleX:0.9998,scaleY:0.9998,rotation:-18.3738,x:159.5,y:-231.95,regY:153.9}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.2,rotation:-14.3925,x:188.85,y:-97.35,regY:139.6}},{t:this.ikNode_52,p:{scaleX:0.9998,scaleY:0.9998,rotation:-12.7823,x:159.45,y:-231.95,regY:153.9}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,rotation:-7.4138,x:175.75,y:-95.15,regY:139.6}},{t:this.ikNode_52,p:{scaleX:0.9998,scaleY:0.9998,rotation:-7.19,x:159.5,y:-231.85,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,rotation:-0.4356,x:162.4,y:-94.4,regY:139.5}},{t:this.ikNode_52,p:{scaleX:0.9998,scaleY:0.9998,rotation:-1.5986,x:159.45,y:-231.9,regY:153.9}}]},1).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-445.6,367.4,588.9000000000001);


(lib.secondmandownL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_85
	this.ikNode_52 = new lib.Symbol75();
	this.ikNode_52.name = "ikNode_52";
	this.ikNode_52.setTransform(159.6,-231.95,1,1,-0.3882,0,0,117.9,154);

	this.ikNode_53 = new lib.Symbol76();
	this.ikNode_53.name = "ikNode_53";
	this.ikNode_53.setTransform(159.55,-93.95,0.9996,0.9996,0.1898,0,0,104.2,139.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_53,p:{regX:104.2,regY:139.7,scaleX:0.9996,scaleY:0.9996,rotation:0.1898,x:159.55,y:-93.95}},{t:this.ikNode_52,p:{scaleX:1,scaleY:1,rotation:-0.3882,x:159.6,y:-231.95,regY:154}}]}).to({state:[{t:this.ikNode_53,p:{regX:104.4,regY:139.6,scaleX:0.9995,scaleY:0.9995,rotation:-6.2653,x:166,y:-94.2}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-3.0179,x:159.45,y:-231.95,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,regY:139.6,scaleX:0.9996,scaleY:0.9996,rotation:-12.7275,x:172.15,y:-94.7}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-5.6505,x:159.45,y:-231.9,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.2,regY:139.7,scaleX:0.9996,scaleY:0.9996,rotation:-19.1901,x:178.3,y:-95.35}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-8.2827,x:159.4,y:-231.95,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,regY:139.6,scaleX:0.9996,scaleY:0.9996,rotation:-23.8545,x:185.55,y:-96.6}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-11.3176,x:159.4,y:-231.95,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,regY:139.6,scaleX:0.9996,scaleY:0.9996,rotation:-28.5189,x:192.65,y:-98.25}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-14.3518,x:159.4,y:-231.9,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.2,regY:139.6,scaleX:0.9995,scaleY:0.9995,rotation:-33.1826,x:199.6,y:-100.05}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-17.3875,x:159.4,y:-231.9,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.2,regY:139.6,scaleX:0.9995,scaleY:0.9995,rotation:-37.8478,x:206.5,y:-102.4}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-20.4212,x:159.5,y:-231.9,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,regY:139.6,scaleX:0.9995,scaleY:0.9995,rotation:-33.7279,x:205.45,y:-102.05}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-19.9097,x:159.55,y:-231.9,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,regY:139.6,scaleX:0.9996,scaleY:0.9996,rotation:-29.6089,x:204.25,y:-101.65}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-19.398,x:159.55,y:-231.9,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,regY:139.6,scaleX:0.9996,scaleY:0.9996,rotation:-25.4901,x:203.05,y:-101.25}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-18.8854,x:159.55,y:-231.85,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,regY:139.6,scaleX:0.9995,scaleY:0.9995,rotation:-21.3712,x:201.9,y:-100.85}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-18.3733,x:159.55,y:-231.9,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.4,regY:139.6,scaleX:0.9996,scaleY:0.9996,rotation:-14.3922,x:189,y:-97.5}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-12.7814,x:159.4,y:-232,regY:153.9}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,regY:139.6,scaleX:0.9996,scaleY:0.9996,rotation:-7.4134,x:175.7,y:-95.25}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-7.1894,x:159.45,y:-231.85,regY:154}}]},1).to({state:[{t:this.ikNode_53,p:{regX:104.3,regY:139.6,scaleX:0.9996,scaleY:0.9996,rotation:-0.4347,x:162.35,y:-94.3}},{t:this.ikNode_52,p:{scaleX:0.9999,scaleY:0.9999,rotation:-1.5976,x:159.45,y:-232,regY:153.9}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(54.6,-449.3,135.1,585.7);


(lib.Scene_1_Ets_EMT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Ets_EMT
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#005B68").s().p("Ag3gpQA5gVArgvIALgJQgHAZgOAhIgYA6QgNAjgfBGIgJAQQgKhQgDhQg");
	this.shape.setTransform(80.825,162.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#005B68").s().p("AhYC9IACgGQAyi3Afi7IADgHQAEAJABAQIAEAaQAPA2ATAdQAIAMAPAMIAZAVQgJAQgSAXIgeAnQgpA4g+BBIgGAGQgDAEgEABQgEgCAAgEg");
	this.shape_1.setTransform(182.675,185.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#005B68").s().p("AAdDpIgQgbQhQh9gbhjIgIglQAvgOASgJQA5gcArhGQAJgPALgZIAUgpQAABDgIByQgHBTgTCLIgPBjQgBAIgGAFQgIgJgKgQg");
	this.shape_2.setTransform(172.1014,141.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#005B68").s().p("AAQGwIgIgZQg5ikgiitIgDgLQgCgHgEgDQAWgmAWgyQALgaAahCQArh0AiiPIAIghQAEgUAFgOIAKB7QgEAEgBAHIAAAMIgCCMQgBBUgCA3QgHCWgKBMIgIBSIgJBRQgCAVgGAdIgMAzQgHgKgGgQg");
	this.shape_3.setTransform(132.775,141.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#005B68").s().p("AjjOKIgDgFIA9nbQAIhHAHhHQAQiZACgcIAMiaQACgYABg4QABg0AEgcQADgZgFgcQgBgIAAgSQABgSgCgIQgEgeAFgrQAIgwACgYIAMh5QAKhjAEhHIAIibQAMAgAFAJQAkBMBPAMQARBLAMAlQAWBFAXAwQAcA9AlAuQAPATALAKQAMAMgDARQgkCzgzCuQg/DWh3EaIhaDUQgyB5gjBfIgIAPIgBAAQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_4.setTransform(152.7883,213.755);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#005B68").s().p("AAmLkIgCgOIgBghIAAgiQAAgWgBgHIgWATQgMAMgHAFIgXAPQgOAHgGgEQgGgFAFgPQAAg0AJhnIABgiIAGiPQAIiQgGjjQgCh4gJhXIgHhWQgMh4gLhGQgBgGgDgCQgFgBgBAEIAAAGQAAAtABALIAEAtQAGBmAACBQAABGgDCgQAAAmgEBBIgFBnQAAAHgGAEQgJgPgSgtQhajdgtjcQgThdgLhMQgCgOAGgLQAkg7AdhLQAXg5AZhTIALgiIAWArQANAXAPARQAbAdAtAGQAnAGAkgPQA2gXAwhBQAHgKADgCIAZCBQAfCVA3CTQAFANAEADQAIAGACAIQABAGgBAKQgIA1gIBMIgNCCQgOCFgPCBIg1GtIgEAJQgJABgGgNQgwhngGhYIAAABQABAXgJAXQgGAQgPAZQgOAXACAZIAABWIgBARQgBAJgFAGIgFABQgHAAgCgGg");
	this.shape_5.setTransform(105.964,223.9563);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#005B68").s().p("ApQQpIgngKQgYgFgOgIIgQgKQgIgHgCgKQAFgTALgaIATgsIB3kSQBGijAthxQA3iLAoiEQAEgNADgCQAEgCAOAAQAOABAOgNQBWhUBEhfQAmg0AagrQAJgRABgFQA5gLBAg5QCJh6BXixIAUgrQAMgbAKgRIAAAjQgBAeALAkQAHAYAPANQAOANAUABQAVACAPgMQAlgaAUg3IARgzQAKgeALgUIAEgJIAFgHQANgLAJgSIAOghIBnkMIABgFQALADACAKIgBASIgBAIIgCANQgBAIABAFQgMBzgSBAQgHArgXBIQgDALgKAaQgGAYgRAtQgjBWg3BnQgHAKgKASQgLAUgFAHIghAxQgUAfgOARQghAsgZAcIggAkQgVAWgKAOIgRAPIgSAPIgVAUIgWAUQgNAMgYATQgcAUgKAKQgpAUgBAwQAAALgFAWQAAANgFAYIgEAcQgCASgDAKQgDAIgCAOQgDAPgCAHQgWBqg1BcIgSAbIgSAaIgYAaIgIAKQgUASglAaIgLAGIgQAIQgdAOgsAEQgNADgOgDIgegFQgrgJg1glQAHAlAKBEQAVCUgwBxQgZA6g0ApQgcAXg6ALIgOABIgNgBg");
	this.shape_6.setTransform(203.425,205.9625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#005B68").s().p("AD7NoIgIAAQgOACgKgJIgygNQgigKg2gcQgJACgJgFIgQgKQgJgHgkgeIgEgFQgWgRgZgeIgrg0QgigwgwhVQgEgFgEgKIgIgPQgWgjgJgxQgwiBgRhJIgQhDQgOhZgEgtIgCgWIgBggQgBgSgDgNQgJgJgBgPIABgZIABgNQABgIAAgFQgBgOADgdQACgdgBgOQgBgUgBgGQABglAAg4IAAheQABgaAEgJQgEgagBg9QgSgiAdgbQAYgsAhgOQACgGACAAQASgJADgRQABgJgDgZIgFgdQgBgRAGgMIABg6QAFAMADATIAFAfQASBUAeA9QAvBgBLAoQAyAbAtAAIA6AAQADAJAAAKQAAAkAFAvIAJBTQAQCcAvC2QA1DNBSCzIADAJQACAFACADQATAcADAkQACAYgGArQgCARgDA2QgDAzgJBmIgCApQgCAXgFARQgLAMgRACIgMABIgTgBg");
	this.shape_7.setTransform(62.5957,209.2625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#4C0824").s().p("EgDUAqlQgvgFgdgfQgFgFAAgDQAFgMgGgRQgHgVABgJQABgMgBgUIgEggIgEg+QgCgpgEgVQgBgHgBgWQgBgTgEgKQAAgZgHgvQgJgJgCgOQgRhugFg3QgBgUAGgIIABgXQgBgMgEgJQgLgKgCgRIgBgeQgBgegHg8QgHg7gCgfIAAgOQABgIAFgFIAAgMQAAgHgEgFQgMgMALgLIgFg/QgEgmgEgYQAAgagEgpIgGhCIgGg3IAAgFIgCgGIAAgGQgFgNACgFIABgDQAAgcgDgnIgHhDIgBgKQgBgFAAgKQAAgKgCgFIAAghQgBgTgEgOIgBghIAAgUQAAgLgEgIQgLgRgBgiQgCgjAJgPIAAgUQABgMgFgIQgKgFAAgMQABgPgDgcIgCgsQAAgOgDgsQgEgkADgWQADgVgHgpQACgrgEhSQgEhVABgoIAAkGQABgJAFgHQAEgpgDgVQACgPgCgXQgIgJADgRQADgMAAgSIAAgeIACgIQADgLAAgQIAAgcIAAgqIAAgrQAFgVAAghIACg1QgBgVACgKQAHgZgCgQQABgbADglIAGg/IAEgUQACgMgDgJIADgoIADgnQAHgWgCgTQABgYAEglIAFg8QAHgSgDgNIAAgIIABgJQAOinAGhTIAFg+QADgkAAgaQgBgOgIgQQiglOg4mSQgQh7AAhEIAAgPQABgJAFgGQAFgDAKgCIAQgEQAHAFACAIIABAPQAAARAEAjIADAxQAOgaAfhNQAahDAXgkIAgguQAGARACATQADAXgJAfQgwCag5BiQgGAMAAAOIACAaQA0FEB3EZIAEAJQAKh8ABijQABg3gCjnIgDhNIgFhMQgBgRABgFQACgNAMAAQALgBADAMQACAEACARQAOBnAMCRQATDVgHFIQgDC5gOCIQgBAIAAAWQABATgDALQgFAPAAAYIAAAnIgiGuQgHBRgBApQgIAdACANQgEA4gEBSIgFCKIABAiQAAAUgCAOQgCEgADBoIABBKQABAsAGAeIAAAGQAOh9AeigIA+kwQAhilAOhUIAGgVQAEgMAAgJIA0lIQAfjBASiGIAJg/IAHg/QAViZAbj2QAekgARiPQABgNgEgIQgYgsgUg+IgghvQgZhYgQhmQgFgcAGgTQACgIAIgNQAJgOACgHQAMABAEALIAEATQAdCEAfBkQARA4AVA9QAOhKAKhfQAEglALiEQALiBgChsQAAgZADg4QADg1gBgdQAAgMABgEQACgIALgCIATBnIAMAyQAIAlgCAyIgHBXIgGBhIgJBgQgEA0gNBiQgGA1AHBMQADAmgDAPQgDAUAAAxQgBA3gGBKIgLCBIgZD9IgeEFQgPB5gRBwQgCANgFARIgFAVQADgHAAgFQATg6AdhKIA2iDQBWjLAqhmQBHixAqiHQA1itAwjgQAGgZgOgPQhAhBgth0QgehMgQhJIgDgSQgBgKAFgHQANgCAUACQAIAEAEAKIAFAQQARBCAkBGQAcA0AxBKQAEgMADgQIAEgaQAWiMALiLIAFhRQACgwAIggIAPgwQAIABgBAFIgCAJIgMCPIgCAhQgIBxADDiIgBARQACAogLA2IgUBcQgQBQgcBoQBNhSA+hWIALgOQAHgIAIgCQAfAHAkgCQAGAIgEAJIgJAPQg/BphNBWQguA1gNALQgPAPgIAFQgOAJgPABQgKAAgEAJQgCAFgDALQgZBWg1CKQgnBmg5CHIhmDsQg8CHgXBAQgLAWgIAXIgOAiQgrBjgRCAQgIA6gJAkQgYChgaCKQgHAkgEAMQgBALgDAQIgHAaQAAAFgCAJIgDANQgEAdgNA7QgMA6gEAfQgLAdgIAtIgMBLQgcCJgSCfIgFAzQgCAfgFAUQgDAIADAUQAAAjgBAIQgGAQAAAWIAAAnQAGAqgFA2IgBANQADAKgCAQQACAHgBAKIgBARQACAVAAAfIAAA0QgEAVADAVQAEAfABA8QACA9AEAeQgDAXAEAlQAFAtAAAOQAAARAEAwQAEApgCAZQAAAHAEAOQABAEgBAJIABANQATDZAQB/QgCAIAEAVQAIArALBXQAEAVgJALIAzFaQACARAGAHQAOAQgLAUQgJAQgUAAIgGgBg");
	this.shape_8.setTransform(135.0931,380.2156);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1C858C").s().p("AGLOUQgRgBgOgGQgtgVgXgrQgSghgIg3QgFgcgDgKQgEiiAHh/IAHh0QAEg/AJgwQgDAQgEAIIgdBAQgSAjgUAYQg5BGhbAOQgHADgXgDQhWgJgphbQgKgZgGgMQgIgagGgjIgJg+IgFgcQgHgpAAghIgEAWIgLAqQg9DmhXCkIgMAXQgHAOgGAIQgWAhgUAUQgZAbgdAPQg+Agg4gRQg4gRghg+IgSgpQgFgRAAgJQgIATgQASIggAfQgTASgPAJQggARgQAEIgSAGIgSAEQhhAMhKgvQhFgtgshcQgTgngNgzQgIgfgMg+IgGgXIgDgYQgDgPABgKQgDgUACgcIAFgvIAGhHQAEgpAJgcQAThuAehJIACgHIADgKQAxh+AxhMQBDhvBThKIAIgIIAQgMIADgCIAOgLIAIgFQBvhFBvAdQAyAOAiAeQANALADAAQADgBAFgQIAVhBQANglANgaQAJgRAUgfQAng2AxgYQBBgiBDAeQBOAiAlBQQAVhlAFgSIAGgRQAEgIAJgEIPEAAQALALgCARQgEAagBA6QAAA3gGAdQgBAogMBCQgCAOADAHQAEAJAOABIAPAGIAKAFIAFACIALAGIAHAEIAEADIALAHIAIAFIAFAEQAwAmAfA5QAaAvATBEQAXBRAICEQgEAYAFAhQAFAZgDAkIgHA8QglBehIC+QgNAigRAUQgQATgOApIgPAsQgJAagJARQgOAegZAVQgbAWgegFQgegGgRgeQgMgUgFgeQgEgdAEgYQgJAighA9QhVChh4BtQgqAmgxAYQgcANgUAAQgOADgLAAIgHgBg");
	this.shape_9.setTransform(155.2782,93.1625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#1C858C").s().p("AGLOUQgRgBgOgGQgtgVgXgrQgSghgIg3QgFgcgDgKQgEiiAHh/IAHh0QAEg/AJgwQgDAQgEAIIgdBAQgSAjgUAYQg5BGhbAOQgHADgXgDQhWgJgphbQgKgZgGgMQgIgagGgjIgJg+IgFgcQgHgpAAghIgEAWIgLAqQg9DmhXCkIgMAXQgHAOgGAIQgWAhgUAUQgZAbgdAPQg+Agg4gRQg4gRghg+IgSgpQgFgRAAgJQgIATgQASIggAfQgTASgPAJQggARgQAEIgSAGIgSAEQhhAMhKgvQhFgtgshcQgTgngNgzQgIgfgMg+IgGgXIgDgYQgDgPABgKQgDgUACgcIAFgvIAGhHQAEgpAJgcQAThuAehJIACgHIADgKQAxh+AxhMQBDhvBThKIAIgIIAQgMIADgCIAOgLIAIgFQBvhFBvAdQAyAOAiAeQANALADAAQADgBAFgQIAVhBQANglANgaQAJgRAUgfQAng2AxgYQBBgiBDAeQBOAiAlBQQAVhlAFgSIAGgRQAEgIAJgEIPEAAQALALgCARQgEAagBA6QAAA3gGAdQgBAogMBCQgCAOADAHQAEAJAOABIAPAGIAKAFIAFACIAWANIATAMIAFAEQAwAmAfA5QAaAvATBEQAXBRAICEQgEAYAFAhQAFAZgDAkIgHA8QglBehIC+QgNAigRAUQgQATgOApIgPAsQgJAagJARQgOAegZAVQgbAWgegFQgegGgRgeQgMgUgFgeQgEgdAEgYQgJAighA9QhVChh4BtQgqAmgxAYQgcANgUAAQgOADgLAAIgHgBg");
	this.shape_10.setTransform(155.2782,93.1625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(255,255,255,0.686)").s().p("AyUO7QjxiYiViwQi3jagqj/IgWAIIqmEQIN0vwQCajOEViuQJ0mMN3AAQN4AAJ0GMQGcEDCOFJQBLCuAADAQAAIvp1GMQp0GMt4AAQt3AAp0mMg");
	this.shape_11.setTransform(671.225,180.975);

	this.instance = new lib.lipsMokdanit();
	this.instance.setTransform(339.4,244.25,0.6755,0.68,0,0,0,41.6,4);

	this.instance_1 = new lib.רקעקדמימדאpngcopy();
	this.instance_1.setTransform(18,348,0.9921,0.9998);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFFFFF").ss(1,1,1).p("AG6n3ItzPv");
	this.shape_12.setTransform(466.6125,173.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("AdNvcQDuEaAAFZQAAIvp0GLQp0GMt3AAQt4AAp1mMQmbkDiOlK");
	this.shape_13.setTransform(725.675,243.2375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9,p:{x:155.2782,y:93.1625}},{t:this.shape_8,p:{x:135.0931,y:380.2156}},{t:this.shape_7,p:{x:62.5957,y:209.2625}},{t:this.shape_6,p:{x:203.425,y:205.9625}},{t:this.shape_5,p:{x:105.964,y:223.9563}},{t:this.shape_4,p:{x:152.7883,y:213.755}},{t:this.shape_3,p:{x:132.775,y:141.125}},{t:this.shape_2,p:{x:172.1014,y:141.525}},{t:this.shape_1,p:{x:182.675,y:185.075}},{t:this.shape,p:{x:80.825,y:162.2}}]}).to({state:[{t:this.shape_10,p:{x:155.2782,y:93.1625}},{t:this.shape_8,p:{x:135.0931,y:380.2156}},{t:this.shape_7,p:{x:62.5957,y:209.2625}},{t:this.shape_6,p:{x:203.425,y:205.9625}},{t:this.shape_5,p:{x:105.964,y:223.9563}},{t:this.shape_4,p:{x:152.7883,y:213.755}},{t:this.shape_3,p:{x:132.775,y:141.125}},{t:this.shape_2,p:{x:172.1014,y:141.525}},{t:this.shape_1,p:{x:182.675,y:185.075}},{t:this.shape,p:{x:80.825,y:162.2}}]},16).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.instance_1},{t:this.instance},{t:this.shape_11}]},199).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.instance_1},{t:this.instance},{t:this.shape_11}]},50).to({state:[{t:this.shape_11},{t:this.shape_13},{t:this.shape_12},{t:this.instance_1},{t:this.instance}]},53).to({state:[]},53).to({state:[{t:this.shape_9,p:{x:154.3282,y:91.6625}},{t:this.shape_8,p:{x:134.1431,y:378.7156}},{t:this.shape_7,p:{x:61.6457,y:207.7625}},{t:this.shape_6,p:{x:202.475,y:204.4625}},{t:this.shape_5,p:{x:105.014,y:222.4563}},{t:this.shape_4,p:{x:151.8383,y:212.255}},{t:this.shape_3,p:{x:131.825,y:139.625}},{t:this.shape_2,p:{x:171.1514,y:140.025}},{t:this.shape_1,p:{x:181.725,y:183.575}},{t:this.shape,p:{x:79.875,y:160.7}}]},63).to({state:[{t:this.shape_10,p:{x:154.3282,y:91.6625}},{t:this.shape_8,p:{x:134.1431,y:378.7156}},{t:this.shape_7,p:{x:61.6457,y:207.7625}},{t:this.shape_6,p:{x:202.475,y:204.4625}},{t:this.shape_5,p:{x:105.014,y:222.4563}},{t:this.shape_4,p:{x:151.8383,y:212.255}},{t:this.shape_3,p:{x:131.825,y:139.625}},{t:this.shape_2,p:{x:171.1514,y:140.025}},{t:this.shape_1,p:{x:181.725,y:183.575}},{t:this.shape,p:{x:79.875,y:160.7}}]},59).to({state:[]},63).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_EMT_ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// EMT_
	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(563.85,423.9,0.9976,0.9973,0,0,0,0.4,0.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(585).to({_off:false},0).to({regX:0.8,regY:0.7,scaleX:1.5791,scaleY:1.5779,x:538.7,y:586.45},18).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_effects = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// effects
	this.instance = new lib.Tween5("synched",0);
	this.instance.setTransform(1412.1,197.25);
	this.instance._off = true;

	this.instance_1 = new lib.Tween6("synched",0);
	this.instance_1.setTransform(369.15,-58.1);

	this.text = new cjs.Text("בצעו לחיצות\nבמרכז\nבית החזה", "54px 'Times New Roman'");
	this.text.textAlign = "center";
	this.text.lineHeight = 62;
	this.text.lineWidth = 371;
	this.text.parent = this;
	this.text.setTransform(711.75,89.2,0.9998,0.9998);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9FDED").s().p("AgTA0QgagQgLgeQgGgPACgSQACgMAGgWQAFAIABAMIADAVQAKAjAZAOQAYAPAjgKQAFgBACAAQADABABAFIgWAPQgOAIgPAAQgOAAgQgKg");
	this.shape.setTransform(1113.5983,380.932);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#B4FAE5").s().p("Ag5BGQgbgeAFgcQAAgDgEgKIADgKIACgKQAHgoAhgWQAfgUAgALQAhAMAPAjQAKAVABAgQAAAggWAaQgUAZgaAEIgQACQghAAgYgbg");
	this.shape_1.setTransform(1114.725,378.7172);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D26D28").s().p("ABKAxIgDgQIgHgUQgEgLgHgGQgggjggAJQgwAOgMAvIgDANQgCAHgIACQgEgFAAgJIAAgOQACgCAAgFQAAgGACgCIABgJIAEgEIAAgFIAFgFIAAgFIAFgEIAAgFIAQgOQApggAuASIALAEIAYAYIAFAJIAFAFIAAAFIACAFIACAEIABAEIACAFQABAEABABIABAYQAAAPgFAJQgHgFgDgJg");
	this.shape_2.setTransform(1114.7521,373.2361);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E29234").s().p("AgHByQgbgCgbgYQgbgZgHgbIgCgOQgCgIgEgFQgFgIADgKIAWhDQAEgMAMgBIADAEIgCAIIgFALIgGATQgCAFAAAJQAAASAEAGQAEAIAAAMQADAdATAVQAUAVAcABQAYABATgNQAVgPAJgdIAHgbQAEgLAAgcQAAgIgCgEIgCgGQgBgHgCgDIgCgEIgIgNIgDgEIgBgCIgPgPQgDgFADgDQAagCAPAhQAsBeg7BGIgDAEQgmAcghAAIgGAAg");
	this.shape_3.setTransform(1114.5555,379.3759);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9C521F").s().p("AgqAKQABgGAIgFQAIgGACgFIAdAAQASAAALgDQAGgBACAIQgZAYgeAAQgOAAgQgGg");
	this.shape_4.setTransform(1124.55,393.3142);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DE8B31").s().p("Ag2CIIgFgGQgCgEgDAAQgRgEgKgRIgOgfQgUglAHglQAJgyARgcQAMgTAVgOQALgIAcgOQAIADAQgEQARgDAIADQA7AcAWAxQARApgJA5QgEAYgOANQgFAFgDAHQgJAcgVAGQgGACgGAKg");
	this.shape_5.setTransform(1114.7276,377.8625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#AB8B5F").s().p("AgNAAIANgIIAFgGIAAABQAIAAABAJIgIAKQgFAGgFADQAAgKgJgFg");
	this.shape_6.setTransform(1119.275,358.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BCA473").s().p("AgIABQgKgEgBgDIAJAAQADgCAHAAQAGAAADgDQARgBgIAPIgEAFIgOAEQAAgHgIgEg");
	this.shape_7.setTransform(1116.9898,359.597);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C8B884").s().p("AAKAeQgLgDgUgLIgMgOQgGgIgCgJIgDgFIgCgJQAGgDAFAFQAHAGADAAQAbAbAYACQADADAMABQAIACgEANQgKAFgMAAIgNgCg");
	this.shape_8.setTransform(1112.364,358.1383);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A97449").s().p("AgcASIgEgEIgFgBQgEgEgLgFIAAgEIAFgPQAGgEAHABIAMAFQAXAGAPgEIAJgBQAFAAAEADQAFAJAOAAIgKAJQgPAHgUACIgPABIgVgBg");
	this.shape_9.setTransform(1114.95,361.3545);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#AC5821").s().p("AgUADQAUgKAVAKg");
	this.shape_10.setTransform(1104.175,393.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#AC5821").s().p("AADAJIgJAAQgLAIgIgJQgHgEgMABQgPAAgFgBQgBgEgJgEQgJgEAAgGICnAAQADAKgIAEIgOAIIgmACQgGAFgGAAQgGAAgGgGg");
	this.shape_11.setTransform(1113.7909,393.5131);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#986944").s().p("AgCAOIgFgDQgDgDgBgDIATgTIAEABIgGAOQgDAJgEAFg");
	this.shape_12.setTransform(1120.975,356.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#B7A070").s().p("AABAaIgIgHQgFgKABgNQABgQAAgIIAIAAQgBAOAEAOQADAKAJARQgDACgDAAQgDAAgDgDg");
	this.shape_13.setTransform(1108.4977,353.2139);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8C5F3F").s().p("Ag4AMQgKgRgCgKQgEgQAHgPQBHAABAAvQgHARgGADIgJAKQgCACgEACIgHAEIgGABQgFABgOAFIgKABQghgEgXgfg");
	this.shape_14.setTransform(1114.7523,354.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#D0772C").s().p("ABDCbQgoAChOgBQgbAAgRgJIgfgBQgPAAgBgQIgBg3QgFg1AFg0IAAgYQAIgSAPgVIAbglQATgXAWgCQAPgEAAAOIgNAKQgIAFgHACQgKAEgEAIQgLASgOALQgEAEAAACIgUAvQgJAcACAWIABATIABATIAHAfQAGARALAKIADAEQAEATAPAFQAIADAXgBQAFgHALAAIBIgBQAKgBAGAJQAmAGAQgkQADgFAIgJQAIgJACgGQAOgeAAgYQAEAWgBAtIAAAOQAAAIAEAFIABAUQAEAJgLACIgjACIgMABQgOAAgKgCg");
	this.shape_15.setTransform(1114.9052,377.3186);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#D67F2F").s().p("AAzCVQgHgIAEgGIALgKQAxgsAFg8QAEg9gugvQgegfglAAQgkAAghAdQgpAlgFA6QgFA6AhAuQADAEAOAMQAIAGACADQADAGgEAHQgUAGgMgEQgKgEgMgRQg7hVAvhvQALgbAUgVQAWgWAcgJIAIgCIAMAAQAgACAOgEQANgEAHAHQAXAHAbAaQAMALAMAUIAVAgIABASQAAAKAEAHIABADQgDA7ADBQIgBAAQgKgCgCgIQgBgDAAgNQAAgHADgRQgIAbgVAbQgMAPgMAFQgGACgHAAQgIAAgJgDg");
	this.shape_16.setTransform(1114.9204,377.0338);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#986944").s().p("AgTAKQgBgFADgFIAJgKQAGgGAFgCIADACQABAMANACIAAADIgTAPQgEADgEAAQgIAAgEgJg");
	this.shape_17.setTransform(1120.1214,359.6705);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#8C5F3F").s().p("AgKAUQgDgDgDgJIAGgQQAFgJAHgEIAPAIQgBAGgDAHIgGALIgFAFIgBAEQgCACgEAAQgDAAgCgCg");
	this.shape_18.setTransform(1121.95,357.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#936442").s().p("AADAwQgFgJgEgDQgQgbgDgZQAFgHgBgMIAAgTIAPAAQAGAHAAAOQAAAQACAFIADAKIAEAIQABAFAJANQAGAKABAIQgBALgJACQgHAAgGgHg");
	this.shape_19.setTransform(1108.025,355.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C76B28").s().p("AguA+IABg1QAGgDAEgHIAGgOQAPgcAjgTQAJAAAHAGIAKANQAAAEgCADQgYAPgUAZQgKANgYAlIgFAGQgCADgDAAIgDgBg");
	this.shape_20.setTransform(1105.225,365.6207);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CB702A").s().p("AAgA2QgNgagXgXQgQgPgegXQgCgGAHgKIALgIQAGgEAHACIAFAGQACAEACAAQAiAJAVApQABABAGAFIABAlQgDADgBAFIgCAIIgEABQgGAAgDgHg");
	this.shape_21.setTransform(1124.3039,365.837);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#87451B").s().p("AhKggQAVggAkgHIAIAAIAbAAQAqAHAVApQAaAvgOAnQAAg9gogiQgWgUgfAAQggAAgWAVQgiAfAAAiQAIAMAAAIQAAAKgNAIQgOg3Ahgxg");
	this.shape_22.setTransform(1114.7729,346.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#954C1E").s().p("AgNCkIgMgBQgTgBgDgQQgHgbgBghQAAgVACgnQABgGAHgJIABgzQAGgHAFgLIAIgTQAIgSABgaIAAgsQAGAKgBAQIAAAbQAKAIgCARQgBAUACAGQABAQgDAKQgLAwALA2QAAAIACAPQACAcAEAGQAEAFAaAHIAOAJQAIAGAAAJQgCAEgHABIgVgCQgMgBgIADIgHABIgMgCg");
	this.shape_23.setTransform(1101.7958,377.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#64311B").s().p("ABMBMIgJgEIgGgDQg/gnhBgFIgLAAQgIAAgGgGQgCggAVgbQAVgcAggGQAigHAeASQAfASALAjQAMAjgHAWQAAAUgFAIQgDACgDAAIgEgBg");
	this.shape_24.setTransform(1114.9842,348.417);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#87451B").s().p("AgPhUQgGgMAAgSIAAgdIAAgeIAMAAIAbABIABDdQADAjAAAPQAAAcgIAWQgEAMgDAFQgGAIgKAAg");
	this.shape_25.setTransform(1098.225,356.3458);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#4E3952").s().p("AgbAKIAAgTIAEgKQADgFAHAAIAbACIAKAWQAEANAAALIgrABQgKgEgCgLg");
	this.shape_26.setTransform(1130.85,372.775);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#52373D").s().p("AgCCvQgVgkAWgkIAAhOIACgeQADgTgCgLQgFgHAAgQIAAhcQAAgRAGgHIAKAAIAAFdg");
	this.shape_27.setTransform(1142.0122,351.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#39222A").s().p("AgKCvQgFgFgCgHIAAgOIABiiQABgYgBgqIgBhCIABgPQABgJAFgFIAXAAIgBA4QAAAhACAXQAEAuAABIIAAB3g");
	this.shape_28.setTransform(1144.3525,351.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#C16226").s().p("ACFCMQgJgPgWgRQgdgWgFgGIgCgHIABgHIADgJQAEgIAGgQQACgEABgJIACgNQAMgxgdgmQgdgmgvACQgYABgVAQQgWAQgHAXQgIAYgCAOQgCAVAIARQAAAIAHATQAGARgBALIgdAfQgTATgHAPQgCAGgFACQgGACgGgHIgDgaQgCgRgEgKQgBhSAAiIIAfACIAyAEQAWABAsAAIBZAAQAgAAAPgDQAXgEALgMQAAAsgCA9IgFCCIACAXQAAAOgEAJQgDAGgFACIgCAAQgEAAgDgFg");
	this.shape_29.setTransform(1114.9597,352.2702);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#50373D").s().p("AgEMHQgGgHAGgHIAAkWQAChDgCgsQgGgJAGgFIAAgOQgNgNAFgSIABgJQgBgFACgNQAFgegBgwIgBhNQACgvgCgvQgFg4AEhJQACgRgBgMIgCgMIgCgMIACgVQgBghACg+QAChAAAgfQgBgYgCgJIAAg1QgBgiACgUIABgNIAAgSQgDgPABgfQABgJgBgXQgBgUACgNIABgUIgBgWQgDgfADgsIgBgbQAAgQAJgJIAOgBIAAY+QAAAMgDACQgCADgNACg");
	this.shape_30.setTransform(1141.8786,457.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#52383E").s().p("AgVCVIAAgrQACgsgEhOQgDhYAAgjQAAgOABgEQACgLAHgGIAhAAIABAKQAKALgCANQgBAPACAdQABAagKARIAAAJQAAAGADADIABCKQgCAzACAVIghAAQgKgJAAgRg");
	this.shape_31.setTransform(1147.3981,351.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#44334C").s().p("AAGAuQgNgGgbgEQgdgDgMgFQgLgPgDgJQgGgOAGgOQAIgIALABQAvABAbgNIARgBQAKgCAUACQAUgFANAMQAJAAAAAIIAAA9QAAAIgJAAIg/AAQgIAGgGAAIgBAAg");
	this.shape_32.setTransform(1141.2375,372.6653);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#39222A").s().p("AgeU+QgPAAAFgNQAFgQAAgYIABgpQACgqABhQQAAhTACgnQACgdAAhAQAAg9ADghQADgigBhFQAAhEADgjQACgfAAg/QAAg/ACggQADghABhsIADgEQAHgFAAgJIAAgOQgBidACkaIABm5QgBjgABnAIgBgQQAAgKAFgGQARgNAOANIgBFzQgBDbAECXQADCFAADOIAAFTIACFTQAADBgDCSQgDBkABC+QAADEgCBeg");
	this.shape_33.setTransform(1142.5406,510.2061);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#44334C").s().p("AASAwIgSgBQgKAAgIgHQgNgIgTAAQgXACgLAAIgIAAIgCAAIACgKQAGgQABgHQACgJgBgVIAAgGQARgCANADQAUADASgMQAHgFAIAAIAHABQAEABAGAFIA7AAQAJgEAFAEQAFADAAAJQACAqgIAZIgOACQgMAMgUgEIgMABIgDAAIgJgBg");
	this.shape_34.setTransform(1141.7075,329.9313);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#51383E").s().p("ABrIXIjUAAIgMAAQgHAAgCgIIAEgQQADgUARACQAOACABgQIABhGQAAgrgBgbQgHgHgBgKQADgqAAhfQgBhaAFgwQACgYAAgjIgBg8IAAg5QgBgjACgXQAIgYgBgkQgDgogBgUQAEgLgCgUQgCgVACgKIAAgWQgBgWADgnQADgqgBgTQAAgJAIgIQAMgJAPAJQAIAJAAAUIgECVQgBBcgEA6IAAAJQABA+gCBeIgFCaIgCB5QAABHgEAyIgBBIQgBAsgDAbQgBALAGAFQAEACALABIAXAAQANACAHAIIB8AAQgEAEgFABIgLgBg");
	this.shape_35.setTransform(1145.85,591.3811);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#51383E").s().p("Ag5U+QgHgGgBgKIgBgSIgBjuQAAiOAChhQAEiLAAjUIAAlfIACkrQAAiqgDiCQgDigAAj7IgBmbIAAgXQACgNAGgIQASgPATANQAHAHABAMIABAUQABA6gDB1QgCB0ABA6QABAjAFATQAEAsgEAjQAEA7gEAvQACAnAAA5IAABgQAAAOgJAKQgDAtACBZIAAB2IAAAOQAAAIAEAGQgEAHAAAJIABARQACATABAcIAAAvQAHAMgGAHQgCA8ACBdQgCAjABA3IABBaQgBARAPAAQAGAAAEAFQAGAFACAKIACAQQAEARAAAYIgBApQAAAMgKAKIAAATQAHAGACAKIABATIAAAtQgBAcAFARQABAIAAAGQgCBGAECNQAECNgBBGQAAAPACAbQADAcAAAOQAAAagKAPQgCANACAVQAJAIAAAUIABA5QgBAZACAHQADARARAJQAFACgCAJQgBAEADAKQADAJgCAFQgfADgfAAQgfAAgfgDg");
	this.shape_36.setTransform(1151.824,510.2802);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},16).to({state:[{t:this.instance_1}]},131).to({state:[]},1).to({state:[{t:this.text,p:{scaleX:0.9998,scaleY:0.9998,x:711.75,y:89.2,text:"בצעו לחיצות\nבמרכז\nבית החזה",lineWidth:371,font:"54px 'Times New Roman'",color:"#000000",lineHeight:61.8}}]},67).to({state:[{t:this.text,p:{scaleX:0.9999,scaleY:0.9999,x:711.8,y:75.8,text:"בקצב של \n100 בדקה\nלפחות",lineWidth:287,font:"54px 'Times New Roman'",color:"#000000",lineHeight:61.8}}]},50).to({state:[{t:this.text,p:{scaleX:0.9999,scaleY:0.9999,x:711.8,y:96.3,text:"אל תפסיקו\nעד שנגיע",lineWidth:248,font:"68px 'Times New Roman'",color:"#EE3342",lineHeight:77.3}}]},53).to({state:[]},53).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},167).wait(146));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(16).to({_off:false},0).to({_off:true,x:369.15,y:-58.1},131).wait(537));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_buttons = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// buttons
	this.StartButton = new lib.Start();
	this.StartButton.name = "StartButton";
	this.StartButton.setTransform(717.15,339.3,1,1,11.0001,0,0,-36.6,0.1);
	new cjs.ButtonHelper(this.StartButton, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.StartButton).to({_off:true},1).wait(689).to({_off:false,regX:0,regY:0,rotation:0,x:923.55,y:442.85},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ambulance = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ambulance
	this.instance = new lib.Tween32("synched",0);
	this.instance.setTransform(-238.05,409.15);
	this.instance._off = true;

	this.instance_1 = new lib.Tween33("synched",0);
	this.instance_1.setTransform(929.9,409.15);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(493).to({_off:false},0).to({x:-125},6).to({_off:true,x:929.9},56).wait(133));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(499).to({_off:false},56).wait(1).to({startPosition:0},0).wait(6).to({startPosition:0},0).wait(97).to({x:929.25,y:408.85},0).to({x:1522.05},28).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.secondmandownLDeficopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_107
	this.ikNode_52 = new lib.Symbol75();
	this.ikNode_52.name = "ikNode_52";
	this.ikNode_52.setTransform(105.9,-222.95,0.9999,0.9999,0,0.3873,-179.6127,96.5,162.8);

	this.ikNode_53 = new lib.Symbol76();
	this.ikNode_53.name = "ikNode_53";
	this.ikNode_53.setTransform(104.55,-115.75,0.999,0.999,0,-0.1812,179.8189,83.8,117.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_53},{t:this.ikNode_52}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.secondmandownLDeficopy, new cjs.Rectangle(54.5,-449.2,134.6,585.8), null);


(lib.secondmandownRDefi = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_85
	this.ikNode_52 = new lib.Symbol75();
	this.ikNode_52.name = "ikNode_52";
	this.ikNode_52.setTransform(220.3,-231.55,0.9991,0.9991,0,20.4184,-159.5816,117.6,153.8);

	this.ikNode_53 = new lib.Symbol76();
	this.ikNode_53.name = "ikNode_53";
	this.ikNode_53.setTransform(173.3,-101.65,0.9979,0.9979,0,37.8409,-142.1591,103.7,139.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_53,p:{regY:139.1,scaleX:0.9979,scaleY:0.9979,skewX:37.8409,skewY:-142.1591,x:173.3,y:-101.65,regX:103.7}},{t:this.ikNode_52,p:{regX:117.6,scaleX:0.9991,scaleY:0.9991,skewX:20.4184,skewY:-159.5816,x:220.3,y:-231.55}}]}).to({state:[{t:this.ikNode_53,p:{regY:139,scaleX:0.9978,scaleY:0.9978,skewX:19.9904,skewY:-160.0096,x:179.8,y:-100.15,regX:103.7}},{t:this.ikNode_52,p:{regX:117.5,scaleX:0.999,scaleY:0.999,skewX:17.5344,skewY:-162.4656,x:220.45,y:-231.7}}]},1).to({state:[{t:this.ikNode_53,p:{regY:139,scaleX:0.9978,scaleY:0.9978,skewX:7.1436,skewY:-172.8564,x:194.45,y:-96.6,regX:103.7}},{t:this.ikNode_52,p:{regX:117.5,scaleX:0.999,scaleY:0.999,skewX:11.2246,skewY:-168.7754,x:220.35,y:-231.7}}]},1).to({state:[{t:this.ikNode_53,p:{regY:139,scaleX:0.9978,scaleY:0.9978,skewX:-0.9507,skewY:179.0493,x:227.3,y:-94.3,regX:103.7}},{t:this.ikNode_52,p:{regX:117.5,scaleX:0.999,scaleY:0.999,skewX:-2.5581,skewY:177.4419,x:220.35,y:-231.7}}]},1).to({state:[{t:this.ikNode_53,p:{regY:139,scaleX:0.9978,scaleY:0.9978,skewX:12.7528,skewY:-167.2472,x:218.65,y:-94.15,regX:103.6}},{t:this.ikNode_52,p:{regX:117.5,scaleX:0.999,scaleY:0.999,skewX:1.0747,skewY:-178.9253,x:220.25,y:-231.7}}]},1).to({state:[{t:this.ikNode_53,p:{regY:139,scaleX:0.9978,scaleY:0.9978,skewX:23.0154,skewY:-156.9846,x:188.4,y:-97.85,regX:103.7}},{t:this.ikNode_52,p:{regX:117.5,scaleX:0.999,scaleY:0.999,skewX:13.7465,skewY:-166.2535,x:220.3,y:-231.65}}]},1).to({state:[{t:this.ikNode_53,p:{regY:139.1,scaleX:0.9978,scaleY:0.9978,skewX:32.4902,skewY:-147.5098,x:163.35,y:-106.3,regX:103.7}},{t:this.ikNode_52,p:{regX:117.6,scaleX:0.999,scaleY:0.999,skewX:24.7542,skewY:-155.2458,x:220.2,y:-231.6}}]},1).to({state:[{t:this.ikNode_53,p:{regY:139,scaleX:0.9978,scaleY:0.9978,skewX:46.3935,skewY:-133.6065,x:153.65,y:-111.15,regX:103.7}},{t:this.ikNode_52,p:{regX:117.5,scaleX:0.999,scaleY:0.999,skewX:29.334,skewY:-150.666,x:220.3,y:-231.4}}]},1).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.6,-451.6,422.90000000000003,606.4000000000001);


(lib.secondmandownLDefi = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_107
	this.ikNode_52 = new lib.Symbol75();
	this.ikNode_52.name = "ikNode_52";
	this.ikNode_52.setTransform(105.9,-222.95,0.9999,0.9999,0,0.3873,-179.6127,96.5,162.8);

	this.ikNode_53 = new lib.Symbol76();
	this.ikNode_53.name = "ikNode_53";
	this.ikNode_53.setTransform(104.55,-115.75,0.999,0.999,0,-0.1812,179.8189,83.8,117.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_53,p:{scaleX:0.999,scaleY:0.999,skewX:-0.1812,skewY:179.8189,x:104.55,y:-115.75,regX:83.8,regY:117.6}},{t:this.ikNode_52,p:{regY:162.8,scaleX:0.9999,scaleY:0.9999,skewX:0.3873,skewY:-179.6127,x:105.9,y:-222.95}}]}).to({state:[{t:this.ikNode_53,p:{scaleX:0.9989,scaleY:0.9989,skewX:12.5094,skewY:-167.4906,x:93.9,y:-116.45,regX:83.8,regY:117.6}},{t:this.ikNode_52,p:{regY:162.9,scaleX:0.9998,scaleY:0.9998,skewX:6.158,skewY:-173.842,x:105.95,y:-222.8}}]},1).to({state:[{t:this.ikNode_53,p:{scaleX:0.9989,scaleY:0.9989,skewX:27.7323,skewY:-152.2677,x:68.3,y:-122.55,regX:83.8,regY:117.6}},{t:this.ikNode_52,p:{regY:162.9,scaleX:0.9998,scaleY:0.9998,skewX:20.3056,skewY:-159.6944,x:106,y:-222.75}}]},1).to({state:[{t:this.ikNode_53,p:{scaleX:0.9989,scaleY:0.9989,skewX:44.4238,skewY:-135.5762,x:68.55,y:-122.35,regX:83.9,regY:117.7}},{t:this.ikNode_52,p:{regY:162.9,scaleX:0.9999,scaleY:0.9999,skewX:20.079,skewY:-159.921,x:106,y:-222.65}}]},1).to({state:[{t:this.ikNode_53,p:{scaleX:0.9989,scaleY:0.9989,skewX:59.4022,skewY:-120.5978,x:50.9,y:-130.8,regX:83.8,regY:117.6}},{t:this.ikNode_52,p:{regY:162.9,scaleX:0.9998,scaleY:0.9998,skewX:30.6907,skewY:-149.3093,x:105.95,y:-222.55}}]},1).to({state:[{t:this.ikNode_53,p:{scaleX:0.9989,scaleY:0.9989,skewX:38.5234,skewY:-141.4766,x:47.35,y:-133,regX:83.8,regY:117.6}},{t:this.ikNode_52,p:{regY:162.8,scaleX:0.9998,scaleY:0.9998,skewX:32.9523,skewY:-147.0477,x:106.05,y:-222.55}}]},1).to({state:[{t:this.ikNode_53,p:{scaleX:0.9989,scaleY:0.9989,skewX:11.3913,skewY:-168.6087,x:89.45,y:-116.75,regX:83.8,regY:117.5}},{t:this.ikNode_52,p:{regY:162.9,scaleX:0.9999,scaleY:0.9999,skewX:8.6191,skewY:-171.3809,x:106.05,y:-222.35}}]},1).to({state:[{t:this.ikNode_53,p:{scaleX:0.999,scaleY:0.999,skewX:-1.284,skewY:178.716,x:113.2,y:-115.6,regX:83.8,regY:117.7}},{t:this.ikNode_52,p:{regY:162.9,scaleX:0.9999,scaleY:0.9999,skewX:-4.1964,skewY:175.8036,x:105.9,y:-222.5}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(54.5,-449.2,134.6,585.8);


(lib.secondmandownLDefiisueem = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_107
	this.ikNode_52 = new lib.Symbol75();
	this.ikNode_52.name = "ikNode_52";
	this.ikNode_52.setTransform(105.9,-222.95,0.9999,0.9999,0,0.3873,-179.6127,96.5,162.8);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_52).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.secondmandownLDefiisueem, new cjs.Rectangle(54.5,-449.2,107.6,302), null);


(lib.fullLeg3fallMen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_1
	this.ikNode_1 = new lib.upLeg();
	this.ikNode_1.name = "ikNode_1";
	this.ikNode_1.setTransform(83.75,-18.95,0.9995,0.9995,3.0455,0,0,43.2,-6.8);

	this.ikNode_2 = new lib.downLeg();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(86.8,25.95,0.9973,0.9973,2.7301,0,0,31.8,-23.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_2},{t:this.ikNode_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fullLeg3fallMen, new cjs.Rectangle(60.4,-39,54.4,125.1), null);


(lib.armOnChestfallMen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.Tween4("synched",0);
	this.instance.setTransform(591,-534.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#2F2F34").ss(1,1,1).p("AgKgZIATgIIgJgMAATAuQgbgUgKAT");
	this.shape.setTransform(603.05,-586.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(0.1,1,1).p("AANg+IAAASIABAkIgbAAIAAg2gAARAFQANgIgHAlQgCAMgEARQghgEgIAEIAAg6g");
	this.shape_1.setTransform(602.6349,-585.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC99").s().p("AgYAFIApAAQANgIgHAlIgBAAIgBgBIgBgBQgLgHgIgBIgBAAIAAAAQgIAAgFAJIgBAAIAAABIAAgBIABAAQAFgJAIAAIAAAAIABAAQAIABALAHIABABIABABIABAAIgGAdQghgEgIAEgAAXAiIAAAAgAgNg+IAaAAIAAASIgKgNIAKANIgTAIIATgIIABAkIgbAAgAANgsgAANgsg");
	this.shape_2.setTransform(602.6349,-585.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#333333").ss(0.1,1,1).p("Ag7C2Igmk1AA9i0IAlEF");
	this.shape_3.setTransform(580.3,-540.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF9900").s().p("AidGDIAAgBQgOgKgIgIQgIgIgBgHQgDiYAXinIAdj2IAhhEIAAAAQgUgjA1hLQAQgOAIgXQATgNA3AbQgHAbgLAXQAuAuA+AUIgLglIACgNQAlAdgCAYIgGAnIAMAaQAnBagCAmIAFD5IgCAAIAAACIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAAAIAAABIAAABIgBAAIAAABIAAAAIgBABIAAACIAAAAIgBABIAAAAIAAABIgBABIAAABIAAAAIAAABIgBAAIAAACIAAAAIgBABIAAABIAAABIAAABIgBABIAAADIAAABIAAAAIgBAAIAAACIAAAAIAAABIgBAAIAAAAIAAABIAAAAIgBABIAAABIAAAAIAAABIgBAAIAAABIAAABIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAACIAAAAIgBABIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAACIAAAAIAAABIgBABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAABIAAABIAAAAIgBAAIAAACIAAAAIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAACIAAAAIAAABIgBAAIAAABIAAAAIgBAAIAAABIAAAAIAAACIgBAAIAAABIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAABIgBAAIAAABIAAAAIAAABIgBABIAAAAIAAACIgBABIAAAAIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAAAIAAACIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAACIAAAAIAAAAIgBABIAAAAIAAACIgBAAIAAABIAAAAIAAACIgBAAIAAABIAAAAIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAAAIAAABIgBAAIAAABIAAAAIgBABIAAAAIAAAAIAAABIgBABIAAAAIAAAAIAAABIgBAAIAAABIAAAAIgBABIAAACIgBAAIAAAAIAAABIgDgBIAAADIgBAFIAAABIAAAAIAAADIgBACQgKBDgaAVQgKAIgMABIgGA3QjBgQgfgdgAhbCKIglk0gABCAmIglkGg");
	this.shape_4.setTransform(583.4577,-536.1336);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5E3D3B").s().p("AgKgKIAVAAQgCATgSACg");
	this.shape_5.setTransform(601.1061,-491.734,0.0926,0.0926);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#5E3D3B").s().p("AgUgJIAqABQgEAOgRAEg");
	this.shape_6.setTransform(600.8192,-491.5512,0.0926,0.0926);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#333333").ss(0.1,1,1).p("AC0n1IAIgPQAYALAJgXQABgWgXgBIgNAFQgOgWgcAIQgKgkggALQgbglgdAgQgZgTgiAYQgEAGgLgDQgKATgaANQgbAOANAWQAMAWgBAAQgDAWAPAGQAMAUgFAVQASAvAeAxQgBAXgFAVQg4gbgTANQgIAXgQAOQgMASgJAPQgbAyAPAbIAAAAIghBEIgdD2QgXCnADCYQABAHAIAIQAIAIAOAKIAAABQAVAUBeANQAuAHA/AFIBtAMQACgBABgBAA+lkQADgDACgDQgMgMAHgOQAKgcAaAaQAKgtAUgtQAOgDAFgRQARAMAQgNQALAVAAAOQABAUgFATQgEAcAMALQAPANgDANQgUAGgCAVQgDATgFAPQgcgHgHgmIArALACIm1QAuAHgDgOQgegGgNANgAAmlTQANgHALgKQAYBDA4AbQgXAGghgVIgDAMIgJAwIgCANIALAlQg6gSgqgqQgDgDgEgDACxktQgMAigXAFAAmlTQANAqAgAgAgGkbQgHAbgLAXAgjkWQgmADAxAqAhahvQASAFAOAHQAcANAQAYAhGiVIgUAmQgigDgZAPQgHADgFAFAiKiWQA6gGAKAHQBDAhBIAGABKjZQAlAdgCAYIgGAnQAGANAGANQAnBagCAlIAFD/AAAlHQAVgEARgIABlGMIAAADQgBADAAADQAAADgBACQgKBDgaAVQgKAIgMABIgGA3ACUI8QACgBACgCQAKgIAIgLQANgUACggQACgjgMgxAB9JeQABgBAAAAQAFgEADgFQAHgKADgMAi4I8QAAAMAJADAi9IFIAFA3");
	this.shape_7.setTransform(586.6082,-549.1295);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF9933").s().p("AgqApIhEgMIgqgJQgJgDAAgMIAAAAIgFg2QAVAUBeANQAuAHA/AFIBtALQgDAMgHAKIgIAJIgBABQgaAKgpABIgNAAQgvAAg/gJg");
	this.shape_8.setTransform(584.325,-492.416);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFCC00").s().p("AhKBNIAGg3QAMgBAKgIQAagUAKhDIABgFIABgGIAAgDIBJASQAMAxgCAiQgCAggNAUQgIALgKAIIgEADIgBAAIgDACg");
	this.shape_9.setTransform(597.6143,-500.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E9B24A").s().p("AAAAAIABAAIAAAAIAAABIAAAAIgBgBg");
	this.shape_10.setTransform(602.225,-520.8187);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF9966").s().p("AgDAfIgCAMQghgggNgpQAOgHAKgKQAYBCA3AbIgKACQgUAAgZgRg");
	this.shape_11.setTransform(595.6,-580.0429);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgUgVIApALQgDASgEAOQgcgGgGglg");
	this.shape_12.setTransform(602.95,-581.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFCC99").s().p("AhtBrIgGgHQALgWAGgbQAFgVACgXQAVgEARgHQANApAhAgIgJAvIgDAOIALAlQg5gTgsgpgAgdgVIAGgGQgNgMAHgPQALgbAYAaQAKgtAUgtQAOgDAGgRQARAMAPgNQAMAVgBANQABAVgEATQgFAcANALQAPANgDANQgUAFgDAWIgrgLQAHAlAdAHQgMAhgYAGQg3gbgYhCgAA/hXQgCAGAAAHQAAAHACAFQADAFAEABQADgBADgFQADgFAAgHQAAgHgDgGQgDgEgDAAQgEAAgDAEgAAthmQAtAHgCgOQgKgCgIAAQgRAAgIAJg");
	this.shape_13.setTransform(595.775,-582.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#242638").s().p("Ah1ArQAFgVgMgUQgPgFADgWIgLgWQgNgWAbgOQAagNAKgTQALADAEgGQAjgYAZATQAcggAbAlQAggLAKAkQAcgIAOAWIANgFQAXABgBAWQgJAXgYgLIgIAPQgQANgRgMQgFARgOADQgUAsgKAtQgagagJAcQgHAOAMAMIgFAGQgLAKgNAHQgRAIgVAEQgfgxgSgvgABWBFQgDgFAAgHQAAgHADgFQADgFADAAQAEAAACAFQADAFAAAHQAAAHgDAFQgCAGgEAAQgDAAgDgGgABDAdQANgNAeAGQACAJgUAAQgKAAgPgCg");
	this.shape_14.setTransform(593.5252,-595.8045);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.armOnChestfallMen, new cjs.Rectangle(563.5,-610.7,46.299999999999955,123.30000000000007), null);


(lib.fullLeg3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_1
	this.ikNode_1 = new lib.upLeg();
	this.ikNode_1.name = "ikNode_1";
	this.ikNode_1.setTransform(83.75,-18.95,0.9995,0.9995,3.0455,0,0,43.2,-6.8);

	this.ikNode_2 = new lib.downLeg();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(86.8,25.95,0.9973,0.9973,2.7301,0,0,31.8,-23.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_2},{t:this.ikNode_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fullLeg3, new cjs.Rectangle(60.4,-39,54.4,125.1), null);


(lib.armTuchChest = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.Tween3("synched",0);
	this.instance.setTransform(604.35,-521.05);

	this.instance_1 = new lib.Tween4("synched",0);
	this.instance_1.setTransform(591,-534.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[]},23).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:591,y:-534.7},2).wait(25));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(0.1,1,1).p("Ag7C2Igmk1AA9i0IAlEF");
	this.shape.setTransform(580.3,-540.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AidGDIAAgBQgOgKgIgIQgIgIgBgHQgDiYAXinIAdj2IAhhEIAAAAQgUgjA1hLQAQgOAIgXQATgNA3AbQgHAbgLAXQAuAuA+AUIgLglIACgNQAlAdgCAYIgGAnIAMAaQAnBagCAmIAFD5IgCAAIAAACIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAAAIAAABIAAABIgBAAIAAABIAAAAIgBABIAAACIAAAAIgBABIAAAAIAAABIgBABIAAABIAAAAIAAABIgBAAIAAACIAAAAIgBABIAAABIAAABIAAABIgBABIAAADIAAABIAAAAIgBAAIAAACIAAAAIAAABIgBAAIAAAAIAAABIAAAAIgBABIAAABIAAAAIAAABIgBAAIAAABIAAABIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAACIAAAAIgBABIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAACIAAAAIAAABIgBABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAABIAAABIAAAAIgBAAIAAACIAAAAIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAACIAAAAIAAABIgBAAIAAABIAAAAIgBAAIAAABIAAAAIAAACIgBAAIAAABIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAABIgBAAIAAABIAAAAIAAABIgBABIAAAAIAAACIgBABIAAAAIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAAAIAAACIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAACIAAAAIAAAAIgBABIAAAAIAAACIgBAAIAAABIAAAAIAAACIgBAAIAAABIAAAAIAAAAIgBAAIAAABIAAAAIAAABIgBAAIAAABIAAAAIAAACIgBAAIAAAAIAAABIgBAAIAAABIAAAAIgBABIAAAAIAAAAIAAABIgBABIAAAAIAAAAIAAABIgBAAIAAABIAAAAIgBABIAAACIgBAAIAAAAIAAABIgDgBIAAADIgBAFIAAABIAAAAIAAADIgBACQgKBDgaAVQgKAIgMABIgGA3QjBgQgfgdgAhbCKIglk0gABCAmIglkGg");
	this.shape_1.setTransform(583.4577,-536.1336);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[]},25).wait(2));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5E3D3B").s().p("AgKgKIAVAAQgCATgSACg");
	this.shape_2.setTransform(601.1061,-491.734,0.0926,0.0926);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5E3D3B").s().p("AgUgJIAqABQgEAOgRAEg");
	this.shape_3.setTransform(600.8192,-491.5512,0.0926,0.0926);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#333333").ss(0.1,1,1).p("AC0n1IAIgPQAYALAJgXQABgWgXgBIgNAFQgOgWgcAIQgKgkggALQgbglgdAgQgZgTgiAYQgEAGgLgDQgKATgaANQgbAOANAWQAMAWgBAAQgDAWAPAGQAMAUgFAVQASAvAeAxQgBAXgFAVQg4gbgTANQgIAXgQAOQgMASgJAPQgbAyAPAbIAAAAIghBEIgdD2QgXCnADCYQABAHAIAIQAIAIAOAKIAAABQAVAUBeANQAuAHA/AFIBtAMQACgBABgBAC0n1QALAVAAAOQABAUgFATQgEAcAMALQAPANgDANQgUAGgCAVQgDATgFAPQgcgHgHgmIArALAA+lkQADgDACgDQgMgMAHgOQAKgcAaAaQAKgtAUgtQAOgDAFgRQARAMAQgNACIm1QAuAHgDgOQgegGgNANgAAmlTQANgHALgKQAYBDA4AbQgXAGghgVIgDAMIgJAwIgCANIALAlQg6gSgqgqQgDgDgEgDACxktQgMAigXAFAAmlTQANAqAgAgAgGkbQgHAbgLAXAgjkWQgmADAxAqAhahvQgigDgZAPQgHADgFAFAhahvQASAFAOAHQAcANAQAYAiKiWQA6gGAKAHIgUAmABKjZQAlAdgCAYIgGAnQAGANAGANQAnBagCAlIAFD/AhGiVQBDAhBIAGAAAlHQAVgEARgIABlGMIAAADQgBADAAADQAAADgBACQgKBDgaAVQgKAIgMABIgGA3ACUI8QACgBACgCQAKgIAIgLQANgUACggQACgjgMgxAB9JeQABgBAAAAQAFgEADgFQAHgKADgMAi4I8QAAAMAJADAi9IFIAFA3");
	this.shape_4.setTransform(586.6082,-549.1295);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF9933").s().p("AgqApIhEgMIgqgJQgJgDAAgMIAAAAIgFg2QAVAUBeANQAuAHA/AFIBtALQgDAMgHAKIgIAJIgBABQgaAKgpABIgNAAQgvAAg/gJg");
	this.shape_5.setTransform(584.325,-492.416);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC00").s().p("AhKBNIAGg3QAMgBAKgIQAagUAKhDIABgFIABgGIAAgDIBJASQAMAxgCAiQgCAggNAUQgIALgKAIIgEADIgBAAIgDACg");
	this.shape_6.setTransform(597.6143,-500.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E9B24A").s().p("AAAAAIABAAIAAAAIAAABIAAAAIgBgBg");
	this.shape_7.setTransform(602.225,-520.8187);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF9966").s().p("AgDAfIgCAMQghgggNgpQAOgHAKgKQAYBCA3AbIgKACQgUAAgZgRg");
	this.shape_8.setTransform(595.6,-580.0429);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUgVIApALQgDASgEAOQgcgGgGglg");
	this.shape_9.setTransform(602.95,-581.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFCC99").s().p("AhtBrIgGgHQALgWAGgbQAFgVACgXQAVgEARgHQANApAhAgIgJAvIgDAOIALAlQg5gTgsgpgAgdgVIAGgGQgNgMAHgPQALgbAYAaQAKgtAUgtQAOgDAGgRQARAMAPgNQAMAVgBANQABAVgEATQgFAcANALQAPANgDANQgUAFgDAWIgrgLQAHAlAdAHQgMAhgYAGQg3gbgYhCgAA/hXQgCAGAAAHQAAAHACAFQADAFAEABQADgBADgFQADgFAAgHQAAgHgDgGQgDgEgDAAQgEAAgDAEgAAthmQAtAHgCgOQgKgCgIAAQgRAAgIAJg");
	this.shape_10.setTransform(595.775,-582.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#242638").s().p("Ah1ArQAFgVgMgUQgPgFADgWIgLgWQgNgWAbgOQAagNAKgTQALADAEgGQAjgYAZATQAcggAbAlQAggLAKAkQAcgIAOAWIANgFQAXABgBAWQgJAXgYgLIgIAPQgQANgRgMQgFARgOADQgUAsgKAtQgagagJAcQgHAOAMAMIgFAGQgLAKgNAHQgRAIgVAEQgfgxgSgvgABWBFQgDgFAAgHQAAgHADgFQADgFADAAQAEAAACAFQADAFAAAHQAAAHgDAFQgCAGgEAAQgDAAgDgGgABDAdQANgNAeAGQACAJgUAAQgKAAgPgCg");
	this.shape_11.setTransform(593.5252,-595.8045);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AgkA1IABgDIA1h1IATCHIhIgS");
	this.shape_12.setTransform(611.9,-433.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF9900").s().p("AgjAyIA0h1IATCHg");
	this.shape_13.setTransform(600.375,-514.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#333333").ss(0.1,1,1).p("AC0n1IAIgPQAYALAJgXQABgWgXgBIgNAFQgOgWgcAIQgKgkggALQgbglgdAgQgZgTgiAYQgEAGgLgDQgKATgaANQgbAOANAWQAMAWgBAAQgDAWAPAGQAMAUgFAVQASAvAeAxQgBAXgFAVQgHAbgLAXAA+lkQADgDACgDQgMgMAHgOQAKgcAaAaQAKgtAUgtQAOgDAFgRQARAMAQgNQALAVAAAOQABAUgFATQgEAcAMALQAPANgDANQgUAGgCAVQgDATgFAPQgcgHgHgmIArALACIm1QAuAHgDgOQgegGgNANgAAmlTQANgHALgKQAYBDA4AbQgXAGghgVIgDAMIgJAwIgCANIALAlQg6gSgqgqQgDgDgEgDACxktQgMAigXAFAAmlTQANAqAgAgAgjkWQgmADAxAqAgGkbQg4gbgTANQgIAXgQAOQgMASgJAPQgbAyAPAbIAAAAQA6gGAKAHIgUAmQASAFAOAHQAcANAQAYAiKiWIghBEIgdD2QgXCnADCYQABAHAIAIQAIAIAOAKIAAABQAVAUBeANQAuAHA/AFIBtAMAhahvQgigDgZAPQgHADgFAFABKjZQAlAdgCAYIgGAnQAGANAGANQAnBagCAlIAFD/AAAlHQAVgEARgIAhGiVQBDAhBIAGABlGMIAAADQgBADAAADQAAADgBACQgKBDgaAVQgKAIgMABIgGA3ACUI8QACgBACgCQAKgIAIgLQANgUACggQACgjgMgxAB9JeQABgBAAAAQAFgEADgFQAHgKADgMQACgBABgBAi4I8QAAAMAJADAi9IFIAFA3");
	this.shape_14.setTransform(586.6082,-549.1295);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AgkA1IACgDIA0h1IATCHIhHgS");
	this.shape_15.setTransform(600.35,-514.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13,p:{x:600.375}},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.shape_13,p:{x:600.425}},{t:this.shape_15},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_14},{t:this.shape_3},{t:this.shape_2}]},17).to({state:[]},8).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-610.7,635.6,184.70000000000005);


(lib.armMainMen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.Symbol1();
	this.instance.setTransform(-15.4,58.3,1,1,0,0,0,30.6,11.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.ikNode_45 = new lib.Symbol23();
	this.ikNode_45.name = "ikNode_45";
	this.ikNode_45.setTransform(-39.9,38.1,1,1,0,0,0,15.7,38.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9B24A").s().p("AgTgHQAagBANAPIgHABQgTAAgNgPg");
	this.shape.setTransform(-41.8129,31.7287,0.0926,0.0926);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AAAAAIAAAAIAAAAg");
	this.shape_1.setTransform(-31.175,54.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.ikNode_45}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.armMainMen, new cjs.Rectangle(-55.6,0,70.8,86.5), null);


(lib.upperMainMen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.armMainMen();
	this.instance.setTransform(101.45,73.55,1,1,0,0,0,35.1,43.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5E3D3B").s().p("AgKgKIAVAAQgCATgSACg");
	this.shape.setTransform(47.3561,117.966,0.0926,0.0926);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5E3D3B").s().p("AgUgJIAqABQgEAOgRAEg");
	this.shape_1.setTransform(47.0692,118.1488,0.0926,0.0926);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E9B24A").s().p("AgUgHQAcgDANASIgHABQgVAAgNgQg");
	this.shape_2.setTransform(47.9832,88.7292,0.0926,0.0926);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E9B24A").s().p("AgMgFIAWgCQAFAHgDAIIgCAAQgNAAgJgNg");
	this.shape_3.setTransform(48.4638,88.8913,0.0926,0.0926);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#333333").ss(0.1,1,1).p("AC0n1IAIgPQAYALAJgXQABgWgXgBIgNAFQgOgWgcAIQgKgkggALQgbglgdAgQgZgTgiAYQgEAGgLgDQgKATgaANQgbAOANAWQAMAWgBAAQgDAWAPAGQAMAUgFAVQASAvAeAxQAVgEARgIQANgHALgKQADgDACgDQgMgMAHgOQAKgcAaAaQAKgtAUgtQAOgDAFgRQARAMAQgNQALAVAAAOQABAUgFATQgEAcAMALQAPANgDANQgUAGgCAVQgDATgFAPQgMAigXAFQgXAGghgVIgDAMACIm1QAuAHgDgOQgegGgNANgABKjZQAlAdgCAYIgGAnQAGANAGANQAnBagCAlIAFD/ACxktQgcgHgHgmIArALAgGkbQg4gbgTANQgIAXgQAOQg1BLAUAjIAAAAQA6gGAKAHIgUAmQASAFAOAHQAcANAQAYAAAlHQgBAXgFAVQgHAbgLAXABKjZIgCANIALAlQg+gUgtguAgjkWQgmADAxAqAhahvQgigDgZAPQgGADgGAFAiKiWIghBEIgdD2QgXCnADCYQABAHAIAIQAIAIAOAKIAAABQAVAUBeANQAuAHA/AFIBtAMQACgBABgBQABAAAAAAQACgBACgCQALgHAHgMQANgUACggQACgigLgvQgBgBAAgBACCFIIgDgBAhGiVQBDAhBIAGAA+lkQAYBDA4AbAAmlTQANAqAgAgIgJAwACoGLIABACABlGPIAAAAQgBADAAADQAAADgBACQgKBDgaAVQgKAIgMABIgGA3AB9JeQABgBAAAAQAFgEADgFQAHgKADgMAi9IFIAFA3IAAAAQABAMAIAD");
	this.shape_4.setTransform(32.8582,60.5705);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF9900").s().p("AAkAuIgJAAIAAgBIgFAAIgFAAIgCgBIgCAAIAAgBIgDAAIgBgBIAAgBIgDAAIAAgBIAAAAIgHAAIgBgBIgCAAIgCgBIgBAAIgBgBIgCAAIgBgBIAAAAIgCgBIgBAAIgCgBIgCAAIAAgBIAAgBIgDAAIgBgBIgBAAIgBgBIgDAAIgHgBIgDAAIAAAAIgBgBIAAgCIAFAAIAAgBIAAAAIgEgBIAAgEIABgBIAAAAIAAgBIABAAIAAgBIABgBIAAgEIAAAAIABgBIAAAAIAAgBIAAAAIABgBIAAAAIABgBIAAAAIAAgBIAAgBIABgBIABAAIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAAAIABgBIAAAAIAAgBIABAAIABAAIAAAAIAAgBIAAAAIABgBIAAgDIAAAAIAAgEIABAAIAAgBIABAAIABgCIABgBIAAAAIAAgBIABAAIAAgBIABgBIABAAIAAgBIAAgBIACgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIABAAIABgBIAAAAIAAgBIAAgBIAAgBIAAgCIAAgBIAAgCIAAgBIAAAAIAEgBIAAgBIAAAAIAAgBIgBAAIAAgEIAAAAIAAgBIAAgCIAJAAIAAABIABAAIAAACIAAAAIAKAAIAAABIAAABIABABIAAABIADAAIAAABIAAADIACAAIAAAFIABAAIAAADIAAAAIAAAAIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAAAIAAABIAAABIABABIAAACIABABIAAACIAAABIAAAEIABAAIAAACIAAABIABAAIAAAAIAAABIABAAIAAABIABABIAAABIAAAAIAAABIABAAIAAABIAAABIAAABIABAAIAAACIAAAAIAAABIABABIAAAAIAAABIABAAIAAABIAAAAIAAADIABAAIAAABIABAAIAAAEIgBAAIAAAEIAAABIAAABIABAAIAAAAIAAAAIAAABIABAAIAAACIAAAAIAAABIABAAIAAABIAAABIABAAIAAACIAAAAIAAABIABAAIAAABIAAAAIABAAIAAACIAAAAIABABIABAAIABABIAAAAIAAADIAAAAIgCAAIAAABg");
	this.shape_5.setTransform(46.725,97.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF9933").s().p("AgqApQgggFgkgHIgqgJQgJgDAAgMIAAAAIgFg2QAVATBeAOQAuAHA/AFIBtALQgDAMgHAKIgIAJIgBABQgaAKgpABIgNAAQgvAAg/gJg");
	this.shape_6.setTransform(30.575,117.284);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC00").s().p("AhKBMIAGg3QAMgCAKgIQAagUAKhDIABgEIABgGIAAgBIADAAIAGABIADAAIAAABIABAAIACABIACAAIABABIAAAAIACABIACAAIAAABIACAAIABABIABAAIABABIACAAIABABIACABIABAAIABABIAJAAIAAAAIAAABIACAAIABABIABAAIACABIABAAIACABIABAAIAFABIAGAAIAAAAIAJAAIABADQALAugCAhQgCAggNAVQgHALgLAIIgEACIgBABIgDACg");
	this.shape_7.setTransform(43.8641,109.2125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF9966").s().p("AgDAfIgCAMQghgggNgpQANgHALgKQAYBCA3AbIgKACQgUAAgZgRg");
	this.shape_8.setTransform(41.85,29.6571);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUgVIAqALQgDASgFAOQgcgGgGglg");
	this.shape_9.setTransform(49.2,28.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFCC99").s().p("AhzBlQALgXAGgbQAFgVACgXQAVgEARgIQANAqAhAgIgJAwIgDANIALAlQg+gUgtgugAgdgVIAGgGQgNgMAHgOQALgcAYAZQAKgsAUguQAOgCAGgRQARAMAPgNQAMAVgBAOQABAUgEASQgFAcANAMQAPANgDANQgUAFgDAWIgrgLQAHAlAdAGQgMAjgYAFQg3gbgYhCgAA/hWQgCAFAAAHQAAAHACAFQADAGAEgBQADABADgGQADgFAAgHQAAgHgDgFQgDgFgDgBQgEABgDAFgAAthmQAtAGgCgNQgKgCgIAAQgRAAgIAJg");
	this.shape_10.setTransform(42.025,27.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#242638").s().p("Ah1ArQAFgVgMgUQgPgFADgWIgLgWQgNgWAbgOQAagNAKgTQALADAEgGQAjgYAZATQAcggAbAlQAggLAKAkQAcgIAOAWIANgFQAXABgBAWQgJAXgYgLIgIAPQgQANgRgMQgFARgOADQgUAsgKAtQgagagJAcQgHAOAMAMIgFAGQgLAKgNAHQgRAIgVAEQgfgxgSgvgABWBFQgDgFAAgHQAAgHADgFQADgFADAAQAEAAACAFQADAFAAAHQAAAHgDAFQgCAGgEAAQgDAAgDgGgABDAdQANgNAeAGQACAJgUAAQgKAAgPgCg");
	this.shape_11.setTransform(39.7752,13.8955);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.upperMainMen, new cjs.Rectangle(9.7,-1,71.8,123.3), null);


(lib.Tween20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.secondmanup();
	this.instance.setTransform(0.55,-47,0.2378,0.2377,0,0,0,1220.7,319.5);

	this.instance_1 = new lib.secondmandownL();
	this.instance_1.setTransform(15,61.15,0.197,0.1973,0,0,0,115.2,-158.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.9,-119.3,109.9,238.6);


(lib.Tween31 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.secondmanupDefi();
	this.instance.setTransform(-42.75,-45.1,0.2461,0.246,0,0,0,1021,310.6);

	this.instance_1 = new lib.secondmandownLDefi();
	this.instance_1.setTransform(6.3,62.05,0.1876,0.1894,0,0,0,122.3,-157.6);

	this.instance_2 = new lib.secondmandownRDefi();
	this.instance_2.setTransform(-31.95,60.45,0.1874,0.1873,0,0,0,176.1,-159.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.7,-117.7,125.5,235.5);


(lib.Tween30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.secondmanupDefi();
	this.instance.setTransform(-42.75,-45.1,0.2461,0.246,0,0,0,1021,310.6);

	this.instance_1 = new lib.secondmandownLDefi();
	this.instance_1.setTransform(6.3,62.05,0.1876,0.1894,0,0,0,122.3,-157.6);

	this.instance_2 = new lib.secondmandownRDefi();
	this.instance_2.setTransform(-31.95,60.45,0.1874,0.1873,0,0,0,176.1,-159.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.7,-117.7,125.5,235.5);


(lib.Tween27 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.secondmanupDefi();
	this.instance.setTransform(-42.8,-45.05,0.2461,0.246,0,0,0,1021,310.6);

	this.instance_1 = new lib.secondmandownLDefi();
	this.instance_1.setTransform(6.25,62.1,0.1876,0.1894,0,0,0,122.3,-157.6);

	this.instance_2 = new lib.secondmandownRDefi();
	this.instance_2.setTransform(-32,60.5,0.1874,0.1873,0,0,0,176.1,-159.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.7,-117.7,125.4,235.5);


(lib.Tween26 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.secondmanupDefi();
	this.instance.setTransform(-42.85,-45.2,0.2461,0.246,0,0,0,1021,310.2);

	this.instance_1 = new lib.secondmandownLDefi();
	this.instance_1.setTransform(6.2,61.95,0.1877,0.1894,0,0,0,122,-158.1);

	this.instance_2 = new lib.secondmandownRDefi();
	this.instance_2.setTransform(-32.05,60.35,0.1874,0.1873,0,0,0,175.8,-159.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.7,-117.7,125.4,235.5);


(lib.Tween23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.armOnChestfallMen();
	this.instance.setTransform(-29.35,-0.4,0.8295,0.7259,-89.4712,0,0,586.4,-548.1);

	this.instance_1 = new lib.fullLeg3fallMen();
	this.instance_1.setTransform(47.7,-0.05,0.6445,0.6447,-89.4738,0,0,87.2,24.5);

	this.instance_2 = new lib.fullLeg3fallMen();
	this.instance_2.setTransform(47.55,-5.65,0.6445,0.6447,-89.4738,0,0,87.4,24.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AhNAOIgDgBIChgaIgBAC");
	this.shape.setTransform(-5.0623,-13.9885,0.6449,0.6448);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AhQgUIACAAICdgaIACgBIgVBfg");
	this.shape_1.setTransform(-4.9655,-11.7156,0.6449,0.6448);

	this.instance_3 = new lib.Tween8("synched",0);
	this.instance_3.setTransform(0.8,0.7,1.0184,1.0174,0,0,0,0.8,0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.shape_1},{t:this.shape},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.9,-77.6,295.8,155.3);


(lib.Tween22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.armOnChestfallMen();
	this.instance.setTransform(-45.65,-0.75,1.2862,1.1255,-89.4694,0,0,586.5,-548.3);

	this.instance_1 = new lib.fullLeg3fallMen();
	this.instance_1.setTransform(73.95,-0.3,0.9995,0.9997,-89.4709,0,0,87.5,24.4);

	this.instance_2 = new lib.fullLeg3fallMen();
	this.instance_2.setTransform(73.6,-8.9,0.9995,0.9997,-89.4709,0,0,87.6,24.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AhNAOIgDgBIChgaIgBAC");
	this.shape.setTransform(-7.875,-21.7454,1,0.9998);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AhQgUIACAAICdgaIACgBIgVBfg");
	this.shape_1.setTransform(-7.725,-18.2212,1,0.9998);

	this.instance_3 = new lib.Tween8("synched",0);
	this.instance_3.setTransform(1.25,1.05,1.5791,1.5775,0,0,0,0.8,0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.shape_1},{t:this.shape},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-229.4,-120.4,458.8,240.8);


(lib.Scene_1_ManSCN2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ManSCN2
	this.instance = new lib.armOnChestfallMen();
	this.instance.setTransform(491.8,584.8,1.2864,1.1254,-89.4733,0,0,586.2,-548);

	this.instance_1 = new lib.fullLeg3fallMen();
	this.instance_1.setTransform(611.3,585,0.9997,0.9997,-89.4753,0,0,87.1,24.7);

	this.instance_2 = new lib.fullLeg3fallMen();
	this.instance_2.setTransform(611.35,576.4,0.9997,0.9997,-89.4753,0,0,87.2,24.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AhNAOIgDgBIChgaIgBAC");
	this.shape.setTransform(529.5516,563.6369);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AhQgUIABAAICegbIACAAIgVBfg");
	this.shape_1.setTransform(529.7016,567.1742);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF9900").s().p("AhQgUIACAAICdgaIACgBIgVBfg");
	this.shape_2.setTransform(529.725,567.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape,p:{x:529.5516,y:563.6369}},{t:this.instance_2,p:{regX:87.2,regY:24.8,rotation:-89.4753,x:611.35,y:576.4}},{t:this.instance_1,p:{regX:87.1,regY:24.7,rotation:-89.4753,x:611.3,y:585}},{t:this.instance,p:{regX:586.2,regY:-548,scaleX:1.2864,scaleY:1.1254,rotation:-89.4733,y:584.8}}]},371).to({state:[]},30).to({state:[{t:this.shape_2},{t:this.shape,p:{x:529.575,y:563.625}},{t:this.instance_2,p:{regX:87.6,regY:24.3,rotation:-89.4674,x:611.1,y:576.75}},{t:this.instance_1,p:{regX:87.5,regY:24.3,rotation:-89.4674,x:611.55,y:585.35}},{t:this.instance,p:{regX:586.5,regY:-548.4,scaleX:1.2866,scaleY:1.1256,rotation:-89.4664,y:584.7}}]},33).to({state:[{t:this.shape_2},{t:this.shape,p:{x:529.575,y:563.625}},{t:this.instance_2,p:{regX:87.6,regY:24.3,rotation:-89.4674,x:611.1,y:576.75}},{t:this.instance_1,p:{regX:87.5,regY:24.3,rotation:-89.4674,x:611.55,y:585.35}},{t:this.instance,p:{regX:586.5,regY:-548.4,scaleX:1.2866,scaleY:1.1256,rotation:-89.4664,y:584.7}}]},169).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_EMT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// EMT
	this.instance = new lib.Tween7("synched",0);
	this.instance.setTransform(906.15,424);
	this.instance._off = true;

	this.instance_1 = new lib.Tween8("synched",0);
	this.instance_1.setTransform(564.15,424);

	this.instance_2 = new lib.armOnChestfallMen();
	this.instance_2.setTransform(491.8,584.7,1.2866,1.1256,-89.4664,0,0,586.5,-548.4);

	this.instance_3 = new lib.fullLeg3fallMen();
	this.instance_3.setTransform(611.65,585.4,0.9997,0.9997,-89.4674,0,0,87.5,24.4);

	this.instance_4 = new lib.fullLeg3fallMen();
	this.instance_4.setTransform(611.15,576.8,0.9997,0.9997,-89.4674,0,0,87.6,24.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AhNAOIgDgBIChgaIgBAC");
	this.shape.setTransform(529.575,563.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AhQgUIACAAICdgaIACgBIgVBfg");
	this.shape_1.setTransform(529.725,567.15);

	this.instance_5 = new lib.Tween22("synched",0);
	this.instance_5.setTransform(537.45,585.35);
	this.instance_5._off = true;

	this.instance_6 = new lib.Tween23("synched",0);
	this.instance_6.setTransform(493.8,401.7);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},562).to({state:[{t:this.instance_1,p:{regX:0,regY:0,scaleX:1,scaleY:1,x:564.15,y:424}}]},22).to({state:[]},1).to({state:[{t:this.instance_1,p:{regX:0.8,regY:0.7,scaleX:1.5791,scaleY:1.5779,x:538.7,y:586.45}},{t:this.shape_1},{t:this.shape},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},18).to({state:[{t:this.instance_5}]},6).to({state:[{t:this.instance_6}]},25).to({state:[{t:this.instance_6}]},19).to({state:[]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(562).to({_off:false},0).to({_off:true,x:564.15},22).wait(71));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(609).to({_off:false},0).to({_off:true,x:493.8,y:401.7},25).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(609).to({_off:false},25).to({x:885.3,y:421.3},19).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.flettMen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(36,38,56,0)").ss(1,1,1).p("AgegcIA1AAIAAATIAAABIAJADIAAAAIgJAhIAAACIg1AAg");
	this.shape.setTransform(56.55,-93.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#242638").ss(0.1,1,1).p("AgEgBIAFABIAEAAIAAABQgBAAABAA");
	this.shape_1.setTransform(59.25,-94.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#242638").ss(1,1,1).p("AgCg0IAUAPIABAAIgRAMAAbAqQgCgBgCgBQgCgBgDgBAAbAqQgXgHgeAS");
	this.shape_2.setTransform(57,-98.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFCC99").ss(0.1,1,1).p("AgLAAIgMAAIAAggIAvAAIAAAgIgBAAIgBAAgAAXAAIAAAAIAAAhIgiAAIAAgh");
	this.shape_3.setTransform(56.575,-102.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFCC99").s().p("AgfBKIAAg7IA1AAIAAAUIAAAAIAGACIADABIgJgDIAJADIAAABIgBgBQgGgBgHAAIAAAAIAAAAQgRAAgUALIgCABIACgBQAUgLARAAIAAAAIAAAAQAHAAAGABIABABIgJAiIAAABgAAfAmgAAfAmgAAfAmIAAAAgAAfAmIAAAAgAAcAlIADAAIAAABIAAAAIgDgBgAAcAlgAgKgHIAAgiIAgAAIABABIgQALIAQgLIAAAhgAAWgpIABAAIAAABgAAXgpIgBAAIgUgOIAUAOIggAAIgNAAIAAggIAvAAIAAAgg");
	this.shape_4.setTransform(56.55,-98.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.instance = new lib.armOnChestfallMen();
	this.instance.setTransform(35.8,-55.95,1.2867,1.1257,0,0,0,586.5,-548.5);

	this.instance_1 = new lib.fullLeg3fallMen();
	this.instance_1.setTransform(36.8,63.4,1,1,0,0,0,87.5,23.6);

	this.instance_2 = new lib.fullLeg3fallMen();
	this.instance_2.setTransform(45.35,63.4,1,1,0,0,0,87.5,23.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AAXhQIAZChIhfgXg");
	this.shape_5.setTransform(53.775,-17.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF9900").s().p("AgvA6IBGiKIAZChg");
	this.shape_6.setTransform(53.775,-17.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flettMen, new cjs.Rectangle(7.4,-124.9,65.19999999999999,250.8), null);


(lib.walkMan = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.upperMainMen();
	this.instance.setTransform(60.1,-45.55,1.1307,1.1304,0,0,0,56.1,61.1);

	this.instance_1 = new lib.fullLeg2();
	this.instance_1.setTransform(42.15,57.3,1,1,-4.4431,0,0,21.2,59.8);

	this.instance_2 = new lib.fullLeg();
	this.instance_2.setTransform(0.25,43.15,1,1,0,0,0,-7.5,41.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.walkMan, new cjs.Rectangle(-50.4,-114.6,139.2,234.8), null);


(lib.Tween25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween20("synched",0);

	this.instance_1 = new lib.secondmandownR();
	this.instance_1.setTransform(6.45,59.8,0.1984,0.1985,0,0,0,122.2,-156.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.9,-119.3,110,238.6);


(lib.Tween24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween20("synched",0);

	this.instance_1 = new lib.secondmandownR();
	this.instance_1.setTransform(6.45,59.8,0.1984,0.1985,0,0,0,122.2,-156.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.9,-119.3,110,238.6);


(lib.Tween29 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween27("synched",0);
	this.instance.setTransform(-5,6.8,1.1232,1.1165,0,0,180,8.1,6.2);

	this.instance_1 = new lib.דפיברילטור();
	this.instance_1.setTransform(-39.45,25.25,0.0459,0.0459,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74.3,-131.4,148.89999999999998,262.8);


(lib.Tween28 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween27("synched",0);
	this.instance.setTransform(-5,6.8,1.1232,1.1165,0,0,180,8.1,6.2);

	this.instance_1 = new lib.דפיברילטור();
	this.instance_1.setTransform(-39.45,25.25,0.0459,0.0459,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74.3,-131.4,148.89999999999998,262.8);


(lib.Scene_1_Man2SCN2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Man2SCN2
	this.instance = new lib.Tween26("synched",0);
	this.instance.setTransform(619.4,461.9);
	this.instance._off = true;

	this.instance_1 = new lib.Tween27("synched",0);
	this.instance_1.setTransform(1387.3,530.45);
	this.instance_1._off = true;

	this.instance_2 = new lib.secondmanupDeficopy();
	this.instance_2.setTransform(758.6,540.7,0.2576,0.2575,0,0,0,1219.5,319.1);

	this.instance_3 = new lib.secondmandownLDeficopy();
	this.instance_3.setTransform(735,658.05,0.2173,0.217,0,0,0,102,-161.7);

	this.instance_4 = new lib.secondmandownLDeficopy();
	this.instance_4.setTransform(762.1,658.1,0.2173,0.2171,0,0,0,101.7,-162);

	this.instance_5 = new lib.דפיברילטור();
	this.instance_5.setTransform(803,550,0.0461,0.0461);

	this.instance_6 = new lib.Tween28("synched",0);
	this.instance_6.setTransform(744.9,591.45);
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween29("synched",0);
	this.instance_7.setTransform(550.3,528.85);
	this.instance_7._off = true;

	this.instance_8 = new lib.secondmanupDefiisueem();
	this.instance_8.setTransform(504.6,490.85,0.2411,0.241,0,0,0,1101.5,311.2);

	this.instance_9 = new lib.secondmandownLDefiisueem();
	this.instance_9.setTransform(515.15,576.2,0.1768,0.1766,0,0,0,116.2,-292.8);

	this.instance_10 = new lib.secondmandownLDefiisueem();
	this.instance_10.setTransform(490.05,576.2,0.1768,0.1766,0,0,0,116.2,-292.8);

	this.instance_11 = new lib.Tween30("synched",0);
	this.instance_11.setTransform(533.35,478.05);
	this.instance_11._off = true;

	this.instance_12 = new lib.Tween31("synched",0);
	this.instance_12.setTransform(1416.85,478.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},371).to({state:[{t:this.instance_1}]},29).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_4,p:{regX:101.7,regY:-162,scaleX:0.2173,scaleY:0.2171,x:762.1,y:658.1}},{t:this.instance_3,p:{regX:102,regY:-161.7,scaleX:0.2173,scaleY:0.217,x:735,y:658.05}},{t:this.instance_2,p:{regX:1219.5,regY:319.1,scaleX:0.2576,scaleY:0.2575,x:758.6,y:540.7}}]},1).to({state:[{t:this.instance_5,p:{scaleY:0.0461,x:803,y:550,scaleX:0.0461}},{t:this.instance_4,p:{regX:104.1,regY:-159.8,scaleX:0.2171,scaleY:0.2169,x:762.7,y:658.2}},{t:this.instance_3,p:{regX:104.4,regY:-159.6,scaleX:0.2171,scaleY:0.2169,x:735.6,y:658.15}},{t:this.instance_2,p:{regX:1222.3,regY:321.2,scaleX:0.2574,scaleY:0.2573,x:759.2,y:540.8}}]},4).to({state:[{t:this.instance_4,p:{regX:102.9,regY:-160.8,scaleX:0.2172,scaleY:0.217,x:762.4,y:657.75}},{t:this.instance_3,p:{regX:103.2,regY:-160.7,scaleX:0.2172,scaleY:0.2169,x:735.3,y:657.7}},{t:this.instance_5,p:{scaleY:0.046,x:791,y:608,scaleX:0.0461}},{t:this.instance_2,p:{regX:1221,regY:320.4,scaleX:0.2575,scaleY:0.2574,x:758.9,y:540.4}}]},7).to({state:[{t:this.instance_5,p:{scaleY:0.0459,x:799,y:617,scaleX:0.046}},{t:this.instance_1}]},9).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},6).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},13).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8}]},1).to({state:[{t:this.instance_11}]},115).to({state:[{t:this.instance_12}]},21).to({state:[]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(371).to({_off:false},0).to({_off:true,x:1387.3,y:530.45},29).wait(186));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(371).to({_off:false},29).wait(1).to({regX:0.4,regY:0.3,scaleX:0.9936,scaleY:0.9997,x:611.05,y:524.3},0).to({regX:0.1,regY:0.1,scaleX:0.9999,scaleY:0.9999,x:649.95,y:539.8},1).to({regX:0.4,regY:0.5,scaleX:0.9998,scaleY:0.9998,x:756.15,y:586.1},3).to({_off:true},1).wait(20).to({_off:false,regX:8.1,regY:6.2,scaleX:1.1233,scaleY:1.1167,x:764.55,y:598.4},0).to({_off:true},1).wait(159));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(427).to({_off:false},0).to({_off:true,x:550.3,y:528.85},6).wait(153));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(427).to({_off:false},6).wait(1).to({x:1217.15,y:524.05},0).to({x:497.55,y:460.05},13).to({_off:true},1).wait(138));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(563).to({_off:false},0).to({_off:true,x:1416.85},21).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Man2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Man2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#323232").s().p("AAdApIAAgCIACAAQAFAAADgCQACgCABgDIAAgJIAAgiQAAgJgCgEQgEgGgHAAQgFAAgEACQgFADgHAGIAAABIAAAEIAAAlQAAAJABABQAAABABAAQAAABAAAAQABABAAAAQABABABAAQACABAGABIAAACIgnAAIAAgCQAGgBADgBQACgCABgDIABgJIAAgiQAAgJgDgEQgEgGgHAAQgFAAgEACQgIAEgEAFIAAAqIABAKQAAABABABQAAAAABABQAAAAABAAQAAABABAAQACABAGABIAAACIgnAAIAAgCQAFgBACgBIAEgEIABgKIAAgdQAAgNgBgEIgCgFIgEgBIgFABIgCgDIAZgJIADAAIAAARIALgKIAIgGQAFgBAEAAQAIAAAEAEQAGAFACAIQAJgLAGgDQAGgEAHABQAGgBAFAEQAFADADAHQACAGAAAKIAAAiIABAKIADAEQADABAFABIAAACg");
	this.shape.setTransform(378.325,535.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#323232").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQATAAAKAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgDAHAAAKQAAARAGANQAIAMAKAAQAIAAAGgHQAGgHAAgRQAAgUgKgMQgGgJgIAAQgFAAgFADg");
	this.shape_1.setTransform(366.8,535.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgXAfQgKgLAAgUQAAgSALgMQAMgMAOAAQAMAAAIAHQAHAGAAAHQAAADgBACQgDACgEAAQgEAAgEgDQgBgCAAgFQgBgFgDgDQgDgDgFAAQgIAAgGAHQgGAIgBAPQABANAGALQAIALAKAAQAJAAAHgGQAFgEAEgLIADACQgDAQgKAIQgJAJgLAAQgNAAgLgMg");
	this.shape_2.setTransform(358.3,535.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#323232").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_3.setTransform(352.05,538.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#323232").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_4.setTransform(347.425,533.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#323232").s().p("AALAnQgCgDgBgHQgLAKgDABQgFACgFAAQgJAAgFgFQgGgGAAgJQAAgGADgFQADgFAJgGQAJgEAUgIIAAgDQAAgMgEgEQgEgFgFAAQgGAAgDADQgEADAAAEIAAAFQAAAEgCACQgCADgDAAQgDAAgDgDQgBgCAAgEQAAgHAHgHQAIgGAOAAQAJAAAHADQAFADADAGQABAEABALIAAAbIAAAOIABADIADABIADAAIAHgHIAAAFQgKANgKAAQgEAAgCgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQADAEAFAAQAIAAAJgJIAAgdIgQAGg");
	this.shape_5.setTransform(341.1,535.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#323232").s().p("AgSA+IAAgCQAGgBACgBQAAAAAAgBQABAAAAAAQABgBAAAAQAAgBAAgBIABgKIAAhIIAAgRQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgDgBIgGACIgBgEIAWgKIAFAAIAABqIABAKQAAABAAABQAAAAABABQAAAAABAAQAAABABAAQACABAGABIAAACg");
	this.shape_6.setTransform(334.4,532.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#323232").s().p("AgpA9IAAgEIACAAQAFABADgCIADgDQABgDAAgIIAAhMQAAgHgBgCQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgFgBIgFACIgBgDIAZgKIADAAIAAATQAGgLAHgEQAFgFAHAAQAMAAAIAKQAKALAAATQAAAUgMAOQgKALgPAAQgFAAgFgCQgDgBgFgEIAAAYQAAAIABADIAEADIAIABIAAAEgAgCgtQgEACgHAIIAAAeIABAMQABAFAFAEQAFADAGAAQAJAAAFgGQAHgJAAgQQAAgSgIgKQgFgHgIAAQgEAAgDACg");
	this.shape_7.setTransform(326.975,536.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#323232").s().p("AgPAoIgFgBQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAIgDAAIAAgcIADAAQACAMAHAGQAHAHAIAAQAGAAAEgEQADgEAAgFQAAgGgEgEQgEgEgMgGQgNgGgEgFQgDgFAAgHQAAgKAGgHQAHgHALAAQAEAAAGACIAGACIADgBIACgDIACAAIAAAcIgCAAQgEgNgFgFQgFgEgHAAQgHAAgDADQgEADAAAEQAAAFADADQACAEAJAEIAMAGQARAIAAAOQAAALgIAHQgIAHgKAAQgHAAgJgDg");
	this.shape_8.setTransform(319.425,535.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#323232").s().p("AgpA9IAAgEIACAAQAFABADgCIADgDQABgDAAgIIAAhMQAAgHgBgCQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgFgBIgFACIgBgDIAZgKIADAAIAAATQAGgLAHgEQAFgFAHAAQAMAAAIAKQAKALAAATQAAAUgMAOQgKALgPAAQgFAAgFgCQgDgBgFgEIAAAYQAAAIABADIAEADIAIABIAAAEgAgCgtQgEACgHAIIAAAeIABAMQABAFAFAEQAFADAGAAQAJAAAFgGQAHgJAAgQQAAgSgIgKQgFgHgIAAQgEAAgDACg");
	this.shape_9.setTransform(310.975,536.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#323232").s().p("AALAnQgCgDgBgHQgLAKgEABQgEACgGAAQgIAAgFgFQgFgGgBgJQABgGACgFQADgFAKgGQAJgEATgIIAAgDQAAgMgDgEQgFgFgFAAQgGAAgDADQgEADAAAEIAAAFQAAAEgCACQgCADgDAAQgDAAgCgDQgCgCAAgEQgBgHAIgHQAIgGAOAAQAJAAAIADQAEADADAGQABAEABALIAAAbIAAAOIABADIADABIADAAIAGgHIAAAFQgJANgKAAQgEAAgCgDgAgIAAQgHAEgDAEQgDAFAAAFQAAAGAEAEQAEAEAEAAQAIAAAJgJIAAgdIgQAGg");
	this.shape_10.setTransform(303.1,535.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#323232").s().p("AgkAoIAAgDIA1hGIgaAAQgIAAgDABQgCABgCADQgCAFgBAGIgDAAIAAgWIBDAAIAAADIg1BGIAcAAQAJAAAEgBQADgCACgEQABgCABgJIADAAIgBAYg");
	this.shape_11.setTransform(294.825,535.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#323232").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_12.setTransform(288.55,538.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#323232").s().p("AAWAqIgUgzIgXAzIgDAAIgahDQgCgHgDgCQgCgCgGgBIAAgDIAiAAIAAADQgFAAgBABQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABIABAHIARAtIASglIgFgMQgCgEgDgDIgIgBIAAgDIAmAAIAAADQgHAAgCACQgBAAAAABQgBAAAAABQAAAAAAABQAAABAAABIABADIASAtIARgrIACgIQAAAAAAgBQgBAAAAAAQAAgBAAAAQgBgBAAAAIgHgBIAAgDIAaAAIAAADQgIABgEAJIgbBFg");
	this.shape_13.setTransform(280.925,535.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#323232").s().p("AAWAqIgUgzIgXAzIgDAAIgahDQgCgHgDgCQgCgCgGgBIAAgDIAiAAIAAADQgFAAgBABQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABIABAHIARAtIASglIgFgMQgCgEgDgDIgIgBIAAgDIAmAAIAAADQgHAAgCACQgBAAAAABQAAAAgBABQAAAAAAABQAAABAAABIABADIASAtIARgrIACgIQAAAAAAgBQAAAAgBAAQAAgBAAAAQgBgBAAAAIgHgBIAAgDIAaAAIAAADQgIABgEAJIgbBFg");
	this.shape_14.setTransform(267.925,535.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#323232").s().p("AAWAqIgUgzIgXAzIgDAAIgahDQgCgHgDgCQgCgCgGgBIAAgDIAiAAIAAADQgFAAgBABQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABIABAHIARAtIASglIgFgMQgCgEgDgDIgIgBIAAgDIAmAAIAAADQgHAAgCACQgBAAAAABQgBAAAAABQAAAAAAABQAAABAAABIABADIASAtIARgrIACgIQAAAAAAgBQgBAAAAAAQAAgBAAAAQgBgBAAAAIgHgBIAAgDIAaAAIAAADQgIABgEAJIgbBFg");
	this.shape_15.setTransform(254.925,535.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#323232").s().p("AgYBAIAqh/IAHAAIgqB/g");
	this.shape_16.setTransform(246,533.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#323232").s().p("AgYBAIAqh/IAHAAIgqB/g");
	this.shape_17.setTransform(241,533.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#323232").s().p("AgGAoQgDgDAAgEQAAgEADgDQADgDADAAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAQgDAAgDgDgAgGgZQgDgDAAgEQAAgEADgDQADgDADAAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAQgDAAgDgDg");
	this.shape_18.setTransform(235.975,535.175);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#323232").s().p("AgPAoIgFgBQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAIgDAAIAAgcIADAAQACAMAHAGQAHAHAIAAQAGAAAEgEQADgEAAgFQAAgGgEgEQgEgEgMgGQgNgGgEgFQgDgFAAgHQAAgKAGgHQAHgHALAAQAEAAAGACIAGACIADgBIACgDIACAAIAAAcIgCAAQgEgNgFgFQgFgEgHAAQgHAAgDADQgEADAAAEQAAAFADADQACAEAJAEIAMAGQARAIAAAOQAAALgIAHQgIAHgKAAQgHAAgJgDg");
	this.shape_19.setTransform(230.075,535.175);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#323232").s().p("AgpA9IAAgEIACAAQAFABADgCIADgDQABgDAAgIIAAhMQAAgHgBgCQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAgBAAAAIgFgBIgFACIgBgDIAZgKIADAAIAAATQAGgLAHgEQAFgFAHAAQAMAAAIAKQAKALAAATQAAAUgMAOQgKALgPAAQgFAAgFgCQgDgBgFgEIAAAYQAAAIABADIAEADIAIABIAAAEgAgCgtQgEACgHAIIAAAeIABAMQABAFAFAEQAFADAGAAQAJAAAFgGQAHgJAAgQQAAgSgIgKQgFgHgIAAQgEAAgDACg");
	this.shape_20.setTransform(221.625,536.975);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#323232").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_21.setTransform(215.075,533.925);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#323232").s().p("AgDA0QgEgCgCgFQgCgEAAgIIAAg2IgMAAIAAgDQAEgBAFgFQAFgFAEgGIAFgMIADAAIAAAaIATAAIAAAGIgTAAIAAA0QAAAHACADQACADAEAAQADAAACgCQADgCACgDIADAAQgDAIgGAFQgFAEgGAAQgEAAgDgCg");
	this.shape_22.setTransform(210.075,533.925);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#323232").s().p("AAEA+IAAgCIACAAQAGAAACgCQACgCABgDIAAgJIAAgcQAAgOgBgDQgBgEgDgCQgDgCgFAAQgEAAgDACQgFADgGAGIAAAqIAAAKIADAEQADABAGABIAAACIgnAAIAAgCQAEAAAEgCQAAgBABAAQAAAAAAAAQABgBAAAAQAAgBABgBIAAgKIAAhIIAAgRQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgEgBIgFACIgCgEIAYgKIAFAAIAAA8QAJgMAFgDQAGgCAFAAQAHAAAFADQAFAEACAJQACAEAAAPIAAAcIABALIADADQACABAGABIAAACg");
	this.shape_23.setTransform(202.95,532.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#323232").s().p("AAdApIAAgCIACAAQAFAAADgCQACgCABgDIAAgJIAAgiQAAgJgCgEQgEgGgHAAQgFAAgEACQgFADgHAGIAAABIAAAEIAAAlQAAAJABABQAAABABAAQAAABAAAAQABABAAAAQABABABAAQACABAGABIAAACIgnAAIAAgCQAGgBADgBQACgCABgDIABgJIAAgiQAAgJgDgEQgEgGgHAAQgFAAgEACQgIAEgEAFIAAAqIABAKQAAABABABQAAAAABABQAAAAABAAQAAABABAAQACABAGABIAAACIgnAAIAAgCQAFgBACgBIAEgEIABgKIAAgdQAAgNgBgEIgCgFIgEgBIgFABIgCgDIAZgJIADAAIAAARIALgKIAIgGQAFgBAEAAQAIAAAEAEQAGAFACAIQAJgLAGgDQAGgEAHABQAGgBAFAEQAFADADAHQACAGAAAKIAAAiIABAKIADAEQADABAFABIAAACg");
	this.shape_24.setTransform(186.975,535.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#323232").s().p("AgdAcQgJgMAAgPQAAgKAFgLQAGgLAJgFQAJgGAJAAQASAAALAOQAKAMAAAQQAAAJgFALQgGALgJAGQgJAGgKAAQgSAAgLgPgAgLghQgFADgCAHQgDAHgBAKQABARAGANQAIAMAKAAQAIAAAGgHQAGgHgBgRQABgUgKgMQgGgJgIAAQgGAAgEADg");
	this.shape_25.setTransform(175.45,535.175);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#323232").s().p("AgcApIAAgCQAGAAADgCQACgCABgDIABgJIAAgeIgBgQIgCgFIgEgBIgGABIgBgDIAYgJIAEAAIAAASQAKgSAKAAQAFAAADACQADADAAAEQAAAEgCACQgDACgDABQgCAAgFgDIgFgEQgBAAAAABQAAAAgBAAQAAAAgBAAQAAABgBAAQgEAEgDAIIAAAlQAAAHABAEIAEAEQADABAFABIAAACg");
	this.shape_26.setTransform(168.05,535.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#323232").s().p("AgiA+IAAgCIADAAQAEAAADgCQADgCABgDIABgMIAAgzIgPAAIAAgHIAPAAIAAgFQAAgMAEgJQAEgIAIgFQAHgGAJAAQAKAAAHAHQAGADAAAGQAAACgCACQgDADgCAAIgEgBQgDgCgDgFIgGgHQgDgBgDAAQgEAAgDACQgCADgBAEQgBAFgBASIAAAGIAVAAIAAAHIgVAAIAAAzQABALACADQADAFAFAAIAHAAIAAACg");
	this.shape_27.setTransform(163.2,532.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#323232").s().p("AgWAfQgLgLAAgUQAAgSAMgMQAKgMAQAAQAMAAAHAHQAIAGAAAHQAAADgDACQgCACgDAAQgGAAgCgDQgCgCAAgFQgBgFgDgDQgDgDgGAAQgHAAgFAHQgIAIABAPQgBANAIALQAGALAMAAQAIAAAHgGQAFgEAFgLIACACQgDAQgJAIQgKAJgMAAQgNAAgJgMg");
	this.shape_28.setTransform(150.45,535.175);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#323232").s().p("AgSA+IAAgCQAGgBACgBQABAAAAgBQAAAAABAAQAAgBAAAAQABgBAAgBQABgCABgIIAAgeQAAgOgBgCQgBgBAAgBQAAAAAAgBQAAgBgBAAQAAAAgBgBIgDgBIgGABIgBgDIAXgJIAEAAIAAA/IABAKQAAABABABQAAAAAAABQABAAAAAAQABABABAAQACABAFABIAAACgAgEguQgDgDAAgEQAAgEADgCQACgCADgBQAEABACACQADACAAAEQAAAEgDADQgCACgEAAQgDAAgCgCg");
	this.shape_29.setTransform(144,532.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#323232").s().p("AgPAoIgFgBQgBAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAIgDAAIAAgcIADAAQACAMAHAGQAHAHAIAAQAGAAAEgEQADgEAAgFQAAgGgEgEQgEgEgMgGQgNgGgEgFQgDgFAAgHQAAgKAGgHQAHgHALAAQAEAAAGACIAGACIADgBIACgDIACAAIAAAcIgCAAQgEgNgFgFQgFgEgHAAQgHAAgDADQgEADAAAEQAAAFADADQACAEAJAEIAMAGQARAIAAAOQAAALgIAHQgIAHgKAAQgHAAgJgDg");
	this.shape_30.setTransform(138.075,535.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#323232").s().p("AARAqIAAgRQgKAKgGAEQgEADgGAAQgHAAgFgFQgFgDgCgHQgCgFAAgMIAAgjQAAgGgBgCQAAAAgBgBQAAAAgBgBQAAAAgBAAQAAgBgBAAQgCgBgHAAIAAgDIAdAAIAAA1QAAAKAEAEQADAEAGAAQADAAAFgDQAEgCAHgHIAAgtQAAgGgDgDQgCgCgIAAIAAgDIAbAAIAAAvQAAAOABAEQAAAAABABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAIAGgCIABAEIgYAKg");
	this.shape_31.setTransform(129.925,535.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#323232").s().p("AAaA7IAAgDIAEAAQAIAAADgFQACgCAAgKIAAhPIgtBjIgDAAIguhjIAABPQAAALACACQADAEAIAAIAEAAIAAADIgqAAIAAgDIAEAAQAIAAADgFQACgCAAgKIAAhNQAAgIgCgDQgBgDgDgCQgDgCgIAAIAAgCIAiAAIAqBbIArhbIAiAAIAAACIgFAAQgHAAgDAFQgCADAAAKIAABNQAAALACACQADAEAHAAIAFAAIAAADg");
	this.shape_32.setTransform(117.425,533.25);

	this.instance = new lib.Tween24("synched",0);
	this.instance.setTransform(1342.15,458.25);
	this.instance._off = true;

	this.instance_1 = new lib.Tween25("synched",0);
	this.instance_1.setTransform(589.05,458.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#E9E9E9").ss(0.1,1,1).p("A8nxjMA5OAAAMAAAAjHMg5OAAAg");
	this.shape_33.setTransform(645.95,127.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#E9E9E9").s().p("A8nRjMAAAgjFMA5OAAAMAAAAjFg");
	this.shape_34.setTransform(645.95,127.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[]},1).to({state:[{t:this.instance}]},174).to({state:[{t:this.instance_1}]},39).to({state:[{t:this.shape_34},{t:this.shape_33}]},1).wait(156));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(175).to({_off:false},0).to({_off:true,x:589.05},39).wait(157));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Man = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Man
	this.instance = new lib.walkMan();
	this.instance.setTransform(-46.85,465.55,1,1,0,0,0,39.6,-3.4);

	this.instance_1 = new lib.armTuchChest();
	this.instance_1.setTransform(673.5,409.65,1.1307,1.1304,0,0,0,599.9,-548.6);

	this.instance_2 = new lib.fullLeg3();
	this.instance_2.setTransform(661.8,524.4,1,1,0,0,0,87.5,23.6);

	this.instance_3 = new lib.fullLeg3();
	this.instance_3.setTransform(667.65,524.4,1,1,0,0,0,87.5,23.6);

	this.instance_4 = new lib.flettMen();
	this.instance_4.setTransform(661.85,465.35,1,1,0,0,0,40,0.5);

	this.instance_5 = new lib.armOnChestfallMen();
	this.instance_5.setTransform(642.05,407.95,1.2867,1.1258,-4.9852,0,0,586.5,-548.5);

	this.instance_6 = new lib.fullLeg3fallMen();
	this.instance_6.setTransform(653.45,526.8,0.9998,0.9998,-4.9845,0,0,88.5,23.9);

	this.instance_7 = new lib.fullLeg3fallMen();
	this.instance_7.setTransform(661.55,526.05,0.9998,0.9998,-4.9845,0,0,87.7,23.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AgUhJIACgGIAnCfIgEgB");
	this.shape.setTransform(666.9125,443.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9900").s().p("AgvBCIA4iRIABAGIAmCYIAAABg");
	this.shape_1.setTransform(663.8,443.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AgThJIABgDIBDCVIgGAAIhbAE");
	this.shape_2.setTransform(641.7,444.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF9900").s().p("AgwBNIAeiZIABADIBCCSIgEAAIhbAEg");
	this.shape_3.setTransform(641.5,444.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AgthNIBdCFIhfAWg");
	this.shape_4.setTransform(616.35,449.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF9900").s().p("AgshNIBbCFIhdAWg");
	this.shape_5.setTransform(616.35,449.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AgYBBIgiiMIAKAIAA7AjIhRApIgBgF");
	this.shape_6.setTransform(586.4,464.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF9900").s().p("AggBHIgXiEIgDgPIB0ByIgGADIhSAkIgBAAg");
	this.shape_7.setTransform(587.1,463.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AhFhBIgDgEIAzAaABIAGIABAAIgIAHAADBCIgEAEIg4hu");
	this.shape_8.setTransform(552.65,489.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF9900").s().p("AABBBIg8hrIgOgZIACABIAwAWIBhAtIgEAEIgHAHIg8A5g");
	this.shape_9.setTransform(552.825,489.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AAXhQIAZChIhfgWg");
	this.shape_10.setTransform(552.275,511.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF9900").s().p("AhPg4ICfAgIg2BRg");
	this.shape_11.setTransform(531.425,517.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AA+AvIgBACIh6hhIACAA");
	this.shape_12.setTransform(514.075,541.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF9900").s().p("AAoAvIh5heICjAHIgpBZg");
	this.shape_13.setTransform(516.3,541.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("rgba(255,204,153,0)").ss(0.3,1,1).p("AhNAOIgDgBIChgaIgBAC");
	this.shape_14.setTransform(511.775,560.2125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF9900").s().p("AhQgUIABAAICegbIACAAIgVBfg");
	this.shape_15.setTransform(511.925,563.75);

	this.instance_8 = new lib.Bitmap5_1();
	this.instance_8.setTransform(106,33,0.6674,0.6725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},46).to({state:[{t:this.instance}]},62).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},7).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},1).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},2).to({state:[{t:this.instance_4}]},23).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_7,p:{regX:87.7,regY:23.8,scaleX:0.9998,scaleY:0.9998,rotation:-4.9845,x:661.55,y:526.05}},{t:this.instance_6,p:{regY:23.9,scaleX:0.9998,scaleY:0.9998,rotation:-4.9845,x:653.45,y:526.8,regX:88.5}},{t:this.instance_5,p:{regX:586.5,regY:-548.5,scaleX:1.2867,scaleY:1.1258,rotation:-4.9852,x:642.05,y:407.95}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.instance_7,p:{regX:88.7,regY:24.5,scaleX:0.9994,scaleY:0.9994,rotation:-14.9962,x:652.2,y:526.55}},{t:this.instance_6,p:{regY:24.7,scaleX:0.9994,scaleY:0.9994,rotation:-14.9962,x:643.95,y:529.2,regX:88.5}},{t:this.instance_5,p:{regX:586.8,regY:-547.8,scaleX:1.2862,scaleY:1.1253,rotation:-14.9976,x:612.45,y:414.15}}]},1).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.instance_7,p:{regX:88,regY:24,scaleX:0.9997,scaleY:0.9997,rotation:-24.9617,x:640.05,y:527.2}},{t:this.instance_6,p:{regY:24.1,scaleX:0.9997,scaleY:0.9997,rotation:-24.9617,x:632.45,y:530.8,regX:88.2}},{t:this.instance_5,p:{regX:586.6,regY:-548.5,scaleX:1.2867,scaleY:1.1257,rotation:-24.9613,x:581.1,y:423.15}}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.instance_7,p:{regX:88.2,regY:25,scaleX:0.9994,scaleY:0.9994,rotation:-37.7446,x:627.65,y:533.95}},{t:this.instance_6,p:{regY:24.9,scaleX:0.9994,scaleY:0.9994,rotation:-37.7446,x:620.6,y:539.25,regX:88}},{t:this.instance_5,p:{regX:586.6,regY:-548.1,scaleX:1.2863,scaleY:1.1253,rotation:-37.7446,x:546.95,y:445}}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.instance_7,p:{regX:88,regY:24.8,scaleX:0.9994,scaleY:0.9994,rotation:-54.9802,x:612.6,y:542.75}},{t:this.instance_6,p:{regY:24.9,scaleX:0.9994,scaleY:0.9994,rotation:-54.9802,x:608.15,y:549.9,regX:88.1}},{t:this.instance_5,p:{regX:586.4,regY:-547.8,scaleX:1.2863,scaleY:1.1254,rotation:-54.9807,x:509.65,y:481.9}}]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.instance_7,p:{regX:87.6,regY:24.8,scaleX:0.9993,scaleY:0.9993,rotation:-69.9815,x:603.7,y:553.3}},{t:this.instance_6,p:{regY:24.9,scaleX:0.9993,scaleY:0.9993,rotation:-69.9815,x:600.8,y:561.35,regX:87.6}},{t:this.instance_5,p:{regX:586.4,regY:-547.7,scaleX:1.2862,scaleY:1.1253,rotation:-69.979,x:488.7,y:521.1}}]},1).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.instance_7,p:{regX:87.7,regY:24.7,scaleX:0.9994,scaleY:0.9994,rotation:-79.194,x:594.35,y:563.9}},{t:this.instance_6,p:{regY:24.9,scaleX:0.9994,scaleY:0.9994,rotation:-79.194,x:592.95,y:572.3,regX:87.9}},{t:this.instance_5,p:{regX:586.2,regY:-547.9,scaleX:1.2862,scaleY:1.1253,rotation:-79.1939,x:475.3,y:551}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.instance_7,p:{regX:87.6,regY:24.2,scaleX:0.9997,scaleY:0.9997,rotation:-89.4665,x:593.3,y:572.85}},{t:this.instance_6,p:{regY:24.2,scaleX:0.9997,scaleY:0.9997,rotation:-89.4665,x:593.3,y:581.45,regX:87.5}},{t:this.instance_5,p:{regX:586.5,regY:-548.4,scaleX:1.2866,scaleY:1.1257,rotation:-89.4657,x:474,y:581.3}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.instance_7,p:{regX:87.6,regY:24.2,scaleX:0.9997,scaleY:0.9997,rotation:-89.4665,x:593.3,y:572.85}},{t:this.instance_6,p:{regY:24.2,scaleX:0.9997,scaleY:0.9997,rotation:-89.4665,x:593.3,y:581.45,regX:87.5}},{t:this.instance_5,p:{regX:586.5,regY:-548.4,scaleX:1.2866,scaleY:1.1257,rotation:-89.4657,x:474,y:581.3}}]},2).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.instance_7,p:{regX:87.6,regY:24.2,scaleX:0.9997,scaleY:0.9997,rotation:-89.4665,x:593.3,y:572.85}},{t:this.instance_6,p:{regY:24.2,scaleX:0.9997,scaleY:0.9997,rotation:-89.4665,x:593.3,y:581.45,regX:87.5}},{t:this.instance_5,p:{regX:586.5,regY:-548.4,scaleX:1.2866,scaleY:1.1257,rotation:-89.4657,x:474,y:581.3}}]},5).to({state:[{t:this.instance_8}]},46).to({state:[]},156).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:207.3},46).to({x:549.9},62).to({x:605.15},10).to({x:643.85},7).to({x:660.45},3).to({_off:true},1).wait(243));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.Stay_In_Alive_AnimationByFainshteinSnir = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,2,6,11,15,20,24,29,33,40,45,52,57,64,69,76,81,88,93,100,105,112,117,124,151,201,215,371,482,569,651,690,734];
	this.streamSoundSymbolsList[2] = [{id:"HB",startFrame:2,endFrame:201,loop:1,offset:0}];
	this.streamSoundSymbolsList[215] = [{id:"Moked",startFrame:215,endFrame:371,loop:1,offset:0}];
	this.streamSoundSymbolsList[569] = [{id:"stayinalivewav",startFrame:569,endFrame:690,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.StartButton = this.buttons.StartButton;
		var self = this;
		self.stop();
		
		
		self.StartButton.addEventListener("click", play);
		
		
		function play() {
			self.gotoAndPlay(2);
		}
	}
	this.frame_1 = function() {
		this.StartButton = undefined;
		playSound("walkLwav");
	}
	this.frame_2 = function() {
		var soundInstance = playSound("HB",0);
		this.InsertIntoSoundStreamData(soundInstance,2,201,1);
	}
	this.frame_6 = function() {
		playSound("walkRwav");
	}
	this.frame_11 = function() {
		playSound("walkLwav");
	}
	this.frame_15 = function() {
		playSound("walkRwav");
	}
	this.frame_20 = function() {
		playSound("walkLwav");
	}
	this.frame_24 = function() {
		playSound("walkRwav");
	}
	this.frame_29 = function() {
		playSound("walkLwav");
	}
	this.frame_33 = function() {
		playSound("walkRwav");
	}
	this.frame_40 = function() {
		playSound("walkLwav");
	}
	this.frame_45 = function() {
		playSound("walkRwav");
	}
	this.frame_52 = function() {
		playSound("walkLwav");
	}
	this.frame_57 = function() {
		playSound("walkRwav");
	}
	this.frame_64 = function() {
		playSound("walkLwav");
	}
	this.frame_69 = function() {
		playSound("walkRwav");
	}
	this.frame_76 = function() {
		playSound("walkLwav");
	}
	this.frame_81 = function() {
		playSound("walkRwav");
	}
	this.frame_88 = function() {
		playSound("walkLwav");
	}
	this.frame_93 = function() {
		playSound("walkRwav");
	}
	this.frame_100 = function() {
		playSound("walkLwav");
	}
	this.frame_105 = function() {
		playSound("walkRwav");
	}
	this.frame_112 = function() {
		playSound("walkLwav");
	}
	this.frame_117 = function() {
		playSound("walkRwav");
	}
	this.frame_124 = function() {
		playSound("walkLwav");
	}
	this.frame_151 = function() {
		playSound("zapsplat_cartoon_character_male_voice_relax_sigh_13913_01wav");
	}
	this.frame_201 = function() {
		playSound("zapsplat_science_fiction_phone_ring_short_44334_01wav");
	}
	this.frame_215 = function() {
		var soundInstance = playSound("Moked",0);
		this.InsertIntoSoundStreamData(soundInstance,215,371,1);
	}
	this.frame_371 = function() {
		playSound("stayinalivewav");
	}
	this.frame_482 = function() {
		playSound("emergency_police_or_ambulance_approach_pass_001_01wav");
	}
	this.frame_569 = function() {
		var soundInstance = playSound("stayinalivewav",0);
		this.InsertIntoSoundStreamData(soundInstance,569,690,1);
	}
	this.frame_651 = function() {
		playSound("Ambulancesirenoutwav");
	}
	this.frame_690 = function() {
		this.StartButton = this.buttons.StartButton;
		var self = this;
		self.stop();
		
		
		self.StartButton.addEventListener("click", play);
		
		
		function play() {
			self.gotoAndPlay(2);
		}
	}
	this.frame_734 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(4).call(this.frame_6).wait(5).call(this.frame_11).wait(4).call(this.frame_15).wait(5).call(this.frame_20).wait(4).call(this.frame_24).wait(5).call(this.frame_29).wait(4).call(this.frame_33).wait(7).call(this.frame_40).wait(5).call(this.frame_45).wait(7).call(this.frame_52).wait(5).call(this.frame_57).wait(7).call(this.frame_64).wait(5).call(this.frame_69).wait(7).call(this.frame_76).wait(5).call(this.frame_81).wait(7).call(this.frame_88).wait(5).call(this.frame_93).wait(7).call(this.frame_100).wait(5).call(this.frame_105).wait(7).call(this.frame_112).wait(5).call(this.frame_117).wait(7).call(this.frame_124).wait(27).call(this.frame_151).wait(50).call(this.frame_201).wait(14).call(this.frame_215).wait(156).call(this.frame_371).wait(111).call(this.frame_482).wait(87).call(this.frame_569).wait(82).call(this.frame_651).wait(39).call(this.frame_690).wait(44).call(this.frame_734).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(93).to({regX:0.1,regY:0.1,scaleX:0.5417,scaleY:0.5417,x:491.55,y:429},80).wait(42).to({regX:0.2,regY:0.2,scaleX:0.9928,scaleY:0.9928,x:653.5,y:366.35},0).to({_off:true},213).wait(307));

	// buttons_obj_
	this.buttons = new lib.Scene_1_buttons();
	this.buttons.name = "buttons";
	this.buttons.setTransform(642.4,362.5,1,1,0,0,0,642.4,362.5);
	this.buttons.depth = 0;
	this.buttons.isAttachedToCamera = 0
	this.buttons.isAttachedToMask = 0
	this.buttons.layerDepth = 0
	this.buttons.layerIndex = 0
	this.buttons.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.buttons).wait(690).to({_off:true},1).wait(44));

	// effects_obj_
	this.effects = new lib.Scene_1_effects();
	this.effects.name = "effects";
	this.effects.depth = 0;
	this.effects.isAttachedToCamera = 0
	this.effects.isAttachedToMask = 0
	this.effects.layerDepth = 0
	this.effects.layerIndex = 1
	this.effects.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.effects).wait(215).to({regX:17.9,regY:8.7,scaleX:1.0072,scaleY:1.0072,x:0.05},0).wait(323).to({regX:0,regY:0,scaleX:1,scaleY:1,x:0},0).to({_off:true},146).wait(51));

	// Ets_EMT_obj_
	this.Ets_EMT = new lib.Scene_1_Ets_EMT();
	this.Ets_EMT.name = "Ets_EMT";
	this.Ets_EMT.setTransform(151.1,327.2,1,1,0,0,0,151.1,327.2);
	this.Ets_EMT.depth = 0;
	this.Ets_EMT.isAttachedToCamera = 0
	this.Ets_EMT.isAttachedToMask = 0
	this.Ets_EMT.layerDepth = 0
	this.Ets_EMT.layerIndex = 2
	this.Ets_EMT.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Ets_EMT).wait(215).to({regX:167.8,regY:333.5,scaleX:1.0072,scaleY:1.0072,x:151,y:327.15},0).wait(219).to({regX:151.1,regY:327.2,scaleX:1,scaleY:1,x:151.1,y:327.2},0).wait(122).to({_off:true},1).wait(178));

	// ManSCN2_obj_
	this.ManSCN2 = new lib.Scene_1_ManSCN2();
	this.ManSCN2.name = "ManSCN2";
	this.ManSCN2.depth = 0;
	this.ManSCN2.isAttachedToCamera = 0
	this.ManSCN2.isAttachedToMask = 0
	this.ManSCN2.layerDepth = 0
	this.ManSCN2.layerIndex = 3
	this.ManSCN2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ManSCN2).wait(371).to({regX:17.9,regY:8.7,scaleX:1.0072,scaleY:1.0072,x:0.05},0).wait(63).to({regX:0,regY:0,scaleX:1,scaleY:1,x:0},0).wait(169).to({_off:true},1).wait(131));

	// Man2SCN2_obj_
	this.Man2SCN2 = new lib.Scene_1_Man2SCN2();
	this.Man2SCN2.name = "Man2SCN2";
	this.Man2SCN2.depth = 0;
	this.Man2SCN2.isAttachedToCamera = 0
	this.Man2SCN2.isAttachedToMask = 0
	this.Man2SCN2.layerDepth = 0
	this.Man2SCN2.layerIndex = 4
	this.Man2SCN2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Man2SCN2).wait(371).to({regX:17.9,regY:8.7,scaleX:1.0072,scaleY:1.0072,x:0.05},0).wait(56).to({regX:0,regY:0,scaleX:1,scaleY:1,x:0},6).wait(152).to({_off:true},1).wait(149));

	// RamzorCSN2_obj_
	this.RamzorCSN2 = new lib.Scene_1_RamzorCSN2();
	this.RamzorCSN2.name = "RamzorCSN2";
	this.RamzorCSN2.depth = 0;
	this.RamzorCSN2.isAttachedToCamera = 0
	this.RamzorCSN2.isAttachedToMask = 0
	this.RamzorCSN2.layerDepth = 0
	this.RamzorCSN2.layerIndex = 5
	this.RamzorCSN2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.RamzorCSN2).wait(371).to({regX:17.9,regY:8.7,scaleX:1.0072,scaleY:1.0072,x:0.05},0).to({_off:true},30).wait(334));

	// EMT__obj_
	this.EMT_ = new lib.Scene_1_EMT_();
	this.EMT_.name = "EMT_";
	this.EMT_.depth = 0;
	this.EMT_.isAttachedToCamera = 0
	this.EMT_.isAttachedToMask = 0
	this.EMT_.layerDepth = 0
	this.EMT_.layerIndex = 6
	this.EMT_.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.EMT_).wait(604).to({_off:true},1).wait(130));

	// ambulance_obj_
	this.ambulance = new lib.Scene_1_ambulance();
	this.ambulance.name = "ambulance";
	this.ambulance.depth = 0;
	this.ambulance.isAttachedToCamera = 0
	this.ambulance.isAttachedToMask = 0
	this.ambulance.layerDepth = 0
	this.ambulance.layerIndex = 7
	this.ambulance.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ambulance).wait(687).to({_off:true},1).wait(47));

	// EMT_obj_
	this.EMT = new lib.Scene_1_EMT();
	this.EMT.name = "EMT";
	this.EMT.depth = 0;
	this.EMT.isAttachedToCamera = 0
	this.EMT.isAttachedToMask = 0
	this.EMT.layerDepth = 0
	this.EMT.layerIndex = 8
	this.EMT.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.EMT).wait(654).to({_off:true},1).wait(80));

	// RekaCSN2_obj_
	this.RekaCSN2 = new lib.Scene_1_RekaCSN2();
	this.RekaCSN2.name = "RekaCSN2";
	this.RekaCSN2.depth = 0;
	this.RekaCSN2.isAttachedToCamera = 0
	this.RekaCSN2.isAttachedToMask = 0
	this.RekaCSN2.layerDepth = 0
	this.RekaCSN2.layerIndex = 9
	this.RekaCSN2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.RekaCSN2).wait(371).to({regX:17.9,regY:8.7,scaleX:1.0072,scaleY:1.0072,x:0.05},0).wait(57).to({regX:0,regY:0,scaleX:1,scaleY:1,x:0},0).wait(307));

	// Ramzor_obj_
	this.Ramzor = new lib.Scene_1_Ramzor();
	this.Ramzor.name = "Ramzor";
	this.Ramzor.setTransform(1127.1,485,1,1,0,0,0,1127.1,485);
	this.Ramzor.depth = 0;
	this.Ramzor.isAttachedToCamera = 0
	this.Ramzor.isAttachedToMask = 0
	this.Ramzor.layerDepth = 0
	this.Ramzor.layerIndex = 10
	this.Ramzor.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Ramzor).wait(175).to({regX:755.3,regY:496.7,scaleX:1.8462,scaleY:1.8462,y:485.1},0).wait(40).to({regX:1136.9,regY:490.2,scaleX:1.0072,scaleY:1.0072,y:485},0).wait(156).to({_off:true},1).wait(363));

	// Man_obj_
	this.Man = new lib.Scene_1_Man();
	this.Man.name = "Man";
	this.Man.setTransform(-56,473.2,1,1,0,0,0,-56,473.2);
	this.Man.depth = 0;
	this.Man.isAttachedToCamera = 0
	this.Man.isAttachedToMask = 0
	this.Man.layerDepth = 0
	this.Man.layerIndex = 11
	this.Man.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Man).wait(215).to({regX:-37.8,regY:478.4,scaleX:1.0072,scaleY:1.0072,x:-56.05,y:473.1},0).wait(156).to({_off:true},1).wait(363));

	// Man2_obj_
	this.Man2 = new lib.Scene_1_Man2();
	this.Man2.name = "Man2";
	this.Man2.setTransform(247.5,534.9,1,1,0,0,0,247.5,534.9);
	this.Man2.depth = 0;
	this.Man2.isAttachedToCamera = 0
	this.Man2.isAttachedToMask = 0
	this.Man2.layerDepth = 0
	this.Man2.layerIndex = 12
	this.Man2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Man2).wait(175).to({regX:278.8,regY:523.6,scaleX:1.8462,scaleY:1.8462,x:247.4,y:534.75},0).wait(40).to({regX:263.6,regY:539.7,scaleX:1.0072,scaleY:1.0072,x:247.5,y:534.85},0).to({_off:true},156).wait(364));

	// Reka_obj_
	this.Reka = new lib.Scene_1_Reka();
	this.Reka.name = "Reka";
	this.Reka.setTransform(640,360,1,1,0,0,0,640,360);
	this.Reka.depth = 0;
	this.Reka.isAttachedToCamera = 0
	this.Reka.isAttachedToMask = 0
	this.Reka.layerDepth = 0
	this.Reka.layerIndex = 13
	this.Reka.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Reka).wait(175).to({regX:491.4,regY:428.9,scaleX:1.8462,scaleY:1.8462,x:639.9,y:359.9},0).wait(40).to({regX:653.2,regY:366.1,scaleX:1.0072,scaleY:1.0072,y:360},0).wait(156).to({_off:true},185).wait(179));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1733,733.9);
// library properties:
lib.properties = {
	id: 'CA21BA16406B2E47918A5BA3ED74D9CD',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#000000",
	opacity: 1.00,
	manifest: [
		{src:"images/Stay_In_Alive_AnimationByFainshteinSnir_atlas_1.png", id:"Stay_In_Alive_AnimationByFainshteinSnir_atlas_1"},
		{src:"sounds/Ambulancesirenoutwav.mp3", id:"Ambulancesirenoutwav"},
		{src:"sounds/emergency_police_or_ambulance_approach_pass_001_01wav.mp3", id:"emergency_police_or_ambulance_approach_pass_001_01wav"},
		{src:"sounds/HB.mp3", id:"HB"},
		{src:"sounds/Moked.mp3", id:"Moked"},
		{src:"sounds/stayinalivewav.mp3", id:"stayinalivewav"},
		{src:"sounds/walkLwav.mp3", id:"walkLwav"},
		{src:"sounds/walkRwav.mp3", id:"walkRwav"},
		{src:"sounds/zapsplat_cartoon_character_male_voice_relax_sigh_13913_01wav.mp3", id:"zapsplat_cartoon_character_male_voice_relax_sigh_13913_01wav"},
		{src:"sounds/zapsplat_science_fiction_phone_ring_short_44334_01wav.mp3", id:"zapsplat_science_fiction_phone_ring_short_44334_01wav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['CA21BA16406B2E47918A5BA3ED74D9CD'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;