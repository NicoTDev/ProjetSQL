export const getJson = async (url) => {
    const res = await fetch(url);
    if(!res.ok) {
        const text = await res.text();
        console.log(text);
        throw new Error(`HTTP error: ${res.status} - ${text}`);
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
        console.log(text)
        throw new Error(`HTTP error: ${res.status} - ${text}`)
    }

    return res.json()
}

export const deleteJson = async (url = {}) => {
    const res = await fetch(url, {
        method: 'DELETE'
    })

    if (!res.ok) {
        const text = await res.text()
        console.log(text)
        throw new Error(`HTTP error: ${res.status} - ${text}`)
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
        console.log(text);
        throw new Error(`HTTP error: ${res.status} - ${text}`);
    }

    return res.json();
};