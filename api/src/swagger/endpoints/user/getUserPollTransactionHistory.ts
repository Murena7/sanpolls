export const getUserPollTransactionHistory = {
  tags: ['User'],
  summary: '[AUTH]',
  description: 'Get User Poll Transaction History',
  parameters: [
    {
      in: 'query',
      name: 'take',
      schema: {
        type: 'integer',
      },
      default: 50,
      description: 'result count',
    },
    {
      in: 'query',
      name: 'skip',
      schema: {
        type: 'integer',
      },
      default: 0,
      description: 'result skip',
    },
  ],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            data: [],
            count: 4,
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
