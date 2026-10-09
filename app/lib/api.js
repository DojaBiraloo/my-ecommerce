const BASE_URL = 'https://fakestoreapi.com';


// Login

export async function loginUser(username, password){
    const res = await fetch(`${BASE_URL}/auth/login`,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username, password})
    })

      if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Failed to login');
  }
    return res.json();
}

// Signup

export async function SignupUser( username, email, password){
    const res = await fetch(`${BASE_URL}/users`,{
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ username, email, password })
    })

    if(!res.ok){
        throw new Error('Failed to signup');
    }
    return res.json();
}

// Get all users
export async function getUsers() {
    const res = await fetch(`${BASE_URL}/users`,{
        method: 'GET',
    })
    if(!res.ok){
        throw new Error('Cannot fetch all the users.')
    }

    return res.json();
    
}

// Get all products
export async function getProducts(){
    const res = await fetch(`${BASE_URL}/products?limit=12`,{
        method: "GET"
    });
    if(!res.ok){
        throw new Error("Failed to load products");

    }

    return res.json();
}

// Get a single products

export async function getProduct(id){
    const res = await fetch(`${BASE_URL}/products/${id}`)

    if(!res.ok){
        throw new Error("Could not find products");
    }
    return res.json();
}


// Update the products

export async function updateProducts(id, updates){
    const res = await fetch(`${BASE_URL}/products/${id}`,{
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({updates})
    })

    if(!res.ok){
        throw new Error("Failed to update the product");
    }
    return res.json();
}
