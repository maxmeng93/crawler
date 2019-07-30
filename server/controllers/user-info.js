module.exports = {
  async getUserInfo(ctx) {
    let result = {
      name: 'Max',
      age: 26
    };

    ctx.body = result;
  }
};
