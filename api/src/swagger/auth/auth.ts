export const signUp = {
  tags: ['Auth'],
  description: 'Sign-up new User',
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
    '201': {
      description: 'User create operation status',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
              },
            },
          },
          example: {
            status: 'Success',
          },
        },
      },
    },
    '500': {
      description: 'Error create user status',
      content: {
        'application/json': {
          example: {
            errors: {
              message: 'This email already used',
            },
          },
        },
      },
    },
  },
};

export const login = {
  tags: ['Auth'],
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

export const logout = {
  tags: ['Auth'],
  description: 'Logout User',
  responses: {
    '200': {
      description: 'User logout done status',
    },
  },
};
