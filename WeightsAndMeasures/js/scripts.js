/*Data*/ 

//Data for Weights and Measures
console.log(lengthArray);

//Load lengths in option selector
document.getElementById("lengthSelect").innerHTML=lengthArray.map(lengths=>`<option value="${lengths.value}">${lengths.name} (${lengths.abbreviation}) - ${lengths.inches} ${lengths.commonUnit}${lengths.inches!=1?"s":""}</option>`).join("");

//Load weights in option selector
document.getElementById("weightSelect").innerHTML=weightArray.map(weights=>`<option value="${weights.value}">${weights.name} (${weights.abbreviation}) - ${weights.grams} ${weights.commonUnit}${weights.grams!=1?"s":""}</option>`).join("");

//Load liquid volumes in option selector
document.getElementById("volumeLiquidSelect").innerHTML=volumeLiquidMeasuresArray.map(volumes=>`<option value="${volumes.value}">${volumes.name} (${volumes.abbreviation}) - ${volumes.liters} ${volumes.commonUnit}${volumes.liters!=1?"s":""}</option>`).join("");

//Load dry volumes in option selector
document.getElementById("volumeDrySelect").innerHTML=volumeDryMeasuresArray.map(volumes=>`<option value="${volumes.value}">${volumes.name} (${volumes.abbreviation}) - ${volumes.liters} ${volumes.commonUnit}${volumes.liters!=1?"s":""}</option>`).join("");

//Function to convert lengths
function convertLength(){
    let inputValue=document.getElementById("lengthInput").value;
    let fromValue=document.getElementById("lengthSelect").value;
    let toValue=document.getElementById("lengthConvertSelect").value;
    let result=(inputValue*fromValue)/toValue;
    document.getElementById("lengthResult").innerText=`${inputValue} ${document.getElementById("lengthSelect").selectedOptions[0].text.split(" - ")[0]} is equal to ${result.toFixed(2)} ${document.getElementById("lengthConvertSelect").selectedOptions[0].text.split(" - ")[0]}`;
};
