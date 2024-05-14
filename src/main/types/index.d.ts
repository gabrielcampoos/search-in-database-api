declare namespace Express {
  interface Request {
    user: {
      id: string;
      name: string;
      email: string;
      cpf: string;
      phone: string;
    };
  }
}
