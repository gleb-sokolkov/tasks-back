import { headerStub } from './../stubs/auth.stubs';
export const AuthService = jest.fn().mockReturnValue({
  login: jest.fn().mockResolvedValue(headerStub()),
  registration: jest.fn().mockResolvedValue(headerStub()),
});
