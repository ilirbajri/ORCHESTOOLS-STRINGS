Content.makeFrontInterface(870, 580);

Engine.loadFontAs("{PROJECT_FOLDER}calibrib.ttf", "calibrib");
Engine.setGlobalFont("calibrib");

const var EQ1 = Engine.addModuleStateToUserPreset("L1_EQ");
const var EQ2 = Engine.addModuleStateToUserPreset("L2_EQ");
const var EQ3 = Engine.addModuleStateToUserPreset("L3_EQ");
const var EQ4 = Engine.addModuleStateToUserPreset("L4_EQ");

const var Convolution = Synth.getAudioSampleProcessor("CONVOLUTION");

Engine.loadAudioFilesIntoPool();
const var IMPULSEselector = Content.getComponent("IMPULSEselector");
IMPULSEselector.setControlCallback(loadImpulse);

inline function loadImpulse(control, value)
{
    Convolution.setFile("{PROJECT_FOLDER}"+ control.getItemText() + ".wav");
}

    // CURRENT PRESET
const var PresetName = Content.getComponent("PresetName");

inline function onKnob1Control(component, value)
{
    if (Engine.getCurrentUserPresetName() == "")
        Content.getComponent("PresetName").set("text", "Init");
    else
        Content.getComponent("PresetName").set("text", Engine.getCurrentUserPresetName());
};

Content.getComponent("Knob1").setControlCallback(onKnob1Control);
        // MAIN PANELS

    // LIBRARY PANEL

const var LibraryPanel = Content.getComponent("LIBRARY Panel");
const var LIBButton = Content.getComponent("LIBButton");
LIBButton.setControlCallback(LIBButtonCB);

inline function LIBButtonCB(control, value)
{
    LibraryPanel.showControl(value);
}

    // MIDI CC PANEL

const var MIDICCPanel = Content.getComponent("MIDI CC Panel");
const var MIDIButton = Content.getComponent("MIDIButton");
MIDIButton.setControlCallback(MIDIButtonCB);

inline function MIDIButtonCB(control, value)
{
    MIDICCPanel.showControl(value);
}

    // SETUP PANEL

const var SetupPanel = Content.getComponent("SETUP Panel");
const var SETUPButton = Content.getComponent("SETUPButton");
SETUPButton.setControlCallback(SETUPButtonCB);

inline function SETUPButtonCB(control, value)
{
    SetupPanel.showControl(value);
}

    // EQ PANEL

const var EQPanel = Content.getComponent("EQ Panel");
const var EQButton = Content.getComponent("EQButton");
EQButton.setControlCallback(EQButtonCB);

inline function EQButtonCB(control, value)
{
    EQPanel.showControl(value);
}

    // LFO and FX PANEL

const var LFOFXPanel = Content.getComponent("LFOandFX Panel");
const var LFXButton = Content.getComponent("LFOFXButton");
LFXButton.setControlCallback(LFXButtonCB);

inline function LFXButtonCB(control, value)
{
    LFOFXPanel.showControl(value);
}
        // LFO Setup
        
	// LFO1
	
const var LFO1 = Synth.getModulator("LFO1");

const var WaveFormType1 = {"SINUSOID": 1, "TRIANGLE": 2, "SAWTOOTH": 3, "SQUARE": 4, "RANDOM": 5, "PATTERN": 7,};
const var LFO1WaveForm = Content.getComponent("LFO1WaveForm");

LFO1WaveForm.set("items", ""); //Clear list
for (k in WaveFormType1)
{
    LFO1WaveForm.addItem(k); //Add mode name to list
}

inline function onLFO1WaveFormControl(component, value)
{
    LFO1.setAttribute(LFO1.WaveFormType, WaveFormType1[component.getItemText()]);
};

Content.getComponent("LFO1WaveForm").setControlCallback(onLFO1WaveFormControl);

	// LFO2
	
const var LFO2 = Synth.getModulator("LFO2");

const var WaveFormType2 = {"SINUSOID": 1, "TRIANGLE": 2, "SAWTOOTH": 3, "SQUARE": 4, "RANDOM": 5, "CUSTOM": 6,};
const var LFO2WaveForm = Content.getComponent("LFO2WaveForm");

