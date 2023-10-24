Hi there, 

Thanks for taking the time to review my assesment for Stan, please follow the instructions below to view the application:

1. ensure your node version is >= 20 (this application was built using v20.6.1). You can easily switch between versions with NVM. 

2. navigate to `backend` directory
3. install dependencies `npm install`
4. run `npn run start`

5. navigate to `frontend` directory
6. install dependencies `npm install`
7. run `npn run dev`


Notes: 
- I went with Vite, Tailwindcss, React context, Express server since these are all tools I am fimilar with 
- I've tried to keep it simple, the AppContext is reponsible for storing and updating the program list state, it is easy to share between components in the dom tree
- If I had more time I would defintately add some tests using vitest
- If I were to approach this again I think I would use a UI framework like material UI to save time