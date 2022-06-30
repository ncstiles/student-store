const { storage } = require("../data/storage");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Store {
  /**
   * @returns a list of objects, where each object is an item being sold in the store
   */
  static getAllProducts() {
    return storage.get("products");
  }

  /**
   * @param {Number} productId id of product in the store
   * @returns the object associated with the product that has id `productId`
   */
  static getProduct(productId) {
    const products = storage.get("products");
    let matchingProduct = products.find(
      (prod) => prod.id === Number(productId)
    );
    if (!matchingProduct) {
      throw new NotFoundError(
        `product of id ${productId} does not exist in product db`
      );
    }
    return matchingProduct;
  }

  /**
   *
   * @param {Object} user an object with keys `name` and `email`
   * @param {*} shoppingCart an object with keys `itemId` (the id of the product in the cart)
   *            and `quantity` (number of instances of that product in the cart)
   * @returns a new object containing information about the newly registered purchase,
   *            including the date/time of creation and a receipt of the transaction
   */
  static makePurchase(user, shoppingCart) {
    if (!user || !user.name || !user.email) {
      throw new BadRequestError("No user information");
    }
    if (!shoppingCart) {
      throw new BadRequestError("No items in the shopping cart");
    }
    const name = user.name.trim();
    const email = user.email.trim();
    const salesTax = 1.0875;
    const purchaseId = storage.get("purchases").length;
    const uniqueItemIds = new Set(); // used to check if there are any duplicate products in the cart
    let totalPrice = 0;
    let receiptLines = [`Showing receipt for ${name}.`];

    // go through each product in the cart and add its price to `totalPrice`, as well as add to the receipt.
    for (let cartItem of shoppingCart) {
      if (cartItem.itemId === undefined) {
        throw new BadRequestError("Shopping cart item doesn't have an item id");
      }
      if (cartItem.quantity === undefined) {
        throw new BadRequestError("Shopping cart item doesn't have a quantity");
      }
      uniqueItemIds.add(cartItem.itemId);

      const product = Store.getProduct(cartItem.itemId);
      const productTotal = product.price * cartItem.quantity;
      totalPrice += productTotal;

      receiptLines.push(
        `${cartItem.quantity} ${product.name} purchased at \$${product.price.toFixed(2)}
        each, totaling to \$${productTotal.toFixed(2)}.`
      );
    }

    // when there are duplicate cart items, the length of the set of products != number of shopping cart entries
    if (uniqueItemIds.size !== shoppingCart.length) {
      throw new BadRequestError("Duplicate elements in shopping cart");
    }
    
    receiptLines.push(`Subtotal: \$${totalPrice.toFixed(2)}`);
    const afterTax = totalPrice * salesTax;
    receiptLines.push(`Total after taxes/fees: \$${afterTax.toFixed(2)}`);

    const newPurchase = {
      id: purchaseId,
      name: name,
      email: email,
      order: shoppingCart,
      total: afterTax,
      createdAt: new Date().toLocaleString(),
      receipt: { lines: receiptLines },
    };

    storage.add("purchases", newPurchase);

    return newPurchase;
  }

  /**
   * @returns all previous purchases as a list of objects, where each object represents a previous purchase
   */
  static getOrderHistory() {
    const purchases = storage.get("purchases");
    const purchasesCopy = [];
    for (let purchase of purchases) {
      const newPurchase = {
        id: purchase.id,
        name: purchase.name,
        email: purchase.email,
        order: {
          itemId: purchase.order.itemId,
          quantity: purchase.order.quantity,
        },
        total: purchase.total.toFixed(2),
        createdAt: purchase.createdAt,
        receipt: { lines: [...purchase.receipt.lines] },
      };
      purchasesCopy.push(newPurchase);
    }
    return purchasesCopy;
  }

  /**
   * @param {String} orderId the id of a previous purchase
   * @returns the object representing a previous purchase with id `orderId`
   */
  static getOrder(orderId) {
    const purchases = storage.get("purchases");
    let matchingOrder = purchases.find(
      (purchase) => purchase.id === Number(orderId)
    );
    if (!matchingOrder) {
      throw new NotFoundError(
        `order with id ${orderId} does not exist in purchases db`
      );
    }

    const purchaseCopy = {
      id: matchingOrder.id,
      name: matchingOrder.name,
      email: matchingOrder.email,
      order: {
        itemId: matchingOrder.order.itemId,
        quantity: matchingOrder.order.quantity,
      },
      total: matchingOrder.total.toFixed(2),
      createdAt: matchingOrder.createdAt,
      receipt: { lines: [...matchingOrder.receipt.lines] },
    };
    return purchaseCopy;
  }
}

module.exports = Store;
