import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LayOut from './component/layout/Layout'

const Routesss = () => {
    
  return (
    <div>
        <Routes>
            <Route path="/" element={<LayOut/>}>
            </Route>
        </Routes>
      
    </div>
  )
}

export default Routesss;
