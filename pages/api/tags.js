// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { models, sequelize } = require("../../models/models");


export default async function handler(req, res) {
  const Tag = models.Tag;

  const time = Date.now();
  const tags = await Tag.findAll({});
  const timeend = Date.now();

  res.status(200).json({ time: timeend - time, tags });
}
