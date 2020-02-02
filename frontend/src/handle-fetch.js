export const handleFetch = async (url, obj = null, exceptionStatus = null) => {
  try {
    let res;

    if (obj) {
      res = await fetch(url, obj);
    } else {
      res = await fetch(url);
    }

    if (!res) throw new Error("Connection refused");

    if (!res.ok) {
      if (exceptionStatus && res.status === exceptionStatus) {
        return { res };
      } else {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
    }

    const data = await res.json();
    return { res, data };
  } catch (err) {
    console.log(err);
  }
};
