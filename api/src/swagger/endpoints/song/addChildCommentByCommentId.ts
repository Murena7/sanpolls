export const addChildCommentByCommentId = {
  tags: ['Song'],
  summary: '[AUTH]',
  description: 'Add ChildComent by Comment ID',
  parameters: [
    {
      in: 'query',
      name: 'commentId',
      schema: {
        type: 'string',
      },
      description: 'Comment Id',
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
            data: [{}],
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
