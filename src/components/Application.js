import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {
 
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dayInterviewers = getInterviewersForDay(state, state.day);

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
          // console.log("InterviewDetails: ", interviewDetails);
          // return <Appointment key={appointment.id} {...appointment} />
          return <Appointment key={appointment.id} {...appointment} interview={interviewDetails} interviewers={dayInterviewers} bookInterview={bookInterview} cancelInterview={cancelInterview}/>

        })}

      </section>
    </main>
  );
}
