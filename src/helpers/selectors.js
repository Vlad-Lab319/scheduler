//Helper functions for managing appointments and interviews.

//List of appointments objects for a particular day in an array

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(el => el.name === day);

  if (!filteredDay) {
    return [];
  }

  return filteredDay.appointments.map(appointmentKey => state.appointments[appointmentKey]);
};

//Interview object decomposition with full information

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  return { ...interview, interviewer: state.interviewers[`${interview.interviewer}`] };
};


//List of interviewers for a particular day in an array

export function getInterviewersForDay(state, day) {
  const interviewersForDay = []
  const filteredDay = state.days.find(el => el.name === day);

  if (!filteredDay) {
    return [];
  }

  const dayInstructors = [...filteredDay.interviewers];
  for (let instructor of dayInstructors) {

  interviewersForDay.push(state.interviewers[instructor]);

  }
  return interviewersForDay;
};

