function checkAdmin(req, res, next) {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin)
    return res
      .status(403)
      .send({ error: "You are not authorized to perfrom this operation" });

  next();
}

export default checkAdmin;