LFO2WaveForm.set("items", ""); //Clear list
for (k in WaveFormType2)
{
    LFO2WaveForm.addItem(k); //Add mode name to list
}

inline function onLFO2WaveFormControl(component, value)
{
    LFO2.setAttribute(LFO2.WaveFormType, WaveFormType2[component.getItemText()]);
};

Content.getComponent("LFO2WaveForm").setControlCallback(onLFO2WaveFormControl);        


                //LFO EDITORS SETUP
                
            // LFO 1 PTN EDITOR 

const var LFO1PTNPanel = Content.getComponent("LFO1EditPanel");
const var LFO1PTNButton = Content.getComponent("LFO1 PTNButton");
LFO1PTNButton.setControlCallback(LFO1PTNButtonCB);

inline function LFO1PTNButtonCB(control, value)
{
    LFO1PTNPanel.showControl(value);
}
            
            // LFO 2 PTN EDITOR 

const var LFO2PTNPanel = Content.getComponent("LFO2EditPanel");
const var LFO2PTNButton = Content.getComponent("LFO2 PTNButton");
LFO2PTNButton.setControlCallback(LFO2PTNButtonCB);

inline function LFO2PTNButtonCB(control, value)
{
    LFO2PTNPanel.showControl(value);
}        
 

    // LAYER 1

// L1 panels buttons setup

const var PitchPanel = Content.getComponent("L1_PITCH PANEL");
const var L1_PitchEditButton = Content.getComponent("L1_PitchEditButton");
L1_PitchEditButton.setControlCallback(L1_PitchEditButtonCB);

inline function L1_PitchEditButtonCB(control, value)
{
    PitchPanel.showControl(value);
}

const var KeyRangePanel = Content.getComponent("L1_KEYRANGE");
const var L1_KeyRangeButton = Content.getComponent("L1_KeyRangeButton");
L1_KeyRangeButton.setControlCallback(L1_KeyRangeButtonCB);

inline function L1_KeyRangeButtonCB(control, value)
{
    KeyRangePanel.showControl(value);
}

    // LAYER1 | instrument selection

const var LAYER1 = Synth.getChildSynth("LAYER1");
const var sampleMaps1 = Sampler.getSampleMapList();

const var LAYER1INSTRUMENT = Content.getComponent("LAYER1INSTRUMENT");
LAYER1INSTRUMENT.set("items", sampleMaps1.join("\n"));

inline function onLAYER1INSTRUMENTControl(component, value)
{
	LAYER1.asSampler().loadSampleMap(sampleMaps1[value-1]);
};

Content.getComponent("LAYER1INSTRUMENT").setControlCallback(onLAYER1INSTRUMENTControl);

     // L1 Pitch ratio setup;
const var L1Pitch = Synth.getModulator("L1_PITCH");

inline function onL1_PITCHControl(component, value)
{
	L1Pitch.setIntensity(value/2);	
};

Content.getComponent("L1_PITCH").setControlCallback(onL1_PITCHControl);
     
     
     // Filter ;

const var L1_Filter = Synth.getEffect("L1_Filter");

const var modes1 = {"1POLE LP": 9, "1POLE HP": 10, "SVF LP": 6, "SVF HP": 7, "BIQUAD LP": 0, "BIQUAD HP": 1, "BIQUAD LP REZ": 5, "MOOG LP": 8, "LADDER 4POLE": 15, "L-SHELF EQ": 2, "H-SHELF EQ": 3, "PEAK EQ": 4,  "ALLPASS": 14};

const var L1FilterSelect = Content.getComponent("L1FilterSelect");

L1FilterSelect.set("items", ""); //Clear list

for (k in modes1)
{
    L1FilterSelect.addItem(k); //Add mode name to list
}

inline function onL1FilterSelectControl(component, value)
{
    L1_Filter.setAttribute(L1_Filter.Mode, modes1[component.getItemText()]);
};

Content.getComponent("L1FilterSelect").setControlCallback(onL1FilterSelectControl);



        // LAYER 2

    // L2 panels buttons setup

