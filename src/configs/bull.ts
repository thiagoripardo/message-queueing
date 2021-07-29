const bullOptions = {
  attempts: 10,
  timeout: 10000,
  removeOnComplete: true,
  backoff: {
    type: 'exponential',
    delay: 100
  }
};

export default bullOptions;