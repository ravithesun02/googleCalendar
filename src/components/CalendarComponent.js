import React , {Component} from 'react';
import Clock from 'react-live-clock';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import '../css/Event.css';
import { Card, CardBody, Button, Popover,ButtonGroup, Badge, Table } from 'reactstrap';
import TimePicker from 'react-time-picker';
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
        daysEndTime:'07:30',
        endStartTime:'11:30',
        endEndTime:'07:30',
        daysEnabled:true,
        endEnabled:false,
        utc:'GMT+2'
      };

      componentDidMount()
      {
        console.log(this.state.selectedDays[0].toString().split(' '));
        this.setState({
          utc:this.state.selectedDays.toString().split(' ')[5]
        })
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

      let month=item.getMonth();

      let dateArray=item.toString().split(' ');

      return (
        <th key={index}>
          {dateArray[2]} / {month} {dateArray[0]}
        </th>

      )


    });

   const DataT=this.state.selectedDays.map((item,index)=>{
     return (
      <td key={index} className="blankCol"></td>
     )
   })

    const generateTable=TimeText.map((item,index)=>{

      return (
        
        <tr key={index}>
        <th scope="row">
          {item}
        </th>
        {DataT}

      </tr>
      )
    })
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
                        <Clock format={'Mo MMMM,YYYY'} timezone={'Asia/Kolkata'}/>
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
          <div style={{backgroundColor:'#F6F6F6'}}>
            <div className="container">
              <div className="app-calendar">
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>
                         <Badge color="secondary"> {this.state.utc} </Badge>
                        </th>
                        {dateHeader}
                      </tr>
                    </thead>
                    <tbody>
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