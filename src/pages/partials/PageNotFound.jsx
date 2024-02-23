
import React from 'react';
import { Link } from 'react-router-dom';
import PageError from '../../assets/404-error.gif';
class PageNotFound extends React.Component{
    render(){
        return (
          <div className='flex justify-center items-center flex-col'>
            <img src={PageError}  />
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>

        )
    }
}export default PageNotFound;