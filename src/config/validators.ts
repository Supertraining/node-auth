export class Validators {

  
  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  } 
  /**
   * The password should have at least one uppercase letter, one lowercase letter, one digit, and one special character.
   * The length should be between 8 and 16 characters.
   */
  static get password() {
    return /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  }


}