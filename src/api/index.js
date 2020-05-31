const get = async (url) => {
    let response = await fetch(url, {
        method: 'GET',
        header: {
            'Access-Control-Allow-Origin': '*'
        },
        redirect: 'follow'
    });
    let data = await response.json()
    return data;
}

export {get}