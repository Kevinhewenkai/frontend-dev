async function ApiCall (path, method, header, body) {
  try {
    const response = await fetch(`http://localhost:5005/${path}`, {
    // const response = fetch('http://localhost:5005/admin/quiz', {
      // method: 'GET',
      method: method,
      // headers: {
      //   'Content-type': 'application/json',
      //   Authorization: `Bearer ${token}`,
      // },

      headers: header,
      body: method === 'GET' ? undefined : JSON.stringify(body),
    });
    // const responseJson = response.json();
    const responseJson = await response.json();
    if (response.status === 200) {
      return responseJson;
    } else if (response.status === 400) {
      console.log(await response.text());
      // console.log(response.text());
    }
  } catch (err) {
    console.log(err);
  }
}

export default ApiCall;
