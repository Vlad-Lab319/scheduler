import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

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

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
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
        // .catch(err => console.log(err.message))
    );

  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (

      axios.delete(`api/appointments/${id}`, appointment)
        .then((res) => {
          console.log(res);
          setState({
            ...state,
            appointments
          });

        })
        // .catch(err => console.log(err.message))
    );

  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
  
};