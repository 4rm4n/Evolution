// Author: 			  Arman Yigit

//cover ratio: 1024 * 784

var blipp = require('blippar').blipp;
var scene = blipp.addScene();

var sH = blipp.getScreenHeight()*1.003;
var sW = blipp.getScreenWidth()*1.003;
var mW = blipp.getMarker().getWidth();
var mH = blipp.getMarker().getHeight();

var screenValues = ((sH/sW)*60)/1.33;
blipp.getPeel().setOrientation('portrait');

var camState = 0;
var takenPhoto;
var blippCloseButton;
var PhotoOnCover;
var Cover_TakePhotoButton;
var photoToShare;
var PhotoOnCoverElle;

scene.onShow = function() {
	scene.getGroup('Intro_Sensors').applyToNodes('setClickable', true);
	scene.getGroup('Intro_SpecificObjects').applyToNodes('setHidden', false);
	scene.getGroup('Intro_SpecificObjects').applyToNodes('fadeIn');

	blipp.telemetry('Blipp', 'isStarted');
}

scene.onCreate = function(){
	blipp.uiVisible('navBar', false);
	blipp.uiVisible('peelCloseButton', false);
	scene.setScreenScaleRotate(false);

	DarkOverlay 		= scene.getScreen().addSprite().setScale(sH).setTexture("darkOverlay.png").setHidden(true).setAlpha(0).setTranslation(0, 0 ,0).addToGroups('Intro_SpecificObjects', 'MP_SpecificObjects');

	Intro_Warning 		= scene.getScreen().addSprite().setScale(sH*1471/2048).setTextures(["Intro_Warning.png", "Intro_Warning_Elle.png"]).setHidden(true).setAlpha(0).setTranslation(0, 0 ,0).addToGroups('Intro_SpecificObjects');

	Intro_CTA	  		= scene.getScreen().addSprite().setScale(sH*882/2048 ,sH*882/2048/4, 0).setTexture("Intro_CTA.png").setHidden(true).setAlpha(0).setTranslation(0, -sH*550/2048 ,0).addToGroups('Intro_Sensors', 'Intro_SpecificObjects');
		Intro_CTA.onClick= function(){ closeIntro(); openSelfiePage(); blipp.telemetry('Take_a_selfie_button', 'isPressed');}

	SP_TakePhotoButton	= scene.getScreen().addSprite().setScale(sH*189/2048).setTexture("SP_TakePhotoButton.png").setHidden(true).setAlpha(0).setTranslation(0, -sH*856/2048, 0).addToGroups('SP_Sensors', 'SP_SpecificObjects');
		SP_TakePhotoButton.onClick= function(){ takePhoto(); blipp.telemetry('Selfie_shoot_button', 'isPressed');}

	SP_SwitchCamButton	= scene.getScreen().addSprite().setScale(sH*147/2048).setTexture("SP_SwitchCamButton.png").setHidden(true).setAlpha(0).setTranslation(sH*345/2048, -sH*856/2048, 0).addToGroups('SP_Sensors', 'SP_SpecificObjects');
		SP_SwitchCamButton.onClick= function(){ switchCam(); blipp.telemetry('Switch_camera_button', 'isPressed');}

	cropLayer			= scene.getScreen().addSprite().setScale(sW, 2*sW, 0).setHidden(true).setAlpha(0).setTranslation(0, 0 ,0).setTextures(["cosmo_crop.png", "elle_crop.png"]).addToGroups('SP_SpecificObjects').setBlend("premult");

	if(blipp.getMarkerName().toUpperCase().slice(0,4) == 'ELLE'){
		blipp.telemetry('Elle_cover', 'isBlipped');
		Intro_Warning.setActiveTexture(1);
		cropLayer.setActiveTexture(1);
	}else{
		blipp.telemetry('Cosmo_cover', 'isBlipped');
		Intro_Warning.setActiveTexture(0);
		cropLayer.setActiveTexture(0);
	}

	takenPhoto			= scene.getScreen().addSprite().setScale(sW, sH, 0).setHidden(true).setAlpha(0).setTranslation(0, 0 ,0).setTexture('trans.png').addToGroups('AP_SpecificObjects');

	AP_ApproveButton	= scene.getScreen().addSprite().setScale(sH*187/2048).setTexture("AP_ApproveButton.png").setHidden(true).setTranslation(sH*130/2048, -sH*856/2048, 0).addToGroups('AP_Sensors', 'AP_SpecificObjects');
		AP_ApproveButton.onClick= function(){ closeAprovalPage(); openMiddlePage(); blippBackButton.setHidden(false); blippBackButton.fadeIn(); blipp.telemetry('Photo_aproval_button', 'isPressed');}

	AP_DismissButton	= scene.getScreen().addSprite().setScale(sH*187/2048).setTexture("AP_DismissButton.png").setHidden(true).setTranslation(-sH*130/2048, -sH*856/2048, 0).addToGroups('AP_Sensors', 'AP_SpecificObjects');
		AP_DismissButton.onClick= function(){ closeAprovalPage(); openSelfiePage(); blipp.telemetry('Photo_deny_button', 'isPressed');}

	MP_Warning 			= scene.getScreen().addSprite().setScale(sH*1037/2048).setTexture("MP_Warning.jpg").setHidden(true).setTranslation(0, 0 ,0).addToGroups('MP_SpecificObjects');

	MP_ContinueButton	= scene.getScreen().addSprite().setScale(sH*882/2048 ,sH*882/2048/4, 0).setTexture("MP_ContinueButton.png").setHidden(true).setTranslation(0, -sH*338/2048 ,0).addToGroups('MP_Sensors', 'MP_SpecificObjects');
		MP_ContinueButton.onClick= function(){ closeMiddlePage(); openCoverPage(); blipp.telemetry('Continue_button', 'isPressed');}
	
	topHider = scene.addSprite().setScale(mH*788/1024, 400, 0).setTexture("trans.png").setHidden(true).setAlpha(0).setTranslation(0, (mH/2)+200, 2).addToGroups('Cover_SpecificObjects', 'CoverElle_SpecificObjects').setType('hider');

	bottomHider = scene.addSprite().setScale(mH*788/1024, 400, 0).setTexture("trans.png").setHidden(true).setAlpha(0).setTranslation(0, (-mH/2)-200, 2).addToGroups('Cover_SpecificObjects', 'CoverElle_SpecificObjects').setType('hider');

	PhotoOnCover		= scene.addSprite().setScale(mH*788/1024, (mH*788/1024)*sH/sW, 0).setHidden(true).setTranslation(0, 0 ,0).addToGroups('Cover_SpecificObjects').setType('phantom');

	PhotoOnCoverElle	= scene.addSprite().setScale(mH*768/1024, (mH*768/1024)*sH/sW, 0).setHidden(true).setTranslation(0, 0 ,0).addToGroups('CoverElle_SpecificObjects').setType('phantom');

	Cover				= scene.addSprite().setScale(mH*788/1024, mH, 0).setTextureScale(788/1024,1024/1024).setTexture(["cover.jpg","cover-A.png"]).setHidden(true).setTranslation(0, 0 ,1).addToGroups('Cover_SpecificObjects');

	CoverElle				= scene.addSprite().setScale(mH*768/1024, mH, 0).setTextureScale(768/1024,1024/1024).setTexture(["elleCover.png","elleCover-A.png"]).setHidden(true).setTranslation(0, 0 ,1).addToGroups('CoverElle_SpecificObjects');

	Cover_TakePhotoButton	= scene.getScreen().addSprite().setScale(sH*189/2048).setTexture("SP_TakePhotoButton.png").setHidden(true).setAlpha(0).setTranslation(0, -sH*856/2048, 0).addToGroups('Cover_Sensors', 'Cover_SpecificObjects', 'CoverElle_SpecificObjects');
		Cover_TakePhotoButton.onClick= function(){ takePhotoToShare(); blipp.telemetry('Take_photo_of_cover_button', 'isPressed');}

	photoToShare			= scene.getScreen().addSprite().setScale(sW, sH, 0).setHidden(true).setAlpha(0).setTranslation(0, 0 ,0).setTexture('trans.png').addToGroups('Share_SpecificObjects');

	ShareButton	= scene.getScreen().addSprite().setScale(sH*881/2048, sH*881/2048/4, 0).setTexture("LP_ShareButton.png").setHidden(true).setAlpha(0).setTranslation(0, -sH*841/2048, 0).addToGroups('Share_Sensors', 'Share_SpecificObjects');
		blipp.telemetry('Share_button', 'isPressed');
		ShareButton.onClick= function(){ 
			if(blipp.getMarkerName().toUpperCase().slice(0,4) == 'ELLE'){
				blipp.telemetry('Share_button_for_Elle', 'isPressed');
				blipp.shareAsset('generic', '#MerryBlippmas', 'subject', '', 'toShare.png', function(){ console.log("share is clicked"); }); 
			}else{
				blipp.telemetry('Share_button_for_Cosmopolitan', 'isPressed');
				blipp.shareAsset('generic', "Hell yeah, I'm the cover star! #MerryBlippmas", 'subject', '','toShare.png', function(){ console.log("share is clicked"); }); 
			}

		}
	
	blipparLogo	= scene.getScreen().addSprite().setScale(sH*355/2048, sH*355/2048/2, 0).setTexture("blipparLogo.png").setHidden(true).setAlpha(0).setTranslation(0, sH*932/2048, 0).addToGroups('Cover_SpecificObjects', 'CoverElle_SpecificObjects');

	blippCloseButton 	= scene.getScreen().addSprite().setScale(sH*100/2048).setHidden(false).setTexture("closeButton.png").setTranslation(sW/2 ,sH/2, 0).setHAlign('right').setVAlign('top').setClickable(true).addToGroup('sensors');
		blippCloseButton.onClick = function(){ blipp.close(); blipp.telemetry('Blipp_Close_button', 'isPressed');}

	blippBackButton 			= scene.getScreen().addSprite().setScale(sH*164/2048).setHidden(true).setAlpha(0).setTexture("backButton.jpg").setTranslation(-sW/2 ,sH/2, 0).setHAlign('left').setVAlign('top').setClickable(true).addToGroup('sensors');
		blippBackButton.onClick = function(){closeSharePage(); closeMiddlePage(); closeCoverPage(); this.setHidden(true); this.fadeOut(); openSelfiePage(); blipp.telemetry('Back_Button', 'isPressed');}
}

