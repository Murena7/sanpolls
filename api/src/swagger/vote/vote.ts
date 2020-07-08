export const postGiveVote = {
  tags: ['Vote'],
  summary: '[AUTH]',
  description: 'Vote for Any Song',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            songId: {
              type: 'string',
            },
            voiceCount: {
              type: 'number',
            },
          },
        },
        example: {
          songId: 'e3a17441-ae39-4451-8fa9-464bca451369',
          voiceCount: 5,
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Successful Vote for Song',
      content: {
        'application/json': {
          example: {
            status: 'Success',
          },
        },
      },
    },
    '401': {
      content: {
        'application/json': {
          example: {
            errors: {
              message: 'Unauthorized',
            },
          },
        },
      },
    },
    '500': {
      description: 'Validation or other error',
      content: {
        'application/json': {
          examples: {
            errorLowBalance: {
              value: {
                errors: {
                  message: 'Low Voice Balance',
                },
              },
            },
            errorWrongUserOrSong: {
              value: {
                errors: {
                  message: 'Wrong User or Song',
                },
              },
            },
          },
        },
      },
    },
  },
};
