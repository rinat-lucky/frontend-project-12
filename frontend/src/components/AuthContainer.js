import { Card } from 'react-bootstrap';
import Header from './Header';

const AuthContainer = ({ children }) => (
  <div className="d-flex flex-column h-100">
    <Header />
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            {children}
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default AuthContainer;
