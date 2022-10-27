import React from 'react';
import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import Profile from '../../components/widgets/Profile';
import Feeds from '../../components/dashboard/analytical/Feeds';
import MyContact from '../../components/dashboard/analytical/MyContact';
import RecentComments from '../../components/dashboard/analytical/RecentComments';
import TaskList from '../../components/dashboard/analytical/TaskList';
import RecentChat from '../../components/dashboard/analytical/RecentChat';
import BrowseStats from '../../components/dashboard/modern/BrowseStats';

const Widgets = () => {
  return (
    <>
      <BreadCrumbs />
      <Row>
        <Col xs="12" lg="4">
          <Profile />
          <Feeds />
          <MyContact />
        </Col>
        <Col xs="12" lg="4">
          <RecentComments />
          <TaskList />
        </Col>
        <Col xs="12" lg="4">
          <RecentChat />
          <BrowseStats />
        </Col>
      </Row>
    </>
  );
};

export default Widgets;
