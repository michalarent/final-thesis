export class PermissionError extends Error {
  private path: string;
  constructor(message: string, path: string) {
    super(message);
    this.path = path;
    this.name = "PermissionError";
  }
}
