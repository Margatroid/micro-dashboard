function formatEndpoint(input) {
  let output = {}
  if (!input) return output

  input.forEach((field) => {
    let fieldValue

    switch (field.Type) {
      // Strings
      case 'enum':
      case 'string':
      case 'bytes':
      case 'int64':
      case 'fixed64':
      case 'uint64':
      case 'Timestamp':
      case 'Duration':
      case 'FieldMask':
        fieldValue = ''
        break
      // Number
      case 'int32':
      case 'fixed32':
      case 'uint32':
      case 'float':
      case 'float64':
      case 'double':
        fieldValue = 0
        break
      // Leave these types alone for now
      case 'message':
      case 'map':
      case 'Any':
      case 'Struct':
      case 'ListValue':
        fieldValue = field.values
        break
      default:
        fieldValue = formatEndpoint(field.values)
        break
    }

    output[field.name] = fieldValue
  })

  return output
}

const helpers = {
  // Turns the endpoint's proto3 into a JSON compatible request body.
  getRequestBody: function(service, method) {
    for (let index in service.endpoints) {
      let endpoint = service.endpoints[index]
      if (endpoint.name == method) {
        return JSON.stringify(formatEndpoint(endpoint.request.values), null, 4)
      }
    }
  }
}

export default helpers
