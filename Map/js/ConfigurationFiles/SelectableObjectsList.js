//This file contains the list of periods and colors used in the application

//This is a list of preset periods for selection
let periodsList=[
    {PeriodNo: 1, PeriodName:"Preflood Era - 4025 BCE to 2370 BCE" , StartYear:-4025, EndYear:-2370, Description: "From creation to the flood"},
    {PeriodNo: 2, PeriodName:"Patriarch Era - 2370 BCE to 1711 BCE" , StartYear:-2370, EndYear:-1711, Description: "From the flood to the Exodus"},
    {PeriodNo: 3, PeriodName:"Early Israel - 1711 BCE to 1117 BCE" , StartYear:-1711, EndYear:-1117, Description: "From the Exodus to the establishment of the King Saul"},
    {PeriodNo: 4, PeriodName:"Era of the Kings - 1117 BCE to 607 BCE" , StartYear:-1117, EndYear:-607, Description: "From the establishment of the King Saul to the Babylonian captivity"},
    {PeriodNo: 5, PeriodName:"Post Kings Era - 607 BCE to 2 BCE" , StartYear:-607, EndYear:-2, Description: "From the Babylonian captivity to the birth of Jesus"},
    {PeriodNo: 6, PeriodName:"Jesus Epoch- 2 BCE- to 33 CE" , StartYear:-2, EndYear:33, Description: "From the birth of Jesus to his death"},
    {PeriodNo: 7, PeriodName:"Christian Congregation - 33 CE to 98 CE" , StartYear:33, EndYear:98, Description: "From the death of Jesus to the death of Apostle John"},
    {PeriodNo: 8, PeriodName:"Midevil Era - 98 CE to 1870 CE" , StartYear:98, EndYear:1870, Description: "From the death of Apostle John to the start of the Charles Taze Russell"},
    {PeriodNo: 9, PeriodName:"Modern Times - 1870 CE to Present" , StartYear:1870, EndYear:new Date().getFullYear(), Description: "From the start of Charles Taze Russell to the present day"}   
];

//This is a list of preset colors for selection
let colorsList=[
    {ObjectType: "Battle", Color: "#FF0000", Description: "Red for battles"},
    {ObjectType: "Prophet", Color: "#0000FF" , Description: "Blue for prophets"},
    {ObjectType: "King", Color: "#00FF00" , Description: "Green for kings"},
    {ObjectType: "Servant", Color: "#FFFF00", Description: "Yellow for servants"},
    {ObjectType: "Other", Color: "#FF00FF", Description: "Magenta for other"},
    {ObjectType: "Nation", Color: "#00FFFF", Description: "Cyan for nations"}
];