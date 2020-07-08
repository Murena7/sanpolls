export const getMe = {
  tags: ['User'],
  description: 'Get User Info',
  summary: '[AUTH]',
  responses: {
    '200': {
      description: 'User Info',
      content: {
        'application/json': {
          example: {
            data: {
              id: 1,
              username: null,
              email: 'test1@test.com',
              role: 'user',
              voiceBalance: 0,
              status: 'active',
              createdAt: '2020-07-05T13:25:54.860Z',
              updatedAt: '2020-07-05T13:25:54.860Z',
              lastLogin: null,
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