function closeIntro(){
	scene.getGroup('Intro_Sensors').applyToNodes('setClickable', false);
	scene.getGroup('Intro_SpecificObjects').applyToNodes('setHidden', true);
}

function openSelfiePage(){
	camState = 1;
	blipp.setCameraMode('front');
	scene.getGroup('SP_Sensors').applyToNodes('setClickable', true);
	scene.getGroup('SP_SpecificObjects').applyToNodes('setHidden', false);
	scene.getGroup('SP_SpecificObjects').applyToNodes('fadeIn');
}

function closeSelfiePage(){
	scene.getGroup('SP_Sensors').applyToNodes('setClickable', false);
	scene.getGroup('SP_SpecificObjects').applyToNodes('setHidden', true);
	scene.getGroup('SP_SpecificObjects').applyToNodes('fadeOut');
}

function switchCam(){
	if(camState == 0){
		camState = 1;
		blipp.setCameraMode('front');
	}else{
		camState = 0;
		blipp.setCameraMode('back');
	}
}

function takePhoto(){
	scene.getGroup('SP_SpecificObjects').applyToNodes('setHidden', true);
	blippCloseButton.setHidden(true);
	blipp.takePhoto({saveToAssets: true, saveToGallery: false, filename: 'out.png', size: 1024}, function(result) {
		if(result == 'OK'){
			takenPhoto.setTexture("out.png");
			closeSelfiePage();
			openAprovalPage();
			blippCloseButton.setHidden(false);
		}else{
			//willBeHandled
		}
	})
}

