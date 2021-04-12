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
        posted_by: String(c.posted_by)
      });
    }
    arr.push({
      name: String(item.title),
      id: String(item.id),
      
      // like: item.qty,
      // description: item.description
      //===============================
      year: item.year,
      writer: item.writer,
      director: item.director,
      poster: item.poster,
      ratings: item.ratings,
      type_of: item.type_of,
      imdb_id: item.imdb_id,
      comments: comments,
    });
  }
  return arr;
}

