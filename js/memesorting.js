const memesorting = meme => {
  var bugMatch = meme.toLowerCase().match(/b[^u]*u[^g]*g/m);
  var boomMatch = meme.toLowerCase().match(/b[^o]*o[^o]*o[^m]*m/m);
  var editsMatch = meme.toLowerCase().match(/e[^d]*d[^i]*i[^t]*t[^s]*s/m);

  var bugEnd = (bugMatch) ? bugMatch.index + bugMatch[0].length : Infinity;
  var boomEnd = (boomMatch) ? boomMatch.index + boomMatch[0].length : Infinity;
  var editsEnd = (editsMatch) ? editsMatch.index + editsMatch[0].length : Infinity;

  var firstEnd = Math.min(bugEnd, boomEnd, editsEnd);

  if (firstEnd === Infinity) return 'Vlad';
  else if (firstEnd === bugEnd) return 'Roma';
  else if (firstEnd === boomEnd) return 'Maxim';
  else if (firstEnd === editsEnd) return 'Danik';
}
