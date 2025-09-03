/*This is the scripts page to run on Key Points Learned*/

//Load tabs as buttons and on hover show description
document.getElementById("tagButtons").innerHTML = tags.map(tag => `
    <button class="btn m-1" style="background-color:${tag.color}; color:${tag.fontColor}" onclick="filterByTag('${tag.name}')">${tag.name}</button>
    `).join('');

//Load select options for tags in the form
document.getElementById("tagsSelect").innerHTML = tags.map(tag => `
    <option value="${tag.name}">${tag.name}</option>
`).join('');    

//Load key points into the table
document.getElementById("keyPointsTableBody").innerHTML = keyPoints.map(point => `
    <tr>
        <td>${point.id}</td>
        <td><a href="${point.link}" target="_blank">${point.title}</a></td>
        <td>${point.scripture}</td>
        <td>${point.dateEntered.toLocaleDateString()}</td>
        <td>${point.tags.join(", ")}</td>
        <td>${point.description}</td>
        <td>${point.whatILearenedAboutJehovah}</td>
    <td>${point.howThisAffectsMyLife}</td>
    <td onclick="showKeyPointForEdit('${point.guid}')">✎</td>
    </tr>
`).join('');

// Function to filter key points by tag
function filterByTag(tag) {
    const filteredPoints = keyPoints.filter(point => point.tags.includes(tag));
    document.getElementById("keyPointsTableBody").innerHTML = filteredPoints.map(point => `
        <tr>
            <td>${point.id}</td>
            <td><a href="${point.link}" target="_blank">${point.title}</a></td>
            <td>${point.scripture}</td>
            <td>${point.dateEntered.toLocaleDateString()}</td>
            <td>${point.tags.join(", ")}</td>
            <td>${point.description}</td>
            <td>${point.whatILearenedAboutJehovah}</td>
            <td>${point.howThisAffectsMyLife}</td>
            <td onclick="showKeyPointForEdit('${point.guid}')">✎</td>
        </tr>
    `).join('');
};

// Function to show the edit modal with selected key point details
function showKeyPointForEdit(guid) {
    const selectedPoint = keyPoints.find(p => p.guid === guid);
    if (!selectedPoint) {
        console.warn('Key point not found for guid', guid);
        return;
    }
    document.getElementById("titleInput").value = selectedPoint.title;
    document.getElementById("scriptureInput").value = selectedPoint.scripture;
    document.getElementById("descriptionInput").value = selectedPoint.description;
    //take a string of tags and convert to array
    document.getElementById("tagsSelect").innerHTML = tags.map(tag => `
        <option value="${tag.name}" ${selectedPoint.tags.includes(tag.name) ? 'selected' : ''}>${tag.name}</option>
    `).join('');
    document.getElementById("whatILearnedAboutJehovahInput").value = selectedPoint.whatILearenedAboutJehovah;
    document.getElementById("howThisAffectsMyLifeInput").value = selectedPoint.howThisAffectsMyLife;
    document.getElementById("linkInput").value = selectedPoint.link;
    var editModal = new bootstrap.Modal(document.getElementById('dataModal'));
    editModal.show();
}

// When Save button is clicked, add a new key point to existing key points array
function saveorEditKeyPoint(guidValue) {
    if(guidValue!=="0000000-0000-0000-0000-000000000000"){
        // edit existing key point
        const selectedPoint = keyPoints.find(p => p.guid === guidValue);
        if (selectedPoint) {
            selectedPoint.title = document.getElementById("titleInput").value;
            selectedPoint.scripture = document.getElementById("scriptureInput").value;
            selectedPoint.description = document.getElementById("descriptionInput").value;
            selectedPoint.tags = document.getElementById("tagsSelect").value.split(",").map(tag => tag.trim());
            selectedPoint.whatILearenedAboutJehovah = document.getElementById("whatILeareedAboutJehovahInput").value;
            selectedPoint.howThisAffectsMyLife = document.getElementById("howThisAffectsMyLifeInput").value;
            selectedPoint.link = document.getElementById("linkInput").value;
        }
        // save updated key point to keyPoints array
        keyPoints = keyPoints.map(p => p.guid === guidValue ? selectedPoint : p);
    } 
    else {
        //save new key point
        const newKeyPoint = {
            id: keyPoints.length + 1,
            guid: crypto.randomUUID(),
            title: document.getElementById("titleInput").value,
            scripture: document.getElementById("scriptureInput").value,
            description: document.getElementById("descriptionInput").value,
            tags: document.getElementById("tagsSelect").value.split(",").map(tag => tag.trim()),
            dateEntered: new Date(),
            whatILearenedAboutJehovah: document.getElementById("whatILearnedAboutJehovahInput").value,
            howThisAffectsMyLife: document.getElementById("howThisAffectsMyLifeInput").value,
            link: document.getElementById("linkInput").value
        };
        keyPoints.push(newKeyPoint);
    };

    // Refresh the table
    document.getElementById("keyPointsTableBody").innerHTML = keyPoints.map(point => `
         <tr>
            <td>${point.id}</td>
            <td><a href="${point.link}" target="_blank">${point.title}</a></td>
            <td>${point.scripture}</td>
            <td>${point.dateEntered.toLocaleDateString()}</td>
            <td>${point.tags.join(", ")}</td>
            <td>${point.description}</td>
            <td>${point.whatILearenedAboutJehovah}</td>
            <td>${point.howThisAffectsMyLife}</td>
            <td onclick="showKeyPointForEdit('${point.guid}')">✎</td>
        </tr>
    `).join('');
    // Close the modal
    var myModal = new bootstrap.Modal(document.getElementById('dataModal'));
    myModal.hide();
    //save to local storage
    localStorage.setItem("keyPoints", JSON.stringify(keyPoints));
    //download the key points as a JSON file
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(keyPoints));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "keyPoints.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();    
    
    // Clear the form
    document.getElementById("addKeyPointForm").reset();
};
