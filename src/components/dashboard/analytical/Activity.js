import DashCard from '../dashboardCards/DashCard';

import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';
import user3 from '../../../assets/images/users/user3.jpg';
import user4 from '../../../assets/images/users/user4.jpg';
import user5 from '../../../assets/images/users/user5.jpg';
import bg1 from '../../../assets/images/bg/bg1.jpg';
import bg2 from '../../../assets/images/bg/bg2.jpg';
import zipImg from '../../../assets/images/icons/zip.png';

const Activity = () => {
  return (
    <DashCard title="Activity">
      {/* row 1 */}
      <div className="d-flex align-items-start mt-4">
        <span>
          <img src={user1} alt={user1} className="rounded-circle" width="45" />
        </span>
        <div className="ms-3">
          <h5 className="mb-0 fw-normal">
            Mark Freeman
            <span className="text-muted fs-6 ms-2">| &nbsp; 6:30 PM</span>
          </h5>
          <h6 className="text-muted mb-0">uploaded this file </h6>
          <div className="d-md-flex align-items-center mt-4">
            <img src={zipImg} alt={zipImg} />
            <div className="ms-3">
              <h5 className="mb-0 fw-normal">Homepage.zip</h5>
              <h6 className='text-muted mb-0 mt-1'>54 MB</h6>
            </div>
          </div>
        </div>
      </div>
      {/* row 2 */}
      <div className="d-flex align-items-start mt-4">
        <span>
          <img src={user2} alt={user2} className="rounded-circle" width="45" />
        </span>
        <div className="ms-3">
          <h5 className="mb-0 fw-normal">
          Emma Smith
            <span className="text-muted fs-6 ms-2">| &nbsp; 6:30 PM</span>
          </h5>
          <h6 className="text-muted mb-0">joined projectname, and invited{" "}
                <a href="/" className='link-info fw-normal'>
                  @maxcage, @maxcage, @maxcage, @maxcage,
                  <br /> @maxcage,+3
                </a></h6>
          <div className="mt-4">
            <div className='hstack'>
                <a href='/'>
                    <img src={user3} alt={user3} className="rounded-circle" width="45" />
                </a>
                <a href='/' className='ms-n2'>
                    <img src={user4} alt={user4} className="rounded-circle" width="45" />
                </a>
                <a href='/' className='ms-n2'>
                    <img src={user5} alt={user5} className="rounded-circle" width="45" />
                </a>
                <a href='/' className='ms-n2'>
                    <img src={user1} alt={user1} className="rounded-circle" width="45" />
                </a>
            </div>
          </div>
        </div>
      </div>
      {/* row 3 */}
      <div className="d-flex align-items-start mt-4">
        <span>
          <img src={user5} alt={user5} className="rounded-circle" width="45" />
        </span>
        <div className="ms-3 mt-1">
          <h5 className="mb-0 fw-normal">
          David R. Jones 
            <span className="text-muted fs-6 ms-2">| &nbsp; 9:30 PM, July 13th</span>
          </h5>
          <h6 className="text-muted mb-0">uploaded this file </h6>
          <div className="d-flex align-items-center mt-4">
            <img src={bg1} alt={bg1} className='rounded' width="90" />
            <img src={bg2} alt={bg2} className='rounded ms-2' width="90" />
            
          </div>
        </div>
      </div>
      {/* row 4 */}
      <div className="d-flex align-items-start mt-4">
        <span>
          <img src={user4} alt={user4} className="rounded-circle" width="45" />
        </span>
        <div className="ms-3 mt-1">
          <h5 className="mb-0 fw-normal">
          David R. Jones 
            <span className="text-muted fs-6 ms-2">| &nbsp; 6:30 PM</span>
          </h5>
          <h6 className="text-muted mb-0">Commented on Test Project</h6>
          <p className='mt-3'>It has survived not only five centuries, but also the leap into electrotypesetting, remaining unchanged.</p>
        </div>
      </div>
    </DashCard>
  );
};

export default Activity;
