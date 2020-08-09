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
    {
      in: 'query',
      name: 'filter',
      schema: {
        type: 'string',
      },
      description: 'filter by email',
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
