class HomeController {
  index(req, res) {
    res.json({
      msg: true,
    });
  }
}

export default new HomeController();
