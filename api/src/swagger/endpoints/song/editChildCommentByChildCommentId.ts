export const editChildCommentByChildCommentId = {
  tags: ['Song'],
  summary: '[AUTH]',
  description: 'Edit ChildComent by ChildComment ID',
  parameters: [
    {
      in: 'query',
      name: 'childCommentId',
      schema: {
        type: 'string',
      },
      description: 'childCommentId Id',
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
