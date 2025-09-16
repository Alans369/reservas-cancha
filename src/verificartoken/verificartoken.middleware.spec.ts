import { VerificartokenMiddleware } from './verificartoken.middleware';

describe('VerificartokenMiddleware', () => {
  it('should be defined', () => {
    expect(new VerificartokenMiddleware()).toBeDefined();
  });
});
