<Div align="center">

## :video_game: AFK & Chill :heart:

Team Members: Karen, Steven, Kalvin

</div>

</br>

<strong> Live Application: <--Live Link here --> </strong>
<strong>App type:</strong> Fullstack Serverless App<br/>
<strong>Description:</strong> A dating designed for applications for gamers.
<br/>
</br>

<details>

<summary> :key: &nbsp; INSTALLATION INSTRUCTIONS HERE! </summary>
<br/>
<b>React Client </b> <br/>
<ol>
    <li>Clone the <a href="https://github.com/BCIT-SSD-2020-21/front-end-team1.git">AFK & Chill Repo</a> to your Local machine</li>
    <li>Navigate to the project directory then type `npm install` in the command line</li>
    <li>Create your own cognito user pool in AWS & Twitch developer API at https://dev.twitch.tv/</li>
    <li>Create a config.json file in the src folder with: </li>
    ```json
    {
        "cognito": {
            "REGION": "COGNITO_REGION",
            "USER_POOL_ID": "COGNITO_USER_POOL_ID",
            "APP_CLIENT_ID": "COGNITO_APP_CLIENT_ID"
        },
        "twitch": {
            "CLIENT_ID": "TWITCH_CLIENT_ID",
            "CLIENT_SECRET": "TWITCH_CLIENT_SECRET"
        }
    }
    ```
</ol>
</details>

</br>

## :bookmark_tabs: &nbsp; FEATURE LIST

### Core Application Features

1. A like, pass, on a profile
2. User can send messages
3. users can see who likes them and have option to like them back.
4. users can click next to view another profile
5. match with gender and games (you wont see profiles )

### Nice-To-Have Features

1. Match with people that actually play the game (hard code). Ex. Hours played in game. Allows user to enter how many hours in game.
2. User can only respond to the posts, if both users like each other
3. filter how many profiles you can see.

### Functional Requirements

1. Like or dislike (to pass) the matches
2. login / sign up
3. The system will require a database that stores messages, and user data.

### Non-functional Requirements

1.
2.
3.
4.
5.

## :file_folder: &nbsp; SUPPORTING DOCUMENTS

### Database Diagram:

<img src="https://i.imgur.com/To9YczG.png" alt="Low Fidelity for AFK & Chill" width="100%" />

</br>

### Low-Fidelity Prototype:

Login:
<img src="https://i.imgur.com/em7g9HG.png" alt="Low Fidelity for AFK & Chill" width="100%" />

Register:
<img src="https://i.imgur.com/9LRtxFp.png" alt="Low Fidelity for AFK & Chill" width="100%" />

User bio:
<img src="https://i.imgur.com/iQiwQLu.png" alt="Low Fidelity for AFK & Chill" width="100%" />

Match selection:
<img src="https://i.imgur.com/O41YY8e.png" alt="Low Fidelity for AFK & Chill" width="100%" />

Creating a post:
<img src="https://i.imgur.com/aIuVUL1.png" alt="Low Fidelity for AFK & Chill" width="100%" />

All posts:
<img src="https://i.imgur.com/oIYj8VU.png" alt="Low Fidelity for AFK & Chill" width="100%" />

Messaging:
<img src="https://i.imgur.com/PYmLIM4.png" alt="Low Fidelity for AFK & Chill" width="100%" />

## References / Resources
