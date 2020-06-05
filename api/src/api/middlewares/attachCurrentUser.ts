import { Container } from 'typedi';
import { Logger } from 'winston';
import { User } from '../../entity/user';
import { getRepository } from 'typeorm';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger: Logger = Container.get('logger');
  try {
    const UserModel = getRepository(User);
    const userRecord = await UserModel.findByIds([req.token._id]);
    if (userRecord.length <= 0) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord[0];
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
