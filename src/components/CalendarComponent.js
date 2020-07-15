import React , {Component} from 'react';
import Clock from 'react-live-clock';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import '../css/Event.css';
import { Card, CardBody, Button, Popover,ButtonGroup, Badge, Table, UncontrolledTooltip } from 'reactstrap';
import TimePicker from 'react-time-picker';
import Secret from '../config.json';
import '../css/Sign.css';
function getWeekDays(weekStart) {
    const days = [weekStart];
    for (let i = 1; i < 7; i += 1) {
      days.push(
        moment(weekStart)
          .add(i, 'days')
          .toDate()
      );
    }
    return days;
  }
  
  function getWeekRange(date) {
    return {
      from: moment(date)
        .startOf('week')
        .toDate(),
      to: moment(date)
        .endOf('week')
        .toDate(),
    };
  }

  const TimeText=[
    '12:00 AM',
    '12:30 AM',
    '01:00 AM',
    '01:30 AM',
    '02:00 AM',
    '02:30 AM',
    '03:00 AM',
    '03:30 AM',
    '04:00 AM',
    '04:30 AM',
    '05:00 AM',
    '05:30 AM',
    '06:00 AM',
    '06:30 AM',
    '07:00 AM',
    '07:30 AM',
    '08:00 AM',
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
    '05:00 PM',
    '05:30 PM',
    '06:00 PM',
    '06:30 PM',
    '07:00 PM',
    '07:30 PM',
    '08:00 PM',
    '08:30 PM',
    '09:00 PM',
    '09:30 PM',
    '10:00 PM',
    '10:30 PM',
    '11:00 PM',
    '11:30 PM',

  ]
class EventCalendar extends Component{

    state = {
        hoverRange: undefined,
        selectedDays: getWeekDays(getWeekRange(new Date()).from),
        showCalendar:false,
        daysStartTime:'10:30',
        daysEndTime:'19:30',
        endStartTime:'11:30',
        endEndTime:'19:30',
        daysEnabled:true,
        endEnabled:false,
        utc:'GMT+2',
        isLoggedIn:false,
        eventArray:[],
        selectedDateIndex:0,
      };

      insertGapi()
   {
       const script=document.createElement('script');
       script.src="https://apis.google.com/js/api.js";
       script.onload=()=>{

        this.initializeGoogleSignIn();

       }
       document.body.appendChild(script);
   }

   initializeGoogleSignIn()
   {
       window.gapi.load('client:auth2',()=>{
        window.gapi.client.init({
            apiKey:Secret.apiKey,
            clientId:Secret.clientId,
            discoveryDocs:Secret.discoveryDocs,
            scope:Secret.scope
        }).then(()=>{
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            // document.getElementById('sign').onclick=this.handleAuthClick();
            console.log('dd');
        },(error)=>{
         console.log(error);
        })
        .catch((error)=>{
            console.log(error);
        })
    });
   }

   updateSigninStatus=(isSignedIn)=>{
       if(isSignedIn)
       {
           console.log(isSignedIn);
           console.log(window.gapi);
           let date=new Date(this.state.selectedDays[6]);

           console.log(moment(date.setDate(date.getDate()+1)).format());

           this.setState({isLoggedIn:true});

           this.createEventArray();
       }
       else
       {

       }
   }

   handleAuthClick(){
       window.gapi.auth2.getAuthInstance().signIn();
   }

    

     async componentDidMount()
      {

       await this.insertGapi();
       // console.log(this.state.selectedDays);
        this.setState({
          utc:this.state.selectedDays.toString().split(' ')[5]
        });

        this.state.selectedDays.forEach((item,index)=>{

          console.log(new Date().getDate());
          console.log(new Date(item).getDate());
          if(new Date().getDate()=== new Date(item).getDate())
          {
            this.setState({
              selectedDateIndex:index
            });
          }
        });

       // this.generateEvevntColumn('5345');

        console.log(new Date(TimeText[0]).getTime());
      }

      componentDidUpdate(prevProps,prevState){
       // console.log(prevState);
        if(this.state.selectedDays!== prevState.selectedDays || this.state.daysEnabled!==prevState.daysEnabled || this.state.endEnabled!== prevState.endEnabled)
        {
            this.createEventArray();
        }
      }




