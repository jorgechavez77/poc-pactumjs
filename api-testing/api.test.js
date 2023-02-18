const { spec } = require('pactum')

test('should get random male users', async () => {
  await spec()
    .get('https://randomuser.me/api')
    .withQueryParams('gender', 'male')
    .expectStatus(200)
    .expectJsonLike({
      results: [
        {
          gender: 'male',
        },
      ],
    })
})

test('should return all posts and first post should have comments', async () => {
  const postID = await spec()
    .get('http://jsonplaceholder.typicode.com/posts')
    .expectStatus(200)
    .returns('[0].id')

  await spec()
    .get('http://jsonplaceholder.typicode.com/posts/{id}/comments')
    .withPathParams('id', postID)
    .expectStatus(200)
})

test('should return all posts and first post should have comments', async () => {
  await spec()
    .get('http://jsonplaceholder.typicode.com/posts')
    .expectStatus(200)
    .stores('FirstPostId', '[0].id')

  await spec()
    .get(`http://jsonplaceholder.typicode.com/posts/{id}/comments`)
    .withPathParams('id', '$S{FirstPostId}')
    .expectStatus(200)
})
