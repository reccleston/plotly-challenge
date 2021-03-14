const dropdown = d3.select('#selDataset');
var lookupable_data;

function populateDropdown(data) {
    // Populate dropdown
    for (var i = 0; i < data.length; i++) {
        dropdown.append('option').attr('value', `${data[i].id}`).text(data[i].id);
    };
};


d3.json('samples.json').then(data => {
    // make h bar chart for top 1o otu_ids for a given individual 
    var data = data.samples;
    populateDropdown(data);
    
    var lookupable_data = {};
    data.forEach(pt => lookupable_data[pt.id] = pt);

    // make default bar chart
    var trace_bar = {
        type: 'bar',
        x: lookupable_data[940].sample_values.slice(0,10),
        y: lookupable_data[940].otu_ids.map(pt => 'OTU ' + pt).slice(0,10),
        orientation: 'h'
    }
    var data_to_plot = [trace_bar];
    Plotly.newPlot('bar', data_to_plot);

    //make default bubble chart 
    var trace_bubble = {
        x: lookupable_data[940].otu_ids,
        y: lookupable_data[940].sample_values,
        text: lookupable_data[940].otu_labels,
        mode: 'markers',
        marker: {
          color: lookupable_data[940].otu_ids,
          opacity: 0.4,
          size: lookupable_data[940].sample_values
        }
      };

      var data_to_plot = [trace_bubble];

      Plotly.newPlot('bubble', data_to_plot);

    // handling different subjects
    function handleTestSubjectData() {
        var subject_id = d3.select(this).node().value;
        var relevant_subject = lookupable_data[subject_id];

        // h bar
        var trace_bar = {
            type: 'bar',
            x: relevant_subject.sample_values.slice(0,10),
            y: relevant_subject.otu_ids.map(pt => 'OTU' + pt).slice(0,10),
            orientation: 'h'
        }

        var data_to_plot = [trace_bar];
        Plotly.newPlot('bar', data_to_plot);

        // bubble
        var trace_bubble = {
            x: relevant_subject.otu_ids,
            y: relevant_subject.sample_values,
            text: relevant_subject.otu_labels,
            mode: 'markers',
            marker: {
              color: relevant_subject.otu_ids,
              opacity: 0.6,
              size: relevant_subject.sample_values
            }
          };
    
          var data_to_plot = [trace_bubble];
    
          Plotly.newPlot('bubble', data_to_plot);
    };

    dropdown.on('change', handleTestSubjectData);

});


// input data to #selDataset
// listen for change on test subject ID 
//     send value to makeTrace
// make h bar from trace 