const apiResponse = {

  success(data, message = "Success") {
    return {
      success: true,
      message,
      data
    };
  },

  error(message = "Error", errors = null) {
    return {
      success: false,
      message,
      errors
    };
  }

};

export default apiResponse;