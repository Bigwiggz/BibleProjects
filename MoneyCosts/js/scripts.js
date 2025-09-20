

//Load money in option selector
document.getElementById("moneySelect").innerHTML=weightsAndMoneyArray.map(weights=>`<option value="${weights.value}">${weights.name} (${weights.abbreviation}) - ${weights.grams} ${weights.commonUnit}${weights.grams!=1?"s":""}</option>`).join("");

//Days wage input default to 150
let currentDaysWage=document.getElementById("daysWageInput").value;

//Add a function that uses a free api that gets the current price of gold and silver per pound

async function fetchMetalPrices() {
    const apiKey = "V02XMJBKC34G5M2FBLP04402FBLP0"; // get from https://metals.dev
    const endpoint = `https://api.metals.dev/v1/latest?api_key=${apiKey}&currency=USD&metal=gold,silver,copper`;

    const response = await fetch(endpoint);
    if (!response.ok) {
        return {
            gold:2000,
            silver:25,
            copper:4
        };
        //throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.metals) {
        //throw new Error("Unexpected API response format");
        return {
            gold:2000,
            silver:25,
            copper:4
        };
    }

    // Conversion constants
    // 1 lb = 453.59237 grams
    // 1 troy oz = 31.1035 grams
    // 1 lb = 453.59237 / 31.1035 ≈ 14.5833 troy oz
    const TROY_OZ_PER_POUND = 14.5833;

    const goldPerPound = data.metals.gold * TROY_OZ_PER_POUND;
    const silverPerPound = data.metals.silver * TROY_OZ_PER_POUND;
    const copperPerPound = data.metals.copper * TROY_OZ_PER_POUND;

    return {
        gold: goldPerPound,
        silver: silverPerPound,
        copper: copperPerPound,
    };
};

function runCalculateMonetaryValue(){
    //For this example, we'll use static values. You can replace these with API calls to get real-time data.
    let goldPricePerPound=2000; // Example static value for gold price per pound in USD
    let silverPricePerPound=25; // Example static value for silver price per pound in USD
    let copperPricePerPound=4; // Example static value for copper price per pound in USD
    
    let prices=fetchMetalPrices();
    
    if(prices){
        goldPricePerPound=prices.goldPerPound;
        silverPricePerPound=prices.silverPerPound;
        copperPricePerPound=prices.copperPerPound;
    }
    calculateMoneyValue(goldPricePerPound, silverPricePerPound);
};




//Add a function that  calculates the value of the selected money in pounds of gold using the current price of gold per pound, pounds of silver given the current price of silver per pound, and the value in modern US dollars based on the price of silver per ounce.
//Also add in the costs of a day's wage in modern US dollars based on the a days wage variable
function calculateMoneyValue(goldPricePerPound, silverPricePerPound){
    let selectedMoney=document.getElementById("moneySelect").value;
    let amount=document.getElementById("moneyInput").value;
    let selectedMoneyData=weightsAndMoneyArray.find(money=>money.value==selectedMoney);
    if(!selectedMoneyData || amount<=0 || goldPricePerPound<=0 || silverPricePerPound<=0){
        document.getElementById("result").innerHTML="Please enter valid values.";
        return;
    }
    let totalGrams=selectedMoneyData.grams*amount;
    let totalPounds=totalGrams/453.592;
    let goldValue=0;
    let silverValue=0;  
    if(selectedMoneyData.metals.includes("Gold")){
        goldValue=totalPounds*goldPricePerPound;
    }
    if(selectedMoneyData.metals.includes("Silver")){
        silverValue=totalPounds*silverPricePerPound;
    }
    let totalValue=goldValue+silverValue;
    document.getElementById("moneyResults").innerHTML=`
        <p>Total Weight: ${totalGrams.toFixed(2)} grams (${totalPounds.toFixed(4)} pounds)</p>
        <p>Value in Gold: $${goldValue.toFixed(2)}</p>
        <p>Value in Silver: $${silverValue.toFixed(2)}</p>
        <p><strong>Total Value: $${totalValue.toFixed(2)}</strong></p>
        <p>Based on a current day's wage of $${currentDaysWage}, this is equivalent to ${(totalValue/currentDaysWage).toFixed(2)} days' wages.</p>
        <P>Based on a current day' wage of $${currentDaysWage}, a ${selectedMoneyData.name} (${selectedMoneyData.abbreviation}) is worth ${(selectedMoneyData.daysWage*currentDaysWage).toFixed(2)} USD (${selectedMoneyData.daysWage} days' wages).</P>
        <h5>Additional Information:</h5>
        <p>Scripture Reference: ${selectedMoneyData.scripture ? selectedMoneyData.scripture : "N/A"}</p>
        <p>Nation: ${selectedMoneyData.nation}</p>
        <p>Metal(s): ${selectedMoneyData.metals.join(", ")}</p>
        <p>Worth: ${selectedMoneyData.worth}</p>
        <p>Cannon Section: ${selectedMoneyData.cannon}</p>
    `;
}

//when the button is clicked, fetch the current prices and calculate the value and display the result
document.getElementById("moneyConvertButton").addEventListener("click", function(){
    currentDaysWage=document.getElementById("daysWageInput").value;
    runCalculateMonetaryValue();
}); 



