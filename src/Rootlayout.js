import React from 'react'
import Navigationbar from './components/navigationbar/Navigationbar'

import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';

function Rootlayout() {
  return (
    <div>
      {/*   Navigation bar   */ }

      <Navigationbar />

      {/*  dynamic content   */}

      <Outlet />

      {/*  Footer   */}

      {  <Footer />   }
      
      
    </div>
  )
}

export default Rootlayout
