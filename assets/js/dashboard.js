let projectList = "<option disabled selected value> -- select an option -- </option>";
// Chart y-axis range
let min1 = 0;
let max1 = 5;
let min4 = 0;
let max4 = 5;
$(document).ready(function(){
    // $.ajax({
    //     url: 'get_project_list.php',
    //     type: "POST",
    //     error: (e)=>{
    //         console.log(e);
    //     },
    //     success: (response)=>{
    //         response.forEach(item =>{ // Append the value and option name
    //             projectList += `<option value="${item.id}">${item.title}</option>`;
    //         });
    //         $('#project_selector').append(projectList).val(response[0].id);
            
    //     }
    // });
    $.ajax({
        url: 'get_project_details.php',
        type: "POST",
        error: (e)=>{
            console.log(e);
        },
        success: (res)=>{
            dasahboard_chart_1(res.customer_proj, res.customer_name);
            dasahboard_chart_2(res.technology_proj, res.technology_name);
            dasahboard_chart_3(res.project_est_cost, res.project_act_cost, res.project_name);
            dasahboard_chart_4(res.resource_proj, res.resource_name);
            dasahboard_chart_5(res.technology_con, res.technology_name_con);
            dasahboard_chart_6(res.resource_est_effort, res.resource_act_effort, res.resource_name_eff);

        }
    });

});

function dasahboard_chart_1(s1, ticks){
    $.jqplot.config.enablePlugins = true;
        plot1 = $.jqplot('chart_1', [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            title: "Customer vs. Projects",
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                rendererOptions: {
                    // Set the varyBarColor option to true to use different colors for each bar.
                    // The default series colors are used.
                    varyBarColor: true
                },
                pointLabels: { show: true },
                shadow: false,
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                    ticks: ticks,
                    label:'Customers',
                    tickOptions:{
                        showGridline: false,
                        angle: -30
                     }
                },
                yaxis:{
                    label:'No.of Projects',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    tickOptions:{
                        showGridline: false,
                        formatString: '%.0f'
                    },
                    min: 0,
                    max: getMax(s1)                
                }
            },
            grid: {
                // drawGridLines: true,        // wether to draw lines across the grid or not.
                // gridLineColor: '#cccccc',   // CSS color spec of the grid lines.
                background: '#ffffff',      // CSS color spec for background color of grid.
                borderColor: '#999999',     // CSS color spec for border around grid.
                borderWidth: 0.5,           // pixel width of border around grid.
                shadow: false,               // draw a shadow for grid.
                // shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
                // shadowOffset: 1.5,          // offset from the line of the shadow.
                // shadowWidth: 3,             // width of the stroke for the shadow.
                // shadowDepth: 3
            }, 
            highlighter: { show: false }
    });
}

function dasahboard_chart_2(s1, ticks){
    $.jqplot.config.enablePlugins = true;
        plot1 = $.jqplot('chart_2', [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            title: "Technology vs. Projects",
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                rendererOptions: {
                    // Set the varyBarColor option to true to use different colors for each bar.
                    // The default series colors are used.
                    varyBarColor: true
                },
                pointLabels: { show: true },
                shadow: false,
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                    ticks: ticks,
                    label:'Technology',
                    tickOptions:{
                        showGridline: false,
                        angle: -30
                     }
                },
                yaxis:{
                    label:'No.of Projects',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    tickOptions:{
                        showGridline: false,
                        formatString: '%.0f'
                    },
                    min: 0,
                    max: getMax(s1)                
                }
            },
            grid: {
                // drawGridLines: true,        // wether to draw lines across the grid or not.
                // gridLineColor: '#cccccc',   // CSS color spec of the grid lines.
                background: '#ffffff',      // CSS color spec for background color of grid.
                borderColor: '#999999',     // CSS color spec for border around grid.
                borderWidth: 0.5,           // pixel width of border around grid.
                shadow: false,               // draw a shadow for grid.
                // shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
                // shadowOffset: 1.5,          // offset from the line of the shadow.
                // shadowWidth: 3,             // width of the stroke for the shadow.
                // shadowDepth: 3
            }, 
            highlighter: { show: false }
    });
}

function dasahboard_chart_3(s1, s2, ticks){
    $.jqplot.config.enablePlugins = true;
        plot1 = $.jqplot('chart_3', [s1, s2], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            title: "Projects Costs (INR)",
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                // rendererOptions: {
                //     // Set the varyBarColor option to true to use different colors for each bar.
                //     // The default series colors are used.
                //     varyBarColor: true
                // },
                pointLabels: { show: false,  },
                shadow: false,
            },
            series:[
                {label:'Estimated Cost'},
                {label:'Actual Cost'}
            ],
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                    ticks: ticks,
                    label:'Project',
                    tickOptions:{
                        showGridline: false,
                        angle: -30
                     }
                },
                yaxis:{
                    label:'Cost',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    tickOptions:{
                        showGridline: false,
                        formatString: '%.2f'
                    },
                    min: 0,
                    max: Math.max(getMax(s1), getMax(s2))
                }
            },
            grid: {
                // drawGridLines: true,        // wether to draw lines across the grid or not.
                // gridLineColor: '#cccccc',   // CSS color spec of the grid lines.
                background: '#ffffff',      // CSS color spec for background color of grid.
                borderColor: '#999999',     // CSS color spec for border around grid.
                borderWidth: 0.5,           // pixel width of border around grid.
                shadow: false,               // draw a shadow for grid.
                // shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
                // shadowOffset: 1.5,          // offset from the line of the shadow.
                // shadowWidth: 3,             // width of the stroke for the shadow.
                // shadowDepth: 3
            }, 
            legend: {
                show: true,
                location: 'e',
                placement: 'inside'
            },
            highlighter: { 
                show: true, 
                useAxesFormatters: false,
                tooltipFormatString: '%s'
            }
    });
}

