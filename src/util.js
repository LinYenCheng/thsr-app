
function validateData(reduxStatus) {
    // console.log(reduxStatus);
    if (reduxStatus && reduxStatus.data.status && reduxStatus.data.result) {
        return reduxStatus.data.result;
    }
    return 0;
}

export {
    validateData,
}