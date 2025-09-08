
//Data for Weights and Measures
//All values are in modern equivalents
//Length values are in inches
//Weight values are in grams
//Volume values are in liters

let lengthArray=[
    {no:1,name:"Fingerbreadth",abbreviation:"fb",value:0.73,inches:0.73,commonUnit:"inch"},
    {no:2,name:"Handbreadth",abbreviation:"hb",value:2.9,inches:2.9,commonUnit:"inch"},
    {no:3,name:"Span",abbreviation:"sp",value:8.75,inches:8.75,commonUnit:"inch"},
    {no:4,name:"Short Cubit",abbreviation:"c",value:15,inches:15,commonUnit:"inch"},
    {no:5, name:"Cubit",abbreviation:"c",value:17.5,inches:17.5,commonUnit:"inch"},
    {no:6,name:"Long Cubit",abbreviation:"c",value:20.4,inches:20.4,commonUnit:"inch"},
    {no:7,name:"Pace",abbreviation:"p",value:30,inches:30,commonUnit:"inch"},
    {no:8,name:"Fathom",abbreviation:"fa",value:72,inches:72,commonUnit:"inch"},
    {no:9,name:"Reed",abbreviation:"re",value:105,inches:105,commonUnit:"inch"},
    {no:10,name:"Long Reed",abbreviation:"lre",value:122.4,inches:122.4,commonUnit:"inch"},
    {no:11,name:"Roman Stadium",abbreviation:"rs",value:7283.4,inches:7283.4,commonUnit:"inch"}
];

let weightArray=[
    {no:1,name:"Gerah",abbreviation:"g",value:0.57,grams:0.57,commonUnit:"gram"},
    {no:2,name:"Bekah",abbreviation:"b",value:5.7,grams:5.7,commonUnit:"gram"},
    {no:3,name:"Pim",abbreviation:"p",value:7.8,grams:7.8,commonUnit:"gram"},
    {no:4,name:"Daric",abbreviation:"dr",value:8.4,grams:8.4,commonUnit:"gram"},
    {no:5,name:"Shekel",abbreviation:"s",value:11.4,grams:11.4,commonUnit:"gram"},
    {no:6,name:"Mina",abbreviation:"m",value:570,grams:570,commonUnit:"gram"},
    {no:7,name:"Talent",abbreviation:"t",value:34019,grams:34019,commonUnit:"gram"},
    {no:8,name:"Mina(Roman)",abbreviation:"mr",value:340,grams:340,commonUnit:"gram"},
    {no:9,name:"Pound (Roman)",abbreviation:"rp",value:327,grams:327,commonUnit:"gram"},
    {no:10,name:"Talent(Roman)",abbreviation:"tr",value:20400,grams:20400,commonUnit:"gram"}
];

let volumeLiquidMeasuresArray=[
    {no:1,name:"Log",abbreviation:"l",value:0.31,liters:0.31,commonUnit:"liter"},
    {no:2,name:"Hin",abbreviation:"h",value:3.67,liters:3.67,commonUnit:"liter"},
    {no:3,name:"Bath",abbreviation:"b",value:22,liters:22,commonUnit:"liter"},
    {no:4,name:"Cor",abbreviation:"Co",value:220,liters:220,commonUnit:"liter"},
];

let volumeDryMeasuresArray=[
    {no:1,name:"Quart",abbreviation:"ch",value:1.08,liters:1.08,commonUnit:"liter"},
    {no:2,name:"Cab",abbreviation:"c",value:1.22,liters:1.22,commonUnit:"liter"},
    {no:3,name:"Omer",abbreviation:"o",value:2.2,liters:2.2,commonUnit:"liter"},
    {no:4,name:"Seah",abbreviation:"s",value:7.33,liters:7.33,commonUnit:"liter"},
    {no:5,name:"Ephah",abbreviation:"e",value:22,liters:22,commonUnit:"liter"},
    {no:6,name:"Homer",abbreviation:"ho",value:220,liters:220,commonUnit:"liter"},
];

// Common modern length units (inches-based)
let commonLengthUnits = [
    { name: 'Inch', abbreviation: 'in', inches: 1, commonUnit: 'inch' },
    { name: 'Foot', abbreviation: 'ft', inches: 12, commonUnit: 'inch' },
    { name: 'Yard', abbreviation: 'yd', inches: 36, commonUnit: 'inch' },
    { name: 'Meter', abbreviation: 'm', inches: 39.3700787, commonUnit: 'meter' }
];

// Common modern weight units (grams-based)
let commonWeightUnits = [
    { name: 'Ounce', abbreviation: 'oz', grams: 28.349523125, commonUnit: 'ounce' },
    { name: 'Pound', abbreviation: 'lb', grams: 453.59237, commonUnit: 'pound' },
    { name: 'Kilogram', abbreviation: 'kg', grams: 1000, commonUnit: 'kilogram' }
];

// Common modern volume units (liters-based)
let commonVolumeUnits = [
    { name: 'Milliliter', abbreviation: 'mL', liters: 0.001, commonUnit: 'milliliter' },
    { name: 'Liter', abbreviation: 'L', liters: 1, commonUnit: 'liter' },
    { name: 'Cup', abbreviation: 'cup', liters: 0.2365882365, commonUnit: 'cup' },
    { name: 'Pint', abbreviation: 'pt', liters: 0.473176473, commonUnit: 'pint' },
    { name: 'Quart', abbreviation: 'qt', liters: 0.946352946, commonUnit: 'quart' },
    { name: 'Gallon', abbreviation: 'gal', liters: 3.785411784, commonUnit: 'gallon' }
];