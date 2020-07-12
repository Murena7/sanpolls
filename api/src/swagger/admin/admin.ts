export const putUserToAdmin = {
  tags: ['Admin'],
  description: 'User to Admin',
  summary: '[AUTH: ADMIN]',
  parameters: [
    {
      in: 'path',
      name: 'userId',
      schema: {
        type: 'string',
      },
      description: 'User ID',
    },
  ],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            status: 'Success',
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};

export const postAddVoice = {
  tags: ['Admin'],
  summary: '[AUTH: ADMIN]',
  description: 'Add Voice to ANY Account',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
            },
            amount: {
              type: 'number',
            },
          },
        },
        example: {
          userId: 'da25ca78-e2ae-4b3d-bff0-2668747d8f89',
          amount: 100,
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            status: 'Success',
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};

export const postPollCreate = {
  tags: ['Admin'],
  summary: '[AUTH: ADMIN]',
  description: 'Create new Poll-Event REQUIRED: ADMIN Permission',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
            endMessage: {
              type: 'string',
            },
            startDate: {
              type: 'date',
            },
            endDate: {
              type: 'date',
            },
            status: {
              type: 'enum',
            },
            type: {
              type: 'enum',
            },
          },
        },
        example: {
          name: 'Test Event',
          message: 'Test Message',
          endMessage: 'Test End Message',
          startDate: '2011-10-05T14:48:00.000',
          endDate: '2011-10-05T14:48:00.000',
          status: 'active',
          type: 'infinite',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Successful create poll-event',
      content: {
        'application/json': {
          example: {
            data: {
              name: 'Test Event',
              message: 'Test Message',
              endMessage: 'Test End Message',
              startDate: '2011-10-05T11:48:00.000Z',
              endDate: '2011-10-05T11:48:00.000Z',
              status: 'active',
              type: 'infinite',
              createdAt: '2020-07-08T10:49:59.090Z',
              updatedAt: '2020-07-08T10:49:59.090Z',
              id: '5cd0d003-d594-4a41-b64e-962c5a0f9a1c',
            },
          },
        },
      },
    },
    '401': {
      description: 'Error create user status',
      content: {
        'application/json': {
          example: {
            errors: {
              message: 'Unauthorized',
            },
          },
        },
      },
    },
    '500': {
      description: 'Validation or other error',
    },
  },
};

export const getAllUsers = {
  tags: ['Admin'],
  summary: '[AUTH: ADMIN]',
  description: 'Get All Users',
  parameters: [
    {
      in: 'query',
      name: 'take',
      schema: {
        type: 'integer',
      },
      description: 'result count',
    },
    {
      in: 'query',
      name: 'skip',
      schema: {
        type: 'integer',
      },
      description: 'result skip',
    },
  ],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            data: [
              {
                id: 'd7dad88f-f8f6-409a-b62e-8cc598829232',
                username: null,
                email: 'test1@test.com',
                role: 'admin',
                voiceBalance: 0,
                status: 'active',
                emailConfirmed: true,
                lastLogin: null,
                createdAt: '2020-07-11T21:30:40.476Z',
                updatedAt: '2020-07-11T21:30:40.476Z',
              },
            ],
            count: 1,
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};

export const getAllPolls = {
  tags: ['Admin'],
  summary: '[AUTH: ADMIN]',
  description: 'Get All Polls',
  parameters: [
    {
      in: 'query',
      name: 'take',
      schema: {
        type: 'integer',
      },
      description: 'result count',
    },
    {
      in: 'query',
      name: 'skip',
      schema: {
        type: 'integer',
      },
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
            count: 1,
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};

export const getAllTransactions = {
  tags: ['Admin'],
  summary: '[AUTH: ADMIN]',
  description: 'Get All Transactions',
  parameters: [
    {
      in: 'query',
      name: 'take',
      schema: {
        type: 'integer',
      },
      description: 'result count',
    },
    {
      in: 'query',
      name: 'skip',
      schema: {
        type: 'integer',
      },
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
            count: 1,
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};

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
