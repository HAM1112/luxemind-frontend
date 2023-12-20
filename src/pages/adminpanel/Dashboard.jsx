import React from 'react'
import { Tooltip } from 'react-tooltip'

function Dashboard() {

  return (
    <div>
        <a className="my-anchor-element">◕‿‿◕</a>
        <a className="my-anchor-element">◕‿‿◕</a>
        <a className="my-anchor-element">◕‿‿◕</a>
        <Tooltip anchorSelect=".my-anchor-element" place="top">
          Hello world!
        </Tooltip>
    </div>  
  )
} 

export default Dashboard
