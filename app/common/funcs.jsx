export 	var chunk_dir = (v) => {
  var chunkSize = 5
  var chunks = []
  for (var i = 0; i < v.length; i += chunkSize) {
    var chunk = v.slice(i, i + chunkSize)
    chunks.push(chunk)
  }
  return chunks
}
