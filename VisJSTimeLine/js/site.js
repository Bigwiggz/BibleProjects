 // DOM element where the Timeline will be attached
 var container = document.getElementById('visualization');

 
 /*LOAD DATASET*/
 let cleanedData = cleanDataSet(timelineData); // Clean the dataset before passing it to DataSet
 console.log(cleanedData); // Log the cleaned data for debugging
 var items = new vis.DataSet(cleanedData);


/*GROUPS FOR TIMELINE*/
 var groups = [
  {
    id: 1,
    content: 'Jesus Lineage'
  },
  {
    id: 2,
    content: 'Kings of Isreal'
  },
  {
    id: 3,
    content: 'Egyptian Empire'
  },
  {
    id: 4,
    content: 'Assyrian Empire'
  },
  {
    id: 5,
    content: 'Babylonian Empire'
  },
  {
    id: 6,
    content: 'Medo-Persian Empire'
  },
  {
    id: 7,
    content: 'Grecian Empire'
  },
  {
    id: 8,
    content: 'Roman Empire'
  },
  {
    id: 9,
    content: 'Bible Books'
  },
  {
    id: 10,
    content: 'Prophets'
  },
  {
    id: 100,
    content: 'General'
  }
];


 /*CONFIGURATION OPTIONS FOR TIMELINE*/
 var options = {
  //Window Size
  width: '100%',
  margin: {
    item: 20
  },
  //Zooming and scrolling options
  horizontalScroll: true,
  zoomKey: 'ctrlKey',
  //Order
  order: function(a, b) {
    return a.id - b.id; // Keeps items in the order they were added
  },
  //Date Range Limits
    min: new Date(-4100, 0, 1),  // Lower limit (January 1, 2025)
    max: new Date(), // Upper limit (December 31, 2025)
  //Date Axis Formmatting
  };

/*ON HOOVER CHANGES*/
container.addEventListener('mouseover', function (event) {
  var properties = timeline.getEventProperties(event);
  if (properties.item) {
    items.update({ id: properties.item, className: 'hovered' });
  }
});

container.addEventListener('mouseout', function (event) {
  var properties = timeline.getEventProperties(event);
  if (properties.item) {
    items.update({ id: properties.item, className: 'default' });
  }
});


 // Create a Timeline
 var timeline = new vis.Timeline(container, items,groups, options);

 /*TOGGLE GROUPS*/
let hiddenGroups = {}; // Track hidden groups

function toggleGroup(groupId, button) {
  hiddenGroups[groupId] = !hiddenGroups[groupId]; 
  timeline.setItems(items.get({ filter: item => !hiddenGroups[item.group] }));
  
  // Toggle button color by adding/removing a CSS class
  button.classList.toggle("toggled");
};

/*CLEAN DATASET*/
function parseCustomDate(dateString) {
  let year, month, day;

  if (dateString.startsWith("-")) {
      // BCE year handling (strip '-' and parse properly)
      let parts = dateString.slice(1).split("-");
      year = -parseInt(parts[0]); // Convert year to negative for BCE
      month = parseInt(parts[1]) - 1; // JavaScript months are zero-based
      day = parseInt(parts[2]);
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      // Four-digit year format (YYYY-MM-DD)
      [year, month, day] = dateString.split("-").map(Number);
      month -= 1; // Adjust for zero-based months
  } else if (/^\d{3}-\d{2}-\d{2}$/.test(dateString)) {
    // Three-digit year format (YYY-MM-DD) - assume CE (Year 200 CE)
    let parts = dateString.split("-");
    year = parseInt(parts[0]); // Keep it as is (for 200 CE)
    month = parseInt(parts[1]) - 1;
    day = parseInt(parts[2]);
  } else if (/^\d{2}-\d{2}-\d{2}$/.test(dateString)) {
      // Two-digit year format (YY-MM-DD) - assume CE (Year 20 CE)
      let parts = dateString.split("-");
      year = parseInt(parts[0]); // Keep it as is (for 20 CE)
      month = parseInt(parts[1]) - 1;
      day = parseInt(parts[2]);
  } else if (/^\d{1}-\d{2}-\d{2}$/.test(dateString)) {
    // One-digit year format (Y-MM-DD) - assume CE (Year 2 CE)
    let parts = dateString.split("-");
    year = parseInt(parts[0]); // Keep it as is (for 2 CE)
    month = parseInt(parts[1]) - 1;
    day = parseInt(parts[2]);
}else {
      throw new Error("Invalid date format: " + dateString);
  }

  // Create Date object
  let date = new Date(0); // Initialize at Unix epoch
  date.setFullYear(year, month, day);

  return date;
};

function cleanDataSet(data) {
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    // Remove any properties that are not needed
   if(item.hasOwnProperty("start")){
    item.start = parseCustomDate(item.start); // Parse the start date
   }
   if(item.hasOwnProperty("end")){
    item.end = parseCustomDate(item.end); // Parse the end date
   }
    // Add any other cleaning logic here as needed
  }
  return data;
 };