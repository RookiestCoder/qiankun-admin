import { Outlet } from 'react-router-dom';
import SideMenu from './components/SideMenu';
import Breadcrumb from './components/Breadcrumb';
import './index.less';

export default function Layout() {
  return (
    <div className="child-vite-react-layout">
      <div className="cvr-menu">
        <SideMenu />
      </div>
      <div className="cvr-view">
        <div className="cvrv-bread">
          <Breadcrumb />
        </div>
        <div className="cvr-wrap">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
