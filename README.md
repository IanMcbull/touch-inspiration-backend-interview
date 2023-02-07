# My Application to the backend position Assessment

## Database Implentation:
- [MongoDB](https://www.mongodb.com/)

## NextJS Plugins
- [Mongoose/MongoDB](https://docs.nestjs.com/recipes/mongodb)

## Package manager that I used

- [pnpm](https://pnpm.io/motivation)

## Running the App locally
Clone or donwload the project files and run npm or pnpm install in your terminal
```
npm i
npm start:dev 
```
or 

```
pnpm i
pnpm start:dev
```

This will install the project dependancies and create a node_modules folder in the root directory

Once the packages have been donwloaded run `npm start:dev` or `pnpm start:dev` to run the development server



## Endpoints

Get Users

```curl

GET http://localhost:3000/users

```

Response

```json
[
    {
        "_id": "63e215bcac395fdb46c98c10",
        "userID": "ed5fab6d-332c-476e-9603-62086e58feab",
        "username": "Caro Mugenya",
        "wallets": [
            {
                "walletname": "Caro Wallet",
                "balance": 4900
            },
            {
                "walletname": "Caro Wallet Two",
                "balance": 5800
            },
            {
                "walletname": "Car Wallet Three",
                "balance": 9200
            }
        ],
        "totalWalletBalances": 19900,
        "__v": 0
    }
]

```

## Creating a User

The first requirement was that a user can sign up:

```curl
POST http://localhost:3000/users

{
    "username":"Jane Doe"
}

```
## Response

```json
{
    "userID": "e69aa2fb-f19c-4c22-8452-93c9d538088b",
    "username": "Jane Doe",
    "wallets": [],
    "totalWalletBalances": 0,
    "_id": "63e225d97c39111e53497d73",
    "__v": 0
}
```

A username needs to be provided for the request to be successfull. You can also provide the wallets array which is an array of wallets.

```curl
POST http://localhost:3000/users

{
 "username":"Jack Doe",
 "wallets":[
     {"walletname":"Jacks Wallet","balance":900},
     {"walletname":"Jacks Wallet Two","balance":1900}
 ]
}

```

## Response

```json
{
    "userID": "b8a5cb2c-bcb8-4dfb-8dab-e00e91c3ff3c",
    "username": "Jack Doe",
    "wallets": [
        {
            "walletname": "Jacks Wallet",
            "balance": 900
        },
        {
            "walletname": "Jacks Wallet Two",
            "balance": 1900
        }
    ],
    "totalWalletBalances": 2800,
    "_id": "63e2264c7c39111e53497d75",
    "__v": 0
}

```

You can also add expenses and income arrays to the wallets array.


```curl
POST http://localhost:3000/users

{
    "username": "Jack Harrington",
    "wallets": [
        {
            "walletname": "Jacks Wallet",
            "balance": 900,
            "expenses": [
                {"expense_name":"Bought some bad crypto","amount":89},
                {"expense_name":"Bought some more","amount":189}
            ],
            "income":[
                {"income_name":"Made some money on a crypto deal","amount":89},
                {"income_name":"Made some money on a crypto deal","amount":89}
            ]
        },
        {
            "walletname": "Jacks Wallet Two",
            "balance": 1900
        }
    ]
}
```

## Response

```json
{
    "userID": "51481ce6-3ca6-4977-ac62-a62b75c0d3f0",
    "username": "Jack Harrington",
    "wallets": [
        {
            "walletname": "Jacks Wallet",
            "balance": 900,
            "expenses": [
                {
                    "expense_name": "Bought some bad crypto",
                    "amount": 89
                },
                {
                    "expense_name": "Bought some more",
                    "amount": 189
                }
            ],
            "income": [
                {
                    "income_name": "Made some money on a crypto deal",
                    "amount": 89
                },
                {
                    "income_name": "Made some money on a crypto deal",
                    "amount": 89
                }
            ]
        },
        {
            "walletname": "Jacks Wallet Two",
            "balance": 1900
        }
    ],
    "totalWalletBalances": 2800,
    "_id": "63e22b667c39111e53497d77",
    "__v": 0
}
```

## Creating a Wallet
The second and third requirement was the user needs to be able to create a wallet and add incomes and expenses to it.

```curl
PUT http://localhost:3000/users/857d4106-3d18-4e2c-b46f-0a00a2488c30/wallet/new

{
    "walletname": "Batistas Crypto Three",
    "balance": 1000,
    "expenses": [
        {
            "expense_name": "Bought some bad crypto",
            "amount": 900
        }
    ],
    "income": [
        {
            "income_name": "Invested in cryptp",
            "amount": 700
        }
    ]
}

```
This endpoint takes in a userID as a query parameter.


## Response
```JSON
{
    "_id": "63e1f3c822bba1157f4d233a",
    "userID": "857d4106-3d18-4e2c-b46f-0a00a2488c30",
    "username": "Batista",
    "wallets": [
        {
            "walletname": "Batistas Crypto Wallet",
            "balance": 800,
            "expenses": [
                {
                    "expense_name": "Bought some bad crypto",
                    "amount": 900
                }
            ],
            "income": [
                {
                    "income_name": "Invested in cryptp",
                    "amount": 700
                }
            ]
        },
        {
            "walletname": "Batistas Crypto Two",
            "balance": 1000,
            "expenses": [
                {
                    "expense_name": "Bought some bad crypto",
                    "amount": 900
                }
            ],
            "income": [
                {
                    "income_name": "Invested in cryptp",
                    "amount": 700
                }
            ]
        },
        {
            "walletname": "Batistas Crypto Three",
            "balance": 1000,
            "expenses": [
                {
                    "expense_name": "Bought some bad crypto",
                    "amount": 900
                }
            ],
            "income": [
                {
                    "income_name": "Invested in cryptp",
                    "amount": 700
                }
            ]
        }
    ],
    "__v": 0
}

```


## Getting the user profile

The fourth requirement was that a user can view their profile with the summary of wallets and balances. Show overall balance of all wallets and balance of each wallet.

```curl
GET http://localhost:3000/users/b8a5cb2c-bcb8-4dfb-8dab-e00e91c3ff3c/profile
```

This endpoint also takes in a userID as a query parameter

```json
{
    "_id": "63e2264c7c39111e53497d75",
    "userID": "b8a5cb2c-bcb8-4dfb-8dab-e00e91c3ff3c",
    "username": "Jack Doe",
    "wallets": [
        {
            "walletname": "Jacks Wallet",
            "balance": 900
        },
        {
            "walletname": "Jacks Wallet Two",
            "balance": 1900
        }
    ],
    "totalWalletBalances": 2800,
    "__v": 0
}
```


I tried to implement as much as I possibly and tried to follow as many best practices as I could find online. This was my first time interacting with NestJS. 

### N/B
The database has one user. So you can make a `get` request without adding a new user to make sure the endpoint is working. I've also left the env file in the repo as it contains configuration for communicating with MongoDB. The configuration is however set to expire after one week for security purposes. 