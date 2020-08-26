import { getManager, Repository } from 'typeorm';
import { User } from '../entity/user';
import { PollTransaction } from '../entity/poll-transaction';
import { plainToClass } from 'class-transformer';
import { ResponseStatusMessage } from '../interfaces/response';
import { IAddVoiceByTypeBody } from '../interfaces/admin';

export const AddVoiceByTypeTransaction = async (body: IAddVoiceByTypeBody) => {
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
      source: body.source,
    };

    const newPollTransaction = await transactionalEntityManager.save(
      pollTransactionRepository.create(
        plainToClass(PollTransaction, newPollTransactionData, { excludeExtraneousValues: true }),
      ),
    );

    user.voiceBalance = user.voiceBalance + body.amount;

    await transactionalEntityManager.save(user);

    return ResponseStatusMessage.Success;
  });
};
