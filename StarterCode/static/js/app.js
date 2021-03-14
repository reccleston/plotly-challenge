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
    var trace = {
        type: 'bar',
        x: lookupable_data[940].sample_values.slice(0,10),
        y: lookupable_data[940].otu_ids.map(pt => 'OTU ' + pt).slice(0,10),
        orientation: 'h'
    }
    var data_to_plot = [trace];
    Plotly.newPlot('bar', data_to_plot);

    // handling different subjects
    function handleTestSubjectData() {
        // d3.event.preventDefault();
        var subject_id = d3.select(this).node().value;
        var relevant_subject = lookupable_data[subject_id];

        var trace = {
            type: 'bar',
            x: relevant_subject.sample_values.slice(0,10),
            y: relevant_subject.otu_ids.map(pt => 'OTU' + pt).slice(0,10),
            orientation: 'h'
        }

        var data_to_plot = [trace];
        Plotly.newPlot('bar', data_to_plot);
    };

    dropdown.on('change', handleTestSubjectData);

});


// input data to #selDataset
// listen for change on test subject ID 
//     send value to makeTrace
// make h bar from trace 