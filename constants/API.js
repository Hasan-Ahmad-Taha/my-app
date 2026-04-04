export const baseUrl = "https://my-app-server-dv9s.onrender.com";

export const fetchApi = async (route, method = 'GET', body = null) => {
  try {
    const url = `${baseUrl}${route}`;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Only add body for methods that support it
    if (body && method !== 'GET' && method !== 'HEAD') {
      options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Check if response has content before parsing
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();

  } catch (error) {
    console.error('Fetch Error:', {
      message: error.message,
      route,
      method
    });

    // Re-throw to allow caller to handle the error
    throw error;
  }
};

export const isLive = async () => {
  const route = "/";
  return await fetchApi(route, 'GET', null)
}

export const LoginUser = async ({ name, password }) => {
  const route = "/login";
  return await fetchApi(route, 'POST', { name, password });
}

export const Register = async ({ name, phonenumber, age, password }) => {
  const route = "/createuser";
  return await fetchApi(route, 'POST', { name, phonenumber, age, password });
}

export const createProduct = async (body) => {
  const route = "/createProduct";
  return await fetchApi(route, 'POST', body);
}
export const findAllProduct = async (body) => {
  const route = "/findAllProduct";
  return await fetchApi(route, 'POST', body);
}
export const deleteProduct = async (id) => {
  const route = `/deleteProduct/${id}`;
  return await fetchApi(route, 'DELETE');
};

export const UpdatUser = async (body) => {//_id, UserUpdate
  const route = `/UpdatUser`;
  return await fetchApi(route, 'POST', body);
};

