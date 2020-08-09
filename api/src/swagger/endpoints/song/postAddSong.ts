export const postAddSong = {
  tags: ['Song'],
  summary: '[AUTH]',
  description: 'Add song to poll/event',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            eventId: {
              type: 'string',
            },
            songSinger: {
              type: 'string',
            },
            songName: {
              type: 'string',
            },
            coverSinger: {
              type: 'string',
            },
            voiceCount: {
              type: 'number',
            },
            additionalTextInfo: {
              type: 'string',
            },
            youtubeVideoId: {
              type: 'string',
            },
          },
        },
        example: {
          eventId: '54e62bfb-b6af-49a1-85c6-d8f0a59ba3f9',
          songSinger: 'Сплин',
          songName: 'Привет Андрей',
          coverSinger: 'Путин',
          voiceCount: 1,
          additionalTextInfo: 'Многие думают',
          youtubeVideoId: '',
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
            status: 'Success',
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
