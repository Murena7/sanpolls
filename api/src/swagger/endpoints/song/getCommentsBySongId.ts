export const getCommentsBySongId = {
  tags: ['Song'],
  summary: '[PUBLIC]',
  description: 'Get Song Comments by song ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      schema: {
        type: 'string',
      },
      description: 'Song ID',
    },
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
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
