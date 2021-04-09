export class DocumentNotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'DocumentNotFoundError';
  }
}
