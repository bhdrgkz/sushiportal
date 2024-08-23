const flashMessageEditer = {};

flashMessageEditer.message = (req) => {

    let message_error = req.flash('error');
    let message_success = req.flash('success');
    let message;
    let messageType;

    if (message_error.length > 0) {
        message = message_error[0];
        messageType = "error";
    } else if (message_success.length > 0) {
        message = message_success[0];
        messageType = "success";
    } else {
        message = null;
        messageType = null;
    }

    const messageObj = {
        message: message,
        messageType: messageType
    }

    return messageObj;
}

flashMessageEditer.oldInput = (req) => {
    let oldInput = req.flash('oldInput');
    if (oldInput.length > 0) {
        oldInput = oldInput[0];
    } else {
        oldInput = null;
    }

    return oldInput;
}


module.exports = flashMessageEditer;