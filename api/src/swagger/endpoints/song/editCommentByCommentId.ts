import { ResponseStatusMessage } from '../../../interfaces/response';

export const editCommentByCommentId = {
  tags: ['Song'],
  summary: '[AUTH]',
  description: 'Edit coment by song ID',
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
            status: ResponseStatusMessage.Success,
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
