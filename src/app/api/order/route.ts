import { db } from '@/lib/db';
import { sendKeysEmail, sendKeysEmailWithAccount, sendLowKeyStockEmail } from '@/lib/mail/keys';
import { Key } from '@prisma/client';
import { NextRequest } from 'next/server';


const BUNDLE_SKUS = ['KRSB', 'PACH', 'PUSB'];



type Data = {
  email: string;
  first_name: string;
  last_name: string;
  order_number: number;
  line_items: any[];
}

export const GET = async (req: NextRequest) => {
  const data: Data = await req.json();
  const { email, first_name, last_name, order_number, line_items } = data;
  // data.customer.email
  const customerEmail = email;
  // data.customer.first_name
  const customerName = `${first_name} ${last_name}`;
  // const orderNumber = data.order_number;
  // const products = data.line_items.map((item) => item);

  let newUser = false;

  //* Find or create user
  let customer = await db.user.findUnique({ where: { email: customerEmail } });
  if (!customer) {
    customer = await db.user.create({ data: { email: customerEmail, name: customerName } });
    newUser = true;
  }

  //* Create order 
  // data.order_number
  const order = await db.order.create({
    data: {
      customerId: customer.id,
      orderNumber: order_number,
    }
  });


  let productKeys: Key[] = [];

  //* Assign keys to customer
  // data.line_items
  for (const product of line_items.map((item: any) => item)) {
    if (BUNDLE_SKUS.includes(product.sku)) {

      const bundleProducts = await db.bundle.findFirst({
        where: { sku: product.sku },
        include: { products: { include: { product: true } } }
      });

      if (!bundleProducts) {
        console.log('Bundle not found', product.sku);
        // TODO: Send email to admin with order id
        return
      }

      for (const bundleProduct of bundleProducts.products) {
        const keys = await getNonUsedKeys(bundleProduct.product.id)
        const usedKeys = await assignKeyToCustomer(keys, customer.id, order.id)

        productKeys.push(usedKeys);
      }
    } else {

      const singleProduct = await db.product.findFirst({
        where: { sku: product.sku }
      });

      if (!singleProduct) {
        console.log('Product not found', product.sku);
        return;
      }

      const keys = await getNonUsedKeys(singleProduct.id)
      const usedKeys = await assignKeyToCustomer(keys, customer.id, order.id)

      productKeys.push(usedKeys);
    }
  }

  console.log('keys', productKeys);
  // TODO: Send email to customer with keys
  if (newUser) {
    // Send welcome email with account details and keys to customer
    console.log('send email account');
    sendKeysEmailWithAccount(customerEmail, customerName, productKeys);
  } else {
    // Only send keys to customer
    console.log('send email keys');
    sendKeysEmail(customerEmail, customerName, productKeys);
  }

  return new Response(null, { status: 200 });
};

async function getNonUsedKeys(productId: string) {
  const keys = await db.key.findMany({
    where: { productId: productId, customerId: null },
  })

  return keys;
}

const MIN_AMMOUNT_OF_KEYS = 10;
async function assignKeyToCustomer(keys: Key[], customerId: string, order_id: string) {
  if (keys.length < MIN_AMMOUNT_OF_KEYS) {
    sendLowKeyStockEmail(keys[0].productId, keys.length)
  }

  const key = keys[0];

  const usedKeys = await db.key.update({
    where: { id: key.id },
    data: { customerId: customerId, usedAt: new Date(), orderId: order_id}
  })

  return usedKeys;
}






