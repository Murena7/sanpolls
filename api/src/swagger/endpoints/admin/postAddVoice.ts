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
