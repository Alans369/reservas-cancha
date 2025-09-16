import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const role = request.role;

    console.log(role);

    // Verificamos si el usuario tiene alguno de los roles requeridos
    return this.matchRoles(roles, role);
  }

  private matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
