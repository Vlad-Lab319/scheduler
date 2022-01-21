export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(el => el.name === day);
  // const filteredDay = state.days[0];
  // const refactoredDay = filteredDay.appointments[...state.appointments]
  if (!filteredDay) {
    return [];
  } 
  const result = filteredDay.appointments.map(appKey => state.appointments[appKey]);
    
  console.log(state.appointments['1']);
  console.log(result);
  return result; 
  // return [{"id": 4, "interview": null, "time": "3pm"}, {"id": 5, "interview": {"interviewer": 2, "student": "Chad Takahashi"}, "time": "4pm"}];
}
