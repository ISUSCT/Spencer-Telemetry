import React, { PureComponent } from 'react';
import GaugeChart from 'react-gauge-chart'
import MapChart from "./MapChart";
import "./App.css";
import {
  BarChart,
  PieChart,
  AreaChart,
  LineChart, 
  Pie,
  Area, 
  Line, 
  ReferenceLine, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
} from 'recharts';
import {
  cell_data,
  solar_panel_data
} from "./data/SolarCar";
import {
  CURRENT_LONG,
  CURRENT_LAT
} from "./MapChart.js";

// Separating the battery cell data into three rows of 12
const cell_data1 = cell_data.slice(0, 12);
const cell_data2 = cell_data.slice(12, 24);
const cell_data3 = cell_data.slice(24, 36);

// Additional constants needed to display mock demo data
let mph = 57;
let total_miles = 32876;
let rpm_value = 8;
let accerlation_percent = 0.76;
let rpm_percent = 0.95;
const chartStyle = {
  width: 275
}

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9kd8rssL/';

  render() {
    return (
      <body>
        <div style={{ textAlign: "center" }}>
        <h1><strong>ISU</strong> Solar Car Monitoring</h1>
          <div className="Row1">

            <div>
              <h2>{mph}</h2><small>mph</small>
              <h3>{total_miles} mi</h3>
            </div>

            <div>
              <h4>RPM x1000</h4>
              <GaugeChart id="gauge-chart2"
                style={chartStyle}
                nrOfLevels={20}
                percent={rpm_percent}
                formatTextValue={value => rpm_value + 'rpm'}
              />
              <h4>Driver Accerlation</h4>
              <GaugeChart id="gauge-chart1"
                style={chartStyle}
                percent={accerlation_percent}
              />
            </div>

            <div>
              <h4>Error Codes</h4>
              <div class="alert">
                <span class="closebtn" onClick="this.parentElement.style.display='none';">&times;</span>
                ERR069: over Amperage
              </div>
              <div class="alert">
                <span class="closebtn" onClick="this.parentElement.style.display='none';">&times;</span>
                ERR420: low voltage
              </div>
              <div class="warning">
                <span class="closebtn" onClick="this.parentElement.style.display='none';">&times;</span>
                ERR001: driver dead
              </div>
            </div>

            <div className="MapChart">
              <h4>Current Location: ({CURRENT_LONG}, {CURRENT_LAT})</h4>
              <MapChart />
            </div>

          </div>

          <div className="Row2">

            <div className="Batteries">
              <h4>Battery Voltage (V)</h4>
             <BarChart width={400} height={75} data={cell_data1}>
                <Bar dataKey="voltage" fill="#0e6b0e" />
                <Tooltip
                  labelFormatter={function(value) {
                  return `Cell ${value+1}`;
                  }}
                />
              </BarChart>
              <BarChart width={400} height={75} data={cell_data2}>
                <Bar dataKey="voltage" fill="#0e6b0e" />
                <Tooltip
                  labelFormatter={function(value) {
                  return `Cell ${value+12+1}`;
                  }}
                />
              </BarChart>
              <BarChart width={400} height={75} data={cell_data3}>
                <Bar dataKey="voltage" fill="#0e6b0e" />
                <Tooltip
                  labelFormatter={function(value) {
                  return `Cell ${value+24+1}`;
                  }}
                />
              </BarChart>
            </div>

          <div>
          <h4>Amperage Consumption</h4>
          <AreaChart width={500} height={200} data={cell_data} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
            <h1>Current</h1>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="voltage" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="voltage" stroke="#FCBB6D" fill="#FCBB6D" />
          </AreaChart>
          </div>
          
          <div>
            <h4>Solar Output (V)</h4>
            <BarChart width={500} height={300} data={solar_panel_data} margin={{top: 5, right: 30, left: 20, bottom: 5,}} barSize={20}>
              <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
              <YAxis /> 
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="pull" fill="#8884d8" background={{ fill: '#eee' }} />
            </BarChart>
          </div>

        </div>
      </div>
    </body>

    );
  }
}