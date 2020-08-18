export const deleteChildCommentByChildCommentId = {
  tags: ['Song'],
  summary: '[AUTH]',
  description: 'Delete ChildComent by ChildComment ID',
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