function openAprovalPage(){
	scene.getGroup('AP_Sensors').applyToNodes('setClickable', true);
	scene.getGroup('AP_SpecificObjects').applyToNodes('setHidden', false);
	scene.getGroup('AP_SpecificObjects').applyToNodes('fadeIn');
}

function closeAprovalPage(){
	scene.getGroup('AP_Sensors').applyToNodes('setClickable', false);
	scene.getGroup('AP_SpecificObjects').applyToNodes('setHidden', true);
	scene.getGroup('AP_SpecificObjects').applyToNodes('fadeOut');
}

function openMiddlePage(){
	if(camState ==1){
	switchCam();
	}else{
		//nothing
	}
	scene.getGroup('MP_Sensors').applyToNodes('setClickable', true);
	scene.getGroup('MP_SpecificObjects').applyToNodes('setHidden', false);
	scene.getGroup('MP_SpecificObjects').applyToNodes('fadeIn');
}

function closeMiddlePage(){
	scene.getGroup('MP_Sensors').applyToNodes('setClickable', false);
	scene.getGroup('MP_SpecificObjects').applyToNodes('setHidden', true);
	scene.getGroup('MP_SpecificObjects').applyToNodes('fadeOut');
}

function openCoverPage(){
	console.log(blipp.getMarkerName().toUpperCase().slice(0,4));
	console.log(blipp.getMarkerName());
	if(blipp.getMarkerName().toUpperCase().slice(0,4) == 'ELLE'){
		PhotoOnCoverElle.setTexture('out.png');
		scene.getGroup('Cover_Sensors').applyToNodes('setClickable', true);
		scene.getGroup('CoverElle_SpecificObjects').applyToNodes('setHidden', false);
		scene.getGroup('CoverElle_SpecificObjects').applyToNodes('fadeIn');
	}else{
		PhotoOnCover.setTexture('out.png');
		scene.getGroup('Cover_Sensors').applyToNodes('setClickable', true);
		scene.getGroup('Cover_SpecificObjects').applyToNodes('setHidden', false);
		scene.getGroup('Cover_SpecificObjects').applyToNodes('fadeIn');
	}
}

