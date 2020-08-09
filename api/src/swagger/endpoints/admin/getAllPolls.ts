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
