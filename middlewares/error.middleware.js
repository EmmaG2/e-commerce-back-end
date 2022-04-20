const handlingErrors = ( err, req, res, next) => {
  try {
    const errorName = err.name

    const ERRORS_STATUS = {
      UnauthorizedError: res.status(401).json({message: "the user is not authorized", err}),
      ValidationError: res.status(401).json({message: "A Validation error", err}),
      NoError: res.status(200).json({message: 'No errors'})
    }
    const DEFAULT_ERROR = 'NoError'
    const state = ERRORS_STATUS[errorName] || DEFAULT_ERROR
    
    return state
    
  } catch (error) {
    return res.status(500).json({
      message: "error in the server",
      error
    })
  }
}

module.exports = handlingErrors;