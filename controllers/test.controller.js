export const test = (req, res) => {
  res.write('Test endpoint works\n');
  res.status(200).end();
};

export const test1 = (req, res) => {
  res.write('Test1 endpoint works\n');
  res.status(200).end();
};
