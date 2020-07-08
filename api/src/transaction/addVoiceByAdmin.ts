import { getManager, Repository } from 'typeorm';
import { User } from '../entity/user';
import { PollTransaction } from '../entity/poll-transaction';
import { plainToClass } from 'class-transformer';
import { TransactionSource } from '../interfaces/poll-transaction';
import { ResponseStatusMessage } from '../interfaces/response';
import { IAddVoiceBody } from '../interfaces/admin';

export const AddVoiceByAdminTransaction = async (body: IAddVoiceBody) => {
  return getManager().transaction('READ COMMITTED', async transactionalEntityManager => {
    const userRepository: Repository<User> = transactionalEntityManager.getRepository(User);
    const pollTransactionRepository: Repository<PollTransaction> = transactionalEntityManager.getRepository(
      PollTransaction,
    );

    const user = await userRepository
      .createQueryBuilder('user')
      .setLock('pessimistic_write')
      .where('user.id = :id', { id: body.userId })
      .getOne();

    if (!user) {
      throw new Error('Wrong User');
    }

    const newPollTransactionData = {
      userId: user.id,
      amount: body.amount,
      source: TransactionSource.ByAdmin,
    };

    const newPollTransaction = await pollTransactionRepository
      .create(plainToClass(PollTransaction, newPollTransactionData, { excludeExtraneousValues: true }))
      .save();

    user.voiceBalance = user.voiceBalance + body.amount;

    await transactionalEntityManager.save(user);

    return ResponseStatusMessage.Success;
  });
};
