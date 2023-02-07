# My Application to the backend position Assessment

## Database Implentation:
- [MongoDB](https://www.mongodb.com/)

## NextJS Plugins
- [Mongoose/MongoDB](https://docs.nestjs.com/recipes/mongodb)


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

