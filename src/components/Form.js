import React from 'react';

// Form in Connect Page
function Form() {
  console.log('in Form');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Name and Email Entered
    if (
      event.target.name.value.length > 0 &&
      event.target.email.value.length > 0
    ) {
      console.log('---- Form Submission Acceptable ----');
      console.log('Name: ' + event.target.name.value);
      console.log('Email: ' + event.target.email.value);
      // Comment filled
      if (event.target.comment !== null) {
        console.log('Comment: ' + event.target.comment.value);
      }
      // Comment empty
      else {
        console.log('Comment: N/A');
      }
    }
    // Empty Name or Email
    else {
      console.warn('You must enter your name and email to submit!');
      window.alert('Please enter a valid name and email!');
    }
  };

  return (
    <div className="container mx-auto my-auto text-center form">
      <form
        className="connect form w-50 mx-auto mt-5 p-3"
        onSubmit={handleSubmit}
      >
        <h2 className="h1 mt-2 mb-4">Let's Connect!</h2>
        <div className="form-group mx-auto my-2">
          <label className="py-2" for="name">
            Name
          </label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="form-group mx-auto my-2">
          <label className="py-2" for="email">
            Email
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="form-group mx-auto my-2">
          <label className="py-2" for="comments">
            Comments
          </label>
          <textarea className="form-control" id="comments" rows="4"></textarea>
        </div>
        <div className="row form-group mx-auto mb-2">
          <input
            className="col btn btn-primary my-2 px-5"
            type="submit"
            name="submit"
            value="Submit"
          />
          <input
            className="col btn btn-secondary mx-1 my-2 px-5"
            type="reset"
            name="reset"
            value="Reset"
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
