export const getStatisticTotal = {
  tags: ['Admin'],
  description: 'User to Admin',
  summary: '[AUTH: ADMIN]',
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            data: {
              totalUsers: 1,
              totalUsersToday: 1,
              totalTransactions: 0,
              totalTransactionsToday: 0,
            },
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
