export const getSongById = {
  tags: ['Song'],
  summary: '[PUBLIC]',
  description: 'Get Single Song Info By ID',
  parameters: [
    {
      in: 'path',
      name: 'id',
      schema: {
        type: 'string',
      },
      description: 'Song ID',
    },
  ],
  responses: {
    '200': {
      description: 'Data',
      content: {
        'application/json': {
          example: {
            data: {
              id: 'f325af9d-9a58-40af-8e80-bd9e1ac348e3',
              userId: '5f655f24-1015-42bf-b56f-00c660b563bd',
              eventId: '42532007-fe14-4a29-8658-83a633e6e775',
              songSinger: 'Сплин',
              songName: 'Привет Андрей',
              coverSinger: 'Путин',
              voiceCount: 300,
              additionalTextInfo: 'Многие думают',
              youtubeVideoId: null,
              createdAt: '2020-07-26T17:01:29.108Z',
              updatedAt: '2020-07-26T17:01:29.108Z',
              user: {
                username: 'user5081611',
              },
              ratingPosition: 2,
            },
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
    },
  },
};
