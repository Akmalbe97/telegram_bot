export default class BaseError extends Error {
  status: number;
  errors: any[];
  constructor(message: string, status: number, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this,BaseError.prototype)

  }

  static badRequest(message: string, errors: any[] = []): BaseError {
    return new BaseError(message, 400, errors)
  }
}