import { ResponseStatusMessage } from '../../../interfaces/response';

export const postUserPasswordChange = {
  tags: ['User'],
  summary: '[AUTH]',
  description: 'User Change Password',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            newPassword: {
              type: 'string',
            },
            oldPassword: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'User Profile Update',
      content: {
        'application/json': {
          example: {
            example: {
              status: ResponseStatusMessage.Success,
            },
          },
        },
      },
    },
  },
};
