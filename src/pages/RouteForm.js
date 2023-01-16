import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/header.css';
import {AiFillBackward} from 'react-icons/ai';

export default function RouteForm({addRoute}) {

    const [routeDetails, setRouteDetails] = useState({
      rout_name: '',
      direction: '',
      status: '',
      latitude: '',
      longitude: '',

    })

    const [stops, setStops] = useState([
      {
        id: null,
        stopName: '',
        latitude: '',
        longitude: '',
      }
    ])

    const [formErr, setFormErr] = useState({
      rout_name_err: null,
      direction_err: null,
      status_err: null,
      latitude_err: null,
      longitude_err: null,

  });

  const [stopErr, setStopErr] = useState({
    stop_name_err: null,
    latitude_err: null,
    longitude_err: null,

});

    
      const [isDisabled, setIsDisabled] = useState(false)
      // const [isCreateClickd, setIsCreateClicked] = useState(false);
    
      useEffect(() => {
        if (stops.length > 0) {
          !stopErr.stop_name_err && !stopErr.longitude_err && !stopErr.latitude_err 
          && stops[stops.length -1].id !== null && stops[stops.length -1].stopName !== ''
          && stops[stops.length -1].latitude !== '' && stops[stops.length -1].longitude !== ''
          ? setIsDisabled(false)
          : setIsDisabled(true)
        }
      })

      function isValidString(value) {
        return /[0-9]+\./.test(value);
      }

      const handleRoutName = (e) => {
        // console.log(e.target.value);
        if(e.target.value.length ===0) {
          setFormErr({...formErr, rout_name_err: 'Required field'});
          }

          else {
            setFormErr({...formErr, rout_name_err: null});
          }
          setRouteDetails({...routeDetails, rout_name: e.target.value});
    }

    const handleRoutLattitude = (e) => {
      if(e.target.value.length ===0) {
        setFormErr({...formErr, latitude_err: 'Required field'});
        }
        else if(!isValidString(e.target.value)){
          setFormErr({...formErr, latitude_err: 'Field should be a number'});
        }
        else {
          setFormErr({...formErr, latitude_err: null});
        }

        setRouteDetails({...routeDetails, latitude: e.target.value})
    }

    const handleRoutLongitude = (e) => {
      if(e.target.value.length ===0) {
        setFormErr({...formErr, longitude_err: 'Required field'});
        }
        else if(!isValidString(e.target.value)){
          setFormErr({...formErr, longitude_err: 'Field should be a number'});
        }
        else {
          setFormErr({...formErr, longitude_err: null});
        }

        setRouteDetails({...routeDetails, longitude: e.target.value})
    }

    const handleStopName = (e, index) => {
      
      if(e.target.value.length ===0) {
        setStopErr({...stopErr, stop_name_err: 'Required Field'});
      }
      else {
        setStopErr({...stopErr, stop_name_err: null});
      }
      handleInputChange(e, index, 'name');
    }

    const handleStopLattitude = (e, index) => {
      if(e.target.value.length ===0) {
        setStopErr({...stopErr, latitude_err: 'Required Field'});
      } 
      else if(!isValidString(e.target.value)) {
        setStopErr({...stopErr, latitude_err: 'Field should be a number'});
      }
      else {
        setStopErr({...stopErr, latitude_err: null});
      }
      handleInputChange(e, index, 'lat');
    }

    const handleStopLongitude = (e, index) => {
      if(e.target.value.length ===0) {
        setStopErr({...stopErr, longitude_err: 'Required Field'});
      } 
      else if(!isValidString(e.target.value)) {
        setStopErr({...stopErr, longitude_err: 'Field should be a number'});
      }
      else {
        setStopErr({...stopErr, longitude_err: null});
      }
      handleInputChange(e, index, 'long');
    }
    
      const handleListAdd = () => {
        // if( stops[stops.length-1].stopName && stops[stops.length-1].latitude && stops[stops.length-1].longitude) {
          
        if(!stopErr.stop_name_err && !stopErr.longitude_err && !stopErr.latitude_err) {
          setStops([
            ...stops,
            {
              id: null,
              stopName: '',
              latitude: '',
              longitude: '',
            }
          ])
        }
        else {
          alert('Please fix the errors');
        }  
        
      }
    
      const handleInputChange = (event, index, type) => {
        const { value } = event.target
        const newInputList = [...stops]
        if(type === 'name') {
          newInputList[index].stopName = value;
        }
        else if(type === 'lat') {
          newInputList[index].latitude = value;
        }
        else if(type === 'long') {
          newInputList[index].longitude = value;
        }
        
        newInputList[index].id = index + 1
        setStops(newInputList)
      }
    
      const handleRemoveItem = (index) => {
        const newList = [...stops]
        newList.splice(index, 1)
        setStops(newList)
      }

      const handleSubmitData = () => {
        // console.log('submitted', routeDetails, stops);
        // const pushData = {
        //   ...routeDetails,
        //   stops: [...stops]
        // }
       
        // addRoute(pushData);

        if(!formErr.rout_name_err && !formErr.direction_err && !formErr.status_err
           && !formErr.latitude_err && !formErr.longitude_err && routeDetails.rout_name !== ''
           &&  routeDetails.direction !== '' && routeDetails.status !== '' && routeDetails.latitude !== '' 
           && routeDetails.longitude !== ''){
            const pushData = {
              
              ...routeDetails,
              stops: [...stops]
            }
            addRoute(pushData);
            setRouteDetails({
              rout_name: '',
              direction: '',
              status: '',
              latitude: '',
              longitude: '',
            })
    
            setStops(
             [ {
                id: null,
                stopName: '',
                latitude: '',
                longitude: '',
              }]
            )
            alert('form submitted');
           }

        else {
          alert('Please fill the relevent details');
        }
      }
      
      
    

    function stopForm(index) {
        return (
            <div className = 'stop_form_layout'>
             <div className="styled-input wide"
              style = {{marginTop: '2%'}}
                
                >
                <label htmlFor='name' > Stop name <em style={{color: 'red'}}>*</em></label>
                <input  name = 'stop_name' 
                  // value =  {''}
                  onChange={(e) =>  handleStopName( e,index)}
                 />
                {stopErr.stop_name_err &&  <p style = {{color: 'red'}}>{stopErr.stop_name_err}</p>}
                </div>

                

                
                <div className='row' style = {{margin: '0.5%'}} >
                    {/* ----------------- Lattitude --------------- */}
                    <div className="col-6 styled-input wide "
                    
                    >
                        <label htmlFor='name' > Lattitude <em style={{color: 'red'}}>*</em></label>
                        <input  name = 'lattitude' 
                        onChange={(e) => handleStopLattitude(e, index)}
                        />
                        {stopErr.latitude_err &&  <p style = {{color: 'red'}}>{stopErr.latitude_err}</p>}
                    </div>

                    {/* ----------------- Longitude --------------- */}

                    <div className="col-6 styled-input wide "
                    
                    >
                        <label htmlFor='name' > Longitude <em style={{color: 'red'}}>*</em></label>
                        <input  name = 'longitude' 
                        onChange={(e) => handleStopLongitude(e, index)}
                        />
                       {stopErr.longitude_err &&  <p style = {{color: 'red'}}>{stopErr.longitude_err}</p>}
                    </div>
                </div>

               
            </div>
        )
        
    }

  return (
    <div style={{margin: '10%'}}>
       
          <Link to= '/travel-app' style={{textDecoration: 'none'}}>
            <span className = 'submit-btn ' >
              <AiFillBackward  /> Back
            </span>
             
            </Link>
              
      
        <div className = 'form-layout'>
            <div className="styled-input wide"
            >
                <label htmlFor='name' > Route name <em style={{color: 'red'}}>*</em></label>
                <input  name = 'name'
                  value = {routeDetails.rout_name}
                  onChange = { handleRoutName} 
                    
                 />
                {formErr.rout_name_err && <p style = {{color: 'red'}}>{formErr.rout_name_err}</p> }
            </div>

            
            <div className = 'row'>
                {/* -------------- For direction -------------- */}
                <div 
                className = "col-6"
                >
                    <label htmlFor='direction' className = 'select_label'> 
                      Direction <em style={{color: 'red'}}>*</em></label>
                    <select  htmlFor='direction' 
                    className='select_data'
                    onChange = {(e) => setRouteDetails({...routeDetails, direction: e.target.value})}
                    > 
                      <option></option>
                        <option>
                            up
                        </option>
                        <option>down</option>
                    </select>
                    {formErr.direction_err &&  <p style = {{color: 'red'}}>{formErr.direction_err}</p>}
                </div>

                {/* ---------------- For the status ------------ */}

                <div 
             
                className = "col-6"
                >
                    <label htmlFor='status' className = 'select_label' > Status <em style={{color: 'red'}}>*</em></label>
                    <select  htmlFor='status'
                      onChange = {(e) => setRouteDetails({...routeDetails, status: e.target.value})} 
                      className='select_data'
                    > 
                      <option></option>
                        <option>
                            active
                        </option>
                        <option>inactive</option>
                    </select>
                    {formErr.status_err &&  <p style = {{color: 'red'}}>{formErr.status_err}</p>}
                </div>

                {/* ----------- Latitude and longitude for main station ----------- */}

              <div className = 'row lat-long_layout'>
                  <div className="col-12 col-md-6 styled-input wide"
                >
                    <label htmlFor='latitude'  > Latitude <em style={{color: 'red'}}>*</em></label>
                    <input  name = 'latitude'
                      value = {routeDetails.latitude}
                      onChange = {handleRoutLattitude} 
                    />
                    {formErr.latitude_err && <p style = {{color: 'red'}}>{formErr.latitude_err}</p> }
                  </div>

                  <div className="col-12 col-md-6 styled-input wide">
                    <label htmlFor='longitude' > longitude <em style={{color: 'red'}}>*</em></label>
                    <input  name = 'longitude'
                      value = {routeDetails.longitude}
                      onChange = {handleRoutLongitude} 
                    />
                    {formErr.longitude_err && <p style = {{color: 'red'}}>{formErr.longitude_err}</p> }
                </div>
              </div>

               

            

                {/* ------------------- Stops Form ------------ */}

                

                <div >

                    {
                        stops.length > 0
                            ? stops.map((input, index) => (
                                <div key={index} className = 'parent'>
                                  {stopForm(index)}
                                  {stops.length >1 ? 
                                    <button className = 'child' onClick={() => handleRemoveItem(index)}>
                                      <span role="img" aria-label="x emoji">
                                        ❌
                                      </span>
                                  </button> : null
                                  }
                                  
                                </div>
                              ))
                            : null
                    }

                    <button className = 'add_more'
                      onClick={handleListAdd} 
                      disabled={isDisabled}
                    > Add more stop </button>

                </div>
               
                {/* --------------- Submit button ------------ */}
                <div>
                  <button className = {isDisabled? 'dissable_submit' : 'submit-btn'} 
                  onClick={handleSubmitData} disabled = {isDisabled}>
                      Submit
                  </button>
                </div>


            </div>
            
        </div>
    </div>
  )
}
