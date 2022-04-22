const handlingErrors = ( error, req, res, next) => {
  try {
    const errorName = error.name

    const ERRORS_STATUS = {
      UnauthorizedError: res.status(401).json({message: "No estás autorizado para hacer esto", error}),
      ValidationError: res.status(401).json({message: "Error de validación", error}),
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