function dasahboard_chart_4(s1, ticks){
    $.jqplot.config.enablePlugins = true;
        plot1 = $.jqplot('chart_4', [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            title: "Consultant vs. Projects",
            seriesDefaults:{
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    // Set the varyBarColor option to true to use different colors for each bar.
                    // The default series colors are used.
                    varyBarColor: true
                },
                pointLabels: { show: true },
                shadow: false,
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                    ticks: ticks,
                    label:'Consultants',
                    tickOptions:{
                        showGridline: false,
                        angle: -30
                     }
                },
                yaxis:{
                    label:'No.of Projects',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    tickOptions:{
                        showGridline: false,
                        formatString: '%.0f'
                    },    
                    min:0,
                    max:getMax(s1)                    
                }
            },
            grid: {
                // drawGridLines: true,        // wether to draw lines across the grid or not.
                // gridLineColor: '#cccccc',   // CSS color spec of the grid lines.
                background: '#ffffff',      // CSS color spec for background color of grid.
                borderColor: '#999999',     // CSS color spec for border around grid.
                borderWidth: 0.5,           // pixel width of border around grid.
                shadow: false,               // draw a shadow for grid.
                // shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
                // shadowOffset: 1.5,          // offset from the line of the shadow.
                // shadowWidth: 3,             // width of the stroke for the shadow.
                // shadowDepth: 3
            }, 
            highlighter: { show: false }
    });
}

function dasahboard_chart_5(s1, ticks){
    $.jqplot.config.enablePlugins = true;
        plot1 = $.jqplot('chart_5', [s1], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            title: "Consultants vs. Technology",
            seriesDefaults:{
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    // Set the varyBarColor option to true to use different colors for each bar.
                    // The default series colors are used.
                    varyBarColor: true
                },
                pointLabels: { show: true },
                shadow: false,
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                    ticks: ticks,
                    label:'Technology',
                    tickOptions:{
                        showGridline: false,
                        angle: -30
                     }
                },
                yaxis:{
                    label:'No.of Consultants',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    tickOptions:{
                        showGridline: false,
                        formatString: '%.0f'
                    },    
                    min:0,
                    max:getMax(s1)                    
                }
            },
            grid: {
                // drawGridLines: true,        // wether to draw lines across the grid or not.
                // gridLineColor: '#cccccc',   // CSS color spec of the grid lines.
                background: '#ffffff',      // CSS color spec for background color of grid.
                borderColor: '#999999',     // CSS color spec for border around grid.
                borderWidth: 0.5,           // pixel width of border around grid.
                shadow: false,               // draw a shadow for grid.
                // shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
                // shadowOffset: 1.5,          // offset from the line of the shadow.
                // shadowWidth: 3,             // width of the stroke for the shadow.
                // shadowDepth: 3
            }, 
            highlighter: { show: false }
    });
}

function dasahboard_chart_6(s1, s2, ticks){
    $.jqplot.config.enablePlugins = true;
        plot1 = $.jqplot('chart_6', [s1, s2], {
            // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
            animate: !$.jqplot.use_excanvas,
            title: "Consultants Efforts(hours)",
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                // rendererOptions: {
                //     // Set the varyBarColor option to true to use different colors for each bar.
                //     // The default series colors are used.
                //     varyBarColor: true
                // },
                pointLabels: { show: false,  },
                shadow: false,
            },
            series:[
                {label:'Estimated Effort'},
                {label:'Actual Effort'}
            ],
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                    ticks: ticks,
                    label:'Consultants',
                    tickOptions:{
                        showGridline: false,
                        angle: -30
                     }
                },
                yaxis:{
                    label:'Effort',
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    tickOptions:{
                        showGridline: false,
                        formatString: '%.0f'
                    },
                    min: 0,
                    max: Math.max(getMax(s1), getMax(s2))
                }
            },
            grid: {
                // drawGridLines: true,        // wether to draw lines across the grid or not.
                // gridLineColor: '#cccccc',   // CSS color spec of the grid lines.
                background: '#ffffff',      // CSS color spec for background color of grid.
                borderColor: '#999999',     // CSS color spec for border around grid.
                borderWidth: 0.5,           // pixel width of border around grid.
                shadow: false,               // draw a shadow for grid.
                // shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
                // shadowOffset: 1.5,          // offset from the line of the shadow.
                // shadowWidth: 3,             // width of the stroke for the shadow.
                // shadowDepth: 3
            }, 
            legend: {
                show: true,
                location: 'e',
                placement: 'inside'
            },
            highlighter: { 
                show: true, 
                useAxesFormatters: false,
                tooltipFormatString: '%s'
            }
    });
}


function getMax(l) {
    let m = -1;
    l.forEach(item=>{
        if (item > m) m = item;
    });
    return Math.ceil(Number(m)*2);
}

/* 
labelOptions: {
                        // fontFamily: 'Georgia, Serif',
                        // fontSize: '12pt'
                    }
*/