const addToDb = (id) =>{
    const exist = getDb();
    let order_cart = {};
    if (!exist) {
        order_cart[id] = 1;
    }else{
        order_cart = JSON.parse(exist);
        if (order_cart[id]) {
            const newCount = order_cart[id] + 1;
            order_cart[id] = newCount;
        }else{
            order_cart[id] = 1;
        }
    }
    updatDb(order_cart);
}

const getDb = () =>{
    return localStorage.getItem('food-order-cart');
}

const updatDb = cart => localStorage.setItem('food-order-cart',JSON.stringify(cart));

const deleteFromDb = id => {
    const exist = getDb();
    if (!exist) {
        return;
    }else{
        const order_cart = JSON.parse(exist);
        delete order_cart[id];
        updatDb(order_cart);
    }
}

const getCart = cartName =>{
    const exist = localStorage.getItem(cartName);
    return exist? JSON.parse(exist) : {} ;
}

export {addToDb, deleteFromDb as removeCartItem, getCart};