import { ResponseStatusMessage } from '../../../interfaces/response';

export const signUp = {
  tags: ['Auth'],
  summary: '[PUBLIC]',
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
            status: ResponseStatusMessage.Success,
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
