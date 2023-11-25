
import Slogocsm from "../assets/headerlogo.png"

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';

function TRejectedView() {
    
   
        const pendingItems = [
            {
              id: 1034,
              date: 'August 19, 2023',
              time: '9:00am',
              status: 'Rejected',
              items: 
                [
                    {name: 'Petri Dishes', quantity: 3, breakage: 1},
                     {name: 'Graduated Cylinder', quantity: 6,  breakage: 3},
                     {name: 'Volumetric Flask', quantity: 2,  breakage: 1},
                   
                ]
        
            }
          ]
          const membersDetails =[
            {
               idNumber: 2018542654,
               Name: 'Joel Morongot',
           
            },
            {
              idNumber: 2020100768,
              Name: 'Joel Morongot',
          
           },   
           {
            idNumber: 2020100768,
            Name: 'Trissa Saman Asali Mulan Yee',
        
         }   
        ]
          
        const studentDetails =[
            {
                idNumber: 201854265,
                name: 'Sofia Dara Alilin',
                Dept: 'BSCHEMISTRY',
                section: 'CHEM1H2'
                
            }   
            ]

            const instructor = [
            {
                  idNumber: 2055060541,
                  Name: 'Ms. Jerilyn Yare',
                }
            ]
              
            const labtech = [
                {
                  Name: "Prince Kurt Laurence",
                }
            ]
    
        let totalQuantity = 0;
            pendingItems.forEach((item) => {
            item.items.forEach((borrowedItem) => {
                totalQuantity += borrowedItem.quantity;
            });
        });

     
    
    
    

return (
    <div className='viewContent'>
      
       <div className="headerView">
            <Link to="/Dashboard" className="customArrow">
             <KeyboardBackspaceIcon className='viewArrowIcon'/>
           </Link>
           <img src={Slogocsm} alt="Header Logo" className="mainlogoView" />
        </div>

        {pendingItems.map((item) => (
            <div className="papercontentStatus">
                <div className="statusCont">
                    <div className="viewStatusRejected">
                        Status:<span> &nbsp;{item.status} </span>
                    </div>
                    
                </div>
     
                <div className="viewPaperContent">

            
                    <div className="titleID"> Transaction ID  &nbsp; <span> #{item.id}</span></div>
                    {studentDetails.map((student)=>(
                    <div className="firstRow">
                        <div className='viewStudentInfo'>
                            <div className='iconProfileContainer'> 
                                <AccountCircleOutlinedIcon/>
                            </div>
                            <div className='student-details'>
                                <div className='student-Name'>
                                    {student.name}
                                </div>
                                <div className='student-ID-Dept'>
                                    {student.idNumber}-{student.Dept}
                                </div>
                            </div>
                        </div>
                        <div className="sectionContainer">
                            Section: <b>{student.section}</b>
                        </div>
                    </div>
                    ))}

                    <div className='viewTitleLabel'>Members </div>
                            
                    <div className='viewMembersInfo'>
                    {membersDetails.map((member, index)=>(     
                        <div className='viewEachInfo' key={index}>
                            <div className='eachIndex'>
                                {index+1}
                            </div>
                            <div className='eachmemID'>
                                {member.idNumber}
                            </div>
                            <div className='eachmemNAME'>
                                {member.Name}
                            </div>
                        </div>
                    ))}
                    </div>
                    
                    <div className='viewTitleLabel'> Instructor </div>
                    <div className='viewAfterLabel'>
                        <div className="viewInst">
                          Ms. Jerilyn Yare
                        </div>
                    </div>

                    <div className='viewTitleLabel'> Subject </div>
                    <div className='viewAfterLabel'>
                        <div className="viewEachInfo">
                         Chemistry 
                        </div>
                    </div>

                    

                    <div className='viewTitleLabel'> Selected Items </div>
                    <div className='viewItemsSelected'>
                        {item.items.map((selectedItems,index)=>(

                        
                        
                                <div className='viewEachInfo' key ={index}>
                                    <div className='eachIndex'>
                                        {index +1}
                                    </div>
                                    <div className='eachItemDetails'>
                                        {selectedItems.name}
                                    </div>
                                </div>      
                            ))}   
                    </div>

                    <div className='totalQuantityLabel'>
                        <span>Total Borrowed:</span>
                        &nbsp;&nbsp;
                        {totalQuantity}
                    </div>

                    {/* Approved by View */}
                    <div className="approvedCont">
                        <div className='viewTitleLabel'>Approved by: </div>
                        <div className='viewMembersInfo'>
                            {instructor.map((instructor, index)=>(       
                                <div className='viewEachInfo'>
                                <ul className='eachmemNAME'>
                                    <li>Instructor: <b>{instructor.Name}</b></li>       
                                </ul>
                                </div>
                            ))}
                            {labtech.map((labtech, index)=>(       
                            <div className='viewEachInfo'>
                                <ul className='eachmemNAME'>
                                <li>Lab Technician: 
                                    {/* <b>{labtech.Name} </b> */}
                                </li>  
                                </ul>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className='viewDateTime'>
                        <div className='viewDate'>
                        {item.date}
                        </div>
                        <div className='viewTime'>
                            {item.time}
                        </div>
                    
                    </div>
            
                </div>
            </div>
            
            ))}
        <div className="buttonsCont">
            <Link to="/Dashboard" className="doneViewButton">
                Done View
            </Link>
            
        </div>
        

    </div>
    );
}

export default TRejectedView;
