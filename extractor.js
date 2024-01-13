function getPostId() {
  const linkedinURL= document.querySelector("#url").value;
  const regex = /([0-9]{19})/;
  const postId = regex.exec(linkedinURL).pop();
  return postId;
}

function extractUnixTimestamp(postId) {
  // BigInt needed as we need to treat postId as 64 bit decimal. This reduces browser support.
  const asBinary = BigInt(postId).toString(2);
  const first41Chars = asBinary.slice(0, 41);
  const timestamp = parseInt(first41Chars, 2);
  return timestamp;
}

function unixTimestampToHumanDate(timestamp) {
  const dateObject = new Date(timestamp);
  // Convert to IST
  dateObject.setHours(dateObject.getHours() + 5);
  dateObject.setMinutes(dateObject.getMinutes() + 30);
  const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', year: 'numeric', month: 'long', day: 'numeric', hour12: false };
  const humanDateFormat = dateObject.toLocaleString('en-IN', options);
  return humanDateFormat;
}

function getDate() {
  const postId = getPostId();
  const unixTimestamp = extractUnixTimestamp(postId);
  const humanDateFormat = unixTimestampToHumanDate(unixTimestamp);
  document.querySelector("#date").textContent = humanDateFormat;
}
