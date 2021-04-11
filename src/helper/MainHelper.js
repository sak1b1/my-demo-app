export default function MainHelper(response) {
  let item;
  let arr = [];
  for (let i = 0; i < response.data.length; i++) {
    item = response.data[i];
    let comments = [];
    for (let j = 0; j < item.comments.length; j++) {
      let c = item.comments[j];
      comments.push({
        id: String(c.id),
        content: String(c.content),
        product_id: String(c.product_id),
      });
    }
    arr.push({
      name: String(item.name),
      id: String(item.id),
      comments: comments,
      like: item.qty,
      description: item.description
    });
  }
  return arr;
}
