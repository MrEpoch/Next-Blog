export async function fetcher({ url, method, body, json = true }) {
    try {
    const res = await fetch(url, {
        method,
        ...(body && {body: JSON.stringify(body)}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    if (!res.ok) {
        throw new Error('API FETCHER ERROR');
    }

    if (json) {
        const data = await res.json();
        console.log(data);
    }
    } catch (error) {
        console.log(error);
    }
}

export const register = (user) => {
    return fetcher({ url: "/api/register", method: "POST", body: user });
}

export const login = (user) => {
    return fetcher({ url: "/api/login", method: "POST", body: user });
}
