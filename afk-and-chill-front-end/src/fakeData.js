const fakeData = [
    {
      _id: "604830b960d88000078beaed",
      user_one:"60480a01be82a20008c2d887",
      user_two:"04806bc8619c30007ca8f13",
      imageUrl: "https://i.imgur.com/JnE2HOP.png",
      username: "Mongo",

      messages: [
        {
            _id: "60484f3481b08d0008a4370e",
            chat_id:"604830b960d88000078beaed",
            user: {
            _id: "604806bc8619c30007ca8f13",
            username: "Mongo"
            },
            text: "Hi!"

        },
        {   
            _id: "6048509d8cd2ae0008fe2726",
            chat_id:"604830b960d88000078beaed",
            user: {
            _id: "60480a01be82a20008c2d887",
            username: "Kitkat"
            },
            text: "How are you?"
        }
      ]
    }
  ];

  export default fakeData;
  