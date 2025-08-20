# Personal Bible Projects

This repository collects four small interactive Bible study projects implemented in HTML, CSS and JavaScript. Each project is a small web app meant to explore genealogies, timelines, and maps that support Bible study.

Below is a short description of each project, the main technologies / libraries used, the most important files to inspect, and why each project is useful for studying the Bible.

---

## Projects

### 1) Family Tree
Description: A browsable family/genealogical viewer for Biblical names and persons. Cards, links and date ranges are generated dynamically by JavaScript.

Technologies / libraries:
- Plain HTML/CSS for layout and assets.
- Bootstrap-like card classes are used in the markup (see `card`, `card-body`, etc.), so the UI expects Bootstrap CSS or a compatible stylesheet.
- Custom JavaScript generates the DOM content and the interactive cards.

Key files:
- [FamilyTree/index.html](FamilyTree/index.html)
- [FamilyTree/css/styles.css](FamilyTree/css/styles.css)
- [FamilyTree/js/scripts.js](FamilyTree/js/scripts.js)

Why it helps study the Bible:
- Presents individuals and family links in a compact card format so you can quickly navigate persons, see date ranges, and follow genealogical relationships. Good for visualizing lineage and contextualizing biblical characters.

---

### 2) Google Timeline
Description: A timeline implementation built using Google timeline/charting approaches and timeline data sourced from files.

Technologies / libraries:
- Google Charts / Timeline API (typical for "GoogleTimeLine" implementations) — index page loads Google chart libraries and the app uses them to render timeline visuals.
- Plain HTML/CSS for layout.
- JavaScript that prepares and formats timeline data for the Google Charts API.

Key files:
- [GoogleTimeLine/index.html](GoogleTimeLine/index.html)
- [GoogleTimeLine/css/styles.css](GoogleTimeLine/css/styles.css)
- [GoogleTimeLine/js/scripts.js](GoogleTimeLine/js/scripts.js)
- [GoogleTimeLine/js/Data/testTimelineData.js](GoogleTimeLine/js/Data/testTimelineData.js)
- Raw data exports (Excel): [GoogleTimeLine/RawData/BibleGeneologyAndTimeLine.xlsx](GoogleTimeLine/RawData/BibleGeneologyAndTimeLine.xlsx) and [GoogleTimeLine/RawData/TestTimelineExport.xlsx](GoogleTimeLine/RawData/TestTimelineExport.xlsx)

Why it helps study the Bible:
- Timelines place events and writings in chronological context, helping you compare authorship dates, historical events, and the relative ordering of biblical material.

---

### 3) Map (Leaflet)
Description: Interactive map application for plotting Biblical places and related timeline/timeperiod data.

Technologies / libraries:
- Leaflet (lightweight JavaScript mapping library) for rendering maps and markers — see [Map/js/leaflet.js](Map/js/leaflet.js).
- Custom configuration and selectable object lists to control which objects are displayed on the map.
- CSS for map styling.

Key files:
- [Map/index.html](Map/index.html)
- [Map/css/leafletStyle.css](Map/css/leafletStyle.css)
- [Map/js/leaflet.js](Map/js/leaflet.js)
- [Map/js/ConfigurationFiles/SelectableObjectsList.js](Map/js/ConfigurationFiles/SelectableObjectsList.js)
- [Map/js/Data/](Map/js/Data/) (project data folder)

Why it helps study the Bible:
- Geographical context increases understanding of journeys, locations of events, and cultural/geopolitical relationships in biblical narratives.

---

### 4) VisJS Timeline
Description: A detailed, scrollable timeline implementation using the Vis.js timeline library and a large data set of dated events and publications.

Technologies / libraries:
- Vis.js Timeline library for client-side interactive timelines.
- JavaScript dataset file with many chronological entries to render in the Vis timeline.

Key files:
- [VisJSTimeLine/index.html](VisJSTimeLine/index.html)
- [VisJSTimeLine/css/styles.css](VisJSTimeLine/css/styles.css)
- [VisJSTimeLine/js/site.js](VisJSTimeLine/js/site.js)
- [VisJSTimeLine/js/timelineData.js](VisJSTimeLine/js/timelineData.js)

Why it helps study the Bible:
- Vis.js timelines can handle many events and ranges with grouping, making them ideal for exploring long historical spans (e.g., authorship dates, reigns, publication history) and drilling into details.

---

## How to open and run locally
- Open each project's index page in a browser (for example: [FamilyTree/index.html](FamilyTree/index.html), [GoogleTimeLine/index.html](GoogleTimeLine/index.html), [Map/index.html](Map/index.html), [VisJSTimeLine/index.html](VisJSTimeLine/index.html)).
- Some pages load external libraries (Google Charts, Vis.js, Leaflet). Ensure internet access for CDN-hosted libraries, or host those libraries locally (the repository already contains a local Leaflet file at [Map/js/leaflet.js](Map/js/leaflet.js) if needed).
- Data sources are in each project's js/Data folder (example: [GoogleTimeLine/js/Data/testTimelineData.js](GoogleTimeLine/js/Data/testTimelineData.js) and [VisJSTimeLine/js/timelineData.js](VisJSTimeLine/js/timelineData.js)).

---

## Notes for contributors
- scripts.js files contain most content-generation logic — inspect them to adapt display behavior or connect different data sources:
  - [`FamilyTree/js/scripts.js`](FamilyTree/js/scripts.js)
  - [`GoogleTimeLine/js/scripts.js`](GoogleTimeLine/js/scripts.js)
  - [`VisJSTimeLine/js/site.js`](VisJSTimeLine/js/site.js)
- Large timeline datasets (e.g., `timelineData.js`) are suitable to modularize into smaller imports if performance becomes an issue.

---

## License & attribution
This repository is a personal collection of Bible study web apps. Data sources (when from published materials) should be attributed per their original licenses when you reuse the content.

--- 

If you want, I can copy this content into the project README (overwrite current file) or produce separate README files inside each project folder.
