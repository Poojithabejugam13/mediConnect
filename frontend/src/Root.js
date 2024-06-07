import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header/Header'
function Root() {
  return (
    <div>
      <Header></Header>
        <div className='' style={{minHeight:'88vh'} }>
            <Outlet></Outlet>
        </div>
    </div>
  )
}

export default Root