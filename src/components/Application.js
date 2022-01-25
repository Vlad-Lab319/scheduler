import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];



export default function Application(props) {
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState(['test']);
  // const [appointmets, setAppointments] = useState({});


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  let dailyAppointments = [];
  let dayInterviewers = [];

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      // console.log('Fetched data: ', "days", all[0].data, "app", all[1].data, "int", all[2].data);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
      .catch(err => console.log(err.message)
      );
  }, []);

  dailyAppointments = getAppointmentsForDay(state, state.day);
  dayInterviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    // console.log("Booking an interview: ", id, interview);
    console.log("Int Id: ", id, 'interview: ', interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // console.log("New appointment: ", appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (

      axios.put(`api/appointments/${id}`, appointment)
        .then((res) => {
          console.log(res);
          setState({
            ...state,
            appointments
          });

        })
        .catch(err => console.log(err.message))
    );

  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">

        {dailyAppointments.map(appointment => {

          const interviewDetails = getInterview(state, appointment.interview);
          console.log("InterviewDetails: ", interviewDetails);
          // return <Appointment key={appointment.id} {...appointment} />
          return <Appointment key={appointment.id} {...appointment} interview={interviewDetails} interviewers={dayInterviewers} bookInterview={bookInterview} />

        })}

      </section>
    </main>
  );
}
