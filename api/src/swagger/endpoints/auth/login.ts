export const login = {
  tags: ['Auth'],
  summary: '[PUBLIC]',
  description: 'Login User',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
        },
        example: {
          email: 'asdasd@ukr.net',
          password: 'asdasd123123123',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'User create operation status',
      content: {
        'application/json': {
          example: {
            data: {
              id: 'da25ca78-e2ae-4b3d-bff0-2668747d8f89',
              username: null,
              email: 'test1@test.com',
              role: 'user',
              voiceBalance: 0,
              status: 'active',
              lastLogin: null,
              createdAt: '2020-07-07T21:16:36.455Z',
              updatedAt: '2020-07-07T21:16:36.455Z',
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
  },
};