const data = {
  "id": 6134457074006,
  "admin_graphql_api_id": "gid:\/\/shopify\/Order\/6134457074006",
  "app_id": 580111,
  "browser_ip": "213.197.59.143",
  "buyer_accepts_marketing": true,
  "cancel_reason": null,
  "cancelled_at": null,
  "cart_token": "Z2NwLWV1cm9wZS13ZXN0NDowMUhaNEYzN0cxRTI1WUU4TjBEUFY1REFZUA",
  "checkout_id": 44541050323286,
  "checkout_token": "56d3b3c4f973db77c7519755016dc4c4",
  "client_details": {
    "accept_language": "en-NL",
    "browser_height": null,
    "browser_ip": "213.197.59.143",
    "browser_width": null,
    "session_hash": null,
    "user_agent": "Mozilla\/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/126.0.0.0 Safari\/537.36"
  },
  "closed_at": "2024-06-24T13:55:28+02:00",
  "confirmation_number": "6T5HVM5PZ",
  "confirmed": true,
  "contact_email": "retro.colin@gmail.com",
  "created_at": "2024-06-24T13:55:18+02:00",
  "currency": "USD",
  "current_subtotal_price": "124.36",
  "current_subtotal_price_set": {
    "shop_money": {
      "amount": "124.36",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "115.90",
      "currency_code": "EUR"
    }
  },
  "current_total_additional_fees_set": null,
  "current_total_discounts": "0.00",
  "current_total_discounts_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "EUR"
    }
  },
  "current_total_duties_set": null,
  "current_total_price": "124.36",
  "current_total_price_set": {
    "shop_money": {
      "amount": "124.36",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "115.90",
      "currency_code": "EUR"
    }
  },
  "current_total_tax": "0.00",
  "current_total_tax_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "EUR"
    }
  },
  "customer_locale": "en-NL",
  "device_id": null,
  "discount_codes": [],
  "duties_included": false,
  "email": "retro.colin@gmail.com",
  "estimated_taxes": false,
  "financial_status": "paid",
  "fulfillment_status": "fulfilled",
  "landing_site": "\/",
  "landing_site_ref": null,
  "location_id": null,
  "merchant_of_record_app_id": null,
  "name": "#1104",
  "note": null,
  "note_attributes": [],
  "number": 104,
  "order_number": 1104,
  "order_status_url": "https:\/\/carpaudio.com\/77192495446\/orders\/b1841ce24591c54e9281f784f6e6e396\/authenticate?key=5340fdf1689f18d59c2ee0bb0079d82d",
  "original_total_additional_fees_set": null,
  "original_total_duties_set": null,
  "payment_gateway_names": [
    "shopify_payments"
  ],
  "phone": null,
  "po_number": null,
  "presentment_currency": "EUR",
  "processed_at": "2024-06-24T13:55:16+02:00",
  "reference": "d06466a4ab1ddc7a813caa936b019d88",
  "referring_site": "",
  "source_identifier": "d06466a4ab1ddc7a813caa936b019d88",
  "source_name": "web",
  "source_url": null,
  "subtotal_price": "124.36",
  "subtotal_price_set": {
    "shop_money": {
      "amount": "124.36",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "115.90",
      "currency_code": "EUR"
    }
  },
  "tags": "",
  "tax_exempt": false,
  "tax_lines": [],
  "taxes_included": true,
  "test": true,
  "token": "b1841ce24591c54e9281f784f6e6e396",
  "total_discounts": "0.00",
  "total_discounts_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "EUR"
    }
  },
  "total_line_items_price": "124.36",
  "total_line_items_price_set": {
    "shop_money": {
      "amount": "124.36",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "115.90",
      "currency_code": "EUR"
    }
  },
  "total_outstanding": "0.00",
  "total_price": "124.36",
  "total_price_set": {
    "shop_money": {
      "amount": "124.36",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "115.90",
      "currency_code": "EUR"
    }
  },
  "total_shipping_price_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "EUR"
    }
  },
  "total_tax": "0.00",
  "total_tax_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "USD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "EUR"
    }
  },
  "total_tip_received": "0.00",
  "total_weight": 0,
  "updated_at": "2024-06-24T13:55:28+02:00",
  "user_id": null,
  "billing_address": {
    "first_name": "Albert",
    "address1": "Brickwall 4",
    "phone": null,
    "city": "Legocity",
    "zip": "4394 LP",
    "province": null,
    "country": "Netherlands",
    "last_name": "Einstein",
    "address2": "Laagje 3",
    "company": null,
    "latitude": 52.132633,
    "longitude": 5.291265999999999,
    "name": "Albert Einstein",
    "country_code": "NL",
    "province_code": null
  },
  "customer": {
    "id": 7817370206550,
    "email": "trespaan@gmail.com",
    "created_at": "2024-04-10T20:10:58+02:00",
    "updated_at": "2024-06-24T13:55:18+02:00",
    "first_name": "Albert",
    "last_name": "Einstein",
    "state": "disabled",
    "note": null,
    "verified_email": true,
    "multipass_identifier": null,
    "tax_exempt": false,
    "phone": null,
    "email_marketing_consent": {
      "state": "subscribed",
      "opt_in_level": "single_opt_in",
      "consent_updated_at": "2024-04-10T20:11:12+02:00"
    },
    "sms_marketing_consent": null,
    "tags": "",
    "currency": "USD",
    "tax_exemptions": [],
    "admin_graphql_api_id": "gid:\/\/shopify\/Customer\/7817370206550",
    "default_address": {
      "id": 10406540706134,
      "customer_id": 7817370206550,
      "first_name": "Albert",
      "last_name": "Einstein",
      "company": null,
      "address1": "Brickwall 4",
      "address2": "Laagje 3",
      "city": "Legocity",
      "province": null,
      "country": "Netherlands",
      "zip": "4394 LP",
      "phone": null,
      "name": "Albert Einstein",
      "province_code": null,
      "country_code": "NL",
      "country_name": "Netherlands",
      "default": true
    }
  },
  "discount_applications": [],
  "fulfillments": [
    {
      "id": 5518642381142,
      "admin_graphql_api_id": "gid:\/\/shopify\/Fulfillment\/5518642381142",
      "created_at": "2024-06-24T13:55:28+02:00",
      "location_id": 85007565142,
      "name": "#1104.1",
      "order_id": 6134457074006,
      "origin_address": {},
      "receipt": {},
      "service": "manual",
      "shipment_status": null,
      "status": "success",
      "tracking_company": null,
      "tracking_number": null,
      "tracking_numbers": [],
      "tracking_url": null,
      "tracking_urls": [],
      "updated_at": "2024-06-24T13:55:28+02:00",
      "line_items": [
        {
          "id": 15820848890198,
          "admin_graphql_api_id": "gid:\/\/shopify\/LineItem\/15820848890198",
          "attributed_staffs": [],
          "current_quantity": 1,
          "fulfillable_quantity": 0,
          "fulfillment_service": "manual",
          "fulfillment_status": "fulfilled",
          "gift_card": false,
          "grams": 0,
          "name": "Krossbow",
          "price": "45.01",
          "price_set": {
            "shop_money": {
              "amount": "45.01",
              "currency_code": "USD"
            },
            "presentment_money": {
              "amount": "41.95",
              "currency_code": "EUR"
            }
          },
          "product_exists": true,
          "product_id": 8818545066326,
          "properties": [],
          "quantity": 1,
          "requires_shipping": false,
          "sku": "KRSB",
          "taxable": false,
          "title": "Krossbow",
          "total_discount": "0.00",
          "total_discount_set": {
            "shop_money": {
              "amount": "0.00",
              "currency_code": "USD"
            },
            "presentment_money": {
              "amount": "0.00",
              "currency_code": "EUR"
            }
          },
          "variant_id": 47902744052054,
          "variant_inventory_management": null,
          "variant_title": null,
          "vendor": "CARP Audio",
          "tax_lines": [],
          "duties": [],
          "discount_allocations": []
        },
        {
          "id": 15820848922966,
          "admin_graphql_api_id": "gid:\/\/shopify\/LineItem\/15820848922966",
          "attributed_staffs": [],
          "current_quantity": 1,
          "fulfillable_quantity": 0,
          "fulfillment_service": "manual",
          "fulfillment_status": "fulfilled",
          "gift_card": false,
          "grams": 0,
          "name": "Parallel Character Bundle",
          "price": "79.35",
          "price_set": {
            "shop_money": {
              "amount": "79.35",
              "currency_code": "USD"
            },
            "presentment_money": {
              "amount": "73.95",
              "currency_code": "EUR"
            }
          },
          "product_exists": true,
          "product_id": 8785285742934,
          "properties": [],
          "quantity": 1,
          "requires_shipping": false,
          "sku": "PACH",
          "taxable": false,
          "title": "Parallel Character Bundle",
          "total_discount": "0.00",
          "total_discount_set": {
            "shop_money": {
              "amount": "0.00",
              "currency_code": "USD"
            },
            "presentment_money": {
              "amount": "0.00",
              "currency_code": "EUR"
            }
          },
          "variant_id": 47819215307094,
          "variant_inventory_management": null,
          "variant_title": null,
          "vendor": "CARP Audio",
          "tax_lines": [],
          "duties": [],
          "discount_allocations": []
        }
      ]
    }
  ],
  "line_items": [
    {
      "id": 15820848890198,
      "admin_graphql_api_id": "gid:\/\/shopify\/LineItem\/15820848890198",
      "attributed_staffs": [],
      "current_quantity": 1,
      "fulfillable_quantity": 0,
      "fulfillment_service": "manual",
      "fulfillment_status": "fulfilled",
      "gift_card": false,
      "grams": 0,
      "name": "Krossbow",
      "price": "45.01",
      "price_set": {
        "shop_money": {
          "amount": "45.01",
          "currency_code": "USD"
        },
        "presentment_money": {
          "amount": "41.95",
          "currency_code": "EUR"
        }
      },
      "product_exists": true,
      "product_id": 8818545066326,
      "properties": [],
      "quantity": 1,
      "requires_shipping": false,
      "sku": "PACH",
      "taxable": false,
      "title": "Krossbow",
      "total_discount": "0.00",
      "total_discount_set": {
        "shop_money": {
          "amount": "0.00",
          "currency_code": "USD"
        },
        "presentment_money": {
          "amount": "0.00",
          "currency_code": "EUR"
        }
      },
      "variant_id": 47902744052054,
      "variant_inventory_management": null,
      "variant_title": null,
      "vendor": "CARP Audio",
      "tax_lines": [],
      "duties": [],
      "discount_allocations": []
    },
    {
      "id": 15820848922966,
      "admin_graphql_api_id": "gid:\/\/shopify\/LineItem\/15820848922966",
      "attributed_staffs": [],
      "current_quantity": 1,
      "fulfillable_quantity": 0,
      "fulfillment_service": "manual",
      "fulfillment_status": "fulfilled",
      "gift_card": false,
      "grams": 0,
      "name": "Parallel Character Bundle",
      "price": "79.35",
      "price_set": {
        "shop_money": {
          "amount": "79.35",
          "currency_code": "USD"
        },
        "presentment_money": {
          "amount": "73.95",
          "currency_code": "EUR"
        }
      },
      "product_exists": true,
      "product_id": 8785285742934,
      "properties": [],
      "quantity": 1,
      "requires_shipping": false,
      "sku": "OCTP",
      "taxable": false,
      "title": "Parallel Character Bundle",
      "total_discount": "0.00",
      "total_discount_set": {
        "shop_money": {
          "amount": "0.00",
          "currency_code": "USD"
        },
        "presentment_money": {
          "amount": "0.00",
          "currency_code": "EUR"
        }
      },
      "variant_id": 47819215307094,
      "variant_inventory_management": null,
      "variant_title": null,
      "vendor": "CARP Audio",
      "tax_lines": [],
      "duties": [],
      "discount_allocations": []
    }
  ],
  "payment_terms": null,
  "refunds": [],
  "shipping_address": null,
  "shipping_lines": []
}