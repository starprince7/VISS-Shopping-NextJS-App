/**
 * Every error that occurs here is a bad request of status 400.
 * @param {error} e
 * @returns - { email: "", password: "" };
 */

const schemaErrorHandler = (e) => {
  console.log(e.code);
  let errors = { email: "", firstName: "", lastName: "", password: "" };

  if (e.code === 11000) {
    errors.email = "This email already exist, use another!";
  }

  // Signup error handling Both email & password!
  if (e.message.includes("Account validation failed")) {
    Object.values(e.errors).forEach(({ properties }) => {
      // set first name err
      if (properties.path === "accountContact.email") {
        errors["email"] = properties.message;
      }
      // set first name err
      if (properties.path === "accountInformation.firstName") {
        errors["firstName"] = properties.message;
      }
      // set last name err
      if (properties.path === "accountInformation.lastName") {
        errors["lastName"] = properties.message;
      }
      // set password err
      if (properties.path === "accountSecurity.password") {
        errors["password"] = properties.message;
      }
    });
  }

  // Login error handling for Email!
  if (e.message === "Email not found") {
    errors.email = "This email is not registered";
  }

  // Login error handling for Password!
  if (e.message === "incorrect password") {
    errors.password = "Unauthorized, password is incorrect";
  }

  return errors;
};

export default schemaErrorHandler;
