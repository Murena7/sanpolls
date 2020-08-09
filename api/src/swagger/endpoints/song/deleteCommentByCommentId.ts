export const deleteCommentByCommentId = {
  tags: ['Song'],
  summary: '[AUTH]',
  description: 'Delete coment by song ID',
  parameters: [
    {
      in: 'query',
      name: 'songId',
      schema: {
        type: 'string',
      },
      description: 'Song Id',
    },
    {
      in: 'query',
      name: 'commentId',
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