function closeCoverPage(){
	if(blipp.getMarkerName().toUpperCase().slice(0,4) == 'ELLE'){
		scene.getGroup('Cover_Sensors').applyToNodes('setClickable', false);
		scene.getGroup('CoverElle_SpecificObjects').applyToNodes('setHidden', true);
		scene.getGroup('CoverElle_SpecificObjects').applyToNodes('fadeOut');
	}else{
		scene.getGroup('Cover_Sensors').applyToNodes('setClickable', false);
		scene.getGroup('Cover_SpecificObjects').applyToNodes('setHidden', true);
		scene.getGroup('Cover_SpecificObjects').applyToNodes('fadeOut');
	}
}

function takePhotoToShare(){
	blippBackButton.setHidden(true);
	blippCloseButton.setHidden(true);
	Cover_TakePhotoButton.setHidden(true);
	blipp.takePhoto({saveToAssets: true, saveToGallery: false, filename: 'toShare.png', size: 1024}, function(result) {
		if(result == 'OK'){
			photoToShare.setTexture("toShare.png");
			closeCoverPage();
			openSharePage();
			blippCloseButton.setHidden(false);
			blippBackButton.setHidden(false);
		}else{
			
		}
	})
}

function openSharePage(){
	scene.getGroup('Share_Sensors').applyToNodes('setClickable', true);
	scene.getGroup('Share_SpecificObjects').applyToNodes('setHidden', false);
	scene.getGroup('Share_SpecificObjects').applyToNodes('fadeIn');
}

function closeSharePage(){
	scene.getGroup('Share_Sensors').applyToNodes('setClickable', false);
	scene.getGroup('Share_SpecificObjects').applyToNodes('setHidden', true);
	scene.getGroup('Share_SpecificObjects').applyToNodes('fadeOut');
}
