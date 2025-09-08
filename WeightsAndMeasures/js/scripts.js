/*Data*/ 

//Load lengths in option selector
document.getElementById("lengthSelect").innerHTML=lengthArray.map(lengths=>`<option value="${lengths.value}">${lengths.name} (${lengths.abbreviation}) - ${lengths.inches} ${lengths.commonUnit}${lengths.inches!=1?"s":""}</option>`).join("");

//Load weights in option selector
document.getElementById("weightSelect").innerHTML=weightArray.map(weights=>`<option value="${weights.value}">${weights.name} (${weights.abbreviation}) - ${weights.grams} ${weights.commonUnit}${weights.grams!=1?"s":""}</option>`).join("");

//Load liquid volumes in option selector
document.getElementById("volumeLiquidSelect").innerHTML=volumeLiquidMeasuresArray.map(volumes=>`<option value="${volumes.value}">${volumes.name} (${volumes.abbreviation}) - ${volumes.liters} ${volumes.commonUnit}${volumes.liters!=1?"s":""}</option>`).join("");

//Load dry volumes in option selector
document.getElementById("volumeDrySelect").innerHTML=volumeDryMeasuresArray.map(volumes=>`<option value="${volumes.value}">${volumes.name} (${volumes.abbreviation}) - ${volumes.liters} ${volumes.commonUnit}${volumes.liters!=1?"s":""}</option>`).join("");

//Function to convert lengths and show result below the form
function convertLength(){
    //Get the input value and selected type from the form
    let lengthInput=document.getElementById("lengthInput").value;
    let lengthType=document.getElementById("lengthSelect").value;   
    // coerce selected type to number (select returns string)
    lengthType = parseFloat(lengthType);
    if (Number.isNaN(lengthType)){
        document.getElementById("lengthResults").innerHTML = `<div class="alert alert-warning">Please select a valid length unit.</div>`;
        return;
    }
    // coerce to number
    lengthInput = parseFloat(lengthInput);
    if (Number.isNaN(lengthInput)){
        document.getElementById("lengthResults").innerHTML = `<div class="alert alert-warning">Please enter a valid number for length.</div>`;
        return;
    }
    //Find the selected type in the array
    let lengthObject=lengthArray.find(lengths=>lengths.value===lengthType);
    //Convert the input value to inches
    let lengthInches=lengthInput*lengthObject.inches;
    //Convert the inches to all other types
    let lengthResults=lengthArray.map(lengths=>({
        name:lengths.name,
        abbreviation:lengths.abbreviation,
        value:(lengthInches/lengths.inches).toFixed(4),
        commonUnit:lengths.commonUnit
    }));    
    //Show the results below the form
    document.getElementById("lengthResults").innerHTML=`
        <h3>Length Conversion Results</h3>  
        <table class="table table-striped">
            <thead>
                <tr>    
                    <th scope="col">Unit</th>
                    <th scope="col">Abbreviation</th>
                    <th scope="col">Value</th>
                </tr>   
            </thead>
            <tbody>
                ${lengthResults.map(result=>`   
                    <tr>
                        <td>${result.name}</td>
                        <td>${result.abbreviation}</td>
                        <td>${result.value} ${result.commonUnit}${result.value!=1?"s":""}</td>
                    </tr>   
                `).join("")}    
            </tbody>
        </table>    
    `;    
    // Also show common modern units (in, ft, yd, m)
    const commonResults = commonLengthUnits.map(u => ({
        name: u.name,
        abbr: u.abbreviation,
        value: (lengthInches / u.inches).toFixed(4),
        unit: u.commonUnit
    }));
    document.getElementById("lengthResults").innerHTML += `
        <h4>Common Units</h4>
        <ul class="list-group list-group-flush mb-3">
            ${commonResults.map(r => `<li class="list-group-item">${r.name} (${r.abbr}): ${r.value} ${r.unit}${r.value!=1?"s":""}</li>`).join('')}
        </ul>
    `;
};

