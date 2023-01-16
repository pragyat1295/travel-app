import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import { RiDeleteBinLine  } from "react-icons/ri";
import { BsPencil } from "react-icons/bs";


export default function StopListItem({stopage, handleEditClick, deleteItem, handleEditStopage, setIndex}) {

    const [UpdatedstopData, setUpdatedStopData] = useState({
       
      id: stopage.id,
      stopName: stopage.stopName,
      latitude: stopage.latitude,
      longitude: stopage.longitude,
  
    })

    const [stopErr, setStopErr] = useState({
        stop_name_err: null,
        latitude_err: null,
        longitude_err: null,
    
    });

    function isValidNum(value) {
        return /[0-9]+\./.test(value);
      }

      const handleStopName = (e) => {
      
        if(e.target.value.length ===0) {
          setStopErr({...stopErr, stop_name_err: 'Required Field'});
        }
        else {
          setStopErr({...stopErr, stop_name_err: null});
        }
        setUpdatedStopData({...UpdatedstopData, stopName: e.target.value})
        
      }
  
      const handleStopLattitude = (e) => {
        if(e.target.value.length ===0) {
          setStopErr({...stopErr, latitude_err: 'Required Field'});
        } 
        else if(!isValidNum(e.target.value)) {
          setStopErr({...stopErr, latitude_err: 'Field should be a number of type float'});
        }
        else {
          setStopErr({...stopErr, latitude_err: null});
        }
        setUpdatedStopData({...UpdatedstopData, latitude: e.target.value})
        
      }
  
      const handleStopLongitude = (e) => {
        if(e.target.value.length ===0) {
          setStopErr({...stopErr, longitude_err: 'Required Field'});
        } 
        else if(!isValidNum(e.target.value)) {
          setStopErr({...stopErr, longitude_err: 'Field should be a number of type float'});
        }
        else {
          setStopErr({...stopErr, longitude_err: null});
        }
        setUpdatedStopData({...UpdatedstopData, longitude: e.target.value})
        
      }

    const handleSaveChanges = (updatedData, setIndex, callBackClose) => {
        
        if(!stopErr.stop_name_err && !stopErr.latitude_err && !stopErr.longitude_err) {
            handleEditStopage(updatedData,setIndex);
            callBackClose();
        } 
        else {
            alert('Please fix the errors');
        }
        
    }
  
    return (
        <div>

            <div className = 'row' key = {stopage.id}>
            
                <div className = 'col-6'>
                    {stopage.stopName}
                </div>
                <div className = 'col-6'>
                    <div style = {{display: 'flex'}}> 

                    {/* ----------------------- Edit Button --------------------- */}
                    <Popup className='content_popup'
                    trigger = {<button style = {{color: 'white'}}>
                                edit
                            </button>}
                            modal
                            nested
                    >
                        {close => (
                            <div className = 'popup_layout'>
                                <div>
                                    <div>
                                        <label htmlFor = 'name'>Stopage</label>
                                        <input className='form-control' 
                                        value = {UpdatedstopData.stopName} 
                                        onChange = {(e) => handleStopName(e)}
                                        />
                                        {stopErr.stop_name_err &&  <p style = {{color: 'red'}}>{stopErr.stop_name_err}</p>}
                                    </div>
                                    

                                    <div className = 'row' style = {{marginTop: '4%'}}>
                                        <div className = 'col-12 col-md-6'>
                                            <label htmlFor = 'latitude'>Latitude</label>
                                            <input className='form-control' 
                                            value = {UpdatedstopData.latitude} 
                                            onChange = {(e) => handleStopLattitude(e)}
                                            />
                                            {stopErr.latitude_err &&  <p style = {{color: 'red'}}>{stopErr.latitude_err}</p>}
                                        </div>
                                        <div className = 'col-12 col-md-6'>
                                            <label htmlFor = 'longitude'>Longitude</label>
                                            <input className='form-control' 
                                                value = {UpdatedstopData.longitude} 
                                                onChange = {(e) => handleStopLongitude(e)}
                                                />
                                                {stopErr.longitude_err &&  <p style = {{color: 'red'}}>{stopErr.longitude_err}</p>}
                                        </div>
                                    </div>
                                    

                                    
                                </div>

                                {/* ------------ Cross ------------- */}
                                <button className="close" onClick={close}>
                                    &times;
                                </button>

                                {/* --------------- Save and cancle ------------- */}

                                <div className='button_styling' style = {{marginTop: '4%'}}>
                                    <button 
                                        className = 'cancle_btn'

                                        onClick={() => {
                                        // console.log('modal closed ');
                                        close();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    
                                    <button className = 'save_btn'
                                    onClick = {() =>{ handleSaveChanges(UpdatedstopData, setIndex, close)}}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                        
                    {/* ------------------ Delete button popup ------------------- */}
                        <Popup
                        trigger={<button style = {{border: 'none',   marginLeft: '-50%', 
                        padding: '0px 20px 1px 20px'}} >
                            <RiDeleteBinLine style = {{color: 'white'}} />
                        </button>}
                        modal
                        nested
            >
                        {close => (
                            <div className = 'popup_layout'>
                                <div>
                                    Are you sure want to delete this route?
                                </div>
            
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="actions">
                                
                                <div className='button_styling'>
                                    <button 
                                        className = 'cancle_btn'
                                    
                                        onClick={() => {
                                        // console.log('modal closed ');
                                        close();
                                        }}
                                    >
                                        Cancle
                                    </button>
            
                                    <button className = 'delete_btn'
                                    onClick = {()=> deleteItem(stopage.id)} 
                                    >
                                        delete
                                    </button>
                                </div>
                            
                                </div>  
                            </div>
                        
                        )}
                    </Popup> 
                    </div>
                </div>
            </div>
        </div>
    
  )
}
