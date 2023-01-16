import React, {useState, useEffect} from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ImArrowUp, ImArrowDown  } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";
import {RxCross1} from 'react-icons/rx';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import StopListItem from './StopListItem';

export default function RouteListView({routes, modifyRoute, handleMapViewToggle}) {

    const [selected, setSelected] = useState(null);

    const toggle = (id) => {
        if(id === selected) {
            return setSelected(null);
        }

        setSelected(id);
    };

    const deleteStop = (route, stopID) => {
        let index = routes.indexOf(route);
        if (index > -1 && route.stops.length >1) {
            route.stops = route.stops.filter(item => item.id !== stopID);
            // console.log(route.stops.length);
            modifyRoute(route.id, route);
        } else {
            alert('There should be atleast one stopage');
        }
    }

    const getEditedStop = (route, updatedStop ,stopID) => {
        route.stops[stopID] = updatedStop;
        modifyRoute(route.id, route);
    }

    return (
        <div>
            {
                routes.map((item) => {
                    return(
                        <div key = {item.id}>                                
                            <div role= 'button' className = 'route_name row'
                                onClick={() => toggle(item.id)}>
                                <div className = 'col-8 col-md-7'>
                                    {item.rout_name} to {item.stops[item.stops.length - 1].stopName}
                                </div>

                                <div className = 'col-3 col-md-4 dd-header_action' style = {{margin: 'auto'}}>
                                    {selected === item.id ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                                </div>
                            </div>
                            
                            {
                                selected === item.id ? 
                                    <div key = {item.id} className = 'route_stopage'>
                                        {
                                            item.stops.map((stopage, index) => {
                                                return(
                                                    // edit ? <div key = {stopage.id}> <EditDisplay/> </div> :
                                                    <StopListItem stopage = {stopage} 
                                                        key = {stopage.id}
                                                        handleEditStopage = {(updatedStop, index) =>  getEditedStop(item, updatedStop, index)}
                                                        deleteItem = {(stopID) => deleteStop(item, stopID)}
                                                        setIndex = {index} />
                                                )
                                            })
                                        }

                                        {/* --------------- Status and direction ------------ */}

                                        <div className = 'row'>
                                            <div className = 'col-12 col-md-6'>
                                                <div className = 'row'>
                                                    <div className = 'col-6' style = {{fontWeight: 600}}> Direction: </div>

                                                    <div className = 'col-6' > { item.direction === 'up' ? <ImArrowUp/> : <ImArrowDown/> } {item.direction} </div>
                                                </div>
                                                
                                            </div>
                                            <div className = 'col-6'>
                                                <div className = 'row'>
                                                    <div className = 'col-6' style = {{fontWeight: 600}}>Status: </div>  <div className = 'col-6'> {item.status === 'active' ? <AiOutlineCheck/> :  <RxCross1 style = {{color: 'red'}} /> }  {item.status} </div>

                                                </div>
                                            </div>
                                        </div>

                                        {/* ----------------- Action buttons --------------- */}

                                        <div  className = 'action_buttons'>

                                            <button className = 'view_route_btn' 
                                                
                                                onClick = {() => handleMapViewToggle(item.id)}
                                            >
                                                view route in map
                                            </button>

                                        </div>
                                    </div> 
                                : null
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}