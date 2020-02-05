// Only for reference. Not to be used in actual code

const db = {
    user: [
        { 
            userId: 'asdaewt123wqfasqe221t5',
            email: 'user@domain.com',
            handle: 'user',
            createdAt: '2019-03-15T10:59:52.798Z',
            imageUrl: 'image/asdasdasd3t12t/asdhab32yujsf',
            bio: 'Hello, my name is user, nice to meet you',
            website: 'https://webpage.com',
            location: 'Dallas, USA'
        }
    ],
    posts: [
        {
            username: 'user',
            body: 'post content',
            createdAt: '2020-01-28T01:10:01.056Z',
            likes: 2,
            commentCount: 2
        }
    ],
    comments: [
        {
            username: 'user',
            postId: 'asyAhakaAyqu157',
            body: 'This is a comment',
            createdAt: '2020-01-28T01:10:01.056Z'
        }
    ],
    likes: [
        {
            username: 'user',
            postId: 'asdauuANbvns82r'
        }
    ]
};

const userDetails = {
    // Redux data
    credentials: {
        userId: 'asdaewt123wqfasqe221t5',
        email: 'user@domain.com',
        handle: 'user',
        createdAt: '2019-03-15T10:59:52.798Z',
        imageUrl: 'image/asdasdasd3t12t/asdhab32yujsf',
        bio: 'Hello, my name is user, nice to meet you',
        website: 'https://webpage.com',
        location: 'Dallas, USA'
    },
    likes: [
        {
            username: 'user2',
            postId: 'ahaGnjk2n12Gks987'
        }
    ]
}