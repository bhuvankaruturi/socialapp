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
            userImage: 'https://www.image.com',
            body: 'post content',
            createdAt: '2020-01-28T01:10:01.056Z',
            likes: 2,
            commentsCount: 2
        }
    ],
    comments: [
        {
            username: 'user',
            userImage: 'https://www.userImage.com',
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
    ],
    notifications: [
        {
            createAt: '2020-01-28T01:10:01.056Z',
            recipient: 'user 1',
            sender: 'user 3',
            type: 'like | comment',
            read: 'true | false',
            postId: 'asyAhakaAyqu157'
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