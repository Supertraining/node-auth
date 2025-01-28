import { Validators } from '../../../config';

export class RegisterUserDto {
  private constructor(public name: string, public email: string, public password: string, public roles: Array<string>) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, roles } = object;
    
    if (!name) return ['Missing name'];
    if (!email) return ['Missing email'];
    if (!Validators.email.test(email)) return ['Email is not valid'];
    if (!password) return ['Missing password'];
    if (!Validators.password.test(password)) return ['Password too short'];
    //Esta funcion devuelve una tupla [string, RegisterUserDto]. En caso de que sea todo correcto devolvera el string como undefined y la nueva instancia del dto.

    return [undefined, new RegisterUserDto(name, email.toLowerCase(), password, roles)];
  }
}