const var PitchPanel2 = Content.getComponent("L2_PITCH PANEL");
const var L2_PitchEditButton = Content.getComponent("L2_PitchEditButton");
L2_PitchEditButton.setControlCallback(L2_PitchEditButtonCB);

inline function L2_PitchEditButtonCB(control, value)
{
    PitchPanel2.showControl(value);
}

const var KeyRangePanel2 = Content.getComponent("L2_KEYRANGE");
const var L2_KeyRangeButton = Content.getComponent("L2_KeyRangeButton");
L2_KeyRangeButton.setControlCallback(L2_KeyRangeButtonCB);

inline function L2_KeyRangeButtonCB(control, value)
{
    KeyRangePanel2.showControl(value);
}

    // LAYER2 | instrument selection

const var LAYER2 = Synth.getChildSynth("LAYER2");
const var sampleMaps2 = Sampler.getSampleMapList();

const var LAYER2INSTRUMENT = Content.getComponent("LAYER2INSTRUMENT");
LAYER2INSTRUMENT.set("items", sampleMaps2.join("\n"));

inline function onLAYER2INSTRUMENTControl(component, value)
{
	LAYER2.asSampler().loadSampleMap(sampleMaps2[value-1]);
};

Content.getComponent("LAYER2INSTRUMENT").setControlCallback(onLAYER2INSTRUMENTControl);

     // L2 Pitch ratio setup;
const var L2Pitch = Synth.getModulator("L2_PITCH");

inline function onL2_PITCHControl(component, value)
{
	L2Pitch.setIntensity(value/2);	
};

Content.getComponent("L2_PITCH").setControlCallback(onL2_PITCHControl);
     
     
     // Filter ;

const var L2_Filter = Synth.getEffect("L2_Filter");

const var modes2 = {"1POLE LP": 9, "1POLE HP": 10, "SVF LP": 6, "SVF HP": 7, "BIQUAD LP": 0, "BIQUAD HP": 1, "BIQUAD LP REZ": 5, "MOOG LP": 8, "LADDER 4POLE": 15, "L-SHELF EQ": 2, "H-SHELF EQ": 3, "PEAK EQ": 4,  "ALLPASS": 14};

const var L2FilterSelect = Content.getComponent("L2FilterSelect");

L2FilterSelect.set("items", ""); //Clear list

for (k in modes2)
{
    L2FilterSelect.addItem(k); //Add mode name to list
}

inline function onL2FilterSelectControl(component, value)
{
    L2_Filter.setAttribute(L2_Filter.Mode, modes2[component.getItemText()]);
};

Content.getComponent("L2FilterSelect").setControlCallback(onL2FilterSelectControl);



        // LAYER 3
        
    // L3 panels buttons setup

const var PitchPanel3 = Content.getComponent("L3_PITCH PANEL");
const var L3_PitchEditButton = Content.getComponent("L3_PitchEditButton");
L3_PitchEditButton.setControlCallback(L3_PitchEditButtonCB);

inline function L3_PitchEditButtonCB(control, value)
{
    PitchPanel3.showControl(value);
}

const var KeyRangePanel3 = Content.getComponent("L3_KEYRANGE");
const var L3_KeyRangeButton = Content.getComponent("L3_KeyRangeButton");
L3_KeyRangeButton.setControlCallback(L3_KeyRangeButtonCB);

inline function L3_KeyRangeButtonCB(control, value)
{
    KeyRangePanel3.showControl(value);
}

    // LAYER3 | instrument selection

const var LAYER3 = Synth.getChildSynth("LAYER3");
const var sampleMaps3 = Sampler.getSampleMapList();

const var LAYER3INSTRUMENT = Content.getComponent("LAYER3INSTRUMENT");
LAYER3INSTRUMENT.set("items", sampleMaps3.join("\n"));

inline function onLAYER3INSTRUMENTControl(component, value)
{
	LAYER3.asSampler().loadSampleMap(sampleMaps3[value-1]);
};

