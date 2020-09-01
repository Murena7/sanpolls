import { Response } from 'express';
import { UserStatus } from '../../interfaces/user';

const checkAuth = (roles?: string[]) => {
  return (req, res: Response, next) => {
    const message = 'Unauthorized';
    if (!req.isAuthenticated()) {
      return res.status(401).send({ message });
    }

    if (req.user.status === UserStatus.Inactive) {
      //PassportJS Logout
      req.logout();
      return res.status(401).send({ message });
    }

    if (!roles) {
      return next();
    }

    if (roles.indexOf(req.user.role) > -1) {
      return next();
    } else {
      return res.status(401).send({ message });
    }
  };
};

export default checkAuth;
