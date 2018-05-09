
// Author: 			  Arman Yigit

var blipp = require('blippar').blipp;
var scene = blipp.addScene();

blipp.setIcon('thumb.png');
var sH = blipp.getScreenHeight()*1.003;
var sW = blipp.getScreenWidth()*1.003;
var screenValues = ((sH/sW)*60)/1.33;	
var isIos = blipp.getSystem().getPlatform();

var animationState = 0;
var subNavigatorState = 0;
var isInServicePage = 0;
var isInOpPopsPage = 0;
var isInIpPropertiesPage = 0;
var isInWeatherPanel = 0;

var MM_ColorRing;
var MM_WhiteRing;
var CS_Ring;
var SB_Ring;
var MM_Background;
var parentOfAll;
var rightSideScreen;
var leftSideScreen;
var MM_stableBackGlow;
var MM_inspectProductButton;
var MM_movingBackGlow;
var MM_Logo;
var SN_ArrowButton;
var c20_Parent;
var c25_Parent;
var c60_Parent;
var blippBackButton;
var pageJourney = ["MainMenu"];
var subNavigatorParent;
var MM_SNCurtain;
var SN_ComCenterButton;
var SN_MainMenuButton;
var SN_ServiceButton;
var SN_AdjustHeaterButton;
var weatherIcon;

var locationEnabled = blipp.getGeo().getLocationEnabled();
var lat;
var lon;

scene.setRequiredAssets(['digital-7.ttf', 'Bosch Sans Turkish Light.ttf', 'video.mp4', 'video.mp3', 'mainMusic.mp3', 'click.mp3']);

scene.closeHTML = function() {
    blipp.closeHTML();
}

scene.closeBlipp = function() {
    blipp.close();
}

scene.onShow = function() {
	MM_Background.fadeIn();
	MM_ColorRing.setHidden(false);
	MM_WhiteRing.setHidden(false);
	MM_ColorRing.fadeIn(500, 500);
	MM_WhiteRing.fadeIn(500, 500);
	continuousMMAnimations();
	getCoordinates();
	MM_VideoBackground.setHidden(false);
	MM_VideoBackground.fadeIn();
	MM_VideoSkipButton.setHidden(false);
	MM_VideoSkipButton.fadeIn();
	MM_Video.playVideo('video.mp4', 'video.mp3', false, false, false);
	MM_Video.setHidden(false);
	MM_Video.fadeIn(1500);
}

function afterVideoPlayed(){
	scene.playSound('mainMusic.mp3', true, 1, 0.1, 0.1);
	parentOfAll.applyToNodeAndDescendants('fadeIn', 500, 500);
	scene.getGroup('SN_SpecificObjects').applyToNodes('setHidden', false);
	scene.getGroup('SN_SpecificObjects').applyToNodes('fadeIn');
	scene.getGroup('MM_SpecificObjects').applyToNodes('setHidden', false);
	scene.getGroup('MM_SpecificObjects').applyToNodes('fadeIn');
	//scene.getGroup('SN_SpecificObjects').applyToNodes('fadeIn', true);
	MM_stableBackGlow.fadeIn(500, 1100);
	MM_stableBackGlow.fadeIn(500, 1100);
	rightSideScreen.fadeIn(500, 1600);
	leftSideScreen.fadeIn(500, 1600);
	MM_inspectProductButton.fadeIn(500, 1600);
	MM_Logo.animate().delay(1700).duration(500).translationY(sH/2-(sH*280/2048)/2);
	MM_ColorRing.animate().duration(1000).onEnd=function(){ showBackGlows(); };
	c20_Parent.applyToNodeAndDescendants('fadeIn');
	c25_Parent.applyToNodeAndDescendants('fadeIn');
	c60_Parent.applyToNodeAndDescendants('fadeIn');
}

function showBackGlows(){
	MM_stableBackGlow.setHidden(false);
	MM_movingBackGlow.setHidden(false);
}
var locationEnabled;

