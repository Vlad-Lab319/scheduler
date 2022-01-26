import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Cancel button behavior 
  const reset = () => {
    setStudent("");
    setInterviewer("");
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  // Validate input form data
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    setError("");
    props.onSave(student, interviewer);
  }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={e => e.preventDefault()} autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            
          />
        </form>
        {error && <section className="appointment__validation">{error}</section>}

          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={setInterviewer}
            interviewer={interviewer}
            selected={props.selected}
            />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* <Button danger onClick={props.onCancel}>Cancel</Button> */}
          <Button danger onClick={cancel}>Cancel</Button>
          {/* <Button confirm onClick={props.onSave(student, interviewer)}>Save</Button> */}
          {/* <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button> */}
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>

  );
}