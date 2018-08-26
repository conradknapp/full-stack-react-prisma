async function feed(parent, { filter, first, skip }, ctx, info) {
  const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {};

  const allLinks = await ctx.db.query.links({});
  const count = allLinks.length;

  const queriedLinks = await ctx.db.query.links({ first, skip, where });

  return {
    linkIds: queriedLinks.map(link => link.id),
    count
  };
}

module.exports = {
  feed
};