      handleEvents=async (minDate,maxDate)=>{
      let response=await  window.gapi.client.calendar.events.list({
          'calendarId':'primary',
          'timeMin':minDate,
          'timeMax':maxDate,
          'showDeleted': false,
         'singleEvents': true,
         'maxResults': 12,
         'orderBy': 'startTime'
      });

      console.log(response);
      if(response.status===200)
      {
        console.log(response.result.items);
        return response.result.items;
      }
      }

      createEventArray=async()=>{

        let start=0;
        let end=6;
        let temp=-1;
        let data=[];
        if(this.state.daysEnabled && ! this.state.endEnabled)
        {
          start=1;
          end=5;
        }
        else if(this.state.endEnabled && !this.state.daysEnabled)
        {
          temp=1;
          start=0;
          end=6;
        }
        else if(!this.state.daysEnabled && !this.state.endEnabled)
          {
            this.setState({
              eventArray:[]
            });
            return;
          }
        if(temp===-1)
        {
            for(let i=start;i<=end;i++)
            {
              let date=new Date(this.state.selectedDays[i]);
              data.push(await this.handleEvents(date.toISOString(),moment(date.setDate(date.getDate()+1)).format()));
              
            }

            console.log(data);
        }
        else
        {
          let date=new Date(this.state.selectedDays[start]);
              data.push(await this.handleEvents(date.toISOString(),moment(date.setDate(date.getDate()+1)).format()));
          let date1=new Date(this.state.selectedDays[end]);
          data.push(await this.handleEvents(date1.toISOString(),moment(date1.setDate(date1.getDate()+1)).format()));
          
              
        }

        console.log(data);

        this.setState({
          eventArray:data
        });

      }
    
      handleDayChange = date => {
        this.setState({
          selectedDays: getWeekDays(getWeekRange(date).from),
        });
      };
    
      handleDayEnter = date => {
        this.setState({
          hoverRange: getWeekRange(date),
        });
      };
    
      handleDayLeave = () => {
        this.setState({
          hoverRange: undefined,
        });
      };
    
      handleWeekClick = (weekNumber, days, e) => {
        this.setState({
          selectedDays: days,
        });
      };

      toggleCalendar=()=>{
          this.setState({
              showCalendar:!this.state.showCalendar
          })
      }

      onDaysStartTimeChange=(value)=>{
        console.log(value);
        this.setState({
          daysStartTime:value
        });
      }

      onDaysEndTimeChange=(value)=>{
        this.setState({
          daysEndTime:value
        });
      }

      onEndStartTimeChange=(value)=>{
        this.setState({
          endStartTime:value
        })
      }

      onEndendTimeChange=(value)=>{
        this.setState({
         endEndTime:value
        })
      }

      handleDaysEnable=()=>{
        this.setState({
          daysEnabled:!this.state.daysEnabled
        });
      }

      handleEndEnable=()=>{
        this.setState({
         endEnabled:!this.state.endEnabled
        });
      }

      convertTime=(time12h)=>{
        const [time, modifier] = time12h.split(' ');

          let [hours, minutes] = time.split(':');

          if (hours === '12') {
            hours = '00';
          }

          if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
          }

