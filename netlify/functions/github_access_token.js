exports.handler = (event, context) => {
  return {
    statusCode: 200,
    body: {
      event: JSON.stringify(event),
      context: JSON.stringify(context),
    },
  };
};
