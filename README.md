<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://cdn.freebiesupply.com/logos/large/2x/nodejs-1-logo-png-transparent.png" width="100" alt="Express Logo" /></a>
</p>

  <p align="center">This is my implementation for the <a href="https://rutterapi.notion.site/Public-Technical-Take-home-Question-Contractors-only-a989ec40c1b84d399a31e8f7061ea70b" target="_blank">Rutter Challenge</a>, made with Express framework.</p>
    <p align="center">

## Endpoints

| Endpoint                | Description                               | Parameters                                                                                                                                                                                                             |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GET /products/fetch** | Retrieves all the products from Shopify   | **limit**: Number (Query, optional, default=50)                                                                                                                                                                        |
| **GET /orders/fetch**   | Retrieves first 500 orders from Shopify   | None                                                                                                                                                                                                                   |
| **GET /products**       | Retrieves all the products from database. | **page**: Number (Query, optional, default=1) **limit**: Number (Query, optional, default=100) **id**: String (Query, optional) **platform_id**: String (Query, optional) **title**: String (Query, optional)          |
| **GET /orders**         | Retrieves all the orders from database.   | **page**: Number (Query, optional, default=1) **limit**: Number (Query, optional, default=100) **id**: String (Query, optional) **platform_id**: String (Query, optional) **line_items_ids**: String (Query, optional) |

## Response Examples

### GET /products

```bash
{
  "products": [
      {
          "id": "775ad530-d0ef-4261-9c6f-164ec80d6250",
          "name": "14K Yellow Gold Paperclip Chain (2.5mm)",
          "platform_id": "6633861742829"
      },
      {
          "id": "89fe875d-8160-4560-ad55-cecfc5c62b86",
          "name": "2021 Men's Lightweight Tactical Pants Breathable Summer Casual Army Military Long Trousers Male Waterproof Quick Dry Cargo Pants",
          "platform_id": "6633862168813"
      },
      {
          "id": "7d274e44-247e-4c6d-83c0-1db614dae3b4",
          "name": "2021 Spring Black Cropped Vest Coat Women Fashion Warm Sleeveless Parkas High Collar Waistcoat Female Casual Outerwear Chic Top",
          "platform_id": "6633862824173"
      },
      {
          "id": "d6487fef-43a6-45cf-8385-857fdb1891ce",
          "name": "2021 Winter Cotton Down Vest Women Loose Waistcoat Bodywarm Jacket Cotton Padded Jacket Sleeveless Female Winter Waistcoat",
          "platform_id": "6633862627565"
      },
      {
          "id": "6409469d-fe60-4368-bffa-958d299dfe2f",
          "name": "2021 Women Sleeveless Vest Winter Warm Plus Size 2XL Down Cotton Padded Jacket Female Veats Mandarin Collar Sleeveless Waistcoat",
          "platform_id": "6633862856941"
      }
  ],
  "page": 1,
  "pageSize": 5,
  "totalPages": 13,
  "totalCount": 63
}
```

### GET /orders

```bash
{
    "orders": [
        {
            "id": "2f2f2a65-6783-4717-8c74-f572552c4836",
            "platform_id": "5224217837805",
            "line_items": [
                {
                    "product_id": "89fe875d-8160-4560-ad55-cecfc5c62b86"
                }
            ]
        },
        {
            "id": "a53794a6-5783-420e-a3a0-276e9ae10a04",
            "platform_id": "5224217772269",
            "line_items": [
                {
                    "product_id": null
                }
            ]
        },
        {
            "id": "cb11cf31-a086-4582-8264-1f2fbde2839a",
            "platform_id": "5224217608429",
            "line_items": [
                {
                    "product_id": "775ad530-d0ef-4261-9c6f-164ec80d6250"
                }
            ]
        }
    ],
    "page": 1,
    "pageSize": 100,
    "totalPages": 1,
    "totalCount": 3
}
```

## Author

[Renzo Diaz - LinkedIn](https://www.linkedin.com/in/renzo-diaz-vila/)