          return `${hours}:${minutes}`;
      }

      





      generateEvevntColumn1=(time)=>{
        let T=this.convertTime(time);

        const DataT=this.state.selectedDays.map((item,index)=>{

          if(!this.state.endEnabled)
          {
            if(index===0 || index===6)
            {
              return(
                <td className={this.state.selectedDateIndex === index ? 'today':''} style={{backgroundColor:'white'}}>
                        
                       </td>
              )
            }
          }
           if(!this.state.daysEnabled)
           {
             if(index>0 && index<6)
             {
              return(
                <td className={this.state.selectedDateIndex === index ? 'today':''} style={{backgroundColor:'white'}}>
                        
                       </td>
              )
             }
           }


          if((T<this.state.daysStartTime || T>this.state.daysEndTime) && this.state.daysEnabled && index>0 && index<6)
          {
            return(
              <td className={this.state.selectedDateIndex === index ? 'today':''} style={{backgroundColor:'white'}}>
                      
                     </td>
            )
          }

          if((T<this.state.endStartTime || T>this.state.endEndTime ) && this.state.endEnabled &&(index===0 || index===6))
          {
            return(
              <td className={this.state.selectedDateIndex === index ? 'today':''} style={{backgroundColor:'white'}}>
                      
                     </td>
            )
          }


          for(let i=0;i<this.state.eventArray.length;i++)
          {
            let event=this.state.eventArray[i];
            for(let j=0;j<event.length;j++)
            {
              let startTime=`${new Date(event[j].start.dateTime).getHours()}:${new Date(event[j].start.dateTime).getMinutes()}`;
              let endTime=`${new Date(event[j].end.dateTime).getHours()}:${new Date(event[j].end.dateTime).getMinutes()}`;
                 if(T>=startTime && T<=endTime)
                 {

                   let date=new Date(event[j].start.dateTime).getDate();

                   if(date===new Date(item).getDate())
                   {
                    // console.log(event[j]);
                     return (
                      <td key={index} id={`uncontrolled-${j}-${i}`} className={this.state.selectedDateIndex === index ? 'today':''} style={{backgroundColor:'#e1e1e1'}}>
                      <UncontrolledTooltip placement="left" target={`uncontrolled-${j}-${i}`}>
                      <p> {startTime}-{endTime}</p>
                      <p> {event[j].summary} </p>
                      </UncontrolledTooltip>
                       </td>
                     )
                   }
                   else if(date!==new Date(item).getDate()){
                    continue;
                  } 
                 }
                else
                {
                  continue;
                }
                             
            }
          }

          return (
            <td key={index} id={`uncontrolled-${index}`} className={this.state.selectedDateIndex === index ? 'today':''} style={{backgroundColor:'#FAB83B'}}> 
           </td>
          )
        });
       // console.log(DataT);
        return DataT;
      }


    render()
    {
        const { hoverRange, selectedDays } = this.state;

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };

    const dateHeader=this.state.selectedDays.map((item,index)=>{

      let month=new Date(item).getMonth()+1;
      let dateArray=item.toString().split(' ');

      return (
        <th key={index} className={this.state.selectedDateIndex===index ? 'today1':''}>
          {dateArray[2]} / {month} {dateArray[0]}
        </th>

      )


    });




   

    const generateTable=TimeText.map((item,index)=>{


      return (
        
        <tr id={index} key={index}>
        <th scope="row">
          {item}
        </th>
        
        {this.generateEvevntColumn1(item)}

      </tr>
      )
    });
    if(!this.state.isLoggedIn)
      return (
        <div className="main">
        <div className="container" style={{height:"100%"}}>
            <div className="row syncbtn">
                <Button id="sign" color="success" onClick={()=>this.handleAuthClick()}>
                    Sync Google Calendar
                </Button>
                <Button onClick={()=>this.getEvent()}>
                </Button>
            </div>
        </div>
    </div>
        
      )

      else
        return (
            <React.Fragment>
            <div className="bg-img1">
                <div className="container">
                    <div className="row pt-3">
                       <div className="col-md-12 timestamp"> 
                                <Clock format={'HH:mm'} ticking={true} timezone={'Asia/Kolkata'} />
                                    {" . "}
                                        <Clock format={'dddd'} timezone={'Asia/Kolkata'}/>
                           </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 times">
                        <Clock format={'Do MMMM,YYYY'} ticking={true} timezone={'Asia/Kolkata'}/>
                        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 half-align">
                        <Card style={{borderRadius:'15px'}}>
                            <CardBody className="p-0">
                                <Button id="calendar-id" style={{width:'100%',borderRadius:'15px'}} outline >
                                {selectedDays.length === 7 && (
                                    <div>
                                        {moment(selectedDays[0]).format('LL')} –{' '}
                                        {moment(selectedDays[6]).format('LL')}
                                    </div>
                                    )}
                                </Button>
                            </CardBody>
                        </Card>
                        </div>
                        <div className="col-md-2 offset-md-2 half-align" style={{backgroundColor:'#0453A0'}}>
                                <Card style={{borderRadius:'15px',backgroundColor:'#0453A0',height:'100%'}}>
                                    <CardBody className="p-0 d-flex justify-content-center align-items-center">
                                        Calendar
                                    </CardBody>
                                </Card>
                        </div>
                        <div className="col-md-3 half-align offset-md-2">
                        <ButtonGroup style={{width:'100%',height:'100%'}}>
                        <Button style={{backgroundColor:'#FAB73B'}}>Week</Button>
                        <Button style={{backgroundColor:'white',color:'black'}}>Month</Button>
                      </ButtonGroup>
                        </div>
                    </div>
                </div>
                <Popover isOpen={this.state.showCalendar} target="calendar-id" toggle={this.toggleCalendar} placement="bottom">
                        <div className="SelectedWeekExample">
                          
                                      <DayPicker
                                        selectedDays={selectedDays}
                                        showWeekNumbers
                                        showOutsideDays
                                        modifiers={modifiers}
                                        onDayClick={this.handleDayChange}
                                        onDayMouseEnter={this.handleDayEnter}
                                        onDayMouseLeave={this.handleDayLeave}
                                        onWeekClick={this.handleWeekClick}
                                        />                                   
                            </div>
                        </Popover>
            </div>
            <div style={{backgroundColor:'#F6F6F6'}}>
            <div className="container p-3">
                <div className="row p-3" style={{borderBottom:'5px solid #D3D3D3'}}>
                    <div className="col-md-5 m-2 d-flex" style={{justifyContent:'space-evenly'}}>
                      <img src="assests/Group2.png" height="40" width="40" alt="avail"/>
                      <span>
                     <h3> General Availability</h3>
                     </span>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-md-6 p-2">
                        <div className="row mt-3">
                            <div className="col-md-6 d-flex justify-content-center align-items-center" style={{flexDirection:'column'}}>
                               <p className="weekdays">Weekdays (Mon-Fri)</p>
                               <p style={{color:'grey'}}>Available From</p>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center align-items-center" style={{flexDirection:'column'}}>
                            <div className="disable" onClick={()=>this.handleDaysEnable()}>
                                { this.state.daysEnabled && <img src="assests/Group.png" height="40" width="40" alt="anything"/>}
                            </div>
                            <p style={{fontWeight:'400'}}> {this.state.daysEnabled ? 'Enabled' : 'Disabled'} </p>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-4 ml-1">
                                <TimePicker onChange={(value)=>this.onDaysStartTimeChange(value)} value={this.state.daysStartTime}/>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                  <p>to</p>
                            </div>
                            <div className="col-md-4">
                                <TimePicker onChange={(value)=>this.onDaysEndTimeChange(value)} value={this.state.daysEndTime}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-2" style={{borderLeft:'2px solid #cecece'}}>
                    <div className="row mt-3">
                        <div className="col-md-6 d-flex justify-content-center align-items-center" style={{flexDirection:'column'}}>
                           <p className="weekdays">Weekends (Sat-Sun)</p>
                           <p style={{color:'grey'}}>Available From</p>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center" style={{flexDirection:'column'}}>
                        <div className="disable" onClick={()=>this.handleEndEnable()}>
                        { this.state.endEnabled && <img src="assests/Group.png" height="40" width="40" alt="anything"/>}
                    </div>
                    <p style={{fontWeight:'400'}}> {this.state.endEnabled ? 'Enabled' : 'Disabled'} </p>
                    
                        </div>
                    </div>
                    <div className="row mt-2">
                            <div className="col-md-4 ml-1">
                                <TimePicker onChange={(value)=>this.onEndStartTimeChange(value)} value={this.state.endStartTime}/>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center align-items-center">
                                  <p>to</p>
                            </div>
                            <div className="col-md-4">
                                <TimePicker onChange={(value)=>this.onEndendTimeChange(value)} value={this.state.endEndTime}/>
                            </div>
                        </div>
                </div>
                </div>
               
            </div>

            </div>
            <div className="p-3" style={{backgroundColor:'#F6F6F6'}}>
              <div className="container">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center align-items-center p-3">
                    <div className="orange mr-2"></div>
                    <span style={{fontSize:'small'}}>Available</span>
                    <div className="grey ml-2 mr-2"></div>
                    <span style={{fontSize:'small'}}>Busy (Hover over it to get details) </span>
                  </div>
                </div>
              </div>
            
            </div>
          <div style={{backgroundColor:'#F6F6F6'}}>
            <div className="container">
              <div className="app-calendar">
                  <Table bordered responsive className="table-body">
                    <thead>
                      <tr>
                        <th>
                         <Badge color="secondary"> {this.state.utc} </Badge>
                        </th>
                        {dateHeader}
                      </tr>
                    </thead>
                    <tbody >
                      {generateTable}
                    </tbody>
                  </Table>
              </div>
            </div>
          </div>
            </React.Fragment>
        )
    }

}

export default EventCalendar;

// <br/>
// <Clock className="times" format={'Mo MMMM,YYYY'} timezone={'Asia/Kolkata'}/>
// </h2>