Content.getComponent("LAYER3INSTRUMENT").setControlCallback(onLAYER3INSTRUMENTControl);

     // L3 Pitch ratio setup;
const var L3Pitch = Synth.getModulator("L3_PITCH");

inline function onL3_PITCHControl(component, value)
{
	L3Pitch.setIntensity(value/2);	
};

Content.getComponent("L3_PITCH").setControlCallback(onL3_PITCHControl);
     
     
     // Filter ;

const var L3_Filter = Synth.getEffect("L3_Filter");

const var modes3 = {"1POLE LP": 9, "1POLE HP": 10, "SVF LP": 6, "SVF HP": 7, "BIQUAD LP": 0, "BIQUAD HP": 1, "BIQUAD LP REZ": 5, "MOOG LP": 8, "LADDER 4POLE": 15, "L-SHELF EQ": 2, "H-SHELF EQ": 3, "PEAK EQ": 4,  "ALLPASS": 14};

const var L3FilterSelect = Content.getComponent("L3FilterSelect");

L3FilterSelect.set("items", ""); //Clear list

for (k in modes1)
{
    L3FilterSelect.addItem(k); //Add mode name to list
}

inline function onL3FilterSelectControl(component, value)
{
    L3_Filter.setAttribute(L3_Filter.Mode, modes3[component.getItemText()]);
};

Content.getComponent("L3FilterSelect").setControlCallback(onL3FilterSelectControl);



        // LAYER 4
        
    // L4 panels buttons setup

const var PitchPanel4 = Content.getComponent("L4_PITCH PANEL");
const var L4_PitchEditButton = Content.getComponent("L4_PitchEditButton");
L4_PitchEditButton.setControlCallback(L4_PitchEditButtonCB);

inline function L4_PitchEditButtonCB(control, value)
{
    PitchPanel4.showControl(value);
}

const var KeyRangePanel4 = Content.getComponent("L4_KEYRANGE");
const var L4_KeyRangeButton = Content.getComponent("L4_KeyRangeButton");
L4_KeyRangeButton.setControlCallback(L4_KeyRangeButtonCB);

inline function L4_KeyRangeButtonCB(control, value)
{
    KeyRangePanel4.showControl(value);
}

    // LAYER4 | instrument selection

const var LAYER4 = Synth.getChildSynth("LAYER4");
const var sampleMaps4 = Sampler.getSampleMapList();

const var LAYER4INSTRUMENT = Content.getComponent("LAYER4INSTRUMENT");
LAYER4INSTRUMENT.set("items", sampleMaps4.join("\n"));

inline function onLAYER4INSTRUMENTControl(component, value)
{
	LAYER4.asSampler().loadSampleMap(sampleMaps4[value-1]);
};

Content.getComponent("LAYER4INSTRUMENT").setControlCallback(onLAYER4INSTRUMENTControl);

     // L4 Pitch ratio setup;
const var L4Pitch = Synth.getModulator("L4_PITCH");

inline function onL4_PITCHControl(component, value)
{
	L4Pitch.setIntensity(value/2);	
};

Content.getComponent("L4_PITCH").setControlCallback(onL4_PITCHControl);
     
     
     // Filter ;

const var L4_Filter = Synth.getEffect("L4_Filter");

const var modes4 = {"1POLE LP": 9, "1POLE HP": 10, "SVF LP": 6, "SVF HP": 7, "BIQUAD LP": 0, "BIQUAD HP": 1, "BIQUAD LP REZ": 5, "MOOG LP": 8, "LADDER 4POLE": 15, "L-SHELF EQ": 2, "H-SHELF EQ": 3, "PEAK EQ": 4,  "ALLPASS": 14};

const var L4FilterSelect = Content.getComponent("L4FilterSelect");

L4FilterSelect.set("items", ""); //Clear list

for (k in modes1)
{
    L4FilterSelect.addItem(k); //Add mode name to list
}

inline function onL4FilterSelectControl(component, value)
{
    L4_Filter.setAttribute(L4_Filter.Mode, modes4[component.getItemText()]);
};

Content.getComponent("L4FilterSelect").setControlCallback(onL4FilterSelectControl);

//


function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 