scene.onCreate = function() {
	scene.prepareSound('mainMusic.mp3', 1);
	scene.prepareSound('click.mp3', 2);
	if(isIos === 'IOS'){
		blipp.getPeel().setOrientation('portrait').setScale(screenValues);
	}else{
		blipp.getPeel().setOrientation('portrait').setScale(70);
	}
	console.log(isIos);
	locationEnabled = blipp.getGeo().getLocationEnabled();
	blipp.uiVisible('navBar', false);
	blipp.uiVisible('peelCloseButton', false);
	scene.setScreenScaleRotate(false);

	MM_ColorRing 				= scene.addSprite().setScale(700).setTexture(["colorRing.jpg","colorRing-A.png"]).setHidden(true).setAlpha(0).setTranslation(0,0,1).setType('phantom');

	MM_WhiteRing 				= scene.addSprite().setScale(700).setTexture(["whiteRing.png","whiteRing-A.png"]).setHidden(true).setAlpha(0).setTranslation(0,0,2).setType('phantom');

	MM_Background 				= scene.addSprite().setScale(1000).setTexture(["background.jpg","background-A.png"]).setTranslation(0,0,0).setType('phantom');

	MM_Video 					= scene.addSprite().setScale(640*2.25, 480*2.25, 2).setTranslation(0,60,0).setTexture('trans.png').setBlend('chromakey').setChromakey([120, 0.7, 0.67, 72]).setRotation(0,0,90).setHidden(true).setAlpha(0);
		MM_Video.onVideoTextureEnd=function(){ 
		this.setHidden(true); 
		MM_VideoBackground.setHidden(true); 
		afterVideoPlayed(); 
		MM_VideoSkipButton.setHidden(true); 
	};

	MM_VideoBackground 			= scene.addSprite().setScale(1000).setTexture(["MM_VideoBackground.jpg","MM_VideoBackground-A.jpg"]).setTranslation(0,0,3).setType('phantom').setHidden(true).setAlpha(0);

	MM_VideoSkipButton			= scene.addSprite().setScale(500, 250, 0).setTexture(["MM_VideoSkipButton.jpg","MM_VideoSkipButton-A.png"]).setTranslation(0,-700,0).setType('phantom').setHidden(true).setAlpha(0).setClickable(true);
		MM_VideoSkipButton.onClick=function(){
		this.setHidden(true); 
		MM_VideoBackground.setHidden(true);
		afterVideoPlayed(); 
		MM_VideoSkipButton.setHidden(true); 
		MM_Video.stopVideo(); 
		scene.stopSound(2); 
		scene.playSound('click.mp3', false, 2, 0.5, 0.5);
	}

	var root = scene.addTransform();
	root.read("kombiTogether.json");
	parentOfAll = root.getChild("scene_kombiTogether").getChild("Plane");
	parentOfAll.applyToNodeAndDescendants('setColor', [0.8,0.8,0.8]);
	parentOfAll.applyToNodeAndDescendants('setAlpha', 0);

	c20_Parent = root.getChild("scene_kombiTogether").getChild("Plane").getChild("c20_Parent");
	c25_Parent = root.getChild("scene_kombiTogether").getChild("Plane").getChild("c25_Parent");
	c60_Parent = root.getChild("scene_kombiTogether").getChild("Plane").getChild("c60_Parent");

	var c20_Parent_tpath = c20_Parent.getChild("c20_Parent_tpath");
	var c25_Parent_tpath = c25_Parent.getChild("c25_Parent_tpath");
	var c60_Parent_tpath = c60_Parent.getChild("c60_Parent_tpath");

	MM_stableBackGlow 			= scene.addSprite().setScale(800).setTexture(["stableBackGlow.jpg","stableBackGlow-A.jpg"]).setHidden(true).setTranslation(0, 0, 450).addToGroup('MM_SpecificObjects');

	MM_movingBackGlow 			= scene.addSprite().setScale(800).setTexture(["movingBackGlow.jpg","movingBackGlow-A.jpg"]).setHidden(true).setTranslation(0, 0, 455).addToGroup('MM_SpecificObjects');

	rightSideScreen 			= scene.getScreen().addSprite().setScale(sH*128/2048).setTexture(["SS_RightArrow.png" ,"SS_RightArrow-A.png"]).setClickable(true).setHidden(true).setTranslation(sH*320/2048, 0 ,0).addToGroups('MM_Sensors', 'MM_SpecificObjects');
		rightSideScreen.onClick = function(){
			this.setClickable(false);
			leftSideScreen.setClickable(false); 
			MM_movingBackGlow.fadeOut(300,0);
			MM_stableBackGlow.fadeOut(300,0);
			if(animationState == 0){ //c25
				console.log(animationState);
				animationState = 1;
			    c20_Parent_tpath.setActiveMesh(1).animate().activeMesh(9).duration(966.666667).onEnd = function(){ rightSideScreen.setClickable(true); leftSideScreen.setClickable(true); MM_movingBackGlow.fadeIn(300,0); MM_stableBackGlow.fadeIn(300,0);}
			    c25_Parent_tpath.setActiveMesh(1).animate().activeMesh(9).duration(966.666667);
			    c60_Parent_tpath.setActiveMesh(1).animate().activeMesh(9).duration(966.666667);
			}else if(animationState == 1){ //c60
				console.log(animationState);
				animationState = 2;
			    c20_Parent_tpath.setActiveMesh(9).animate().activeMesh(19).duration(966.666667).onEnd = function(){ rightSideScreen.setClickable(true); leftSideScreen.setClickable(true); MM_movingBackGlow.fadeIn(300,0); MM_stableBackGlow.fadeIn(300,0);}
			    c25_Parent_tpath.setActiveMesh(9).animate().activeMesh(19).duration(966.666667);
			    c60_Parent_tpath.setActiveMesh(9).animate().activeMesh(19).duration(966.666667);
			}else if(animationState == 2){ //c20
				console.log(animationState);
				animationState = 0;
			    c20_Parent_tpath.setActiveMesh(19).animate().activeMesh(29).duration(966.666667).onEnd = function(){ rightSideScreen.setClickable(true); leftSideScreen.setClickable(true); MM_movingBackGlow.fadeIn(300,0); MM_stableBackGlow.fadeIn(300,0);}
			    c25_Parent_tpath.setActiveMesh(19).animate().activeMesh(29).duration(966.666667);
			    c60_Parent_tpath.setActiveMesh(19).animate().activeMesh(29).duration(966.666667);
			}
		}

	leftSideScreen 				= scene.getScreen().addSprite().setScale(sH*128/2048).setTexture(["SS_LeftArrow.png" ,"SS_LeftArrow-A.png"]).setClickable(true).setHidden(true).setTranslation(-sH*320/2048, 0 ,0).addToGroups('MM_Sensors', 'MM_SpecificObjects');
		leftSideScreen.onClick = function(){
			this.setClickable(false);
			rightSideScreen.setClickable(false);
			MM_movingBackGlow.fadeOut(300,0);
			MM_stableBackGlow.fadeOut(300,0);
			if(animationState == 0){
				console.log(animationState);
				animationState = 2;
			    c20_Parent_tpath.setActiveMesh(29).animate().activeMesh(19).duration(966.666667).onEnd = function(){ leftSideScreen.setClickable(true); rightSideScreen.setClickable(true); MM_movingBackGlow.fadeIn(300,0); MM_stableBackGlow.fadeIn(300,0);}
			    c25_Parent_tpath.setActiveMesh(29).animate().activeMesh(19).duration(966.666667);
			    c60_Parent_tpath.setActiveMesh(29).animate().activeMesh(19).duration(966.666667);
			}else if(animationState == 2){
				console.log(animationState);
				animationState = 1;
			    c20_Parent_tpath.setActiveMesh(19).animate().activeMesh(9).duration(966.666667).onEnd = function(){ leftSideScreen.setClickable(true); rightSideScreen.setClickable(true); MM_movingBackGlow.fadeIn(300,0); MM_stableBackGlow.fadeIn(300,0);}
			    c25_Parent_tpath.setActiveMesh(19).animate().activeMesh(9).duration(966.666667);
			    c60_Parent_tpath.setActiveMesh(19).animate().activeMesh(9).duration(966.666667);
			}else if(animationState == 1){
				console.log(animationState);
				animationState = 0;
			    c20_Parent_tpath.setActiveMesh(9).animate().activeMesh(1).duration(966.666667).onEnd = function(){ leftSideScreen.setClickable(true); rightSideScreen.setClickable(true); MM_movingBackGlow.fadeIn(300,0); MM_stableBackGlow.fadeIn(300,0);}
			    c25_Parent_tpath.setActiveMesh(9).animate().activeMesh(1).duration(966.666667);
			    c60_Parent_tpath.setActiveMesh(9).animate().activeMesh(1).duration(966.666667);
			}
				
		}

	MM_inspectProductButton 	= scene.getScreen().addSprite().setScale(sH*478/2048, sH*478/2048/4, 0).setTexture(["inspectProductButton.jpg","inspectProductButton-A.png"]).setTranslation(0,-sH*450/2048, 0).setClickable(true).setHidden(true).addToGroups('MM_Sensors', 'MM_SpecificObjects');
		MM_inspectProductButton.onClick = function(){
			scene.stopSound(2); 
			scene.playSound('click.mp3', false, 2, 0.5, 0.5);
			pageJourney.push("inspectProduct");
			openGivenPage(pageJourney[pageJourney.length - 1]);
			closeGivenPage(pageJourney[pageJourney.length - 2]);
		}

	IP_OtherProductsButton		= scene.getScreen().addSprite().setScale(sH*1536/2048, sH*1536/2048/8, 0).setHidden(true).setTexture(["IP_OtherProductsButton.jpg","IP_OtherProductsButton-A.png"]).setTranslation(0, -sH*805/2048, 0).setClickable(false).addToGroups('IP_SpecificObjects', 'IP_Sensors');
		IP_OtherProductsButton.onClick = function(){
			scene.stopSound(2); 
			scene.playSound('click.mp3', false, 2, 0.5, 0.5);
			pageJourney.push("otherProducts");
			openGivenPage(pageJourney[pageJourney.length - 1]);
			closeGivenPage( pageJourney[pageJourney.length - 2]);
		}

	IP_PropertiesButton			= scene.addSprite().setScale(250, 250/4, 0).setHidden(true).setTexture(["IP_PropertiesButton.jpg","IP_PropertiesButton-A.png"]).setTranslation(100, 100, 1000).setClickable(false).setHotspot([0, 0, 0, 0.5, 1, 1]).addToGroups('IP_SpecificObjects', 'IP_Sensors');
	IP_PropertiesButton.onClick = function(){
		scene.stopSound(2); 
		scene.playSound('click.mp3', false, 2, 0.5, 0.5);
		isInIpPropertiesPage = 1; 
		if(animationState == 0){ //c25
			IP_PropertiesPops.setActiveTexture(1);
			IP_PropertiesPopsCloseButton.setHidden(false);
			IP_PropertiesPopsCloseButton.fadeIn();
			IP_PropertiesPops.setHidden(false);
			IP_PropertiesPops.fadeIn();
			scene.getGroup('IP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		}else if(animationState == 1){ //c60
			IP_PropertiesPops.setActiveTexture(2);
			IP_PropertiesPopsCloseButton.setHidden(false);
			IP_PropertiesPopsCloseButton.fadeIn();
			IP_PropertiesPops.setHidden(false);
			IP_PropertiesPops.fadeIn();
			scene.getGroup('IP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		}else if(animationState == 2){ //c20
			IP_PropertiesPops.setActiveTexture(0);
			IP_PropertiesPopsCloseButton.setHidden(false);
			IP_PropertiesPopsCloseButton.fadeIn();
			IP_PropertiesPops.setHidden(false);
			IP_PropertiesPops.fadeIn();
			scene.getGroup('IP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		} 
	}

	IP_CatalogButton			= scene.addSprite().setScale(250, 250/4, 0).setHidden(true).setTexture(["IP_CatalogButton.jpg","IP_CatalogButton-A.png"]).setTranslation(-100, 50, 1000).setClickable(false).setHotspot([0, 0, 0, 0.5, 1, 1]).addToGroups('IP_SpecificObjects', 'IP_Sensors');
		IP_CatalogButton.onClick = function(){
			if(animationState == 0){ //c25
				blipp.goToURL('https://assets-ui-cdn.blippar.com/s3fs-public/u59/Bosch_Turkey_Combi/c25_katalog.pdf', { callback: function(){} });
			}else if(animationState == 1){ //c60
				blipp.goToURL('https://assets-ui-cdn.blippar.com/s3fs-public/u59/Bosch_Turkey_Combi/c60_katalog.pdf', { callback: function(){} });
			}else if(animationState == 2){ //c20
				blipp.goToURL('https://assets-ui-cdn.blippar.com/s3fs-public/u59/Bosch_Turkey_Combi/c20_katalog.pdf', { callback: function(){} });
			}
		}

	IP_VideoButton				= scene.addSprite().setScale(250, 250/4, 0).setHidden(true).setTexture(["IP_VideoButton.jpg","IP_VideoButton-A.png"]).setTranslation(100, 0, 1000).setClickable(false).setHotspot([0, 0, 0, 0.5, 1, 1]).addToGroups('IP_SpecificObjects', 'IP_Sensors');
		IP_VideoButton.onClick = function(){ 
			if(animationState == 0){ //c25
				blipp.playInAppVideo('https://assets-ui-cdn.blippar.com/s3fs-public/u59/Bosch_Turkey_Combi/c25.mp4', '', function() { console.log('done')});
			}else if(animationState == 1){ //c60
				blipp.playInAppVideo('https://assets-ui-cdn.blippar.com/s3fs-public/u59/Bosch_Turkey_Combi/c60.mp4', '', function() { console.log('done')});
			}else if(animationState == 2){ //c20
				blipp.playInAppVideo('https://assets-ui-cdn.blippar.com/s3fs-public/u59/Bosch_Turkey_Combi/c20.mp4', '', function() { console.log('done')});
			}
	}

	IP_UserGuide				= scene.addSprite().setScale(500, 500/8, 0).setHidden(true).setTexture(["IP_UserGuide.jpg","IP_UserGuide-A.png"]).setTranslation(-100, -50, 1000).setClickable(false).setHotspot([0, 0, 0, 0.4, 1, 1]).addToGroups('IP_SpecificObjects', 'IP_Sensors');
		IP_UserGuide.onClick = function(){
			if(animationState == 0){ //c25
				blipp.goToURL('https://assets-ui-cdn.blippar.com/s3fs-public/u59/Bosch_Turkey_Combi/c25_userGuide.pdf', { callback: function(){} });
			}else if(animationState == 1){ //c60
				blipp.goToURL('https://assets-ui-cdn.blippar.com/s3fs-public/u59/Bosch_Turkey_Combi/c60_userGuide.pdf', { callback: function(){} });
			}else if(animationState == 2){ //c20
				blipp.goToURL('https://assets-ui-cdn.blippar.com/s3fs-public/u59/Bosch_Turkey_Combi/c20_userGuide.pdf', { callback: function(){} });
			}
		}

	IP_ProductName				= scene.addSprite().setScale(4*50, 50, 0).setHidden(true).setTextures(['IP_ProductNameC60.png', 'IP_ProductNameC60-A.png'], ['IP_ProductNameC25.png', 'IP_ProductNameC25-A.png'], ['IP_ProductNameC20.png', 'IP_ProductNameC20-A.png']).setTranslation(0, 230, 1000).addToGroups('IP_SpecificObjects');

	OP_Background				= scene.getScreen().addSprite().setScale(sH).setHidden(true).setTexture('OP_Background.jpg').setTranslation(0, 0, 0).addToGroups('OP_SpecificObjects');

	OP_1						= scene.getScreen().addSprite().setScale(4*sH*304/2048, sH*304/2048, 0).setHidden(true).setTexture(["OP_1.jpg","OP_1-A.png"]).setTranslation(0, sH*547/2048, 0).addToGroups('OP_SpecificObjects', 'OP_Sensors');
		OP_1.onClick = function(){
			isInOpPopsPage = 1;
			OP_Pops.setActiveTexture(0);
			OP_PopsCloseButton.setHidden(false);
			OP_PopsCloseButton.fadeIn();
			OP_Pops.setHidden(false);
			OP_Pops.fadeIn();
			scene.getGroup('OP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		}
	OP_2						= scene.getScreen().addSprite().setScale(4*sH*304/2048, sH*304/2048, 0).setHidden(true).setTexture(["OP_2.jpg","OP_2-A.png"]).setTranslation(0, sH*343/2048, 0).addToGroups('OP_SpecificObjects', 'OP_Sensors');
		OP_2.onClick = function(){
			isInOpPopsPage = 1;
			OP_Pops.setActiveTexture(1);
			OP_PopsCloseButton.setHidden(false);
			OP_PopsCloseButton.fadeIn();
			OP_Pops.setHidden(false);
			OP_Pops.fadeIn();
			scene.getGroup('OP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		}
	OP_3						= scene.getScreen().addSprite().setScale(4*sH*260/2048, sH*260/2048, 0).setHidden(true).setTexture(["OP_3.jpg","OP_3-A.png"]).setTranslation(0, sH*135/2048, 0).addToGroups('OP_SpecificObjects', 'OP_Sensors');
		OP_3.onClick = function(){
			isInOpPopsPage = 1;
			OP_Pops.setActiveTexture(2);
			OP_PopsCloseButton.setHidden(false);
			OP_PopsCloseButton.fadeIn();
			OP_Pops.setHidden(false);
			OP_Pops.fadeIn();
			scene.getGroup('OP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		}
	OP_4						= scene.getScreen().addSprite().setScale(4*sH*260/2048, sH*260/2048, 0).setHidden(true).setTexture(["OP_4.jpg","OP_4-A.png"]).setTranslation(0, -sH*70/2048, 0).addToGroups('OP_SpecificObjects', 'OP_Sensors');
		OP_4.onClick = function(){
			isInOpPopsPage = 1;
			OP_Pops.setActiveTexture(3);
			OP_PopsCloseButton.setHidden(false);
			OP_PopsCloseButton.fadeIn();
			OP_Pops.setHidden(false);
			OP_Pops.fadeIn();
			scene.getGroup('OP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		}
	OP_5						= scene.getScreen().addSprite().setScale(4*sH*260/2048, sH*260/2048, 0).setHidden(true).setTexture(["OP_5.jpg","OP_5-A.png"]).setTranslation(0, -sH*293/2048, 0).addToGroups('OP_SpecificObjects', 'OP_Sensors');
		OP_5.onClick = function(){
			isInOpPopsPage = 1;
			OP_Pops.setActiveTexture(4);
			OP_PopsCloseButton.setHidden(false);
			OP_PopsCloseButton.fadeIn();
			OP_Pops.setHidden(false);
			OP_Pops.fadeIn();
			scene.getGroup('OP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		}
	OP_6						= scene.getScreen().addSprite().setScale(4*sH*260/2048, sH*260/2048, 0).setHidden(true).setTexture(["OP_6.jpg","OP_6-A.png"]).setTranslation(0, -sH*501/2048, 0).addToGroups('OP_SpecificObjects', 'OP_Sensors');
		OP_6.onClick = function(){
			isInOpPopsPage = 1;
			OP_Pops.setActiveTexture(5);
			OP_PopsCloseButton.setHidden(false);
			OP_PopsCloseButton.fadeIn();
			OP_Pops.setHidden(false);
			OP_Pops.fadeIn();
			scene.getGroup('OP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		}
	OP_7						= scene.getScreen().addSprite().setScale(4*sH*270/2048, sH*270/2048, 0).setHidden(true).setTexture(["OP_7.jpg","OP_7-A.png"]).setTranslation(0, -sH*710/2048, 0).addToGroups('OP_SpecificObjects', 'OP_Sensors');
		OP_7.onClick = function(){
			isInOpPopsPage = 1;
			OP_Pops.setActiveTexture(6);
			OP_PopsCloseButton.setHidden(false);
			OP_PopsCloseButton.fadeIn();
			OP_Pops.setHidden(false);
			OP_Pops.fadeIn();
			scene.getGroup('OP_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('sensors').applyToNodes('setClickable', false);
		}
	CS_Background				= scene.getScreen().addSprite().setScale(sH).setHidden(true).setTexture('OP_Background.jpg').setTranslation(0, 0, 0).addToGroup('CS_SpecificObjects');

	CS_Ring						= scene.getScreen().addSprite().setScale(sH/15).setHidden(true).setTexture(["CS_Ring.png","CS_Ring-A.png"]).setTranslation(0, 0, 0).addToGroup('CS_SpecificObjects');

	CS_LiveSupport				= scene.getScreen().addSprite().setScale(sH*453/2048).setHidden(true).setTexture(["CS_LiveSupport.jpg","CS_LiveSupport-A.png"]).setTranslation(0, sH/3, 0).setAlpha(0);

	CS_EmailButton				= scene.getScreen().addSprite().setScale(sH*453/2048).setHidden(true).setTexture(["CS_EmailButton.jpg","CS_EmailButton-A.png"]).setTranslation(0, -sH/3, 0).setAlpha(0).addToGroups('CS_SpecificObjects', 'CS_Sensors');
		CS_EmailButton.onClick= function(){ blipp.email('bosch.destek@tr.bosch.com', 'Destek Konusu', 'Destek ayrıntınızı buraya giriniz', function () {}); }

	CS_PhoneButton				= scene.getScreen().addSprite().setScale(0).setHidden(true).setTexture(["CS_PhoneButton.jpg","CS_PhoneButton-A.jpg"]).setTranslation(0, 0, 0).setAlpha(0).addToGroups('CS_SpecificObjects', 'CS_Sensors');
		CS_PhoneButton.onClick= function(){ blipp.phone('4442474','Iletisim merkezini aramak istiyor musunuz?'); }

	SB_Background				= scene.getScreen().addSprite().setScale(sH).setHidden(true).setTexture('OP_Background.jpg').setTranslation(0, 0, 0).addToGroup('SB_SpecificObjects');

	SB_Ring						= scene.getScreen().addSprite().setScale(sH/15).setHidden(true).setTexture(["CS_Ring.png","CS_Ring-A.png"]).setTranslation(0, 0, 0).addToGroup('SB_SpecificObjects');

	SB_ServiceButton			= scene.getScreen().addSprite().setScale(sH*453/2048).setHidden(true).setTexture(["SB_ServiceButton.jpg","SB_ServiceButton-A.png"]).setTranslation(0, sH/3, 0).setAlpha(0).addToGroups('SB_SpecificObjects', 'SB_Sensors');
		SB_ServiceButton.onClick = function(){
			scene.stopSound(2);
			scene.playSound('click.mp3', false, 2, 0.5, 0.5);
			SB_ServiceButton.animate().duration(500).delay(0).translationY(-sH*127/2048).onEnd = function(){ S_NearbyServiceButton.fadeIn(); S_EmergentServiceButton.fadeIn(); S_RequestRepair.fadeIn(); }
			SB_ServiceButton.animate().duration(500).delay(0).scale(sH*550/2048);
			SB_BayiButton.animate().duration(500).delay(0).translationY(-sH/3);
			scene.getGroup('S_SpecificObjects').applyToNodes('setHidden', false);
			scene.getGroup('S_Sensors').applyToNodes('setClickable', true);
			SB_BayiButton.setClickable(false);
			SB_BayiButton.fadeOut();
			this.setClickable(false);
			isInServicePage = 1;
		}

	SB_BayiButton				= scene.getScreen().addSprite().setScale(sH*453/2048).setHidden(true).setTexture(["SB_BayiButton.jpg","SB_BayiButton-A.png"]).setTranslation(0, -sH/3, 0).setAlpha(0).addToGroups('SB_SpecificObjects', 'SB_Sensors');
		SB_BayiButton.onClick= function(){ blipp.overlayHTML('https://cust-solution.blippar.com/bosch-service-society/service.php?type=0', true, true, ''); }

	S_NearbyServiceButton		= scene.getScreen().addSprite().setScale(sH*305/2048).setHidden(true).setTexture(["S_NearbyServiceButton.jpg","S_NearbyServiceButton-A.png"]).setTranslation(-sH*368/2048, sH*165/2048, 0).setAlpha(0).addToGroups('S_SpecificObjects', 'S_Sensors');
		S_NearbyServiceButton.onClick= function(){ blipp.overlayHTML('https://cust-solution.blippar.com/bosch-service-society/service.php?type=1', true, true, ''); }

	S_EmergentServiceButton		= scene.getScreen().addSprite().setScale(sH*305/2048).setHidden(true).setTexture(["S_EmergentServiceButton.jpg","S_EmergentServiceButton-A.png"]).setTranslation(0, sH*378/2048, 0).setAlpha(0).addToGroups('S_SpecificObjects', 'S_Sensors');
		S_EmergentServiceButton.onClick= function(){ blipp.phone('4442474','Iletisim merkezini aramak istiyor musunuz?'); }

	S_RequestRepair				= scene.getScreen().addSprite().setScale(sH*305/2048).setHidden(true).setTexture(["S_RequestRepair.jpg","S_RequestRepair-A.png"]).setTranslation(sH*368/2048, sH*165/2048, 0).setAlpha(0).addToGroups('S_SpecificObjects', 'S_Sensors');
		S_RequestRepair.onClick= function(){ blipp.overlayHTML('https://cust-solution.blippar.com/bosch-service-society/form.php?uid=DEVICEID', true, true, ''); }

	AH_Background				= scene.getScreen().addSprite().setScale(sH).setHidden(true).setTexture('AH_Background.jpg').setTranslation(0, 0, 0).setAlpha(0);

	AH_ChooseHeatingSystem		= scene.getScreen().addSprite().setScale(sH*747/2048).setHidden(true).setTexture(["AH_ChooseHeatingSystem.jpg","AH_ChooseHeatingSystem-A.png"]).setTranslation(0, sH*270/2048, 0).setAlpha(0).addToGroups('AH_SpecificObjects');

	AH_RadyatorButton			= scene.getScreen().addSprite().setScale(sH*716/2048, sH*168/2048, 0).setHidden(true).setTexture(["AH_RadyatorButton.jpg","AH_RadyatorButton-A.png"]).setTranslation(0, -sH*351/2048, 0).setAlpha(0).addToGroups('AH_SpecificObjects', 'AH_Sensors');
		AH_RadyatorButton.onClick= function(){
			scene.getGroup('AH_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('AH_SpecificObjects').applyToNodes('fadeOut');
			scene.getGroup('WP_SpecificObjects').applyToNodes('fadeIn');
			scene.getGroup('WP_SpecificObjects').applyToNodes('setHidden', false);
			isInWeatherPanel=1;
			heaterSelection = 0;
			setWeatherTexturesAndWidgets();
		}

	AH_GroundHeatingButton		= scene.getScreen().addSprite().setScale(sH*716/2048, sH*168/2048, 0).setHidden(true).setTexture(["AH_GroundHeatingButton.jpg","AH_GroundHeatingButton-A.png"]).setTranslation(0, -sH*537/2048, 0).setAlpha(0).addToGroups('AH_SpecificObjects', 'AH_Sensors');
		AH_GroundHeatingButton.onClick= function(){
			scene.getGroup('AH_Sensors').applyToNodes('setClickable', false);
			scene.getGroup('AH_SpecificObjects').applyToNodes('fadeOut');
			scene.getGroup('WP_SpecificObjects').applyToNodes('fadeIn');
			scene.getGroup('WP_SpecificObjects').applyToNodes('setHidden', false);
			heaterSelection = 1;
			isInWeatherPanel=1;
			setWeatherTexturesAndWidgets();

		}

	AH_WeatherPanel				= scene.getScreen().addSprite().setScale(sH*1550/2048).setHidden(true).setTexture(["AH_WeatherPanel.jpg","AH_WeatherPanel-A.png"]).setTranslation(0, -sH*86/2048, 0).setAlpha(0).addToGroups('WP_SpecificObjects');

	weatherIcon					= scene.getScreen().addSprite().setScale(sH*235/2048).setHidden(true).setTextures([["clearDayNight.jpg","clearDayNight-A.png"], ["cloudy.jpg","cloudy-A.png"], ["cloudyDayNight.png","cloudyDayNight-A.png"], ["fog.png","fog-A.png"], ["other.jpg","other-A.png"], ["rain.jpg","rain-A.png"], ["sleet.jpg","sleet-A.png"], ["snow.jpg","snow-A.png"], ["wind.jpg","wind-A.png"]]).setTranslation(sH*254/2048, sH*222/2048, 0).setAlpha(0).addToGroups('WP_SpecificObjects');

	combiDegreeWidget = scene.getScreen().addText('').setHidden(true).setAlpha(0).addToGroups('WP_SpecificObjects').setTranslation(sH*30/2048, -sH*390/2048,0).setFontSize(70).setColor('#525f6b').setFontName('digital-7.ttf');

	locationWidget = scene.getScreen().addText('').setHidden(true).setAlpha(0).addToGroups('WP_SpecificObjects').setTranslation(sH*15/2048, sH*20/2048 ,0).setFontSize(35).setColor('#555f73').setFontName('Bosch Sans Turkish Light.ttf');
	
	weatherDegreeWidget = scene.getScreen().addText('').setHidden(true).setAlpha(0).addToGroups('WP_SpecificObjects').setTranslation(-sH*15/2048, sH*379/2048, 0).setFontSize(100).setColor('#555f73').setFontName('Bosch Sans Turkish Light.ttf');

	var blippCloseButton 		= scene.getScreen().addSprite().setScale(sH*256/2048).setHidden(false).setTexture(["closeButton.png","closeButton-A.png"]).setTranslation(sW/2- sH*107/2048 ,sH/2- sH*107/2048, 0).setClickable(true).addToGroup('sensors');
		blippCloseButton.onClick = function(){ blipp.close(); }

	blippBackButton 			= scene.getScreen().addSprite().setScale(sH*256/2048).setHidden(true).setTexture(["backButton.png","backButton-A.png"]).setTranslation(-sW/2+ sH*107/2048 ,sH/2- sH*107/2048, 0).setClickable(true).addToGroup('sensors');
		blippBackButton.onClick = function(){ 
			if(isInServicePage == 1){
				SB_ServiceButton.animate().duration(500).delay(500).translationY(sH*214/2048).onEnd= function(){ scene.getGroup('SB_Sensors').applyToNodes('setClickable', true); SB_ServiceButton.setClickable(true);}
				SB_ServiceButton.animate().duration(500).delay(500).scale(sH*453/2048);
				SB_BayiButton.animate().duration(500).delay(500).translationY(-sH*276/2048);
				SB_BayiButton.fadeIn(500, 500);
				S_NearbyServiceButton.fadeOut();
				S_EmergentServiceButton.fadeOut();
				S_RequestRepair.fadeOut();
				isInServicePage = 0;
				scene.getGroup('S_Sensors').applyToNodes('setClickable', false);
			}else if(isInWeatherPanel == 1){
				scene.getGroup('AH_Sensors').applyToNodes('setClickable', true);
				scene.getGroup('WP_SpecificObjects').applyToNodes('fadeOut');
				scene.getGroup('AH_SpecificObjects').applyToNodes('fadeIn');
				isInWeatherPanel = 0;
			}else{
				closeGivenPage(pageJourney[pageJourney.length - 1]);
				openGivenPage(pageJourney[pageJourney.length - 2]);
				pageJourney.pop();
			}
			
		}
	OP_Pops						= scene.getScreen().addSprite().setScale(sH).setHidden(true).setTextures([["OP_1Pop.jpg","OP_1Pop-A.png"], ["OP_2Pop.jpg","OP_2Pop-A.png"], ["OP_3Pop.jpg","OP_3Pop-A.png"], ["OP_4Pop.jpg","OP_4Pop-A.png"], ["OP_5Pop.jpg","OP_5Pop-A.png"], ["OP_6Pop.jpg","OP_6Pop-A.png"], ["OP_7Pop.jpg","OP_7Pop-A.png"]]).setTranslation(0, 0, 0).addToGroup('OP_Pop');

	OP_PopsCloseButton			= scene.getScreen().addSprite().setScale(sH*180/2048, sH*400/2048, 0).setHidden(true).setTexture('trans.png').setTranslation(sH*480/2048, sH*500/2048, 0).setClickable(true).addToGroup('OP_Pop');
		OP_PopsCloseButton.onClick = function(){
			OP_Pops.setHidden(true);
			this.setHidden(true);
			scene.animate().duration(500).onEnd = function () {
				scene.getGroup('sensors').applyToNodes('setClickable', true); scene.getGroup('OP_Sensors').applyToNodes('setClickable', true);
			}
			isInOpPopsPage = 0;
		}

	IP_PropertiesPops			= scene.getScreen().addSprite().setScale(sH).setHidden(true).setTextures([["Properties_c20Pop.jpg","Properties_c20Pop-A.jpg"], ["Properties_c25Pop.jpg","Properties_c25Pop-A.jpg"], ["Properties_c60Pop.jpg","Properties_c60Pop-A.jpg"]]).setTranslation(0, 0, 0).addToGroup('IP_Pop');

	IP_PropertiesPopsCloseButton= scene.getScreen().addSprite().setScale(sH*180/2048).setHidden(true).setTexture(["closeButton.png","closeButton-A.png"]).setTranslation(sH*480/2048, sH*622/2048, 0).setClickable(true).addToGroup('IP_Pop');
		IP_PropertiesPopsCloseButton.onClick = function(){
			IP_PropertiesPops.setHidden(true); 
			this.setHidden(true); 
			scene.getGroup('sensors').applyToNodes('setClickable', true); 
			scene.getGroup('IP_Sensors').applyToNodes('setClickable', true); 
			isInIpPropertiesPage = 0;
		}

	MM_Logo 					= scene.getScreen().addSprite().setScale(2*sH*280/2048, sH*280/2048, 0).setHidden(false).setTexture(["SSLogo.jpg","SSLogo-A.png"]).setTranslation(0,sH/2+(sH*280/2048)/2, 0);

	MM_SNCurtain 				= scene.getScreen().addSprite().setScale(sH).setHidden(false).setTexture(["SN_Curtain.jpg","SN_Curtain-A.png"]).setHidden(true).setAlpha(0).setTranslation(0, sH/2 -sH/15, 0).setClickable(true);
		MM_SNCurtain.onClick= function(){ closeSnPressingCurtain(); }
	subNavigatorParent 		= scene.getScreen().addSprite().setScale(1).setTranslation(0, -sH*975/2048, 0).addToGroups('SN_SpecificObjects').setHidden(true);
		var subNavigatorBackground 	= scene.getScreen().addSprite().setScale(sH*1536/2048).setHidden(true).setTexture(["subNavigator.jpg","subNavigator-A.png"]).setAlpha(0).setTranslation(0, -sH*77/2048, 0).setParent(subNavigatorParent).addToGroups('SN_SpecificObjects');
			SN_MainMenuButton	 	= scene.getScreen().addSprite().setScale(8*sH*162/2048, sH*162/2048, 0).setHidden(true).setTexture(["SN_MainMenuButton.jpg","SN_MainMenuButton-A.png"]).setTranslation(-5, -sH*152/2048, 0).setParent(subNavigatorParent).addToGroups('SN_SpecificObjects', 'SN_Sensors');
				SN_MainMenuButton.onClick = function(){
					scene.stopSound(2); 
					scene.playSound('click.mp3', false, 2, 0.5, 0.5);
					if(pageJourney[pageJourney.length-1] == "MainMenu"){
						closeSnPressingCurtain();
					}else{
						pageJourney.push("MainMenu");
						openGivenPage(pageJourney[pageJourney.length-1]);
						closeGivenPage(pageJourney[pageJourney.length-2]);
						closeSubNavBarAnims();
						this.setClickable(false);
					} 
				}
			SN_AdjustHeaterButton	= scene.getScreen().addSprite().setScale(8*sH*162/2048, sH*162/2048, 0).setHidden(true).setTexture(["SN_AdjustHeaterButton.jpg","SN_AdjustHeaterButton-A.png"]).setTranslation(-5, -sH*292/2048, 0).setParent(subNavigatorParent).addToGroups('SN_SpecificObjects', 'SN_Sensors');;
				SN_AdjustHeaterButton.onClick = function(){
					scene.stopSound(2); 
					scene.playSound('click.mp3', false, 2, 0.5, 0.5);
					if(pageJourney[pageJourney.length-1] == "AdjustHeater"){
						closeSnPressingCurtain();
					}else{
						pageJourney.push("AdjustHeater");
						openGivenPage(pageJourney[pageJourney.length-1]);
						closeGivenPage(pageJourney[pageJourney.length-2]);
						closeSubNavBarAnims();
						this.setClickable(false);
					} 
				}

			SN_ComCenterButton	 	= scene.getScreen().addSprite().setScale(8*sH*162/2048, sH*162/2048, 0).setHidden(true).setTexture(["SN_ComCenterButton.jpg","SN_ComCenterButton-A.png"]).setTranslation(-5, -sH*440/2048, 0).setParent(subNavigatorParent).addToGroups('SN_SpecificObjects', 'SN_Sensors');;
				SN_ComCenterButton.onClick = function(){
					scene.stopSound(2); 
					scene.playSound('click.mp3', false, 2, 0.5, 0.5);
					if(pageJourney[pageJourney.length-1] == "comCenter"){
						closeSnPressingCurtain();
					}else{
						pageJourney.push("comCenter");
						openGivenPage(pageJourney[pageJourney.length-1]);
						closeGivenPage(pageJourney[pageJourney.length-2]);
						closeSubNavBarAnims();
						this.setClickable(false);
					} 
				}
		 	SN_ServiceButton		 = scene.getScreen().addSprite().setScale(8*sH*162/2048, sH*162/2048, 0).setHidden(true).setTexture(["SN_ServiceButton.jpg","SN_ServiceButton-A.png"]).setTranslation(-5, -sH*581/2048, 0).setParent(subNavigatorParent).addToGroups('SN_SpecificObjects', 'SN_Sensors');;
				SN_ServiceButton.onClick = function(){
					scene.stopSound(2); 
					scene.playSound('click.mp3', false, 2, 0.5, 0.5);
					if(pageJourney[pageJourney.length-1] == "ServiceReseller"){
						closeSnPressingCurtain();
					}else{
						pageJourney.push("ServiceReseller");
						openGivenPage(pageJourney[pageJourney.length-1]);
						closeGivenPage(pageJourney[pageJourney.length-2]);
						closeSubNavBarAnims();
						this.setClickable(false);
					} 
				}
		var SN_FacebookButton 		= scene.getScreen().addSprite().setScale(4*sH*162/2048, sH*162/2048, 0).setHidden(true).setTexture(["SN_FacebookButton.jpg","SN_FacebookButton-A.png"]).setTranslation(-sH*286/2048, -sH*731/2048, 0).setParent(subNavigatorParent).addToGroups('SN_SpecificObjects', 'SN_Sensors');;
			SN_FacebookButton.onClick= function(){ blipp.goToURL('https://www.facebook.com/boschclimatetr/?fref=ts', { callback: function(){} });  }

		var SN_YoutubeButton 		= scene.getScreen().addSprite().setScale(4*sH*162/2048, sH*162/2048, 0).setHidden(true).setTexture(["SN_YoutubeButton.jpg","SN_YoutubeButton-A.png"]).setTranslation(sH*270/2048, -sH*731/2048, 0).setParent(subNavigatorParent).addToGroups('SN_SpecificObjects', 'SN_Sensors');;
			SN_YoutubeButton.onClick= function(){ blipp.goToURL('https://www.youtube.com/channel/UC14pdq9TiSNRD9sC2aAij7A', { callback: function(){} });  }

			SN_ArrowButton = scene.getScreen().addSprite().setScale(sH*512/2048, sH*128/2048, 0).setHidden(true).setAlpha(0).setTexture(["SN_UpwardsArrowButton.png" ,"SN_UpwardsArrowButton-A.png"]).setTranslation(0, 0, 0).setParent(subNavigatorParent).setClickable(true).addToGroups('SN_SpecificObjects');;
				SN_ArrowButton.onClick = function(){
					if(subNavigatorState == 0){
						MM_SNCurtain.setHidden(false);
						MM_SNCurtain.fadeIn(150,100);
						var subNavigatorParentAnim = subNavigatorParent.animate().delay(0).duration(150).translationY(-sH*975/2048+sH*798/2048);
							subNavigatorParentAnim.onEnd = function(){
								subNavigatorState = 1; 
								scene.getGroup('SN_Sensors').applyToNodes('setClickable', true);
								SN_ArrowButton.animate().delay(0).duration(150).rotationZ(180); 
								if(pageJourney[pageJourney.length - 1] == "MainMenu"){
									scene.getGroup('MM_Sensors').applyToNodes('setClickable', false);
									scene.getGroup('sensors').applyToNodes('setClickable', false);
								}
								else if(pageJourney[pageJourney.length - 1] == "inspectProduct"){
									if(isInIpPropertiesPage == 0){
										scene.getGroup('IP_Sensors').applyToNodes('setClickable', false);
										scene.getGroup('sensors').applyToNodes('setClickable', false);
									}else{
										IP_PropertiesPopsCloseButton.setClickable(false);
									}
								}
								else if(pageJourney[pageJourney.length - 1] == "otherProducts"){
									if(isInOpPopsPage == 0){
										scene.getGroup('OP_Sensors').applyToNodes('setClickable', false);
										scene.getGroup('sensors').applyToNodes('setClickable', false);
									}else{
										OP_PopsCloseButton.setClickable(false);
									}

								}
								else if(pageJourney[pageJourney.length - 1] == "comCenter"){
									scene.getGroup('CS_Sensors').applyToNodes('setClickable', false);
									scene.getGroup('sensors').applyToNodes('setClickable', false);
								}
								else if(pageJourney[pageJourney.length - 1] == "ServiceReseller"){
									if(isInServicePage == 0){
										scene.getGroup('S_Sensors').applyToNodes('setClickable', false);
										scene.getGroup('SB_Sensors').applyToNodes('setClickable', false);
										scene.getGroup('sensors').applyToNodes('setClickable', false);
									}else{
										scene.getGroup('S_Sensors').applyToNodes('setClickable', false);
										scene.getGroup('sensors').applyToNodes('setClickable', false);
									}
								}
								else if(pageJourney[pageJourney.length - 1] == "AdjustHeater"){
									scene.getGroup('AH_Sensors').applyToNodes('setClickable', false);
									scene.getGroup('sensors').applyToNodes('setClickable', false);
								}
								else{
									//beybi
								}
							} 
					}else if(subNavigatorState == 1){
						scene.getGroup('SN_Sensors').applyToNodes('setClickable', false);
						MM_SNCurtain.fadeOut(150, 0);
						scene.getGroup('SN_Sensors').applyToNodes('setClickable', false);
						var subNavigatorParentAnim = subNavigatorParent.animate().delay(0).duration(150).translationY(-sH*975/2048);
							subNavigatorParentAnim.onEnd = function(){ 
								subNavigatorState = 0;
								MM_SNCurtain.setHidden(true); 
								SN_ArrowButton.animate().delay(0).duration(150).rotationZ(0); 
								if(pageJourney[pageJourney.length - 1] == "MainMenu"){
									scene.getGroup('MM_Sensors').applyToNodes('setClickable', true);
									scene.getGroup('sensors').applyToNodes('setClickable', true);
								}
								else if(pageJourney[pageJourney.length - 1] == "inspectProduct"){
									if(isInIpPropertiesPage == 0){
										scene.getGroup('IP_Sensors').applyToNodes('setClickable', true);
										scene.getGroup('sensors').applyToNodes('setClickable', true);
									}else{
										IP_PropertiesPopsCloseButton.setClickable(true);
									}
								}
								else if(pageJourney[pageJourney.length - 1] == "otherProducts"){
									if(isInOpPopsPage == 0){
										scene.getGroup('OP_Sensors').applyToNodes('setClickable', true);
										scene.getGroup('sensors').applyToNodes('setClickable', true);
									}else{
										OP_PopsCloseButton.setClickable(true);
									}
								}
								else if(pageJourney[pageJourney.length - 1] == "comCenter"){
									scene.getGroup('CS_Sensors').applyToNodes('setClickable', true);
									scene.getGroup('sensors').applyToNodes('setClickable', true);
								}
								else if(pageJourney[pageJourney.length - 1] == "ServiceReseller"){
									if(isInServicePage == 0){
										scene.getGroup('S_Sensors').applyToNodes('setClickable', true);
										scene.getGroup('SB_Sensors').applyToNodes('setClickable', true);
										scene.getGroup('sensors').applyToNodes('setClickable', true);
									}else{
										scene.getGroup('S_Sensors').applyToNodes('setClickable', true);
										scene.getGroup('sensors').applyToNodes('setClickable', true);
									}
								}
								else if(pageJourney[pageJourney.length - 1] == "AdjustHeater"){
									scene.getGroup('AH_Sensors').applyToNodes('setClickable', true);
									scene.getGroup('sensors').applyToNodes('setClickable', true);
								}
								else{
									//beybi
								} 
							} 
					}
				}
}

function openGivenPage(givenPage){
	switch(givenPage)
	{
	case "MainMenu":
		blippBackButton.setHidden(true);
		scene.getGroup('MM_SpecificObjects').applyToNodes('setHidden', false);
		scene.getGroup('MM_SpecificObjects').applyToNodes('fadeIn',500, 0);
		scene.getGroup('MM_Sensors').applyToNodes('setClickable', true);
		SN_MainMenuButton.setClickable(false);
	    break;
	case "inspectProduct":
		scene.getGroup('IP_SpecificObjects').applyToNodes('fadeIn', 500, 0);
		scene.getGroup('IP_SpecificObjects').applyToNodes('setHidden', false);
		if(animationState == 0){ //c25
			c20_Parent.applyToNodeAndDescendants('fadeOut');
			c60_Parent.applyToNodeAndDescendants('fadeOut');
			parentOfAll.animate().delay(0).duration(500).translation(37,0,600).onEnd= function(){ scene.getGroup('IP_Sensors').applyToNodes('setClickable', true); }
			IP_ProductName.setActiveTexture(1);
		}else if(animationState == 1){ //c60
			c20_Parent.applyToNodeAndDescendants('fadeOut');
			c25_Parent.applyToNodeAndDescendants('fadeOut');
			parentOfAll.animate().delay(0).duration(500).translation(37,0,600).onEnd= function(){ scene.getGroup('IP_Sensors').applyToNodes('setClickable', true); }
			IP_ProductName.setActiveTexture(0);
		}else if(animationState == 2){ //c20
			c25_Parent.applyToNodeAndDescendants('fadeOut');
			c60_Parent.applyToNodeAndDescendants('fadeOut');
			parentOfAll.animate().delay(0).duration(500).translation(37,0,600).onEnd= function(){ scene.getGroup('IP_Sensors').applyToNodes('setClickable', true); }
			IP_ProductName.setActiveTexture(2);
		}
	    break;
	case "otherProducts":
		scene.getGroup('OP_SpecificObjects').applyToNodes('fadeIn');
		scene.getGroup('OP_SpecificObjects').applyToNodes('setHidden', false);
		scene.animate().duration(500).onEnd = function () {
					scene.getGroup('OP_Sensors').applyToNodes('setClickable', true);
		}
	    break;
 	case "comCenter":
		scene.getGroup('CS_SpecificObjects').applyToNodes('setHidden', false);
		CS_Background.fadeIn();
		CS_Ring.fadeIn();
		CS_LiveSupport.animate().duration(500).delay(500).translationY(sH*460/2048).onEnd=function(){ scene.getGroup('CS_Sensors').applyToNodes('setClickable', true); }
		CS_EmailButton.animate().duration(500).delay(500).translationY(-sH*460/2048);
		CS_PhoneButton.fadeIn(500, 500);
		CS_PhoneButton.animate().duration(500).delay(500).scale(sH*453/2048);
		CS_EmailButton.fadeIn(500, 500);
		CS_LiveSupport.fadeIn(500, 500);
		CS_Ring.setHidden(false);
	    break;
 	case "ServiceReseller":
		scene.getGroup('SB_SpecificObjects').applyToNodes('setHidden', false);
		SB_Background.fadeIn();
		SB_Ring.fadeIn();
		SB_ServiceButton.animate().duration(500).delay(500).translationY(sH*214/2048).onEnd=function(){ scene.getGroup('SB_Sensors').applyToNodes('setClickable', true); }
		SB_BayiButton.animate().duration(500).delay(500).translationY(-sH*276/2048);
		SB_ServiceButton.fadeIn(500, 500);
		SB_BayiButton.fadeIn(500, 500);
		SB_Ring.setHidden(false);
    	break;
     case "AdjustHeater":
 		scene.animate().duration(500).onEnd = function () {
 			scene.getGroup('AH_Sensors').applyToNodes('setClickable', true);
		}
		scene.getGroup('AH_SpecificObjects').applyToNodes('setHidden', false);
		scene.getGroup('AH_SpecificObjects').applyToNodes('fadeIn');
		AH_Background.fadeIn();
		AH_Background.setHidden(false);
    	break;
	default:
	    console.log("default case in switch");
	}  
}

function closeGivenPage(givenPage){
	switch(givenPage) {
	case "MainMenu":
		scene.getGroup('MM_SpecificObjects').applyToNodes('fadeOut');
		scene.getGroup('MM_Sensors').applyToNodes('setClickable', false);
		blippBackButton.setHidden(false);
	    break;
	case "inspectProduct":
		isInIpPropertiesPage = 0;
		scene.getGroup('IP_Sensors').applyToNodes('setClickable', false);
		scene.getGroup('IP_SpecificObjects').applyToNodes('fadeOut');
		scene.getGroup('IP_Pop').applyToNodes('fadeOut');
		if(animationState == 0){ //c25
			c20_Parent.applyToNodeAndDescendants('fadeIn');
			c60_Parent.applyToNodeAndDescendants('fadeIn');
			parentOfAll.animate().delay(0).duration(500).translation(37,100,300).onEnd = function(){ scene.getGroup('IP_SpecificObjects').applyToNodes('setHidden', true); }
		}else if(animationState == 1){ //c60
			c20_Parent.applyToNodeAndDescendants('fadeIn');
			c25_Parent.applyToNodeAndDescendants('fadeIn');
			parentOfAll.animate().delay(0).duration(500).translation(37,100,300).onEnd = function(){ scene.getGroup('IP_SpecificObjects').applyToNodes('setHidden', true); }
		}else if(animationState == 2){ //c20
			c25_Parent.applyToNodeAndDescendants('fadeIn');         
			c60_Parent.applyToNodeAndDescendants('fadeIn');
			parentOfAll.animate().delay(0).duration(500).translation(37,100,300).onEnd = function(){ scene.getGroup('IP_SpecificObjects').applyToNodes('setHidden', true); }
		}
	    break;
   	case "otherProducts":
		scene.getGroup('OP_SpecificObjects').applyToNodes('fadeOut');
		scene.getGroup('OP_Sensors').applyToNodes('setClickable', false);
		scene.getGroup('OP_Pop').applyToNodes('fadeOut');
		scene.animate().duration(500).onEnd = function () {
			scene.getGroup('OP_SpecificObjects').applyToNodes('setHidden', true);
			scene.getGroup('OP_Pop').applyToNodes('setHidden', true);
		}
		isInOpPopsPage = 0;
	    break;
   	case "comCenter":
		scene.getGroup('CS_SpecificObjects').applyToNodes('fadeOut');
		scene.getGroup('CS_Sensors').applyToNodes('setClickable', false);
		scene.getGroup('CS_SpecificObjects').applyToNodes('fadeOut');
		CS_LiveSupport.animate().duration(500).delay(500).translationY(sH/3).onEnd=function(){ scene.getGroup('CS_Sensors').applyToNodes('setHidden', true); }
		CS_EmailButton.animate().duration(500).delay(500).translationY(-sH/3);
		CS_PhoneButton.animate().duration(500).delay(0).scale(0);
		CS_Ring.setHidden(true);
	    break;
	case "ServiceReseller":
		scene.getGroup('SB_SpecificObjects').applyToNodes('fadeOut');
		scene.getGroup('SB_Sensors').applyToNodes('setClickable', false);
		scene.getGroup('S_SpecificObjects').applyToNodes('fadeOut');
		scene.getGroup('S_Sensors').applyToNodes('setClickable', false);
		SB_ServiceButton.animate().duration(500).delay(500).translationY(sH/3).onEnd=function(){ scene.getGroup('SB_SpecificObjects').applyToNodes('setHidden', true); scene.getGroup('S_SpecificObjects').applyToNodes('setHidden', true); }
		SB_BayiButton.animate().duration(500).delay(500).translationY(-sH/3);
		SB_ServiceButton.animate().duration(500).delay(500).scale(sH*453/2048);
		isInServicePage = 0;
		SB_Ring.setHidden(true);
	    break;
    case "AdjustHeater":
		scene.getGroup('AH_Sensors').applyToNodes('setClickable', false);
		scene.getGroup('AH_SpecificObjects').applyToNodes('fadeOut');
		scene.getGroup('WP_SpecificObjects').applyToNodes('fadeOut');
		scene.animate().duration(500).onEnd = function () {
			scene.getGroup('AH_SpecificObjects').applyToNodes('setHidden', true);
			scene.getGroup('WP_SpecificObjects').applyToNodes('setHidden', true);
			AH_Background.setHidden(true);
		}
		AH_Background.fadeOut();
		isInWeatherPanel = 0;
		break;
	default:
	    console.log("default case in switch");
	}  

}

function continuousMMAnimations(){
	var scaleColorRingAnim = MM_ColorRing.animate().delay(2500).duration(5000).scale(2*sH).loop();
		scaleColorRingAnim.onLoop = function(){ MM_ColorRing.fadeIn(0,0); MM_ColorRing.fadeOut(4900,100); }
		scaleColorRingAnim.onStart = function(){ MM_ColorRing.fadeOut(5000,0); }

	var scaleWhiteRingAnim = MM_WhiteRing.animate().delay(2500).duration(6000).scale(2*sH).loop();
		scaleWhiteRingAnim.onLoop = function(){ MM_WhiteRing.fadeIn(0,0); MM_WhiteRing.fadeOut(5900,100); }
		scaleWhiteRingAnim.onStart = function(){ MM_WhiteRing.fadeOut(6000,0); }

	var rotateMMAnim = MM_Background.animate().delay(2500).duration(15000).rotationZ(360).loop();
		rotateMMAnim.onLoop = function(){ MM_Background.setRotationZ(MM_Background.getRotationZ());}

	var rotateMovingGlowAnim = MM_movingBackGlow.animate().delay(2500).duration(5000).rotationZ(-360).loop();
		rotateMMAnim.onLoop = function(){ MM_movingBackGlow.setRotationZ(MM_movingBackGlow.getRotationZ());}

	var scaleCSRingAnim = CS_Ring.animate().delay(0).duration(4000).scale(1.5*sH).loop();
		scaleCSRingAnim.onLoop = function(){ CS_Ring.fadeIn(0,0); CS_Ring.fadeOut(3900,100); }
		scaleCSRingAnim.onStart = function(){ CS_Ring.fadeOut(4000,0); }

	var scaleSBRingAnim = SB_Ring.animate().delay(0).duration(4000).scale(1.5*sH).loop();
		scaleSBRingAnim.onLoop = function(){ SB_Ring.fadeIn(0,0); SB_Ring.fadeOut(3900,100); }
		scaleSBRingAnim.onStart = function(){ SB_Ring.fadeOut(4000,0); }

	snArrowUp();
}

function snArrowUp(){
	SN_ArrowButton.animate().delay(0).duration(500).translationY(5).onEnd=function(){ snArrowDown(); };
}

function snArrowDown(){
	SN_ArrowButton.animate().delay(0).duration(500).translationY(-5).onEnd=function(){ snArrowUp(); };
}

function closeSnPressingCurtain(){
	scene.getGroup('SN_Sensors').applyToNodes('setClickable', false);
	MM_SNCurtain.fadeOut(150, 0);
	scene.getGroup('SN_Sensors').applyToNodes('setClickable', false);
	var subNavigatorParentAnim = subNavigatorParent.animate().delay(0).duration(150).translationY(-sH*975/2048);
	subNavigatorParentAnim.onEnd = function(){ 
		subNavigatorState = 0;
		MM_SNCurtain.setHidden(true); 
		SN_ArrowButton.animate().delay(0).duration(150).rotationZ(0); 
		if(pageJourney[pageJourney.length - 1] == "MainMenu"){
			scene.getGroup('MM_Sensors').applyToNodes('setClickable', true);
			scene.getGroup('sensors').applyToNodes('setClickable', true);
		}
		else if(pageJourney[pageJourney.length - 1] == "inspectProduct"){
			if(isInIpPropertiesPage == 0){
				scene.getGroup('IP_Sensors').applyToNodes('setClickable', true);
				scene.getGroup('sensors').applyToNodes('setClickable', true);
			}else{
				IP_PropertiesPopsCloseButton.setClickable(true);
			}
		}
		else if(pageJourney[pageJourney.length - 1] == "otherProducts"){
			if(isInOpPopsPage == 0){
				scene.getGroup('OP_Sensors').applyToNodes('setClickable', true);
				scene.getGroup('sensors').applyToNodes('setClickable', true);
			}else{
				OP_PopsCloseButton.setClickable(true);
			}
		}
		else if(pageJourney[pageJourney.length - 1] == "comCenter"){
			scene.getGroup('CS_Sensors').applyToNodes('setClickable', true);
			scene.getGroup('sensors').applyToNodes('setClickable', true);
		}
		else if(pageJourney[pageJourney.length - 1] == "ServiceReseller"){
			if(isInServicePage == 0){
				scene.getGroup('S_Sensors').applyToNodes('setClickable', true);
				scene.getGroup('SB_Sensors').applyToNodes('setClickable', true);
				scene.getGroup('sensors').applyToNodes('setClickable', true);
			}else{
				scene.getGroup('S_Sensors').applyToNodes('setClickable', true);
				scene.getGroup('sensors').applyToNodes('setClickable', true);
			}
		}
		else if(pageJourney[pageJourney.length - 1] == "AdjustHeater"){
			scene.getGroup('AH_Sensors').applyToNodes('setClickable', true);
			scene.getGroup('sensors').applyToNodes('setClickable', true);
		}
		else{
			//beybi
		} 
	} 
}

function closeSubNavBarAnims(){
	subNavigatorParent.animate().delay(0).duration(150).translationY(-sH*975/2048).onEnd=function(){ MM_SNCurtain.setHidden(true); subNavigatorState = 0; }
	MM_SNCurtain.fadeOut(150, 0);
	SN_ArrowButton.animate().delay(0).duration(150).rotationZ(0); 
	scene.getGroup('sensors').applyToNodes('setClickable', true);
}

function getCoordinates(){
	if(locationEnabled == true){
		console.log(locationEnabled);
		var lat = blipp.getGeo().getLat();
		var lon = blipp.getGeo().getLon();
		console.log("latitude: "+lat);
		console.log("longtitude: "+lon);
		var url = "https://api.darksky.net/forecast/0a26527a60c22a51a76bab869e573025/" + lat + "," + lon + "/?exclude=[minutely,hourly,daily,alerts,flags]";
		getWeatherData(url);
	}else{
		//warn
	}
}

function getWeatherData(url){
	console.log(url);
	blipp.xmlHttpRequest('GET', url, function(code, response){
			if (code == blipp.xmlHttpRequest.DONE){
				var WeatherJson = JSON.parse(response);
				var temperatureInFahreneit = JSON.stringify(WeatherJson.currently.temperature);
				var temperatureInCelcius = (temperatureInFahreneit-32)/1.8;
					intCelcius = parseInt(temperatureInCelcius);
					stringCelcius = intCelcius.toString();
					icon = JSON.stringify(WeatherJson.currently.icon);
					iconNormalized= icon.slice(1, icon.length-1);
					console.log(iconNormalized);
				var timezone = JSON.stringify(WeatherJson.timezone);
				console.log("temperatureInCelcius:" +temperatureInCelcius);
				console.log("intCelcius:" + intCelcius);
				console.log("icon:" +icon);
				console.log("timezone:" +timezone);
				admin = blipp.getGeo().getAdmin().toUpperCase();
				console.log(admin);
			}
		}
	);
}

var admin = "n/a";
var iconNormalized;
var combiDegreeWidget = 'n/a';
var weatherDegreeWidget= 'n/a';
var locationEnabled;
var intCelcius= 'undefined';
var stringCelcius = 'n/a';
var heaterSelection;
//['clearDayNight.png', 'cloudy.png', 'cloudyDayNight.png', 'fog.png', 'other.png', 'rain.png', 'sleet.png', 'snow.png', 'wind.png']
function setWeatherTexturesAndWidgets(){

	weatherDegreeWidget.setText(stringCelcius);
	locationWidget.setText(admin);
	if(iconNormalized == "clear-day" || iconNormalized == "clear-night"){
		weatherIcon.setActiveTexture(0);
	}else if(iconNormalized == "rain"){
		weatherIcon.setActiveTexture(5);
	}else if(iconNormalized == "snow"){
		weatherIcon.setActiveTexture(7);
	}else if(iconNormalized == "sleet"){
		weatherIcon.setActiveTexture(6);
	}else if(iconNormalized == "wind"){
		weatherIcon.setActiveTexture(8);
	}else if(iconNormalized == "fog"){
		weatherIcon.setActiveTexture(3);
	}else if(iconNormalized == "cloudy"){
		weatherIcon.setActiveTexture(1);
	}else if(iconNormalized == "partly-cloudy-day" || iconNormalized == "partly-cloudy-night"){
		weatherIcon.setActiveTexture(2);
	}else{
		weatherIcon.setActiveTexture(5);
	}

	if(heaterSelection == 0){
		if(intCelcius< -10){
			combiDegreeWidget.setText('75-80');
		}else if(intCelcius>= -10 && intCelcius< -5){
			combiDegreeWidget.setText('70-75');
		}else if(intCelcius>= -5 && intCelcius< 0){
			combiDegreeWidget.setText('60-70');
		}else if(intCelcius>= 0 && intCelcius< 5){
			combiDegreeWidget.setText('55-60');
		}else if(intCelcius>= 5 && intCelcius< 10){
			combiDegreeWidget.setText('45-55');
		}else if(intCelcius>= 10 && intCelcius< 15){
			combiDegreeWidget.setText('35-45');
		}else if(intCelcius>= 15 && intCelcius<= 20){
			combiDegreeWidget.setText('25-35');
		}
		else if(intCelcius>20){
			combiDegreeWidget.setText('OFF');
		}
		else{
			combiDegreeWidget.setText('n/a');
		}
	}else if(heaterSelection == 1){
		if(intCelcius< -20){
			combiDegreeWidget.setText('47-55');
		}else if(intCelcius>= -20 && intCelcius< 0){
			combiDegreeWidget.setText('40-47');
		}else if(intCelcius>= 0 && intCelcius< 5){
			combiDegreeWidget.setText('35-40');
		}else if(intCelcius>= 5 && intCelcius< 15){
			combiDegreeWidget.setText('30-35');
		}else if(intCelcius>= 15 && intCelcius<= 20){
			combiDegreeWidget.setText('25-30');
		}else if(intCelcius>20){
			combiDegreeWidget.setText('OFF');
		}
		else{
			combiDegreeWidget.setText('n/a');
		}
	}else{
		console.log("heaterSelectionError");
	}
}






