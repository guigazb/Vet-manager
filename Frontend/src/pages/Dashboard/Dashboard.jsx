import React, { useState } from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Actions from '../../components/geral/Actions';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <Actions breadcrumb="Início" nomeSessao="Dashboard" hasAddViewButton={false} hasDatepicker={true} hasFilter={true} />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              Dashboard
              
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;