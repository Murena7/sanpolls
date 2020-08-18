export const getChildCommentsByCommentId = {
  tags: ['Song'],
  summary: '[PUBLIC]',
  description: 'Get Child Comments by Comment ID',
  parameters: [
    {
      in: 'path',
      name: 'commentId',
      schema: {
        type: 'string',
      },
      description: 'comment ID',
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
