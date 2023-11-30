const options = {
  language: 'en'
};
//
// load the data from a local csv
//

const csvData = {
  events: [],
};

d3.csv('timeline-data.csv', (error, data) => {
  data.forEach((itemData) => {
        // reference for json format: https://timeline.knightlab.com/docs/json-format.html
        // inspired from https://github.com/NUKnightLab/TimelineJS3/blob/master/source/js/core/TL.ConfigFactory.js
    // console.log(itemData);
    const event = {
      start_date: 
      {
        month: itemData.startMonth || '',
        day: itemData.startDay || '',
        year: itemData.startYear || '',
      },
      end_date: 
      {
        month: itemData.endMonth || '',
        day: itemData.endDay || '',
        year: itemData.endYear || '',
      },
      // displayDate breaks the timeline
      // display_date: item_data.displayDate || '',
      media:
      {
        caption: itemData.mediaCaption || '',
        credit: itemData.mediaCredit || '',
        url: itemData.mediaUrl || '',
        thumbnail: itemData.mediaThumbnail || '',
      },
      text:
      {
        headline: itemData.headline || '',
        text: itemData.text || '',
      },
      background: {
        url: itemData.backgroundUrl || '',
        color: itemData.backgroundColor || '',
      },
    };

    if (itemData.type === 'title') {
      if (!csvData.title) {
        csvData.title = event;
      } else {
        console.log('Multiple title slides detected.');
        csvData.events.push(event);
      }
    } else {
      csvData.events.push(event);
    }
  });
  // console.log(csvData);
  const timeline = new TL.Timeline('timeline', csvData, options);
});
