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

  return {...interview, interviewer: state.interviewers[`${interview.interviewer}`]};
};
