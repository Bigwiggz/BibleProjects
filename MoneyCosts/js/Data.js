//Bible Money Array

let weightsAndMoneyArray=[
    {no:1,name:"Gerah",abbreviation:"g",value:0.57,grams:0.57,commonUnit:"gram", daysWage:0.5, nation:"Jewish","metals":["Silver"],scripture:"Ezekiel 45:12",worth:"Half a Day Wage", cannon:"Hebrew Scriptures"},
    {no:2,name:"Bekah",abbreviation:"b",value:5.7,grams:5.7,commonUnit:"gram", daysWage:1.5, nation:"Jewish","metals":["Silver"],scripture:"Exodus 30:13",worth:"1 and a half Day Wage", cannon:"Hebrew Scriptures"},
    {no:3,name:"Pim",abbreviation:"p",value:7.8,grams:7.8,commonUnit:"gram", daysWage:2, nation:"Jewish","metals":["Silver"],scripture:"Exodus 30:13",worth:"2 Days Wage", cannon:"Hebrew Scriptures"},
    {no:4,name:"Daric",abbreviation:"dr",value:8.4,grams:8.4,commonUnit:"gram", daysWage:2.25, nation:"Persian","metals":["Gold"],scripture:"Esther 8:15",worth:"2 and a quarter Days Wage", cannon:"Hebrew Scriptures"},
    {no:5,name:"Shekel",abbreviation:"s",value:11.4,grams:11.4,commonUnit:"gram", daysWage:3, nation:"Jewish","metals":["Silver"],scripture:"Exodus 30:13",worth:"3 Days Wage", cannon:"Hebrew Scriptures"},
    {no:6,name:"Mina (Hebrew)",abbreviation:"m",value:570,grams:570,commonUnit:"gram", daysWage:150, nation:"Jewish","metals":["Silver"],scripture:"1 Kings 10:14",worth:"150 Days Wage", cannon:"Hebrew Scriptures"},
    {no:7,name:"Talent",abbreviation:"t",value:34019,grams:34019,commonUnit:"gram", daysWage:10000, nation:"Jewish","metals":["Silver"],scripture:"1 Kings 10:14",worth:"10,000 Days Wage (about 27 years)", cannon:"Hebrew Scriptures"},
    {no:8,name:"Pound (Perfumed Oil)",abbreviation:"rp",value:327,grams:327,commonUnit:"gram", daysWage:300, nation:"Jewish","metals":["None"],scripture:"John 12:3",worth:"300 Days Wage", cannon:"Hebrew Scriptures"},
    {no:9,name:"Lepton",abbreviation:"l",value:0.005,grams:0.005, commonUnit:"gram", daysWage:0.007813, nation:"Jewish","metals":["Bronze","Copper"],scripture:"Luke 21:2",worth:"1/128 of a Denarius", cannon:"Greek Scriptures"},
    {no:10,name:"Quadrans",abbreviation:"q",value:0.017,grams:0.017, commonUnit:"gram", daysWage:0.015625, nation:"Roman","metals":["Bronze","Copper"],scripture:"Matthew 5:26",worth:"1/64 of a Denarius", cannon:"Greek Scriptures"},
    {no:11,name:"Assarion",abbreviation:"a",value:0.240625, grams:0.34,commonUnit:"gram", daysWage:0.0625, nation:"Roman","metals":["Bronze","Copper"],scripture:"Matthew 10:29",worth:"1/16 of a Days Wage", cannon:"Greek Scriptures"},
    {no:12,name:"Prutah",abbreviation:"p",value:0.34,grams:0.34,commonUnit:"gram", daysWage:0.53125, nation:"Jewish","metals":["Bronze","Copper"],scripture:"None",worth:"1/8 of a Denarius", cannon:"Greek Scriptures"},
    {no:13,name:"Zuz",abbreviation:"z",value:3.85,grams:3.85,commonUnit:"gram", daysWage:1, nation:"Jewish","metals":["Silver"],scripture:"Luke 6:29",worth:"1 day's wage", cannon:"Greek Scriptures"},
    {no:14,name:"Drachma",abbreviation:"d",value:3.4,grams:3.4,commonUnit:"gram", daysWage:1, nation:"Greek","metals":["Silver"],scripture:"Luke 15:8",worth:"1 day's wage", cannon:"Greek Scriptures"},
    {no:15,name:"Denarius",abbreviation:"dn",value:3.85,grams:3.85,commonUnit:"gram", daysWage:1, nation:"Roman","metals":["Silver"],scripture:"Matthew 20:10", worth:"1 day's wage", cannon:"Greek Scriptures"},
    {no:16, name: "Didrachma", abbreviation: "dd", value: 6.8, grams: 6.8, commonUnit: "gram", daysWage: 2, nation: "Greek", metals: ["Silver"], scripture: "Matthew 17:24", worth: "2 day's wage", cannon:"Greek Scriptures" },
    {no:17,name:"Tetradrachma",abbreviation:"td",value:13.6,grams:13.6,commonUnit:"gram", daysWage:4, nation:"Greek","metals":["Silver"],scripture:"Matthew 17:27",worth:"4 day's wage", cannon:"Greek Scriptures"},
    {no:18, name:"Mina (Greek)", abbreviation: "mg", value: 340, grams: 340, commonUnit: "gram", daysWage: 100, nation: "Greek", metals: ["Silver"], scripture: "Luke 19:13", worth: "100 day's wage", cannon:"Greek Scriptures" },
    {no:19, name :"Talent (Greek)", abbreviation: "tg", value: 20400, grams: 20400, commonUnit: "gram", daysWage: 6000, nation: "Greek", metals: ["Silver"], scripture: "Matthew 18:24, Revelation 16:21", worth: "6000 day's wage (about 19 years)", cannon:"Greek Scriptures" },
];

// Common modern money units (grams-based)
let commonMoneyUnits = [
    { name: 'Gram', abbreviation: 'g', grams: 1, commonUnit: 'gram' },
    { name: 'Ounce', abbreviation: 'oz', grams: 28.3495, commonUnit: 'gram' },
    { name: 'Pound', abbreviation: 'lb', grams: 453.592, commonUnit: 'gram' },
    { name: 'Kilogram', abbreviation: 'kg', grams: 1000, commonUnit: 'gram' }
];

