import { Request, Response } from "express"

export class AuthController {

  constructor() {

  }

  registerUser = (req: Request, res: Response) => {

    res.json('RegisterUser controller')

  }

  loginUser = (req: Request, res: Response) => {

    res.json('LoginUser controller')

  }

}