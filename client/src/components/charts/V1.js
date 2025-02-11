import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import { useState } from "react";
import axios from "axios";

export default function V1() {
    const [globalA, setGlobalA] = useState("");
    const [globalM, setGlobalM] = useState("");
    const [northA, setNorthA] = useState("");
    const [northM, setNorthM] = useState("");
    const [southA, setSouthA] = useState("");
    const [southM, setSouthM] = useState("");
    const [v2, setv2] = useState("");

    const URL = process.env.REACT_APP_API_ADDRESS + '/'

    // Hakee tiedot tietokannasta
    const getGlobalData = () => {
        axios.get(`${URL}global`)
            .then((response) => {
                setGlobalA(response.data);
            }).catch(error =>
                console.error(`Error: ${error}`));
    }

    const getGlobalMonthlyData = () => {
        axios.get(`${URL}globalmonthly`)
            .then((response) => {
                setGlobalM(response.data);
            }).catch(error =>
                console.error(`Error: ${error}`));
    }

    const getSouthernData = () => {
        axios.get(`${URL}southern`)
            .then((response) => {
                setSouthA(response.data);
            }).catch(error =>
                console.error(`Error: ${error}`));
    }

    const getSouthernMonthlyData = () => {
        axios.get(`${URL}southernmonthly`)
            .then((response) => {
                setSouthM(response.data);
            }).catch(error =>
                console.error(`Error: ${error}`));
    }

    const getNorthernData = () => {
        axios.get(`${URL}northern`)
            .then((response) => {
                setNorthA(response.data);
            }).catch(error =>
                console.error(`Error: ${error}`));
    }

    const getNorthernMonthlyData = () => {
        axios.get(`${URL}northernmonthly`)
            .then((response) => {
                setNorthM(response.data);
            }).catch(error =>
                console.error(`Error: ${error}`));
    }


    //V2 kuvaajalle GET pyyntö
    const getv2Data = () => {
        axios.get(`${URL}v2`)
            .then((response) => {
                setv2(response.data);                   //Asetetaan v2 muuttujaan vastauksen data
            }).catch(error =>
                console.error(`Error: ${error}`));
    }

    // Kutsuu funktiota aina, kun sivu ladataan
    useEffect(() => {
        getGlobalData();
        getGlobalMonthlyData();
        getSouthernData();
        getSouthernMonthlyData();
        getv2Data();                                    //Funktio jolla haetaan tiedot
        getNorthernData();
        getNorthernMonthlyData();
    }, []);

    const data = {
        datasets: [
            {
                label: "Global Annual",
                data: globalA,                                      // tilamuuttuja, johon data on tallennettu tietokannasta
                borderColor: "rgb(219,112,147)",
                backgroundColor: "rgba(219,112,147, 0.5)",
                parsing: {
                    xAxisKey: "Time",                               // x-akselin muuttuja tietokannassa
                    yAxisKey: "Anomaly (deg C)",                    // y-akselin muuttuja tietokannassa
                },
                pointRadius: 1,
            },
            {
                label: "Global Monthly",
                data: globalM,
                borderColor: "rgb(255,182,193)",
                backgroundColor: "rgba(255,182,193, 0.5)",
                parsing: {
                    xAxisKey: "Time",
                    yAxisKey: "Anomaly (deg C)",
                },
                pointRadius: 1,
            },
            {
                label: "Northern Hemisphere Annual",
                data: northA,
                borderColor: "rgb(128,128,128)",
                backgroundColor: "rgba(128,128,128, 0.5)",
                parsing: {
                    xAxisKey: "Time",
                    yAxisKey: "Anomaly (deg C)",
                },
                pointRadius: 1,
            },
            {
                label: "Northern Hemisphere Monthly",
                data: northM,
                borderColor: "rgb(192,192,192)",
                backgroundColor: "rgba(192,192,192, 0.5)",
                parsing: {
                    xAxisKey: "Time",
                    yAxisKey: "Anomaly (deg C)",
                },
                pointRadius: 1,
            },
            {
                label: "Southern Hemisphere Annual",
                data: southA,
                borderColor: "rgb(0,128,0)",
                backgroundColor: "rgba(0,128,0, 0.5)",
                parsing: {
                    xAxisKey: "Time",
                    yAxisKey: "Anomaly (deg C)",
                },
                pointRadius: 1,
            },
            {
                label: "Southern Hemisphere Monthly",
                data: southM,
                borderColor: "rgb(152,251,152)",
                backgroundColor: "rgba(152,251,152, 0.5)",
                parsing: {
                    xAxisKey: "Time",
                    yAxisKey: "Anomaly (deg C)",
                },
                pointRadius: 1,
            },
            {
                label: "Northern Hemisphere 2,000-year temperature reconstruction",
                data: v2,
                borderColor: "rgb(255,000,000)",
                backgroundColor: "rgba(255,000,000, 0.5)",
                parsing: {                                                              //Valitaan avain sanat mitkä tiedot otetaan.
                    xAxisKey: "date_format(year, '%Y')",
                    yAxisKey: "T",
                },
                pointRadius: 1,
                hidden: true,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "month"
                },
                title: {
                    display: true,
                    text: "Time in Years"
                }
            },
            y: {
                type: "linear",
                position: "right",
                title: {
                    display: true,
                    text: "Temperature Change (deg C)"
                }
            },  
        },
    };

    return (
        <div className="chart">
            <h2>V1 + V2 Temperature Anomalies from 1850 and Northern Hemisphere 2 000 Year Temperature Reconstruction</h2>
            <Line options={options} data={data} />
            <div>
                <h5>Northern Hemisphere 2,000-year temperature reconstruction : </h5>
                <p>Reconstruction of the Northern Hemisphere temperatures for the past 2 000 years. The results have been obtained by combining low-resolution proxies with tree-ring data</p>
            </div>
            <p><b><a href="https://www.nature.com/articles/nature03265" target="_blank" rel="noopener noreferrer">Link to full study</a></b></p>
            <p><b><a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" target="_blank" rel="noopener noreferrer">Link to V1 description and dataset</a></b></p>
        </div>
    );
}