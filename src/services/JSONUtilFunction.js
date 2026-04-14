export const getJson = async (url) => {
    const res = await fetch(url);
    if(!res.ok) {
        const text = await res.text();

        const error = new Error(`HTTP error: ${res.status} - ${text}`);
        error.status = res.status;

        throw error
    }
    return res.json();
};

export const postJson = async (url, body = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })


    if (!res.ok) {
        const text = await res.text()

        const error = new Error(`HTTP error: ${res.status} - ${text}`);
        error.status = res.status;
        throw error
    }

    return res.json()
}

export const deleteJson = async (url = {}) => {
    const res = await fetch(url, {
        method: 'DELETE'
    })

    if (!res.ok) {
        const text = await res.text()
        const error = new Error(`HTTP error: ${res.status} - ${text}`);
        error.status = res.status;

        throw error
    }
}

export const putJson = async (url, body = {}) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const text = await res.text();
        const error = new Error(`HTTP error: ${res.status} - ${text}`);
        error.status = res.status;

        throw error
    }

    return res.json();
};

export const BASIC_URL = "http://127.0.0.1:5000"