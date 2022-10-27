import React from 'react';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';

import img1 from '../../../assets/images/users/user1.jpg';

const ProfileCard = () => {
  return (
    <Card className="text-center">
      <CardBody>
        <div className="">
          <img src={img1} alt="user" className="rounded-circle my-4 shadow" width="128" />
          <h3 className="mb-0 fw-normal">Mark J. Freeman</h3>
          <h6 className="text-muted">Web Designer</h6>
          <ul className="list-inline mt-4">
            <li className="list-inline-item pe-2">
              <a href="/" className="fs-5 text-muted">
                <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item px-2">
              <a href="/" className="fs-5 text-muted">
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item px-2">
              <a href="/" className="fs-5 text-muted">
                <i className="bi bi-youtube"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" className="fs-5 text-muted">
                <i className="bi bi-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </CardBody>
      <div className="bg-light">
        <Row>
          <Col className="border-end text-center py-4">
            <h4 className="fw-normal mb-0">35,000</h4>
            <small>Followers</small>
          </Col>
          <Col className="text-center py-4">
            <h4 className="fw-normal mb-0">180</h4>
            <small>Following</small>
          </Col>
        </Row>
      </div>
      <CardBody>
        <Button color='success' className="rounded-pill my-3">
          Follow Me
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
