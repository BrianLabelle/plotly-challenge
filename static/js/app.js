function buildMetadata(sample) { 

  // @TODO: Complete the following function that builds the metadata panel
  
  // Use `d3.json` to fetch the metadata for a sample
            d3.json(`/metadata/${sample}`).then((data) => {
  
  // Use d3 to select the panel with id of `#sample-metadata`
            // HTML CODE : <div id="sample-metadata" class="panel-body"></div>
            let sampleMetadata = d3.select("#sample-metadata");
  
  // Use `.html("") to clear any existing metadata
            sampleMetadata.html("");
  
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
  
            // CODE REFERENCE:
            // https://javascript.info/keys-values-entries
  
            Object.entries(data).forEach(([key, value]) => {
            sampleMetadata.append("li").text(`${key}:${value}`);
          })
        })
  
  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
  
 }
  
  function buildCharts(sample) {
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  
        // CODE REFERENCE:
        // https://www.tutorialsteacher.com/d3js/loading-data-from-file-in-d3js
        // https://stackoverflow.com/questions/22325819/d3-js-get-json-from-url
  
        d3.json(`/samples/${sample}`).then((data) => {
  
  
  // @TODO: Build a Bubble Chart using the sample data
      
            // CODE REFERENCES: 
            // https://plot.ly/javascript/plotlyjs-function-reference/
            // https://plot.ly/javascript/bubble-charts/
  
          /* 
            Create a Bubble Chart that uses data from your samples route (/samples/<sample>) to display each sample.
             - Use otu_ids for the x values.           ( xValues )
             - Use sample_values for the y values.     ( yValues )
             - Use sample_values for the marker size.  ( markerSize )
             - Use otu_ids for the marker colors.      ( markerColours )
             - Use otu_labels for the text values.     ( textValues ) 
          */
  
          let xValues = data.otu_ids;
          let yValues = data.sample_values;
          let markerSize = data.sample_values;
          let markerColours = data.otu_ids;
          let textValues = data.otu_labels
  
  
            // https://plot.ly/javascript/bubble-charts/ ( Bubble Size Scaling on Charts )
            let dataBubble = [
            {
              x: xValues,
              y: yValues,
              text: textValues,
              mode: "markers",
              marker: {
                color: markerColours,
                opacity: [1, 0.8, 0.6, 0.4],
                size: markerSize,
              }
            }
            ];

  
            let layoutBubble = {
              title: 'Belly Button Biodiversity Dashboard | Bubble Chart',
              showlegend: true,
            };
  
            Plotly.newPlot("bubble", dataBubble, layoutBubble);
  
  // =============================================================================================================================
  
  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab... 
  // the top 10 sample_values ( pieValues ), 
  // (10 each) otu_ids ( pieValues ),
  // (10 each) labels ( pieValues ),
  
            /* 
            Create a PIE chart that uses data from your samples route (/samples/<sample>) to display the top 10 samples.
            
             - Use sample_values as the values for the PIE chart.   ( pieValues )
             - Use otu_ids as the labels for the pie chart.         ( pieLabels )
             - Use otu_labels as the hovertext for the chart.       ( pieHoverText )
            */
  
  
            // CODE REFERENCES:
            // https://www.w3schools.com/jsref/jsref_slice_array.asp
  
              let pieValues = data.sample_values;
              let pieLabels = data.otu_ids;
              let pieHoverText = data.otu_labels;


  
            // CODE REFERENCES: 
            // https://plot.ly/javascript/plotlyjs-function-reference/
            // https://plot.ly/javascript/pie-charts/ ( Pie Chart Subplots )
  
              let dataPie = [{
                values: pieValues.slice(0,10),
                labels: pieLabels.slice(0,10),
                type: 'pie',
                // name: 'ChartPie',
                /* marker: {
                  colors: ultimateColors[0]
                }, 
                 domain: {
                row: 0,
                  column: 0
                }, */
                hovertext: pieHoverText.slice(0,10),
                hoverinfo: "hovertext",
                //textinfo: 'none',
              }];

              let layoutPie = {
                margin: { t: 0, l: 0 }
              };
  
              Plotly.newPlot("pie", dataPie, layoutPie);
  
            });
          };
  
  
  
  // =============================================================================================================================
  
  function init() {
  // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
  // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();
  