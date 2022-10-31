import React from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as data from '../tables/DataBootstrapTable';
import '../tables/ReactBootstrapTable.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';


const Inventarios = () => {
    //For Tables BEGIN
    //This is for the Delete row
    function onAfterDeleteRow(rowKeys) {
        // eslint-disable-next-line no-alert
        alert(`The rowkey you drop: ${rowKeys}`);
    }
    //This is for the insert new row
    /*
    function onAfterInsertRow(row) {
      let newRowStr = '';
    
      for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
      }
      alert('The new row is:\n ' + newRowStr);
    }*/
    //This is for the Search item
    function afterSearch(searchText, result) {
        console.log(`Your search text is ${searchText}`);
        console.log('Result is:');
        for (let i = 0; i < result.length; i++) {
            console.log(`Fruit: ${result[i].id}, ${result[i].name}, ${result[i].price}`);
        }
    }
    const options = {
        //afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
        afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
        afterSearch, // define a after search hook
    };
    const selectRowProp = {
        mode: 'checkbox',
    };
    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
    };



    //For Tables END
    //-------------------------
    // Area Chart
    //-------------------------
    const optionsarea = {
        chart: {
            id: 'area-chart',
            fontFamily: "'Rubik', sans-serif",
            zoom: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: '3',
            curve: 'smooth',
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
        },
        colors: ['#745af2', '#06d79c'],
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00',
                '2018-09-19T01:30:00',
                '2018-09-19T02:30:00',
                '2018-09-19T03:30:00',
                '2018-09-19T04:30:00',
                '2018-09-19T05:30:00',
                '2018-09-19T06:30:00',
            ],
            labels: {
                style: {
                    cssClass: 'grey--text lighten-2--text fill-color',
                },
            },
        },
        yaxis: {
            opposite: false,
            labels: {
                show: true,
                style: {
                    cssClass: 'grey--text lighten-2--text fill-color',
                },
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            width: '50px',
            fontFamily: "'Montserrat', sans-serif",
            labels: {
                colors: '#8898aa',
            },
        },
    };

    const seriesarea = [
        {
            name: 'Sales Summery 1',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'Sales Summery 2',
            data: [11, 32, 45, 32, 34, 52, 41],
        },
    ];

    //-------------------------
    // Line Chart
    //-------------------------
    const optionsline = {
        chart: {
            id: 'line-bar',
            fontFamily: "'Rubik', sans-serif",
            animations: {
                easing: 'easeinout',
            },
        },

        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            row: {
                colors: ['#e9ecef', 'transparent'],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: [
                'Ene',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun'

            ],
            labels: {
                style: {
                    cssClass: 'grey--text lighten-2--text fill-color',
                },
            },
        },
        yaxis: {
            categories: ['2001', '2002', '2003', '2004', '2005'],
            labels: {
                show: true,
                style: {
                    colors: ['#99abb4', '#99abb4', '#99abb4', '#99abb4', '#99abb4', '#99abb4'],
                    fontSize: '12px',
                    fontFamily: "'Montserrat', sans-serif",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#398bf7'],
        stroke: {
            curve: 'straight',
            width: '4',
        },
        tooltip: {
            theme: 'dark',
        },
    };

    const seriesline = [
        {
            name: 'Inventario Existente',
            data: [0, 150, 120, 150, 135, 210],
        },
    ];







    return (
        <div>
            <BreadCrumbs />
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Inner Div*/}
            {/*--------------------------------------------------------------------------------*/}
            <Row>

                <Col md="6">
                    <ComponentCard title="Inventario Anual">
                        <Chart options={optionsarea} series={seriesarea} type="area" height="280" />
                    </ComponentCard>
                </Col>
                <Col md="6">
                    <ComponentCard title="Inventario Semestral">
                        <Chart options={optionsline} series={seriesline} type="line" height="280" />
                    </ComponentCard>
                </Col>

            </Row>
            <Row>
                <Col md="12">
                    <ComponentCard title="Bootstrap DataTable">
                        <BootstrapTable
                            striped
                            hover
                            condensed
                            search
                            data={data.JsonData}
                            deleteRow
                            selectRow={selectRowProp}
                            pagination
                            insertRow
                            options={options}
                            cellEdit={cellEditProp}
                            tableHeaderClass="mb-0"
                        >
                            <TableHeaderColumn width="100" dataField="name" isKey>
                                Name
                            </TableHeaderColumn>
                            <TableHeaderColumn width="100" dataField="gender">
                                Gender
                            </TableHeaderColumn>
                            <TableHeaderColumn width="100" dataField="company">
                                Company
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </ComponentCard>
                </Col>
            </Row>
            {/*--------------------------------------------------------------------------------*/}
            {/*End Inner Div*/}
            {/*--------------------------------------------------------------------------------*/}
        </div>
    );
};
export default Inventarios;