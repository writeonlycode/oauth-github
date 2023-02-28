exports.handler = (event, context) => {
  return {
    statusCode: 200,
    event: JSON.stringify(event),
    context: JSON.stringify(context),
  };
};
