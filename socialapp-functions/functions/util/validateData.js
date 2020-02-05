const isValidEmail = (email) => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email.toLowerCase());
}

const isEmpty = (s) => {
    return s.trim() == '';
}

exports.validateSignup = (data) => {
    // user signup details validation
    let errors = {};

    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    else if (!isValidEmail(data.email)) errors.email = 'Must be a valid email address';

    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    else if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';

    if (isEmpty(data.username)) errors.username = 'Must not be empty'

    return {
        errors,
        invalid: Object.keys(errors).length > 0
    }
};

exports.validateLogin = (data) => {
    // user login details validation
    let errors = {};

    if (isEmpty(data.email)) errors.email = "Must not be empty";
    else if (!isValidEmail(data.email)) errors.email = "Must be a valid email address";
    if (isEmpty(data.password)) errors.password = "Must not be empty";

    return {
        errors,
        invalid: Object.keys(errors).length > 0
    }
}

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if (!isEmpty(data.bio)) userDetails.bio = data.bio.trim();
    if (!isEmpty(data.website)) {
        if (data.website.trim().substring(0, 4) !== 'http') {
            userDetails.website = 'http://' + data.website.trim();
        } else {
            userDetails.website = data.website;
        }
    }
    if (!isEmpty(data.location)) userDetails.location = data.location.trim();
    
    return userDetails;
}