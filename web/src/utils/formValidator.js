import { checkUsername } from "../services/authApis";

export const validateName = (value) => {
  let error;
  if (!value) {
    error = "Name is required";
  } else if (value.length <= 2) {
    error = "Name must be 3 characters long";
  }
  return error;
};

export const validateUsername = async (value) => {
  let error;
  if (value) {
    if (value.length < 4) {
      error = "Username must be 4 characters long";
    } else if (!/^[a-zA-Z0-9_]+$/) {
      error =
        "Username must be only alphabetical characters, numbers, and underscores";
    } else {
      let usernameExist = await checkUsername(value);
      console.log({usernameExist}, usernameExist.data.data)
      if ( usernameExist.data.data)
        error = "Username choosen by another member of the community";
    }
  }
  return error;
};

export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = "Invalid email address 😱";
  }
  return error;
};

export const validatePassword = (value) => {
  let error;
  if (value.length < 6) {
    error = "Password must be minimum of 6 characters";
  }
  return error;
};
