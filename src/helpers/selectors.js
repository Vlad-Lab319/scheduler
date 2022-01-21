
const getAppointmentsForDay = function(state, day) {
// export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(el => el.name === day);
  
  if (!filteredDay) {
    return [];
  }

  const result = filteredDay.appointments.map(appKey => state.appointments[appKey]);
    
  // console.log(state.appointments['1']);
  // console.log(result);
  return result; 
  // return [{"id": 4, "interview": null, "time": "3pm"}, {"id": 5, "interview": {"interviewer": 2, "student": "Chad Takahashi"}, "time": "4pm"}];
};

const getInterview = function(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewToRender = {...interview, interviewer: state.interviewers[`${interview.interviewer}`]};  
  console.log(interviewToRender);
  return interviewToRender;
}

module.exports = { getAppointmentsForDay, getInterview }
