module.exports = {
    JWT: {
      ChaveSecreta: process.env.AUTH_SECRET || "default",
      DataDeExpiracao: "1d",
    },
};
  