//Function to convert weights and show result below the form
function convertWeight(){
    //Get the input value and selected type from the form
    let weightInput=document.getElementById("weightInput").value;
    let weightType=document.getElementById("weightSelect").value;
    // coerce selected type to number
    weightType = parseFloat(weightType);
    if (Number.isNaN(weightType)){
        document.getElementById("weightResults").innerHTML = `<div class="alert alert-warning">Please select a valid weight unit.</div>`;
        return;
    }
    weightInput = parseFloat(weightInput);
    if (Number.isNaN(weightInput)){
        document.getElementById("weightResults").innerHTML = `<div class="alert alert-warning">Please enter a valid number for weight.</div>`;
        return;
    }
    //Find the selected type in the array
    let weightObject=weightArray.find(weights=>weights.value===weightType);
    //Convert the input value to grams
    let weightGrams=weightInput*weightObject.grams;
    //Convert the grams to all other types
    let weightResults=weightArray.map(weights=>({
        name:weights.name,
        abbreviation:weights.abbreviation,
        value:(weightGrams/weights.grams).toFixed(4),
        commonUnit:weights.commonUnit
    }));
    //Show the results below the form
    document.getElementById("weightResults").innerHTML=`
        <h3>Weight Conversion Results</h3>  
        <table class="table table-striped"> 
            <thead>
                <tr>    
                    <th scope="col">Unit</th>
                    <th scope="col">Abbreviation</th>
                    <th scope="col">Value</th>
                </tr>   
            </thead>
            <tbody>
                ${weightResults.map(result=>`
                    <tr>
                        <td>${result.name}</td>
                        <td>${result.abbreviation}</td>
                        <td>${result.value} ${result.commonUnit}${result.value!=1?"s":""}</td>
                    </tr>   
                `).join("")}    
            </tbody>
        </table>    
    `;    
    // Also show common modern weight units (oz, lb, kg)
    const commonW = commonWeightUnits.map(u => ({
        name: u.name,
        abbr: u.abbreviation,
        value: (weightGrams / u.grams).toFixed(4),
        unit: u.commonUnit
    }));
    document.getElementById("weightResults").innerHTML += `
        <h4>Common Units</h4>
        <ul class="list-group list-group-flush mb-3">
            ${commonW.map(r => `<li class="list-group-item">${r.name} (${r.abbr}): ${r.value} ${r.unit}${r.value!=1?"s":""}</li>`).join('')}
        </ul>
    `;
}
//Function to convert liquid volumes and show result below the form
function convertVolumeLiquid(){
    //Get the input value and selected type from the form   
    let volumeInput=document.getElementById("volumeLiquidInput").value;
    let volumeType=document.getElementById("volumeLiquidSelect").value;     
    // coerce selected type to number
    volumeType = parseFloat(volumeType);
    if (Number.isNaN(volumeType)){
        document.getElementById("volumeLiquidResults").innerHTML = `<div class="alert alert-warning">Please select a valid liquid volume unit.</div>`;
        return;
    }
    volumeInput = parseFloat(volumeInput);
    if (Number.isNaN(volumeInput)){
        document.getElementById("volumeLiquidResults").innerHTML = `<div class="alert alert-warning">Please enter a valid number for volume.</div>`;
        return;
    }
    //Find the selected type in the array
    let volumeObject=volumeLiquidMeasuresArray.find(volumes=>volumes.value===volumeType);
    //Convert the input value to liters
    let volumeLiters=volumeInput*volumeObject.liters;
    //Convert the liters to all other types
    let volumeResults=volumeLiquidMeasuresArray.map(volumes=>({
        name:volumes.name,
        abbreviation:volumes.abbreviation,
        value:(volumeLiters/volumes.liters).toFixed(4),
        commonUnit:volumes.commonUnit
    }));
    //Show the results below the form
    document.getElementById("volumeLiquidResults").innerHTML=`
        <h3>Liquid Volume Conversion Results</h3>
        <table class="table table-striped"> 
            <thead>
                <tr>    
                    <th scope="col">Unit</th>
                    <th scope="col">Abbreviation</th>
                    <th scope="col">Value</th>
                </tr>   
            </thead>
            <tbody>
                ${volumeResults.map(result=>`
                    <tr>
                        <td>${result.name}</td>
                        <td>${result.abbreviation}</td>
                        <td>${result.value} ${result.commonUnit}${result.value!=1?"s":""}</td>
                    </tr>   
                `).join("")}    
            </tbody>
        </table>    
    `;    
    // Also show common volume units
    const commonVol = commonVolumeUnits.map(u => ({
        name: u.name,
        abbr: u.abbreviation,
        value: (volumeLiters / u.liters).toFixed(4),
        unit: u.commonUnit
    }));
    document.getElementById("volumeLiquidResults").innerHTML += `
        <h4>Common Units</h4>
        <ul class="list-group list-group-flush mb-3">
            ${commonVol.map(r => `<li class="list-group-item">${r.name} (${r.abbr}): ${r.value} ${r.unit}${r.value!=1?"s":""}</li>`).join('')}
        </ul>
    `;
}
//Function to convert dry volumes and show result below the form
function convertVolumeDry(){    
    //Get the input value and selected type from the form
    let volumeInput=document.getElementById("volumeDryInput").value;
    let volumeType=document.getElementById("volumeDrySelect").value;
    // coerce selected type to number
    volumeType = parseFloat(volumeType);
    if (Number.isNaN(volumeType)){
        document.getElementById("volumeDryResults").innerHTML = `<div class="alert alert-warning">Please select a valid dry volume unit.</div>`;
        return;
    }
    volumeInput = parseFloat(volumeInput);
    if (Number.isNaN(volumeInput)){
        document.getElementById("volumeDryResults").innerHTML = `<div class="alert alert-warning">Please enter a valid number for dry volume.</div>`;
        return;
    }
    //Find the selected type in the array
    let volumeObject=volumeDryMeasuresArray.find(volumes=>volumes.value===volumeType);
    //Convert the input value to liters 
    let volumeLiters=volumeInput*volumeObject.liters;
    //Convert the liters to all other types
    let volumeResults=volumeDryMeasuresArray.map(volumes=>({    
        name:volumes.name,
        abbreviation:volumes.abbreviation,
        value:(volumeLiters/volumes.liters).toFixed(4),
        commonUnit:volumes.commonUnit
    }));
    //Show the results below the form
    document.getElementById("volumeDryResults").innerHTML=`
        <h3>Dry Volume Conversion Results</h3>
        <table class="table table-striped"> 
            <thead>
                <tr>    
                    <th scope="col">Unit</th>
                    <th scope="col">Abbreviation</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                ${volumeResults.map(result=>`
                    <tr>
                        <td>${result.name}</td>     
                        <td>${result.abbreviation}</td>
                        <td>${result.value} ${result.commonUnit}${result.value!=1?"s":""}</td>
                    </tr>
                `).join("")}    
            </tbody>
        </table>    
    `;    
    // Also show common volume units for dry conversion
    const commonVolDry = commonVolumeUnits.map(u => ({
        name: u.name,
        abbr: u.abbreviation,
        value: (volumeLiters / u.liters).toFixed(4),
        unit: u.commonUnit
    }));
    document.getElementById("volumeDryResults").innerHTML += `
        <h4>Common Units</h4>
        <ul class="list-group list-group-flush mb-3">
            ${commonVolDry.map(r => `<li class="list-group-item">${r.name} (${r.abbr}): ${r.value} ${r.unit}${r.value!=1?"s":""}</li>`).join('')}
        </ul>
    `;
}   

/*Event Listeners*/
//Add event listener to the length convert button
document.getElementById("lengthConvertButton").addEventListener("click",convertLength);

//Add event listener to the weight convert button
document.getElementById("weightConvertButton").addEventListener("click",convertWeight);

//Add event listener to the liquid volume convert button
document.getElementById("volumeLiquidConvertButton").addEventListener("click",convertVolumeLiquid);

//Add event listener to the dry volume convert button
document.getElementById("volumeDryConvertButton").addEventListener("click",convertVolumeDry);


