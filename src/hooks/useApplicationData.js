import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

//Initial state

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  const setDay = day => setState({ ...state, day });

//Fetch data from server

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
      .catch(err => console.log(err.message)
      );
  }, []);

//Make an appointment

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const getDay = state.days.find(day => day.appointments.includes(id));
    const days = state.days.map(day => {
      if (
        day.name === getDay.name & state.appointments[id].interview === null
      ) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });

    return (

      axios.put(`api/appointments/${id}`, appointment)
        .then((res) => {
          setState({
            ...state,
            appointments,
            days
          });

        })
    );

  }

//Cancel an appointment

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const getDay = state.days.find(day => day.appointments.includes(id));
    const days = state.days.map(day => {
      if (day.name === getDay.name) {
        return { ...day, spots: day.spots + 1 };
      }
      else {
        return day;
      }
    });

    return (

      axios.delete(`api/appointments/${id}`, appointment)
        .then((res) => {
          setState({
            ...state,
            appointments,
            days
          });

        })
    );

  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

};