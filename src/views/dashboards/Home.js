import { useState } from 'react';
import * as Icon from 'react-feather';
import Chart from 'react-apexcharts';
import {  Card, CardBody, CardTitle, CardSubtitle, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';
import Feeds from '../../components/dashboard/analytical/Feeds';
import LicenciaDescripcion from '../../components/HomeComponents/LicenciaDescripcion';


const Home = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const seriescolumn = [
    {
      name: 'Desktop',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Mobile',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Other',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];
  const optionscolumn = {
    colors: ['#745af2', '#263238', '#4fc3f7'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
        color: '#8898aa',
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
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
  return (
    <>
      <BreadCrumbs />
      <div className='row'>
        <div className='col'>
          <ComponentCard title="Column Chart">
            <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" />
          </ComponentCard>
        </div >
        <div className='col'>
          <Feeds />
        </div >
      </div>

      <ComponentCard title="Licencias adquiridas">
        <div className='row'>
          <div className='col'>
            <LicenciaDescripcion />
          </div>
          <div className='col'>
            <LicenciaDescripcion />
          </div>
          <div className='col'>
            <LicenciaDescripcion />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <LicenciaDescripcion />
          </div>
          <div className='col'>
            <LicenciaDescripcion />
          </div>
          <div className='col'>
            <LicenciaDescripcion />
          </div>
        </div>
      </ComponentCard>
      <Button color='light' className="rounded-pill mt-3"></Button>
      <ComponentCard>
      </ComponentCard>
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
        <ModalBody>
          <Card>
            <div className="img-fluid" />
            <CardBody>
              <CardTitle className="mt-2" tag="h3">
                Business development of rules 2022
              </CardTitle>
              <Badge color='info' className='rounded-pill text-dark-white mt-3'>Technology</Badge>
              <CardSubtitle className="text-muted mt-4 fs-5">Titudin venenatis ipsum aciat. Vestibu ullamer quam. nenatis ipsum ac feugiat. Ibulum ullamcorper venenatis ipsum aciat ipsum aciat. Titudin venenatis ipsum aciat</CardSubtitle>
              <div className='d-flex align-items-center mt-4 pt-1'>
                <a href='/' className='text-decoration-none link-info fw-normal'>Read more</a>
                <div className='ms-auto'>
                  <a href='/' className='text-decoration-none link-dark'><i className='bi bi-heart-fill fs-5'></i></a>
                  <a href='/' className='text-decoration-none link-dark ms-2'><i className='bi bi-share-fill fs-5'></i></a>
                </div>
              </div>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { setModal(false); }}>
            Confirmar
          </Button>
          <Button color="secondary" onClick={toggle.bind(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Home;
