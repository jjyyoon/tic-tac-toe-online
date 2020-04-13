export const handleFetch = async (url, obj = null, exceptionStatus = null) => {
  try {
    let res;

    if (obj) {
      const settings = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
      };
      res = await fetch(url, settings);
    } else {
      res = await fetch(url);
    }

    if (!res) throw new Error("Connection refused");

    if (!res.ok) {
      if (!exceptionStatus || res.status !== exceptionStatus) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      } else {
        return;
      }
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
