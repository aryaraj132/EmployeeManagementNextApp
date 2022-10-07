export class BadRequest {
  errors;

  constructor(errors) {
    this.errors = errors;
  }
}

export class AccessDenied {
  errors;

  constructor(errors) {
    this.errors = errors;
  }
}
