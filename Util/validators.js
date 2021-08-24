module.exports.validateRegisterInput = ( username, password, confirmPassword ) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }else if(password === ''){
        errors.password = 'Password must not empty';
    }else if(password !== confirmPassword){
        errors.confirmPassword = 'Password must match';
    };
    return {
        errors,
        valid : Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if(password.trim() === ''){
        errors.password = 'Password must not be empty';
    }
    return {
        errors,
        valid : Object.keys(errors).length < 1
    }
}