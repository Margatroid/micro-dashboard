const helpers = {
  getRequestBody: function(service, method) {
    for (let index in service.Endpoints) {
      let endpoint = service.Endpoints[index]
      if (endpoint.Name == method) {
        return JSON.stringify(endpoint.Request, null, 4)
      }
    }
  }
}

export default helpers
