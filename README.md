# Fullstack Bank Website

I have created a Bank website using backend [MongoDB / Mongoose ] and frontend [React].
I have used Material UI for the sign-up and sign-in pages.

## Links

- Backend : https://bank-api-backend-using-mongoose.onrender.com/
- Frontend : https://bank-mongoose-frontend.netlify.app/

## About

- You can create new account.
- You can log-in to your account.
- I used bcrypt to hash the password.
- I saved each user token and info in the Local-Storage.

- I have used axios package to connect my backend with my frontend.
- The Home page shows all the clients in the bank with all of their details ,
  ID , Name , Email , Cash , Credit , Activision Status.
  You will also find a more info button next to each user info , when u click on it it will take you
  to the client's page where you will be able to Deposit Cash , Withdraw Money , Update Credit and Transfer Money.

- Next to the more info button you will also find an "X" , this X deletes the client from the database.
- You can add new client to the bank by clicking on the "Add new Client" button.
- You can sort the database by Cash in ascending / descending order.

## Things to know

- Each client has a unique ID , when you create a new client , his ID will be +1 than the current highest ID in the database.
- Each client has a unique email , so you cant create a client with the same email as other client.
- If you don't provide cash or credit , the default value will be 0.
- Active clients can't transfer money to inActive clients.
- InActive clients can't Deposit , Withdraw and transfer money to other clients.
- You can Deposit Cash and Update credit to any value you want.
- If you withdraw money more than the Cash you have in the bank , you will withdraw from your credit.
- If you transfer money more than the Cash you have in the bank , you will transfer from your credit.
- When you transfer money to a client , the other client will receive the money as credit.

## Errors

- Cant deposit negative Cash.
- Cant withdraw negative Cash.
- Cant update credit to negative credit.
- Cant transfer negative money.
- Cant transfer money to yourself.

## Preview

![Alt text](./src/assets/home.png)
![Alt text](./src/assets/client-page.png)
![Alt text](./src/assets/create-acc.png)
