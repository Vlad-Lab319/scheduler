export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(el => el.name === day);

  if (!filteredDay) {
    return [];
  }

  return filteredDay.appointments.map(appointmentKey => state.appointments[appointmentKey]);
};

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  // const interviewToRender = {...interview, interviewer: state.interviewers[`${interview.interviewer}`]};  
  // console.log(interviewToRender);
  // return interviewToRender;

  return { ...interview, interviewer: state.interviewers[`${interview.interviewer}`] };
};

export function getInterviewersForDay(state, day) {
  const interviewersForDay = []
  const filteredDay = state.days.find(el => el.name === day);

  if (!filteredDay) {
    return [];
  }

  const dayApp = filteredDay.appointments
  // console.log("DAY APP: ", dayApp);
  for (let app of dayApp) {
    // console.log("app: ", app);
    if (!state.appointments[app].interview) {
      // console.log("No interviews");
      // return [];
    } else {
      // console.log("app_interviewer: ", state.appointments[app].interview.interviewer);
      const interviewerId = state.appointments[app].interview.interviewer;
      // console.log("app_interviewer: ", state.interviewers[interviewerId]);
      interviewersForDay.push(state.interviewers[interviewerId]);

    }
  }
  console.log(interviewersForDay);
  return interviewersForDay;
};

