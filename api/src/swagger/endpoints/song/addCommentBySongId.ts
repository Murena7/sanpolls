export const addCommentBySongId = {
  tags: ['Song'],
  summary: '[AUTH]',
  description: 'Add coment by song ID',
  parameters: [
    {
      in: 'query',
      name: 'id',
      schema: {
        type: 'string',
      },
      description: 'Song Id',
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            commentText: {
              type: 'string',
            },
          },
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
            data: {},
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
